# 按合约 ID 搜索证券定义

返回给定 conids 的证券定义列表。

`GET /trsrv/secdef`

#### 请求对象

###### 查询参数

**conids:** int\*。必填\
以逗号分隔的合约 ID 序列。\
值格式：1234

#### Python

```python
request_url = f"{baseUrl}/trsrv/secdef?conids=265598"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/trsrv/secdef?conids=265598 \
--request GET
```

#### 响应对象

**secdef**: array。\
以数组形式返回请求的内容。

**conid:** int。\
返回 conID。

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

**strike:** String。\
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

**incrementRules & displayRule:** Array。\
返回有关下单增量的规则。并非对所有交易所都有效。如需更准确的规则详情，请参阅 [/iserver/contract/rules](/v1/endpoints/contract/search-contract-rules)。

**isEventContract:** bool。\
返回该合约是否为事件合约（event contract）。

**pageSize:** int。\
返回请求的内容大小。

```
{
  "secdef": [
    {
      "conid": 265598,
      "currency": "USD",
      "time": 43,
      "chineseName": "苹果公司",
      "allExchanges": "AMEX,NYSE,CBOE,PHLX,CHX,ARCA,ISLAND,ISE,IDEAL,NASDAQQ,NASDAQ,DRCTEDGE,BEX,BATS,NITEECN,EDGEA,CSFBALGO,JEFFALGO,NYSENASD,PSX,BYX,ITG,PDQ,IBKRATS,CITADEL,NYSEDARK,MIAX,IBDARK,CITADELDP,NASDDARK,IEX,WEDBUSH,SUMMER,WINSLOW,FINRA,LIQITG,UBSDARK,BTIG,VIRTU,JEFF,OPCO,COWEN,DBK,JPMC,EDGX,JANE,NEEDHAM,FRACSHARE,RBCALGO,VIRTUDP,BAYCREST,FOXRIVER,MND,NITEEXST,PEARL,GSDARK,NITERTL,NYSENAT,IEXMID,HRT,FLOWTRADE,HRTDP,JANELP,PEAK6,IMCDP,CTDLZERO,HRTMID,JANEZERO,HRTEXST,IMCLP,LTSE,SOCGENDP,MEMX,INTELCROS,VIRTUBYIN,JUMPTRADE,NITEZERO,TPLUS1,XTXEXST,XTXDP,XTXMID,COWENLP,BARCDP,JUMPLP,OLDMCLP,RBCCMALP,WALLBETH,IBEOS,JONES,GSLP,BLUEOCEAN,USIBSILP,OVERNIGHT,JANEMID,IBATSEOS,HRTZERO,VIRTUALGO",
      "listingExchange": "NASDAQ",
      "countryCode": "US",
      "name": "APPLE INC",
      "assetClass": "STK",
      "expiry": null,
      "lastTradingDay": null,
      "group": "Computers",
      "putOrCall": null,
      "sector": "Technology",
      "sectorGroup": "Computers",
      "strike": "0",
      "ticker": "AAPL",
      "undConid": 0,
      "multiplier": 0.0,
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
}
```
