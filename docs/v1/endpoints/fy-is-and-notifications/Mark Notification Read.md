# 将通知标记为已读

将特定的通知消息标记为已读或未读。

`PUT /fyi/notifications/{notificationID}`

#### 请求对象

###### 路径参数

**notificationId:** String。必填\
用于指定要标记的特定通知的代码。

#### Python

```python
request_url = f"{baseUrl}/fyi/notifications/more?id=12345678901234567"
json_content = {}
requests.put(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/fyi/notifications/12345678901234567 \
--request PUT \
--data ""
```

#### 响应对象

**V:** int。\
返回 1,表示消息已被确认。

**T:** int。\
返回完成此次编辑所用的时间(毫秒)。

**P:** Object。\
返回有关通知已读状态的详细信息。

**R:** int。\
返回消息为已读(1)还是未读(0)。

**ID:** String。\
返回该通知的 ID。

```
{
  "V": 1,
  "T": 5,
  "P": {
    "R": 1,
    "ID": "12345678901234567"
  }
}
```
