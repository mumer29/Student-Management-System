import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = (props) => {

    return (
        <ul className="right">
            <li><NavLink to='/Addstudent'>Add Students</NavLink></li>
            <li><NavLink to='/LogOut'>Log out</NavLink></li>
            <li><NavLink to="/UserProfile" className='btn btn-floating teal lighten-1'>{props.name}</NavLink></li>
        </ul>
    )
}
export default SignedInLinks;