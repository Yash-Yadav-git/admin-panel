// InputField.js

import React from "react";
import "../Header/./Header.css";

const InputField = ({
  label,
  type,
  name,
  value,
  min,
  placeholder,
  onChange,
  errorMessage,
}) => {
  return (
    <div className="input-container">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input-field"
        type={type}
        name={name}
        value={value}
        min={min}
        placeholder={placeholder}
        onChange={onChange}
      />
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};

export default InputField;
