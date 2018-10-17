import React from "react";
const Input = (props) => {
    const {f,d,l,n,t, oc, v} = props;
    return(
        <div className="row">
        <div className="col s3 offset-s4">
        <label htmlFor={f}>{l}</label>
        <input value={v} name={n} id={d} type={t} className="validate" onChange={oc}/>
          
        </div>
        </div>
    )
}
export default Input;