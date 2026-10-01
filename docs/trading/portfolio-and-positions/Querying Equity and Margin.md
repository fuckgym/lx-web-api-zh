# 查询权益与保证金

`/portfolio/{accountId}/summary` 端点提供与账户权益、保证金使用和应计余额相关的多种数值。

这些数值以整个 U 账户("universal account",通用账户)为单位汇总呈现,同时也会按账户底层的监管分部拆分呈现(例如,证券分部与持有期货产品的商品分部)。

请求示例:

`GET https://api.ibkr.com/v1/api/portfolio/{accountId}/summary`

成功响应:

```{
  "accountcode": {
    "amount": 0.0,
    "currency": null,
    "isNull": false,
    "timestamp": 1702582422000,
    "value": "U1234567",
    "severity": 0
  },
  ...,
  "indianstockhaircut": {
    "amount": 0.0,
    "currency": "USD",
    "isNone": false,
    "timestamp": 1702582422000,
    "value": null,
    "severity": 0
  }
}
```
