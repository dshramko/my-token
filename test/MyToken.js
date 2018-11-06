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
      assert.include(err.message, 'Not enough balance');
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

  it('approve tokens for delegated transfer', async () => {
    const instance = await MyToken.deployed();
    const success = await instance.approve.call(accounts[1], 100);
    assert.equal(success, true);

    const receipt = await instance.approve(accounts[1], 100, { from: accounts[0] });
    assert.equal(receipt.logs.length, 1);
    assert.equal(receipt.logs[0].event, 'Approval');
    assert.equal(receipt.logs[0].args._owner, accounts[0]);
    assert.equal(receipt.logs[0].args._spender, accounts[1]);
    assert.equal(receipt.logs[0].args._value.toNumber(), 100);

    const allowance = await instance.allowance(accounts[0], accounts[1]);
    assert.equal(allowance.toNumber(), 100);
  })

  it('handle delegate token transfer', async () => {
    const fromAccount = accounts[2];
    const toAccount = accounts[3];
    const spenderAccount = accounts[4];
    const instance = await MyToken.deployed();

    await instance.transfer(fromAccount, 100, { from: accounts[0] });
    await instance.approve(spenderAccount, 10, { from: fromAccount });

    try {
      await instance.transferFrom(fromAccount, toAccount, 9999, { from: spenderAccount });
    } catch(err) {
      assert.include(err.message, 'Value should be less then balance');
    }

    try {
      await instance.transferFrom(fromAccount, toAccount, 20, { from: spenderAccount });
    } catch(err) {
      assert.include(err.message, 'Value should be less then approved amount');
    }

    const success = await instance.transferFrom.call(fromAccount, toAccount, 10, { from: spenderAccount });
    assert.equal(success, true);

    const receipt = await instance.transferFrom(fromAccount, toAccount, 10, { from: spenderAccount });
    assert.equal(receipt.logs.length, 1);
    assert.equal(receipt.logs[0].event, 'Transfer');
    assert.equal(receipt.logs[0].args._from, fromAccount);
    assert.equal(receipt.logs[0].args._to, toAccount);
    assert.equal(receipt.logs[0].args._value, 10);

    const balanceFromAccount = await instance.balanceOf(fromAccount);
    const balanceToAccount = await instance.balanceOf(toAccount);
    assert.equal(balanceFromAccount.toNumber(), 90);
    assert.equal(balanceToAccount.toNumber(), 10);

    const allowance = await instance.allowance(fromAccount, spenderAccount);
    assert.equal(allowance.toNumber(), 0);
  })
})
