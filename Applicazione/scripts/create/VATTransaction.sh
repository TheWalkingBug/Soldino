#!/usr/bin/env bash

VATTRANSACTION=$(npx zos create VATTransaction --network $1)
echo "exports.vatTransactionAddress = () => '$VATTRANSACTION';" >> ./src/util/web3/proxyAddresses.$1.js


echo "" >> ./src/util/web3/init.js
echo "    const VATTransaction = Contracts.getFromLocal('VATTransaction');" >> ./src/util/web3/init.js
echo "    console.log(' - Initializing VATTransaction');" >> ./src/util/web3/init.js
echo "    const vatTransaction = await VATTransaction.at(vatTransactionAdd);" >> ./src/util/web3/init.js
echo "    await vatTransaction.methods.initialize(userManagerAdd, vatAdd).send();" >> ./src/util/web3/init.js
