import React from "react";
import classnames from "classnames";

const SelectListGroup = ({
  // props descructuring
  name,
  placeholder,
  info,
  onChange,
  value,
  errors,
  options
}) => {
  const selectOptions = options.map(option =>(
    <option key={option.label} value={option.value} >
        {option.label}
    </option>
  ))
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {errors && <div className="invalid-feedback"> {errors} </div>}
    </div>
  );
};

export default SelectListGroup;
