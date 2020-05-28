import React from "react";
import PropTypes from "prop-types";

const SingleInput = props => (
  <div className="form-group">
    <label className="form-label">{props.title}</label>
    <input
      className="form-input"
      name={props.name}
      type={props.inputType}
      value={props.content}
      onChange={props.controlFunc}
      placeholder={props.placeholder}
      disabled={props.disabled}
      tabIndex={props.tabIndex}
    />
  </div>
);

SingleInput.propTypes = {
  inputType: PropTypes.oneOf(["text", "number"]).isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.oneOf(["true", "false"]).isRequired,
  tabIndex: PropTypes.string.isRequired
};

export default SingleInput;
