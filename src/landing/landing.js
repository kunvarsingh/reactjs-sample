import React, { Component } from 'react';
import { Modal, Button } from 'antd';
// For reactjs Routing
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// for toater message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css'
// social login
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';


class Landing extends Component {

  constructor(props) {
    super(props);
      this.state = {visible: false };
      this.state = { isAuthenticated: false, user: null, token: ''};
  }

   logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
    };

    twitterResponse = (e) => {};

    facebookResponse = (e) => {};

    googleResponse = (e) => {
      debugger;
    };
    
    onFailure = (error) => {
      alert(error);
    }

   showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {

    return (
      
      <div className="App">
            <Link to="/login">Login</Link> <br/>
            <Link to="/signup">Signup</Link>
             <GoogleLogin
                        clientId="97243490713-opn6k1jf6pn7dbq0hvthnlf94p77tltm.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                    />
             <FacebookLogin
                        appId="1825461651058937"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.facebookResponse} />
              <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
                       onFailure={this.twitterResponse} onSuccess={this.twitterResponse}
                       requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"/>                                        
      </div>
    );
  }
}

export default Landing;
