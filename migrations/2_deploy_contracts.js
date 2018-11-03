const MyToken = artifacts.require('./MyToken.sol');

module.exports = (deployer) => {
  deployer.deploy(MyToken, 1000000);
}
