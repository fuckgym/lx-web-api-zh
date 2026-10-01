# 屏蔽消息

禁用一个或一系列 messageId,使其不再向用户弹出提示。

`POST /iserver/questions/suppress`

#### 请求对象

###### 正文参数

**messageIds:** String 数组。\
要屏蔽的每条警告消息的标识符。\
该数组最多支持在单个请求中发送 51 条消息。任何额外的值都会导致系统错误。\
唯一支持的消息 ID 列在我们[可屏蔽的消息 ID](/web-api/v1/endpoints/orders/suppressible-message-ids)列表中。不过,用户应仅在需要时才屏蔽消息,以避免出现意外的订单提交。

#### Python

```python
request_url = f"{baseUrl}/iserver/questions/suppress"
json_content = {
  "messageIds": ["o102"]
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/questions/suppress \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "messageIds": ["o102"]
}'
```

#### 响应对象

**status:** String。\
确认请求已被发送。

```
{
  "status": "submitted"
}
```
