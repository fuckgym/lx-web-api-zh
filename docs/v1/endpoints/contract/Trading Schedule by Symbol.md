# 按 Symbol 查询交易时间表

返回所请求合约最长一个月的交易时间表。

`GET /trsrv/secdef/schedule`

#### 请求对象

###### 查询参数

**assetClass:** *String。*必填\
指定给定合约的证券类型。\
值格式:股票(Stock): STK,期权(Option): OPT,期货(Future): FUT,差价合约(Contract For Difference): CFD,权证(Warrant): WAR,外汇(Forex): SWP,共同基金(Mutual Fund): FND,债券(Bond): BND,跨商品价差(Inter-Commodity Spreads): ICS

**conid:** *String。*必填\
提供要获取其交易时间表的合约标识符。

**symbol:** *String。*必填\
指定合约的 symbol(交易代码)。

**exchange:** *String。*\
指定合约的主交易所。

**exchangeFilter:** *String。*\
指定要从中获取数据的交易所。

#### Python

```python
request_url = f"{baseUrl}/trsrv/secdef//schedule?assetClass=STK&conid=265598&symbol=AAPL&exchange=ISLAND&exchangeFilter=ISLAND"
requests.get(url=requests_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/secdef/trsrv/schedule?assetClass=STK&symbol=AAPL&exchange=ISLAND&exchangeFilter=ISLAND,NYSE,AMEX \
--request GET
```

#### 响应对象

**id:** String。\
交易所参数 id

**tradeVenueId:** String。\
对给定交易所参数的交易场所(trade venue)的引用。

**schedules:** 对象数组。\
始终包含至少一个 'tradingTime' 标签和零个或多个 'sessionTime' 标签。

**clearingCycleEndTime:** int。\
结算周期的结束时间。

**tradingScheduleDate:** int。\
结算时间表的日期。\
20000101 代表任意周六,20000102 代表任意周日,…… 20000107 代表任意周五。其他任何日期则代表其本身。

**sessions:** Object。\
description: String。\
如果 LIQUID 时段与整个交易日不同,则会返回一个单独的 'session' 标签。

**openingTime:** int。\
交易时段的开盘日期时间。

**closingTime:** int。\
交易时段的收盘日期时间。

**prop:** String。\
如果整个交易日被视为 LIQUID,则返回值 'LIQUID'。

**tradingTimes:** Object。\
包含交易时间的对象。

**description:** String\
以交易所时区返回 tradingTime。

**openingTime:** int。\
交易日的开盘时间。

**closingTime:** int。\
交易日的收盘时间。

**cancelDayOrders:** string。\
DAY 订单的取消时间。

```
[
  {
    "id": "p102082",
    "tradeVenueId": "v13133",
    "timezone": "America/New_York",
    "schedules": [      
      {
        "clearingCycleEndTime": "2000",
        "tradingScheduleDate": "20000103",
        "sessions": [
          {
            "openingTime": "0930",
            "closingTime": "1600",
            "prop": "LIQUID"
          }
        ],
        "tradingtimes": [
          {
            "openingTime": "0400",
            "closingTime": "2000",
            "cancelDayOrders": "Y"
          }
        ]
      },
      {...}
    ]
  }
]
```
