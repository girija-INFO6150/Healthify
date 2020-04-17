import React from 'react';
import './Client.css';
import NavSet from './coumun/NavSet';
import Data from './coumun/Data';
import JumboSet from './coumun/JumboSet';
import Footer from './coumun/Footer';
import { Row, Col } from 'react-bootstrap'

class Client extends React.Component {
    constructor(){
        super()
        this.state={
            user_id:(sessionStorage.getItem('User_id'))?sessionStorage.getItem('User_id'):'',
        }
    }
    componentDidMount = () => {
        if(sessionStorage.getItem('role')!=2){window.location.replace('http://localhost:3000/sign-in') }
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

    render() {
        return (
            <div className="w-100">
                <div>
                    <NavSet />
                </div>
                <div className="mx-auto my-3">
                    <JumboSet />
                </div>
                <div>
                    <Data user_id={this.state.user_id} />
                </div>
                <Footer/>
            </div>

        )


    }



}
export default Client;