# 监管快照

**警告:** 每次创建监管快照都会向账户**收取 0.01 美元(\$0.01 USD)的费用**。**此费用对实盘账户和模拟账户均适用。**

如果您已经付费购买或订阅了特定的 US Network 订阅,则您的账户不会被收费。

有关监管快照和市场数据的更多信息,请参见[此处](https://ibkrcampus.com/general/market-data-subscriptions/regulatory-snapshots)。

发送监管快照请求。\
**每个请求将花费 0.01 美元(\$0.01 USD)**,除非您已订阅相应的交易所直连市场数据。

`GET /md/regsnapshot`

#### 请求对象

###### 查询参数(Query Params)

**conid:** 字符串。必填\
提供要获取市场数据的合约标识符。

#### Python

```python
request_url = f"{baseUrl}/md/regsnapshot?conid=265598"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/md/regsnapshot?conid=265598 \
--request GET
```

#### 响应对象

**注意:** 下方返回的整数字段也对应标准 /iserver/marketdata/snapshot 端点所使用的[市场数据字段(Market Data Field)](https://ibkrcampus.com/general/market-data-subscriptions/regulatory-snapshots)值。

**conid:** int。\
返回该请求的合约 ID。

**conidEx:** 字符串。\
返回该请求类型的合约 ID。

**BboExchange:** 字符串。\
最佳买价/卖价交易所(Best Bid/Offer Exchange)的十六进制颜色代码。

**HasDelayed:** false,\
返回数据是实时(false)还是延迟(true)。

**84:** float。\
返回买价(Bid)值。

**86:** float。\
返回卖价(Ask)值。

**88:** int。\
返回买价数量(Bid size)。

**85:** int。\
返回卖价数量(Ask size)。

**BestBidExch:** int。\
返回当前最佳买价值对应的交易所标识符。\
仅限内部使用。

**BestAskExch:** int。\
返回当前最佳卖价值对应的交易所标识符。\
仅限内部使用。

**31:** float。\
返回最近一次最新成交价(Last)值对应的交易所标识符。\
仅限内部使用。

**7059:** int。\
返回最近一次成交的数量。

**LastExch:** int。\
以二进制整数\*形式返回最后成交(Last)的交易所。\
仅限内部使用。

**7057:** 字符串。\
返回卖价交易所的字符码序列。

**7068:** 字符串。\
返回买价交易所的字符码序列。

**7058:** 字符串。\
返回最新成交价交易所的字符码序列。

```
{
  "conid": conid,
  "conidEx": "conidEx",
  "BboExchange": "BboExchange",
  "HasDelayed": HasDelayed,
  "84": "Bid",
  "86": "Ask",
  "88": Bid_Size,
  "85": Ask_Size,
  "BestBidExch": BestBidExch,
  "BestAskExch": BestAskExch,
  "31": "Last",
  "7059": Last_Size,
  "LastExch": LastExch,
  "7057": "Ask Exch",
  "7068": "Bid Exch",
  "7058": "Last_Exch"
}
```
