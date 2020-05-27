import React from 'react';
import GenericComponent from '../generic';
import * as ApiUtils from '../api.js';


class SyllabusUpload extends GenericComponent{

    constructor(props){
        super(props);
        this.state={
            disciplines:[],
            errormsg:'',
            infoMsg:'',
            isError: false,
            isMsg:false
        }
        this.getDesciplines();
    }
    getDesciplines = ()=> { 

        let p = ApiUtils.get('/Ga/disciplines',this.props);
        p.then((response)=>{
            return  response.json();
        }).then((json)=>{
            if(json){
                this.setState({
                    disciplines:json
                })  ;
            }
      
        }).catch((error)=>{
            alert('System Error');
        });
    }

    upload = () => {
         var selectedFile=document.getElementById("syllabus").files[0];
         var disciplineId=document.getElementById("disciplines").value;
         
        const formData = new FormData();
        formData.append('file', selectedFile);

       var p=ApiUtils.fileupload('/upload/'+disciplineId,formData,this.props);
        p.then((response)=>{
            this.setState({infoMsg:"uploaded successfully!",isError:false,isMsg:true,});   
            document.getElementById("syllabus").value = "";     
         }).catch((error)=>{
            this.setState({errormsg:"Error In Upload..!",isError:true,isMsg:false,}); 
            // alert('System Error: '+error);
         });
        
    };
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
        return(<div>
            <div className="page-header">
                <h3 className="text-primary bg-dark">Syllabus Upload:</h3>
            </div>

              {errorbutton}{infobutton}

            <div className="form-group">
                        <label  for="port">Disciplines:</label>
                        <select className="form-control" onChange={this.getUnAssignAcademics} id="disciplines">
                        <option key="NA" value="-1">Select</option>
                            {
                                this.state.disciplines.map((discipline) => (
                                    <option key={discipline.id} value={discipline.id}>{discipline.name}</option>
                                ))
                            }
                        </select>
             </div>  

             <div className="form-group">
                    <label className="control-label col-sm-2" >File:</label>
                    <div className="col-sm-8">
                        <input type="File" className="form-control" name="syllabus" id="syllabus"  />                       
                     </div>
                     <button type="submit" class="btn btn-primary" onClick={()=>this.upload()} >Upload</button>
                </div>


                

        </div>);
    }
}
export default SyllabusUpload;