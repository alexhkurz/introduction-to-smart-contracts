import Web3Modal from "https://esm.sh/web3modal@1.9.12";
import { providers } from "https://esm.sh/ethers@5.7.2";
import { providerOptions } from "~/lib/ProviderOptions.ts";

let web3Modal: Web3Modal;
if (typeof window !== "undefined" && typeof document !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
    theme: "dark",
  });
}

async function getDefaultProvider() {
  // This is the initial `provider` that is returned when
  // using web3Modal to connect. Can be MetaMask or WalletConnect.
  const provider = await web3Modal.connect();
  return provider;
}

async function getDefaultWeb3Provider() {
  // We plug the initial `provider` into ethers.js and get back
  // a Web3Provider. This will add on methods from ethers.js and
  // event listeners such as `.on()` will be different.
  const web3Provider = new providers.Web3Provider(
    await getDefaultProvider(),
    "any"
  );
  return web3Provider;
}

async function getDefaultSigner() {
  return (await getDefaultWeb3Provider()).getSigner();
}

const providerContext = {
  getModal: () => {
    return web3Modal;
  },
  getProvider: async () => {
    return await getDefaultProvider();
  },
  getWeb3Provider: async () => {
    return await getDefaultWeb3Provider();
  },
  getSigner: () => {
    return getDefaultSigner();
  },
  getAddress: async () => {
    return (await getDefaultSigner()).getAddress();
  },
  getNetwork: async () => {
    return (await getDefaultWeb3Provider()).getNetwork();
  },
};

export default providerContext;
