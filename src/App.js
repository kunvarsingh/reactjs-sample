import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login/login';
import Signup from './signup/signup';
import Footer from './footer/footer';

// For reactjs Routing
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// for toater message
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

  render() {
    return (
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Digital Library!.</h1>
        </header>
        
        <ToastContainer autoClose={5000}/>

        <Router>
          <div>

             <ul>
               <li>
                  <Link to="/login">Login</Link>
               </li>
               <li>
                  <Link to="/signup">Signup</Link>
               </li>
             </ul>

              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />

          </div>
        </Router>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
