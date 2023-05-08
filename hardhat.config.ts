import fs from 'fs';
import './tasks/balance';
import './tasks/deploy';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';
import '@typechain/hardhat';
import 'dotenv/config';
import 'hardhat-watcher';
import 'hardhat-contract-sizer';
import 'hardhat-gas-reporter';
import 'hardhat-abi-exporter';
import 'hardhat-preprocessor';

function getRemappings() {
  return fs
    .readFileSync('remappings.txt', 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => line.trim().split('='));
}

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // localNetworksConfig: './networks.ts',
  solidity: {
    compilers: [
      {
        version: '0.8.10',
      },
    ],
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      gasPrice: 0,
      initialBaseFeePerGas: 0,
      allowUnlimitedContractSize: true,
      chainId: 1337,
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
        blockNumber: parseInt(process.env.ALCHEMY_BLOCK),
      },
    },
    localhost: {
      gasPrice: 0,
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      chainId: 5,
      accounts: [process.env.GOERLI_PRIVATE_KEY],
    },
    sepolia: {
      url: `https://rpc.sepolia.org`,
      chainId: 11155111,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    },
    mordor: {
      url: 'https://www.ethercluster.com/mordor',
      chainId: 63,
      accounts: [process.env.MORDOR_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      goerli: `${process.env.ETHERSCAN_API_KEY}`,
      sepolia: `${process.env.ETHERSCAN_API_KEY}`,
      bscTestnet: `${process.env.BSCSCAN_API_KEY}`,
      bsc: `${process.env.BSCSCAN_API_KEY}`,
    },
  },
  watcher: {
    compilation: {
      tasks: ['compile'],
    },
    node: {
      tasks: [
        'compile',
        { command: 'compile', params: { quiet: true } },
        'node',
        { command: 'node', params: { noCompile: true } },
      ],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: process.env.REPORT_SIZE ? true : false,
    disambiguatePaths: false,
  },
  abiExporter: {
    path: './abi/',
    clear: true,
    only: [''],
    spacing: 2,
  },
  preprocess: {
    eachLine: () => ({
      transform: (line: string) => {
        if (line.match(/^\s*import /i)) {
          getRemappings().forEach(([find, replace]) => {
            if (line.match(find)) {
              line = line.replace(find, replace);
            }
          });
        }
        return line;
      },
    }),
  },
};
