import React, {Component} from 'react';
import * as firebase from 'firebase';
import Button from '../../../UICom/Button'
import '../../../config/fb';
import Loader from '../../Loader/Loader'
class Students extends Component{
    constructor(){
        super();
        this.state={
            Student:[],
            signIn: true
        }
        this.ref = firebase.database().ref();

    }
    componentDidMount(){
        
        this.getData();
    }
    getData = () => {
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
        this.ref.child(`Student/${id}`).remove();
  
    }
    onEdit = (id) => {
        const TemArr = this.state.Student.find((stu) => {
            return stu.id === id
        });
        this.props.history.push(`/Addstudent/${id}`, TemArr)
    }
    details = (id) => {
    this.props.history.push(`/details/${id}`);
    }


    render(){
        const {Student} = this.state;
        const StudentsList = Student.length ? (
            Student.map((s,i) => {
                return (
                    <div className="row teal lighten-5 z-depth-1" key={i}>
                    <div className="col s1 m1 l1 offset-l1">{++i}.</div>
                    <div className="col s3 m5 l5">
                    {s.Sname}
                    </div>
                    <div className="col s2 m2 l1">
                    <Button cn="btn-floating" Sid={s.id} oc={this.details}/>
                    </div>
                    {this.state.signIn ? (<div>
                    <div className="col s3 m2 l2">
                    <Button cn="btn" t="Edit" Sid={s.id} oc={this.onEdit}/>
                    </div>
                    <div className="col s3 m2 l2">
                    <Button cn="btn" t="Delete" Sid={s.id} oc={this.onDelete}/>
                    </div>
                    </div>) : (null)}
                    </div>
                )
            })
        ) : (
           <div className="row">
           <div className="col s5 m3 l2 offset-s4 offset-m5 offset-l5">
           <Loader />
           </div>
           </div>
        )
        return (
            <div className="container">
            <h3 className="center teal-text text-lighten-1">Students</h3>
            {StudentsList}
            </div>
        )
    }
}
export default Students;