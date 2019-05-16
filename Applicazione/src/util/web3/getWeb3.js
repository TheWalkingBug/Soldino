import Web3 from 'web3';
import store from '../../store';

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED';
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results,
  };
}

function getWeb3() {
  return new Promise(((resolve) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    // window.addEventListener('load', function(dispatch) {
    let results;
    let { web3 } = window;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider);

      results = {
        web3Instance: web3,
      };

      console.log('Injected web3 detected.');
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
      const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');

      web3 = new Web3(provider);

      results = {
        web3Instance: web3,
      };

      console.log('No web3 instance injected, using Local web3.');
    }

    return web3.eth.getAccounts()
      .then((account) => {
        results = {
          ...results,
          account: account[0],
        };
        return resolve(store.dispatch(web3Initialized(results)));
      });
  }));
}
export default getWeb3;
