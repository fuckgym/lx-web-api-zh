# 获取可用提醒列表

检索附加到所提供账户的所有提醒的列表。

`GET /iserver/account/{{ accountId }}/alerts`

###### 路径参数

**accountId:** *String*。必填\
用于检索信息的唯一账户的标识符。\
值格式："DU1234567"

#### Python

```python
request_url = f"{baseUrl}/iserver/account/U1234567/alerts"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/U1234567/alerts \
--request GET
```

#### 响应对象：

返回一个由逗号分隔的 JSON 对象组成的数组

**order\_id:** *int.*\
可搜索的订单 ID

**account:** *String*。\
提醒所归属的账户。

**alert\_name:** *String.*\
为该提醒请求的名称。

**alert\_active:** *int.*\
确定该提醒是否处于激活状态

**order\_time:** *String.*\
提醒创建时间的 UTC 格式时间。

**alert\_triggered:** *bool.*\
确认该订单是否已被触发。

**alert\_repeatable:** *int.*\
确认该提醒是否已启用重复。

```
[
  {
    "order_id": 9876543210,
    "account": "U1234567",
    "alert_name": "AAPL Price",
    "alert_active": 1,
    "order_time": "20231211-18:55:35",
    "alert_triggered": false,
    "alert_repeatable": 0
  }
]
```
