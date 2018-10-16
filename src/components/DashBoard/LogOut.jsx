import React from 'react';
import Button from '../DashBoard/StudentData/UICom/Button';
const LogOut = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col s10 m4 l4">
                    <div className="card teal lighten-4">
                        <div className="card-content">
                            <span className="card-title black-text">LogOut</span>
                            <p class="Black-text">Are You Sure, You want to logout?</p>
                        </div>
                        <div className="card-action">
                            <Button cn="btn white black-text" t="Yes" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LogOut;