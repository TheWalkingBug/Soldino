#!/usr/bin/env bash

USERMANAGER=$(npx zos create UserManager --network $1)
echo "exports.userManagerAddress = () => '$USERMANAGER';" >> ./src/util/web3/proxyAddresses.$1.js


echo "" >> ./src/util/web3/init.js
echo "    const UserManager = Contracts.getFromLocal('UserManager');" >> ./src/util/web3/init.js
echo "    console.log(' - Initializing UserManager');" >> ./src/util/web3/init.js
echo "    const userManager = await UserManager.at(userManagerAdd);" >> ./src/util/web3/init.js
echo "    await userManager.methods.initialize(citizenAdd, businessOwnerAdd, governmentAdd).send();" >> ./src/util/web3/init.js
