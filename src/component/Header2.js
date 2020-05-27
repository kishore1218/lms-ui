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
                   <nav class="navbar navbar-static-top navbar-inverse">
                    <div class="container-fluid">
                        <div class="navbar-header">
                        <button type="button" className=" navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                        </button>
                            <a  href="#"><img src={tlogo} className="img-responsive img-rounded twsr " alt=""/></a>
                        </div>

                        <ul class="nav navbar-nav ">
                            <li ><Link to="/dashboard"  className="nav-link"><span className="fa fa-home homeicon "></span></Link></li>
                        </ul>

                        {/* <div className="pull-right float-vertical-align"> */}
                            <ul className="nav navbar-nav navbar-right">                        
                                <li className="nav-item text-primary "><a href="#"   className="nav-link" >  <span className="fa fa-user homeprofileicon"> {this.state.username}</span> </a></li> 
                                <li className="nav-item"><a href="#" onClick={this.logout}  className="nav-link" > <span className="fa fa-power-off homelogouticon"></span> </a></li>                                   
                            </ul>
                        {/* </div> */}
                    </div>
                </nav>         
                {/* </header> */}
             </div>
        )
    }
}
export default Header2;
