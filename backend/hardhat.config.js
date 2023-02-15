require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    }
  },
  solidity : {
    compilers: [
      {
        version: "0.8.18"
      }
    ]
  },
  namedAccounts: {
    deployer: {
      default: 0,
      1: 0,
    }
  },
};