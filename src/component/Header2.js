import React from "react";
import {  Link } from 'react-router-dom';
import GenericComponent from "./generic.js";
import * as ApiUtils from "./api.js";
import logo from '../logo.svg';
import tlogo from '../oie_jpg.png';
// import '../App.css';
// import '../home.css';

class Header2 extends GenericComponent{

    constructor(props){
        super(props);      
        this.state={username: localStorage.getItem('user')};
     }

    logout=()=>{
        localStorage.removeItem('auth-token');
        localStorage.removeItem('refreshtoken');
        this.golink('/login');  
    }

    render(){
        return(
                <div>
             
                    {/* <header> */}
                    <nav className="navbar navbar-static-top navbar-inverse" role="navigation">
                        <div className="container-fluid ">
                        
                            {/* <div className="navbar-header"> */}
                            <a className="navbar-brand  " href="#"><img src={tlogo} className="img-responsive twsr" alt=""/></a>
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                  
                            {/* </div>   */}

                            <div className="pull-left ">
                                <ul className="nav navbar-nav ">
                                <li className="nav-item"><Link to="/dashboard"  className="nav-link"><span className="fa fa-home homeicon "></span></Link></li>
                                </ul>
                            </div>
                            
                            <div className="pull-right ">
                                <ul className="nav navbar-nav ">                               
                               
                                    <li className="nav-item"><a href="#" onClick={this.logout}  className="nav-link" > <span className="fa fa-user homeprofileicon">{this.state.username}</span> </a></li>
                                    <li className="nav-item"><a href="#" onClick={this.logout}  className="nav-link" > <span className="fa fa-power-off homelogouticon"></span> </a></li>
                                   
                                </ul>

                                {/* <ul class="dropdown-menu">
                                        <li><a href="/user/preferences"><i class="icon-cog"></i> Profile</a></li>
                                        <li><a href="/help/support"><i class="icon-envelope"></i> Contact Support</a></li>
                                        <li class="divider"></li>
                                        <li><a href="#" onClick={this.logout}><i class="icon-off"></i> Logout</a></li>
                                    </ul> */}
                            </div>
                        </div>
                    </nav>               
                {/* </header> */}
             </div>
        )
    }
}
export default Header2;
