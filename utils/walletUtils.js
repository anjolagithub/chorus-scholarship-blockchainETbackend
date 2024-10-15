import { ethers } from 'ethers';

// Connect to MetaMask wallet
export const connectWallet = async () => {
    try {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const signer = provider.getSigner();
            const userAddress = await signer.getAddress();
            console.log('Wallet connected:', userAddress);
            return signer; // Return the signer for further blockchain interactions
        } else {
            console.error('Please install MetaMask!');
            return null;
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        throw error;
    }
};
