import { providers } from "https://esm.sh/ethers@5.7.2";

export type NFTMetadata = {
  name: string;
  description: string;
  image: string;
  attributes: object | string;
  token_id: string;
  token_hash: string;
  contract_type: string;
  contract_name: string;
  token_address: string;
  symbol: string;
};

export type NFTCollection = {
  contract_type: string;
  collection_name: string;
  collection_symbol: string;
  token_address: string;
};

export type StateType = {
  provider?: any;
  web3Provider?: providers.Web3Provider;
  address?: string;
  chainIdHex?: number;
};

export type ActionType =
  | {
      type: "SET_WEB3_PROVIDER";
      provider?: StateType["provider"];
      web3Provider?: StateType["web3Provider"];
      address?: StateType["address"];
      chainId?: StateType["chainIdHex"];
    }
  | {
      type: "SET_ADDRESS";
      address?: StateType["address"];
    }
  | {
      type: "SET_CHAIN_ID";
      chainId?: StateType["chainIdHex"];
    }
  | {
      type: "RESET_WEB3_PROVIDER";
    };

export type Web3Params = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  web3Provider: providers.Web3Provider;
  chainId: number;
};

export type LayoutWrapperParams = {
  children: any;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  web3Provider?: providers.Web3Provider;
  address?: string;
  chainId: number;
};

export type HeaderLinks = {
  title: string;
  href: string;
};

export type TotalNFTs = {
  nft_count: number;
  collection_count: number;
};

export type TokenBalance = {
  balance: string;
  name: string;
  symbol: string;
  decimals: number;
};

export type EventHandler = {
  key: (e: React.KeyboardEvent) => void;
  preventDefault: () => void;
};
