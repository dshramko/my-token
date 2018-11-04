pragma solidity ^0.4.24;

contract MyToken {
  uint   public totalSupply;
  string public name = "My Token";
  string public symbol = "MYT";
  string public standard = "ERC20 My Token v1.0";

  event Transfer(
    address indexed _from,
    address indexed _to,
    uint _value
  );

  mapping(address => uint) public balanceOf;

  //Constructor
  constructor(uint _initialSupply) public {
    balanceOf[msg.sender] = _initialSupply;
    totalSupply = _initialSupply;
  }

  /**
  * @dev Transfer token for a specified addresses
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to,  uint _value) public returns(bool success) {
    require(balanceOf[msg.sender] >= _value);

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    emit Transfer(msg.sender, _to, _value);

    return true;
  }
}
