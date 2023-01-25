import { task, types } from 'hardhat/config';
import './validateUpgrade';

task(
  'upgradeproxy',
  'Upgrades proxy contract at a specified address to new implementation contract'
)
  .addParam(
    'contract',
    'The name of new upgradeable contract',
    undefined,
    types.string
  )
  .addParam(
    'proxyAddress',
    'The address of deployed proxy contract',
    undefined,
    types.string
  )
  .setAction(
    async (taskArgs: { contract: string; proxyAddress: string }, hre) => {
      await hre.run('validateupgrade', {
        contract: taskArgs.contract,
        proxyAddress: taskArgs.proxyAddress,
      });

      if (hre.ethers.utils.isAddress(taskArgs.proxyAddress)) {
        console.log('\nUpgrading proxy contract...');

        const CONTRACT = await hre.ethers.getContractFactory(taskArgs.contract);
        const upgraded = await hre.upgrades.upgradeProxy(
          taskArgs.proxyAddress,
          CONTRACT,
          {
            kind: 'uups',
          }
        );

        console.log('\nProxy upgraded at:', upgraded.address);
      } else {
        console.log('\nInvalid proxy contract address provided');
      }
    }
  );
