import React, { useState } from 'react';
import { Navbar, NavItem, Image, Container, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function JumboSet() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="Assets/anj.jpeg"
          alt="First slide"
          height="350px"
          width="200"
        
        />
        {/*
        <Carousel.Caption>
         <div style={{ backgroundColor: 'lightgrey', opacity: "0.7", color: "black" }}>
            <h3>Changing lives one meal at a time.</h3>
            <p>A professional team of dietiticians and nutritionists.</p>
          </div> 
        </Carousel.Caption>*/}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="Assets/anj2.jpeg"
          alt="Second slide"
          height="350px"
          width="200"
        />

        <Carousel.Caption>
          <div style={{ backgroundColor: 'lightgrey', opacity: "0.7", color: "#2e5cb8" }}>
            <h2>Dietician Programs & Services</h2>
            <h5>A Network Of Innovative Registered Dietitians & Nutritionists</h5>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="Assets/anj3.jpeg"
          alt="Third slide"
          height="350px"
          width="200"
        />

        <Carousel.Caption>
          <div style={{ backgroundColor: 'lightgrey', opacity: "0.7", color: "#2e5cb8" }}>
            <h2>Give us a call today & learn more! </h2>
            <h5>
            We would love to talk to you.
          </h5>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default JumboSet;