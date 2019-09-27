import React, { Component } from 'react';
import Header from '../header';
import './layout.css';

export default class Layout extends Component {


    render() {
    
        const { children } = this.props;

        return <div className="container-fluid">
            <Header />
            {children}
        </div>
    }
}