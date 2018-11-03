const MyToken = artifacts.require('./MyToken.sol');

contract('MyToken', (accounts) => {
  it('sets the total supply after deployment', async () => {
    const instance = await MyToken.deployed();
    const totalSupply = await instance.totalSupply();
    const adminBalance = await instance.balanceOf(accounts[0]);
    assert.equal(totalSupply.toNumber(), 1000000, 'sets the totalSuply to 1000000');
    assert.equal(adminBalance.toNumber(), 1000000, 'allocates initial supply to the admin account');
  })
})
