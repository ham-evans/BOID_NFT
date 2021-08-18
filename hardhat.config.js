require('dotenv').config();
require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  paths: { 
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: { 
      url: process.env.REACT_APP_INFURA_API_KEY,
      accounts: [process.env.REACT_APP_PRIVATE_KEY]
    }
  }
};
