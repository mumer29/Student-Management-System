import React from 'react'

const  InputS = (props) => {
    const {f,d,l,n,t, oc, v} = props;
  return (
    <div className="row">
    <div className="input-field col s10 m10 l10">
    <input value={v} name={n} id={d} type={t} className="validate" onChange={oc}/>
    <label htmlFor={f}>{l}</label>
    </div>
    </div>
  )
}

export default InputS
