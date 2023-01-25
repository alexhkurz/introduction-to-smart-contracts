import { task, types } from 'hardhat/config';

task('balance', "Prints an account's balance")
  .addParam('account', "The account's address", undefined, types.string)
  .setAction(async (taskArgs, hre) => {
    const balance = await hre.ethers.provider.getBalance(taskArgs.account);

    console.log(hre.ethers.utils.formatEther(balance), 'ETH');
  });
