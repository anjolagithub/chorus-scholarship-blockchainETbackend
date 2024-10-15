require('dotenv').config();
const { ethers } = require('ethers');

// Load environment variables
const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.BASE_RPC_URL;
const basenameResolverAddress = process.env.BASENAME_RESOLVER_ADDRESS;
const scholarshipAddress = process.env.SCHOLARSHIP_ADDRESS;

// Load ABIs
const BasenameResolverABI = require('./utils/abis/BasenameResolver.json');
const ScholarshipABI = require('./utils/abis/Scholarship.json');

// Set up the provider and wallet
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);

// Create contract instances
const basenameResolverContract = new ethers.Contract(basenameResolverAddress, BasenameResolverABI, wallet);
const scholarshipContract = new ethers.Contract(scholarshipAddress, ScholarshipABI, wallet);

// Test Functions

// Test 1: Register a Basename on-chain
async function registerBasename(basename) {
    try {
        console.log(`Registering Basename: ${basename}...`);
        // Specify a manual gas limit
        const tx = await basenameResolverContract.register(basename, wallet.address, {
            gasLimit: 500000, // Adjust based on your contract's requirements
        });
        await tx.wait(); // Wait for the transaction to be mined
        console.log(`Basename "${basename}" registered successfully.`);
    } catch (error) {
        console.error('Error registering Basename:', error);
    }
}


// Test 2: Resolve a Basename
async function resolveBasename(basename) {
    try {
        console.log(`Resolving Basename: ${basename}...`);
        const resolvedAddress = await basenameResolverContract.resolve(basename);
        if (resolvedAddress === ethers.constants.AddressZero) {
            console.log(`No address found for Basename: ${basename}`);
        } else {
            console.log(`Resolved Address for Basename "${basename}": ${resolvedAddress}`);
        }
    } catch (error) {
        console.error('Error resolving Basename:', error);
    }
}

// Test 3: Donate to a student via Basename
async function donateToStudent(basename, amountInEth) {
    try {
        console.log(`Donating ${amountInEth} ETH to student with Basename: ${basename}...`);
        const tx = await scholarshipContract.donateToScholarshipByBasename(basename, {
            value: ethers.utils.parseEther(amountInEth),
        });
        await tx.wait();
        console.log(`Donation of ${amountInEth} ETH to "${basename}" successful.`);
    } catch (error) {
        console.error('Error during donation:', error);
    }
}

// Run the tests
async function runTests() {
    const testBasename = 'anjitech.base.eth'; // Change this to the Basename you want to test
    const donationAmount = '0.01'; // Amount in ETH

    // Test registering a Basename
    await registerBasename(testBasename);

    // Test resolving a Basename
    await resolveBasename(testBasename);

    // Test making a donation
    await donateToStudent(testBasename, donationAmount);
}

runTests();
