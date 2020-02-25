import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {Link} from 'react-router-dom';

export const radioButton = ({ input, ...rest }) => (
  <FormControl>
    <RadioGroup {...input} {...rest}>
      <FormControlLabel value="blocked" control={<Radio />} label="Blocked" />
      <FormControlLabel value="unblocked" control={<Radio />} label="Unblocked" />
      <FormControlLabel value="all" control={<Radio />} label="All" />
    </RadioGroup>
  </FormControl>
)

export const DefaultLink = (props) => {
return <Link className='default-link color-link-white' to={props.to}>{props.children}</Link>
}

export const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'password',
    'RepeatPassword',
    'title',
    'description',
    'categories',
    'countryId',
    'cityId',
     'RepeatPassword',
     'oldPassword',
     'newPassword',
     'repeatPassword',
      'Birthday',
      'UserName'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  // if(new Date(values.date_from).getTime() <= new Date().getTime()){
  //   errors.date_from  = 'Date is incorrect';
  // }
  // if(new Date(values.date_from).getTime() >= new Date(values.date_to).getTime()){
  //   errors.date_to = 'Date is too low of start';
  // }
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  if (values.password !== values.RepeatPassword) {
    errors.RepeatPassword = 'Passwords do not match';
  }
  if (values.newPassword !== values.repeatPassword) {
    errors.repeatPassword = 'Passwords do not match';
  }
  if (new Date(values.Birthday).getTime() >= Date.now()) {
    
    errors.Birthday = 'Date is incorrect';
  }
   
    
  return errors
}

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

export const maxLength15 = maxLength(15)

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

export const minLength2 = minLength(6)
export const minLength3 = minLength(4)

export const renderTextArea = ({
    label,
    defaultValue,
    input,
    rows,
    meta: { touched, invalid, error },
    ...custom
  }) => (
  <TextField
  label={label}
  defaultValue={defaultValue}
  multiline
  rows="4"
  fullWidth
  {...input}
  error={touched && invalid}
  
  helperText={touched && error}
  variant="outlined"
/>)

export const renderTextField = ({
  label,
  defaultValue,
  input,
  rows,
  meta: { touched, invalid, error },
  ...custom
}) => (
    <TextField
      rows={rows}
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
)

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values) => {
  return sleep(1000).then(() => {
    if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
      throw { email: 'Email already Exists' }
    }
  })
}

export default asyncValidate;