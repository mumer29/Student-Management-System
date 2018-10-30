import React, {Component} from 'react';
import * as firebase from 'firebase';
import Button from '../../../UICom/Button'
import '../../../config/fb';
import Loader from '../../Loader/Loader'
class Students extends Component{
    constructor(){
        super();
        this.state={
            Student: null,
            signIn: true,
            User: {},
            status: '',
        }
        this.ref = firebase.database().ref();

    }
    componentDidMount(){
        console.log({students: "componentDidMount"})
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({User: user})
                this.getStatus(user.uid);
            } else {
                console.log({students: "current user null"})
            }
          });
          const editstudentId = this.props.match.params.id
          if(editstudentId){
            this.setState({edit: true})
          }
          this.getStudentsData();
    }
    getStatus = (uid) => {
        this.ref.child(`Status${uid}`).on("value", (snapshot)=> {
          const s = snapshot.val()
          let tems = ""
          for(let key in s){
            tems += s[key].status
          }
        this.setState({status: tems})
        })
      }
    componentWillUnmount(){
        console.log({student: "componentwillunmount"})
    }
    getStudentsData = () => {
        this.ref.child(`Student`).on('value', (snapshot) => {
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
    details = (id) => {
        this.props.history.push(`/details/${id}`);
    }
        
    onEdit = (id) => {
        this.props.history.push(`/Addstudent/${id}`)
    }
    AddStudent = () => {
        this.props.history.push(`/Addstudent`)
    }
    
    render(){
        const {Student, status} = this.state;
        const ShowData = Student ? (status === "teacher" ? (Student.length > 0 ? (<div>
                    <h3 className="center teal-text text-lighten-1">Students</h3>
                    {Student.map((s,i) => {
                    return (
                    <div className="row teal lighten-5 z-depth-1" key={i}>
                    <div className="col s1 m1 l1 offset-l1">{++i}.</div>
                    <div className="col s3 m5 l5">
                    {s.Sname}
                    </div>
                    <div className="col s2 m2 l1">
                    <Button cn="btn-floating" Sid={s.id} oc={this.details}/>
                    </div>
                    <div className="col s3 m2 l2">
                        <Button cn="btn" t="Edit" Sid={s.id} oc={this.onEdit}/>
                        </div>
                        <div className="col s3 m2 l2">
                        <Button cn="btn" t="Delete" Sid={s.id} oc={this.onDelete}/>
                        </div>
                    </div>)})}
                    <br />
                    <br />
                    <div className="center"><Button cn="btn" oc={this.AddStudent} t="Add More Students" /></div>
                    </div>): (<div className="center">
        <h3 className="teal-text text-darken-1">No, Student Data</h3>
        <Button cn="btn" t="Add Student" oc={this.AddStudent} />
    </div>) 
    ) : (Student.length > 0 ? (<div>
        <br/> <br/> <br/>
        <table><thead className="teal lighten-2 z-depth-1">
        <tr>
        <th>S.No</th>
        <th>Name</th>
        <th>Father Name</th>
        <th>Age</th>
        <th>Gender</th>
        </tr>
        </thead>
        <tbody>
        {Student.map((s,i) => {
        return (
        <tr key={i}>
        <td>{++i}.
        </td>
        <td>
        {s.Sname}
        </td>
        <td>
        {s.Sfname}
        </td>
        <td>
        {s.Sage}
        </td>
        <td>
        {s.Sgender}
        </td>
        </tr>)})}
        </tbody>
        </table>
        <br />
        <br />
        </div>): (<div className="center">
        <h3 className="teal-text text-darken-1">No, Student Data</h3>
        </div>))
        ) : (<div className="row">
           <div className="col s5 m3 l2 offset-s4 offset-m5 offset-l5">
           <Loader />
           </div>
           </div>
        )
        return (
            <div className="container">
            {ShowData}
            </div>
        )
    }
}
export default Students;