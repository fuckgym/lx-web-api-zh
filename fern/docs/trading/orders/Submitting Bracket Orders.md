# 提交条件单(Bracket Orders)

条件单(Bracket order)可以在单个请求中一并提交。

父订单通过 `cOID`(client order ID,客户订单 ID)字段被分配一个任意标识符,然后通过 `parentId` 字段使用相同的值将子订单与父订单关联起来,从而建立条件关系。

```{
  "orders": [
    {
      "acctId": "U1234567",
      "conid": 265598,
      "cOID": "Parent",
      "orderType": "MKT",
      "listingExchange": "SMART",
      "outsideRTH": true,
      "side": "Buy",
      "referrer": "QuickTrade",
      "tif": "GTC",
      "quantity": 50
    },
    {
      "acctId": "U1234567",
      "conid": 265598,
      "orderType": "STP",
      "listingExchange": "SMART",
      "outsideRTH": false,
      "price": 157.30,
      "side": "Sell",
      "tif": "GTC",
      "quantity": 50,
      "parentId": "Parent"
    },
    {
      "acctId": "U1234567",
      "conid": 265598,
      "orderType": "LMT",
      "listingExchange": "SMART",
      "outsideRTH": false,
      "price": 157.00,
      "side": "Sell",
      "tif": "GTC",
      "quantity": 50,
      "parentId": "Parent"
    }
  ]
}
```
