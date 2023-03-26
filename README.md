# opclave-scaling2023

<img style="width: 220px" align="right" src="https://raw.githubusercontent.com/itublockchain/NFT/main/logo-notext.png">

[Showcase page](https://ethglobal.com/showcase/opclave-opstack-impr-erc4337-and-apple-sign-94def)

Opclave is an OP Stack improvement with ERC-4337 compatible SC accounts that uses signatures abstracted with AppleEnclave which allows users to create and use non-custodial wallets with touch/face id without having seed phrases and improved with AttestationStationSDK.

[ETHGlobal Scaling 2023 Hackathon](https://ethglobal.com/events/scaling2023) project

<br/>

| Team Member                                     | Role            |
| ----------------------------------------------- | --------------- |
| [0xulas.eth](https://twitter.com/ulerdogan)     | Client          |
| [tahos.eth](https://twitter.com/0xTahos)        | Smart Contracts |
| [zetsub0ii.eth](https://twitter.com/zetsuboii_) | Wallet          |
| [0xdogan.eth](https://twitter.com/doganeth)     | Research        |
| [buzagi.eth](https://twitter.com/thebuzagi)     | Design          |

<hr/>

Project Base:
```
    opclave-scaling2023/
    ├── bundler/
    ├── docker/
    ├── frontend/
    ├── opclave-contracts/ (S)
    ├──── opclave-scaling2023_opgeth/ (S)
    └──── precompiles/

    bundler: bundler app for the AA
    docker: docker configs and commands
    frontend: mobile wallet app
    opclave-contracts: submodule of smarts contracts / wallet for AA
    scaling2023_opgeth: submodule of customized op-geth
    precompiles: go scripts of precompile contract
```