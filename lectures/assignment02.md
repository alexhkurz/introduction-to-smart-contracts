# Assignment 2: Modifying the PayAndGuess Smart Contract

In this assignment, you will be given the task of either changing or adding a function to the PayAndGuess0 smart contract. The goal of the assignment is to get you familiar with the basics of smart contract development and solidity programming.  

## Resources

- Solidity Documentation
	- https://docs.soliditylang.org/en/v0.8.18/
- Ethereum Smart Contract Documentation
	- https://ethereum.org/en/developers/docs/smart-contracts/
- freeCodeCamp Documentation
	- https://www.freecodecamp.org/news/learn-solidity-handbook/

## Instructions

1. Copy the [PayAndGuess0](https://github.com/alexhkurz/SmartContracts/blob/main/Tutorial/PayAndGuess/PayAndGuess0.sol) to use in Remix. 
    
2. Complete the following tasks: 

    a. Add a function `disburseJackpot` that sends the full balance that the contract holds to whoever calls the function `disburseJackpot`.

    b. Change the "disburse" function to add a 1% fee to the amount paid. The fee should be added to a new variable "fee". The "disburse" function should then transfer the fee to a designated address, while transferring the rest of the paid amount to the payer.  

	Here are some more options:
      
    c. Add a new function to the contract that allows the payer to guess a number. The function should take in a single argument - the guess - and compare it to a randomly generated number. If the guess is correct, the payer should receive double the amount they paid. 
      
    d. Write your own or change an existing function.
      
3. Develop, compile and deploy the contract to the Ethereum network using Remix Online IDE:   
	a. Go to [https://remix.ethereum.org/](https://remix.ethereuorg/)  
	b. In the "File Explorer" section, use the default_workspaceclick the file button to create a new file in the contracttab and give it a name (e.g., "PayAndGuess.sol").  
	c. Copy the modified smart contract code into the new file.  
	d. Compile the smart contract in the Solidity Compiler tab.  
	e. In the "Deploy & Run" tab, select "Remix VM London" undethe "Environment" section.  
	f. Click the "Deploy" button to deploy the contract to thEthereum network.  
	g. Interact with the deployed contract by calling itfunctions and observing its state.  
		- make sure that when you call functions like PayAndGuess that require  ETH, you enter an amount in the Value box and change the currency to ETH.  

4. Submit the modified smart contract code and a brief explanation your changes and how they work.