import { Head, Link } from 'aleph/react';
import { ActionType, StateType } from '~/data/types.ts';
import providerContext from '~/lib/ProviderContext.ts';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { load } from 'std/dotenv/mod.ts';
import Form from '~/components/Form.tsx';
import { ethers } from 'ethers';
import { config } from '~/sponsorship.ts';

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

  const [sendAmount, setSendAmount] = useState('');
  const [txHash, setTxHash] = useState('');

  return (
    <div className="screen index">
      <Head>
        <title>Introduction to Smart Contracts</title>
        <meta name="description" content="Learning the decentralized way" />
      </Head>

      <div className="flex flex-col items-center">
        <p className="text-3xl text-red-500">Testnet Only</p>
      </div>

      <div className="flex flex-col items-center mb-12 py-4 mx-20 rounded-xl">
        {web3Provider ? (
          <>
            <h1 className="text-3xl text-center mt-4 pt-10">
              {' '}
              Connected Wallet Address: {address}
            </h1>
            <div className="py-10">
              <button
                className={
                  'text-lg px-3 py-2 rounded-lg text-white dark:text-black bg-[#0095D4] dark:bg-[#0095D4]'
                }
                onClick={disconnect}
              >
                Disconnect
              </button>
            </div>

            <div className="flex flex-row items-center space-x-4 bg-gray-700 rounded-xl  p-4">
              <Form
                setValue={setSendAmount}
                className="bg-gray-200 border-none rounded-md outline-none focus:ring-0 text-3xl"
                placeholder="0.001"
              />
              <button
                className={
                  'text-md px-3 py-2 w-auto rounded-lg text-white bg-[#0095D4]'
                }
                onClick={async () => {
                  console.log(sendAmount);
                  if (web3Provider) {
                    const abi = ['function deposit() external payable'];

                    const treasuryAddress = config.goerli_contract_address;
                    const signer = web3Provider.getSigner();
                    const treasuryContract = new ethers.Contract(
                      treasuryAddress,
                      abi,
                      signer
                    );

                    try {
                      const transactionResponse =
                        await treasuryContract.deposit({
                          gasPrice: await web3Provider.getGasPrice(),
                          gasLimit: 140000,
                          value: ethers.utils.parseEther(sendAmount),
                        });

                      // console.log(transactionResponse.hash);
                      setTxHash(transactionResponse.hash);

                      const transactionReceipt =
                        await transactionResponse.wait();
                      // console.log(transactionReceipt.logs);
                      if (transactionReceipt.status === 1) {
                        // transaction.success = true;
                      }
                    } catch (error: any) {
                      console.log(error);
                    }
                  }
                }}
              >
                Send
              </button>
            </div>
            <p className="text-xl pt-4">In ETH</p>
          </>
        ) : (
          <div className="flex flex-col items-center py-12">
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

        {txHash ? (
          <>
            <p className="pt-5">Transaction Hash: {txHash}</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
