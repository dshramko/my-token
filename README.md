## My token - sample cryptocurrency on Ethereum

#### Ethereum resources
[EIP-20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) - A standard interface for tokens.

[Solidtiy](https://solidity.readthedocs.io/en/latest/) - Solidity documentation.

[OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity) - library for secure smart contract development.

[Dappsys](https://dapp.tools/dappsys/) - Safe, simple, flexible building-blocks for smart-contract systems.

[Remix](https://remix.ethereum.org) - Web IDE with built in static analysis, test blockchain VM.

[Geth](https://geth.ethereum.org/) - Official Go implementation of the Ethereum protocol

[IPFS](https://ipfs.io/) - Decentralised storage and file referencing
###### Test Ether faucets
[Rinkeby](https://faucet.rinkeby.io/) |
[Kovan](https://faucet.kovan.network/) |
[Ropsten](https://faucet.ropsten.be/)

###### Ethereum API
[web3.js](https://github.com/ethereum/web3.js/) - Ethereum JavaScript API

[Drizzle](https://truffleframework.com/drizzle) - Redux library to connect a frontend to a blockchain

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
