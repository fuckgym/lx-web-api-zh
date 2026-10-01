# 盘口顶档快照

盘口顶档快照提供最新的市场数据值,其数据来源与 Trader Workstation 自选列表中所显示的流数据相同。

##### **所需值:**

* 目标合约的合约 ID("conid")
* 目标数据点的标签标识符("fields")

向 `/iserver/marketdata/snapshot` \[ref\] 端点发送 `GET` 请求,即可获取一个或多个合约的盘口顶档市场数据快照。该端点接受两个必需的查询参数:

* `conids`:以逗号分隔的合约 conid 列表
* `fields`:以逗号分隔的字段标签列表。可用标签的完整列表可在我们的参考资料(Reference)中找到。

为了使所需数据能够按请求提供快照,必须先向 IServer 发送一个"预检(pre-flight)"请求,以开始其对该合约实时数据流的消费。

这个初始请求不会返回任何数据,而是使该数据流可供后续的快照请求使用。快照市场数据不会被缓存,而是直接从这些已打开的数据流中提取。

此预检请求应在其 `fields` 参数中包含未来所需的全部标签:

`GET https://api.ibkr.com/v1/api/iserver/marketdata/snapshot?conids=265598,8314&fields=31,7059,84,88,86,85`

如果这是您第一次对 `conids` 265598 和 8314 发起 `/iserver/marketdata/snapshot` 请求,响应中将不会包含数据。相反,您会看到所请求的 `conids` 被返回,表示 IServer 现在正在为这些合约品种流式传输数据。

```[
  {
    "conid": 265598,
    "conidEx": "265598"
  },
  {
    "conid": 8314,
    "conidEx": "8314"
  }
]
```

一旦对某个 `conid` 发出了预检请求,所有后续响应都会包含全部所请求的 `fields`;后续的快照请求无需重复传入所需的 `fields`:

GET [https://api.ibkr.com/v1/api/iserver/marketdata/snapshot?conids=265598,8314](https://api.ibkr.com/v1/api/iserver/marketdata/snapshot?conids=265598,8314)

返回:

```[
  {
    "31": "168.42",
    "6119": "q1",
    "6509": "RpB",
    "7059": "100",
    "84": "168.41",
    "85": "600",
    "86": "168.42",
    "88": "1,300",
    "_updated": 1712596911593,
    "conid": 265598,
    "conidEx": "265598",
    "server_id": "q1"
  },
  {
    "31": "189.60",
    "6119": "q2",
    "6509": "RpB",
    "7059": "100",
    "84": "189.56",
    "85": "500",
    "86": "189.61",
    "88": "200",
    "_updated": 1712596911593,
    "conid": 8314,
    "conidEx": "8314",
    "server_id": "q2"
  }
]
```

某些更新频率较低的 `fields`,特别是那些按间隔计算的字段,可能不会立即返回,而是在更新时才返回。
