require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`, // Replace with your Infura URL
      accounts: [`0x${process.env.PRIVATE_KEY}`] // Your wallet's private key
  }
}
};

