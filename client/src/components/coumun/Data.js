import React, { useState, useEffect, } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap'


export default props => {
  const [changes, setChanges] = useState(false);
  const [doctorsComments, setDoctorsComments] = useState();
  const [clientData, setClientData] = useState({})
  const { name, email, age, sex, height, weight, daysExercise, foodAllergies } = clientData;
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    getClientData()
    getDoctorsComments()
  }, [])

  function getClientData() {
    let URL='http://localhost:5000/api/patient/getpatient/'+props.user_id;
    console.log('inside data')
    
    fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data=>{
              console.log("datarec",data)
              if (data.status === 200) {
                setClientData(data.data)
              } else {
                console.log("error getting client data")
              }
            })
    // get data from DB
       
  }

  function getDoctorsComments() {

    let URL='http://localhost:5000/api/patient/getcomment/'+props.user_id;
    fetch(URL,{
      method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
    })
    .then(res => res.json())
    .then(data=>{
      console.log("commentdata",data)
      if (data.status === 200) {
        setDoctorsComments(data.data.comments)
      } else {
        console.log("error getting client data")
      }
    })
  }

  function handleChanges(name, value) {
    setChanges(true)
    setClientData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  function handleClientData() {
    // logic to save changes to database goes here VV
    const data ={
      "_id":props.user_id,
      "height":height,
      "weight":weight,
      "age":age,
      "daysExcercise":daysExercise,
      "sex":sex,
      "foodAlagies":(foodAllergies)?foodAllergies:''
      }
      let URL='http://localhost:5000/api/patient/updatepatient'

      fetch(URL,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(result =>{
        console.log('dataUpdated',result)
      })



      console.log("senddata---",data);
    // logic to save changes to database goes here ^^
    setChanges(false)
    setEdit(false)
  }

  return (
    <>
      <Row className="mx-auto">
        <Col xl={4} xs={12} className="mx-auto">
          <Card>
            <Card.Body className="mx-auto">
              <Form>
                <Form.Row>
                  <Col xl={5} xs={12} className="mx-auto">
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control {...(false ? null : { disabled: true })} type="text" placeholder="Name" onChange={(e) => handleChanges("name", e.target.value)} defaultValue={name} />
                    </Form.Group>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control {...(false ? null : { disabled: true })} type="email" placeholder="Email" onChange={(e) => handleChanges("email", e.target.value)} defaultValue={email} />
                    </Form.Group>
                    <Form.Group controlId="age">
                      <Form.Label>Age</Form.Label>
                      <Form.Control {...(edit ? null : { disabled: true })} type="number" placeholder="Age" onChange={(e) => handleChanges("age", e.target.value)} defaultValue={age} />
                    </Form.Group>
                    <Form.Group controlId="sex">
                      <Form.Label>Sex</Form.Label>
                      <Form.Control {...(edit ? null : { disabled: true })} type="text" placeholder="Sex" onChange={(e) => handleChanges("sex", e.target.value)} defaultValue={sex} />
                    </Form.Group>
                  </Col>
                  <Col xl={5} xs={12} className="mx-auto">
                    <Form.Group controlId="height">
                      <Form.Label>Height (centimeters)</Form.Label>
                      <Form.Control {...(edit ? null : { disabled: true })} type="number" placeholder="Height" onChange={(e) => handleChanges("height", e.target.value)} defaultValue={height} />
                    </Form.Group>
                    <Form.Group controlId="weight">
                      <Form.Label>Weight (kilograms)</Form.Label>
                      <Form.Control {...(edit ? null : { disabled: true })} type="number" placeholder="Weight" onChange={(e) => handleChanges("weight", e.target.value)} defaultValue={weight} />
                    </Form.Group>
                    <Form.Group controlId="daysExercise">
                      <Form.Label>Days Exercising</Form.Label>
                      <Form.Control {...(edit ? null : { disabled: true })} type="number" placeholder="Days Exercising" onChange={(e) => handleChanges("daysExercise", e.target.value)} defaultValue={daysExercise} />
                    </Form.Group>
                    <Form.Group controlId="foodAllergies">
                      <Form.Label>Food Allergies</Form.Label>
                      <Form.Control {...(edit ? null : { disabled: true })} type="text" placeholder="Food Allergies" onChange={(e) => handleChanges("foodAllergies", e.target.value)} defaultValue={foodAllergies} />
                    </Form.Group>
                  </Col>
                </Form.Row>
                {
                  changes
                    ? <Button variant="warning" className="mb-2" onClick={() => handleClientData()}>Save Changes</Button>
                    : <Button variant="primary" className="mb-2" onClick={() => { setEdit(true); setChanges(true) }}>Edit</Button>}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} xl={7} className="mx-auto my-xl-0 my-2">
          <Card>
            {
              
              ((doctorsComments!=undefined)||((doctorsComments!=null)))
                ? Object.keys(doctorsComments).map(key => {
                  let comment = doctorsComments[key]

                  return (
                    <Card.Body>
                      <Card.Text>{comment}</Card.Text>
                    </Card.Body>
                  )
                })
                :
                <Card.Body>
                  <Card.Text>No comments yet!</Card.Text>
                </Card.Body>
            }
          </Card>
        </Col>
      </Row>
    </>
  )
}