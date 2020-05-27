import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';

class Role extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            roles:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        }

        this.getRoles();
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

        let p=ApiUtils.post('/Ga/role',data,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,}); 
           this.getRoles();
        }).catch((error)=>{
            this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
        });
    }

    getRoles = ()=> { 

        let p = ApiUtils.get('/Ga/roles',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    roles:json
                }) 
            }
        
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    deleteRole=(roleId)=>{


        let p = ApiUtils.remove('/Ga/role/'+roleId,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Deleted successfully!",isError:false,isMsg:true,});   
             this.getRoles();
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
                <h3 className="text-primary bg-dark">Role Configurations:</h3>
            </div> 
            {errorbutton}{infobutton}  
            <div className="form-group col-sm-6 align-right">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label  for="academic">Role:</label>
                                    <input type="text" className="form-control" id="role" name="name"/>
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
                                {this.state.roles.map((item) => (
                                <tr>
                                <td>{item.name}</td>
                                <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>this.deleteRole(item.id)} ><i className="glyphicon glyphicon-trash text-danger" ></i></button></div></td>
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

export default Role;