# CHORUS Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
# chorus-scholarship-blockchainETbackend
Directory format
chorus-scholarship/
├── contracts/
│   └── Scholarship.sol
├── scripts/
│   └── deploy.js
├── test/
│   └── Scholarship.test.js
├── src/                 // Backend source code
│   ├── index.js         // Main entry point for your backend app
│   ├── routes/          // API route handlers
│   │   └── scholarshipRoutes.js // Routes for scholarship-related operations
│   ├── controllers/     // Logic for handling requests
│   │   └── scholarshipController.js // Functions to interact with smart contracts
│   ├── utils/           // Utility functions
│   │   └── blockchainUtils.js // Functions for interacting with the blockchain
├── .env                 // Environment variables
├── package.json
└── hardhat.config.js
