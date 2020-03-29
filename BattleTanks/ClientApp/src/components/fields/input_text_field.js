import React from "react";

import TextField from "@material-ui/core/TextField";

const renderTextField = ({
  label,
  defaultValue,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    fullWidth
    label={label}
    placeholder={label}
    error={touched && invalid}
    defaultValue={defaultValue}
    value={defaultValue}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

export default renderTextField;
