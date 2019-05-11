const validator = require("validator");
const isEmpty = require("./isempty");

module.exports = function validateRegisterInput(data) {
  // export validateRegister function
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : ""; 
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : ""; 

  // NAME/////////////////

  if (
    !validator.isLength(data.name, {
      min: 2,
      max: 20
    })
  ) {
    errors.name = "Name must between 2 and 20 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // EMAIL /////////////////////////////////////////

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // PASSWORD ////////////////////////////

  if (validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  if (
    !validator.isLength(data.password, {
      min: 6
    })
  ) {
    errors.password = "password must between 6 characters";
  }

  // PASSWORD2 /////////////////////////////////////////

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "password must be the same";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
