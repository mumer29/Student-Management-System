import React, {Component} from 'react';
import * as firebase from 'firebase';
import '../../../config/fb';
class Details extends Component{
    constructor(){
        super()
        this.state = {
            Students: []
        }
        this.ref = firebase.database().ref();
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("current user")
                this.getStudentData(user.uid)
            } else {
                console.log("current user null")
            }
          });
        
    }
    getStudentData = (uid) => {
        this.ref.child(`Student/${uid}`).on('value', (snapshot) => {
            const data = snapshot.val();
            const TemArr = [];
            for(let key in data){
                TemArr.push({id: key, Sname: data[key].name, Sfname: data[key].fname, Sage: data[key].age, Sgender: data[key].gender})
            }
            this.setState({Students: TemArr});
        })
    }
    render(){
        const {Students} = this.state;
        const id = this.props.match.params.id;
        const selectedStudent = Students.length > 0 ? (
            Students.find((value) => {
                return value.id === id;
            })
        ):(null)
        return(
            <div className="container">
            <h4 className="center teal-text">Student Details</h4>
            {selectedStudent ? (
                <div className="teal lighten-5">
                <div className="row">
                <div className="col s4 m3 l3 offset-l3 teal-text darken-5">
                Name: 
                </div>
                <div className="col s3 m3 l3 black-text">
                {selectedStudent.Sname} 
                </div>
                </div>
                <div className="row">
                <div className="col s4 m3 l3 offset-l3 teal-text darken-5">
                Father Name: 
                </div>
                <div className="col s3 m3 l3 black-text">
                {selectedStudent.Sfname} 
                </div>
                </div>
                <div className="row">
                <div className="col s4 m3 l3 offset-l3 teal-text darken-5">
                Age:
                </div>
                <div className="col s3 m3 l3 black-text">
                {selectedStudent.Sage} 
                </div>
                </div>
                <div className="row">
                <div className="col s4 m3 l3 offset-l3 teal-text darken-5">
                Gender: 
                </div>
                <div className="col s3 m3 l3 black-text">
                {selectedStudent.Sgender} 
                </div>
                </div>
                </div>
            ) : (
            <div className="center red-text"><h3>Loading . . .</h3></div>)
        }
        </div>
        )
    }
}
export default Details;