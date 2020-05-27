import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';


class GenerateTimesheet extends GenericComponent {

    constructor(){
        super();
        this.state={
            costcenters: [],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        }
        this.getAllCostCenters();
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
    handleSubmit=(event)=>{
        event.preventDefault();

        var month = document.getElementById("month").value;
        var year = document.getElementById("year").value;
        let object={};
        var data = JSON.stringify(object);
         let p=ApiUtils.post('/Ga/generateTimesheets/'+year+'/'+month,data,this.props);
         p.then((response)=>{
            this.setState({infoMsg:"Generated successfully!",isError:false,isMsg:true,});
            this.getAllCostCenters();
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
                 <h1>Generate Workdone Statements</h1>
            </div>        
            {errorbutton}{infobutton}
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="month">Period:</label>
                    <div className="col-sm-4">
                    <select className="form-control"  id="month" name="month">
                        <option key="1" value="1">January</option>
                        <option key="2" value="2">February</option>
                        <option key="3" value="3">March</option>
                        <option key="4" value="4">April</option>
                        <option key="5" value="5">May</option>
                        <option key="6" value="6">June</option>
                        <option key="7" value="7">July</option>
                        <option key="8" value="8">August</option>
                        <option key="9" value="9">Sepember</option>
                        <option key="10" value="10">October</option>
                        <option key="11" value="11">November</option>
                        <option key="12" value="12">December</option>

                        </select>
                    </div>
                    <div className="col-sm-4">
                        <input type="number" className="form-control" name="Year" id="year" placeholder="Year" min="2000"/>
                        {/* <input type="text" className="form-control" name="middleName" id="middleName" placeholder="Middle Name"/> */}
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-primary">Generate</button>
                    </div>
                </div>
            </form> 
            <div className="col-sm-10">
                <div className="panel panel-info">
                <div className="panel-heading">Faculties:</div>
                <div className="panel-body">    
                <table className="table table-bordered .table-hover">
                        <thead >
                            <tr>
                                <th>Month</th>
                                <th>Year</th>       
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.state.costcenters.map((item) => (
                                <tr>
                                <td>{item.month}</td><td>{item.year}</td>
                                <td><div className="btn-group"><button className="btn btn-default btn-sm" onClick={this.viewFaculty} value={item.id}><i className="glyphicon glyphicon-eye-open text-success" ></i></button></div>
                                <div className="btn-group"><button className="btn btn-default btn-sm" onClick={this.deleteFaculty} value={item.id}><i className="glyphicon glyphicon-trash text-danger" ></i></button></div></td>
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

export default GenerateTimesheet;