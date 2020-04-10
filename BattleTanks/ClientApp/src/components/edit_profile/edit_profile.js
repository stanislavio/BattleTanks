import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../fields/input_text_field";
import { connect } from "react-redux";
import validate from "../fields/validate";
import Button from "@material-ui/core/Button";
import { resetRegister } from "../../actions/register";
import "./edit_profile.css";
import { withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
  textPrimary: {
    color: "white",
  },
})(Button);

class EditProfile extends Component {
  componentWillUnmount = () => {
    this.props.resetRegister();
  };

  render() {
    const { pristine, reset, submitting, handleSubmit } = this.props;
    const { isSuccess, isError, isPending } = this.props.register;

    return (
      <>
        <form className="login-form text-center" onSubmit={handleSubmit}>
          <Field
            className="login-field mt-2"
            name="nickname"
            label="Nickname"
            component={renderTextField}
            type="text"
          />

          <Field
            className="login-field mt-2"
            name="email"
            label="Email"
            component={renderTextField}
            type="text"
          />

          <Field
            className="login-field mt-2"
            name="age"
            label="Age"
            component={renderTextField}
            type="number"
          />

          <Field
            name="password"
            label="Password"
            className="login-field mt-2"
            component={renderTextField}
            type="password"
          />

          <Field
            name="repeat_password"
            label="Confirm password"
            className="login-field mt-2"
            component={renderTextField}
            type="password"
          />

          <p className="text-danger mt-2">{isError}</p>

          <StyledButton
            className="text"
            fullWidth={true}
            disabled={pristine || submitting}
            type="submit"
            value="EditProfile"
            color="primary"
          >
            Sign Up
          </StyledButton>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  register: state.register,
});

const mapDispatchToProps = (dispatch) => {
  return {
    resetRegister: () => dispatch(resetRegister()),
  };
};

EditProfile = reduxForm({
  form: "registr",
  validate: validate,
})(EditProfile);

EditProfile = connect(mapStateToProps, mapDispatchToProps)(EditProfile);

export default EditProfile;
