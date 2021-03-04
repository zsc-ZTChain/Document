# 创世文件
`ZSC`链的主链和测试链创世信息，都已通过硬编码的形式，内置在了代码内，对应的创世文件如下，以供验证。

## 名词说明
- chainId 链的唯一性标识；
- `homesteadBlock` `eip150Block` `eip150Hash` `eip155Block` `eip158Block` `byzantiumBlock` `constantinopleBlock` `petersburgBlock` `istanbulBlock` `muirGlacierBlock` 硬分叉高度配置；
- `congress` 共识参数配置。 `period`为出块间隔，`epoch`为一个周期设定，单位是`block`，每个`epoch`结束的时候，会对验证人进行相应调整；
- `number` `gasUsed` `parentHash` `nonce` `timestamp` `extraData` `gasLimit` `difficulty` 均为创世块的参数
- `extraData` 设置了初始的验证人群组；
- `alloc` 配置了初始账户信息，可以用来进行资产预分配和系统合约的预初始化；
    - 0xdaf88b74fca1246c6144bc846aaa3441ed095191 //创世 HT 锁定地址
    - 000000000000000000000000000000000000F000 //validators 合约
    - 000000000000000000000000000000000000F001 // punish 合约
    - 000000000000000000000000000000000000F002 // proposal 合约

  系统合约代码仓库：[huobi-eco-contracts](https://github.com/HuobiGroup/huobi-eco-contracts)

## mainnet
``` JSON
{
     "config": {
     "chainId": 20212,
     "singularityBlock": 0,
     "dpos": {
     "period": 3,
     "epoch": 201600,
     "maxSignersCount": 21,
     "minVoterBalance": 100000000000000000000,
     "genesisTimestamp": 1613793600,
     "signers": [
     "c4dd76a86e6f59ac9b461a3c3566646a316d5787",
     "aca71dbe4ed4fe773fce11e691dd522bbad259e1",
     "884e01ac2ca8816c86d1f167524ab192898cdcb1"
     ],
     "pbft": false,
     "voterReward": false
     }
     },
     "nonce": "0x0",
     "timestamp": "0x5ca03b40",
     "extraData": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
     "gasLimit": "0x47b760",
     "difficulty": "0x1",
     "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
     "coinbase": "0x0000000000000000000000000000000000000000",
     "alloc": {
     "34c97e0ca7677081d8052c2cab9439c73053419f": {
     "balance": "0x753624645e07ee6a800000"
     },
     "884e01ac2ca8816c86d1f167524ab192898cdcb1": {
     "balance": "0x152d02c7e14af6800000"
     },
     "aca71dbe4ed4fe773fce11e691dd522bbad259e1": {
     "balance": "0x152d02c7e14af6800000"
     },
     "c4dd76a86e6f59ac9b461a3c3566646a316d5787": {
     "balance": "0x152d02c7e14af6800000"
     }
     },
     "number": "0x0",
     "gasUsed": "0x0",
     "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
     }
```
## testnet
``` JSON

```