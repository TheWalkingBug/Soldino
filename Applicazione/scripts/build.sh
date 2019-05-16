#!/usr/bin/env bash
if [[ -n $1 ]] && [[ -n $2 ]]
then
npx zos session --network $1 --from $2 --expires 3600 --timeout 3600
npx zos publish --network $1
npx truffle compile --all
npx zos push --network $1 --deploy-dependencies --skip-compile

echo "const { Contracts, ZWeb3 } = require('zos-lib');
const proxyAddresses = require('./proxyAddresses.$1');

const userManagerAdd = proxyAddresses.userManagerAddress();
const businessOwnerAdd = proxyAddresses.businessOwnerAddress();
const citizenAdd = proxyAddresses.citizenAddress();
const cubitAdd = proxyAddresses.cubitAddress();
const governmentAdd = proxyAddresses.governmentAddress();
const productAdd = proxyAddresses.productAddress();
const productTransactionAdd = proxyAddresses.productTransactionAddress();
const vatAdd = proxyAddresses.vatAddress();
const vatTransactionAdd = proxyAddresses.vatTransactionAddress();
let governmentUserAddress;

module.exports = async function (callback) {
  ZWeb3.initialize(web3.currentProvider);
  ({ governmentUserAddress } = { governmentUserAddress: (await web3.eth.getAccounts())[0] });
  Contracts.setArtifactsDefaults({
    gas: 5000000,
    gasPrice: 9,
    from: governmentUserAddress,
  });
  try {" > ./src/util/web3/init.js

echo "" > ./src/util/web3/proxyAddresses.$1.js
for f in ./scripts/create/*.sh; do
bash "$f" $1 -H || break
done

echo "  } catch (err) {
    callback(err);
  }
  callback();
};"  >> ./src/util/web3/init.js

echo "Initializing contracts:"

cp -r -f ./truffle-config.js ./src/util/web3/truffle-config.js
if [[ ! -d ./src/util/web3/build/contracts ]]
then
    mkdir -p ./src/util/web3/build/contracts
fi
cp -r -f ./build/contracts/ ./src/util/web3/build/

npx truffle exec ./src/util/web3/init.js --network $1


else

echo "Usage: npm run buildB -- #network #governmentAccount"
echo "  #network = the name of the network found in the truffle-config.js file"
echo "  #governmentAccount = the address of the government account present in the network"

fi
