# 下单(Place Order)

连接到 IServer 经纪会话后,此端点允许您提交订单。

CP WEB API 支持多种高级订单类型(orderTypes),更多详情和示例请参阅[订单类型(Order Types)](https://ibkrcampus.com/general/order-types/)页面。

**Cash Quantity(现金数量):**通过指定 cashQty 而非 quantity,以货币金额方式发送订单,例如 cashQty: 200。端点 /iserver/contract/rules 会在 cqtTypes 中返回有效的订单类型列表。\
注意:更多详情请参阅 [Web API 中的现金数量订单](/v1/endpoints/orders/cash-quantity-orders-in-the-web-api)。

**Currency Conversion(货币转换):**通过包含 isCcyConv = true,将现金从一种货币转换为另一种货币。如需指定现金数量,请使用 fxQTY 而非 quantity,例如 fxQTY: 100。

**IB Algos:**通过使用 IBKR 的任何算法订单(Algo Orders),为您的交易附加用户自定义设置。使用端点 /iserver/contract/\{conid}/algos 来确定某个合约可用的策略。

**注意事项:**

* 除 OCA 组和括号订单(bracket orders)外,orders 端点目前不支持批量提交互不相关的订单。
* 在上一个订单被完全确认之前,开发人员不应尝试提交下一个订单,也就是说,当不再收到将客户端引导至 reply 端点的进一步警告时,前一订单才算确认完毕。

#### Abap

```abap
POST /iserver/account/{accountID}/orders
```

#### Python

```python
request_url = f"{baseUrl}/iserver/account/U1234567/orders"
json_content = {
  "orders": [
    {
      "acctId": "U1234567",
      "conid": 265598,
      "conidex": "265598@SMART",
      "manualIndicator": True,
      "extOperator":"person1234",
      "secType": "265598@STK",
      "cOID": "AAPL-BUY-100",
      "parentId": None,
      "orderType": "TRAILLMT",
      "listingExchange": "NASDAQ",
      "isSingleGroup": false,
      "outsideRTH": true,
      "price": 185.50,
      "auxPrice": 183,
      "side": "BUY",
      "ticker": "AAPL",
      "tif": "GTC",
      "trailingAmt": 1.00,
      "trailingType": "amt",
      "referrer": "QuickTrade",
      "quantity": 100,
      # Can not be used in tandem with quantity value.
      # "cashQty": {{ cashQty }},
      # "fxQty": {{ fxQty }},
      "useAdaptive": false,
      "isCcyConv": false,
      # May specify an allocation method such as Equal or NetLiq for Financial Advisors.
      # "allocationMethod": {{ allocationMethod }},
      "strategy": "Vwap",
        "strategyParameters": {
          "MaxPctVol":"0.1",
          "StartTime":"14:00:00 EST",
          "EndTime":"15:00:00 EST",
          "AllowPastEndTime":true
        }
    }
  ]
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/U1234567/orders \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "orders": [
    {
      "acctId": "U1234567",
      "conid": 265598,
      "conidex": "265598@SMART",
      "manualIndicator": true,
      "extOperator":"person1234",
      "secType": "265598:STK",
      "cOID": "AAPL-BUY-100",
      "parentId": null,
      "orderType": "TRAILLMT",
      "listingExchange": "ISLAND",
      "isSingleGroup": false,
      "outsideRth": true,
      "price": 185.50,
      "auxPrice": 183,
      "side": "BUY",
      "ticker": "AAPL",
      "tif": "GTC",
      "trailingAmt": 1.00,
      "trailingType": "amt",
      "referrer": "QuickTrade",
      "quantity": 100,
      # Can not be used in tandem with quantity value.
      # "cashQty": {{ cashQty }}, 
      # "fxQty": {{ fxQty }},
      "useAdaptive": false,
      "isCcyConv": false,
      # May specify an allocation method such as Equal or NetLiq for Financial Advisors.
      # "allocationMethod": {{ allocationMethod }},
      "strategy": "Vwap",
        "strategyParameters": {
          "MaxPctVol":"0.1",
          "StartTime":"14:00:00 EST",
          "EndTime":"15:00:00 EST",
          "AllowPastEndTime":true
        }
    }
  ]
}'
```

#### 响应对象

**orderId:** String。\
返回订单标识符,可用于订单跟踪、修改和取消。

**order\_status:** String。\
返回当前市价订单的订单状态。\
更多信息请参阅[订单状态值(Order Status Value)](/v1/endpoints/order-monitoring/order-status-value)。

**encrypt\_message:** String。\
返回 "1",表示所发送的消息已被加密。

```
[
  {
    "order_id": "1234567890",
    "order_status": "Submitted",
    "encrypt_message": "1"
  }
]
```

#### 备选响应对象

在某些情况下,您会收到一个 ID 以及一条关于您订单的消息。

有关处理该确认的更多细节,请参阅[下单回复(Place Order Reply)](/v1/endpoints/orders/place-order-reply-confirmation)部分。

希望避免接收 /reply 消息的用户,可以考虑使用 [Suppression(消息抑制)](/v1/endpoints/orders/suppress-messages)端点来自动接受这些消息。

**重要:**在发送任何后续订单之前,必须先确认该回复。否则,订单将失效,而尝试确认无效回复将导致超时(503)。

**id:** String。\
返回与特定订单警告确认相关的消息 ID。

**message:** String 数组。\
返回关于订单最初为何未被提交的警告消息。

**isSuppressed:** bool。\
返回发送前特定警告是否被抑制。\
始终返回 false。

**messageIds:** String 数组。\
返回内部消息标识符(仅内部使用)。

```
[
  {
    "id": "07a13a5a-4a48-44a5-bb25-5ab37b79186c",
    "message": [
      "The following order \"BUY 5 AAPL NASDAQ.NMS @ 150.0\" price exceeds \nthe Percentage constraint of 3%.\nAre you sure you want to submit this order?"
    ],
    "isSuppressed": false,
    "messageIds": [
      "o163"
    ]
  }
]
```

#### 订单拒绝对象

如果所提交的订单因账户详情(如交易权限或资金)而无法完成,客户将收到 200 OK 响应以及一条说明问题的错误消息。

这与备选响应对象中使用的 200 响应不同,也不同于因请求内容无效而可能出现的 500 错误。

```
{
  "error":"We cannot accept an order at the limit price you selected. Please submit your order using a limit price that is closer to the current market price of 197.79.  Alternatively, you can convert your order to an Algorithmic Order (IBALGO)."
}
```
