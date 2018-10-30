import React from 'react'

function Checkbox(props) {
  const {wc} = props
    return (
    <div className="input-field">
    <p><label><input value="teacher" onChange={wc} name="Status" type="radio"/><span>Teacher</span></label></p>
    <p><label><input value="student" onChange={wc} name="Status" type="radio"/><span>Student</span></label></p>
    </div>
  )
}

export default Checkbox;
