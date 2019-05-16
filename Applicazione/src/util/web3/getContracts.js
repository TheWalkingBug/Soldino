import store from '../../store';
import { networks } from './truffle-config';

// import proxyAddresses from './proxyAddresses';
import CubitAbi from './build/contracts/Cubit';
import GovernmentAbi from './build/contracts/Government';
import UserManagerAbi from './build/contracts/UserManager';
import VATAbi from './build/contracts/VAT';
import VATTransactionAbi from './build/contracts/VATTransaction';
import ProductTransactionAbi from './build/contracts/ProductTransaction';
import ProductAbi from './build/contracts/Product';

export const CONTRACTS_INITIALIZED = 'CONTRACTS_INITIALIZED';

function contractsInitialized(results) {
  return {
    type: CONTRACTS_INITIALIZED,
    payload: results,
  };
}

function getContracts() {
  return new Promise((resolve) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    const web3 = store.getState().web3.web3Instance;
    web3.eth.net.getId().then((networkId) => {
      let proxyAddresses;
      let net;
      for (net in networks) {
        // if (networkId === 3) {
        // eslint-disable-next-line
        //  proxyAddresses = require('./proxyAddresses.ropsten');
        // } else
        if (networks[net].network_id.toString() === networkId.toString()) {
          // eslint-disable-next-line
          proxyAddresses = require(`./proxyAddresses.${net}`);
        }
      }
      let results;
      if (proxyAddresses) {
        results = {
          cubit: new web3.eth.Contract(CubitAbi.abi, proxyAddresses.cubitAddress()),

          government: new web3.eth.Contract(GovernmentAbi.abi, proxyAddresses.governmentAddress()),

          userManager: new web3.eth.Contract(UserManagerAbi.abi,
            proxyAddresses.userManagerAddress()),

          vat: new web3.eth.Contract(VATAbi.abi, proxyAddresses.vatAddress()),

          vatTransaction: new web3.eth.Contract(VATTransactionAbi.abi,
            proxyAddresses.vatTransactionAddress()),

          productTransaction: new web3.eth.Contract(ProductTransactionAbi.abi,
            proxyAddresses.productTransactionAddress()),

          product: new web3.eth.Contract(ProductAbi.abi, proxyAddresses.productAddress()),
        };
      }

      resolve(store.dispatch(contractsInitialized(results)));
    });
  });
}

export default getContracts;
