# CrowdCoin
A DApp running on ethereum network inspired on [kickstarter](https://www.kickstarter.com/) crowdfunding system.

## Requirements
1. WSL/Linux/MacOS
2. nodejs
3. npm
4. git
5. Metamask browser extension

## Setup
1. Copy .env to .env.local
1. Configure your mnemonic passphrase and infura url
1. Compile code `npm run compile`
1. Set env variables from .env.local `set -o allexport && source .env.local && set +o allexport`
1. Deploy code to Sepolia test network `npm run deploy`
1. Add printed campaign factory contract address to .env.local file.
1. Set env variables from .env.local `set -o allexport && source .env.local && set +o allexport` (needed because of the updated contract address)
1. Start project `npm run dev`
1. Open the [app](http://localhost:3000) in a browser 

## Test
Runs the mocha tests for the smart contracts `npm run test`

## Troubleshooting
1. Ensure that line ending of all files is LF
2. Ensure port 3000 is free.

## License
[MIT](https://choosealicense.com/licenses/mit/)