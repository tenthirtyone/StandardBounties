const HDWalletProvider = require('truffle-hdwallet-provider')
const fs = require('fs')
const secrets = require('./secrets');
// First read in the secrets.json to get our mnemonic
console.log(secrets)

let mnemonic
if (secrets) {
  
  mnemonic = secrets.mnemonic
} else {
  console.log('No secrets.json found. If you are trying to publish EPM ' +
              'this will fail. Otherwise, you can ignore this message!')
  mnemonic = ''
}


module.exports = {
  networks: {
    live: {
      network_id: 1, // Ethereum public network,
      gas: 4600000
      // optional config values
      // host - defaults to "localhost"
      // port - defaults to 8545
      // gas
      // gasPrice
      // from - default address to use for any transaction Truffle makes during migrations
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, 'https://ropsten.infura.io'),
      network_id: '3',
      gas: 4600000
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/' + secrets.infura),
      network_id: '4',
      gas: 10000000,
      gasPrice: 100000000000
    },
    testrpc: {
      network_id: 'default',
      gas: 4000000000
    }
  },
  mocha: {

    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      gasPrice: 6
    }

  }
}
