import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';


class TimesheetList extends GenericComponent {

    otimesheet={};

    constructor(props){
        super(props);
        this.state={
            timesheets: [],
            timesheet:{},
            dayWorks:[],
            activities:[],
            enable:false,
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        }
        this.getAllUserTimesheets();
        this.getFacultyActivities();
    }

    getAllUserTimesheets=()=>{
        let p = ApiUtils.get('/timesheetByStatus/'+this.props.status,this.props);

        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    timesheets:json
                })         
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    getTimesheet=(id)=>{
        this.setState({
            timesheet:{},
            dayWorks:[]
        });
        this.otimesheet={};
        let p = ApiUtils.get('/timesheet/'+id,this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    timesheet:json,
                    dayWorks:json.dayswork,
                    enable:true
                });
                this.otimesheet=json;
                
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }

    getFacultyActivities=()=>{
        let p = ApiUtils.get('/timesheetActivities',this.props);

        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    activities:json
                })         
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });

    }
    handleSubmit=()=>{     

        let object={};
        object.id=this.otimesheet.id;
        object.status="Submitted"
        object.dayswork=[];
        for (var i = 0; i <this.otimesheet.dayswork.length; i++){   
            let dayWork=this.otimesheet.dayswork[i];
            var elements=document.getElementById(""+dayWork.id).getElementsByTagName("input");
            let daywork={};
            daywork['id']=dayWork.id;
           for (var j = 0; j <elements.length; j++){            
                if('hours'==elements[j].name){
                    daywork['hours']=elements[j].value;
                }else if('comments'==elements[j].name){
                    daywork['comments']=elements[j].value;
                }  
            }
            let activity=document.getElementById('activity'+dayWork.id).value;
            daywork['activity']=activity;
            object.dayswork.push(daywork);
        }

        var data = JSON.stringify(object);
         let p=ApiUtils.post('/submittimesheet',data,this.props);
         p.then((response)=>{
            this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,});
            this.setState({
                timesheet:{},
                dayWorks:[],
                enable:false
            });
            this.otimesheet={};
            this.getAllUserTimesheets();
         }).catch((error)=>{
            this.setState({errormsg:"Error In Submission..!",isError:true,isMsg:false,}); 
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
        let isenabled=this.state.enable;
        let iseditable=(this.props.status=='Open' || this.props.status=='Rejected')?true:false;
        return(
        <div> 
            <div class="page-header">
                 <h1>Workdone Statements</h1>
            </div>
            {errorbutton}{infobutton}
            {/* <nav>
                <ul class="pagination pg-red justify-content-center">
                    <li class="page-item">
                    <a class="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                    </li>

                            {this.state.timesheets.map((item) => (
                                <li class="page-item "><a onClick={()=>this.getTimesheet(item.id)}>{item.period} {item.status}</a></li>
                                ))}
                    <li class="page-item">
                    <a class="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                    </li>
                </ul>
            </nav> */}

        {isenabled?
                <div className="col-sm-10">
                <div className="panel panel-info">
                <div className="panel-heading"> 
                    <div class="row">
                        <div class="col-md-4 text-left panel-title"><h4>{this.state.timesheet.period}</h4></div>
                        <div class="col-md-8 text-right text-success"><h4>{this.state.timesheet.status}</h4></div>
                    </div>
                </div>
                <div className="panel-body">    

                    <div class="panel-group">    
                        {this.state.dayWorks.map((day) => (
                            <div class="panel panel-success">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-md-4 text-left panel-title text-primary"> 
                                    <i class="fa fa-calendar text-primary" aria-hidden="true"></i> <a data-toggle="collapse" href={'#'+day.id}>{day.day}</a>
                                    </div>
                                    <div class="col-md-8 text-right">{day.hours} hours</div>
                                </div>

                            </div>
                            <div id={day.id} class="panel-collapse collapse">
                                <div class="panel-body">
                                    {iseditable? 
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" for="email">Time Entry:</label>
                                        <div className="col-sm-3">
                                            <select className="form-control"  id={'activity'+day.id}>
                                            <option key="NA" value="-1">Select</option>
                                                {
                                                    this.state.activities.map((activity) => (
                                                        <option key={activity} value={activity}>{activity}</option>
                                                    ))
                                                }
                                            </select>
                                       
                                        </div>
                                        <div className="col-sm-2">
                                            <input type="number" className="form-control" name="hours" id="hours"  placeholder="hours"/>
                                        </div>
                                        <div className="col-sm-4">
                                            <input type="text" className="form-control" name="comments" id="comments" value={day.comments} placeholder="comments"/>
                                        </div>
                                    </div>:
                                    <div className="form-group">
                                        <label className="control-label col-sm-2" for="email">Time Entry:</label>
                                        <div className="col-sm-4">
                                            {day.activity}
                                        </div>
                                        <div className="col-sm-2">
                                        {day.hours} hours
                                        </div>
                                        <div className="col-sm-4">
                                        {day.comments}
                                        </div>
                                    </div>
                            }
                                </div>
                                
                            </div>
                            </div>
                        ))}
                    </div>

                <div class="text-center ">
                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit} >Submit</button>
                    <button type="button" className="btn btn-secondary" onClick={()=>{this.setState({enable:false})}} >Close</button>
                </div>
                </div>
                </div>
                        </div> :<div></div>}      
            <div className="col-sm-10">
                <div className="panel panel-info">
                <div className="panel-heading">{this.props.status} Workdone Statements:</div>
                <div className="panel-body">    
                <table className="table table-bordered .table-hover">
                        <thead >
                            <tr>
                                <th>Period</th>
                                <th>Status</th>       
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.state.timesheets.map((item) => (
                                <tr>
                                <td class="text-primary">{item.period}</td>
                                <td>{item.status}</td>
                                <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>this.getTimesheet(item.id)} value={item.id}><i className="glyphicon glyphicon-eye-open text-info" ></i></button></div>
                                </td>
                                </tr>
                                ))}
                        </tbody>
                </table>
                </div>
                </div>
                </div>       
        </div>);
    }
}

export default TimesheetList;