import React from 'react';


const validate = values => {
    const errors = {}
    const requiredFields = [
      'email',
      'password',
      'repeat_password',
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
    // if(values.password.length() < 6){
    //     errors.password = "Password has min 6 simbols";
    // }
    if (values.password !== values.repeat_password) {
      errors.repeat_password = 'Passwords do not match';
    }
      
    return errors
  }
  
export default validate;