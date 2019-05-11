import React from "react";
import classnames from "classnames";

const InputGroup = ({
  // props descructuring
  name,
  placeholder,
  onChange,
  value,
  icon,
  type,
  errors
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} ></i>
        </span>
      </div>
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errors && <div className="invalid-feedback"> {errors} </div>}
    </div>
  );
};

export default InputGroup;
