import { ethers } from 'ethers';
import { connectWallet } from './walletUtils';
import ScholarshipABI from './abis/Scholarship.json';

// Donate to Scholarship by Basename
export const donateToScholarshipByBasename = async (basename, amount, scholarshipAddress, basenameResolverAddress) => {
    try {
        const signer = await connectWallet(); // Connect wallet

        // Resolve the Basename to an Ethereum address
        const studentAddress = await resolveBasename(basename, basenameResolverAddress);
        if (!studentAddress) throw new Error('Basename resolution failed');

        const scholarshipContract = new ethers.Contract(scholarshipAddress, ScholarshipABI, signer);

        // Send donation
        const tx = await scholarshipContract.donateToScholarshipByBasename(basename, {
            value: ethers.utils.parseEther(amount), // Convert amount to wei
        });
        await tx.wait(); // Wait for transaction confirmation
        console.log('Donation successful:', tx);
        return tx;
    } catch (error) {
        console.error('Error donating to scholarship:', error);
        throw error;
    }
};
