const validator = require("validator");
const isEmpty = require("./isempty");

module.exports = function validateProfileInput(data) {
  // export validateRegister function
  let errors = {};

  // convert undefined to ==>> string for handle, status , skills
  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";

  if (
    !validator.isLength(data.handle, {
      min: 3,
      max: 30
    })
  ) {
    errors.handle = "Handle must be between 3 and 30 characters";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "Profile  handle is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
