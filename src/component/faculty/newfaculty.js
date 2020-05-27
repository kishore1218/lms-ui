import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';


class NewFaculty extends GenericComponent{

    constructor(){
        super();
        this.state={
            roles: [],
            supervisors:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        }
        this.getRoles();
        this.getSupervisors();
    }

    getSupervisors = ()=> { 

        let p = ApiUtils.get('/supervisors',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
                this.setState({
                    supervisors:json
                })         
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }
    getRoles = ()=> { 

        let p = ApiUtils.get('/Ga/roles',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    roles:json
                }) 
            }
        
        }).catch((error)=>{
            this.setState({errormsg:"Error In Loading..!",isError:true,isMsg:false,}); 
        });
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        let object = {};
        let login={};
        login['status']=1;
        object['loginAccount']=login;
        for(var i=0;i<event.target.elements.length;i++){
             var ele=event.target.elements[i];
             if(ele.value!=""){
                if(ele.name=='role'){
                    let role={};
                    role['id'] =ele.value;
                    object['role']=role;                  
                }
                else if(ele.name=='userName' || ele.name=='password'){

                    login[ele.name] = ele.value;                
                }
                else if(ele.type=='radio'){
                    if(ele.checked){
                        object[ele.name] = ele.value;
                    }                    
                }else{
                    object[ele.name] = ele.value;
                }                 
             }
         } 
         var data = JSON.stringify(object);
         let p=ApiUtils.post('/Ga/faculty',data,this.props);
         p.then((response)=>{
            this.setState({infoMsg:"Saved successfully!",isError:false,isMsg:true,});   
            this.golink('/faculty/facultylist');
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
            <div className="page-header">
                 <h1>User Registration</h1>
            </div>  
            {errorbutton}{infobutton}      
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="email">User Name:</label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" name="lastName" id="surName" placeholder="SurName"/>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" name="firstName" id="firstName" placeholder="First Name"/>
                        {/* <input type="text" className="form-control" name="middleName" id="middleName" placeholder="Middle Name"/> */}
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" >Gender:</label>
                    <div className="col-sm-10">
                        <label className="radio-inline">
                            <input type="radio" name="gender" value="male"/>Male
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="gender" value="female"/>Female
                        </label>
                    </div>
                </div>
                
                <div className="form-group">
                    <label className="control-label col-sm-2" >Mobile:</label>
                    <div className="col-sm-8">
                        <input type="mobile" className="form-control"  name="mobile" id="mobile" placeholder="### ### ####"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="email">Email:</label>
                    <div className="col-sm-8">
                        <input type="email" className="form-control" name="email" id="email" placeholder="Email"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" >Date of Birth:</label>
                    <div className="col-sm-8">
                        <input type="date" className="form-control" name="dob" id="dob" placeholder="dd/mm/yyyy" />                       
                     </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" for="designation">Designation:</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="designation" id="designation" placeholder="Designation"/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-2" for="qualification">Qualification:</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="qualification" id="qualification" placeholder="Qualification"/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-2" for="pan">PAN:</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="pan" id="pan" placeholder="PAN"/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-2" >Employee Type:</label>
                    <div className="col-sm-10">
                        <label className="radio-inline">
                            <input type="radio" name="employmentType" value="Permanet"/>Permanent
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="employmentType" value="Contract"/>Contract
                        </label>
                    </div>
                </div>

                <div className="form-group">
                        <label  className="control-label col-sm-2" for="role">Role:</label>   
                        <div className="col-sm-8">                     
                            <select className="form-control"  id="role" name="role">
                                <option key="-1" value="-1">Select</option>
                                {
                                    this.state.roles.map((role) => (
                                        <option key={role.id} value={role.id}>{role.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                    <label className="control-label col-sm-2" >Is Supervisor:</label>
                    <div className="col-sm-10">
                        <label className="radio-inline">
                            <input type="radio" name="isSupervisor" value="Y"/>Yes
                        </label>
                        <label className="radio-inline">
                            <input type="radio" name="isSupervisor" value="N"/>No
                        </label>
                    </div>
                </div>
                <div className="form-group">
                        <label  className="control-label col-sm-2" for="role">Supervisor:</label>   
                        <div className="col-sm-8">                     
                            <select className="form-control"  id="supervisor" name="supervisor">
                                <option key="-1" value="-1">Select</option>
                                {
                                    this.state.supervisors.map((sup) => (
                                        <option key={sup.id} value={sup.id}>{sup.lastName} {sup.firstName}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                <div className="form-group">
                    <label className="control-label col-sm-2" >Address:</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" name="addrLine1" id="addrLine1" placeholder="Street Address" />                       
                    </div>                      
                </div>
                <div className="form-group">
                <label className="control-label col-sm-2" ></label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" name ="city" id="city" placeholder="City" />                       
                    </div>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" name="state" id="state" placeholder="State" />                       
                    </div>
                </div>
                <div className="form-group">
                <label className="control-label col-sm-2" ></label>
                    <div className="col-sm-4">
                        <input type="number" className="form-control" name="zipCode" id="zipCode" placeholder="Zipcode" />                       
                    </div>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" name="country" id="country" placeholder="Country" />                       
                    </div>
                </div>

                <div className="form-group">
                <label className="control-label col-sm-2" >Credentials: </label>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" name="userName" id="userName" placeholder="username" />                       
                    </div>
                    <div className="col-sm-4">
                        <input type="text" className="form-control" name="password" id="password" placeholder="password" />                       
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>        
        </div>);
    }
}

export default NewFaculty;