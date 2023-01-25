import { task, types } from 'hardhat/config';

task('interact', 'Custom task. Currently gets contract owner address')
  .addParam('contract', 'The name of token contract', undefined, types.string)
  .addParam(
    'contractAddress',
    'The deployed contract address',
    undefined,
    types.string
  )
  .setAction(
    async (
      taskArgs: {
        contract: string;
        contractAddress: string;
      },
      hre
    ) => {
      await hre.run('compile');

      if (hre.ethers.utils.isAddress(taskArgs.contractAddress)) {
        const contractFactory = await hre.ethers.getContractFactory(
          taskArgs.contract
        );
        const contract = contractFactory.attach(taskArgs.contractAddress);

        console.log(`\nOwner address: ${contract.owner()}\n`);
      } else {
        console.log('\nInvalid contract address provided');
      }
    }
  );
