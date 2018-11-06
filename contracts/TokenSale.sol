pragma solidity ^0.4.24;

import "./MyToken.sol";

contract TokenSale {
  address admin;
  MyToken public tokenContract;
  uint public tokenPrice;

  // set admin, set Token contract, set Token price
  constructor(MyToken _tokenContract, uint _tokenPrice) public {
    admin = msg.sender;

    tokenContract = _tokenContract;
    tokenPrice = _tokenPrice;
  }
}