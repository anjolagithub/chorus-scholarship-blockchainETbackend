import hardhat from "hardhat";
import { JsonRpcProvider } from 'ethers';

const { ethers } = hardhat;

async function main() {
    const provider = new JsonRpcProvider("https://base-sepolia.g.alchemy.com/v2/Ko-hCWjrDcGZ42qpf9xbjnH7LLq79SfO");
    // Get the contract factory for the Scholarship contract
    const ScholarshipFactory = await ethers.getContractFactory("Scholarship");

    // Get the deployer's account
    const [deployer] = await ethers.getSigners();

    // Get current gas price using ethers
    const gasPrice = (await provider.getFeeData()).gasPrice// Correct way to get gas price

    // Estimate gas for deployment
    const estimatedGas = await ScholarshipFactory.deploy().then((contract) => {
        return contract.deployTransaction.gasLimit; // Use gasLimit from the transaction
    });

    const estimatedCost = estimatedGas.mul(gasPrice);

    console.log(`Estimated Gas: ${estimatedGas.toString()}`);

    console.log(`Estimated Cost: ${ethers.utils.formatEther(estimatedCost)} ETH`);

    // Deploy the contract
    const scholarship = await ScholarshipFactory.deploy({
        gasLimit: 3000000000, // Adjust as needed
    });

    // Log the deployed contract address
    console.log("Scholarship deployed to:", scholarship.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });