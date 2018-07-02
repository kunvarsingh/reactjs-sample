import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios  from 'axios';
import { ToastContainer, toast } from 'react-toastify';
export default class ViewFormDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
          obj: {
            EventName: this.props.event.EventName,
            Description: this.props.event.Description,
            Image: this.props.event.Image,
            startDate: this.props.event.startDate,
            endDate: this.props.event.endDate,
            noOfperson: this.props.event.noOfperson,
            _id: this.props.event._id
            },
            open: false,
        }; 
    }
  

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleEdit = () => {
    let payload = this.state.obj;
    axios.post('http://localhost:9000/event/updateEventById', payload).then((response) => {
      if(response.data.status == 200){
        toast.success(response.data.message, {timeOut: 50});
        this.props.getAllEvent();
        this.handleClose();
      }
      else{
        toast.error(response.data.message);
      }
    })
  }

  handleChange = name => event => {
      this.setState({obj: {...this.state.obj, [name]: event.target.value}})

      console.log(name ,"Name")
      console.log(this.state.obj.Description)
      console.log("obj", this.state.obj);
  }

  render() {
    console.log(this.props.event)
    return (
      <div>
        <a onClick={this.handleClickOpen}>Edit</a>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Events</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To edit the events, please enter details accordingly.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Event"
              fullWidth
              value={this.state.obj.EventName}
              onChange={this.handleChange('EventName')}
            />
            <TextField
              margin="dense"
              id="eventDescription"
              label="Event Description"
              value={this.state.obj.Description}
              onChange={this.handleChange('Description')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="eventImage"
              label="Image URL"
              value={this.state.obj.Image}
              onChange={this.handleChange('Image')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="noOfperson"
              label="Number of people"
              value={this.state.obj.noOfperson}
              onChange={this.handleChange('noOfperson')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Start Date"
              value={this.state.obj.startDate}
              onChange={this.handleChange('startDate')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="End Date"
              value={this.state.obj.endDate}
              onChange={this.handleChange('endDate')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleEdit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
