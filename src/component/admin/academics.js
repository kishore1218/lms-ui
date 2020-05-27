import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';

class Academics extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            academics:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        }

        this.getAcademics();
    }

    handleSubmit=(event)=>{
        event.preventDefault();
        let object = {};

        for(var i=0;i<event.target.elements.length;i++){
            var ele=event.target.elements[i];
            if(ele.value!=""){
                object[ele.name] = ele.value;                
            }
        }

        var data = JSON.stringify(object);

        let p=ApiUtils.post('/Ga/academic',data,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,}); 
           this.getAcademics();
        }).catch((error)=>{
            this.setState({errormsg:"Error In Creation..!",isError:true,isMsg:false,}); 
        });
    }

    getAcademics = ()=> { 

        let p = ApiUtils.get('/Ga/academics',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    academics:json
                }) 
            }
        
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,});
        });
    }

    deleteAcademic=(acadamicId)=>{

        let p = ApiUtils.remove('/Ga/academic/'+acadamicId,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Deleted successfully!",isError:false,isMsg:true,});  
             this.getAcademics();
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
                <h3 className="text-primary bg-dark">Academic Configurations:</h3>
            </div>  
             {errorbutton}{infobutton}
            <div className="form-group col-sm-6 align-right">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label  for="academic">Academic:</label>
                                    <input type="text" className="form-control" id="software" name="name"/>
                                </div>
                                <button type="submit" className="btn btn-info">Add</button>
                </form>
            </div>

            <div className="col-sm-8">
                <div className="panel panel-info">
                <div className="panel-heading">Academics:</div>
                <div className="panel-body">          
                <table className="table table-bordered .table-hover">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.academics.map((item) => (
                                <tr>
                                <td>{item.name}</td>
                                <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>this.deleteAcademic(item.id)} ><i className="glyphicon glyphicon-trash text-danger" ></i></button></div></td>
                                </tr>
                                ))}
                                </tbody>
                            </table>     
                        </div>
                        </div>
                        </div>
        </div>);
    }
}

export default Academics;