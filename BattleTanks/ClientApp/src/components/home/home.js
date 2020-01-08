import React, { Component }  from 'react';
import NotFound from '../Route guard/404';
import { Link } from 'react-router-dom';
import './home.css';

export default class Home extends Component{

    render() {
        return <>
        <div className="row width-100 height-100 justify-content-center align-items-center">
           <Link to="/game">
            <div className="btn round-button">
                <i className="fa fa-play fa-2x"></i>
            </div>
            </Link>
        </div>
        </>

    }
}

