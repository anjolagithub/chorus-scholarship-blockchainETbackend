import { ethers } from 'ethers';

const connectWallet = async () => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = provider.getSigner();
        console.log('Wallet connected:', await signer.getAddress());
        return signer;
    } else {
        console.error('Please install MetaMask!');
    }
};

export { connectWallet };