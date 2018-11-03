pragma solidity ^0.4.24;

contract MyToken {
  uint public totalSupply;

  mapping(address => uint) public balanceOf;

  //Constructor
  constructor(uint _initialSupply) public {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
  }
}
