const MyToken = artifacts.require('./MyToken.sol');
const TokenSale = artifacts.require('./TokenSale.sol');
const price = 1000000000000000; // price in wei

module.exports = (deployer) => {
  deployer.then( async () => {
    await deployer.deploy(MyToken, 1000000);
    await deployer.deploy(TokenSale, MyToken.address, price);
  })
}
