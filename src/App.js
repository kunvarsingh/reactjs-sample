import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login/login';
import Signup from './signup/signup';
import Footer from './footer/footer';
import Home from './home/home';
import Profile from './profile/profile';
import Event from './event/event';
import Landing from  './landing/landing';
import { Modal, Button } from 'antd';

// For reactjs Routing
import { BrowserRouter as Router, Route, Link ,Redirect} from "react-router-dom";

// for toater message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';

// social login
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';


class App extends Component {

  constructor(props) {
    super(props);
      this.props = { isloggedIn : true}
      // this.state = {visible: false, loggedIn : false };
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

  // if user login set true otherwise false
  checkUserlogin(){
    let status = localStorage.getItem('user');
    let user = JSON.parse(status);
    if(user) this.props = { isloggedIn : true}
  }

  render() {
    this.checkUserlogin();
    return (
      
      <div className="App">
      <h1 className="App-title">Welcome to Digital Library!.</h1>
        <ToastContainer autoClose={5000}/>

        {/*<div>
        <Button type="primary" onClick={this.showModal}>Open</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>*/}

        <Router>
          <div>
          <Route exact path="/" render={() => (
              this.props.isloggedIn ? (
                <Redirect to="/home"/>
              ) : (
                <Landing/>
              )
            )}/>

              <Route path="/Landing" component={Landing} />                       
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/home" component={Home} />
              <Route path="/profile" component={Profile} />
              <Route path="/event" component={Event} />
          </div>
        </Router>
        
      </div>
    );
  }
}

export default App;
