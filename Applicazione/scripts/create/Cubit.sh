#!/usr/bin/env bash

CUBIT=$(npx zos create Cubit --network $1)
echo "exports.cubitAddress = () => '$CUBIT';" >> ./src/util/web3/proxyAddresses.$1.js


echo "" >> ./src/util/web3/init.js
echo "    const Cubit = Contracts.getFromLocal('Cubit');" >> ./src/util/web3/init.js
echo "    console.log(' - Initializing Cubit');" >> ./src/util/web3/init.js
echo "    const cubit = await Cubit.at(cubitAdd);" >> ./src/util/web3/init.js
echo "    await cubit.methods['initialize(address)'](governmentUserAddress).send();" >> ./src/util/web3/init.js
