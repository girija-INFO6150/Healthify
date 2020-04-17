import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Button,Badge } from 'react-bootstrap';

import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBContainer, MDBLink } from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';

class NavSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      userName: (sessionStorage.getItem('userName')) ? sessionStorage.getItem('userName').split(' ') : []
    };
    this.onClick = this.onClick.bind(this);
  }

  handleabout = () => {
    window.location.replace('http://localhost:3000/about')
  }

  handleteam = () => {
    window.location.replace('http://localhost:3000/ourteam')
  }

  handlelogout = () => {
    window.location.replace('http://localhost:3000/sign-in')
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  handlehome=()=>{
    if(sessionStorage.getItem('role')==1){
      window.location.replace('http://localhost:3000/doctor')
    }else if(sessionStorage.getItem('role')==2){
      window.location.replace('http://localhost:3000/client')
    }
    else{
      window.location.replace('http://localhost:3000/admintab')
    }
  }

  render() {

    const bg = { backgroundColor: ' #2e5cb8' }

    return (
      <>
        <div>
          <Router>
            <header>

              <MDBNavbar style={bg} dark expand="md">
                <MDBNavbarBrand href="/">
                  <strong className="text-white text-uppercase"><img src="Assets/logo.png" height="35" alt="mdb logo" />Healthify&nbsp;&nbsp;&nbsp;</strong>
                  <Badge pill variant="warning">{this.state.userName[0]}</Badge>
                  
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.onClick} />
                <MDBCollapse isOpen={this.state.collapse} navbar>
                  <MDBNavbarNav right>
                    <MDBNavItem>
                      <MDBNavLink to="#" onClick={this.handlehome}><strong className="text-white text-uppercase ml-5">Home</strong></MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem active>
                      <MDBNavLink to="#" onClick={this.handleabout}><strong className="text-white text-uppercase ml-5">About</strong></MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#" onClick={this.handleteam}><strong className="text-white text-uppercase ml-5">Our Team</strong></MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#"><strong className="text-white text-uppercase ml-5">Contact Us&nbsp;</strong></MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink to="#" onClick={this.handlelogout}>  <Button variant="light"><strong className="text-uppercase">&nbsp;Logout</strong></Button></MDBNavLink>
                    </MDBNavItem>


                  </MDBNavbarNav>

                </MDBCollapse>
              </MDBNavbar>
            </header>
          </Router>
        </div>
      </>
    )
  }



}
export default NavSet;