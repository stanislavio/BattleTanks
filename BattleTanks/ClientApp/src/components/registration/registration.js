import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import renderTextField from '../fields/input_text_field';
import { connect } from 'react-redux';
import validate from '../fields/validate';
import Button from "@material-ui/core/Button";

class Registration extends Component{

    render() {
        
        const { pristine, reset, submitting, handleSubmit } = this.props;
        const { isSuccess, isError, isPending } = this.props.register;

        return <>
            <form
                className="login-form text-center"
                onSubmit={handleSubmit}>

                <Field name="nickname" label='Nickname' component={renderTextField} type="text" />

                <Field name="email" label='Email' component={renderTextField} type="text" />

                <Field name="password" label='Password' className="mt-2" component={renderTextField} type="password" />

                <Field name="repeat_password" label='Confirm password' className="mt-2" component={renderTextField} type="password" />

                <p className="text-danger mt-2">{isError}</p>

                <Button fullWidth={true} disabled={pristine || submitting} type="submit" value="Registration" color="primary">Sign Up</Button>
            </form>
 
        </>

    }

}


const mapStateToProps = (state) => ({
    register: state.register
});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

Registration = reduxForm({
    form: 'registr',
    validate: validate,
})(Registration);

Registration = connect(mapStateToProps, mapDispatchToProps)(Registration);

export default Registration;