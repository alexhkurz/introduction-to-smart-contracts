import { task, types } from 'hardhat/config';

task(
  'initialize',
  'Initializes provided upgradeable contract on specified network'
)
  .addParam('contract', 'The name of contract', undefined, types.string)
  .addParam(
    'contractAddress',
    'The deployed implementation contract address',
    undefined,
    types.string
  )
  .setAction(
    async (taskArgs: { contract: string; contractAddress: string }, hre) => {
      await hre.run('compile');

      if (hre.ethers.utils.isAddress(taskArgs.contractAddress)) {
        const contractFactory = await hre.ethers.getContractFactory(
          taskArgs.contract
        );
        const contract = contractFactory.attach(taskArgs.contractAddress);

        console.log(`\nInitializing contract...\n`);
        console.log(await contract.initialize());
      } else {
        console.log('\nInvalid contract address provided');
      }
    }
  );
