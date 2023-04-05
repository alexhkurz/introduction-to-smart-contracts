import { task, types } from 'hardhat/config';

task('deploy', 'Deploys provided contract to specified network')
  .addParam('contract', 'The name of contract', undefined, types.string)
  .addOptionalParam('arg', 'The constructor argument', undefined)
  .setAction(async (taskArgs: { contract: string; arg: any }, hre) => {
    await hre.run('compile');

    const CONTRACT = await hre.ethers.getContractFactory(taskArgs.contract);
    const contract = taskArgs.arg
      ? await CONTRACT.deploy(taskArgs.arg)
      : await CONTRACT.deploy();

    await contract.deployed();

    console.log('\nContract deployed to:', contract.address);
  });
