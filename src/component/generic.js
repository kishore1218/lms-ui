import React from 'react';

export default class GenericComponent extends React.Component{

    constructor(props){
        super(props);        
    }

    golink=(path,data)=>{        
        this.props.history.push(path,data);
    }


    handleApiError=(response)=>{

        if(response.status==401){
            this.golink('/login');
        }
        if(response.status==500){
            this.golink('/error');
        }
    }
}