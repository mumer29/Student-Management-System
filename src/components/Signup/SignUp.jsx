import React, {Component} from 'react';
import Input from '../../UICom/Input';
import Button from '../../UICom/Button';
import * as firebase from 'firebase';
import '../../config/fb'
class SignUp extends Component{
    constructor(){
        super();
        this.state={
            UserName:'',
            UserEmail:'',
            UserPass:''

        }

    }
    onAdd = (event) => {
        event.preventDefault();
    }
    whenChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name] : value})
    }
    whenClick = () =>{
        this.props.history.push('/LogIn');
    }
    render(){
        return(
            <div className="container">
            <br/>
            <br/>
            <div className="row">
            <div className="col s12 m6 l6 offset-l3 offset-m3">
            <form onSubmit={this.onAdd}>
            Name: <input name="UserName" value={this.state.UserName} type="text" onChange={this.whenChange}/>
            <br/>
            Email: <input name="UserEmail" value={this.state.UserEmail} type="text" onChange={this.whenChange}/>
            <br/>
            Password: <input name="UserPass" value={this.state.UserPass} type="password" onChange={this.whenChange}/> 
            <Button cn="btn" t="SignUp"/> &nbsp; &nbsp;
            <Button cn="btn" t="Already Account?" oc={this.whenClick}/>
            </form>
            </div>
            </div>
            </div>
        )
    }
}
export default SignUp;