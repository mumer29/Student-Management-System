import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Students from './components/DashBoard/StudentData/students';
import AddStudents from './components/DashBoard/StudentData/Addstudent';
import LogOut from './components/auth/LogOut';
import Details from './components/DashBoard/StudentData/Details';
import NavBar from './components/DashBoard/navbar/navBar';
import UserProfile from './components/auth/UserProfile';
class App extends Component {
 
  render() {
    return (
      <div>
        <Router>
        <div className="App">
          <NavBar/>
          <Route exact path="/students" component={Students} />
          <Route exact path="/Addstudent" component={AddStudents} />
          <Route exact path="/Addstudent/:id" component={AddStudents} />
          <Route exact path="/LogOut" component={LogOut} />
          <Route exact path="/Details/:id" component={Details} />
          <Route exact path="/UserProfile" component={UserProfile} />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
