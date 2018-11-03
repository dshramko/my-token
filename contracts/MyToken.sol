pragma solidity ^0.4.24;

contract MyToken {
  uint public totalSupply;
  string public name = "My Token";
  string public symbol = "MYT";
  string public standard = "ERC20 My Token v1.0";

  mapping(address => uint) public balanceOf;

  //Constructor
  constructor(uint _initialSupply) public {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
  }
}
