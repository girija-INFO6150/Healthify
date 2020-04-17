import React, { Component } from 'react'
import { Container, Col, Image } from 'react-bootstrap';
import './About.css';
import Footer from '../Footer';
import NavSet from '../NavSet';

export default class About extends Component {
  componentDidMount=()=>{
    fetch('http://localhost:5000/api/verify',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':sessionStorage.getItem('Token')
              }
        })
        .then(res => res.json())
        .then(data =>{
            console.log("inside client",data);
            if(data.status==401){
                window.location.replace('http://localhost:3000/sign-in')
            }
        })
  }
  render() {
    return (
      <div className="one" >
        <video
			autoPlay 
			loop
			muted
			style={{
				position: "fixed",
  right: 0,
  bottom: 0,
  minWidth: "100%", 
  minHeight: "100%",
			}}
			>
            <source src="Assets/video/videoplayback.mp4" type="video/mp4"/>
        </video>
      <NavSet/>
        <Container>
        
          <Col>
            <h3>Let us help you be your best!</h3>
            <p>That's a crooked tree. We'll send him to Washington. These little son of a guns hide in your brush and you just have to push them out. These trees are so much fun. I get started on them and I have a hard time stopping. How to paint. That's easy. What to paint. That's much harder. Be brave. The man who does the best job is the one who is happy at his job.</p>
            <p>Anyone can paint. You can do anything here. So don't worry about it. Life is too short to be alone, too precious. Share it with a friend. Every highlight needs it's own personal shadow.</p>
            <p>That's what makes life fun. That you can make these decisions. That you can create the world that you want. Of course he's a happy little stone, cause we don't have any other kind. It's so important to do something every day that will make you happy.</p>
            <p>You better get your coat out, this is going to be a cold painting. That's the way I look when I get home late; black and blue. That's crazy. We're trying to teach you a technique here and how to use it.</p>
          </Col>
        </Container>
        <Footer/>
      </div>
    )
  }
}
