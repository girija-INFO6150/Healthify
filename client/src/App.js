import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login.component";
import Doctor from "./components/Doctor";
import Client from "./components/Client";
import SignUp from "./components/registration.component";
import { render } from '@testing-library/react';
import AdminTable from "./components/AdminTable";
import OurTeam from './components/coumun/Team/OurTeam';
import About from './components/coumun/Team/About';
import DocRegister from './components/DocRegister';




function App() {
 
  return (
  <Router>
    <div className="App">
      <div>
        <div >
        
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
			      <Route path="/sign-up" component={SignUp} />
            <Route path="/doctor" component={Doctor} />
            <Route path="/client" component={Client} />
            <Route path="/about" component={About} />
            <Route path="/ourteam" component={OurTeam} />
            <Route path="/admintab" component={AdminTable} />
            <Route path="/docreg" component={DocRegister} />
          </Switch>
        </div>
      </div>
    </div>
    </Router>


  );

}
export default App;