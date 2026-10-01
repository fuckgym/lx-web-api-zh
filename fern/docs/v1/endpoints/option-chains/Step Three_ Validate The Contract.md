# 第三步:验证合约

在调用 /search 和 /strikes 端点之后,用户可以使用 [/iserver/secdef/info endpoint](/v1/endpoints/contract/search-sec-def-information-by-conid) 端点来验证衍生品的 conId。对于您感兴趣的每一个行权价与权利(right)的组合,都应调用该端点。

注意:对于期货期权(Futures Options),应指定标的指数(Index)的 conId,并明确注明其上市交易所。例如,CL 期货期权应将 "exchange=NYMEX" 作为附加查询参数进行指定。

#### Python

```python
request_url = f"{baseUrl}/iserver/secdef/info?conid=416904&secType=OPT&month=JAN25&strike=3975&right=P
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/secdef/info?conid=416904&secType=OPT&month=JAN25&strike=3975&right=P \
--request GET
```

虽然所有信息都很重要,但最关键的是保存 conId,以便跟踪合约本身。在该期权的整个存续期内,此 conId 将保持不变。后续所有获取市场数据或下单的请求也都会用到它。

```
[
  {
    "conid": 654371995,
    "symbol": "SPX",
    "secType": "OPT",
    "exchange": "SMART",
    "listingExchange": null,
    "right": "P",
    "strike": 3975.0,
    "currency": "USD",
    "cusip": null,
    "coupon": "No Coupon",
    "desc1": "SPX",
    "desc2": "JAN 16 '25 3975 Put (AM)",
    "maturityDate": "20250116",
    "multiplier": "100",
    "tradingClass": "SPX",
    "validExchanges": "SMART,CBOE,IBUSOPT"
  }
]
```
