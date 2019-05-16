import React from 'react';
import {Button} from 'react-bootstrap'
import PropTypes from 'prop-types';

const LoginButton = props => (
    <Button variant="dark" onClick={() => props.onLoginUserClick()}> Login</Button>);

LoginButton.propTypes = {
  // eslint-disable-next-line
  onLoginUserClick: PropTypes.func.isRequired
};

export default LoginButton;
