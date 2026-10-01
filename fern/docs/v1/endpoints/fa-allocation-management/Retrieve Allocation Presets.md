# 获取分配预设

检索分配组在特定事件下的预设行为。

`GET /iserver/account/allocation/presets`

#### 请求对象

不应发送任何参数或请求体内容。

#### Python

```python
request_url = f"{baseUrl}/iserver/marketdata/unsubscribeall"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/allocation/presets \
--request GET
```

#### 响应对象

group\_auto\_close\_positions: bool。

default\_method\_for\_all: String。

profiles\_auto\_close\_positions: bool。

strict\_credit\_check: bool。

group\_proportional\_allocation: bool。

```
{
  "group_auto_close_positions": false,
  "default_method_for_all": "N",
  "profiles_auto_close_positions": false,
  "strict_credit_check": false,
  "group_proportional_allocation": false
}
```
