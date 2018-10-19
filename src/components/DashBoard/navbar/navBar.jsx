import React,{Component} from 'react';
import {Link, withRouter} from "react-router-dom";

class NavBar extends Component{
    constructor(){
        super();
        this.state={
            signIn: null
        }
    }
    componentDidMount = () => {
    }
    
    render(){
        return (
        <nav className="nav-wrapper teal darken-4">
        <div className="container">
        <span className="brand-logo hide-on-small-only">Student Management System</span>
        <span className="btn btn-floating teal darken-2 hide-on-med-and-up">SMS</span>
        <ul className="right">
        <li><Link to="/">Students</Link></li>
        <li><Link to='/Addstudent'>Add Students</Link></li>
        <li><Link to='/LogOut'>Log out</Link></li>
        </ul>
        </div>
        </nav>
            )
    }
}
export default withRouter(NavBar);