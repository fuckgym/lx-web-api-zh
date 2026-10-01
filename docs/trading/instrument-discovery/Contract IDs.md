# 合约 ID(Contract IDs)

在我们使用 Web API 与某个金融品种交互之前,必须首先确定其唯一的 `conid`。

我们从按代码(symbol)搜索 IB 的品种数据库开始。有三个端点可用于完成此步骤。这三个端点都会返回其范围内的所有匹配记录。后续的请求可以进一步过滤该结果集。

#### 股票(Equities)

以下端点专门用于将股票代码解析为 `conids`。请注意,它接受以逗号分隔的列表,并相应地返回所有匹配的结果。

`GET /trsrv/stocks?symbols=AAPL`

```{
      "AAPL": [
        {
          "name": "APPLE INC",
          "assetClass": "STK",
          "contracts": [
            {
              "conid": 265598,
              "exchange": "NASDAQ",
              "isUS": true
            },
            {
              "conid": 38708077,
              "exchange": "MEXI",
              "isUS": false
            },
            ...
          ],
          ...
        },
        {
          "name": "LS 1X AAPL",
          "assetClass": "STK",
          "contracts": [
            {
              "conid": 493546048,
              "exchange": "LSEETF",
              "isUS": false
            }
          ],
          ...
        },
        ...
      ]
}
```

*注*:对于在多个市场交易的单一品种,IB 会为品种与货币的每种组合分配不同的 `conids`。例如,在美国以 USD 交易的 AAPL 股票,与以 MXN 交易的同一只 AAPL 股票,其 `conid` 并不相同。在多个市场交易的单一品种,其记录会被归在一起。

#### 期货(Futures)

还有一个类似的端点,可通过代码(symbol)或产品代码定位期货产品:

`GET /trsrv/futures?symbols=ES`

```{
  "ES": [
    {
      "symbol": "ES",
      "conid": 495512557,
      "underlyingConid": 11004968,
      "expirationDate": 20241220,
      "ltd": 20241219,
      "shortFuturesCutOff": 20241219,
      "longFuturesCutOff": 20241219
    },
    {
      "symbol": "ES",
      "conid": 495512563,
      "underlyingConid": 11004968,
      "expirationDate": 20251219,
      "ltd": 20251218,
      "shortFuturesCutOff": 20251218,
      "longFuturesCutOff": 20251218
    },
    ...
  ]
}
```
