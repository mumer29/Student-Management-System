import React, { Component } from 'react'
import Button from '../../UICom/Button';
import InputS from '../../UICom/InputS';
import An from '../../UICom/An';
import * as firebase from 'firebase';
import '../../config/fb'
import './LogIn.css'
import DefaultPic from '../../defaultPic.jpg';
class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      profile: true,
      edit: false,
      UserName: "",
      profilePic: "",
      User: {},
      UserData: {},
      lc: "active",
    }
  }
  componentDidMount() {
    this.getUserData();
  }
  getUserData = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("current user")
        let displayName = ''
        let phoneNumber = ''
        let photoURL = ''
        if (user.displayName !== null) {
          displayName = user.displayName;
        }
        if (user.phoneNumber !== null) {
          phoneNumber = user.phoneNumber;
        }
        if (user.photoURL !== null) {
          photoURL = user.photoURL;
        }

        let a = {
          uId: user.uid,
          dp: displayName,
          phn: phoneNumber,
          purl: photoURL,
          email: user.email
        }
        this.setState({ User: user, UserData: a })
      } else {
        console.log("current user null")
      }
    });
  }
  editProfile = () => {
    const { UserData } = this.state;
    this.setState({
      edit: true, profile: false,
      UserName: UserData.dp,
    })
  }
  showProfile = () => {
    this.setState({
      edit: false, profile: true,
      UserName: "",
    })
    this.getUserData();
  }
  whenChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, })

  }
  onAdd = (event) => {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    user.updateProfile({displayName: this.state.UserName})
    .then(() => {console.log("name updated")
    this.getUserData();})
    .catch((error) => {console.log(error)})
    this.setState({edit: false, profile: true,
      UserName: "",})
  }
  render() {
    const { UserData } = this.state;

    return (
      <div className="container">
        <br />
        <br />
        {this.state.profile ? (<div className="row">
          <div className="col s12 m8 l6 offset-l3 offset-m2">
            <div className="card teal lighten-5">
              <div className="card-image">
                {UserData.purl ? (<img src={UserData.purl} alt="user-profile" className="responsive-img" />
                ) : (
                    <img src={DefaultPic} alt="user-profile" className="pImage" />)}
                <span className="card-title blue-text text-darken-3">Change Photo</span>
                <span className="btn-floating halfway-fab waves-effect waves-light teal lighten-2" onClick={this.editProfile}><i className="material-icons">add</i></span>
              </div>
              <div className="card-content">
                <table>
                  <tbody>
                    <tr>
                      <th className="grey-text">Name:</th>
                      <td>{UserData.dp}</td>
                    </tr>
                    <tr>
                      <th className="grey-text">Phone Number: </th>
                      <td>{UserData.phn}</td>
                    </tr>
                    <tr>
                      <th className="grey-text">Email Address:</th>
                      <td>{UserData.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>) : (null)}
        {this.state.edit ? (<div className="row">
          <div className="col s12 m6 l6 offset-l3 offset-m3">
            <div className="card z-depth-2">
              <form onSubmit={this.onAdd}>
                <div className="card-content teal lighten-5">
                  <div className="card-title z-depth-1 center teal white-text">Edit Name</div>
                  <br />
                  <InputS n="UserName" lc={this.state.lc} v={this.state.UserName} t="text" oc={this.whenChange} f="name" e={this.state.email} d="name" l="Name" />
                </div>
                <div className="card-action teal lighten-5">
                  <Button cn="btn form_bu" t="Save Changes" />
                  <An cn="blue-text form_a text" t="Go Back" oc={this.showProfile} />
                </div>
              </form>
            </div>
          </div>
        </div>) : (null)}
      </div>
    )
  }
}

export default UserProfile
