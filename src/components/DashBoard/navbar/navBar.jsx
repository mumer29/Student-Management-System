import React,{Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as firebase from 'firebase';
import "../../../config/fb";
import LogIn from '../../auth/LogIn';
import SignedInLinks from './SignedInLinks';
class NavBar extends Component{
    constructor() {
        super()
        this.state = {
          User: {},
          signIn: false,
          
        }
      }
      componentDidMount = () => {
        this.authListener();
      }
      authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({User: user})
            console.log(user)
            console.log("Current User Signed In");
          } else {
            this.setState({User: null})
            console.log("No Signed In user")
          }
        });
      }
    render(){
        return (
            <div>
            {this.state.User ? (
        <nav className="nav-wrapper teal darken-4">
        <div className="container">
        <span className="brand-logo hide-on-small-only">Student Management System</span>
        <span className="btn btn-floating teal darken-2 hide-on-med-and-up">SMS</span>
        <ul className="right">
        <li><Link to="/students">Students</Link></li>
        <SignedInLinks />
        </ul>
        </div>
        </nav>) : (<LogIn />)}
        </div>
        )
    }
}
export default withRouter(NavBar);