import React, { Component } from 'react';
import AddMap from '../../containers/add_map';
import Table from '../helpers/tables';
import {Link} from 'react-router-dom';
import {DefaultLink} from '../helpers/helpers';

import './index.css';

export default class AdminPanel extends Component{

    render() {
            return <div className='mt-2 container'>
                    <div className='row'>
                        <div className='m-1 col-3 btn btn-info'>
                            Users
                        </div>
                        <div className='m-1 col-3 btn btn-info'>
                            <DefaultLink to={'/maps'}>Maps</DefaultLink>
                        </div>
                        <div className='m-1 col-3 btn btn-info'>
                            <DefaultLink to={'/tanks'}>Tanks</DefaultLink>
                        </div>
                    </div>
                </div>
        }
}
