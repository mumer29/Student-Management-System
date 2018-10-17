import React, {Component} from 'react';
import * as firebase from 'firebase';
import '../../../config/fb';
import Input from '../../../UICom/Input';
import Button from '../../../UICom/Button';

class AddStudents extends Component{
    constructor(){
        super();
        this.state={
            StudentName: "",
            StudentFName: "",
            StudentAge:'',
            StudentGender: '',
            editId: null,
        }
        this.ref = firebase.database().ref();
    }
    componentDidMount(){
        this.onEdit();
    }
    onEdit = () => {
        const id = this.props.match.params.id;
        const TemObj = this.props.location.state;
        let name = TemObj.Sname;
        let fname = TemObj.Sfname;
        let age = TemObj.Sage;
        let gender = TemObj.Sgender;
        if(id){
            this.setState({editId: id, StudentName: name, StudentFName: fname, StudentAge: age, StudentGender: gender})
        }
        else{return}
    }
    onAdd = (event) => {
        event.preventDefault();
        const {StudentName, StudentFName, StudentAge, StudentGender, editId} = this.state;
        if(StudentName === '' || StudentFName === '' || StudentGender === '' || StudentAge === ''){
            return 
        }
        else if(editId !== null){
        this.ref.child(`Student/${editId}`).update({name: StudentName, fname: StudentFName, age: StudentAge, gender: StudentGender});
        }
        else{
        this.ref.child('Student').push({name: StudentName, fname: StudentFName, age: StudentAge, gender: StudentGender})
        }
        this.props.history.push('/students');
        this.setState({StudentName: '',StudentFName: '', StudentAge: '', StudentGender: ''})
    }
    whenChange = (event) =>{
        const {name, value} = event.target;
        this.setState({[name] : value})

    }
    render(){
        return(
            <div className="container">
            <div className="center teal darken-3 white-text">
            <h4>Add Student Form</h4>
            </div>
            <div className="teal lighten-5">
            <form onSubmit={this.onAdd}>
            <Input v={this.state.StudentName} oc={this.whenChange} t="text" f='name' d='name' l='Name' n="StudentName"/>
            <Input v={this.state.StudentFName} oc={this.whenChange}  t="text" f='fname' d='fname' l='Father Name' n="StudentFName"/>
            <Input v={this.state.StudentAge} oc={this.whenChange}  t="number" f='age' d='age' l='Age' n="StudentAge"/>
            <Input v={this.state.StudentGender} oc={this.whenChange}  t="text" f='gender' d='gender' l='Gender' n="StudentGender"/>
            <Button cn="btn-small right" t="Add Student"  />
            </form>
            </div>
            </div>
            
        )
    }
}
export default AddStudents;