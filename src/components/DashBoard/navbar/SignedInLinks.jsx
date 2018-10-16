import React from 'react';
import {Link} from 'react-router-dom';
const SignInLinks = () => {
    return(
        <ul className="right">
        <li><Link to='/Addstudent'>Add Students</Link></li>
        <li><Link to='/LogOut'>LogOut</Link></li>
        </ul>
    )
}
export default SignInLinks;