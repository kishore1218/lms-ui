import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';

class RoleModules extends GenericComponent{

    modules=[];

    constructor(props){
        super(props);
        this.state={
            roles:[],
            modules:[],
            roleModules:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        }
        this.getRoles();
        this.getAllModules();
    }
    getRoles = ()=> { 

        let p = ApiUtils.get('/Ga/roles',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    roles:json
                })  ;
            }
      
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    getAllModules = ()=> { 

        let p = ApiUtils.get('/Ga/modules',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            this.modules=json;        
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    getAssignModules = ()=> { 

        this.setState({
            modules:[]
        }) ;

        this.setState({
            rolemodules:[]
        }) ;

        var roleId = document.getElementById("roles").value;

        let p = ApiUtils.get('/Ga/role/'+roleId,this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            
               var usassignmodules = JSON.parse(JSON.stringify(this.modules));
               var aroleModules=json['modules'];
               var count = Object.keys(aroleModules).length;
 
            for(var j = 0; j < usassignmodules.length; j++) {
                        for(var i = 0; i < count; i++) {
                            if(aroleModules[i].id == usassignmodules[j].id) {
                                usassignmodules.splice(j, 1);
                               j--;
                               break;
                            }
                          }
            if(usassignmodules){
                this.setState({
                    modules:usassignmodules
                }) ;
            }
            if(aroleModules){
                this.setState({
                    roleModules:aroleModules
                }) ;
            }
            }
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    addModule=()=>{
        var roleId = document.getElementById("roles").value;
        var checkedModules = document.querySelectorAll('#modules input[type="checkbox"]:checked');        

        for (var i = 0; i < checkedModules.length; i++){   
            let object = {};

            let role = {};
            let modle = {};

            role['id']=roleId;
            modle['id']=checkedModules[i].id;

            object['role']=role;
            object['module']=modle;

            var data = JSON.stringify(object);

            let p=ApiUtils.post('/addRoleModule',data,this.props);
            p.then((response)=>{
                this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,});   
            this.getAssignModules();
            }).catch((error)=>{
                this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
            });
        }
    }
    deleteRoleModule=(moduleId)=>{
        event.preventDefault();
        var roleId = document.getElementById("roles").value;

        let p = ApiUtils.remove('/deleteroleModule/'+roleId+'/'+moduleId,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Deleted successfully!",isError:false,isMsg:true,});   
            this.getAssignModules();
        }).catch((error)=>{
            this.setState({errormsg:"Error In Deletin..!",isError:true,isMsg:false,}); 
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
                <h3 className="text-primary bg-dark">Role Module Configurations:</h3>
            </div>
            {errorbutton}{infobutton}       
            <div className="form-group">
                        <label  for="port">Roles:</label>
                        <select className="form-control" onChange={this.getAssignModules} id="roles">
                        <option key="NA" value="-1">Select</option>
                            {
                                this.state.roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))
                            }
                        </select>
            </div> 

            <div className="panel panel-info">
                <div className="panel-heading">Un Assigned Modules:</div>
                <div className="panel-body"> 
                    <div  className="form-group" id="modules">
                        {this.state.modules.map((entry)=>(                   
                            <label className="checkbox-inline"><input type="checkbox" key={entry.id} name={entry.moduleName} id={entry.id}/>{entry.moduleName}</label>
                        )) }
                    </div>
                    <div className="col-sm-8">    
                            <button type="button" className="btn btn-info align-right" onClick={this.addModule}>Assign</button>
                    </div>
                    </div>
                </div>

                <div className="panel panel-info">
                <div className="panel-heading">Assigned Modules:</div>
                <div className="panel-body">   
                    <table className="table table-bordered .table-hover">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.roleModules.map((item) => (
                                    <tr>
                                    <td>{item.moduleName}</td>
                                    <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={() => this.deleteRoleModule(item.id)} value={item.id}><i className="glyphicon glyphicon-trash text-danger" ></i></button></div></td>
                                    </tr>
                                    ))}
                                    </tbody>
                    </table> 
                </div>
                </div>
        </div>)
    }
}

export default RoleModules;