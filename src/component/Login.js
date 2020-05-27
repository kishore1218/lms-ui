import React from "react";
import ReactDOM from "react-dom";
import Header from './Header.js';
import Footer from './Footer.js';
import * as ApiUtils from './api.js';
import GenericComponent from './generic.js';
import musicbanner1 from '../music_1.jpg';
import musicbanner2 from '../music_2.jpg';
import musicbanner3 from '../music_3.jpg';

class Login extends GenericComponent{

    constructor(props){
       super(props);
       this.state={errormsg:"",error:false};
    }

    submitHandler=(event)=>{   

       event.preventDefault();
       let object = {};
       for(var i=0;i<event.target.elements.length;i++){
            var ele=event.target.elements[i];
            if(ele.value!=""){
                object[ele.name] = ele.value;
            }
        }

        var data = JSON.stringify(object);      
        let url='/authenticate';

        ApiUtils.post(url,data,this.props).then(res=>{
                  if(res.status==401){
                      this.setState({errormsg:"Invalid Credentials!",isError:true});
                  }else if(!res.ok){                                                      
                    throw Error("Bad Error");
                  }
                  return res.json();
        }).then(json=>{
            localStorage.setItem('auth-token',json.authToken); 
            localStorage.setItem('refreshtoken',json.refreshToken); 


           // alert(json.authToken);
            this.setState({errormsg:"",isError:false});
            this.golink('/dashboard');
        }).catch(error=>{
              throw Error("Bad Error");
        });
    }

    render(){
        const isError=this.state.isError;
        let button;
        if(isError){
            button=<div className="alert alert-danger"><strong>{this.state.errormsg}</strong></div> ;
        };
        return(        
        <div>
         <Header/>
          <div className="container-fluid">
                <div className="container">
                    <div className="page-header">
                        <h1>Login</h1>
                    </div> 
                    {button}       
  
                    <form name="form" onSubmit={this.submitHandler}>
                        <div className="form-group" >
                            <label htmlFor="userName"><span className="glyphicon glyphicon-user"></span> UserName</label>
                            <input type="text" className="form-control" name="userName" />
                        </div>
                        <div className="form-group" >
                            <label htmlFor="password"><span className="glyphicon glyphicon-user"></span> Password</label>
                            <input type="password" className="form-control" name="password" />
                        </div>
                        <div className="form-group">
			                <button type="submit"   className="btn btn-primary btn-block" ><span className="glyphicon glyphicon-log-in"></span> Login</button>
		                </div>
                     </form>                    
                </div>
            </div>

            <div className="container text-center">    
                        <h3>Events</h3><br/>
                        <div className="row">
                            <div className="col-sm-4">
                            <img src={musicbanner1} className="img-responsive" alt="Image"/>
                            <p></p>
                            </div>
                            <div className="col-sm-4"> 
                            <img src={musicbanner2} className="img-responsive"  alt="Image"/>
                            <p></p>    
                            </div>  
                            <div className="col-sm-4"> 
                            <img src={musicbanner3} className="img-responsive"  alt="Image"/>
                            <p></p>    
                            </div>     
                        </div>
                    </div><br/>
            <Footer/>
            </div>
        )
    }
}

export default Login;
