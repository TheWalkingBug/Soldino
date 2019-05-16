#!/usr/bin/env bash
rm zos.dev-5777.json
xterm -title "BlockChain" -e "npm run devNet" &
sleep 3s
xterm -title "Build" -e "npm run buildB -- development 0x0409d8ea8fb40d2c4765246f25256719143b6ef7"
xterm -title "WebApp" -e "npm run start" &
