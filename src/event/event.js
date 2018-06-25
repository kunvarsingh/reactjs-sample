import React, {Component} from 'react';
import axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../sidebar/sidebar';

class Event extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        I am in event
        <Sidebar></Sidebar>
      </div>
    );
  }
}

export default Event;

