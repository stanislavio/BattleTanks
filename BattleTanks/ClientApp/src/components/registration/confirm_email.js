import React, { Component } from 'react';
import { confirmEmail } from '../../actions/register';
import { connect } from 'react-redux';
import Spinner from '../spinner';

class ConfirmEmail extends Component{


    componentWillMount = () => {
        
        const { id, token } = this.props.match.params;

        this.props.confirmEmail({id: id, token: token})
    }


    render(){

        const { isSuccess, isError, isPending } = this.props.register;

        const content = isSuccess ? <p className="text-center">Our congratulation. Now you confirm your email and you can use our product)</p> : null;
        const spinner = isPending ? <Spinner /> : null; 
        const error = isError != null ? <p className="text-center">{isError}</p> : null;

        return <>
        <div className="row height-100 justify-content-center align-items-center notification-msg">
        {content}
        {spinner}
        {error}
        </div>
        </>
    }
}


const mapStateToProps = (state) => ({
    register: state.register
});

const mapDispatchToProps = (dispatch) => {
    return {
        confirmEmail: (data) => dispatch(confirmEmail(data))
    }
};

ConfirmEmail = connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);

export default ConfirmEmail;