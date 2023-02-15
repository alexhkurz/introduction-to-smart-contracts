# Assignment 2: Modifying `PayAndGuess` 

In this assignment, you will be given the task of either changing or adding a function to the `PayAndGuess0` smart contract. The goal of the assignment is to get you familiar with the basics of smart contract development and solidity programming.  

## Resources

- Solidity Documentation
	- https://docs.soliditylang.org/en/v0.8.18/
- Ethereum Smart Contract Documentation
	- https://ethereum.org/en/developers/docs/smart-contracts/
- freeCodeCamp Documentation
	- https://www.freecodecamp.org/news/learn-solidity-handbook/

## Instructions

1. Copy [`PayAndGuess0`](https://github.com/alexhkurz/SmartContracts/blob/main/Tutorial/PayAndGuess/PayAndGuess0.sol) to use in Remix. 
    
2. Complete one of the following tasks: 

    a. Extend the smart contract so that it remembers who sent money and how much. Try alter the contract so that disburse acts as a FILO buffer stack.

    b. Change the "doPay" function to add a 1% fee to the amount paid. The fee should be added to a new variable "fee".

	Here are some more options:
      
    c. Write your own or change an existing function.
      
3. Develop, compile and deploy the contract to the Ethereum network using Remix Online IDE:   

	a. Go to [https://remix.ethereum.org/](https://remix.ethereuorg/)  

	b. In the "File explorer" tab, use the default_workspace, click the file button to create a new file in the contract tab and give it a name (e.g., "PayAndGuess.sol").  

	c. Copy the modified smart contract code into the new file.  

	d. Compile the smart contract in the "Solidity compiler" tab.  

	e. In the "Deploy & run transactions" tab, select "Remix VM (London)" under the "Environment" section.  
	
	f. Click the "Deploy" button to deploy the contract to the Ethereum network.  

	g. Interact with the deployed contract by calling its functions and observing its state. 
	
	Make sure that when you call functions like `PayAndGuess` that require  ETH, you enter an amount in the Value box and change the currency to ETH.  

4. Submit a link to the deployed contract on the Goerli testnetwork. 

	*Instructions for deployment:* Once you have finalized developing with the Remix VM environment, 
	- make sure you have your Metamask wallet activated in the same browser in which you work on the Remix IDE;
	- switch the Environment to "Injected Provider - MetaMask"; 
	- make sure you have ETH from the goerli faucet (faucet link: https://goerlifaucet.com/);
	- before you deploy check that you are currently using the Goerli testnest in Metamask; 
	- deploy and receive an address for the contract transaction;
	- click the "view on etherscan" link on the console;
	- submit the link.

Ask on Discord if you have any questions.
