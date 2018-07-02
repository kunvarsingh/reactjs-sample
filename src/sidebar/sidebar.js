import React, {Component} from 'react';
import axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CONST from '../global';
import { Form, Icon, Modal,Input, Button, Checkbox, Upload, InputNumber } from 'antd';
import { Table, Divider, DatePicker } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import LoginForm from './login-form'
import CreateEvent from '../event/event'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;


const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
      <Divider type="vertical" />
      <a href="javascript:;" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];


class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = { firstName: ''};
    this.handleChange = this.handleChange.bind(this);
    
    this.addContacts = this.addContacts.bind(this);
    this.addNotes = this.addNotes.bind(this);
    this.viewContacts =this.viewContacts.bind(this);
    this.logout =this.logout.bind(this);

    let user = JSON.parse(localStorage.getItem('user'));
    this.state = { visibleContract: false ,
                   visibleViewContacts : false,
                   visibleCreateEvent: false,
                   visibleEvent: false,
                  visibleViewEvent: false,
                   user : user,
                   redirectSignOut: false}
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  addNotes(){

  }
  
  // viewEvents(){
  //   this.setState({visibleEvent: true})
  // }

  addContacts(){
    this.setState({visibleContract: true});
  }

  viewContacts(){
      this.setState({visibleViewContacts: true});
  }

  logout(){
   // debugger;
    let obj = {userId : this.state.user.data._id};
    let self = this;
    axios.post(CONST.apiBaseURL+'api/logout', obj)
      .then(function (response) {
        //console.log(response);
        if(response.data.status==200){
          toast.dismiss();
          toast.success(response.data.message);
          localStorage.clear();

          //debugger;
          console.log("self.props", self.props);
          //self.props.history.push('/test')
          self.setState({redirectSignOut: true})
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

  handleOkCreateEvent = (e) => {
    this.setState({
      visibleCreateEvent: true,
    })
  }

  handleCancelCreateEvent = (e) => {
    this.setState({
      visibleCreateEvent: true,
    })
  }

  handleOkContract = (e) => {
    //console.log(e);
    this.setState({
      visibleContract: false,
      visibleViewContacts : false
    });
  }

  handleCancelContract = (e) => {
    //debugger;
    console.log(e);
    this.setState({
      visibleContract: false
    });
    //debugger;
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if(form.getFieldValue('lastName').length > 5 && form.getFieldValue('lastName').length < 10){
      
    }else{
      callback('lastName should be atlaest 10 characters')
    }
  }

  redirectSignOut = () => {
    <Redirect to='/' />
    this.state={};
  }

  render(){
    //console.log(this.state)
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
      {this.state.redirectSignOut && <Redirect to='/' />}
      <div className="nav-side-menu">
          <div className="brand">Brand Logo</div>
          <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
        
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

           <Modal
          title="Add Contact."
          visible={this.state.visibleContract}
          onOk={this.handleOkContract}
          onCancel={this.handleCancelContract}
        >
        <LoginForm />
        </Modal>
        <Modal
              title="View Contact."
              visible={this.state.visibleViewContacts}
              onOk={this.handleOkContract}
              onCancel={this.handleCancelContract}>

              <Table columns={columns} dataSource={data} />
        </Modal>
        <Modal 
            title="Create Event"
            visible={this.state.visibleCreateEvent}
            onOk={this.handleOkCreateEvent}
            onCancel={this.handleCancelCreateEvent}>
          <CreateEvent /> 
        </Modal>
        <Modal
              title="View Event."
              visible={this.state.visibleCreateEvents}
              onOk={this.handleOkCreateEvent}
              onCancel={this.handleCancelCreateEvent}>

              <CreateEvent />
        </Modal>
      </div>
    </div>
      );
  }
}

export default Form.create()(Sidebar);

