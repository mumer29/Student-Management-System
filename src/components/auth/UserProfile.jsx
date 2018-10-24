import React, { Component } from 'react'
import Button from '../../UICom/Button';
import InputS from '../../UICom/InputS';
import An from '../../UICom/An';
import * as firebase from 'firebase';
import '../../config/fb'
import './LogIn.css'
class UserProfile extends Component {
  constructor(){
    super()
    this.state = {
      profile: true,
      edit: true,
    }
  }
  render() {
    return (
      <div className="container">
      </div>
    )
  }
}

export default UserProfile
