import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'; 
import axios  from 'axios';
import Sidebar from '../sidebar/sidebar';
import { Form, Icon, Modal,Input, Button, Checkbox, Upload, InputNumber } from 'antd';
import { Table, Divider, DatePicker } from 'antd';
import CONST from '../global';
import { ToastContainer, toast } from 'react-toastify';
//import Popup from './popup'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const { TextArea } = Input;

  const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 13, },
    
  };

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
                  startValue: null,
                  endValue: null,
                  endOpen: false,
                  image_address: '',
                  redirectview: false
                };
  }

  tokenImage = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];  
    reader.onloadend = (e) => {      
        var test = JSON.parse(localStorage.getItem('user'));
        var userId = test.data._id;
        var image = e.target.result.split(',')[1];
        console.log("test", e.target.result.split(',')[1])
        var obj = {
          image : image,
          userId : userId 
        }
        axios.post('http://localhost:9000/event/imageUploadOnCloud', obj)
        .then((response) => {
          debugger;
        if(response.data.status == 200){
          this.setState({image_address : response.data.url});
          toast.success(response.data.message);
        }
        else{
          console.log("Error in uploading image");
          toast.error(response.data.message);
        }
      })
    }
      
     reader.readAsDataURL(file)
   }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if(!err){
        console.log("Inside value",value)
      }
      let self = this;
      value.eventimage = this.state.image_address;
      debugger;
      axios.post('http://localhost:9000/event/create-event', value)
      .then((response) => {
        if(response.data.status == 200){
          toast.dismiss();
          toast.success(response.data.message);
          this.setState({redirectview: true})
        }
        else{
          toast.dismiss();
          toast.error(response.data.message);
        }
      }
    )})
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {this.state.redirectview && <Redirect to= "/viewevent" />}
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem {...formItemLayout} label="Name of event">
          {getFieldDecorator('eventname')(
            <Input placeholder="Event Name" onChange={this.handleChange}/>
          )}
        </FormItem> 
        <FormItem {...formItemLayout} label="Description of event">
        {getFieldDecorator('eventdescription')(
        <TextArea placeholder="Description of event" autosize={{ minRows: 3, maxRows: 10 }}/>
        )}
        </FormItem>
        <FormItem {...formItemLayout}
          label="Number of people"
        >
          {getFieldDecorator('eventperson', { initialValue: 3 })(
            <InputNumber min={1} max={100000} />
          )}
          <span className="ant-form-text"> Persons</span>
        </FormItem>
        <FormItem {...formItemLayout}
          label="Number of people"
        >
        {getFieldDecorator('eventstartdate')(
        <DatePicker
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={this.state.startValue}
          placeholder="Start"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
      )}

        {getFieldDecorator('eventenddate')(
        <DatePicker
          disabledDate={this.disabledEndDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={this.state.endValue}
          placeholder="End"
          onChange={this.onEndChange}
          open={this.state.endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
        )}
        </FormItem>

        <FormItem {...formItemLayout}
          label="Upload Image"
        >
        {getFieldDecorator('eventimage')(
          <div className="dropbox">
            <input type="file" onChange={this.tokenImage}/>
          </div>
        )}
        </FormItem>

        <FormItem wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}>
          <Button type="primary" htmlType="submit" {...formItemLayout}>
            Add Event
          </Button>
        </FormItem>
      </Form>
      <Sidebar></Sidebar>
      </div>
    );
  }
}

export default Form.create()(CreateEvent);

