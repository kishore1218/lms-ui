import React from 'react';
import {  Link } from 'react-router-dom';
import GenericComponent from './generic';
import * as ApiUtils from './api.js';

class Logout extends GenericComponent{

    constructor(){
        alert("kishore123");
        super();   
        this.logout();         
    }

    logout=()=>{

        alert('logout');
        localStorage.removeItem('auth-token');
        this.golink('/login');      
    }

}
export default Logout;