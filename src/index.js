import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Home from './component/Home.js';
import Login from './component/Login.js';
import Header from "./component/Header.js";
import Footer from "./component/Footer.js";
import Dashboard from "./component/Dashboard.js";
import Admin from './component/admin/admin.js';
import FacultyDashboard from './component/faculty/faculty.js';
import ReportsDashboard from './component/reports/reports.js';
import TimeSheetDashboard from './component/timesheets/timesheet.js';
import BatchDashboard from './component/batch/batch.js';



import Error from './component/error.js';
import Logout from './component/logout.js';


class Appn extends React.Component {

constructor(props){
  super(props);
  this.state={
    usertype:""
  }
         
}

  render() {
    return (      
      <Router>
          <div>
              <div>
                <Route path="/" exact component={Home}/>
                <Route path="/dashboard"  component={Dashboard}/>
                <Route path="/admin"  component={Admin}/> 
                <Route path="/faculty" component={FacultyDashboard}/>
                <Route path="/reports" component={ReportsDashboard}/>
                <Route path="/timesheets" component={TimeSheetDashboard}/>
                <Route path="/batch" component={BatchDashboard}/>    
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout}/>
              </div>
        </div>
     </Router>
    );
  }
}
ReactDOM.render(<Appn />,document.getElementById("root"));