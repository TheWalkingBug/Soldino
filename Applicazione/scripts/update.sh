#!/usr/bin/env bash
if [[ -n $1 ]] && [[ -n $2 ]]
then
    npx zos session --network $1 --from $2
    npx truffle compile --all
    npx zos push --network $1 --skip-compile
    npx zos update --all --network $1
else
    echo "Usage: npm run update -- #network #governmentAccount"
    echo "  #network = the name of the network found in the truffle-config.js file"
    echo "  #governmentAccount = the address of the government account present in the network"
fi
