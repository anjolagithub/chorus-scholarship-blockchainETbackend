import hardhat from "hardhat";
import { JsonRpcProvider } from 'ethers';

const { ethers } = hardhat;

async function main() {
    const provider = new JsonRpcProvider("https://base-sepolia.g.alchemy.com/v2/Ko-hCWjrDcGZ42qpf9xbjnH7LLq79SfO");

    // Get the contract factory for the Scholarship contract
    const ScholarshipFactory = await ethers.getContractFactory("Scholarship");

    // Get the deployer's account
    const [deployer] = await ethers.getSigners();

    // Check deployer's balance
    const balance = await provider.getBalance(deployer.address);
    console.log(`Deployer balance: ${ethers.formatEther(balance)} ETH`);

    // Get current gas price using ethers
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice;

    if (!gasPrice) {
        console.error("Error: Unable to fetch gas price.");
        return;
    }

    // Estimate gas for deployment
    const estimatedGas = ethers.BigNumber.from(await ScholarshipFactory.deploy().estimateGas());
    

    console.log(`Estimated Gas: ${estimatedGas.toString()}`);

    const estimatedCost = estimatedGas.mul(gasPrice);
    console.log(`Estimated Cost: ${ethers.formatEther(estimatedCost)} ETH`);

    // Deploy the contract with specified gas limit and price
    const scholarship = await ScholarshipFactory.deploy({
        gasLimit: estimatedGas,
        gasPrice: gasPrice // Optional: specify if needed
    });

    // Wait for deployment to complete
    await scholarship.deployed();

    // Log the deployed contract address
    console.log("Scholarship deployed to:", scholarship.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });