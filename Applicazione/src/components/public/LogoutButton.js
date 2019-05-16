import React from 'react';
import {Button} from 'react-bootstrap'
import PropTypes from 'prop-types';

const LogoutButton = props => (
  <Button variant="dark" onClick={event => props.onLogoutUserClick(event)}>Logout</Button>
);

LogoutButton.propTypes = {
  // eslint-disable-next-line
    onLogoutUserClick: PropTypes.func.isRequired
};

export default LogoutButton;
