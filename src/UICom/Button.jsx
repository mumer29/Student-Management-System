import React from 'react';

const Button = (props) => {
    const {t , cn , oc, Sid} = props
    return(<div>
        {oc !== undefined ? (<button className={cn} onClick={() => {oc(Sid)}}>{t}</button>
        ) : (
            <button className={cn}>{t}</button>
            )
        }
        </div>
    )
}
export default Button;