# 查找给定合约的所有信息与规则

通过单一端点同时返回合约信息与合约规则。\
若仅需合约规则,请使用端点 /iserver/contract/rules。\
若仅需合约信息,请使用端点 /iserver/contract/\{conid}/info。

`GET /iserver/contract/{{ conid }}/info-and-rules`

#### 请求对象

###### 路径参数

**coind:** String。必填\
给定合约的合约标识符。

###### 查询参数

**isBuy:** bool。\
指示你正在查找的是买入(Buy)还是卖出(Sell)订单规则。\
查找买入订单时设为 true,查找卖出订单时设为 false

#### Python

```python
request_url = f"{baseUrl}/iserver/contract/265598/info-and-rules?isBuy=true"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/contract/265598/info-and-rules?isBuy=true \ 
--request GET
```

#### 响应对象

**cfi\_code:** String。\
金融工具分类(CFI)代码

**symbol:** String。\
标的代码

**cusip:** String。\
返回给定工具的 CUSIP。\
仅用于债券(BOND)交易。

**expiry\_full:** String。\
返回合约的到期月份。\
格式为 "YYYYMM"

**con\_id:** int。\
指示给定合约的合约标识符。

**maturity\_date:** String。\
指示给定合约的最终到期日。\
格式为 "YYYYMMDD"

**industry:** String。\
特定的公司或行业群体。

**instrument\_type:** String。\
工具的资产类别。

**trading\_class:** String。\
合约指定的交易类别。

**valid\_exchanges:** String。\
以逗号分隔的受支持交易所或交易场所列表。

**allow\_sell_long:** bool。\
允许卖出你所持有的股份。

**is\_zero\_commission\_security:** bool。\
指示该合约是否支持零佣金交易。

**local\_symbol:** String。\
合约在主交易所的代码。对于期权,即为 OCC 代码。

**contract\_clarification\_type:** null

**classifier:** null。

**currency:** String。\
合约交易所用的基础货币。

**text:** String。\
指示合约的显示名称,即在 Client Portal 中显示的名称。

**underlying\_con\_id:** int。\
所请求合约的标的合约标识符。

**r\_t\_h:** bool。\
指示该合约能否在常规交易时间之外交易。

**multiplier:** String。\
指示合约的乘数。

**underlying\_issuer:** String。\
指示标的的发行人。

**contract\_month:** String。\
指示合约到期的年份和月份。\
值格式:"YYYYMM"

**company\_name:** String。\
指示公司或指数的名称。

**smart\_available:** bool。\
指示该合约能否进行智能路由。

**exchange:** String。\
指示该合约可交易的主交易所。

**category:** String。\
指示工具的行业类别。

**rules:** Object。\
[参见 `/iserver/contract/rules` 端点。](/v1/endpoints/contract/search-contract-rules)

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
  "category": "Computers",
  "rules": {
    "algoEligible": true,
    "overnightEligible": true,
    "costReport": false,
    "canTradeAcctIds": [
      "U1234567"
    ],
    "error": null,
    "orderTypes": [
      "limit",
      "midprice",
      "market",
      "stop",
      "stop_limit",
      "mit",
      "lit",
      "trailing_stop",
      "trailing_stop_limit",
      "relative",
      "marketonclose",
      "limitonclose"
    ],
    "ibAlgoTypes": [
      "limit",
      "stop_limit",
      "lit",
      "trailing_stop_limit",
      "relative",
      "marketonclose",
      "limitonclose"
    ],
    "fraqTypes": [
      "limit",
      "market",
      "stop",
      "stop_limit",
      "mit",
      "lit",
      "trailing_stop",
      "trailing_stop_limit"
    ],
    "forceOrderPreview": false,
    "cqtTypes": [
      "limit",
      "market",
      "stop",
      "stop_limit",
      "mit",
      "lit",
      "trailing_stop",
      "trailing_stop_limit"
    ],
    "orderDefaults": {
      "LMT": {
        "LP": "197.93"
      }
    },
    "orderTypesOutside": [
      "limit",
      "stop_limit",
      "lit",
      "trailing_stop_limit",
      "relative"
    ],
    "defaultSize": 100,
    "cashSize": 0.0,
    "sizeIncrement": 100,
    "tifTypes": [
      "IOC/MARKET,LIMIT,RELATIVE,MARKETONCLOSE,MIDPRICE,LIMITONCLOSE,MKT_PROTECT,STPPRT,a",
      "GTC/o,a",
      "OPG/LIMIT,MARKET,a",
      "GTD/o,a",
      "DAY/o,a"
    ],
    "tifDefaults": {
      "TIF": "DAY",
      "SIZE": "100.00"
    },
    "limitPrice": 197.93,
    "stopprice": 197.93,
    "orderOrigination": null,
    "preview": true,
    "displaySize": null,
    "fraqInt": 4,
    "cashCcy": "USD",
    "cashQtyIncr": 500,
    "priceMagnifier": null,
    "negativeCapable": false,
    "incrementType": 1,
    "incrementRules": [
      {
        "lowerEdge": 0.0,
        "increment": 0.01
      }
    ],
    "hasSecondary": true,
    "increment": 0.01,
    "incrementDigits": 2
  }
}
```
