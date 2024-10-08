import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";

const client = createPublicClient({
  chain: baseSepolia,
  transport: http("https://base-sepolia.g.alchemy.com/v2/tyu3blOvAztjWZFX51ziD_hN3v9lYXw3"),
});

const block = await client.getBlock({
  blockNumber: 123456n,
});

console.log(block);