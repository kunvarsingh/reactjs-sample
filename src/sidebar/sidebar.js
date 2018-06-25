import React, {Component} from 'react';
import axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import CONST from '../global';
import { Form, Icon, Modal,Input, Button, Checkbox } from 'antd';
import { Table, Divider } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const FormItem = Form.Item;

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
    this.state = { visible: false ,visibleViewContacts : false, user : user}
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  addNotes(){

  }
  
  viewEvents(){

  }

  addContacts(){
    this.setState({visible: true});
  }

  viewContacts(){
      this.setState({visibleViewContacts: true});
  }

  logout(){
    debugger;
    let obj = {userId : this.state.user.data._id};
    let self = this;
    axios.post(CONST.apiBaseURL+'api/logout', obj)
      .then(function (response) {
        console.log(response);
        if(response.data.status==200){
          toast.dismiss();
          toast.success(response.data.message);
          localStorage.clear();
          self.props.history.push('/')
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

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      visibleViewContacts : false
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      visibleViewContacts:false
    });
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if(form.getFieldValue('lastName').length > 5 && form.getFieldValue('lastName').length < 10){
      
    }else{
      callback('lastName should be atlaest 10 characters')
    }
    
  }

    handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        
        // let obj = {email : this.state.firstName};
    let self = this;
    axios.post('http://52.66.185.83:4000/api/addContacts', values)
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
    });
  }


  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div class="nav-side-menu">
          <div class="brand">Brand Logo</div>
          <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
        
              <div class="menu-list">
        
                  <ul id="menu-content" class="menu-content collapse out">
                      <li>
                        <a href="#">
                        <i class="fa fa-dashboard fa-lg"></i> Dashboard
                        </a>
                      </li>

                      <li  data-toggle="collapse" data-target="#products" class="collapsed active">
                        <a href="#"><i class="fa fa-gift fa-lg"></i> UI Elements <span class="arrow"></span></a>
                      </li>
                      <ul class="sub-menu collapse" id="products">
                          <li class="active"><a href="#">CSS3 Animation</a></li>
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


                      <li data-toggle="collapse" data-target="#service" class="collapsed">
                        <a href="#"><i class="fa fa-globe fa-lg"></i> Services <span class="arrow"></span></a>
                      </li>  
                      <ul class="sub-menu collapse" id="service">
                        <li>New Service 1</li>
                        <li>New Service 2</li>
                        <li>New Service 3</li>
                      </ul>


                      <li data-toggle="collapse" data-target="#new" class="collapsed">
                        <a><i class="fa fa-car fa-lg"></i> New <span class="arrow"></span></a>
                      </li>
                      <ul class="sub-menu collapse" id="new">
                        <li>New New 1</li>
                        <li>New New 2</li>
                        <li>New New 3</li>
                      </ul>


                       <li>
                        <i class="fa fa-user fa-lg"></i> <Link to="/profile">Profile</Link>
                        </li>

                       <li>
                        <a onClick={this.addNotes}>
                        <i class="fa fa-users fa-lg"></i> Add Notes
                        </a>
                      </li>

                       <li>
                        <a onClick={this.addContacts}>
                        <i class="fa fa-users fa-lg"></i> Add Contacts
                        </a>
                      </li>

                       <li>
                        <a onClick={this.viewContacts}>
                        <i class="fa fa-users fa-lg"></i> View Contacts
                        </a>
                      </li>

                       <li>
                        <a onClick={this.viewEvents}>
                        <Link to="/event"> Events </Link>
                        </a>
                      </li>

                       <li>
                        <a onClick={this.viewContacts}>
                        <i class="fa fa-users fa-lg"></i> Setting
                        </a>
                      </li>


                       <li>
                        <a onClick={this.logout}>
                        <i class="fa fa-users fa-lg"></i> Logout
                        </a>
                      </li>

                  </ul>
           </div>

           <Modal
          title="Add Contact."
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
      
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('firstName', 
          {
            rules: [
            { required: true, message: 'Please input your First Name!', whitespace: true},
            { type : 'email', message : 'The input is not valid E-Mail'}],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" value={this.state.firstName} onChange={this.handleChange}/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('lastName', {
            rules: [
            
            { whitespace: true, validator: this.validateToNextPassword }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Last Name" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your Email!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Email" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('mobileNo', {
            rules: [{ required: true, message: 'Please input your Mobile Number!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Mobile Number" />
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        

        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Add Contact
          </Button>
        </FormItem>
      </Form>

        </Modal>

          

        <Modal
              title="View Contact."
              visible={this.state.visibleViewContacts}
              onOk={this.handleOk}
              onCancel={this.handleCancel}>

                 <Table columns={columns} dataSource={data} />
        </Modal>
      

      </div>
      );
  }
}

export default Form.create()(Sidebar);

