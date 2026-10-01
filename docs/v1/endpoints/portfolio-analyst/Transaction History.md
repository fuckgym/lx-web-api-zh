# 交易历史

针对给定的一组 conids 和账户的交易历史。\
交易类型包括股息支付、买入和卖出交易、划转。

`POST /pa/transactions`

#### 请求对象

###### 请求体参数

**acctIds:** 字符串数组。必填\
包含每个要获取数据的账户 ID。

**conids:** 整数数组。必填\
包含要获取数据的合约 ID。\
一次仅支持一个合约 ID。

**currency:** String。必填\
定义显示价格金额所用的货币。\
默认为 USD。

**days:** String。可选\
指定要获取多少天的交易数据。\
若未指定，默认为 90 天的交易历史。

#### Python

```python
request_url = f"{baseUrl}/pa/transactions"
json_content = {
  "acctIds": [
    "U1234567"
  ],
  "conids": [
    265598
  ],
  "currency": "USD",
  "days": 3
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/pa/transactions\
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "acctIds": [
    "U1234567"
  ],
  "conids": [
    265598
  ],
  "currency": "USD",
  "days": 3
}'
```

#### 响应对象

**rc:** int。\
（仅 Client Portal 使用）

**nd:** int。\
（仅 Client Portal 使用）

**rpnl:** Object。\
返回包含该合约在指定日期的已实现盈亏（realized pnl）的对象。

**data:** 对象数组。\
返回已实现盈亏对象组成的数组。

**date:** String。\
指定交易发生的日期。

**cur:** String。\
指定已实现金额的货币。

**fxRate:** int。\
返回外汇汇率。

**side:** String。\
表明当天是亏损还是盈利\
值格式："L"、"G"

**acctid:** String。\
返回发生交易的账户 ID。

**amt:** String。\
返回当天盈利或亏损的金额。

**conid:** String。\
返回该交易的合约 ID。

**amt:** String。\
提供返回的所有日期合计的盈利或亏损总金额。

**currency:** String。\
返回账户交易所用的货币。

**from:** int。\
返回请求起始时间的 epoch 时间。

**id:** String。\
返回请求标识符 getTransactions。

**to:** int。\
返回请求结束时间的 epoch 时间。

**includesRealTime:** bool。\
返回交易数据是否为最新。

**transactions:** 对象数组。\
列出所有受支持的交易值。

**date:** String。\
返回交易的人类可读日期时间。\
值格式："\{星期几} \{三位月份缩写} \{月内日期} 00:00:00 \{时区} \{年份}"

**cur:** String。\
返回所交易合约品种的货币。

**fxRate:** int。\
返回外汇折算汇率。

**pr:** float。\
返回该交易每股的价格。

**qty:** int。\
返回交易的总数量。\
卖出订单显示负值，买入订单显示正值。

**acctid:** String。\
返回进行交易的账户。

**amt:** float。\
返回该交易的总价值。

**conid:** int。\
返回合约标识符。

**type:** String。\
返回订单方向。

**desc:** String。\
返回公司的长名称。

```
{
  "rc": 0,
  "nd": 4,
  "rpnl": {
    "data": [
      {
        "date": "20231211",
        "cur": "USD",
        "fxRate": 1,
        "side": "L",
        "acctid": "U1234567",
        "amt": "12.2516",
        "conid": "265598"
      }
    ],
    "amt": "12.2516"
  },
  "currency": "USD",
  "from": 1702270800000,
  "id": "getTransactions",
  "to": 1702530000000,
  "includesRealTime": true,
  "transactions": [
    {
      "date": "Mon Dec 11 00:00:00 EST 2023",
      "cur": "USD",
      "fxRate": 1,
      "pr": 192.26,
      "qty": -5,
      "acctid": "U1234567",
      "amt": 961.3,
      "conid": 265598,
      "type": "Sell",
      "desc": "Apple Inc"
    }
  ]
}
```
