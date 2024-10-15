// blockchain-utils/basenameUtils.js
import { ethers } from 'ethers';
import { connectWallet } from './walletUtils';
import BasenameResolverABI from './abis/BasenameResolver.json';

// Register Basename on-chain
export const registerBasenameOnChain = async (basename, basenameResolverAddress) => {
    try {
        const signer = await connectWallet(); // Connect wallet
        const basenameResolverContract = new ethers.Contract(basenameResolverAddress, BasenameResolverABI, signer);

        const tx = await basenameResolverContract.register(basename, signer.getAddress());
        await tx.wait(); // Wait for transaction confirmation
        console.log('Basename registered on-chain:', basename);
        return tx;
    } catch (error) {
        console.error('Error registering Basename on-chain:', error);
        throw error;
    }
};

// Resolve Basename to Ethereum address
export const resolveBasename = async (basename, basenameResolverAddress) => {
    try {
        const signer = await connectWallet(); // Connect wallet
        const basenameResolverContract = new ethers.Contract(basenameResolverAddress, BasenameResolverABI, signer);

        const resolvedAddress = await basenameResolverContract.resolve(basename);
        console.log('Resolved address:', resolvedAddress);
        return resolvedAddress;
    } catch (error) {
        console.error('Error resolving Basename:', error);
        throw error;
    }
};
