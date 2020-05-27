import React from 'react';
import GenericComponent from '../generic';
import Header2 from '../Header2.js';
import Footer from '../Footer.js';
import {Route,Link, BrowserRouter as Router } from "react-router-dom";
import Desciplines from './desciplines.js';
import Academics from './academics.js';
import Role from './role.js';
import AcademicDisciplines from './academicdisciplines.js';
import RoleModules from './rolemodules';
import SyllabusUpload from './syllabus';

class Admin extends GenericComponent{

    constructor(props){
        super(props);
    }

    render(){

        return(<div>
                    <Header2 history={this.props.history}/>
                    <div className="page-header ">
                        <h1 >Admin</h1>
                    </div> 

                      <div className="container-fluid" >
                        <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                        <div className="navbar-collapse collapse no-transition" >
                        <div className="list-group" >
                        <ul className="nav nav-pills nav-stacked nav-email shadow mb-20">							
                            <li>
                                <a className='nav-link list-group-item-dark' href="/admin/desciplines" ><i className="glyphicon glyphicon-cd"></i> Disciplines</a>
                            </li>
                            <li>
                                <a className='nav-link list-group-item-dark' href="/admin/syllabusUpload" ><i className="glyphicon glyphicon-cog"></i> Syllabus Upload</a>
                            </li> 
                            <li>
                                <a className='nav-link list-group-item-dark' href="/admin/academics" ><i className="glyphicon glyphicon-briefcase"></i> Academics</a>
                            </li>
                            <li>
                                <a className='nav-link list-group-item-dark' href="/admin/academicdesciplines" ><i className="glyphicon glyphicon-tasks"></i> Academic Disciplines</a>
                            </li>
                            <li>
                                <a className='nav-link list-group-item-dark' href="/admin/roles" ><i className="glyphicon glyphicon-briefcase"></i> Roles</a>
                            </li>
                            <li>
                                <a className='nav-link list-group-item-dark' href="/admin/roleModules" ><i className="glyphicon glyphicon-tasks"></i> Role Modules</a>
                            </li>

                        </ul>
                        </div>
                        </div>
                        </div>
                        <div className="col-md-9 col-sm-6 col-xs-12">
                             <Route path="/admin/desciplines"  component={Desciplines}/> 
                             <Route path="/admin/academics"  component={Academics}/> 
                             <Route path="/admin/roles"  component={Role}/> 
                             <Route path="/admin/academicdesciplines"  component={AcademicDisciplines}/> 
                             <Route path="/admin/roleModules"  component={RoleModules}/> 
                             <Route path="/admin/syllabusUpload" component={SyllabusUpload}/>
                             
                             
                        </div>
                        </div>
                        </div>   
                      <Footer/>
        </div>)
    }
}

export default Admin;