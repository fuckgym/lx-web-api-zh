# 按 Contract ID 获取合约信息

请求给定 conid 的完整合约详情

`GET /iserver/contract/{conid}/info`

#### 请求对象

###### 路径参数:

**conid:** String。\
所需合约信息的合约 ID。

#### Python

```python
request_url = f"{baseUrl}/iserver/contract/265598/info"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/contract/265598/info \ 
--request GET
```

#### 响应对象

**conid:** int。\
所请求合约的合约 ID。

**ticker:** String。\
所请求合约的股票代码。

**secType:** String。\
所请求合约的证券类型。

**listingExchange:** String。\
所请求合约的主上市交易所。

**exchange:** String。\
请求中为所请求合约设置的交易交易所。

**companyName:** String。\
所请求合约的公司名称。

**currency:** String。\
所请求合约的计价货币。

**validExchanges:** String。\
所请求合约的所有有效交易所。

**priceRendering:** String。\
所请求合约的价格显示方式。

**maturityDate:** String。\
所请求合约的到期日(或失效日)。

**right:** String。\
所请求合约的权利方向,看跌(put)或看涨(call)。

**strike:** int。\
所请求合约的行权价。

```
{
  "cfi_code": "",
  "symbol": "AAPL",
  "cusip": null,
  "expiry_full": null,
  "con_id": 265598,
  "maturity_date": null,
  "industry": "Computers",
  "instrument_type": "STK",
  "trading_class": "NMS",
  "valid_exchanges": "SMART,AMEX,NYSE,CBOE,PHLX,ISE,CHX,ARCA,ISLAND,DRCTEDGE,BEX,BATS,EDGEA,JEFFALGO,BYX,IEX,EDGX,FOXRIVER,PEARL,NYSENAT,LTSE,MEMX,TPLUS1,IBEOS,OVERNIGHT,PSX",
  "allow_sell_long": false,
  "is_zero_commission_security": false,
  "local_symbol": "AAPL",
  "contract_clarification_type": null,
  "classifier": null,
  "currency": "USD",
  "text": null,
  "underlying_con_id": 0,
  "r_t_h": true,
  "multiplier": null,
  "underlying_issuer": null,
  "contract_month": null,
  "company_name": "APPLE INC",
  "smart_available": true,
  "exchange": "SMART",
  "category": "Computers"
}
```
