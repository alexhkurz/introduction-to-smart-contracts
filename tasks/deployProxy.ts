import { task, types } from 'hardhat/config';

task(
  'deployproxy',
  'Deploys provided upgradeable contract to specified network. Proxy type is UUPS'
)
  .addParam(
    'contract',
    'The name of upgradeable contract',
    undefined,
    types.string
  )
  .setAction(async (taskArgs: { contract: string }, hre) => {
    await hre.run('compile');

    console.log('\nDeploying proxy and implementation contract...');
    const CONTRACT = await hre.ethers.getContractFactory(taskArgs.contract);
    const contract = await hre.upgrades.deployProxy(CONTRACT, [], {
      kind: 'uups',
    });

    await contract.deployed();

    console.log('\nProxy contract deployed to:', contract.address);
  });
