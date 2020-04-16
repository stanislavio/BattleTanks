import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import validate from "../fields/validate";
import Button from "@material-ui/core/Button";
import "./edit_profile.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const ValidationTextField = withStyles({
  root: {
    "& > *": {
      color: "white",
      marginTop: "1vh",
    },
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  },
})(TextField);

const StyledButton = withStyles({
  textPrimary: {
    color: "white",
  },
})(Button);

class EditProfile extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <>
        <form className="form-field" onSubmit={handleSubmit}>
          <img className="image-right" src={""} />{" "}
          <ValidationTextField
            className="hove"
            label="Username"
            required
            variant="outlined"
            defaultValue=""
            id="validation-outlined-input"
          />
          <br />
          <ValidationTextField
            label="Email"
            required
            variant="outlined"
            defaultValue=""
            id="validation-outlined-input"
          />
          <br />
          <ValidationTextField
            label="Age"
            required
            variant="outlined"
            defaultValue=""
            id="validation-outlined-input"
          />
          <br />
          <ValidationTextField
            label="Gender"
            required
            variant="outlined"
            defaultValue=""
            id="validation-outlined-input"
          />
          <br />
          <StyledButton
            style={{ marginTop: "5vh" }}
            className="text"
            type="submit"
            value="Registration"
            color="primary"
          >
            Change profile data
          </StyledButton>
        </form>
      </>
    );
  }
}

export default connect()(EditProfile);
