import React, { Component }  from 'react';
import NotFound from '../Route guard/404';
import { Link } from 'react-router-dom';
import './home.css';

export default class Home extends Component{

    render() {
        return <>
        hello
        <div className="row height-100 justify-content-center align-items-center notification-msg">
            <p className="text-center">Home page</p>
        </div>
        </>

    }
}

