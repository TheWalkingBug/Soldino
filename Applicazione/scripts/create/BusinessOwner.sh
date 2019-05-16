#!/usr/bin/env bash

BUSINESSOWNER=$(npx zos create BusinessOwner --network $1)
echo "exports.businessOwnerAddress = () => '$BUSINESSOWNER';" >> ./src/util/web3/proxyAddresses.$1.js


echo "" >> ./src/util/web3/init.js
echo "    const BusinessOwner = Contracts.getFromLocal('BusinessOwner');" >> ./src/util/web3/init.js
echo "    console.log(' - Initializing BusinessOwner');" >> ./src/util/web3/init.js
echo "    const businessOwner = await BusinessOwner.at(businessOwnerAdd);" >> ./src/util/web3/init.js
echo "    await businessOwner.methods.initialize(userManagerAdd).send();" >> ./src/util/web3/init.js
