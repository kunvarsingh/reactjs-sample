import React, {Component} from 'react';
import axios  from 'axios';
import Sidebar from '../sidebar/sidebar';
import { Form, Icon, Modal,Input, Button, Checkbox, Upload, InputNumber, Popconfirm } from 'antd';
import { Table, Divider, DatePicker } from 'antd';
import CONST from '../global';
import "./test.css";
import { ToastContainer, toast } from 'react-toastify';
import EditFormDialog from './edit-popup'
import ViewFormDialog from './view-popup'

const { Column, ColumnGroup } = Table;
const confirm = Modal.confirm;

const FormItem = Form.Item;

class ViewEvent extends Component{
    constructor(props){
        super(props)
        this.state = {
            ModalText: 'Content of the modal',
            visibleEditEvent: false,
            confirmLoading: false,
            arratOfData: [],
            eventId: '',
            test: {},
            selectEventToEdit: {},
            //visibleViewEvent: false
        }
        this.getAllEvent.bind(this);
        this.showDeleteConfirm.bind(this);
    }

    componentDidMount(){
      this.getAllEvent();
    }

    getAllEvent() {
      axios.get('http://localhost:9000/event/getAllEvents').then((response) => {
        if(response.data.status == 200){
          console.log("getAllEvent" ,response.data)
          var value = []; 
          value.push(response.data);
          this.setState({arratOfData: value[0].data})
          console.log("value:" , value[0].data)
        }
        else{
          toast.dismiss();
              toast.error(response.data.message);
        }
      })
    }

    showDeleteConfirm(text){
      console.log("tfgdbxt", text)
      let eventId = {eventId : text._id};
      axios.post('http://localhost:9000/event/deleteEventById', eventId).then((response) => {
        if(response.data.status == 200){
          toast.success(response.data.message);
          this.getAllEvent();
        }
        else{
          toast.dismiss();
          toast.error(response.data.message);
        }
      })
    }

    //edit events
    render(){
        return(
          <div>
          <Sidebar />
            <div className="viewevent">
            <Table dataSource={this.state.arratOfData} rowClassName="editable-row">
              <Column
                  title="Event Name"
                  dataIndex="EventName"
                  key="EventName"
              />
              <Column
                title="Description"
                dataIndex="Description"
                key="Description"
              />
              <Column
                title="Number of person"
                dataIndex="noOfperson"
                key="noOfperson"
                />
              <Column
                title="Start date"
                dataIndex="startDate"
                key="startDate"
                />
              <Column
                title="End data"
                dataIndex="endDate"
                key="endDate"
                />    
              <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <span>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.showDeleteConfirm(record)}>
                      <a href="javascript:;">Delete</a>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <EditFormDialog event = {record} getAllEvent = {this.getAllEvent.bind(this)}/>
                    <Divider type="vertical" />
                    <ViewFormDialog event = {record}/>
                  </span>
                )}
              />
          </Table>  
            </div>
          </div>
        )
    }
}

export default ViewEvent;