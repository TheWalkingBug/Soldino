import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import store from './store';
import getWeb3 from './util/web3/getWeb3';
import getContracts from './util/web3/getContracts';
import SoldinoAPI from './util/API/SoldinoAPI';

window.onload = function () {
  window.ethereum.enable()
    .then(() => getWeb3()
      .then(() => getContracts()
        .then(() => SoldinoAPI.init.setupAccountChecking())));
};


ReactDOM.render(<Root store={store} />, document.getElementById('root'));
