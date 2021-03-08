# 私链搭建

## genesis.json 配置

```JSON
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


## 创建创世块

执行以下命令，然后运行节点即可。

```
sipe --role=subchain --datadir=data console
```
