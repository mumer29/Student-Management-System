import React,{Component} from 'react';
import {Link} from "react-router-dom";
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

class NavBar extends Component{
    constructor(){
        super();
        this.state={
            signIn: true
        }
    }
    render(){
        const {signIn} = this.state;
        const show = signIn ? (<SignedInLinks/>) : (<SignedOutLinks/>);
        return (
        <nav className="nav-wrapper teal darken-4">
        <div className="container">
        <span className="brand-logo">Student Management System</span>
        <ul className="right">
        <li><Link to="/students">Students</Link></li>
        {show}
        </ul>
        </div>
        </nav>
            )
    }
}
export default NavBar;