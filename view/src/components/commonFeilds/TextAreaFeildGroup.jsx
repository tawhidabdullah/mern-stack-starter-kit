import React from "react";
import classnames from "classnames";
import "../styles_components/TextFeildGroup.css";

const TextAreaFeildGroup = ({
  // props descructuring
  name,
  placeholder,
  info,
  onChange,
  value,
  errors
}) => {
  return (
    <div className="form">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted" />}
      {errors && <div className="invalid-feedback"> {errors} </div>}
    </div>
  );
};

export default TextAreaFeildGroup;
