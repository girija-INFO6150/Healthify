import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Alert} from 'react-bootstrap';


export default class DocRegister extends Component {
    constructor() {
        super()
        this.state = {
            firstname: '',
            lastName: '',
            email: '',
            password: '',
            err: '',
            data: {}
        }
        this.handleFstNameChange = this.handleFstNameChange.bind(this);
        this.handleLstNameChange = this.handleLstNameChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.dismissError = this.dismissError.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount=()=>{
        if(sessionStorage.getItem('role')!=3){window.location.replace('http://localhost:3000/sign-in') }
        fetch('http://localhost:5000/api/verify', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': sessionStorage.getItem('Token')
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == 401) {
                    window.location.replace('http://localhost:3000/sign-in')
                }
                else{
                    this.setState({user_id:sessionStorage.getItem('User_id')})
                }
            })

    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleFstNameChange(evt) {
        this.setState({
            firstname: evt.target.value
        })
    }

    handleLstNameChange(evt) {
        this.setState({
            lastName: evt.target.value
        })
    }

    handleEmailChange(evt) {
        this.setState({
            email: evt.target.value
        })
    }

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value
        })
    }

    

    handleSubmit(evt) {
        evt.preventDefault();
        if (!this.state.firstname) {
            return this.setState({ error: 'First Name is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }

        if (!this.state.lastName) {
            return this.setState({ error: 'Last Name is required' });
        }

        if (!this.state.email) {
            return this.setState({ error: 'Email is required' });
        }

        

        var nameReg = /^[a-zA-Z]+$/
        var mailReg = /([\w\.]+)@([\w\.]+)\.(\w+)/;
        var passReg = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

        if (!this.state.email.match(mailReg)) {
            return this.setState({ error: 'Not a valid Email' });
        }

        if (!this.state.lastName.match(nameReg)) {
            return this.setState({ error: 'Not a valid Last Name' });
        }

        if (!this.state.firstname.match(nameReg)) {
            return this.setState({ error: 'Not a valid first Name' });
        }

        if (!this.state.password.match(passReg)) {
            return this.setState({ error: 'Password must contain 8 letters, 1 cap, 1 symblol, 1 numeric.' });
        }

        

        const udata = {
            "name": this.state.firstname + " " + this.state.lastName,
            "email": this.state.email,
            "role": 1,
            "password": this.state.password
        }


        this.setState({ data: udata }, () => {
            this.sendData(this.state.data);
        })
    }

    sendData = (data) => {
        console.log("data::::", data)

        fetch('http://localhost:5000/api/user/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == 200) {
                    console.log("there is a response", data);
                    this.setState({
                        firstname: '',
                        lastName: '',
                        email: '',
                        password: '',
                        
                    })
                }
                else {

                    this.setState({ error: data.data.err }, () => {
                        console.log("error log:::", this.state.error)
                    });
                }
            })
            .catch(err => {

            });

    }



    render() {
        return (
            <div className="auth-wrapper mt-2">
                <div className="auth-inner">
                    <form onSubmit={this.handleSubmit}>
                        <h3>Doctor Register</h3>
                        { 
                            //console.log("error",)
                            this.state.error && <Alert  variant='danger'>
                            {this.state.error}&nbsp;&nbsp;
                            <button onClick={this.dismissError}>✖</button>
                          </Alert>
                            
                        }
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" placeholder="First Name" value={this.state.firstname} onChange={this.handleFstNameChange} />
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" placeholder="Last Name" value={this.state.lastName} onChange={this.handleLstNameChange} />
                        </div>


                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleEmailChange} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handlePassChange} />
                        </div>

                        

                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>

                    <br/> <Link className="nav-link text-center btn-block" to={"/admintab"}>Attach Doctors</Link>
                    <Link className="nav-link text-center btn-block" to={"/sign-in"}>logOut</Link>
                    </form>
                </div>
            </div>
        );
    }
}