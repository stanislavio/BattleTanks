import React, { Component } from 'react';
import Login from '../components/login';
export default class LoginWraper extends Component {

    onSubmit = val => {
        console.log(val);
    }

    render() {

        return <>
            <div className="row height-100 justify-content-center align-items-center">
                <div className="col-3">
                    <Login onSubmit={this.onSubmit} />
                </div>
            </div>
        </>
    }
}