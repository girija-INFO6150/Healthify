import React from 'react';
import Table from 'react-bootstrap/Table';
import NavSet from './coumun/NavSet'
import{Dropdown, Button, ButtonGroup,Form,Modal} from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Footer from './coumun/Footer'

class AdminTable extends React.Component {
constructor(){
  super();
  this.state={
    patientList:[],
    DoctorList:[],
    docData:'',
    modaldata:false,
  }
}

handleClose = () => {this.setState({modaldata:false})};
handleShow = () => {this.setState({modaldata:true})};



componentWillMount= ()=>{


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


  let URL = 'http://localhost:5000/api/patient/getall';

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
                        this.setState({ patientList: data.data.allpatientList })
                    } else {
                        console.log("error getting client data")
                    }
                })

            URL = 'http://localhost:5000/api/nutritionist/getDocotor';
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
                          DoctorList: data.data.doctorList
                        })
                    } else {
                        console.log("error getting client data")
                    }
                })
}
 
handelSelect=(e)=>{
this.setState({docData:e.target.value})
}

submitData=(data)=>{
  if(this.state.docData==''){return}
   const sendData={
    "doctor_id":this.state.docData,
    "patients":[{"name":data.patientName,"user_id":data.user_id}]
   }
   console.log("data",sendData)
   const URL='http://localhost:5000/api/nutritionist/addpatient';

   fetch(URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendData),
})
    .then(res => res.json())
    .then(vdata=>{
      if(vdata.status===200){
        console.log("data recived",vdata)
        

  let URL = 'http://localhost:5000/api/patient/getall';

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
              this.setState({ patientList: data.data.allpatientList,docData:'' })
          } else {
              console.log("error getting client data")
          }
      })

  URL = 'http://localhost:5000/api/nutritionist/getDocotor';
  fetch(URL, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      }
  })
      .then(res => res.json())
      .then(data => {
          console.log("commentdata", data);
          if (data.status === 200) {
              this.setState({
                DoctorList: data.data.doctorList,
              })
          } else {
              console.log("error getting client data")
          }
      })
      }
    })

    this.handleShow();
}
render(){
    return(
      <>
      <NavSet/>
        <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Patient</th>
      <th>Nutition List</th>
      <th>Link</th>
    </tr>
  </thead>
  <tbody>
    {(this.state.patientList.length!=0)?
    <>
    {this.state.patientList.map(pdata=>(
      <tr>
      <td>#</td>
      <td>{pdata.patientName}</td>
      <td><Form.Control as="select" onChange={this.handelSelect}>
      <option >Select</option>
      {this.state.DoctorList.map(ddata=>(
        <>
        <option key={ddata.doctor_id} value={ddata.doctor_id}>{ddata.name}</option>        
        </>
      ))}
    </Form.Control></td>
    <td><Button variant="info" onClick={()=>this.submitData(pdata)}>Link</Button></td>
      
      
      
    </tr>

    ))}
      
    </>
    
    :<tr><td colSpan="4">No New Patient!!!</td></tr>}
  </tbody>
</Table>
<Link className="nav-link text-center btn-block" to={"/docreg"}>Register Doctors</Link>
<Modal show={this.state.modaldata} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Patient has been Attahed</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
}



}



export default AdminTable;