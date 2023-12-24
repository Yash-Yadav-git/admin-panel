// SelectDropdown.js

import React from "react";
import "../Header/./Header.css";

const SelectDropdown = ({ label, value, options, onChange }) => {
  return (
    <div className="select-container">
      <label className="label" htmlFor={label}>
        {label}
      </label>
      <select className="select-field" value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
