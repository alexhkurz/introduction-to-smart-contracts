import { task, types } from 'hardhat/config';

task('deploy', 'Deploys provided contract to specified network')
  .addParam('contract', 'The name of contract', undefined, types.string)
  .addParam('arg', 'The constructor argument', undefined)
  .setAction(async (taskArgs: { contract: string; arg }, hre) => {
    await hre.run('compile');

    const CONTRACT = await hre.ethers.getContractFactory(taskArgs.contract);
    const contract = await CONTRACT.deploy(taskArgs.arg);

    await contract.deployed();

    console.log('\nContract deployed to:', contract.address);
  });
