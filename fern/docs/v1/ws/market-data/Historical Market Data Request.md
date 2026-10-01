# 历史市场数据请求

对于流式历史数据,使用主题 smh+Id。还有以 JSON 格式提供的可选参数。如果未指定任何参数,可以传入空参数数组 \{}。指定有误的参数将被忽略,并返回默认(空)响应。

**注意:** 一次最多只能有 5 个并发的历史数据请求。

**注意:** 历史数据只会响应一次,但客户仍需从该端点取消订阅。

#### 历史数据请求

###### 主题:

**smh**\
将用户订阅至历史 K 线数据。\
借助 Web API 的 websocket 端点,所有品种均可使用流式的、盘口顶层(top-of-the-book)、第一级(level one)的历史数据。

###### 主题目标:

**conids:** 必填。\
必须传入单个合约标识符。\
所请求的合约默认使用 SMART 路由。若要指定交易所,合约标识符应修改为:conId\@EXCHANGE,其中 EXCHANGE 为所请求的数据源。

###### 参数:

**exchange:** String。\
请求接收数据的交易所。

**period:** String。\
请求 K 线的总时长。

**bar:** String。\
接收数据的时间间隔。

**outsideRth:** Bool。\
确定你想要常规交易时间之外的数据(true)还是仅市场时段内的数据(false)。

**source:** String。\
决定显示何种数据类型的值。

**format:** String。\
K 线返回时所采用的格式。

```
smh+conid+{
    "exchange":"exchange",
    "period":"period",
    "bar":"bar",
    "outsideRth":outsideRth,
    "source":"source",
    "format":"format"
}
```

#### 历史数据响应

**serverId:** String。\
该历史数据请求的请求标识符。用于取消数据流。

**symbol:** String。\
返回所请求 conid 的代码。

**text:** String。\
公司完整名称。

**priceFactor:** int。\
价格乘数(基于 \$0.01)

**startTime:** String。\
返回响应的起始时间(epoch 时间)。

**high:** String。\
返回该周期内最高的"最高值/成交量值/常规交易时段外成交量"。

**low:** String。\
返回该周期内最低的"最低值/成交量值/常规交易时段外成交量"。

**timePeriod:** String。\
返回请求覆盖的周期。

**barLength:** int。\
返回 K 线响应的字符串长度。

**mdAvailability:** String。\
IBKR 内部消息。

**mktDataDelay:** int。\
返回市场数据是否存在延迟。

**outsideRth:** Bool。\
返回数据是否包含常规交易时间之外的信息。

**volumeFactor:** int。\
确定成交量是以手数(lots)、乘数还是按原样返回。

**priceDisplayRule:** int。\
IBKR 内部消息。

**priceDisplayValue:** String。\
IBKR 内部消息。

**negativeCapable:** Bool。\
返回合约规则:该合约是否支持负值。

**messageVersion:** int。\
IBKR 内部消息。

**data:** 对象数组。\
返回该周期内所有相关的 K 线。

**o**: float。\
该 K 线时长内的开盘价。

**c**: float。\
该 K 线时长内的收盘价。

**l**: float。\
该 K 线时长内的最低价。

**h**: float。\
该 K 线时长内的最高价。

**v:** int。\
该 K 线的总成交量。

**t:** int。\
该 K 线返回的 epoch 时间。

**points:** int。\
显示 'data' 中返回的 K 线总数。

**topic:** String。\
表示所发送的请求。

```
{
    "serverId": "serverId",
    "symbol": "symbol",
    "text": "text",
    "priceFactor": priceFactor,
    "startTime": "startTime",
    "high": "high",
    "low": "low",
    "timePeriod": "timePeriod",
    "barLength": barLength,
    "mdAvailability": "mdAvailability",
    "mktDataDelay": mktDataDelay,
    "outsideRth": outsideRth,
    "volumeFactor": volumeFactor,
    "priceDisplayRule": priceDisplayRule,
    "priceDisplayValue": "priceDisplayValue",
    "negativeCapable": negativeCapable,
    "messageVersion": messageVersion,
    "data": [data],
    "points": points, 
    "topic": "topic",
}
```

历史市场数据请求接受以下参数:

| 参数                | 描述                               | 有效值                                                                                                     |
| ------------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| exchange: String    | 合约交易所                         | 合约交易的有效交易所                                                                                       |
| period: String      | 请求时长                           | \* \{1-30}min \* \{1-8}h \* \{1-1000}d \* \{1-792}w \* \{1-182}m \* \{1-15}y                               |
| bar: String         | 请求的 K 线大小                    | \* 1min \* 2min \* 3min \* 5min \* 10min \* 15min \* 30min \* 1h \* 2h \* 3h \* 4h \* 8h \* 1d \* 1w \* 1m |
| outsideRTH: Boolean | 请求交易时段之外的数据             | true/false                                                                                                 |
| source: String      | 请求的数据类型                     | \* midpoint \* trades \* bid\_ask \* bid \* ask                                                            |
| format: String      | 返回的历史值                       | \* %o – open \* %c – close \* %h – high \* %l – low \* %v – volume                                         |
