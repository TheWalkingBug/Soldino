rm zos.dev-5777.json
start cmd /k "npm run devNet"
TITLE "Blockchain"
timeout 3
start cmd /k "npm run buildB -- development 0x0409d8ea8fb40d2c4765246f25256719143b6ef7"
TITLE "Build"
start cmd /k "npm run start"
TITLE "WebApp"
