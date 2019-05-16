import { browserHistory } from 'react-router';
import store from '../../store';

/**
 * @module Init
 * */
const Init = {

  /**
   * Retrieve the web3 Instance.
   * @function getWeb3Instance
   * @returns web3 Instance object or undefined.
   * */
  getWeb3Instance() {
    const state = store.getState();
    return state && state.web3 ? state.web3.web3Instance : undefined;
  },

  /**
   * Retrieve the Cubit contract object
   * @function getCubitContract
   * @returns cubit contract object or undefined
   * */
  getCubitContract() {
    const state = store.getState();
    return state.contracts ? state.contracts.cubit : undefined;
  },

  /**
   * Retrieve the Government contract object
   * @function getGovernmentContract
   * @returns government contract object or undefined
   * */
  getGovernmentContract() {
    const state = store.getState();
    return state.contracts ? state.contracts.government : undefined;
  },

  /**
   * Retrieve the UserManager contract object
   * @function getUserManagerContract
   * @returns userManager contract object or undefined
   * */
  getUserManagerContract() {
    const state = store.getState();
    return state.contracts ? state.contracts.userManager : undefined;
  },

  /**
   * Retrieve the Vat contract object
   * @function getVatContract
   * @returns vat contract object or undefined
   * */
  getVatContract() {
    const state = store.getState();
    return state.contracts ? state.contracts.vat : undefined;
  },

  /**
   * Retrieve the VatTransaction contract object
   * @function getVatContract
   * @returns vatTransaction contract object or undefined
   * */
  getVatTransactionContract() {
    const state = store.getState();
    return state.contracts ? state.contracts.vatTransaction : undefined;
  },

  /**
   * Retrieve the productTransaction contract object
   * @function getProductTransactionContract
   * @returns productTransaction contract object or undefined
   * */
  getProductTransactionContract() {
    const state = store.getState();
    return state.contracts ? state.contracts.productTransaction : undefined;
  },

  /**
   * Retrieve the Product contract object
   * @function getProductContract
   * @returns product object contract or undefined
   * */
  getProductContract() {
    const state = store.getState();
    return state.contracts ? state.contracts.product : undefined;
  },

  /**
   * Retrieve the currentAccount selected from Metamask as an object
   * @function getCurrentAccount
   * @returns account object
   * */
  getCurrentAccount() {
    return Init.getWeb3Instance().eth.getAccounts()
      .then(result => result[0]);
  },

  /**
   * Check if the account has been changed from Metamask.
   * @function setupAccountChecking
   * @returns void
   * */
  setupAccountChecking() {
    Init.getCurrentAccount().then((initialAccount) => {
      let account = initialAccount;
      setInterval(() => {
        Init.getCurrentAccount().then((currAccount) => {
          if (account !== currAccount) {
            account = currAccount;
            store.dispatch({
              type: 'WEB3_ACCOUNT_CHANGED',
              payload: currAccount,
            });
            store.dispatch({
              type: 'RESET_STATE',
            });
            /* const currentLocation = browserHistory.getCurrentLocation();

            if ('redirect' in currentLocation.query) {
              return browserHistory.push(
                decodeURIComponent(currentLocation.query.redirect),
              );
            } */
            browserHistory.push('/');
          }
        });
      }, 250);
    });
  },
};

export default Init;
