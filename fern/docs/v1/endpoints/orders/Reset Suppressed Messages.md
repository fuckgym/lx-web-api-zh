# 重置已屏蔽的消息

重置所有由[屏蔽消息端点](/v1/endpoints/orders/suppress-messages)屏蔽的消息。

`POST /iserver/questions/suppress/reset`

#### 请求对象

无需发送任何参数或请求体内容。

#### Python

```python
request_url = f"{baseUrl}/iserver/questions/suppress/reset"
json_content = {}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/questions/suppress/reset \
--request POST \
--header 'Content-Type:application/json' \
--data ''
```

#### 响应对象

**status:** 字符串。\
确认请求已发送。

```
{
  "status": "submitted"
}
```
