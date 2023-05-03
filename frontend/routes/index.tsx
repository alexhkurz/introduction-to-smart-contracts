import { Head, Link } from 'aleph/react';
import { ActionType, StateType } from '~/data/types.ts';
import providerContext from '~/lib/ProviderContext.ts';
import { useCallback, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { load } from 'std/dotenv/mod.ts';

// const env = await load();
// const ETHERSCAN_API_KEY = env['ETHERSCAN_API_KEY'];

const initialState: StateType = {
  provider: undefined,
  web3Provider: undefined,
  address: undefined,
  chainIdHex: undefined,
};

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER':
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainIdHex: action.chainId,
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      };
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainIdHex: action.chainId,
      };
    case 'RESET_WEB3_PROVIDER':
      return initialState;
    default:
      throw new Error();
  }
}

export default function Index() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, address, chainIdHex } = state;
  const web3Modal = providerContext.getModal();

  const connect = useCallback(async function () {
    try {
      const provider = await providerContext.getProvider();
      const web3Provider = await providerContext.getWeb3Provider();
      const address = await providerContext.getAddress();
      const network = await providerContext.getNetwork();

      dispatch({
        type: 'SET_WEB3_PROVIDER',
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const disconnect = useCallback(
    async function () {
      web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect();
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      });
    },
    [provider]
  );

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('accountsChanged', accounts);
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        });
      };

      const handleChainChanged = (chainId: number) => {
        console.log('chainIdChanged', chainId);
        dispatch({
          type: 'SET_CHAIN_ID',
          chainId: chainId,
        });
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        console.log('disconnect', error);
        disconnect();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  const [contractAddress, setContractAddress] = useState('');
  const [contractABI, setContractABI] = useState('');

  useEffect(() => {
    function getContractAddress() {
      if (window.location) {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        const address = searchParams.get('contract');

        if (address) {
          setContractAddress(address);
        }
      }
    }

    getContractAddress();
  }, []);

  useEffect(() => {
    async function getContractABI() {
      if (contractAddress) {
        const response = await axios.get(
          `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=3B2CT17TRSKI5G28TTDGC7M4W44QREG72U`
        );

        setContractABI(response.data.result);
      }
    }
    getContractABI();
  }, [contractAddress]);

  return (
    <div className="screen index">
      <Head>
        <title>Introduction to Smart Contracts</title>
        <meta name="description" content="Learning the decentralized way" />
      </Head>

      <div className="flex flex-col items-center">
        <p className="text-3xl text-red-500">Goerli Testnet Only</p>
        <p className="text-xl pt-5">
          Usage: Append URL to include "?contract=contract_address". Will
          display contract ABI
        </p>
      </div>

      <div className="flex flex-col items-center mb-12 py-4 mx-20 rounded-xl">
        <div className="pb-10">
          {web3Provider ? (
            <>
              <h1 className="text-3xl text-center mt-4 pt-10">
                {' '}
                Connected Wallet Address: {address}
              </h1>
              <div className="pt-20">
                <button
                  className={
                    'text-lg px-3 py-2 rounded-lg text-white dark:text-black bg-[#0095D4] dark:bg-[#0095D4]'
                  }
                  onClick={disconnect}
                >
                  Disconnect
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center pt-12">
              <button
                className={
                  'text-lg px-3 py-2 rounded-lg text-white dark:text-black bg-[#0095D4] dark:bg-[#0095D4]'
                }
                onClick={connect}
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>

        <p className="pb-10 text-xl">Contract Address: {contractAddress}</p>
        <p className="pb-10 text-xl">Contract ABI </p>
        <p>{contractABI}</p>
      </div>
    </div>
  );
}
