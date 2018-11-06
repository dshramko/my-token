const TokenSale = artifacts.require('./TokenSale.sol');
const MyToken = artifacts.require('./MyToken.sol');

contract('TokenSale', (accounts) => {
  const price = 10000000000000; // price in wei
  const tokensAvailable = 750000; // tokens for sale
  const admin = accounts[0];
  const buyer = accounts[1];

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

  it('token buying', async () => {
    const tokenInstance = await MyToken.deployed();
    const numberOfTokens = 10;

    // Provision 75% of all tockens to the token sale
    await tokenInstance.transfer(instance.address, tokensAvailable, { from: admin });

    const receipt = await instance.buyTokens(numberOfTokens, { from: buyer, value: numberOfTokens * price })
    const amount = await instance.tokensSold();
    assert.equal(amount.toNumber(), numberOfTokens);

    // Test that tokens distributed correctly
    const contractBalance = await tokenInstance.balanceOf(instance.address);
    const buyerBalance = await tokenInstance.balanceOf(buyer);
    assert.equal(contractBalance.toNumber(), tokensAvailable - numberOfTokens);
    assert.equal(buyerBalance.toNumber(), numberOfTokens)

    // buy more tokens than available for sale
    try {
      await instance.buyTokens(800000, { from: buyer, value: 800000 * price });
    } catch(err) {
      assert.include(err.message, 'Can not buy more tokens than available');
    }

    // Transfer event tests
    assert.equal(receipt.logs.length, 1);
    assert.equal(receipt.logs[0].event, 'Sell');
    assert.equal(receipt.logs[0].args._buyer, buyer);
    assert.equal(receipt.logs[0].args._amount.toNumber(), amount);

    // Test value in wei paid for tokens
    try {
      await instance.buyTokens(numberOfTokens, { from: buyer, value: 1 });
    } catch(err) {
      assert.include(err.message, 'Value should be equal number of tokens in wei');
    }
  })
})