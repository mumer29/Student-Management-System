import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../../../config/fb';
import Input from '../../../UICom/Input';
import Button from '../../../UICom/Button';

class AddStudents extends Component {
    constructor() {
        super();
        this.state = {
            StudentName: "",
            StudentFName: "",
            StudentAge: '',
            StudentGender: '',
            editId: null,
            edit: false,
            User: {},
            studentPervData: null
            
            
        }
        this.ref = firebase.database().ref();
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log("current user")
                this.setState({User: user})
                this.getStudentsData(user.uid)
            } else {
                console.log("current user null")
            }
          });
    }
    
    onEdit = (StudentData) => {
        const id = this.props.match.params.id;
        const Editstudent = StudentData.find((stu) =>{
            return stu.StudentID === id
        })
        if (Editstudent){
            console.log("edit student data");
                this.setState({ 
                editId: id, 
                lc: "active", 
                edit: "Edit Student",
                StudentName: Editstudent.name,
                StudentFName: Editstudent.fname,
                StudentAge: Editstudent.age,
                StudentGender: Editstudent.gender, 
             })
        }
       
    }
    getStudentsData = (uid) => {
        const id = uid
        this.ref.child(`Student/${id}`).on("value", (snapshot) => {
            const data = snapshot.val();
            const TempArr = [];
            for (let key in data) {
                TempArr.push({ StudentID: key, name: data[key].name, fname: data[key].fname, age: data[key].age, gender: data[key].gender });
            }
            this.onEdit(TempArr);
        })
    }
    onAdd = (event) => {
        let {User} = this.state;
        let userid = User.uid;
        event.preventDefault();
        const { StudentName, StudentFName, StudentAge, StudentGender, editId } = this.state;
        if (StudentName === '' || StudentFName === '' || StudentGender === '' || StudentAge === '') {
            return
        }
        else if (editId !== null) {
            this.ref.child(`Student/${userid}/${this.state.editId}`).update({ name: StudentName, fname: StudentFName, age: StudentAge, gender: StudentGender });
        }
        else {
            this.ref.child(`Student/${userid}`).push({ name: StudentName, fname: StudentFName, age: StudentAge, gender: StudentGender })
        }
        this.props.history.push('/students');
        this.setState({ StudentName: '', 
        StudentFName: '', StudentAge: '', StudentGender: '',
        lc: "active", 
        edit: false,
        editId: '', })
    }
    whenChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })

    }
    render() {
        return (
            <div className="container">
                <div className="center teal darken-3 white-text">
                    <h4>Add Student Form</h4>
                </div>
                <div className="teal lighten-5">
                    <form onSubmit={this.onAdd}>
                        <Input v={this.state.StudentName} oc={this.whenChange}  t="text" f='name' d='name' l='Name' n="StudentName" />
                        <Input v={this.state.StudentFName} oc={this.whenChange}  t="text" f='fname' d='fname' l='Father Name' n="StudentFName" />
                        <Input v={this.state.StudentAge} oc={this.whenChange}  t="number" f='age' d='age' l='Age' n="StudentAge" />
                        <Input v={this.state.StudentGender} oc={this.whenChange}  t="text" f='gender' d='gender' l='Gender' n="StudentGender" />
                        {this.state.edit ? (<Button cn="btn-small right" t={this.state.edit} />
                        ) : (
                        <Button cn="btn-small right" t="Add Student" />)}
                    </form>
                </div>
            </div>

        )
    }
}
export default AddStudents;