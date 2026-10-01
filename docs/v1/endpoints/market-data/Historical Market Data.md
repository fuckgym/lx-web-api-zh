# 历史市场数据

获取给定 conid 的历史市场数据,数据长度由 'period' 和 'bar' 控制。

**注意**:

* 每秒最多 10 次请求,每分钟最多 50 次请求。过量的请求将返回 'Too many requests' 状态 429 响应。
* 此端点最多提供 1000 个数据点。

#### Abap

```abap
GET /iserver/marketdata/history
```

#### Python

```python
request_url = f"{baseUrl}/iserver/marketdata/history?conid=265598&exchange=SMART&period=1d&bar=1d&startTime=20230821-13:30:00&outsideRth=true&source=Midpoint"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/marketdata/history?conid=265598&exchange=SMART&period=1d&bar=1h&startTime=20230821-13:30:00&outsideRth=true \ 
--request GET
```

#### 步长

步长是指任一给定周期所允许的最小和最大 K 线大小。

|             |      |           |           |            |         |         |         |         |         |         |         |
| ----------- | ---- | --------- | --------- | ---------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| period      | 1min | 1h        | 1d        | 1w         | 1m      | 3m      | 6m      | 1y      | 2y      | 3y      | 15y     |
| bar         | 1min | 1min – 8h | 1min – 8h | 10min – 1w | 1h – 1m | 2h – 1m | 4h – 1m | 8h – 1m | 1d – 1m | 1d – 1m | 1w – 1m |
| 默认 K 线 | 1min | 1min      | 1min      | 15min      | 30min   | 1d      | 1d      | 1d      | 1d      | 1w      | 1w      |

#### 响应对象

**serverId:** String。\
内部请求标识符。

**symbol:** String。\
返回合约的股票代码。

**text:** String。\
返回股票代码的完整名称。

**priceFactor:** String。\
返回根据显示规则得到的价格增量。

**startTime:** String。\
返回历史数据请求的起始时间。\
以 UTC 格式返回,格式为 YYYYMMDD-HH:mm:ss

**high:** String。\
返回该时间序列内的最高值,格式为 %h/%v/%t。\
%h 为最高价(按 priceFactor 缩放),\
%v 为成交量(成交量因子始终为 100(报告成交量 = 实际成交量/100))\
%t 为距图表开始时间的分钟数

**low:** String。\
返回该时间序列内的最低值,格式为 %l/%v/%t。\
%l 为最低价(按 priceFactor 缩放),\
%v 为成交量(成交量因子始终为 100(报告成交量 = 实际成交量/100))\
%t 为距图表开始时间的分钟数

**timePeriod:** String。\
返回历史数据请求的时长。

**barLength:** int。\
返回一根 K 线所含的秒数。

**mdAvailability:** String。\
返回市场数据可用性(Market Data Availability)。\
详情参见市场数据可用性部分。

**mktDataDelay:** int。\
返回处理历史数据请求的延迟时间(毫秒)。

**outsideRth:** bool。\
定义返回的市场数据是否处于常规交易时间内。

**volumeFactor:** int。\
返回成交量所乘的因子。

**priceDisplayRule:** int。\
表示所使用的价格显示规则。\
仅供内部使用。

**priceDisplayValue:** String。\
表示所使用的价格显示规则。\
仅供内部使用。

**negativeCapable:** bool。\
返回数据是否可以返回负值。

**messageVersion:** int。\
仅供内部使用。

**data:** 对象数组。\
返回所请求周期的所有历史 K 线。\
\[\{\
**o:** float。\
返回 K 线的开盘价。

**c:** float。\
返回 K 线的收盘价。

**h:** float。\
返回 K 线的最高价。

**l:** float。\
返回 K 线的最低价。

**v:** float。\
返回 K 线的成交量。

**t**: int。\
返回该 K 线的运营商时区 Epoch Unix 时间戳。\
}],

**points:** int。\
返回 K 线中数据点的总数。

**travelTime:** int。\
返回返回详细信息所耗费的时间。

```
{
  "serverId": "20477",
  "symbol": "AAPL",
  "text": "APPLE INC",
  "priceFactor": 100,
  "startTime": "20230818-08:00:00",
  "high": "17510/472117.45/0",
  "low": "17170/472117.45/0",
  "timePeriod": "1d",
  "barLength": 86400,
  "mdAvailability": "S",
  "mktDataDelay": 0,
  "outsideRth": true,
  "tradingDayDuration": 1440,
  "volumeFactor": 1,
  "priceDisplayRule": 1,
  "priceDisplayValue": "2",
  "chartPanStartTime": "20230821-13:30:00",
  "direction": -1,
  "negativeCapable": false,
  "messageVersion": 2,
  "data": [
    {
      "o": 173.4,
      "c": 174.7,
      "h": 175.1,
      "l": 171.7,
      "v": 472117.45,
      "t": 16923456000
    }
  ],
  "points": 0,
  "travelTime": 48
}
```

#### 500 系统错误

**error:**  String。

```
{
  'error': 'description'
}
```

#### 429 请求过多

**error:**  String。

```
{
  'error': 'description'
}
```
