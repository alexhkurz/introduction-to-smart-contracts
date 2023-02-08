In this lecture we learn how to use the [RemixIDE](https://remix.ethereum.org/) to compile, run, test and develop smart contracts.

As an example we use [PayAndGuess](https://github.com/alexhkurz/SmartContracts/tree/main/Tutorial/PayAndGuess).

- Click on `Create New File`, enter filename `PayAndGuess` and copy [`PayAndGuess0`](https://github.com/alexhkurz/SmartContracts/blob/main/Tutorial/PayAndGuess/PayAndGuess0.sol) into the editor.

- Find the `Solidity compiler` icon and `Compile PayAndGuess.sol`.

- Find the `Deploy & run transactions` icon. Click `Deploy` and find the buttons that allow you to interact with contract under `Deployed Contracts`.

- You should see `Balance: 0 ETH`. To increase the balance, enter `1` (or any other amouynt) in `VALUE` and click on `doPay`. Do it again. Observe how the balance changes. Find the `doPay` function in the code an explain what happens.

- Click on `disburse`. Repeat. Find the `disburse` function in the code. Explain what happens.

- Now choose a different account from the dropdown `ACCOUNT`. Choose one with a balance of `100ETH`. Use `doPay` to pay 0. What happens to the balance? Why?

## Homework

[Assignment 2](assignment02.md)

## Documentation

- https://ethereum.org/en/developers/docs/transactions/?
- https://docs.soliditylang.org/en/develop/units-and-global-variables.html#block-and-transaction-properties




