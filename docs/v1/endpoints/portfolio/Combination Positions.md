# 组合持仓

返回账户中以组合（combination）方式取得的全部持仓，包括比率、规模和市场价值等数值。

`GET /portfolio/{accountId}/combo/positions`

#### 请求对象

###### 路径参数

**accountId:** String。必填\
应由哪个账户下单的账户 ID。

###### 查询参数

**nocache:** Boolean\
设置请求是否应在不使用缓存的情况下进行。\
默认为 false

#### Python

```python
request_url = f"{baseUrl}/portfolio/U1234567/combo/positions?nocache=true"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/portfolio/U1234567/combo/positions?nocache=true \
--request GET
```

#### 响应对象

**name:** String。\
这是用于区分不同组合的内部名称。

**description:** String。\
提供该组合的比率和各 leg 的 conId。

**legs:** array。\
包含特定组合中所有 leg 的数组。

**conid:** String。\
返回组合中一个 leg 的 conid。

**ratio:integer\
返回组合的比率值。可以为正数或负数。**

**positions:** array。\
提供一个包含组合中 leg 信息的数组。

**acctId:** String。\
返回持有该 leg 的 accountId。

conid: integer。\
返回特定 leg 的合约 ID。

**contractDesc:** String。\
返回给定合约的长名称。

position: integer。\
返回组合中特定 leg 的总规模。

mktPrice: integer。\
返回组合中该 leg 每股的当前市场价格。

mktValue: integer。\
返回组合中该持仓的总价值。

currency: String。\
返回该 leg 的基础货币。

avgCost: integer。\
返回持仓中每股的平均成本乘以乘数的结果。

avgPrice: integer。\
返回买入时持仓中每股的平均成本。

realizedPnl: integer。\
返回今日通过交易获得的总利润。

**unrealizedPnl:** integer。\
返回若进行交易可获得的总潜在利润。

**exchs:** null。\
已弃用的值。\
始终返回 null。

**expiry:** null。\
已弃用的值。\
始终返回 null。

**putOrCall:** null。\
已弃用的值。\
始终返回 null。

**multiplier:** null。\
已弃用的值。\
始终返回 null。

**strike:** integer。\
已弃用的值。\
始终返回 0.0。

exerciseStyle: null。\
已弃用的值。\
始终返回 null。

**conExchMap:** array。\
已弃用的值。\
返回空数组。

**assetClass:** String。\
返回该 leg 的证券类型。

**undConid:** integer\
已弃用的值。\
始终返回 0。

```
[
  {
    "name":"CP.CP66a00d50",
    "description":"1*708474422-1*710225103",
    "legs":[
      {
        "conid":"708474422",
        "ratio":1
      },
      {
        "conid":"710225103",
        "ratio":-1
      }
    ],
    "positions":[
      {
        "acctId":"U1234567",
        "conid":708474422,
        "contractDesc":"SPX AUG2024 5555 P [SPX 240816P05555000 100]",
        "position":1.0,
        "mktPrice":59.6571617,
        "mktValue":5965.72,
        "currency":"USD",
        "avgCost":6011.70935,
        "avgPrice":60.1170935,
        "realizedPnl":0.0,
        "unrealizedPnl":-45.99,
        "exchs":null,
        "expiry":null,
        "putOrCall":null,
        "multiplier":null,
        "strike":0.0,
        "exerciseStyle":null,
        "conExchMap":[],
        "assetClass":"OPT",
        "undConid":0
      },
      {
        "acctId":"U1234567",
        "conid":710225103,
        "contractDesc":"SPX AUG2024 5565 C [SPX 240816C05565000 100]",
        "position":-1.0,
        "mktPrice":78.02521515,
        "mktValue":-7802.52,
        "currency":"USD",
        "avgCost":7628.29065,
        "avgPrice":76.2829065,
        "realizedPnl":0.0,
        "unrealizedPnl":-174.23,
        "exchs":null,"expiry":null,
        "putOrCall":null,
        "multiplier":null,
        "strike":0.0,
        "exerciseStyle":null,
        "conExchMap":[],
        "assetClass":"OPT",
        "undConid":0
      }
    ]
  }
]
```
