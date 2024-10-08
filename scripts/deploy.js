const hre = require("hardhat");

async function main() {
    console.log("Starting deployment...");

    // Get the contract factory
    console.log("Getting contract factory for Scholarship...");
    const Scholarship = await hre.ethers.getContractFactory("Scholarship");

    // Deploy the contract
    console.log("Deploying contract...");
    const scholarship = await Scholarship.deploy();

    // Wait for the deployment to complete
    console.log("Waiting for deployment...");
    await scholarship.deployed();

    // Log the deployed contract address
    console.log("Scholarship contract deployed to:", scholarship.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });