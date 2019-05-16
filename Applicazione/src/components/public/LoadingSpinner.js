import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => (
  <div style={{ textAlign: 'center', width: '100%' }}>
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default LoadingSpinner;
