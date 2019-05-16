import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import SoldinoRoutes from '../routes/SoldinoRoutes';

// Redux Store
import store from '../store';

class Root extends React.Component {
  render() {
    return (
      <div className="app">
        <Provider store={store}>
          <SoldinoRoutes />
        </Provider>
      </div>
    );
  }
}

Root.propTypes = {
  // eslint-disable-next-line
  store: PropTypes.object.isRequired,
};

export default Root;
