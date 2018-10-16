import React from "react";
const Input = (props) => {
    const {f,d,l,n,t} = props;
    return(
        <div className="row">
        <div className="input-field col s3 offset-s4">
          <input name={n} id={d} type={t} className="validate"/>
          <label htmlFor={f}>{l}</label>
        </div>
        </div>
    )
}
export default Input;