import { Head, Link } from 'aleph/react';
import { ActionType, StateType } from '~/data/types.ts';
import providerContext from '~/lib/ProviderContext.ts';
import { useCallback, useEffect, useReducer, useState } from 'react';

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

  const [contractAddress, setContractAddress] = useState('undefined');

  useEffect(() => {
    function getContractAddress() {
      if (window.location) {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        const handle = searchParams.get('contract');

        if (handle) {
          setContractAddress(handle);
        }
      }
    }

    getContractAddress();
  }, []);

  return (
    <div className="screen index">
      <Head>
        <title>Introduction to Smart Contracts</title>
        <meta name="description" content="Learning the decentralized way" />
      </Head>

      <div className="flex flex-col items-center mb-12 py-4 mx-20 my-20 rounded-xl">
        <p className="pb-20">Contract Address: {contractAddress}</p>

        {web3Provider ? (
          <>
            <h1 className="text-5xl text-center mt-4">Address: {address}</h1>
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
    </div>
  );
}
