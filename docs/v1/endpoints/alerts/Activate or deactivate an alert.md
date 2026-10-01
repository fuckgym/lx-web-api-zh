# 启用或停用预警

启用或停用为此账户创建的现有预警。该操作不会删除预警,只是在重新启用之前禁用相关通知。

`POST /iserver/account/{{ accountId }}/alert/activate`

#### 请求详情

###### 路径参数

**accountId:** *字符串*。必填\
要获取信息的唯一账户的标识符。\
值格式:"DU1234567"

###### 请求体

**alertId**: *整数*。必填\
从订单创建或预警列表中获得的 alertId(即 order\_id)。

**alertActive**: *整数*。必填\
设置该预警是启用(1)还是停用(0)

#### Python

```python
request_url = f"{baseUrl}/iserver/account/U1234567/alert/activate"
--request POST \
--header 'Content-Type:application/json' \
--data '{
    "alertId": 9876543210,
    "alertActive": 1
}'
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/U1234567/alert/activate \
--request POST \
--header 'Content-Type:application/json' \
--data '{
    "alertId": 9876543210,
    "alertActive": 1
}'
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
