# 货币对

获取与给定目标货币对应的可用货币对。

`GET /iserver/currency/pairs`

#### 请求对象

###### 查询参数

**currency:** String。必填\
指定您希望获取其官方货币对的目标货币。\
有效结构:"USD"

#### Python

```python
request_url = f"{baseUrl}/iserver/currency/pairs?currency=USD"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/currency/pairs?currency=USD \
--request GET
```

#### 响应对象

**\{\{currency}}:** 对象列表。\
\[\{\
**symbol:** String。\
给定货币对的官方代码。

**conid:** int。\
给定货币对的官方合约标识符。

**ccyPair:** String。\
返回该货币对的对应方货币。\
}]

```
{
  "USD": [
    {
      "symbol": "USD.SGD",
      "conid": 37928772,
      "ccyPair": "SGD"
    },
	{...},
    {
      "symbol": "USD.RUB",
      "conid": 28454968,
      "ccyPair": "RUB"
    }
  ]
}
```
