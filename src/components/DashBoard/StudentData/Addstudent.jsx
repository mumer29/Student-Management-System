import React, {Component} from 'react';
import '../../../config/fb';
import Input from './UICom/Input';
import Button from './UICom/Button';

class AddStudents extends Component{
    render(){
        return(
            <div className="container">
            <div className="center teal darken-3 white-text"><h4>Add Student Form</h4></div>
            <div className="teal lighten-5">
            <Input t="text" f='name' d='name' l='Name' n="StudentName"/>
            <Input t="text" f='fname' d='fname' l='Father Name' n="StudentFN"/>
            <Input t="number" f='age' d='age' l='Age' n="StudentAge"/>
            <Input t="text" f='gender' d='gender' l='Gender' n="StudentGender"/>
            <Button cn="btn-small right" t="Add Student"  />
            </div>
            </div>
            
        )
    }
}
export default AddStudents;