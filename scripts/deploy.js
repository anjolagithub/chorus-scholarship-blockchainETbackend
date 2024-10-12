const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

async function main() {
    const abi = fs.readFileSync("contracts_Scholarship_sol_Scholarship.abi", "utf8");
    const binary = fs.readFileSync("contracts_Scholarship_sol_Scholarship.bin", "utf8");

    // Get the deployer's account
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Check deployer's balance
    const balance = await deployer.getBalance();
    console.log(`Deployer balance: ${hre.ethers.utils.formatEther(balance)} ETH`);

    // Get the contract factory for the Scholarship contract
    const ScholarshipFactory = new hre.ethers.ContractFactory(abi, binary, deployer);

    // Deploy the contract
    console.log("Deploying Scholarship contract...");
    const scholarship = await ScholarshipFactory.deploy(); // Deployment doesn't require gas estimate here

    // Wait for deployment to complete
    await scholarship.deployed();

    console.log("Scholarship contract deployed at:", scholarship.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });
