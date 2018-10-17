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
        this.ref.child('Student').on('value', (snapshot) => {
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
                <div className="teal">
                <div className="row">
                <div className="col s4 m3 l3 offset-l3 white-text">
                Name: 
                </div>
                <div className="col s3 m3 l3 white-text">
                {selectedStudent.Sname} 
                </div>
                </div>
                <div className="row">
                <div className="col s4 m3 l3 offset-l3 white-text">
                Father Name: 
                </div>
                <div className="col s3 m3 l3 white-text">
                {selectedStudent.Sfname} 
                </div>
                </div>
                <div className="row">
                <div className="col s4 m3 l3 offset-l3 white-text">
                Age:
                </div>
                <div className="col s3 m3 l3 white-text">
                {selectedStudent.Sage} 
                </div>
                </div>
                <div className="row">
                <div className="col s4 m3 l3 offset-l3 white-text">
                Gender: 
                </div>
                <div className="col s3 m3 l3 white-text">
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