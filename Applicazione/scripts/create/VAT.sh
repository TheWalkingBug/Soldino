#!/usr/bin/env bash

VAT=$(npx zos create VAT --network $1)
echo "exports.vatAddress = () => '$VAT';" >> ./src/util/web3/proxyAddresses.$1.js


echo "" >> ./src/util/web3/init.js
echo "    const VAT = Contracts.getFromLocal('VAT');" >> ./src/util/web3/init.js
echo "    console.log(' - Initializing VAT');" >> ./src/util/web3/init.js
echo "    const vat = await VAT.at(vatAdd);" >> ./src/util/web3/init.js
echo "    await vat.methods.initialize(cubitAdd, userManagerAdd, vatTransactionAdd,
      productTransactionAdd).send();" >> ./src/util/web3/init.js
