#!/usr/bin/env bash

npx ganache-cli -m "daring call move grief wish patch small notable shift violin solve fortune" -g 1 -l 5000000 -a 10 -i 7357 >/dev/null &
PID=$!

echo "Starting tests:"
npx truffle test --network test

kill $PID
