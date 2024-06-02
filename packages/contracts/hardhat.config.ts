import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@0xged/hardhat-deploy";

import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "@typechain/hardhat/dist/type-extensions";
import "hardhat-gas-reporter";
import "solidity-coverage";

import * as env from "./utils/env";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      // forking: {
      //   enabled: true,
      //   url: "https://eth.llamarpc.com",
      //   blockNumber: 19595025,
      // },
      gas: 3000000,
      // url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    neondevnet: {
      url: "https://neon-evm-devnet.drpc.org",
      accounts: [
        "3ea25ee2bf415441be31cfe484dc0f6f7b056902f073a83bbc9083211c4a9368",
        ...env.getAccounts("bnb-testnet"),
      ],
      chainId: 245022926,
    },
    ethereumMainnet: {
      url: "https://mainnet.infura.io/v3/e110322e378a4f268172084e63ac8b8d",
      accounts: [
        "3ea25ee2bf415441be31cfe484dc0f6f7b056902f073a83bbc9083211c4a9368",
        ...env.getAccounts("bnb-testnet"),
      ],
    },
    ethereumTestnet: {
      url: "https://rpc.sepolia.org",
      accounts: [
        "3ea25ee2bf415441be31cfe484dc0f6f7b056902f073a83bbc9083211c4a9368",
        ...env.getAccounts("ethereum-testnet"),
      ],
    },

    bnbMainnet: {
      url: "https://bsc-dataseed1.binance.org/",
      accounts: [
        "3ea25ee2bf415441be31cfe484dc0f6f7b056902f073a83bbc9083211c4a9368",
        ...env.getAccounts("bnb-testnet"),
      ],
    },
    bnbTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: [
        "3ea25ee2bf415441be31cfe484dc0f6f7b056902f073a83bbc9083211c4a9368",
        ...env.getAccounts("bnb-testnet"),
      ],
    },
  },

  namedAccounts: {
    relayer: {
      default: 0,
    },
    deployer: {
      default: 1, // here this will by default take the first account as deployer
    },
    user: {
      default: 2,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.4.11",
        settings: {
          // evmVersion: "istanbul",
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.8.17",
        settings: {
          evmVersion: "istanbul",
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          evmVersion: "istanbul",
          optimizer: {
            enabled: true,
            runs: 400,
          },
          metadata: {
            bytecodeHash: "none",
          },
        },
      },
    ],
  },
  gasReporter: {
    currency: process.env.COINMARKETCAP_DEFAULT_CURRENCY || "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    enabled: process.env.REPORT_GAS ? true : false,
    showMethodSig: true,
    onlyCalledMethods: false,
    excludeContracts: ["ERC20"],
  },
  etherscan: {
    apiKey: {
      ...env.getEtherscanAPIKeys([
        "ethereum-ropsten",
        "ethereum-rinkeby",
        "ethereum-kovan",
        "ethereum-goerli",
        "ethereum-testnet",
        "ethereumTestnet",
        "ethereum",
        "optimism",
        "optimism-kovan",
        "arbitrum",
        "arbitrum-rinkeby",
        "arbitrum-sepoilla",
        "polygon",
        "polygon-mumbai",
        "bnb",
        "bnb-testnet",
        "bscTestnet",
      ]),
      "base-goerli": "PLACEHOLDER_STRING",
      neonevm: "test",
    },
    customChains: [
      {
        network: "base-goerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org",
        },
      },
      {
        network: "neonevm",
        chainId: 245022926,
        urls: {
          apiURL: "https://devnet-api.neonscan.org/hardhat/verify",
          browserURL: "https://devnet.neonscan.org",
        },
      },
    ],
  },
};

export default config;
