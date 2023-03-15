# README

A course at Chapman University Spring 2023 as a section of CPSC 298, the Computer Science Colloquium, which offers one credit courses (one lecture per week) on a current topic of interest. The title of this section is

## Introduction to Smart Contracts

(created by [Alexander Kurz](https://www.chapman.edu/our-faculty/alexander-kurz) and [Ronan Kearns](https://www.linkedin.com/in/ronank/) from Chapman and [Jeff Turner](https://www.linkedin.com/in/composedao/) and Steve Preston from ComposeDAO)

**Lectures:** Feb 1 - May 10 in Keck 153, Wed 12-1pm. No classes March 22 (Spring break).  
**Office Hours:** Keck Center - Swenson #N305 Huddle Space (I may have to let you in, send me an email).  

The purpose of the course is to give a hands-on introduction in how to develop a dApp using smart contracts.

- [Lecture by lecture](lectures/lecture-by-lecture.md)

## Required Steps for Testing and Deployment

Install Foundry -> https://book.getfoundry.sh/getting-started/installation.html

```
npm i 
forge install 
```

Configure `.env` file -> see [`.env.example`](https://github.com/alexhkurz/introduction-to-smart-contracts/blob/main/.env.example). (Go to your Metamask, follow "Goerli test network->Account details->Export private key" and enter the private key in your `.env` (for the `PRIVATE_KEY` variables); make an account with [alchemy](https://www.alchemy.com/), create a test app for the Ethereum chain on the Goerli network and fill in the value for `ALCHEMY_API_KEY`.)

This framework has been written to use various testnets and mainnets. Test ETH has been encoded into the tasks for localhost deployment. For testnets, test ETH, BNB, or ETC is required which can be received from their corresponding faucets. An .env is used for running on other networks outside of localhost.

Configured Networks:

- Localhost
- Goerli. Faucet: https://goerlifaucet.com/
- BSC Testnet. Faucet: https://testnet.bnbchain.org/faucet-smart
- BSC.
- Mordor. Faucet: https://easy.hebeswap.com/#/faucet

## NPM Commands

```
npm run compile # runs hardhat compile
npm run clean # runs hardhat clean
npm run test # runs unit tests via Forge
```

## Hardhat Tasks

To deploy your contract use

```
npx hardhat --network <network_name> deploy --contract <contract_name> --arg <constructor_argument>
```

If you get `Error: insufficient funds` go to [goerlifaucet](https://goerlifaucet.com/), use your Alchemy login, and enter the wallet address you get from your Metamask wallet. If everything worked you see in your terminal

`Contract deployed to: <deployed_contract_address>    

To "verify" your contract run

```
npx hardhat --network <network_name> verify <deployed_contract_address> <constructor_argument>
```

If you get `Error [...] no API token was found` go to [Etherscan](https://etherscan.io/), create an account, get an API-key and add it to your `.env` 

Now you should be able to interact via your Metamask wallet with your contract on the testnetwork.

Summary of hardhat commands:

```
npx hardhat # lists all available hardhat tasks

npx hardhat --network <network_name> balance --account <account_address> # retrieves account balance on specified network

npx hardhat --network <network_name> deployproxy --contract <contract_name> # Deploys provided upgradeable contract to specified network. Proxy type is UUPS

npx hardhat --network <network_name> flatten <contract_file_path> > <output_file_path> # Flattens contracts and dependecies to output file

npx hardhat --network <network_name> initialize --contract <contract_name> --contract-address <deployed_contract_address> # Initializes provided upgradeable contract on specified network

npx hardhat --network <network_name> validateupgrade --contract <new_contract_name> --proxy-address <deployed_proxy_contract_address> # Validates new implementation contract without deploying it

npx hardhat --network <network_name> deploy --contract <contract_name> --arg <constructor_argument> # Deploys given contract to specified network

npx hardhat --network <network_name> verify <deployed_contract_address> <constructor_argument> # verifies source code on Etherscan or BSCSCAN. Supported networks are Goerli, BSC, BSC Testnet
```

## Troubleshooting

If you get an error similar to this:
```
[Error: ENOENT: no such file or directory, open 'C:\Users\<USER>\src\introduction-to-smart-contracts\artifacts\build-info\02c99f9d2dcfd295a0c0fe2cc9481c42.json'] {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\<USER>\\src\\introduction-to-smart-contracts\\artifacts\\build-info\\02c99f9d2dcfd295a0c0fe2cc9481c42.json'
}
```
Then run: `npm run clean`
