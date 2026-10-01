# 查询货币余额

`/portfolio/{accountId}/ledger` 端点提供按货币组织的现金余额信息。

示例请求:

`GET https://api.ibkr.com/v1/api/portfolio/{accountId}/ledger`

成功响应:

```{
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
