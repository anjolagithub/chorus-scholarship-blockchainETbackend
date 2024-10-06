const hre = require("hardhat");

async function main() {
    const Scholarship = await hre.ethers.getContractFactory("Scholarship");
    const scholarship = await Scholarship.deploy();

    await scholarship.deployed();
    
    console.log("Scholarship contract deployed to:", scholarship.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });