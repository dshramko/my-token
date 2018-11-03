const MyToken = artifacts.require('./MyToken.sol');

contract('MyToken', (accounts) => {
  it('initializes the contract with correct values', async () => {
    const instance = await MyToken.deployed();
    assert(instance.name(), 'My Token', 'has the correct name');
    assert(instance.symbol(), 'MYT', 'has the correct symbol');
    assert(instance.standard(), 'ERC20 My Token v1.0', 'has the correct standard');
  })

  it('allocates the initial supply after deployment', async () => {
    const instance = await MyToken.deployed();
    const totalSupply = await instance.totalSupply();
    const adminBalance = await instance.balanceOf(accounts[0]);
    assert.equal(totalSupply.toNumber(), 1000000, 'sets the totalSuply to 1000000');
    assert.equal(adminBalance.toNumber(), 1000000, 'allocates initial supply to the admin account');
  })
})
