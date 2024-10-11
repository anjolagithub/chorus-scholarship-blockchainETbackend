import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
    const [deployer] = await ethers.getSigners();
    const balance = await ethers.provider.getBalance(deployer.address);
    
    // Use the new syntax for formatEther
    const balanceInEther = ethers.formatEther(balance);
    
    console.log(`Deployer balance: ${balanceInEther} ETH`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});