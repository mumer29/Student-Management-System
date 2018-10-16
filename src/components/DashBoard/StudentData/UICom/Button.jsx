import React from 'react';

const Button = (props) => {
    const {t,cn} = props
    return(
        <button className={cn}>{t}</button>
    )
}
export default Button;