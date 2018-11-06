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

  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint _value
  );

  mapping(address => uint) public balanceOf;
  mapping(address => mapping(address => uint)) public allowance;

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
    require(balanceOf[msg.sender] >= _value, "Not enough balance");

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    emit Transfer(msg.sender, _to, _value);

    return true;
  }

  /**
  * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
  * @param _spender The address which will spend the funds.
  * @param _value The amount of tokens to be spent.
  */
  function approve(address _spender, uint _value) public returns (bool success) {
    allowance[msg.sender][_spender] = _value;

    emit Approval(msg.sender, _spender, _value);

    return true;
  }

  /**
  * @dev Transfer tokens from one address to another
  * @param _from address The address which you want to send tokens from
  * @param _to address The address which you want to transfer to
  * @param _value uint256 the amount of tokens to be transferred
  */
  function transferFrom(address _from, address _to, uint _value) public returns (bool success) {
    require(_value <= balanceOf[_from], "Value should be less then balance");
    require(_value <= allowance[_from][msg.sender], "Value should be less then approved amount");

    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;

    allowance[_from][msg.sender] -= _value;

    emit Transfer(_from, _to, _value);
    return true;
  }
}
