import React from "react";
import PropTypes from 'prop-types';
const Input = (props) => {
    const {f,d,l,n,t, oc, v, } = props;
    return(
        <div className="row">
        <div className="input-field col s10 offset-s1 m6 l3 offset-l4">
        <input value={v} name={n} id={d} type={t} className="validate" onChange={oc}/>
        <label htmlFor={f} className="active">{l}</label>
        </div>
        </div>
    )
}
Input.propTypes = {
    v : PropTypes.string.isRequired,
    t : PropTypes.string.isRequired,


}
export default Input;