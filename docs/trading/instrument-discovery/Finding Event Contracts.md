# 查找事件合约（Finding Event Contracts）

Interactive Brokers 将事件合约（Event Contract）工具建模为期权（针对 ForecastEx 产品）和期货期权（针对 CME Group 产品）。因此，在 Web API 中，事件合约通常可以被视为期权类产品，大多数现有功能和工作流程无需修改即可服务于这些工具。本指南将经常以常规指数期权作类比来说明 ForecastEx 和 CME Group 产品。

IB 的事件合约工具记录使用以下从期权模型继承的字段：

* 一个标的参考指数，可能是人为构造的，也可能不是：
  * 对于 CME 产品，可交易的事件合约将以相关的 CME 指数作为其标的。
  * 对于 ForecastEx 产品，IB 生成一个人为构造的标的指数，作为同一产品类别中相关事件合约的容器。这些人为指数没有任何关联的参考值，纯粹是用于表示这些事件合约的期权工具模型所产生的产物。不过，这些人为标的指数可以用于搜索成组的相关事件合约，就像指数期权一样。
* 一个 Symbol 值，与标的指数的代码相匹配，反映发行方对该工具的产品代码，并指向该标的指数
* 一个 Trading Class，反映发行方对该工具的产品代码，并作为一组相关事件合约的人类可读标识符。
  * 请注意，许多针对 CME Group 指数结算的 CME Group 事件合约，其产品代码以 "EC" 为前缀并后接相关交易所的代码，以避免与同一指数上的其他衍生品命名冲突。
* 一个看跌（Put）或看涨（Call）的 "Right"（权利方向）值，其中 Call = Yes、Put = No。
  * 请注意，事件合约不允许卖出（Sell）订单。持仓应通过买入相反方向的合约来平仓或减少。
* 一个人为构造的 "Contract Month"（合约月份）值，同样主要用于搜索和筛选可用工具。大多数事件合约产品并不像指数期权或股票期权那样按月度序列排列，因此这些 Contract Month 值通常并非该工具有意义的属性，而是用于按日历月份筛选工具。
* 最后交易日（Last Trade Date）、时间和毫秒值，它们共同精确指示事件合约的交易将于何时终止，与指数期权一样。
* 一个行权价（Strike）值，即事件结算所依据的数值。虽然是数值，但它不一定代表价格。
* 形如 "\[PRODUCT CODE\] \[EXPIRATION DATE\] \[STRIKE\] \[RIGHT]" 的工具代码（symbol），其中：
  * PRODUCT CODE 是发行方的产品标识符
  * EXPIRATION DATE 是该工具结算（到期）的日期，格式为 MmmDD'YY，例如 "Sep26'24"
  * STRIKE 是决定合约在到期时价值状态（moneyness）的数值
  * RIGHT 的值为 YES 或 NO

同样，事件合约的标的指数拥有自己的 conid，且永久有效。一旦获取了这些标的 conid，就可以用它们来检索该产品类别中当前可交易的事件合约集合。

Web API 现有的衍生品发现工作流程可用于查找 CME Group 和 ForecastEx 提供的事件合约，但由于两者的产品分别被建模为期货期权和（指数）期权，每个发行方的工作流程略有不同。

在这两种情况下，工具发现都从选择感兴趣的产品代码开始。

事件合约产品代码可以从 IB 的 ForecastTrader 获取，也可以直接从交易所网站获取：

