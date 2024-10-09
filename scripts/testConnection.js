const Web3 = require('web3');
const { HttpProvider } = require('web3-providers');

const url = 'https://rpc.ankr.com/base_sepolia/24b8b463fea3397fbe603854d03bae63202701d0b9ea13a8f73503b4c66f6934';  // url string

const web3 = new Web3(new HttpProvider(url));

web3.eth.getBlockNumber((error, blockNumber) => {
    if(!error) {
        console.log(blockNumber);
    } else {
        console.log(error);
    }
});