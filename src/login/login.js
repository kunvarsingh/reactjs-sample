import React, {Component} from 'react';
import './login.css';
import axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';


class Login extends Component {

	constructor(props) {
		super(props);
	    this.state = {email: '',password: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.login = this.login.bind(this);
	}

	login(){
		let obj = {email : this.state.email, password : this.state.password};
		let self = this;
		axios.post('http://52.66.185.83:4000/api/login', obj)
		  .then(function (response) {
		    console.log(response);
		    if(response.data.status==200){
		    	toast.dismiss();
		    	toast.success('You have successfully login!.');
		    }
		    else{
		    	toast.dismiss();
		    	toast.error(response.data.message);
		    	// self.state.password = '';
		    }
		  })
		  .catch(function (error) {
		    console.log(error);
		  });

	}
	
	
    
    handleChange(event) {
      this.setState({email: event.target.value});
    }
    handlePassword(event) {
      this.setState({password: event.target.value});
    }

	render(){
		return (
				<div class="container">
				    <div class="row">
				        <div class="col-md-offset-5 col-md-3">
				            <div class="form-login">
				            <h4>Login.</h4>
				            <input type="text" value={this.state.email}
        onChange={this.handleChange} id="userName" class="form-control input-sm chat-input" placeholder="username" />
				            <br/>
				            <input type="password" value={this.state.password}
        onChange={this.handlePassword} id="userPassword" class="form-control input-sm chat-input" placeholder="password" />
				            <br/>
				            <div class="wrapper">
				            <span class="group-btn">     
				                <a onClick={this.login} class="btn btn-primary btn-md">login <i class="fa fa-sign-in"></i></a>
				            </span>
				            </div>
				            </div>
				        
				        </div>
				    </div>
				</div>
		);
	}
}

export default Login;