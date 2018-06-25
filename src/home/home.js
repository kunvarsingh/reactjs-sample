import React, {Component} from 'react';
import './home.css';
import axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CONST from '../global';
import { Form, Icon, Modal,Input, Button, Checkbox } from 'antd';
import { Table, Divider } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Sidebar from '../sidebar/sidebar';

class Home extends Component{
	constructor(props){
		super(props);
		this.state = { obj : ''};
	}

	render(){
		 
		return(
        <div>
  		      i am home
            <Sidebar> </Sidebar>
        </div>
	    );
	}
}

export default Home;