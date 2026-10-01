# 按 conid 搜索 SecDef 信息

基于 conid 提供期货、期权、权证、现货(Cash)和 CFD 的合约详情。

对于所有品种,必须先调用 `/iserver/secdef/search`。

对于期权、权证和期货期权等衍生品,还需要查询 `/iserver/secdef/strikes`。

`GET /iserver/secdef/info`

#### 请求对象

###### 查询参数

**conid:** String。必填\
标的的合约标识符。也可以直接传入最终衍生品的 conid。

**sectype:** String。必填\
所请求合约的证券类型。

**month:** String。衍生品必填\
给定衍生品的到期月份。

**exchange:** String。可选\
指定希望接收合约相关信息的交易所。

**strike:** String。期权与期货期权必填\
为所请求的合约详情设置行权价

**right:** String。期权必填\
为给定合约设置权利方向。\
值格式:"C" 表示看涨期权(Call),"P" 表示看跌期权(Put)。

**issuerId:** String。债券必填\
为给定的债券发行人类型设置 issuerId。\
示例格式:"e1234567"

#### Python

```python
request_url = f"{baseUrl}/iserver/secdef/info?conid=265598&secType=OPT&month=JAN24&strike=195&right=P"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/secdef/info?conid=265598&secType=OPT&month=JAN24&strike=195&right=P \
--request GET
```

#### 响应对象

**conid:** int。\
给定合约的合约标识符

**ticker:** String\
给定合约的股票代码(ticker symbol)

**secType:** String。\
给定合约的证券类型。

**listingExchange:** String。\
给定合约的主要上市交易所。

**exchange:** String。\
请求获取数据的交易所。

**companyName:** String。\
给定合约对应的公司名称。

**currency:** String\
给定合约允许的交易货币。

**validExchanges:** String\*\
以单个逗号分隔的字符串列出该合约可交易的所有有效交易所。\
priceRendering: null。

**maturityDate:** String\
给定合约的到期日。

**right:** String。\
给定合约的权利方向(P 或 C)。

**strike:** Float。\
返回给定合约的行权价值。

```
[
  {
    "conid": 667629330,
    "symbol": "AAPL",
    "secType": "OPT",
    "exchange": "SMART",
    "listingExchange": null,
    "right": "P",
    "strike": 195.0,
    "currency": "USD",
    "cusip": null,
    "coupon": "No Coupon",
    "desc1": "AAPL",
    "desc2": "JAN 05 '24 195 Put",
    "maturityDate": "20240105",
    "multiplier": "100",
    "tradingClass": "AAPL",
    "validExchanges": "SMART,AMEX,CBOE,PHLX,PSE,ISE,BOX,BATS,NASDAQOM,CBOE2,NASDAQBX,MIAX,GEMINI,EDGX,MERCURY,PEARL,EMERALD,MEMX,IBUSOPT"
  }
]
```
