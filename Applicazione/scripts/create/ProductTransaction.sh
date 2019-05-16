#!/usr/bin/env bash

PRODUCTTRANSACTION=$(npx zos create ProductTransaction --network $1)
echo "exports.productTransactionAddress = () => '$PRODUCTTRANSACTION';" >> ./src/util/web3/proxyAddresses.$1.js


echo "" >> ./src/util/web3/init.js
echo "    const ProductTransaction = Contracts.getFromLocal('ProductTransaction');" >> ./src/util/web3/init.js
echo "    console.log(' - Initializing ProductTransaction');" >> ./src/util/web3/init.js
echo "    const productTransaction = await ProductTransaction.at(productTransactionAdd);" >> ./src/util/web3/init.js
echo "    await productTransaction.methods.initialize(productAdd, vatAdd).send();" >> ./src/util/web3/init.js
