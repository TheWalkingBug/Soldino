#!/usr/bin/env bash

CITIZEN=$(npx zos create Citizen --network $1)
echo "exports.citizenAddress = () => '$CITIZEN';" >> ./src/util/web3/proxyAddresses.$1.js


echo "" >> ./src/util/web3/init.js
echo "    const Citizen = Contracts.getFromLocal('Citizen');" >> ./src/util/web3/init.js
echo "    console.log(' - Initializing Citizen');" >> ./src/util/web3/init.js
echo "    const citizen = await Citizen.at(citizenAdd);" >> ./src/util/web3/init.js
echo "    await citizen.methods.initialize(userManagerAdd).send();" >> ./src/util/web3/init.js