IB ForecastTrader：[https://forecasttrader.interactivebrokers.com/eventtrader/#/markets](https://forecasttrader.interactivebrokers.com/eventtrader/#/markets)

CME Group：[https://www.cmegroup.com/activetrader/event-contracts.html](https://www.cmegroup.com/activetrader/event-contracts.html)

ForecastEx：[https://forecastex.com/markets/](https://forecastex.com/markets/)

#### CME Group 发现工作流程

请注意，CME Group 的事件合约产品挂牌于其标的指数所在的 CME 交易场所。例如，与黄金收盘价相关的事件合约挂牌于 COMEX，而与 NQ 相关的事件合约挂牌于 CME。

假设我们想查找 CME 的 NQ 事件合约。

##### CME 请求 1：获取指数 Conid 与合约月份

首先，我们需要获取标的 NQ 指数的 conid。该指数 conid 可以存储起来，对于特定的事件合约产品代码，此查询无需执行多次。所获取的 conid 以后可以在需要时重复使用，以获取可交易的事件合约。

GET [https://api.ibkr.com/v1/api/iserver/secdef/search?symbol=NQ\&secType=IND](https://api.ibkr.com/v1/api/iserver/secdef/search?symbol=NQ\&secType=IND)
200 OK

```[
  {
    "conid": "11004958",
    "companyName": "E-mini NASDAQ 100 ",
    "symbol": "NQ",
    "description": "CME",
    ...,
    "sections": [
      { "secType": "IND", "exchange": "CME;" },
      ...,
      {
        "secType": "FOP",
        "months": "AUG24;SEP24;OCT24;NOV24;DEC24;MAR25;JUN25;DEC25;DEC26;DEC27;DEC28",
        "exchange": "CME"
      },
      ...,
      { "secType": "EC" }
    ]
  }
]
```

响应将返回与所提供代码和工具类型匹配的工具记录，结果可能不唯一。您需要在返回的列表中筛选出目标指数记录。这可以通过查看 "sections" 字段中的 JSON 对象数组来完成，其中应包含（除其他对象外）三个对象：一个反映正确交易所上的指数（"secType":"IND" 与 "exchange":"CME"），另一个反映该指数的期货期权（"secType":"FOP"），最后一个对象表明该指数上存在事件合约产品（"secType":"EC"）。这确认我们已找到所需的 NQ 指数记录。

从此响应中我们应获取两个新值：

1. 该指数的 conid（"conid":"11004958"）
2. 来自 "FOP" 对象的、以分号分隔的期货期权合约月份列表（"months":"AUG24;SEP24;OCT24;NOV24;DEC24;MAR25;JUN25;DEC25;DEC26;DEC27;DEC28"）

请注意，此响应还会返回与衍生品产品相关的值，上面已将其省略，就本工作流程而言可以忽略。

##### CME 请求 2：获取事件合约 Conid

接下来，我们将使用第一个请求中新获取的值来搜索可交易事件合约工具的记录。

此步骤将包含一系列请求，逐一遍历通过第一个请求获得的合约月份值。

重要的是，此查询将同时返回期货期权本身和事件合约的记录，因此我们需要对响应进行筛选。

以下查询接受四个参数：

1. 标的指数的 conid（NQ 为 conid=11004958）
2. 交易所名称（exchange=CME）
3. 我们所寻找工具的证券类型（sectype=FOP，请记住 CME 事件合约被建模为期货期权）
4. 感兴趣的合约月份，用于限制查询范围

最后一个参数——合约月份——继承自期货期权模型，其有效值在第一个请求中获取。但请注意，该合约月份列表同时由期货期权本身和事件合约共用，因此一些较远期的合约月份值可能不会返回任何可交易的事件合约工具，而只会获取到真正的期货期权。

GET [https://api.ibkr.com/v1/api/iserver/secdef/info?conid=11004958\&exchange=CME\&sectype=FOP\&month=AUG24](https://api.ibkr.com/v1/api/iserver/secdef/info?conid=11004958\&exchange=CME\&sectype=FOP\&month=AUG24)
200 OK

```[
  {
    "conid": 722021819,
    "symbol": "NQ",
    "secType": "FOP",
    "exchange": "CME",
    "listingExchange": null,
    "right": "P",
    "strike": 18200.0,
    "currency": "USD",
    "cusip": null,
    "coupon": "No Coupon",
    "desc1": "NQ",
    "desc2": "(Q4A) Aug26'24 18200 Put Fut.Option(20) @CME",
    "maturityDate": "20240826",
    "multiplier": "20",
    "tradingClass": "Q4A",
    "validExchanges": "CME"
  },
  ...,
  {
    "conid": 724307144,
    "symbol": "NQ",
    "secType": "FOP",
    "exchange": "CME",
    "listingExchange": null,
    "right": "P",
    "strike": 19800.0,
    "currency": "USD",
    "cusip": null,
    "coupon": "No Coupon",
    "desc1": "NQ",
    "desc2": "(ECNQ) Aug20'24 19800 Put Fut.Option @CME",
    "maturityDate": "20240820",
    "multiplier": "1",
    "tradingClass": "ECNQ",
    "validExchanges": "CME"
  },
  ...
]
```

响应可能会非常大，同时包含期货期权和事件合约。上面的示例经过删减，仅展示一个期货期权示例和一个事件合约示例。

对于 CME 事件合约产品，我们可以使用上面讨论过的 "EC" 前缀，通过 Trading Class 识别事件合约工具，并从该响应中过滤掉期货期权。

由于我们要查找的是 NQ 事件合约，我们将筛选出 "tradingClass":"ECNQ" 的记录，从而获得 2024 年 8 月的 NQ 事件合约记录集合。现在我们可以获取它们的 conid 及其他相关属性，然后继续针对下一个合约月份 SEP24 发起请求，并按需对任意多个月份重复此过程。

#### ForecastEx 发现工作流程

假设我们想查找 ForecastEx 的 "US Fed Funds Target Rate"（FF）事件合约。

##### ForecastEx 请求 1：获取指数 Conid 与合约月份

首先，我们需要获取人为构造的 FF 标的指数的 conid。

GET [https://api.ibkr.com/v1/api/iserver/secdef/search?symbol=FF](https://api.ibkr.com/v1/api/iserver/secdef/search?symbol=FF)
200 OK

```[
  {
    "conid": "658663572",
    "companyHeader": "US Fed Funds Target Rate - FORECASTX",
    "companyName": "US Fed Funds Target Rate",
    "symbol": "FF",
    "description": "FORECASTX",
    "restricted": null,
    "sections": [
      { "secType": "IND", "exchange": "FORECASTX;" },
      { "secType": "EC" }
    ]
  },
  ...
]
```

请注意，我们收到了不止一个匹配结果，需要筛选出所需的 ForecastEx FF 指数记录。

从此响应中我们应获取两个新值：

1. FF 指数的 conid（"conid":"658663572"）
2. 以分号分隔的期权到期日列表（"opt": "20240917;20241106;..."）

在继续之前，我们必须将到期日期转换为 MMMYY 格式，因为后续请求将使用这种表示形式。例如，"20240917" 变为 "SEP24"。

##### ForecastEx 请求 2：获取有效行权价值

接下来，我们需要查询有效的行权价值。

GET [https://api.ibkr.com/v1/api/iserver/secdef/strikes?conid=658663572\&exchange=FORECASTX\&sectype=OPT\&month=SEP24](https://api.ibkr.com/v1/api/iserver/secdef/strikes?conid=658663572\&exchange=FORECASTX\&sectype=OPT\&month=SEP24)
200 OK

```{
  "call": [ 3.125, 4.875, 5.125, 5.375 ],
  "put": [ 3.125, 4.875, 5.125, 5.375 ]
}
```

尽管会分别为看涨（Yes 合约）和看跌（No 合约）返回单独的列表，但我们无需将它们区别对待。所有事件在所有行权价位上都有匹配的 Yes 和 No 合约。因此，我们得到有效行权价（strikesvalues）列表：3.125, 4.875, 5.125, 5.375

##### ForecastEx 请求 3：获取事件合约 Conid

最后，我们将发起一系列查询，以获取可交易事件合约工具的记录。

为获得所有可能的 conid，我们必须针对每个合约月份与行权价值的组合各发起一次请求。请注意，某个给定的行权价值在某个给定的合约月份可能没有可交易的事件合约，此时响应将为空。

每个请求返回一对工具记录：一个看涨（Yes）合约记录和一个看跌（No）合约记录。

GET [https://api.ibkr.com/v1/api/iserver/secdef/info?conid=658663572\&exchange=FORECASTX\&sectype=OPT\&month=SEP24\&strike=3.125](https://api.ibkr.com/v1/api/iserver/secdef/info?conid=658663572\&exchange=FORECASTX\&sectype=OPT\&month=SEP24\&strike=3.125)
200 OK

```[
  {
    "conid": 713921696,
    "symbol": "FF",
    "secType": "OPT",
    "exchange": "FORECASTX",
    "listingExchange": null,
    "right": "C",
    "strike": 3.125,
    "currency": "USD",
    "cusip": null,
    "coupon": "No Coupon",
    "desc1": "FF",
    "desc2": "SEP 17 '24 3.13 Call @FORECASTX (AM)",
    "maturityDate": "20240917",
    "multiplier": "1",
    "tradingClass": "FF",
    "validExchanges": "FORECASTX"
  },
  {
    "conid": 713921701,
    "symbol": "FF",
    "secType": "OPT",
    "exchange": "FORECASTX",
    "listingExchange": null,
    "right": "P",
    "strike": 3.125,
    "currency": "USD",
    "cusip": null,
    "coupon": "No Coupon",
    "desc1": "FF",
    "desc2": "SEP 17 '24 3.13 Put @FORECASTX (AM)",
    "maturityDate": "20240917",
    "multiplier": "1",
    "tradingClass": "FF",
    "validExchanges": "FORECASTX"
  }
]
```
