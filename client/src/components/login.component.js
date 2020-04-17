import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import{Alert} from "react-bootstrap";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            data: {},
            error: '',
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    componentDidMount= ()=>{
        sessionStorage.clear();
    }

    dismissError() {
        this.setState({ error: '' });
    }

    handleSubmit(evt) {
        evt.preventDefault();

        if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
        }

        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }

        var mailReg = /([\w\.]+)@([\w\.]+)\.(\w+)/;
        var passReg = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

        if (!this.state.username.match(mailReg)) {
            return this.setState({ error: 'not a valid email' });
        }

        var udata = {
            "email": this.state.username,
            "password": this.state.password
        }

        this.setState({ data: udata }, () => {
            this.sendData(this.state.data);
        });


    }

    sendData = (data) => {
        console.log("data::::", data)

        fetch('http://localhost:5000/api/user/login', {
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
                    sessionStorage.setItem("userName", data.data.name)
                    sessionStorage.setItem("Token", data.data.token)
                    sessionStorage.setItem("User_id",data.data._id)
                    sessionStorage.setItem("role",data.data.role)
                    if (data.data.role == 1) { window.location.replace('http://localhost:3000/doctor') }
                    else if(data.data.role == 2) { window.location.replace('http://localhost:3000/client') }
                    else{window.location.replace('http://localhost:3000/admintab') }
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


    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    };


    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }


    render() {
        return (
            
            <div className="auth-wrapper mt-5">
                <div className="auth-inner">
                
                    <form>
                        <h3>Sign In</h3>
                        { 
                            //console.log("error",)
                            this.state.error && <Alert  variant='danger'>
                            {this.state.error}&nbsp;&nbsp;
                            <button onClick={this.dismissError}>✖</button>
                          </Alert>
                            
                        }
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" className="form-control" placeholder="Email" value={this.state.username} onChange={this.handleUserChange} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePassChange} />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
                        <br /> Not Registered yet? <br/> Create an account using sign-up link. <Link className="nav-link text-center " to={"/sign-up"}>Sign up</Link>

                    </form>
                </div>
            </div>
        );
    }
}