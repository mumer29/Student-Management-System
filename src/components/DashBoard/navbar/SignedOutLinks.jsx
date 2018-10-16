import React from 'react';
import {Link} from 'react-router-dom';
const SignOutLinks = () => {
    return(
        <ul className="right">
        <li><Link to='/'>LogIn</Link></li>
        <li><Link to='/'>SignUp</Link></li>
        </ul>
    )
}
export default SignOutLinks;