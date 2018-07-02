import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class SideBarContent extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
                <div className="menu-list">
                  <ul id="menu-content" className="menu-content collapse out">
                      <li>
                        <a href="#">
                        <i className="fa fa-dashboard fa-lg"></i> Dashboard
                        </a>
                      </li>

                      <li  data-toggle="collapse" data-target="#products" className="collapsed active">
                        <a href="#"><i className="fa fa-gift fa-lg"></i> UI Elements <span className="arrow"></span></a>
                      </li>
                      <ul className="sub-menu collapse" id="products">
                          <li className="active"><a href="#">CSS3 Animation</a></li>
                          <li><a href="#">General</a></li>
                          <li><a href="#">Buttons</a></li>
                          <li><a href="#">Tabs & Accordions</a></li>
                          <li><a href="#">Typography</a></li>
                          <li><a href="#">FontAwesome</a></li>
                          <li><a href="#">Slider</a></li>
                          <li><a href="#">Panels</a></li>
                          <li><a href="#">Widgets</a></li>
                          <li><a href="#">Bootstrap Model</a></li>
                      </ul>


                      <li data-toggle="collapse" data-target="#service" className="collapsed">
                        <a href="#"><i className="fa fa-globe fa-lg"></i> Services <span className="arrow"></span></a>
                      </li>  
                      <ul className="sub-menu collapse" id="service">
                        <li>New Service 1</li>
                        <li>New Service 2</li>
                        <li>New Service 3</li>
                      </ul>


                      <li data-toggle="collapse" data-target="#new" className="collapsed">
                        <a><i className="fa fa-car fa-lg"></i> New <span className="arrow"></span></a>
                      </li>
                      <ul className="sub-menu collapse" id="new">
                        <li>New New 1</li>
                        <li>New New 2</li>
                        <li>New New 3</li>
                      </ul>


                       <li>
                        <i className="fa fa-user fa-lg"></i> <Link to="/profile">Profile</Link>
                        </li>

                       <li>
                        <a onClick={this.addNotes}>
                        <i className="fa fa-users fa-lg"></i> Add Notes
                        </a>
                      </li>

                       <li>
                        <a onClick={this.addContacts}>
                        <i className="fa fa-users fa-lg"></i> Add Contacts
                        </a>
                      </li>

                       <li>
                        <a onClick={this.viewContacts}>
                        <i className="fa fa-users fa-lg"></i> View Contacts
                        </a>
                      </li>

                       <li>
                        
                        <Link to="/event" onClick={this.viewEvents}> Create event</Link>
                       
                      </li>

                       <li>
                        <a onClick={this.viewContacts}>
                        <i className="fa fa-users fa-lg"></i> Setting
                        </a>
                      </li>


                       <li>
                        <a onClick={this.logout}>
                        <i className="fa fa-users fa-lg"></i> Logout
                        </a>
                      </li>

                  </ul>
           </div>
        )}
}

export default SideBarContent;