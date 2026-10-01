# 投资组合摘要

有关账户基础货币中的已结算资金、现金余额等信息,以及以其他货币持有的现金余额。在调用此端点之前,必须先调用 /portfolio/accounts 或 /portfolio/subaccounts。受支持货币的列表可在 [https://www.interactivebrokers.com/en/index.php?f=3185](https://www.interactivebrokers.com/en/index.php?f=3185) 查看。

`GET /portfolio/{accountId}/summary`

#### 请求对象

###### 路径参数(Path Params)

**accountId:** 字符串。必填\
指定您需要其账簿(ledger)信息的账户 ID。

#### Python

```python
request_url = f"{baseUrl}/portfolio/U1234567/summary"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/portfolio/U1234567/summary \
--request GET
```

#### 响应对象

/summary 端点返回一个"键: 值(Key: Value)"对象结构。它总共返回 45 到 135 个用于汇总账户信息的唯一值。

响应会以基础值形式返回,其中包含所有返回细节的汇总,其后跟着相同的响应名称并带有后缀 "-c" 或 "-s"。"-c" 表示该账户持有的商品(commodity)数值,而 "-s" 表示该账户持有的所有证券(security)数值。

**\{object key}:** 对象。\
该键指示返回的是什么数据。可能包括账户信息、余额信息,或指定的其他相关投资组合细节。

**amount:** float。\
返回与该键相关的价格数值。\
如果不需要价格数值,可能返回 null。

**currency:** 字符串。\
返回构建响应所使用的基础货币。

**isNull:** bool。\
返回该值是否不可用。

**timestamp:** int。\
以 epoch 时间形式返回数据获取的时间。

**value:** 字符串。\
返回关于给定键的字符串细节。\
如果不需要字符串值,可能返回 null。

**severity:** int。\
仅限内部使用。

```
{
  "accountcode": {
    "amount": 0.0,
    "currency": null,
    "isNull": false,
    "timestamp": 1702582422000,
    "value": "U1234567",
    "severity": 0
  },
  {...},
  "indianstockhaircut": {
    "amount": 0.0,
    "currency": "USD",
    "isNone": false,
    "timestamp": 1702582422000,
    "value": null,
    "severity": 0
  }
}
```
