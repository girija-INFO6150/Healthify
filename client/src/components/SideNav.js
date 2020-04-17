import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';



class SideNav extends React.Component {
    constructor() {
        super();
        this.state = {
            patientList: [],
            selected: {}
        }
    }

    componentDidMount = () => {

        const URL = 'http://localhost:5000/api/nutritionist/getpatient/' + this.props.doctor_id;
        console.log('inside side nav', URL);
        fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
                if (data.status === 200) {
                    this.setState({ patientList: data.data.patients })
                }
                else {
                    console.log(data.data.err)
                }
            })
    }

    changeId = (value, Event) => {
        //console.log('changing value',value.user_id)
        this.props.setUser(value.user_id);
    }

    render() {
        return (

            <Navbar bg="black" expand="lg">
                <Navbar.Brand href="#">Patient Assigned</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto text-center">
                        {this.state.patientList.map((rows, id) => (
                            <Nav.Link href="#" onClick={() => this.changeId(rows, Event)} >{rows.name}</Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}


export default SideNav;