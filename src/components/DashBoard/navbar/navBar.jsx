import React,{Component} from 'react';
import {NavLink, Link, withRouter} from "react-router-dom";
import * as firebase from 'firebase';
import "../../../config/fb";
import LogIn from '../../auth/LogIn';
import SignedInLinks from './SignedInLinks';
import Drawer from '@material-ui/core/Drawer';

import './navBar.css'

class NavBar extends Component{
    constructor() {
        super()
        this.state = {
          User: null,
          signIn: false,
          name: "",
          left: false,
          status: "",
          
        }
        this.ref = firebase.database().ref()
      }
      componentDidMount = () => {
        this.authListener();
      }
      authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            console.log("Current User Signed In");
            this.setState({User: user})
            this.getStatus(user.uid)
          } else {
            this.setState({User: null})
            console.log("No Signed In user")
          }
        });
      }
      getStatus = (uid) => {
        this.ref.child(`Status${uid}`).on("value", (snapshot)=> {
          const s = snapshot.val()
          let tems = ""
          for(let key in s){
            tems += s[key].status
          }
        this.setState({status: tems})
        })
      }
      changeName = () => {
        const user = this.state.User
        const name = user.displayName;
        if(name){
          let char = name.slice(0,1);
            let index = null
            let a = [...name]
            for(let i = 0; i < a.length; i++){
              if(a[i] === " "){
                index += a.indexOf(" ");
                char += a[index+1]
                }
            }
            return char;
        }
        else{ 
          const email = user.email;
          let char = email.slice(0,1);
          return char; 
        }
      }
      toggleDrawer = (open) => () => {
        this.setState({
          left : open,
        });
      };
    render(){
    const sideList = (
    <div className="list_width">
      <ul className="collection with-header">
      <li className="collection-header teal">
      <NavLink to="/UserProfile"><h5 className="white-text">{this.state.User ? (this.state.User.displayName ? (this.state.User.displayName
        ) : (this.state.User.email)
        ) : (null)}</h5>
      </NavLink>
      </li>
      <li className="collection-item"><NavLink className="grey-text" exact activeClassName="black-text" to="/students">Students</NavLink></li>
      {this.state.status === "teacher" ? (<li className="collection-item"><NavLink className="grey-text" exact activeClassName="black-text" to='/Addstudent'>Add Students</NavLink></li>) : (null)}
      <li className="collection-item"><NavLink className="grey-text" exact activeClassName="black-text" to='/LogOut'>Log out</NavLink></li>
      </ul>
      </div>
    );
        return (
            <div>
            {this.state.User ? (
        <nav className="nav-wrapper teal darken-4">
        <div className="container">
        <span onClick={this.toggleDrawer(true)} className="btn-small btn-floating transparent hide-on-large-only">
        <i className="material-icons">menu</i>
        </span>
        &nbsp;
        &nbsp;
        &nbsp;
        <span className="flow-text teal darken-4 hide-on-large-only">Student Management System</span>
        <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
          <div onClick={this.toggleDrawer(false)}>
            {sideList}
          </div>
        </Drawer>
        <span className="brand-logo hide-on-med-and-down">Student Management System</span>
        <ul className="right hide-on-med-and-down">
        <li><Link to="/students">Students</Link></li>
        <SignedInLinks s={this.state.status} name={this.changeName()}/>
        </ul>
        </div>
        </nav>) : (<LogIn />)}
        </div>
        )
    }
}
export default withRouter(NavBar);