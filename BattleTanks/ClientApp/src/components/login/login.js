import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import renderTextField from '../fields/input_text_field';
import { connect } from 'react-redux';
import validate from '../fields/validate';
import Button from "@material-ui/core/Button";
import './login.css';

class Login extends Component {

    render() {
        const { pristine, reset, submitting, handleSubmit } = this.props;
        return <>
            <form
                className="login-form"
                onSubmit={handleSubmit}>

                <Field name="email" label='Email' component={renderTextField} type="text" />

                <Field name="password" label='Password' component={renderTextField} type="password" />

                <Button fullWidth={true} disabled={pristine || submitting} type="submit" value="Login" color="primary">Sign In</Button>
            </form>
        </>
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

Login = reduxForm({
    form: 'login',
    validate: validate,
})(Login);

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;