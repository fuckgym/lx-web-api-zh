# 确认下单回复

确认下单时呈现的订单注意事项和警告。收到回复消息后**必须**立即对订单进行回复。提交其他订单或其他请求将取消该订单，而尝试确认回复将导致 503 错误。

希望避免接收 /reply 消息的用户可以考虑使用 [Suppression](/web-api/v1/endpoints/orders/suppress-messages) 端点来自动接受这些消息。

#### Abap

```abap
POST /iserver/reply/{{ replyId }}
```

#### Python

```python
request_url = f"{baseUrl}/iserver/reply/a12b34c5-d678-9e012f-3456-7a890b12cd3e"
json_content = {"confirmed":true}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/reply/a12b34c5-d678-9e012f-3456-7a890b12cd3e \
--request POST \
--header 'Content-Type:application/json' \
--data '{"confirmed":true}'
```

#### Response Object

**orderId:** String.\
返回订单标识符，可用于订单跟踪、修改和取消。

**order\_status:** String.\
返回当前市价订单的订单状态。\
更多信息请参阅[订单状态值](/web-api/v1/endpoints/order-monitoring/order-status-value)。

**encrypt\_message:** String.\
返回 "1" 以表示所发送的消息已加密。

```
[
  {
    "order_id": "1234567890",
    "order_status": "Submitted",
    "encrypt_message": "1"
  }
]
```

**注意：** 在向 /iserver/reply/\{replyId} 端点发送初始确认后，你可能会收到更多回复消息。这些确认消息也必须逐一响应，订单才会提交。
