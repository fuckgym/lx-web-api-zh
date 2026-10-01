# 删除预警

永久删除一个现有预警。

如果 alertId 为 0,将删除所有预警

如果您调用删除某个 MTA 预警,它将被重置为默认状态。

`DELETE /iserver/account/{{ accountId }}/alert/{{ alertId }}`

#### 请求参数

###### 路径参数

**accountId:** *字符串*。必填\
要获取信息的唯一账户的标识符。\
值格式:"DU1234567"

**alertId:** *整数*\*\*。\*\* 必填\
从原始预警创建或从可用预警列表中返回的 order\_id。

#### Python

```python
request_url = f"{baseUrl}/iserver/account/U1234567/alert/9876543210"
json_content = {}
requests.delete(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/U1234567/alert/9876543210 \
--request DELETE
```

#### 响应对象

**request\_id:** *整数*。\
返回 'null'

**order\_id:** *整数*。\
返回所请求的 alertId 或 order\_id

**success:** *布尔值*。\
成功时返回 true

**text:** *字符串*。\
为 "success" 状态补充附加信息。

**failure\_list:** *字符串*。\
如果 "success" 返回 false,将列出失败的订单 ID

```
{
  "request_id": null,
  "order_id": 9876543210,
  "success": true,
  "text": "Request was submitted",
  "failure_list": null
}
```
