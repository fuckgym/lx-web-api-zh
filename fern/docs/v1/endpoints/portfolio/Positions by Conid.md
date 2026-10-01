# 按 Conid 查询持仓(Positions by Conid)

返回一个列表,仅包含指定 conid 的持仓详情。

首次请求将仅返回该合约的投资组合(Portfolio)信息。对该合约的后续请求还会返回该合约的信息和规则,如下所示。

`GET /portfolio/{acctId}/position/{conid}`

#### 请求对象

###### 路径参数

**accountId:** String。必填\
应下单的账户的账户 ID。

**conId:** String。必填\
要获取持仓信息的合约 ID。

#### Python

```python
request_url = f"{baseUrl}/portfolio/U1234567/position/265598"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/portfolio/U1234567/position/265598 \
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

**strike:** int。\
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
    "conid": 265598,
    "contractDesc": "AAPL",
    "position": 614.2639,
    "mktPrice": 197.3840027,
    "mktValue": 121245.87,
    "currency": "USD",
    "avgCost": 192.7477563,
    "avgPrice": 192.7477563,
    "realizedPnl": 0.0,
    "unrealizedPnl": 2847.88,
    "exchs": null,
    "expiry": null,
    "putOrCall": null,
    "multiplier": 0.0,
    "strike": "0",
    "exerciseStyle": null,
    "conExchMap": [],
    "assetClass": "STK",
    "undConid": 0,
    "model": "",
    "time": 43,
    "chineseName": "苹果公司",
    "allExchanges": "AMEX,NYSE,CBOE,PHLX,CHX,ARCA,ISLAND,ISE,IDEAL,NASDAQQ,NASDAQ,DRCTEDGE,BEX,BATS,NITEECN,EDGEA,CSFBALGO,JEFFALGO,NYSENASD,PSX,BYX,ITG,PDQ,IBKRATS,CITADEL,NYSEDARK,MIAX,IBDARK,CITADELDP,NASDDARK,IEX,WEDBUSH,SUMMER,WINSLOW,FINRA,LIQITG,UBSDARK,BTIG,VIRTU,JEFF,OPCO,COWEN,DBK,JPMC,EDGX,JANE,NEEDHAM,FRACSHARE,RBCALGO,VIRTUDP,BAYCREST,FOXRIVER,MND,NITEEXST,PEARL,GSDARK,NITERTL,NYSENAT,IEXMID,HRT,FLOWTRADE,HRTDP,JANELP,PEAK6,IMCDP,CTDLZERO,HRTMID,JANEZERO,HRTEXST,IMCLP,LTSE,SOCGENDP,MEMX,INTELCROS,VIRTUBYIN,JUMPTRADE,NITEZERO,TPLUS1,XTXEXST,XTXDP,XTXMID,COWENLP,BARCDP,JUMPLP,OLDMCLP,RBCCMALP,WALLBETH,IBEOS,JONES,GSLP,BLUEOCEAN,USIBSILP,OVERNIGHT,JANEMID,IBATSEOS,HRTZERO,VIRTUALGO",
    "listingExchange": "NASDAQ",
    "countryCode": "US",
    "name": "APPLE INC",
    "lastTradingDay": null,
    "group": "Computers",
    "sector": "Technology",
    "sectorGroup": "Computers",
    "ticker": "AAPL",
    "type": "COMMON",
    "hasOptions": true,
    "fullName": "AAPL",
    "isUS": true,
    "incrementRules": [
      {
        "lowerEdge": 0.0,
        "increment": 0.01
      }
    ],
    "displayRule": {
      "magnification": 0,
      "displayRuleStep": [
        {
          "decimalDigits": 2,
          "lowerEdge": 0.0,
          "wholeDigits": 4
        }
      ]
    },
    "isEventContract": false,
    "pageSize": 100
  }
]
```
