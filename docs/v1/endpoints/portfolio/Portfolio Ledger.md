# 投资组合账本

有关账户基础货币下的已结算现金、现金余额等信息,以及以其他货币持有的其他现金余额。在调用此端点之前,必须先调用 /portfolio/accounts 或 /portfolio/subaccounts。受支持货币的列表可在 [https://www.interactivebrokers.com/en/index.php?f=3185](https://www.interactivebrokers.com/en/index.php?f=3185) 查看。

`GET /portfolio/{accountId}/ledger`

#### 请求对象

###### 路径参数

**accountId:** String。必填\
指定需要账本(ledger)信息的账户 ID。

#### Python

```python
request_url = f"{baseUrl}/portfolio/U1234567/ledger"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/portfolio/U1234567/ledger \
--request GET
```

#### 响应对象

**\{currency}:** Object。\
返回指定货币的账本值。\
可能返回 "BASE" 以表示你的基础货币。\
\{\
**commoditymarketvalue:** float。\
返回给定货币下商品持仓的总市值。

**futuremarketvalue:** float。\
返回给定货币下期货持仓的总市值。

**settledcash:** float。\
返回给定货币的已结算现金总额。

**exchangerate:** int。\
返回从基础货币到指定货币的汇率。

**sessionid:** int。\
仅供内部使用。

**cashbalance:** float。\
返回给定货币下可用于交易的现金总额。

**corporatebondsmarketvalue:** float。\
返回给定货币下公司债券持仓的总市值。

**warrantsmarketvalue:** float。\
返回给定货币下权证持仓的总市值。

**netliquidationvalue:** float。\
返回给定货币下所持持仓的当前净清算值。

**interest:** float。\
返回给定货币的保证金利率。

**unrealizedpnl:** float。\
返回给定货币下持仓的未实现盈亏。

**stockmarketvalue:** float。\
返回给定货币下股票持仓的总市值。

**moneyfunds:** float。\
返回给定货币下货币基金持仓的总市值。

**currency:** String。\
返回货币符号。

**realizedpnl:** float。\
返回给定货币下持仓的已实现盈亏。

**funds:** float。\
返回给定货币下所有基金持仓的总市值。

**acctcode:** String。\
返回所指定账户所有者的账户 ID。

**issueroptionsmarketvalue:** float。\
返回给定货币下所有发行人期权持仓的总市值。

**key:** String。\
返回 "LedgerList"。仅供内部使用。

**timestamp:** int。\
返回所取数值的 epoch 时间戳。

**severity:** int。\
仅供内部使用。

**stockoptionmarketvalue:** float。\
返回给定货币下所有股票期权持仓的总市值。

**futuresonlypnl:** float。

**tbondsmarketvalue:** float。\
返回给定货币下所有国债持仓的总市值。

**futureoptionmarketvalue:** float。\
返回给定货币下所有期货期权持仓的总市值。

**cashbalancefxsegment:** float。\
仅供内部使用。

**secondkey:** String。\
返回货币符号。

**tbillsmarketvalue:** float。\
返回给定货币下所有短期国库券持仓的总市值。

**dividends:** float。\
返回以给定货币持有的股息价值。\
}

```
{
  "USD": {
    "commoditymarketvalue": 0.0,
    "futuremarketvalue": -1051.0,
    "settledcash": 214716688.0,
    "exchangerate": 1,
    "sessionid": 1,
    "cashbalance": 214716688.0,
    "corporatebondsmarketvalue": 0.0,
    "warrantsmarketvalue": 0.0,
    "netliquidationvalue": 215335840.0,
    "interest": 305569.94,
    "unrealizedpnl": 39695.82,
    "stockmarketvalue": 314123.88,
    "moneyfunds": 0.0,
    "currency": "USD",
    "realizedpnl": 0.0,
    "funds": 0.0,
    "acctcode": "U1234567",
    "issueroptionsmarketvalue": 0.0,
    "key": "LedgerList",
    "timestamp": 1702582321,
    "severity": 0,
    "stockoptionmarketvalue": -2.88,
    "futuresonlypnl": -1051.0,
    "tbondsmarketvalue": 0.0,
    "futureoptionmarketvalue": 0.0,
    "cashbalancefxsegment": 0.0,
    "secondkey": "USD",
    "tbillsmarketvalue": 0.0,
    "endofbundle": 1,
    "dividends": 0.0
  },
  "BASE": {
    "commoditymarketvalue": 0.0,
    "futuremarketvalue": -1051.0,
    "settledcash": 215100080.0,
    "exchangerate": 1,
    "sessionid": 1,
    "cashbalance": 215100080.0,
    "corporatebondsmarketvalue": 0.0,
    "warrantsmarketvalue": 0.0,
    "netliquidationvalue": 215721776.0,
    "interest": 305866.88,
    "unrealizedpnl": 39907.37,
    "stockmarketvalue": 316365.38,
    "moneyfunds": 0.0,
    "currency": "BASE",
    "realizedpnl": 0.0,
    "funds": 0.0,
    "acctcode": "U1234567",
    "issueroptionsmarketvalue": 0.0,
    "key": "LedgerList",
    "timestamp": 1702582321,
    "severity": 0,
    "stockoptionmarketvalue": -2.88,
    "futuresonlypnl": -1051.0,
    "tbondsmarketvalue": 0.0,
    "futureoptionmarketvalue": 0.0,
    "cashbalancefxsegment": 0.0,
    "secondkey": "BASE",
    "tbillsmarketvalue": 0.0,
    "dividends": 0.0
  }
}
```
