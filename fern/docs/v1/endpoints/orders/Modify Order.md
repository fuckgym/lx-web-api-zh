# 修改订单

修改一笔未结订单。

在修改订单之前必须先调用 /iserver/accounts 端点。

使用 /iservers/account/orders 端点来查看未结订单。

`POST /iserver/account/{accountId}/order/{orderId}`

#### 请求对象

###### 路径参数

**accountId:** String。\
应由哪个账户下单的账户 ID。

**orderId:** String。\
要修改的订单 ID。\
可从 /iserver/account/orders 获取。

###### 请求体参数

修改订单端点的请求体内容与标准 /iserver/account/\{accountId}/orders 端点遵循相同的结构。

内容应与原始订单的内容保持一致。

**manualIndicator:** boolean。必填\*\
**重要** 交易期货（Futures）和期货期权（Futures Options）合约时必须提供此字段，以遵守 [CME Group Rule 536-B](https://www.cmegroup.com/rulebook/files/cme-group-Rule-536-B-Tag1028.pdf)。\
手动订单指示符（Manual Order Indicator）用于确定订单是通过人工修改还是通过自动化工具修改。无论原始提交方式如何，修改时也必须包含 manualIndicator 标签，以表明此次订单修改是人工还是自动完成。\
true 表示订单是通过界面人工修改的，false 表示订单是通过自动化系统修改的。

**extOperator:** string。必填\*\
**重要** 交易期货（Futures）和期货期权（Futures Options）合约时必须提供此字段，以遵守 [CME Group Rule 536-B](https://www.cmegroup.com/rulebook/files/cme-group-Rule-536-B-Tag1028.pdf)。\
外部操作员（External Operator）字段应包含请求提交时负责该 API 操作的提交用户的相关信息。

更多详情请参阅[下单](/web-api/v1/endpoints/orders/place-order)部分。

#### Python

```python
request_url = f"{baseUrl}/iserver/account/U1234567/order/123456789
json_content = {
  "conid": 265598,
  "orderType": "STP",
  "price": 180,
  "side": "BUY",
  "tif": "DAY",
  "quantity": 10,
  "manualIndicator":True,
  "extOperator": "person1234"
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/U1234567/order/123456789 \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "conid": 265598,
  "orderType": "STP",
  "price": 180,
  "side": "BUY",
  "tif": "DAY",
  "quantity": 10,
  "manualIndicator":true,
  "extOperator": "person1234"

}'
```

#### 响应对象

**orderId:** String。\
返回订单标识符，可用于订单跟踪、修改和取消。

**order\_status:** String。\
返回当前市价单的订单状态。\
更多信息请参阅[订单状态值](/web-api/v1/endpoints/order-monitoring/order-status-value)。

**encrypt\_message:** String。\
返回 "1"，表示所发送的消息已加密。

```
[
    {
        "order_id": "1234567890",
        "order_status": "Submitted",
        "encrypt_message": "1"
    }
]
```

#### 替代响应对象

在某些情况下，您会收到一个 ID 以及一条关于您订单的消息。

有关如何处理该确认的更多详情，请参阅[下单回复确认](/web-api/v1/endpoints/orders/place-order-reply-confirmation)部分。

**id:** String。\
返回与该订单特定警告确认相关的消息 ID。

**message:** 字符串数组。\
返回关于订单为何未立即传送的警告消息。

**isSuppressed:** bool。\
返回发送前某个特定警告是否被抑制。\
始终返回 false。

**messageIds:** 字符串数组。\
返回一个内部消息标识符（仅限内部使用）。

```
[
  {
    "id": "a12b34c5-d678-9e012f-3456-7a890b12cd3e",
    "message": [
      "You are about to submit a stop order. Please be aware of the various stop order types available and the risks associated with each one.\nAre you sure you want to submit this order?"
    ],
    "isSuppressed": false,
    "messageIds": [
      "o0"
    ]
  }
]
```
