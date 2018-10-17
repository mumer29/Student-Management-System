import React from 'react';
import {Link} from 'react-router-dom';
const SignOutLinks = () => {
    return(
        <ul className="right">
        <li><Link to='/LogIn'>LogIn</Link></li>
        <li><Link to='/SignUp'>SignUp</Link></li>
        </ul>
    )
}
export default SignOutLinks;