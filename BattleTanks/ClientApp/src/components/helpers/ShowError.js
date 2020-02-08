import React from "react";
import PropTypes from "prop-types";

const ShowError = ({ error, touched }) =>
  touched && error ? (
    <div className="error">
      {error}
    </div>
  ) : null;

ShowError.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool
};

export default ShowError;
