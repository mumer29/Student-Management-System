import React from 'react'

const Anchor = (props) =>{
    const{cn, oc, t} = props
  return (
      <a className={cn} onClick={oc}>{t}</a>
  )
}

export default Anchor
