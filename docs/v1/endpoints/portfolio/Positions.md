# 持仓(Positions)

返回给定账户的持仓列表。\
该端点支持分页,每页最多返回 100 个持仓。\
必须先调用 /portfolio/accounts 或 /portfolio/subaccounts,然后才能调用此端点。

`GET /portfolio/{accountId}/positions/{pageId}`

#### 请求对象

###### 路径参数

**accountId:** String。必填\
应下单的账户的账户 ID。

**pageId:** String。必填\
应返回的持仓"页"。\
每页最多包含 100 个持仓。\
分页从 0 开始。

###### 查询参数

**model:** String。\
用于比较的模型投资组合代码。

**sort:** String。\
声明表格按哪一列排序。

**direction:** String。\
排序顺序。\
'a' 表示升序\
'd' 表示降序

**period:** String。\
pnl 列的时间周期\
取值格式:1D、7D、1M

#### Python

```python
request_url = f"{baseUrl}/portfolio/U1234567/positions/0?direction=a&period=1W&sort=position&model=MyModel"
requests.get(url=request_url) 
```

#### Abap

```abap
curl \
--url {{baseUrl}}/portfolio/U1234567/positions/0?direction=a&period=1W&sort=position&model=MyModel \
--request GET
```

#### 响应对象

**acctId:** String。

**conid:** int。\
返回该持仓的合约 ID。

**contractDesc:** String。\
返回订单的本地代码。

**position:** float。\
返回持仓的总规模。

**mktPrice:** float。\
返回每股的当前市场价格。

**mktValue:** float。\
返回订单的总价值。

**avgCost:** float。\
返回持仓中每股的平均成本乘以乘数。

**avgPrice:** float。\
返回买入时持仓中每股的平均成本。

**realizedPnl:** float。\
返回今日通过交易获得的总利润。

**unrealizedPnl:** float。\
返回如果进行交易可获得的总潜在利润。

**exchs:** null。\
已弃用的值。\
始终返回 null。

**currency:** String。\
返回该合约的交易货币。

**time:** int。\
返回生成数据所耗费的时间(毫秒)。

**chineseName:** String。\
返回该代码的中文汉字名称。

**allExchanges:** String\*。\
返回给定代码可交易的一系列交易所。

**listingExchange:** String。\
返回该合约所在的主要/上市交易所。

**countryCode:** String。\
返回该合约交易所在的国家代码。

**name:** String。\
返回公司名称。

**assetClass:** String。\
返回该合约的资产类别或证券类型。

**expiry:** String。\
返回合约的到期日。对于无到期日的品种返回 null。

**lastTradingDay:** String。\
返回合约的最后交易日。

**group:** String。\
返回合约所属的分组或行业。

**putOrCall:** String。\
返回该合约是 Put(认沽)还是 Call(认购)期权。

**sector:** String。\
返回合约所属的行业板块。

**sectorGroup:** String。\
返回行业板块所属的分组。

**strike:** String。\
返回合约的行权价。

**ticker:** String。\
返回所交易合约的股票代码。

**undConid:** int。\
返回合约的标的。

**multiplier:** float,\
返回合约乘数。

**type:** String。\
返回股票类型。

**hasOptions:** bool。\
返回该合约是否有可交易的期权合约。

**fullName:** String。\
返回所请求合约的代码名称。

**isUS:** bool。\
返回该合约是否为美国合约。

**incrementRules:** Array。\
返回有关市场数据和下单递增的规则。

**lowerEdge:** float,\
返回用于计算增量的下限值。

**increment:** float。\
允许的递增数值。

**displayRule:** object。\
返回一个包含市场数据显示内容的对象。

**magnification:** int。\
返回合约的放大倍数或乘数。

**displayRuleStep:** Array。\
包含显示对象中的各项规则。

**decimalDigits:** int。\
返回数据显示的平均小数位数。

**lowerEdge:** float。\
返回用于计算增量的下限值。

**wholeDigits:** int。\
返回允许的显示位数。

**isEventContract:** bool。\
返回该合约是否为事件合约。

**pageSize:** int。\
返回请求的内容大小。\
}]

```
[
  {
    "acctId": "U1234567",
    "conid": 756733,
    "contractDesc": "SPY",
    "position": 5.0,
    "mktPrice": 471.16000365,
    "mktValue": 2355.8,
    "currency": "USD",
    "avgCost": 434.93,
    "avgPrice": 434.93,
    "realizedPnl": 0.0,
    "unrealizedPnl": 181.15,
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
  },
  {
    "acctId": "U1234567",
    "conid": 76792991,
    "contractDesc": "TSLA",
    "position": 7.0,
    "mktPrice": 250.73399355,
    "mktValue": 1755.14,
    "currency": "USD",
    "avgCost": 221.67142855,
    "avgPrice": 221.67142855,
    "realizedPnl": 0.0,
    "unrealizedPnl": 203.44,
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
  },
  {
    "acctId": "U1234567",
    "conid": 107113386,
    "contractDesc": "META",
    "position": 11.0,
    "mktPrice": 333.1199951,
    "mktValue": 3664.32,
    "currency": "USD",
    "avgCost": 306.6909091,
    "avgPrice": 306.6909091,
    "realizedPnl": 0.0,
    "unrealizedPnl": 290.72,
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
