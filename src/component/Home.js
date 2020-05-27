import React from "react";
import ReactDOM from "react-dom";
import Header from './Header.js';
import Footer from './Footer.js';
import logo from '../homescreen.jpg';
import musicbanner1 from '../music_1.jpg';
import musicbanner2 from '../music_2.jpg';
import musicbanner3 from '../music_3.jpg';
import banner from '../banner.jpeg';


class Home extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
                 <div>
                     <Header/>

                     <div className="jumbotron ">
                        <div className="container text-center ">
                              
                            <div className="col-lg-6  justify-content-center " >
                            <h1>Art and Music Just best way to spend quality time</h1>
                            </div>
                            <div className="col-lg-6 " >
                            <img src={banner} className="img-responsive" alt=""/>
                            </div>
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
        );
    }
}
export default Home;