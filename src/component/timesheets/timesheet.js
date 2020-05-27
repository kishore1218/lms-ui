import React from 'react';
import GenericComponent from '../generic.js';
import {Route,Link, BrowserRouter as Router } from "react-router-dom";
import Header2 from '../Header2.js';
import Footer from '../Footer.js';
import TimesheetList from './timesheetlist.js';

class TimeSheetDashboard extends GenericComponent{

    constructor(props){
        super(props);
    }


    render(){
        return(<div>
            <Header2 history={this.props.history}/>
            <div className="container-fluid" >

                <div className="row">
                <div className="col-md-3 col-sm-6 col-xs-12">
                <div className="navbar-collapse collapse no-transition" >
                <div className="list-group" >
                <ul className="nav nav-pills nav-stacked nav-email shadow mb-20">							
                    <li>
                        <a className='nav-link list-group-item-dark' href="/timesheets/open" ><i className="glyphicon glyphicon-calendar"></i> Open </a>
                    </li>
                    <li>
                        <a className='nav-link list-group-item-dark' href="/timesheets/submitted" ><i className="glyphicon glyphicon-calendar"></i> Submitted </a>
                    </li>
                    <li>
                        <a className='nav-link list-group-item-dark' href="/timesheets/approved" ><i className="glyphicon glyphicon-calendar"></i> Approved </a>
                    </li>
                    <li>
                        <a className='nav-link list-group-item-dark' href="/timesheets/rejected" ><i className="glyphicon glyphicon-calendar"></i> Rejected</a>
                    </li>
                </ul>
      </div>
</div>
</div>
    <div className="col-md-9 col-sm-6 col-xs-12">
            <Route path="/timesheets/open"   component={() => (<TimesheetList status="Open" />)} />   
            <Route path="/timesheets/submitted"  component={() => (<TimesheetList status="Submitted" />)}/>
            <Route path="/timesheets/approved"  component={() => (<TimesheetList status="Approved" />)}/>         
            <Route path="/timesheets/rejected"  component={() => (<TimesheetList status="Rejected" />)}/>
        </div>
    </div>

    
</div>   
    <Footer/>                
        </div>);
    }

}
export default TimeSheetDashboard;