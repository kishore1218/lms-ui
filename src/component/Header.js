import React from "react";
import ReactDOM from "react-dom";
import {  Link } from 'react-router-dom';
import logo1 from '../logo1.png';
import logo2 from '../logo2.png';
import '../home.css';
import tlogo from '../oie_jpg.png';
const Header=()=>{
    return(<div>
            <nav className="navbar navbar-static-top navbar-inverse">
                <div className="container-fluid">
                    <div class="navbar-header">
                            <a className="navbar-brand" href="#"><img src={tlogo} className="img-responsive twsr" alt=""/></a>
                    </div>
                    <ul className="nav navbar-nav  float-vertical-align">
                        <li><Link to="/login"><span className="glyphicon glyphicon-log-in "> </span> Login </Link></li>
                    </ul>
                </div>
            </nav>
        </div>);
};

export default Header;


