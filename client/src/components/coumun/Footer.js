import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import './Footer.css';

const Footer = () => {
  return (

    
    <div className="main-footer">
 
    <MDBFooter color="blue" className="font-small">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
        
          <MDBCol md="4">
          <h5>Contact Us</h5>
          <p>
            <p> 360 Huntington Avenue,<br /> MA 10012, US</p>
            <p>
               wellness@health.com</p>
            <p>
             + 01 949 240 545
            </p>
          </p>
        </MDBCol>

          <MDBCol md="4">
            <h5 className="title">Latest Blog Posts</h5>
          <p>
            <a class="text-white" href="https://selecthealth.org/blog/2017/06/midnight-munchies/">Late-Night Munchies Done Right</a>
          </p>
          <p>
            <a class="text-white" href="http://alyselevine.com/10-signs-you-still-have-a-diet-mindset/">10 Signs You Still Have A Diet Mindset</a>
          </p>

          </MDBCol>

          <MDBCol md="4">
          <h5 className="title">Legal Information</h5>
      
          <p>The information presented is not a substitute for professional medical advice.
          Do not use this information to diagnose or treat a health problem or disease without consulting a qualified health care provider.
          No part of the contents of this web site may be reproduced or transmitted in any form or by any means, without the written permission of the publisher.
          <br/>Learn more about policies, terms & conditions. <br/>
          <a className="text-white" href="/terms-of-use-disclaimers-privacy-policy/">Terms of Use <br /></a>
          <a className="text-white" href="/terms-of-use-disclaimers-privacy-policy/">Privacy Policy</a>
          </p>
         
        </MDBCol>
    
        </MDBRow>
      </MDBContainer>
   
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a className="text-white" href="#"> Healthify.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>

   </div>
 
 
  );
}

export default Footer;