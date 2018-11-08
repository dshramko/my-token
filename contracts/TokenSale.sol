pragma solidity ^0.4.24;

import "./MyToken.sol";

contract TokenSale {
  address admin;
  MyToken public tokenContract;
  uint public tokenPrice;
  uint public tokensSold;

  event Sell(address _buyer, uint _amount);

  /**
  * Function from openzeppelin-solidity project
  * @dev Multiplies two numbers, reverts on overflow.
  */
  function multiply(uint a, uint b) internal pure returns (uint) {
    if (a == 0) {
      return 0;
    }

    uint c = a * b;
    require(c / a == b);

    return c;
  }

  // set admin, set Token contract, set Token price
  constructor(MyToken _tokenContract, uint _tokenPrice) public {
    admin = msg.sender;

    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice;
  }

  /**
  * @dev Buy MyToken tokens
  * @param _numberOfTokens The amount of tokens to buy
  */
  function buyTokens(uint _numberOfTokens) public payable {
    require(msg.value == multiply(_numberOfTokens, tokenPrice), "Value should be equal number of tokens in wei");
    require(tokenContract.balanceOf(this) >= _numberOfTokens, "Can not buy more tokens than available");
    require(tokenContract.transfer(msg.sender, _numberOfTokens));

    tokensSold += _numberOfTokens;

    emit Sell(msg.sender, _numberOfTokens);
  }

  /**
  * @dev Ending token sale
  */
  function endSale() public {
    require(msg.sender == admin, "Must be admin to end sale");
    require(tokenContract.transfer(admin, tokenContract.balanceOf(this)));

    selfdestruct(admin);

  }
}