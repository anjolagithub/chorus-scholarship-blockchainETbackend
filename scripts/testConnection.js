const { AlchemyProvider } = require('@ethersproject/providers');

async function main() {
  const provider = new AlchemyProvider('sepolia', process.env.ALCHEMY_API_KEY);

  try {
    const blockNumber = await provider.getBlockNumber();
    console.log('Current block number:', blockNumber);
  } catch (error) {
    console.error('Error fetching block number:', error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});