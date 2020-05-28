import React from "react";
import PropTypes from "prop-types";

const Select = props => (
  <div className="form-group">
    <select
      name={props.name}
      value={props.selectedOption}
      onChange={props.controlFunc}
      className="form-select"
      disabled={props.disabled}
      tabIndex={props.tabIndex}
    >
      <option value="">{props.placeholder}</option>
      {props.options.map(opt => {
        return (
          <option key={opt} value={opt}>
            {opt}
          </option>
        );
      })}
    </select>
  </div>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string,
  controlFunc: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.oneOf(["true", "false"]).isRequired,
  tabIndex: PropTypes.string.isRequired
};

export default Select;
