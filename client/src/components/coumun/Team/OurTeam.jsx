import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import './OurTeam.css';
import Footer from '../Footer';
import NavSet from '../NavSet';

export default class OurTeam extends Component {
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
      <div>
      <NavSet/>
      <Container>
        <Jumbotron>
          <h2>Welcome to Healthify</h2>
          <p>Compare free quotes from local Nutritionists now!</p>
          <p>We will find nutritionists & dietitians in your area and do the legwork to contact them on your behalf.</p>
          <p>Post details of your nutritionists & dietitians requirements in moments, completely free.</p>
          <Link to="/about">
            <Button bsStyle="primary">Learn More</Button>
          </Link>
        </Jumbotron>
        <Row className="show-grid text-center">
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="Assets/p1.png" circle className="profile-pic"/>
            <h3>Dr. Lynn</h3>
            <p>Dr. Lynn is a Dermatologist who is currently associated with Boston General Hospital.
            She is involved in research and development for newer formulations. She has vast experience in dermato surgery,
            having worked with the best teachers in the field. 
            She has presented at numerous national meetings. Her particular areas of interest are Photo Dermatology and 
            connective Tissue Disorders. </p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="Assets/p2.png" circle className="profile-pic"/>
            <h3>Dr. Meyers</h3>
            <p>Ms. Meyers is a Clinical Nutritionist,Dietitian/Nutritionist and Sports Nutritionist in Boston,
             and has an experience of 11 years in these fields. He practices at Veritas Diagnostic
            in Boston and has obtained nutrition Certification from Apollo Hospitals in 2010.
            He is a member of Indian Dietetic Association. Some of the services provided by the doctor are: 
            Therapeutic diets,Diet Counselling,Medical Nutrition Therapy and Sports nutrition etc</p>
          </Col>
          <Col xs={12} sm={4} className="person-wrapper">
            <Image src="Assets/p3.png" circle className="profile-pic"/>
            <h3>Dr. Reid</h3>
            <p>Dr. Reid is a renowned Diabetologist in Boston, who is well known for managing complicated diabetic cases.
            Dr. Reid is often quoted by reputed newspapers such as the Boston Time, Gujarat Samachar, Lokmat, Sakaal and 
            Navbharat Times, and magazines such as The Week. She is often called to participate in patient education programmes on various TV channels and Radio Mirchi stations, as
            well as at events organised by NGOs. </p>
          </Col>
        </Row>
      </Container>
      <Footer/>
      </div>
    )
  }
}
