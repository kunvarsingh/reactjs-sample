import React, {Component} from 'react';
import { Form, Icon, Modal,Input, Button, Checkbox, Upload, InputNumber } from 'antd';
import { Table, Divider, DatePicker } from 'antd';
import axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const FormItem = Form.Item;

class LoginForm extends Component{
    constructor(props){
        super(props);

    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
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
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                {getFieldDecorator('firstName', 
                {
                    rules: [
                    { required: true, message: 'Please input your First Name!', whitespace: true},
                    { type : 'email', message : 'The input is not valid E-Mail'}],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" value={this.props.firstName} onChange={this.handleChange}/>
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
        )}
    }

export default Form.create()(LoginForm);
