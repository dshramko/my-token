## My token - sample cryptocurrency on Ethereum

#### Ethereum crypto token standart
[EIP-20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) - A standard interface for tokens.

[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity) - library for secure smart contract development

[token sale steps](ico.md)

#### Install

* Install [truffle](https://truffleframework.com/) package and ganache-cli as development blockchain for Ethereum.

```bash
yarn global add truffle
yarn global add ganache-cli
```
or
```bash
npm install -g truffle
npm install -g ganache-cli
```

#### Run ganache-cli

```bash
ganache-cli
```

#### Truffle commands

Compile the smart contracts:

```bash
truffle compile
```

Migrating(deploying) with Truffle

```bash
truffle migrate
```

Run tests

```bash
truffle test
```
