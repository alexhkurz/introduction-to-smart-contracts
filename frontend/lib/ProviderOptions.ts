import WalletConnectProvider from '@walletconnect/web3-provider';
import { load } from 'std/dotenv/mod.ts';

const env = await load();
const ALCHEMY_API_KEY = env['ALCHEMY_API_KEY'];

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
        5: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
        56: 'https://bsc-dataseed1.binance.org',
        97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
        // ...
      },
    },
  },
};
