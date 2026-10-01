# 启用/禁用电子邮件选项

启用或禁用您账户的主电子邮箱以接收通知。

`PUT /fyi/deliveryoptions/email`

#### 请求对象

###### Query 参数

**enabled:** String。必填\
启用或禁用您的电子邮件。\
取值格式:true 为启用;false 为禁用

#### Python

```python
request_url = f"{baseUrl}/fyi/deliveryoptions/email?enabled=true"
json_content = {}
requests.put(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/fyi/deliveryoptions/email?enabled={{ enabled }} \
--request PUT \
--data ""
```

#### 响应对象

**V:** int。\
返回 1,表示消息已确认。

**T:** int。\
返回完成此次修改所耗的时间(毫秒)。

```
{
  "V": 1,
  "T": 10
}
```
