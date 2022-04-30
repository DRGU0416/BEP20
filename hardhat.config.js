require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

let secret = require("./secret");

module.exports = {
  solidity: "0.8.4",
  networks: {
    // A bsc testnet defined by the author in "secret.json" file which is gitignored.
    // You need to create your own "secret.json" file to set up this network.
    // To deploy on the BSC mainner, the url in the secret.json has to be the mainnet url.
    moralisBSCTestnet: {
      url: secret.url,
      accounts: [secret.key]
    },
  },

  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    cache: "./cache",
    tests: "./test"
  },
};
