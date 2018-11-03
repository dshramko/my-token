const MyToken = artifacts.require('./MyToken.sol');

contract('MyToken', (accounts) => {
  it('sets the total supply after deployment', async () => {
    const instance = await MyToken.deployed();
    const totalSupply = await instance.totalSupply();
    assert.equal(totalSupply.toNumber(), 1000000, 'sets the totalSuply to 1000000');
  })
})
