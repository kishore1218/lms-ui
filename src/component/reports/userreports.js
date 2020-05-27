import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';


class UserTimesheetReport extends GenericComponent {

    constructor(){
        super();
        this.state={
            costcenters: [],
            faculties:[],
            timesheets:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false,
        }
        this.getAllCostCenters();
        this.getFaculties();
    }

    getAllCostCenters=()=>{
        let p = ApiUtils.get('/Ga/costcenters',this.props);

        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
           
                this.setState({
                    costcenters:json
                })         
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    getFaculties = ()=> { 

        let p = ApiUtils.get('/supervisorUsers',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    faculties:json
                })         
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }
    handleSubmit=(event)=>{
        event.preventDefault();

        var userId = document.getElementById("faculties").value;
        var costId = document.getElementById("costcenters").value;
         let p=ApiUtils.get('/timesheetreport/'+userId+'/'+costId,this.props);
         p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    timesheets:json
                })         
        }).catch((error)=>{
            this.setState({errormsg:"Error In Saving..!",isError:true,isMsg:false,}); 
        });
    }
 

    render(){
        const isError=this.state.isError;
        const isMsg=this.state.isMsg;
        let errorbutton;
        let infobutton;
        if(isError){
            errorbutton=<div className="alert alert-danger"><strong>{this.state.errormsg}</strong></div> ;
        };
        if(isMsg){
            infobutton=<div className="alert alert-success"><strong>{this.state.infoMsg}</strong></div> ;
        };
        return(
        <div> 
            <div class="page-header">
                 <h1>User Reports</h1>
            </div>        
            {errorbutton}{infobutton}
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="month">Faculties:</label>
                    <div className="col-sm-3">
                    <select className="form-control"  id="faculties">
                        <option key="NA" value="-1">Select</option>
                            {
                                this.state.faculties.map((faculty) => (
                                    <option key={faculty.id} value={faculty.id}>{faculty.lastName} {faculty.firstName}</option>
                                ))
                            }
                    </select>
                    </div>
                    <label className="control-label col-sm-2" for="month">Period:</label>
                    <div className="col-sm-3">

                        <select className="form-control"  id="costcenters">
                            <option key="NA" value="-1">Select</option>
                                {
                                    this.state.costcenters.map((costcenter) => (
                                        <option key={costcenter.id} value={costcenter.id}>{costcenter.month} {costcenter.year}</option>
                                    ))
                                }
                        </select>
                    </div>
                </div>

                <div className="form-group text-center">
                    <div className="col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form> 
            <div className="col-sm-10">
                <div className="panel panel-info">
                <div className="panel-heading">Workdone Statement:</div>
                <div className="panel-body"> 

                    {this.state.timesheets.map((item) => (
                        <div className="col-sm-10">
                        <div className="panel panel-warning">
                        <div className="panel-heading"><i class="fa fa-calendar text-primary" aria-hidden="true"></i> {item.period} - {item.status}</div>
                        <div className="panel-body"> 

                       
                        { <table className="table table-bordered .table-hover">
                            <thead >
                                <tr>
                                    <th>Date</th>
                                    <th>Activity</th>  
                                    <th>Hourse</th> 
                                    <th>Comments</th>     
                                </tr>
                            </thead>
                            <tbody>
                                    {item.dayswork.map((day) => (
                                    <tr>
                                    <td>{day.day}</td><td>{day.activity}</td><td>{day.hours}</td><td>{day.comments}</td>
                                    </tr>
                                    ))}
                            </tbody>
                         </table> }
                        </div>
                        </div>
                        </div>
                    ))}


                </div>
                </div>
                </div>       
        </div>);
    }
}

export default UserTimesheetReport;