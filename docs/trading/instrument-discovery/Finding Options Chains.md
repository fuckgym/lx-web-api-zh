# 查找期权链

我们将以股票期权为例来查找 `conids`。

##### 第 1 步：获取标的 Conid 与合约月份

首先，我们需要获取标的股票的 conid。

GET [https://api.ibkr.com/v1/api/iserver/secdef/search?symbol=AAPL\&secType=STK](https://api.ibkr.com/v1/api/iserver/secdef/search?symbol=AAPL\&secType=STK)
200 OK

```[
  {
    "conid": "265598",
    "companyHeader": "APPLE INC - NASDAQ",
    "companyName": "APPLE INC",
    "symbol": "AAPL",
    "description": "NASDAQ",
    "restricted": null,
    "sections": [
      { "secType": "STK" },
      {
        "secType": "OPT",
        "months": "OCT24;NOV24;...;JAN27",
        "exchange": "SMART;AM...SAPPHIRE"
      },
      ...
    ]
  },
  ...
]
```

我们收到了不止一个匹配结果，因此需要筛选出所需的 AAPL（在美国以 USD 交易）股票记录。

从该响应中我们应获取两个值：

1. AAPL 的 `conid`（`"conid": "265598"`）
2. 在 `"secType": "OPT"` 部分中，以分号分隔的期权合约月份列表（`"months": "OCT24;NOV24;...;JAN27"`）

##### 第 2 步：获取有效的行权价

接下来，我们需要查询有效的行权价。

GET [https://api.ibkr.com/v1/api/iserver/secdef/strikes?conid=265598\&exchange=SMART\&sectype=OPT\&month=OCT24](https://api.ibkr.com/v1/api/iserver/secdef/strikes?conid=265598\&exchange=SMART\&sectype=OPT\&month=OCT24)
200 OK

```{
  "call": [ ..., 212.5, 215.0, 217.5, 220.0, 222.5, 225.0, 227.5, ... ],
  "put": [ ..., 212.5, 215.0, 217.5, 220.0, 222.5, 225.0, 227.5, ... ]
}
```

由于看涨与看跌的行权价可能不同，系统始终会分别为 Call 和 Put 返回独立的列表。

##### 第 3 步：获取期权合约的 Conid

最后，我们将进行一系列查询，以获取可交易期权合约的记录。

要获取所有可能的 `conids`，我们必须针对每个"合约月份 + 行权价"组合各发起一次请求。请注意，某个行权价在给定合约月份内可能没有可交易的期权，此时响应将为空。

请注意，下面我们收到了四条期权合约记录，因为十月份存在两个到期日。

GET [https://api.ibkr.com/v1/api/iserver/secdef/info?conid=265598\&exchange=SMART\&sectype=OPT\&month=OCT24\&strike=217.5](https://api.ibkr.com/v1/api/iserver/secdef/info?conid=265598\&exchange=SMART\&sectype=OPT\&month=OCT24\&strike=217.5)
200 OK

```[
  {
    "conid": 730679583,
    "symbol": "AAPL",
    "secType": "OPT",
    "exchange": "SMART",
    "listingExchange": null,
    "right": "C",
    "strike": 217.5,
    "currency": "USD",
    "cusip": null,
    "coupon": "No Coupon",
    "desc1": "AAPL",
    "desc2": "OCT 18 '24 217.5 Call",
    "maturityDate": "20241018",
    "multiplier": "100",
    "tradingClass": "AAPL",
    "validExchanges": "SMART,AM...SAPPHIRE",
    "showPrips": true
  },
  {
    "conid": 730679981,
    "symbol": "AAPL",
    "secType": "OPT",
    "exchange": "SMART",
    "listingExchange": null,
    "right": "P",
    "strike": 217.5,
    "currency": "USD",
    "cusip": null,
    "coupon": "No Coupon",
    "desc1": "AAPL",
    "desc2": "OCT 18 '24 217.5 Put",
    "maturityDate": "20241018",
    "multiplier": "100",
    "tradingClass": "AAPL",
    "validExchanges": "SMART,AM...SAPPHIRE",
    "showPrips": true
  },
  {
    "conid": 733773440,
    "symbol": "AAPL",
    "secType": "OPT",
    "exchange": "SMART",
    "listingExchange": null,
    "right": "C",
    "strike": 217.5,
    "currency": "USD",
    "cusip": null,
    "coupon": "No Coupon",
    "desc1": "AAPL",
    "desc2": "OCT 25 '24 217.5 Call",
    "maturityDate": "20241025",
    "multiplier": "100",
    "tradingClass": "AAPL",
    "validExchanges": "SMART,AM...SAPPHIRE",
    "showPrips": true
  },
  {
    "conid": 733773853,
    "symbol": "AAPL",
    "secType": "OPT",
    "exchange": "SMART",
    "listingExchange": null,
    "right": "P",
    "strike": 217.5,
    "currency": "USD",
    "cusip": null,
    "coupon": "No Coupon",
    "desc1": "AAPL",
    "desc2": "OCT 25 '24 217.5 Put",
    "maturityDate": "20241025",
    "multiplier": "100",
    "tradingClass": "AAPL",
    "validExchanges": "SMART,AM...SAPPHIRE",
    "showPrips": true
  }
]
```
