import React from 'react';
import Header2 from './Header2.js';
import Footer from './Footer.js';
import {BrowserRouter as Router,Route} from "react-router-dom";
import jwt from 'jwt-decode';

import QuickLink from './QuickLink.js';
import * as ApiUtils from './api.js';

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state={
            modules: [],
        }
        let token=localStorage.getItem('auth-token');      
        let decoded = jwt(token);   
        this.getUserModules(decoded.role);
     }


     getUserModules=(roleId)=>{
          let p = ApiUtils.get('/userModules/'+roleId,this.props);
    
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    modules:json
                })         
        }).catch((error)=>{
            alert('System Error');
        });

     }
    render(){
        return(
        <div>
            <Header2 history={this.props.history}/>
            <div className="container-fluid" >
                <div className="row">
                    <div className="page-header">
                        <h1>Quick Links</h1>
                    </div>
                </div>
                <div className="container">	
                    <div className="row">  

                   { this.state.modules.map((module) => (
                        <QuickLink path={module.path} paneltype={"panel "+module.description} quicklink={""+module.moduleName} classtype={"glyphicon "+module.icon}/>        
                    ))}
                        {/* <QuickLink path="/maintenance" paneltype="panel panel-info" quicklink="Maintenance" classtype="glyphicon glyphicon-folder-open"/>    
                        <QuickLink path="/reports" paneltype="panel panel-success" quicklink="Reports" classtype="glyphicon glyphicon-th-list"/> 
                        <QuickLink path="/faculty" paneltype="panel panel-info" quicklink="Faculties" classtype="glyphicon glyphicon-user"/>
                        <QuickLink path="/timesheets" paneltype="panel panel-warning" quicklink="Timesheets" classtype="glyphicon glyphicon-calendar"/>
                        <QuickLink path="/admin" paneltype="panel panel-danger" quicklink="Admin" classtype="glyphicon glyphicon-list-alt"/>      */}
                    </div>
                </div>   
            </div>
            <Footer/>        
                
        </div>
        )
    }
}
export default Dashboard;