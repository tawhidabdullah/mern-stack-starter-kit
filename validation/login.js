const validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateLoginInput(data) { // export validateRegister function 
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : ''; // 
  data.password = !isEmpty(data.password) ? data.password : ''; // 


  // EMAIL /////////////////////////////////////////

  if (validator.isEmpty(data.password)) {
    errors.password = 'password field is required';
  }


  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }


  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }



  return {
    errors,
    isValid: isEmpty(errors)
  }
};