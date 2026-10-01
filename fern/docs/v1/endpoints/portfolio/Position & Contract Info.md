# 持仓与合约信息

返回一个对象，其中包含给定持仓的信息及其合约详情。

`GET /portfolio/positions/{conid}`

#### 请求对象

###### 路径参数

**conId:** String。必填\
要获取持仓信息的合约 ID。

#### Python

```python
request_url = f"{baseUrl}/portfolio/positions/265598"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/portfolio/positions/265598 \
--request GET
```

#### 响应对象

**accountId:** String。\
显示返回数据所对应的 accountId。

**acctId:** String。\
显示返回数据所对应的 accountId。

**conid:** int。\
返回该持仓的合约 ID。

**contractDesc:** String。\
返回订单的本地代码（local symbol）。

**position:** float。\
返回持仓的总规模。

**mktPrice:**  float。\
返回每股的当前市场价格。

**mktValue:**  float。\
返回订单的总价值。

**avgCost:** float。\
返回持仓中每股的平均成本乘以乘数（multiplier）的结果。

**avgPrice:** float。\
返回买入时持仓中每股的平均成本。

**realizedPnl:** float。\
返回今日通过交易获得的总利润。

**unrealizedPnl:** float。\
返回若进行交易可获得的总潜在利润。

**exchs:** null。\
已弃用的值。\
始终返回 null。

**currency:** String。\
返回该合约的交易货币。

**time:** int。\
返回生成数据所耗费的时间（毫秒）。

**chineseName:** String。\
返回该代码的中文名称。

**allExchanges:** String\*。\
返回给定代码可交易的交易所列表。

**listingExchange:** String。\
返回该合约所在的上市交易所或主交易所。

**countryCode:** String。\
返回该合约交易所在的国家代码。

**name:** String。\
返回公司名称。

**assetClass:** String。\
返回该合约的资产类别或证券类型。

**expiry:** String。\
返回该合约的到期日。对无到期日的合约品种返回 null。

**lastTradingDay:** String。\
返回该合约的最后交易日。

**group:** String。\
返回该合约所属的组别或行业。

**putOrCall:** String。\
返回该合约是看跌（Put）期权还是看涨（Call）期权。

**sector:** String。\
返回该合约所属的板块。

**sectorGroup:** String。\
返回该板块所属的组别。

**strike:** int。\
返回该合约的行权价。

**ticker:** String。\
返回所交易合约的股票代码（ticker symbol）。

**undConid:** int。\
返回该合约的标的。

**multiplier:** float,\
返回合约乘数。

**type:** String。\
返回股票类型。

**hasOptions:** bool。\
返回该合约是否具有可交易的期权合约。

**fullName:** String。\
返回所请求合约的代码名称。

**isUS:** bool。\
返回该合约是否为美国合约。

**incrementRules:** Array。\
返回有关市场数据和下单增量规则的规则。

**lowerEdge:** float,\
返回用于计算增量的下边缘值。

**increment:** float。\
允许的增量值。

**displayRule:** object。\
返回一个对象，包含市场数据的显示内容。

**magnification:** int。\
返回合约的放大倍数或乘数。

**displayRuleStep:** Array。\
包含显示对象中的各种规则。

**decimalDigits:** int。\
返回数据显示的平均小数位数。

**lowerEdge:** float。\
返回用于计算增量的下边缘值。

**wholeDigits:** int。\
返回允许的显示位数。

**isEventContract:** bool。\
返回该合约是否为事件合约（event contract）。

**pageSize:** int。\
返回请求的内容大小。\
}]

```
[
  {
    "acctId": "U1234567",
    "conid": 265598,
    "contractDesc": "AAPL",
    "position": 614.2639,
    "mktPrice": 197.7639923,
    "mktValue": 121479.28,
    "currency": "USD",
    "avgCost": 192.7477563,
    "avgPrice": 192.7477563,
    "realizedPnl": 0.0,
    "unrealizedPnl": 3081.29,
    "exchs": null,
    "expiry": null,
    "putOrCall": null,
    "multiplier": null,
    "strike": 0.0,
    "exerciseStyle": null,
    "conExchMap": [],
    "assetClass": "STK",
    "undConid": 0,
    "model": ""
  }
]
```
