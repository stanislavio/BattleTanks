import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../fields/input_text_field";
import { connect } from "react-redux";
import validate from "../fields/validate";
import Button from "@material-ui/core/Button";
import "./login.css";
import { resetLogin } from "../../actions/login";
import Spinner from "../spinner";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
  textPrimary: {
    color: "white"
  }
})(Button);

class Login extends Component {
  componentWillUnmount = () => {
    this.props.resetLogin();
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    const { isError, isPending } = this.props.login;

    return (
      <>
        {isPending ? (
          <Spinner />
        ) : (
          <form className="login-form text-center" onSubmit={handleSubmit}>
            <Field
              className="login-field"
              name="email"
              label="Nickname or Email"
              component={renderTextField}
              type="text"
            />

            <Field
              className="login-field mt-2"
              name="password"
              label="Password"
              component={renderTextField}
              type="password"
            />

            <p className="mt-4 text-danger text-center">{isError}</p>

            <p className="mt-4">
              <Link to={"/registration"} className="text">
                Sign Up
              </Link>
            </p>

            <p className="mt-4">
              <Link to={"/forgot_password"} className="text">
                Forgot password?
              </Link>
            </p>

            <StyledButton
              className="text"
              fullWidth={true}
              disabled={pristine || submitting}
              type="submit"
              value="Login"
              color="primary"
            >
              Sign In
            </StyledButton>
          </form>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = dispatch => {
  return {
    resetLogin: () => dispatch(resetLogin())
  };
};

Login = reduxForm({
  form: "login",
  validate: validate
})(Login);

Login = connect(mapStateToProps, mapDispatchToProps)(Login);

export default Login;
