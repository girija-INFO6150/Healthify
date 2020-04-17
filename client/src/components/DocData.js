import React, { useState, useEffect, } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap'

class DocData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: (this.props.user_id) ? this.props.user_id : '',
            patientData: {},
            commentData: [],
            commentvalue:'',
        }
    }

    componentWillReceiveProps = (props) => {
        console.log('changing inside docdata', props)
        const userid = props.user_id
        let URL = 'http://localhost:5000/api/patient/getpatient/' + userid;

        fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("datarec", data)
                if (data.status === 200) {
                    this.setState({ patientData: data.data })
                } else {
                    console.log("error getting client data")
                }
            })

        let URL2 = 'http://localhost:5000/api/patient/getcomment/' + userid;
        fetch(URL2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log("commentdata", data)
                if (data.status === 200) {
                    this.setState({
                        commentData: data.data.comments
                    })
                } else {
                    console.log("error getting client data")
                }
            })
        this.setState({user_id:userid})
    }

    componentDidMount = () => {
        console.log('changing')
        if (this.props.user_id) {
            let URL = 'http://localhost:5000/api/patient/getpatient/' + this.state.user_id;
            console.log('inside data')

            fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log("datarec", data)
                    if (data.status === 200) {
                        this.setState({ patientData: data.data })
                    } else {
                        console.log("error getting client data")
                    }
                })

            URL = 'http://localhost:5000/api/patient/getcomment/' + this.state.user_id;
            fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log("commentdata", data)
                    if (data.status === 200) {
                        this.setState({
                            commentData: data.data.comments
                        })
                    } else {
                        console.log("error getting client data")
                    }
                })





        }
    }


    handleCommentChange=(evt)=>{
        this.setState({
            commentvalue: evt.target.value
        })
    }

    postComment=()=>{
        if(this.state.commentvalue!=='')
        {const data ={
            "_id":this.state.user_id,
            "comment":[this.state.commentvalue]
        }
        
        let url='http://localhost:5000/api/patient/commentUpdate'
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data=>{
            if(data.status===200){
                console.log('data recieve',data);
                this.setState({
                    commentData:[]
                },()=>
                {this.setState({
                    commentData:data.data.comment,
                    commentvalue:''
                })})
            }
            else{
                console.log('err',data);
            }
        })

    }else{
        console.log('no data to send');
    }

    }


    delComment=(data)=>{
        
        var newcomment=[];
        this.state.commentData.forEach(key=>{
            if(key!=data){
                newcomment.push(key);
            }
        })
        

        const sendData={
            user_id:this.state.user_id,
            comment:newcomment
        }

        console.log("del data",sendData)
        let url='http://localhost:5000/api/patient/deleteCom'
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        .then(res => res.json())
        .then(sdata=>{
            if(sdata.status===200){
                
                this.setState({
                    commentData:[]
                },()=>
                {this.setState({
                    commentData:sdata.data.comment,
                    commentvalue:''
                })})
            }
            else{
                console.log('err',data);
            }
        })


    }


    render() {
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
                                                <Form.Control {...(false ? null : { disabled: true })} type="text" placeholder="Name" defaultValue={this.state.patientData.name} />
                                            </Form.Group>
                                            <Form.Group controlId="email">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control {...(false ? null : { disabled: true })} type="email" placeholder="Email" defaultValue={this.state.patientData.email} />
                                            </Form.Group>
                                            <Form.Group controlId="age">
                                                <Form.Label>Age</Form.Label>
                                                <Form.Control {...(false ? null : { disabled: true })} type="number" placeholder="Age" defaultValue={this.state.patientData.age} />
                                            </Form.Group>
                                            <Form.Group controlId="sex">
                                                <Form.Label>Sex</Form.Label>
                                                <Form.Control {...(false ? null : { disabled: true })} type="text" placeholder="Sex" defaultValue={this.state.patientData.sex} />
                                            </Form.Group>
                                        </Col>
                                        <Col xl={5} xs={12} className="mx-auto">
                                            <Form.Group controlId="height">
                                                <Form.Label>Height (centimeters)</Form.Label>
                                                <Form.Control {...(false ? null : { disabled: true })} type="number" placeholder="Height" defaultValue={this.state.patientData.height} />
                                            </Form.Group>
                                            <Form.Group controlId="weight">
                                                <Form.Label>Weight (kilograms)</Form.Label>
                                                <Form.Control {...(false ? null : { disabled: true })} type="number" placeholder="Weight" defaultValue={this.state.patientData.weight} />
                                            </Form.Group>
                                            <Form.Group controlId="daysExercise">
                                                <Form.Label>Days Exercising</Form.Label>
                                                <Form.Control {...(false ? null : { disabled: true })} type="number" placeholder="Days Exercising" defaultValue={this.state.patientData.daysExercise} />
                                            </Form.Group>
                                            <Form.Group controlId="foodAllergies">
                                                <Form.Label>Food Allergies</Form.Label>
                                                <Form.Control {...(false ? null : { disabled: true })} type="text" placeholder="Food Allergies" defaultValue={this.state.patientData.foodAllergies} />
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} xl={7} className="mx-auto my-xl-0 my-2">
                        <Card>
                            {console.log('commentdata', this.state.commentData)}
                            {
                                (this.state.commentData.length != 0)
                                    ? this.state.commentData.map(rows => 
                                         (
                                            <Card.Body>
                                                <Card.Text>{rows} <button style={{float:"right"}} onClick={()=>this.delComment(rows)}>X</button></Card.Text>
                                            </Card.Body>
                                        )
                                    )
                                    :
                                    <Card.Body>
                                        <Card.Text>No comments yet!</Card.Text>
                                    </Card.Body>
                            }
                        </Card>
                        <Card>
                            <div class="form-group">
                                <input class="form-control" type="text" placeholder="Your comments" value={this.state.commentvalue} onChange={this.handleCommentChange}/>
                            </div>
                            <div class="form-group">
                                <Button class="btn btn-default" onClick={this.postComment}>Add Comment</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </>
        )
    }

}

export default DocData;
