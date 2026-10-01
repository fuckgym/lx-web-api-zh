# 可分配子账户

检索所有子账户的列表,并返回其净清算价值和可用权益,供顾问据此决定应将哪些账户纳入分配以及如何分配。

`GET /iserver/account/allocation/accounts`

#### 请求对象

不应发送任何参数或请求体内容。

#### Python

```python
request_url = f"{baseUrl}/iserver/account/allocation/accounts" 
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/allocation/accounts \
--request GET
```

#### 响应对象

**accounts:** 对象数组。\
包含该顾问持有的所有子账户的数组。\
\[\{\
**data:** 对象数组。\
包含给定账户 ID 的净清算价值(Net Liquidation)和可用权益(Available Equity)。\
\[\{\
**value:** 字符串。\
包含与该键关联的价格值。

**key:** 字符串。\
定义该对象的值。\
预期值:"AvailableEquity"、"NetLiquidation"
}]\
**name:** 字符串。\
返回与余额数据关联的账户 ID。\
}]

```
{
  "accounts": [
    {
      "data": [
        {
          "value": "2677.89",
          "key": "NetLiquidation"
        },
        {
          "value": "2134.76",
          "key": "AvailableEquity"
        }
      ],
      "name": "U123456"
    },
    {
      "data": [
        {
          "value": "1200.88",
          "key": "NetLiquidation"
        },
        {
          "value": "1000.56",
          "key": "AvailableEquity"
        }
      ],
      "name": "U456789"
    }
  ]
}
```
