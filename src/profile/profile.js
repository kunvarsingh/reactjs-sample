import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CONST from '../global';

class Profile extends Component{
	constructor(props){
		super(props);
		var user = JSON.parse(localStorage.getItem('user'));
		this.state = {email: '',firstName: '',userId : user.data._id, token : user.token};
		this.getProfile();
	}

	getProfile(){
		let obj = {userId : this.state.userId};
		let self = this;
		axios.post(CONST.apiBaseURL+'api/GetProfileByUserId', obj)
		  .then(function (response) {
		    if(response.data.status==200){
		    	debugger;
		    	// self.state.firstName = ;
		    	// self.state.email = response.data.data.email;
		    	self.setState({firstName : response.data.data.firstName, email : response.data.data.email});
		    }
		    else{
		    	toast.dismiss();
		    	toast.error(response.data.message);
		    }
		  })
		  .catch(function (error) {
		    console.log(error);
		  });

	}

	render(){
			return (
				<div>
					<input type="text" value={this.state.firstName}
	        id="firstName" class="form-control input-sm chat-input"/>

	        <input type="text" value={this.state.email}
	        id="email" class="form-control input-sm chat-input"/>
				</div>
		    );

	     {/*return (
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
         )
        */}

	}
}

export default Profile;