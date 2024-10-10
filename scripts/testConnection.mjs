import { JsonRpcProvider } from 'ethers';

// Connect to the Ethereum network
const provider = new JsonRpcProvider("https://base-sepolia.g.alchemy.com/v2/Ko-hCWjrDcGZ42qpf9xbjnH7LLq79SfO");

// Get block by number
const blockNumber = "latest";
const block = await provider.getBlock(blockNumber);

console.log(block);