# 预览订单 / WhatIf 订单

此端点允许您在不实际提交订单的情况下预览订单，并且可以在响应中获得佣金信息。同时也支持括号订单（bracket order）。

**注意：** 请注意，/whatif 订单也会受到我们的[消息抑制端点](/v1/endpoints/orders/suppress-messages)的影响。

在请求 /whatif 端点之前，客户端必须先通过 /iserver/marketdata/snapshot 查询该合约品种。

`POST /iserver/account/{accountId}/orders/whatif`

#### 请求对象

/whatif 端点的请求体内容与标准 /iserver/account/\{accountId}/orders 端点遵循相同的结构。

更多详情请参阅[下单](/v1/endpoints/orders/place-order)部分。

#### Python

```python
request_url = f"{baseUrl}/iserver/account/U1234567/orders/whatif"
json_content = {
  "orders": [
    {
      "conid": 265598,
      "orderType": "LMT",
      "price": 200.25,
      "side": "BUY",
      "tif": "DAY",
      "quantity": 5
    }
  ]
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/U1234567/orders/whatif \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "orders": [
    {
      "conid": 265598,
      "orderType": "LMT",
      "price": 200.25,
      "side": "BUY",
      "tif": "DAY",
      "quantity": 5
    }
  ]
}'
```

#### 响应对象

**amount:** Object。\
包含订单成本的详情。\
\{\
**amount:** String。\
返回基础订单的成本。

**commission:** String。\
返回基础订单的佣金成本。

**total:** String。\
返回订单的总成本。\
},

**equity:** Object。\
包含该订单对您权益（equity）影响的详情。\
\{\
**current:** String。\
返回账户的当前权益。

**change:** String。\
返回该订单对权益的影响。

**after:** String。\
返回订单成交后的权益。\
},

**initial:** Object。\
包含该订单对您的初始保证金（initial margin）影响的详情。\
\{\
**current:** String。\
返回当前初始保证金价值。

**change:** String。\
返回初始保证金将变化的金额。

**after:** String。\
返回订单之后的初始保证金价值。\
},

**maintenance:** Object。\
包含该订单对您的维持保证金（maintenance margin）影响的详情。\
\{\
**current:** String。\
返回当前维持保证金价值。

**change:** String。\
返回维持保证金将变化的金额。

**after:** String。\
返回交易之后的维持保证金价值。\
},

**position:** Object。\
包含该订单对您当前持仓影响的详情。\
\{\
**current:** String。\
返回基础订单的成本。

**change:** String。\
返回基础订单的成本。

**after:** String。\
返回基础订单的成本。\
},

**warn:** String。\
返回下单可能产生的任何警告消息。\
若不可能出现警告则返回 null。

**error:** String。\
返回下单可能产生的任何错误消息。\
若不可能出现错误则返回 null。

```
{
  "amount": {
    "amount": "1,977.60 USD (10 Shares)",
    "commission": "1 USD",
    "total": "1,978.60 USD"
  },
  "equity": {
    "current": "215,415,594",
    "change": "-1",
    "after": "215,415,593"
  },
  "initial": {
    "current": "116,965",
    "change": "652",
    "after": "117,617"
  },
  "maintenance": {
    "current": "106,332",
    "change": "592",
    "after": "106,924"
  },
  "position": {
    "current": "0",
    "change": "10",
    "after": "10"
  },
  "warn": "21/You are trying to submit an order without having market data for this instrument. \nIB strongly recommends against this kind of blind trading which may result in \nerroneous or unexpected trades.",
  "error": null
}
```
