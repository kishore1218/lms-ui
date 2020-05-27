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
            enable:false,
            isreview:false,
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        }
        this.getAllSupervisorTimesheets();
    }

    getAllSupervisorTimesheets=()=>{
        let p = ApiUtils.get('/supervisorTimesheets/'+this.props.status,this.props);

        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    timesheets:json
                })     
                
                if(this.props.status === "Submitted"){            
                    this.setState({
                        isreview:true
                    });
                    
                }

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

    approve=()=>{
        let object={};
        object.id=this.otimesheet.id;
        object.status="Approved";
        object.comments=document.getElementById("comments").value;
        var data = JSON.stringify(object);

        let p=ApiUtils.post('/reviewtimesheet',data,this.props);
        p.then((response)=>{
        this.setState({infoMsg:"Approved successfully!",isError:false,isMsg:true,});   
           this.setState({
               timesheet:{},
               dayWorks:[],
               enable:false
           });
           this.otimesheet={};
           this.getAllSupervisorTimesheets();
        }).catch((error)=>{
            this.setState({errormsg:"Error In Approving..!",isError:true,isMsg:false,}); 
        });
    }

    reject=()=>{
        let object={};
        object.id=this.otimesheet.id;
        object.status="Rejected";
        object.comments=document.getElementById("comments").value;
        var data = JSON.stringify(object);

        let p=ApiUtils.post('/reviewtimesheet',data,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"Workdone Statement Approved..!",isError:false,isMsg:true,});  
           this.setState({
               timesheet:{},
               dayWorks:[],
               enable:false
           });
           this.otimesheet={};
           this.getAllSupervisorTimesheets();
        }).catch((error)=>{
            this.setState({errormsg:"Error In Rejecting..!",isError:true,isMsg:false,}); 
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
        let isreviewAction=this.state.isreview;

       let reviewsection;
       if(isreviewAction){
        reviewsection =<div>
            <div className="form-group">
            <label className="control-label col-sm-2" >Comments:</label>
            <div className="col-sm-8">
                <input type="text" className="form-control"  name="comments" id="comments" placeholder="comments"/>
            </div>
            </div>
            <div class="row text-center ">                    
                    <button type="button" className="btn btn-primary" onClick={this.approve} >Approve</button>
                    <button type="button" className="btn btn-danger" onClick={this.reject} >Reject</button> 
                    <button type="button" className="btn btn-info" onClick={()=>{this.setState({enable:false})}} >Close</button>
            </div>
        </div>;
        }else{
            reviewsection=<div className="form-group">
            <label className="control-label col-sm-2" >Comments:</label>{this.state.timesheet.comments}
            
            </div>;
        }

        return(
        <div> 
            <div class="page-header">
                 <h1>Workdone Statement</h1>
            </div>
            {errorbutton}{infobutton}
        {isenabled ?
                <div className="col-sm-10">
                <div className="panel panel-primary">
                <div className="panel-heading"> 
                    <div class="row">
                        <div class="col-md-4 text-left panel-title"><h4>{this.state.timesheet.period}</h4></div>
                        <div class="col-md-8 text-right "><h4>{this.state.timesheet.status}</h4></div>
                    </div>
                </div>
                <div className="panel-body">    

                    <div class="panel-group">    
                        {this.state.dayWorks.map((day) => (
                            <div class="panel panel-danger">
                            <div class="panel-heading">
                                <div class="row">
                                    <div class="col-md-4 text-left panel-title "> 
                                    <i class="fa fa-calendar text-primary" aria-hidden="true"/> <a data-toggle="collapse" href={'#'+day.id}>
                                        {day.day}</a>
                                    </div>
                                    <div class="col-md-8 text-right">{day.hours} hours</div>
                                </div>

                            </div>
                            <div id={day.id} class="panel-collapse collapse">
                                <div class="panel-body">

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
                                </div>
                                
                            </div>
                            </div>
                        ))}
                    </div>


                 {reviewsection}
                </div>
                </div>
                        </div> :<div></div>}     

   
            <div className="col-sm-10">
                <div className="panel panel-info">
                <div className="panel-heading">{this.props.status} Workdone Statement:</div>
                <div className="panel-body">    
                <table className="table table-bordered .table-hover">
                        <thead >
                            <tr>
                                <th>Emp Id</th>
                                <th>Name</th>
                                <th>Period</th>
                                <th>Status</th>       
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.state.timesheets.map((item) => (
                                <tr>
                                <td>{item.facultyId}</td>
                                <td>{item.facultyName}</td>
                                <td>{item.period}</td>
                                <td>{item.status}</td>
                                <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={()=>this.getTimesheet(item.id)} value={item.id}><i className="glyphicon glyphicon-eye-open" ></i></button></div>
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