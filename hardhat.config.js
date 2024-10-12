require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: "0.8.24", // Your Solidity version
  networks: {
    sepolia: {
      url: process.env.BASE_RPC_URL, // Your Sepolia RPC URL
      accounts: [process.env.PRIVATE_KEY] // Your wallet's private key
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};