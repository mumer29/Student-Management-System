import React, {Component} from 'react';
import Input from '../../UICom/Input';
import Button from '../../UICom/Button';
import * as firebase from 'firebase';
import '../../config/fb'
class LogIn extends Component{
    constructor(){
        super();
        this.state={
            UserEmail:'',
            UserPass:''

        }

    }
    onAdd = (event) => {

    }
    whenChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name] : value})

    }

    render(){
        return(
            <div className="container">
            <br/>
            <br/>
            <div className="row">
            <div className="col s12 m6 l6 offset-l3 offset-m3">
            <form onSubmit={this.onAdd}>
            Email: <input name="UserEmail" value={this.state.UserEmail} type="text" onChange={this.whenChange}/>
            <br/>
            Password: <input name="UserPass" value={this.state.UserPass} type="password" onChange={this.whenChange}/> 
            <Button cn="btn" t="LogIn"/> &nbsp; &nbsp;
            <Button cn="btn" t="Not Account?"/>
            </form>
            </div>
            </div>
            </div>
        )
    }
}
export default LogIn;