import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AlertMessage = (props) => {
  const { variant, message } = props;
  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  );
};
AlertMessage.propTypes = {
  variant: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default AlertMessage;
