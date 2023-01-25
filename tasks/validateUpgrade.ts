import { task, types } from 'hardhat/config';

task(
  'validateupgrade',
  'Validates new implementation contract without deploying it'
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
      await hre.run('compile');

      if (hre.ethers.utils.isAddress(taskArgs.proxyAddress)) {
        console.log('\nValidating upgradeable contract... (undefined is validated)');

        const CONTRACT = await hre.ethers.getContractFactory(taskArgs.contract);
        console.log(
          await hre.upgrades.validateUpgrade(taskArgs.proxyAddress, CONTRACT, {
            kind: 'uups',
          })
        );
      } else {
        console.log('\nInvalid proxy contract address provided');
      }

      // Can also use this to validate between two local implementation contracts
      // parameter proxyAddress would be implementation contract V1
      // see https://docs.openzeppelin.com/upgrades-plugins/1.x/api-hardhat-upgrades#validate-upgrade

      // console.log('\nValidating upgradeable contract... (undefined is validated)');
      // const CONTRACT = await hre.ethers.getContractFactory(taskArgs.proxyAddress);
      // const CONTRACTV2 = await hre.ethers.getContractFactory(taskArgs.contract);
      // console.log(
      //   await hre.upgrades.validateUpgrade(CONTRACTV2, CONTRACT, {
      //     kind: 'uups',
      //   })
      // );
    }
  );
