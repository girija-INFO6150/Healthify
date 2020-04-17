import React from 'react'; 
import NavSet from './coumun/NavSet';
import JumboSet from './coumun/JumboSet';
import SideNav from './SideNav';
import DocData from './DocData';
import Footer from './coumun/Footer';

class Doctor extends React.Component {
    constructor(){
        super();
        this.state={
            doctor_id:(sessionStorage.getItem('User_id'))?sessionStorage.getItem('User_id'):'',
            user_id:'',
            userSet:false
        }
    }

    setUser= (user)=>{
        this.setState({user_id:user},()=>{
            console.log("data change",this.state.user_id);
            this.render();
            //DocData.render();
        })
    }
    componentWillMount=()=>{
        if(sessionStorage.getItem('role')!=1){window.location.replace('http://localhost:3000/sign-in') }
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

    render(){
        return(<div>
            <div>
              <NavSet/>
             </div>
             <div className="mx-auto my-3">
             <JumboSet />
             </div>
             <div>
                 <div>
                 <SideNav
                 doctor_id={this.state.doctor_id}
                 setUser={this.setUser}/>
                 </div>
                 <div style={{marginTop:'10px'}}>
                 <DocData user_id={this.state.user_id} />
                 </div>
             </div>
           <Footer/>
        </div>)
    }



}
export default Doctor;