import React, { Component }  from 'react';
import NotFound from '../Route guard/404';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ModalWind from '../modal';
import { DefaultLinkBlack } from '../helpers/helpers';
import './home.css';


export default class Home extends Component{

    state = {
        open: false
    }

    openModal = () => {
        this.setState({open: true});
    }

    closeModal = () => {
        this.setState({open: false});
    }


    render() {
        
        return <>
        <div className="row width-100 height-100 justify-content-center align-items-center">
           {/* <Link to="/game"> */}
            <div className="btn round-button" onClick={this.openModal}>
                <i className="fa fa-play fa-2x"></i>
            </div>
            {/* </Link> */}
        </div>
        <ModalWind open={this.state.open} title={'hello'}>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={this.closeModal}>
                Cancel
                </Button>
                
                <DefaultLinkBlack to="/game">
                    <Button color="primary">Play</Button>
                </DefaultLinkBlack>
            </DialogActions>
        </ModalWind>
        </>

    }
}

