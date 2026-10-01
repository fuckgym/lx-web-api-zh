# 条件单(Bracket Orders)与 OCA 组

条件单(Bracket)或 OCA 订单可用的取值和结构与单个订单的通用结构一致。条件单和 OCA 订单要求先提交一个父订单,然后每个分支(即子订单)都要包含父订单的订单 ID(order ID)。

条件单可以使用 Interactive Brokers 创建的默认 order\_id 按顺序提交。

或

条件单也可以通过在父订单中使用 cOID 字段来提交,然后在每个子订单的 parentId 字段中使用这一相同的值。

右侧的正文内容表示一个标准条件单,其中包含一个父订单、一个止盈单(profit taker)和一个止损单(stop loss)。可以看到,该订单唯一新增的内容是在父订单中加入了 cOID,并在两个子订单中加入了 parentId 字段。

```
{
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

OCA 组遵循与此相同的结构。不过,除了标准条件单的设置之外,每个订单还将包含 `"isSingleGroup": true`。除此之外,无需进行任何额外修改。

```
{
  "orders": [
    {
      "acctId": "U1234567",
      "conid": 265598,
      "cOID": "Parent",
      "orderType": "MKT",
      "listingExchange": "SMART",
      "isSingleGroup": true,
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
      "isSingleGroup": true,
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
      "isSingleGroup": true,
      "price": 157.00,
      "side": "Sell",
      "tif": "GTC",
      "quantity": 50,
      "parentId": "Parent"
    }
  ]
}
```
