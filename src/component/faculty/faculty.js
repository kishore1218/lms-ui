import React from 'react';
import GenericComponent from '../generic.js';
import {Route,Link, BrowserRouter as Router } from "react-router-dom";
import Header2 from '../Header2.js';
import Footer from '../Footer.js';
import NewFaculty from './newfaculty.js';
import FacultyList from './facultylist.js';
import FacultyAcademics from './facultyacademics.js';

class FacultyDashboard extends GenericComponent{


    serachfaculty=(event)=>{

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
                        <a className='nav-link list-group-item-dark' href="/faculty/newfaculty" ><i className="glyphicon glyphicon-user"></i> New User</a>
                    </li>
                    <li>
                        <a href="/faculty/facultylist" className="list-group-item list-group-item-dark"><i className="glyphicon glyphicon-user"></i> Users List</a>
                    </li>
                    <li>
                        <a href="/faculty/facultyacademics" className="list-group-item list-group-item-dark"><i className="glyphicon glyphicon-user"></i> Faculty Academics</a>
                    </li>
                </ul>
      </div>
</div>
</div>
    <div className="col-md-9 col-sm-6 col-xs-12">
    <div className="col-sm-3 col-md-3 pull-right">
			<form className="navbar-form" role="search" onSubmit={this.serachFaculty}>
				<div className="input-group">
					<input type="text"  className="form-control" placeholder="Faculty Id" name="srch-term" id="srch-term"/>
					<div className="input-group-btn">
						<button className="btn btn-default" ><i className="glyphicon glyphicon-search"></i></button>
					</div>
				</div>	
			</form>
        </div>
            <Route path="/faculty/newfaculty"  component={NewFaculty}/>
            <Route path="/faculty/facultylist"  component={FacultyList}/>
            <Route path="/faculty/facultyacademics"  component={FacultyAcademics}/>
            
        </div>
    </div>
</div>   
    <Footer/>                
        </div>);
    }

}
export default FacultyDashboard;