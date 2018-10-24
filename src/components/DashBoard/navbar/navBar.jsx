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
          name: "",
          
        }
      }
      componentDidMount = () => {
        this.authListener();
      }
      authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log("Current User Signed In");
            const name = user.displayName;
            let char = name.slice(0,1);
            let index = null
            let a = [...name]
            for(let i = 0; i < a.length; i++){
              if(a[i] === " "){
                index += a.indexOf(" ");
                char += a[index+1]
                }
            }
            this.setState({User: user, name: char})
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
        <SignedInLinks name={this.state.name}/>
        </ul>
        </div>
        </nav>) : (<LogIn />)}
        </div>
        )
    }
}
export default withRouter(NavBar);