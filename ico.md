## sample ICO steps

* Provision tokens to token sale cotract
* Set a token price in wei
* Assign an admin
* Buy tokens
* End sale

transfer MyTokens to contract address from truffle console

```bash
MyToken.deployed().then(i => tokenInstance = i)
TokenSale.deployed().then(i => tokenSaleInstance = i)
const admin = web3.eth.accounts[0]
tokenInstance.transfer(tokenSaleInstance.address, 750000, { from: admin })
```