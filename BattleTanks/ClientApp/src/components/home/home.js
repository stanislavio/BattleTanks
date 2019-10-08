import React, { Component }  from 'react';
import NotFound from '../Route guard/404';
import { Link } from 'react-router-dom';
import './home.css';

export default class Home extends Component{

    render() {
        return <>
        hello
        <Link to={'/login'} >Login</Link>
        </>

    }
}