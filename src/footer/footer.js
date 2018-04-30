import React, {Component} from 'react';
import axios  from 'axios';
import './footer.css';
import { ToastContainer, toast } from 'react-toastify';


class Footer extends Component {

  constructor(props) {
    super(props);
     
  }

  render(){
    return (
       <div id="footer">
          <div class="container">
              <div class="row">
                  <h3 class="footertext">About Us:</h3>
                  <br/>
                    <div class="col-md-4">
                      <center>
                        <img src="http://oi60.tinypic.com/w8lycl.jpg" class="img-circle" alt="the-brains"/>
                        <br/>
                        <h4 class="footertext">Programmer</h4>
                        <p class="footertext">You can thank all the crazy programming here to this guy.</p><br/>
                      </center>
                    </div>
                    <div class="col-md-4">
                      <center>
                        <img src="http://oi60.tinypic.com/2z7enpc.jpg" class="img-circle" alt="..."/>
                        <br/>
                        <h4 class="footertext">Artist</h4>
                        <p class="footertext">All the images here are hand drawn by this man.</p><br/>
                      </center>
                    </div>
                    <div class="col-md-4">
                      <center>
                        <img src="http://oi61.tinypic.com/307n6ux.jpg" class="img-circle" alt="..."/>
                        <br/>
                        <h4 class="footertext">Designer</h4>
                        <p class="footertext">This pretty site and the copy it holds are all thanks to this guy.</p><br/>
                      </center>
                    </div>
                  </div>
                  <div class="row">
                  <p><center><a href="#">Contact Stuff Here</a> <p class="footertext">Copyright 2014</p></center></p>
              </div>
          </div>
      </div>
    );
  }
}

export default Footer;

