import React from "react";
const Input = (props) => {
    const {f,d,l,n,t, oc, v, lc} = props;
    return(
        <div className="row">
        <div className="input-field col s10 offset-s1 m6 l3 offset-l4">
        <input value={v} name={n} id={d} type={t} className="validate" onChange={oc}/>
        <label htmlFor={f} className={lc}>{l}</label>
        </div>
        </div>
    )
}
export default Input;