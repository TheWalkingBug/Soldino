import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavbarCustom from './public/NavbarCustom';
import Footer from './public/Footer';

// Styles
import '../css/App.css';
import LoadingPage from './public/LoadingPage';

const App = (props) => {
  const { children, interactionLoading, loadingMessage } = props;
  return (
    <div>
      <NavbarCustom />
      {interactionLoading ? <LoadingPage message={loadingMessage} /> : null}
      <div>
        {children}
      </div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  // eslint-disable-next-line
    children: PropTypes.node.isRequired,
  interactionLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
};

const mapStateToProps = state => ({
  interactionLoading: state.fetchData.interactionLoading,
  loadingMessage: state.fetchData.loadingMessage,
});

export default connect(mapStateToProps, null)(App);
