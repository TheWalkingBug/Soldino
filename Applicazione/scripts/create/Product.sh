#!/usr/bin/env bash

PRODUCT=$(npx zos create Product --network $1)
echo "exports.productAddress = () => '$PRODUCT';" >> ./src/util/web3/proxyAddresses.$1.js


echo "" >> ./src/util/web3/init.js
echo "    const Product = Contracts.getFromLocal('Product');" >> ./src/util/web3/init.js
echo "    console.log(' - Initializing Product');" >> ./src/util/web3/init.js
echo "    const product = await Product.at(productAdd);" >> ./src/util/web3/init.js
echo "    await product.methods.initialize(userManagerAdd, cubitAdd, productTransactionAdd).send();" >> ./src/util/web3/init.js
