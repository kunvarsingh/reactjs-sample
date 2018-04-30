import React , {Component} from 'react';	
import './singup.css';
import axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class Singup extends Component{
	constructor(props){
		super(props);
		this.state = {firstName :'', email :'', password :'', mobileno :''}
		this.handleChange = this.handleChange.bind(this);
		this.signup = this.signup.bind(this);
	}


    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    signup(){
		let obj = {email : this.state.email, password : this.state.password,firstName : this.state.firstName};
		let self = this;
		axios.post('http://52.66.185.83:4000/api/register', obj)
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

	render(){
		return(
			<div class="container">
				    <div class="row">
				        <div class="col-md-offset-5 col-md-3">
				            <div class="form-login">
				            <h4>Signup.</h4>
				            <input type="text" onChange={this.handleChange} value={this.state.firstName} name="firstName" class="form-control input-sm chat-input" placeholder="username" />
				            <br/>
				            <input type="text" onChange={this.handleChange} name="email" value={this.state.email} class="form-control input-sm chat-input" placeholder="email" />
				            <br/>
				            <input type="password" onChange={this.handleChange} name="password" value={this.state.password}  class="form-control input-sm chat-input" placeholder="password" />
				            <br/>
				            <input type="text" onChange={this.handleChange} name="mobileno" value={this.state.mobileno} class="form-control input-sm chat-input" placeholder="mobile no." />
				            <br/>
				            <div class="wrapper">	
				            <span class="group-btn">     
				                <a onClick={this.signup} class="btn btn-primary btn-md">Signup <i class="fa fa-sign-in"></i></a>
				            </span>
				            </div>
				            </div>
				        
				        </div>
				    </div>
				</div>
		);
	}
}

export default Singup;