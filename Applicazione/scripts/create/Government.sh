#!/usr/bin/env bash

GOVERNMENT=$(npx zos create Government --network $1)
echo "exports.governmentAddress = () => '$GOVERNMENT';" >> ./src/util/web3/proxyAddresses.$1.js


echo "" >> ./src/util/web3/init.js
echo "    const Government = Contracts.getFromLocal('Government');" >> ./src/util/web3/init.js
echo "    console.log(' - Initializing Government');" >> ./src/util/web3/init.js
echo "    const government = await Government.at(governmentAdd);" >> ./src/util/web3/init.js
echo "    await government.methods.initialize(userManagerAdd, cubitAdd,
      governmentUserAddress).send();" >> ./src/util/web3/init.js
