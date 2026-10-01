# 响应服务器提示

对通过 ntf websocket 消息接收到的服务器提示作出响应。

`POST /iserver/notification`

#### 请求对象

###### 正文参数

**orderId** int。必填\
IB 分配的订单标识符,从传递服务器提示的 ntf websocket 消息中获取。

**reqId** string。必填\
IB 分配的请求标识符,从传递服务器提示的 ntf websocket 消息中获取。

**text** string。必填\
在服务器提示 ntf websocket 消息中传递的 "options" 数组中所选定的值。

#### Python

```python
request_url = f"{baseUrl}/iserver/notification"
json_content = {
  "orderId": 987654321,
  "reqId": "12345",
  "text": "Yes"
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {baseUrl}/iserver/notification \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "orderId": 987654321,
  "reqId": "12345",
  "text": "Yes"
}'
```

#### 响应对象

**\{Status text}:** string\
返回确认消息的状态。

```
Success
```
