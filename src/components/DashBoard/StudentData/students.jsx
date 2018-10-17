import React, {Component} from 'react';
import * as firebase from 'firebase';
import Button from '../../../UICom/Button'
import '../../../config/fb';
class Students extends Component{
    constructor(){
        super();
        this.state={
            Student:[]
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
            this.setState({Student: TemArr});
        })
    }

    onDelete = (id) => {
        
    }
    onEdit = (id) =>{
        
    }
    details = (id) => {
    this.props.history.push(`/details/${id}`);
    }


    render(){
        const {Student} = this.state;
        console.log(Student);
        const StudentsList = Student.length ? (
            Student.map((s,i) => {
                return (
                    <div className="row" key={i}>
                    <div className="col s1 m1 l1">{++i}.</div>
                    <div className="col s3 m5 l5">
                    {s.Sname}
                    </div>
                    <div className="col s3 m2 l2">
                    <Button cn="btn" t="Details" Sid={s.id} oc={this.details}/>
                    </div>
                    <div className="col s2 m2 l2">
                    <Button cn="btn" t="Edit" Sid={s.id} oc={this.onEdit}/>
                    </div>
                    <div className="col s3 m2 l2">
                    <Button cn="btn" t="Delete" Sid={s.id} oc={this.onDelete}/>
                    </div>
                    </div>
                )
            })
        ) : (
            <div className="center teal lighten-4">No Student Data</div>
        )
        return (
            <div className="container">
            <h3 className="center teal-text text-lighten-1">Students</h3>
            <div className="teal lighten-5">
            {StudentsList}
            </div>
            </div>
        )
    }
}
export default Students;