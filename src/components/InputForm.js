import React from "react";
import PropTypes from "prop-types";

const InputForm = ({
  label,
  ...props
}) => {
  return (
    <label>
      <div>
        <span>{label}</span>
      </div>

      <div>
        <input {...props} />
      </div>
    </label>
  );
};

InputForm.propTypes = {
  label: PropTypes.node.isRequired,
};

export default InputForm;
