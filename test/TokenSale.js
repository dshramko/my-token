const TokenSale = artifacts.require('./TokenSale.sol');

contract('TokenSale', () => {
  const price = 1000000000000000; // price in wei

  beforeEach('setup contract for each test', async function () {
    instance = await TokenSale.deployed();
  })

  it('initialize the contract with correct values', async () => {
    const address = await instance.address;
    assert.notEqual(address, 0x0);

    const tokenContract = await instance.tokenContract();
    assert.notEqual(tokenContract, 0x0);

    const tokenPrice = await instance.tokenPrice();
    assert.equal(tokenPrice, price);
  })


})