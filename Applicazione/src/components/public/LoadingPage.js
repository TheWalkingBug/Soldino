import React from 'react';
// import loading from '../../img/loading.gif';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';

const LoadingPage = (props) => {
  const { message } = props;
  return (
    <div style={{ textAlign: 'center', marginTop: '2%' }}>
      <LoadingSpinner />
      <p>{message}</p>
    </div>
  );
};

LoadingPage.propTypes = {
  message: PropTypes.string,
};

LoadingPage.defaultProps = {
  message: '',
};

export default LoadingPage;
