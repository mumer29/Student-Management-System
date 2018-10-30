import React, { Component } from 'react';
import Button from '../../UICom/Button';
import InputS from '../../UICom/InputS';
import An from '../../UICom/An';
import * as firebase from 'firebase';
import '../../config/fb'
import './LogIn.css'
import Checkbox from '../../UICom/checkbox';
class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            UserEmail: '',
            UserPass: '',
            Status: '',
            SignUp: false,
            LogIn: true,
            ForgetPass: false,
            messageE: '',
            messageP: '',
            email: null,
            pass : null,
        }
        this.ref = firebase.database().ref();
    }
    onAdd = (event) => {
        event.preventDefault();
        if (this.state.LogIn) {
            if (this.state.UserEmail === '' || this.state.UserPass === '') {
                return
            }
            firebase.auth().signInWithEmailAndPassword(this.state.UserEmail, this.state.UserPass)
                .then((user) => { console.log("User Logged In") })
                .catch((error) => {
                    console.log({code: error.code,login: error.message});
                    if(error.code === "auth/invalid-email"){
                    this.setState({messageE: error.message, email: true})
                }
                    else if(error.code === "auth/wrong-password"){
                    this.setState({messageP: error.message, pass: true})
                    }
                    else if(error.code === "auth/user-not-found"){
                        this.setState({messageE: `We can't find an account with ${this.state.UserEmail}. Try another email, or if you don't have an account, you can Sign up.`,email: true})
                    }
                    else if(error.code === "auth/user-disabled"){
                        this.setState({messageE: `Sorry, This user account has been disabled by an administrator.`, email: true})
                    }
                })
        }
        else if (this.state.SignUp) {
            if (this.state.UserEmail === '' || this.state.UserPass === '' || this.state.Status === '') {
                return
            }
            firebase.auth().createUserWithEmailAndPassword(this.state.UserEmail, this.state.UserPass)
                .then((user) => {
                    this.ref.child(`Status${user.user.uid}`).push({status: this.state.Status})
                    console.log("New User Logged In")
            })
                .catch((error) => {
                    console.log({code: error.cod, signup: error.message, error: error})
                    if(error.code === "auth/invalid-email"){
                        this.setState({messageE: error.message, email: true})
                    }
                    else if(error.code === "auth/weak-password"){
                        this.setState({messageP: error.message, pass: true})
                        }
                    if(error.code === "auth/email-already-in-use"){
                        this.setState({messageE: error.message, email: true})
                        }
                    })
        }
    }
    changePass = (event) => {
        event.preventDefault();
        if (this.state.UserEmail === '') {
            return
        }
        const auth = firebase.auth();
        const email = this.state.UserEmail;
        auth.sendPasswordResetEmail(email)
        .then((user) => {console.log("User reset password request send")})
        .catch((error) => {console.log({error: error})})

        this.setState({
        UserEmail: '', ForgetPass: false, LogIn: true
        })

    }
    whenChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, email: null, pass: null, messageE: '', messageP: ''})

    }
    componentWillUnmount(){
        console.log({logIN: "componentWillUnmount"})
        this.setState({UserEmail: '',
        UserPass: '',
        SignUp: false,
        LogIn: true,
        Status: '',
        ForgetPass: false,
        messageE: '',
        messageP: '',
        email: null,
        pass : null,})
    }
    whenClick = () => {
        this.setState({
            UserEmail: '',
            UserPass: '',
            Status: '',
            SignUp: true,
            LogIn: false,
            ForgetPass: false,
            messageE: '',
            messageP: '',
            email: null,
            pass : null,
         })
        
    }
    WhenClick = () => {
        this.setState({
            UserEmail: '',
            UserPass: '',
            SignUp: false,
            LogIn: true,
            Status: '',
            ForgetPass: false,
            messageE: '',
            messageP: '',
            email: null,
            pass : null,
         })
    }
    WhenClicK = () => {
        this.setState({ 
            UserEmail: '',
            UserPass: '',
            SignUp: false,
            LogIn: false,
            Status: '',
            ForgetPass: true,
            messageE: '',
            messageP: '',
            email: null,
            pass : null,
         })
    }
    render() {
        return (
            <div className="l">
                <nav className="nav-wrapper teal darken-4">
                    <div className="container">
                        <span className="brand-logo hide-on-small-only">Student Management System</span>
                        <span className="hide-on-med-and-up">Student Management System</span>
                    </div>
                </nav>
                <br />
                <br />
                <br />
                <div className="container">
                    {this.state.LogIn ? (<div className="row">
                        <div className="col s12 m6 l6 offset-l3 offset-m3">
                            <div className="card z-depth-2">
                                <form onSubmit={this.onAdd}>
                                    <div className="card-content teal lighten-5">
                                        <div className="card-title z-depth-1 center teal white-text">Log In</div>
                                        <br/>
                                        <InputS n="UserEmail" v={this.state.UserEmail} t="text" oc={this.whenChange} f="email" e={this.state.email} m={this.state.messageE} d="email" l="Email" />
                                        <InputS n="UserPass" v={this.state.UserPass} t="password" oc={this.whenChange} f="pass" p={this.state.pass} m={this.state.messageP} d="pass" l='Password' />
                                    </div>
                                    <div className="card-action teal lighten-5">
                                        <Button cn="btn form_bu" t="Log in" /> <An cn="blue-text form_a text-ligten-1 text" t="Forget Password?" oc={this.WhenClicK}/> <br/>
                                        <span className="grey-text darken-1">Don't have an account?</span>  &nbsp; <An cn="teal-text form_a text" t="Sign up" oc={this.whenClick} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>) : (null)}
                    {this.state.SignUp ? (<div className="row">
                        <div className="col s12 m6 l6 offset-l3 offset-m3">
                            <div className="card z-depth-2">
                                <form onSubmit={this.onAdd}>
                                    <div className="card-content teal lighten-5">
                                        <div className="card-title z-depth-1 center teal white-text">Sign Up</div>
                                        <br/>
                                        <InputS n="UserEmail" v={this.state.UserEmail} t="text" oc={this.whenChange} f="email" e={this.state.email} m={this.state.messageE} d="email" l="Email" />
                                        <InputS n="UserPass" v={this.state.UserPass} t="password" oc={this.whenChange} f="pass" p={this.state.pass} m={this.state.messageP} d="pass" l='Password' />
                                        <p className="teal-text text-lighten-1">Who are you?</p>
                                        <Checkbox wc={this.whenChange}/>
                                    </div>
                                    <div className="card-action teal lighten-5">
                                        <Button cn="btn form_bu" t="Sign up" />
                                        <span className="grey-text darken-1">Already have an account?</span> &nbsp; <An cn="teal-text form_a text" t="Log in" oc={this.WhenClick} />
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>) : (null)}
                        {this.state.ForgetPass ? (
                            <div className="row">
                            <div className="col s12 m10 l8 offset-l2 offset-m1">
                                <div className="card z-depth-2">
                                    <form onSubmit={this.changePass}>
                                        <div className="card-content teal lighten-5">
                                            <div className="card-title z-depth-1 center teal white-text">Reset Password</div>
                                            <br/>
                                            <div>Enter the email address you used when creating the account and click Send Password Reset Email. 
                                                A message will be sent to that address containing a link to reset your password.</div>
                                                <br/>
                                            <InputS n="UserEmail" v={this.state.UserEmail} t="text" oc={this.whenChange} f="email" d="email" l="Email Address" />
                                        </div>
                                        <div className="card-action teal lighten-5">
                                            <Button cn="btn form_bu" t="Send Password Reset Email" />
                                            <An cn="blue-text form_a text" t="Go Back" oc={this.WhenClick} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        ) : (null)}
                </div>
            </div>
        )
    }
}
export default LogIn;