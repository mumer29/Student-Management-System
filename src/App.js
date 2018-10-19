import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Students from './components/DashBoard/StudentData/students';
import AddStudents from './components/DashBoard/StudentData/Addstudent';
import LogOut from './components/auth/LogOut';
import LogIn from './components/auth/LogIn';
import Details from './components/DashBoard/StudentData/Details';
import NavBar from './components/DashBoard/navbar/navBar';
import * as firebase from 'firebase';
import "./config/fb";
class App extends Component {
  constructor() {
    super()
    this.state = {
      User: {}
      
    }
  }
  componentDidMount = () => {
    this.authListener();
  }
  authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({User: user})
        console.log({state: user});
      } else {
        this.setState({User: null})
      }
    });
  }
  render() {
    return (
      <div>
      {this.state.User ? (
        <Router>
        <div className="App">
          <NavBar/>
          <Route exact path="/" component={Students} />
          <Route exact path="/Addstudent" component={AddStudents} />
          <Route exact path="/Addstudent/:id" component={AddStudents} />
          <Route exact path="/LogOut" component={LogOut} />
          <Route exact path="/Details/:id" component={Details} />
        </div>
      </Router>
      ) : (<LogIn />)}
      </div>
    );
  }
}

export default App;
