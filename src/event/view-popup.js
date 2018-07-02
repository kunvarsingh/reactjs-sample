import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './style.css'

const styles = {
    card: {
      maxWidth: 500,
    },
    media: {
      maxWidth: 500,
      height: 100,
      paddingTop: '56.25%', // 16:9
    },
  };

export default class EditFormDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
          };
    }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <a onClick={this.handleClickOpen}>View</a>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent className="dialog-content">
        <img className="image" src={this.props.event.Image} alt="Event Image" /> 
        {/* <CardMedia
          className={styles.media}
          image={this.props.event.Image.toString()} 
          title="Contemplative Reptile"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
          {this.props.event.EventName}
          </Typography>
          <Typography component="p">
          {this.props.event.Description}
          </Typography>
          <Typography component="p">
          {this.props.event.noOfperson}
          </Typography>
          <Typography component="p">
          {this.props.event.startDate}
          </Typography>
          <Typography component="p">
          {this.props.event.endDate}
          </Typography>
        </CardContent>
        <CardActions>
        </CardActions>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
