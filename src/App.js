import React, { Component } from 'react';
import FrontComp from './components/DashBoard/FrontCom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Students from './components/DashBoard/StudentData/students';
import AddStudents from './components/DashBoard/StudentData/Addstudent';
import LogOut from './components/DashBoard/LogOut';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <FrontComp />
      <Route exact path="/students" component={Students} />
      <Route exact path="/Addstudent" component={AddStudents} />
      <Route exact path="/LogOut" component={LogOut} />
      </div>
      </Router>
    );
  }
}

export default App;
