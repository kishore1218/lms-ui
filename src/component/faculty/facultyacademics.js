import React from 'react';
import GenericComponent from '../generic.js';
import * as ApiUtils from '../api.js';

class FacultyAcademics extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            faculties: [],
            disciplines:[],
            dispAcademics:[],
            facultyAcademics:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        }
        this.getFaculties();
        this.getDesciplines();
    }

    getFaculties = ()=> { 

        let p = ApiUtils.get('/Ga/faculties',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    faculties:json
                })         
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
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

    getUnAssignAcademics=()=>{

        var facultyId = document.getElementById("faculties").value;
        var disciplineId = document.getElementById("disciplines").value;

        let p = ApiUtils.get('/Ga/faculty/'+facultyId,this.props);

        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
               var facademics=json['academics'];

               let p1 = ApiUtils.get('/Ga/discipline/'+disciplineId,this.props);
                p1.then((response)=>{
                    return response.json();
                }).then(json=>{
                    var disacademics=json['academics'];

                    for(var j = 0; j < disacademics.length; j++) {
                        for(var i = 0; i < facademics.length; i++) {

                            if(disciplineId==facademics[i].discipline.id){

                                if(disacademics[j].id == facademics[i].academic.id){
                                    disacademics.splice(j, 1);
                                    j--;
                                    break;
                                }
                            }
                        
                        }
                    }
                     this.setState({
                        dispAcademics:disacademics
                      })  ;
                })



               this.setState({
                facultyAcademics:facademics
            }) ;

        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    getAssignAcademics=()=>{

        var facultyId = document.getElementById("faculties").value;
        var disciplineId = document.getElementById("disciplines").value;

        this.setState({
            dispAcademics:[]
        })  ;

        let p = ApiUtils.get('/Ga/faculty/'+facultyId,this.props);

        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
               var facademics=json['academics'];
               this.setState({
                facultyAcademics:facademics
            }) ;

        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    addFacultyAcademic=()=>{
        var facultyId = document.getElementById("faculties").value;
        var dispId = document.getElementById("disciplines").value;
        var checkedacas = document.querySelectorAll('#academics input[type="checkbox"]:checked');    

        let object={};
        var data = JSON.stringify(object);

        for (var i = 0; i < checkedacas.length; i++){   

            let p = ApiUtils.post('/Ga/facultyAcademics/'+facultyId+'/'+dispId+'/'+checkedacas[i].id,data,this.props);
            p.then((response)=>{
                this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,}); 
                this.getAssignAcademics();
            }).then((json)=>{
               
            }).catch((error)=>{
                this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
            });
        }
    }

    deleteFacultyAcademic=(facultyAcamedicId)=>{
        // event.preventDefault();
        var facultyId = document.getElementById("faculty").value;
        // let facultyAcamedicId=event.target.value;

        let p = ApiUtils.remove('/Ga/facultyacademic/'+facultyId+'/'+facultyAcamedicId,this.props);
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
                    <h3 className="text-primary bg-dark">Faculty Academics:</h3>
                </div>  
                {errorbutton}{infobutton}
                <div className="form-group">
                        <label  for="port">Faculties:</label>
                        <select className="form-control" onChange={this.getAssignAcademics} id="faculties">
                        <option key="NA" value="-1">Select</option>
                            {
                                this.state.faculties.map((faculty) => (
                                    <option key={faculty.id} value={faculty.id}>{faculty.lastName} {faculty.firstName}</option>
                                ))
                            }
                        </select>
                </div> 


                <div className="panel panel-info">
                <div className="panel-heading">Un Assigned Academics:</div>
                <div className="panel-body"> 

                <div className="form-group">
                        <label  for="port">Disciplines:</label>
                        <select className="form-control" onChange={this.getUnAssignAcademics} id="disciplines">
                        <option key="NA" value="-1">Select</option>
                            {
                                this.state.disciplines.map((discipline) => (
                                    <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
                                ))
                            }
                        </select>
                </div> 

                <div  className="form-group" id="academics">
                        {this.state.dispAcademics.map((entry)=>(                   
                            <label className="checkbox-inline"><input type="checkbox" key={entry.id} name={entry.name} id={entry.id}/>{entry.name}</label>
                        )) }
                    </div>
                    <div className="col-sm-8">    
                            <button type="button" className="btn btn-info align-right" onClick={this.addFacultyAcademic}>Assign</button>
                    </div>
                    </div>
                </div>

                <div className="panel panel-info">
                <div className="panel-heading">Assigned Faculty Academics:</div>
                <div className="panel-body">   
                    <table className="table table-bordered .table-hover">
                                    <thead>
                                    <tr>
                                        <th>Discipline</th>
                                        <th>Academic</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.facultyAcademics.map((item) => (
                                    <tr>
                                    <td> {item.discipline.name}</td><td>{item.academic.name}</td>
                                    <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>this.deleteAcademicDiscipline(item.id)} value={item.id}><i className="glyphicon glyphicon-trash text-danger" ></i></button></div></td>
                                    </tr>
                                    ))}
                                    </tbody>
                    </table> 
                </div>
                </div>

        </div>);
    }
}

export default FacultyAcademics;