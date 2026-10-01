# 查找衍生品

上面两个示例返回的品种都被衍生品所引用,不过为了简便,这些端点有意省略了这些结果。

然而,如果我们想找到那些衍生品,可以从一个更通用的端点入手,它用于识别标的(underlier)与其衍生品之间的关系:

`GET /iserver/secdef/search`

请考虑以下用于查找 ES 期货期权的示例工作流。

#### 第 1 步,获取指数 conid 与合约月份

首先,我们需要获取标的 ES 指数的 `conid`。该指数 `conid` 可以保存下来,日后在需要获取衍生品时重复使用。

`GET https://api.ibkr.com/v1/api/iserver/secdef/search?symbol=ES&secType=FUT`

```[
  {
    "conid": "11004968",
    "companyHeader": "E-mini S&P 500 - CME",
    "companyName": "E-mini S&P 500",
    "symbol": "ES",
    "description": "CME",
    "restricted": null,
    "sections": [
      { "secType": "IND", "exchange": "CME;" },
      {
        "secType": "FUT",
        "months": "DEC24;MA...29;DEC29",
        "exchange": "CME",
        "showPrips": true
      },
      {
        "secType": "FOP",
        "months": "OCT24;NO...27;DEC28",
        "exchange": "CME",
        "showPrips": true
      },
      ...
    ]
  },
  ...
]
```

从此响应中,我们应获取以下值:

1. 指数的 conid("conid":"11004958")
2. 从 "FOP" 对象中,获取以分号分隔的期货期权合约月份列表("months":"DEC24;MAR25;JUN25;DEC25;DEC26;DEC27;DEC28")
3. 指数的交易所 "CME"

#### 第 2 步,获取期货期权的 conid

接下来,我们收集以下参数。

1. 标的指数的 `Conid`(ES 为 `conid=11004968`)
2. 交易所名称(`exchange=CME`)
3. 我们要查找的品种的证券类型(`sectype=FOP`,请注意 CME 事件合约被建模为期货期权)
4. 所关注的合约月份,用于限定查询范围

然后发起以下请求,以获取 DEC24 合约月份 ES 期货期权的品种记录(包括 `conids`):

`GET /iserver/secdef/info?conid=11004968&exchange=CME&sectype=FOP&month=DEC24`

```[
  {
    "conid": 732160324,
    "symbol": "ES",
    "secType": "FOP",
    "exchange": "CME",
    "listingExchange": null,
    "right": "C",
    "strike": 4975.0,
    "currency": "USD",
    "cusip": null,
    "coupon": "No Coupon",
    "desc1": "ES",
    "desc2": "(EW) Dec31'24 4975 Call Fut.Option(50) @CME",
    "maturityDate": "20241231",
    "multiplier": "50",
    "tradingClass": "EW",
    "validExchanges": "CME",
    "showPrips": true
  },
  {
    "conid": 732160331,
    "symbol": "ES",
    "secType": "FOP",
    "exchange": "CME",
    "listingExchange": null,
    "right": "P",
    "strike": 5875.0,
    "currency": "USD",
    "cusip": null,
    "coupon": "No Coupon",
    "desc1": "ES",
    "desc2": "(EW) Dec31'24 5875 Put Fut.Option(50) @CME",
    "maturityDate": "20241231",
    "multiplier": "50",
    "tradingClass": "EW",
    "validExchanges": "CME",
    "showPrips": true
  },
  ...
]
```
