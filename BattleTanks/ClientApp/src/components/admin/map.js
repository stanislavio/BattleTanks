import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import Button from "@material-ui/core/Button";
import DropZoneField from "../helpers/DropZoneField";
import { renderTextArea } from "../helpers/helpers";
import { connect } from "react-redux";
import Module from "../helpers";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledButton = withStyles({
  textPrimary: {
    color: "white",
  },
})(Button);

const imageIsRequired = (value) => (!value ? "Required" : undefined);

const { validate } = Module;

class AddMapForm extends Component {
  state = { imagefile: [] };

  handleFile(fieldName, event) {
    event.preventDefault();
    // convert files to an array
    const files = [...event.target.files];
  }
  handleOnDrop = (newImageFile, onChange) => {
    if (newImageFile.length > 0) {
      const imagefile = {
        file: newImageFile[0],
        name: newImageFile[0].name,
        preview: URL.createObjectURL(newImageFile[0]),
        size: 1,
      };
      this.setState({ imagefile: [imagefile] }, () => onChange(imagefile));
    }
  };

  componentDidMount = () => {
    let values = this.props.form_values || this.props.initialValues;

    if (this.props.isCreated) {
      const imagefile = {
        file: "",
        name: "",
        preview: values.photoUrl,
        size: 1,
      };
      this.setState({ imagefile: [imagefile] });
    }
  };

  componentWillUnmount() {
    this.resetForm();
  }

  resetForm = () => this.setState({ imagefile: [] });

  render() {
    return (
      <form onSubmit={this.props.handleSubmit} encType="multipart/form-data">
        <div className="text text-2 pl-md-4 map-postition drop-image">
          <Field
            ref={(x) => {
              this.image = x;
            }}
            id="image-field"
            name="image"
            component={DropZoneField}
            type="file"
            imagefile={this.state.imagefile}
            handleOnDrop={this.handleOnDrop}
            validate={
              this.state.imagefile[0] == null ? [imageIsRequired] : null
            }
          />
          {/* <Button
            type="button"
            color="primary"
            disabled={this.props.submitting}
            onClick={this.resetForm}
            style={{ float: "right" }}
          >
            Clear
          </Button> */}
        </div>

        {/* <div className="mt-2">
              <Field name='coordinates' component={renderTextArea} type="input" label="Coordinates" />
            </div> */}

        <StyledButton
          fullWidth={true}
          type="submit"
          color="primary"
          disabled={this.props.submitting}
        >
          Save
        </StyledButton>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

AddMapForm = reduxForm({
  form: "add-map-form",
  validate: validate,
  enableReinitialize: true,
})(AddMapForm);

export default connect(mapStateToProps, mapDispatchToProps)(AddMapForm);
