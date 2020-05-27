import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';
import Academics from './academics';

class AcademicDisciplines extends GenericComponent{

    academics=[];

    constructor(props){
        super(props);
        this.state={
            disciplines:[],
            academics:[],
            academicdesciplines:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        }
        this.getDesciplines();
        this.getAllAcademics();
    }
    getDesciplines = ()=> { 

        let p = ApiUtils.get('/Ga/disciplines',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    disciplines:json
                })  ;
            }
      
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    getAllAcademics = ()=> { 

        let p = ApiUtils.get('/Ga/academics',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            this.academics=json;        
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    getAssignAcademics = ()=> { 

        this.setState({
            academics:[]
        }) ;

        this.setState({
            academicdesciplines:[]
        }) ;

        var disciplineId = document.getElementById("disciplines").value;

        let p = ApiUtils.get('/Ga/discipline/'+disciplineId,this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            
               var unassignaca = JSON.parse(JSON.stringify(this.academics));
               var acadis=json['academics'];
               var count = Object.keys(acadis).length;
 
            for(var j = 0; j < unassignaca.length; j++) {
                        for(var i = 0; i < count; i++) {
                            if(acadis[i].id == unassignaca[j].id) {
                                unassignaca.splice(j, 1);
                               j--;
                               break;
                            }
                          }
            if(unassignaca){
                this.setState({
                    academics:unassignaca
                }) ;
            }
                this.setState({
                    academicdesciplines:acadis
                }) ;
            }
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    addAcademic=()=>{
        var dispId = document.getElementById("disciplines").value;
        var checkedacas = document.querySelectorAll('#academics input[type="checkbox"]:checked');        

        for (var i = 0; i < checkedacas.length; i++){   
            let object = {};

            let discipline = {};
            let academic = {};

            discipline['id']=dispId;
            academic['id']=checkedacas[i].id;

            object['discipline']=discipline;
            object['academic']=academic;

            var data = JSON.stringify(object);

            let p=ApiUtils.post('/Ga/academicDescipline',data,this.props);
            p.then((response)=>{
                this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,});
            this.getAssignAcademics();
            }).catch((error)=>{
                this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
            });
        }
    }
    deleteAcademicDiscipline=(event)=>{
        event.preventDefault();
        var disciplineId = document.getElementById("disciplines").value;
        let academicId=event.target.value;

        let p = ApiUtils.remove('/Ga/academicDescipline/'+disciplineId+'/'+academicId,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Deleted successfully!",isError:false,isMsg:true,});
            this.getAssignAcademics();
        }).catch((error)=>{
            this.setState({errormsg:"Error In Deletion..!",isError:true,isMsg:false,}); 
        });

    }
    render(){
        const isError=this.state.isError;
        const isMsg=this.state.isMsg;
        let errorbutton;
        let infobutton;
        if(isError){
            errorbutton=<div className="alert alert-danger"><strong>{this.state.errormsg}</strong></div> ;
        };
        if(isMsg){
            infobutton=<div className="alert alert-success"><strong>{this.state.infoMsg}</strong></div> ;
        };
        return(<div>

            <div className="page-header">
                <h3 className="text-primary bg-dark">Academic Disciplines Configurations:</h3>
            </div>
            {errorbutton}{infobutton}
            <div className="form-group">
                        <label  for="port">Disciplines:</label>
                        <select className="form-control" onChange={this.getAssignAcademics} id="disciplines">
                        <option key="NA" value="-1">Select</option>
                            {
                                this.state.disciplines.map((discipline) => (
                                    <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
                                ))
                            }
                        </select>
            </div> 

            <div className="panel panel-info">
                <div className="panel-heading">Un Assigned Academics:</div>
                <div className="panel-body"> 
                    <div  className="form-group" id="academics">
                        {this.state.academics.map((entry)=>(                   
                            <label className="checkbox-inline"><input type="checkbox" key={entry.id} name={entry.name} id={entry.id}/>{entry.name}</label>
                        )) }
                    </div>
                    <div className="col-sm-8">    
                            <button type="button" className="btn btn-info align-right" onClick={this.addAcademic}>Assign</button>
                    </div>
                    </div>
                </div>

                <div className="panel panel-info">
                <div className="panel-heading">Assigned Academics:</div>
                <div className="panel-body">   
                    <table className="table table-bordered .table-hover">
                                    <thead>
                                    <tr>                                        
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.academicdesciplines.map((item) => (
                                    <tr>
                                    <td>{item.name}</td>
                                    <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={this.deleteAcademicDiscipline} value={item.id}><i className="glyphicon glyphicon-trash text-danger" ></i></button></div></td>
                                    </tr>
                                    ))}
                                    </tbody>
                    </table> 
                </div>
                </div>
        </div>)
    }
}

export default AcademicDisciplines;