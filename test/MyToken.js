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

  it('does not transfer tokens', async () => {
    const instance = await MyToken.deployed();

    // Test 'require' by transferring larger value than the sender's balance
    try {
      await instance.transfer.call(accounts[1], 99999999999999999999);
    } catch(err) {
      assert.include(err.message, 'revert');
    }
  })

  it('return success boolean if transfer successful', async () => {
    const instance  = await MyToken.deployed();
    const success = await instance.transfer.call(accounts[1], 200000, {from: accounts[0]});
    assert.equal(success, true);
  })

  it('transfer tokens', async () => {
    const account_one = accounts[0];
    const account_two = accounts[1];
    const amount = 200000;

    const instance = await MyToken.deployed();
    const balance = await instance.balanceOf(accounts[0])
    assert.equal(balance.valueOf(), 1000000, "10000 wasn't in the first account");

    // transfer 200_000 from accounts[0] to accounts[1]
    const receipt = await instance.transfer(accounts[1], amount, {from: accounts[0]});
    const account_one_balance = await instance.balanceOf(accounts[0])
    const account_two_balance = await instance.balanceOf(accounts[1])
    assert.equal(account_one_balance.toNumber(), 800000);
    assert.equal(account_two_balance.toNumber(), 200000);

    // Transfer event tests
    assert.equal(receipt.logs.length, 1);
    assert.equal(receipt.logs[0].event, 'Transfer');
    assert.equal(receipt.logs[0].args._from, accounts[0]);
    assert.equal(receipt.logs[0].args._to, accounts[1]);
    assert.equal(receipt.logs[0].args._value.toNumber(), 200000);
  })
})
