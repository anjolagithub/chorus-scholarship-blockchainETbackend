const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Check deployer's balance
    const balance = await deployer.getBalance();
    console.log(`Deployer balance: ${hre.ethers.utils.formatEther(balance)} ETH`);

    // Deploy the BasenameResolver contract first
    const BasenameResolverFactory = await hre.ethers.getContractFactory("BasenameResolver");
    const basenameResolver = await BasenameResolverFactory.deploy();
    await basenameResolver.deployed();
    console.log("BasenameResolver deployed to:", basenameResolver.address);

    // Deploy the Scholarship contract, passing the BasenameResolver address
    const ScholarshipFactory = await hre.ethers.getContractFactory("Scholarship");
    const scholarship = await ScholarshipFactory.deploy(basenameResolver.address);
    await scholarship.deployed();
    console.log("Scholarship contract deployed at:", scholarship.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });
