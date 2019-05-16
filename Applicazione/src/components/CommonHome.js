import React from 'react';
import PropTypes from 'prop-types';
import CitizenHomeContainer from '../containers/citizen/CitizenHomeContainer';
import BusinessHomeContainer from '../containers/business/BusinessHomeContainer';
import GovernmentHomeContainer from '../containers/government/GovernmentHomeContainer';
import AlertMessage from './public/AlertMessage';

const CommonHome = (props) => {
  const {
    authData,
  } = props;

  if (authData.data.userType === 1) {
    return <CitizenHomeContainer />;
  }
  if (authData.data.userType === 2) {
    return <BusinessHomeContainer />;
  }
  if (authData.data.userType === 3) {
    return <GovernmentHomeContainer />;
  }
  return (
    <AlertMessage
      variant="info"
      message={'No account associated with your MetaMask account. You have to'
    + ' register one in order to get access to Soldino features.'}
    />
  );
};

CommonHome.propTypes = {
  // eslint-disable-next-line
  authData: PropTypes.object.isRequired,
};

export default CommonHome;
