import React, { Component } from 'react';
import Button from '../../UICom/Button';
import InputS from '../../UICom/InputS';
import Anchor from '../../UICom/Anchor';
import * as firebase from 'firebase';
import '../../config/fb'
import './LogIn.css'
class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            UserEmail: '',
            UserPass: '',
            SignUp: false,
            LogIn: true,
        }

    }
    onAdd = (event) => {
        event.preventDefault();
        if (this.state.UserEmail === '' || this.state.UserPass === '') {
            return
        }
        else if (this.state.LogIn) {
            firebase.auth().signInWithEmailAndPassword(this.state.UserEmail, this.state.UserPass)
                .then((user) => { console.log(user) })
                .catch((error) => { console.log(error); })
        }
        else if (this.state.SignUp) {
            firebase.auth().createUserWithEmailAndPassword(this.state.UserEmail, this.state.UserPass)
                .then((user) => { console.log(user) })
                .catch((error) => { console.log(error); })
        }
    }
    whenChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })

    }
    whenClick = () => {
        this.setState({ SignUp: true, LogIn: false })
    }
    WhenClick = () => {
        this.setState({ SignUp: false, LogIn: true })
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
                                        <InputS n="UserEmail" v={this.state.UserEmail} t="text" oc={this.whenChange} f="email" d="email" l="Email" />
                                        <InputS n="UserPass" v={this.state.UserPass} t="password" oc={this.whenChange} f="pass" d="pass" l='Password' />
                                    </div>
                                    <div className="card-action teal lighten-5">
                                        <Button cn="btn form_bu" t="Log in" />
                                        <span className="grey-text darken-1">Don't have an account?</span>  &nbsp; <Anchor cn="teal-text form_a" t="Sign up" oc={this.whenClick} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>) : (<div className="row">
                        <div className="col s12 m6 l6 offset-l3 offset-m3">
                            <div className="card z-depth-2">
                                <form onSubmit={this.onAdd}>
                                    <div className="card-content teal lighten-5">
                                        <div className="card-title z-depth-1 center teal white-text">Sign Up</div>
                                        <InputS n="UserName" v={this.state.UserName} t="text" oc={this.whenChange} f="name" d="name" l="Name" />
                                        <InputS n="UserEmail" v={this.state.UserEmail} t="text" oc={this.whenChange} f="email" d="email" l="Email" />
                                        <InputS n="UserPass" v={this.state.UserPass} t="password" oc={this.whenChange} f="pass" d="pass" l='Password' />
                                    </div>
                                    <div className="card-action teal lighten-5">
                                        <Button cn="btn form_bu" t="Sign up" />
                                        <span className="grey-text darken-1">Already have an account?</span> &nbsp; <Anchor cn="teal-text form_a" t="Log in" oc={this.WhenClick} />
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>
        )
    }
}
export default LogIn;