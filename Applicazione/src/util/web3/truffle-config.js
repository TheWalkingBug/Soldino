const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = 'daring call move grief wish patch small notable shift violin solve fortune';

module.exports = {
  networks: {
    local: {
      host: 'localhost',
      port: 9545,
      gas: 5000000,
      gasPrice: 5e9,
      network_id: '*',
    },
    development: {
      host: '127.0.0.1',
      port: 7545,
      gas: 6721975,
      gasPrice: 20000000000,
      network_id: 5777,
    },
    test: {
      host: '127.0.0.1',
      port: 8545,
      gas: 5000000,
      gasPrice: 1,
      network_id: 7357,
    },

    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
    },

    ropsten: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/e30c349943b64dfdab035e45bfec5012'),
      network_id: '3',
    },
  },
};
