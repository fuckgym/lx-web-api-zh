# 市场数据请求

#### 市场数据请求

###### 主题(Topic):

**smd**\
将用户订阅至自选列表市场数据。\
基于 Web API 的 websocket 端点,所有合约品种均可获取流式的、盘口顶档(top-of-the-book)的一级(level one)市场数据。

**重要提示:** 市场数据流将在 15 分钟后终止。用户必须在 10 分钟后重新发送市场数据请求,以继续获取该合约品种的数据。\
**注意:** 市场数据订阅的最大数量取决于您账户的[市场数据线路(Market Data Lines)](/general/market-data-subscriptions/market-data-lines/)。

###### 主题目标(Topic Target):

**conid:** 必填。\
必须传入单个合约标识符。\
请求的合约默认使用 SMART 路由。若要指定交易所,合约标识符应修改为:conId\@EXCHANGE,其中 EXCHANGE 是所请求的数据源。\
组合(Combo)或价差(Spread)市场数据可以使用与[组合或价差订单(Combo or Spread Orders)](/web-api/v1/endpoints/orders/combo-spread-orders)相同的格式获取。唯一区别是必须传入值为 0 的 spread\_conid。

###### 参数(Arguments):

**fields:** 字符串数组。可选。\
传入一个字段 ID 数组。每个 ID 应以字符串形式传入。\
您可以在市场数据字段(Market Data Fields)部分找到字段列表。

```
smd+conId+{
    [
    "fields":"field_1",
    "field_2",
    "field_n", 
    "field_n+1"
    ]
}
```

Interactive Brokers 的自选列表市场数据源自基于时间的快照间隔,该间隔因产品和地区而异。这意味着给定 tick 的更新频率仅取决于其间隔所允许的频率。有关产品细节的更多信息,请参见下表。

| 产品         | 频率    |
| ------------ | --------- |
| 所有产品     | 500ms     |

#### 市场数据响应

**server\_id:** 字符串。\
返回该请求的标识符。

**conidEx:** 字符串。\
返回传入的 conid 字段。如果请求中指定了交易所,则可能包含交易所信息。

**conid:** int。\
返回该请求的合约 ID。

**\_updated:** int\*。\
以 13 位整数形式返回更新的 epoch 时间。

**6119:** 字符串。\
server\_id 的字段值。返回该请求的标识符。

**fields\*:** 字符串。\
为每个请求返回一条响应。某些字段可能不如其他字段那样 readily available。更多详情请参见[市场数据(Market Data)](/web-api/v1/endpoints/market-data/market-data-fields)部分。

**6509:** 字符串。\
返回一个多字符值,表示市场数据可用性(Market Data Availability)。

**topic:** 字符串。\
重申请求的主题。

```
{
    "server_id":"server_id",
    "conidEx":"conidEx",
    "conid":conid,"
    _updated":_updated,
    "6119":"serverId",
    "field_1":field_1,
    "field_2":field_2,
    "field_n":field_n, 
    "field_n+1":field_n+1,
    "6509":"RB",
    "topic":"smd+conid"
}
```
