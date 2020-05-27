import React from "react";
import {Link} from "react-router-dom";

class QuickLink extends React.Component{

    constructor(props){
        super(props);
        this.props=props;
    }

    render(){
        return(    
        <div className="col-lg-3">
                <Link to={this.props.path}>    
                <div className={this.props.paneltype}>
                    <div className="panel-heading">
                    <div className="row">
                        <div className="col-xs-6 ">
                        <h2>{this.props.quicklink}</h2>
                        </div>
                        <div className="col-xs-6 text-right">
                        <h1 className={this.props.classtype}></h1>
                        </div>
                    </div>
                    </div>
                </div>
                </Link>
            </div>
        )
    }
}
export default QuickLink;