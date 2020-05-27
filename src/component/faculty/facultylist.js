import React from 'react';
import GenericComponent from '../generic.js';
import * as ApiUtils from '../api.js';

class FacultyList  extends GenericComponent {

    constructor(props){
        super(props);
        this.state={
            data: []
        }
        this.getFaculties();
    }

    

    getFaculties = ()=> { 

        let p = ApiUtils.get('/Ga/faculties',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    data:json
                })         
        }).catch((error)=>{
            alert('System Error');
        });
    }

    editFaculty=(event)=>{
        
        alert(event.target.value);
    }

    deleteFaculty=(event)=>{
        alert(event.target.value);
    }

    viewFaculty=(event)=>{
        alert(event.target.value);
      }


    render(){
        return(
            <div>
                <div className="page-header">
                    <h3 className="text-primary bg-dark">User Configurations:</h3>
                </div>  
                <div className="col-sm-10">
                <div className="panel panel-info">
                <div className="panel-heading">Users:</div>
                <div className="panel-body">    
                <table className="table table-bordered .table-hover">
                        <thead >
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Gender</th>                               
                                <th>Date of Birth</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.state.data.map((item) => (
                                <tr>
                                <td> {item.lastName} {item.firstName}</td><td>{item.email}</td><td>{item.mobile}</td><td>{item.gender}</td><td>{item.dob}</td><td>{item.role.name}</td>
                                <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={this.viewFaculty} value={item.id}><i className="glyphicon glyphicon-eye-open" ></i></button></div>
                                <div className="btn-group"><button className="btn btn-default btn-sm" onClick={this.editFaculty} value={item.id}><i className="glyphicon glyphicon-pencil" ></i></button></div>
                                <div className="btn-group"><button className="btn btn-default btn-sm" onClick={this.deleteFaculty} value={item.id}><i className="glyphicon glyphicon-trash" ></i></button></div></td>
                                </tr>
                                ))}
                        </tbody>
                </table>
                </div>
                </div>
                </div>
        </div>
        );
    }
}

export default FacultyList;