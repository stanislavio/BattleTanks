import React, { Component } from 'react';

export default class HelperPage extends Component{

    render() {
        return <div>
            {this.props.innerText}
        </div>
    }
}