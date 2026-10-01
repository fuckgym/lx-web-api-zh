# 搜索合约规则(Search Contract Rules)

返回特定合约和方向的交易相关规则。

`POST /iserver/contract/rules`

#### 请求对象

###### 请求体参数

**conid:** Number。必填\
目标合约的合约标识符。

**exchange:** String。\
指定您希望获取该合约相关信息的交易所。

**isBuy:** bool。\
市场规则适用的方向。买单设置为 true,卖单设置为 false\
默认为 true,即买单方向的规则。

**modifyOrder:** bool。\
用于查找与现有订单相关的交易规则。

**orderId:** Number。modifyOrder:true 时必填\
指定用于跟踪给定订单的订单标识符。

#### Python

```python
request_url = f"{baseUrl}/iserver/contract/rules"
json_content = {
  "conid": 265598,
  "exchange": "SMART",
  "isBuy": true,
  "modifyOrder": true,
  "orderId": 1234567890
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/contract/rules \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "conid": 265598,
  "exchange": "SMART",
  "isBuy": true,
  "modifyOrder": true,
  "orderId": 1234567890
}'
```

#### 响应对象

**algoEligible:** bool。\
指示该合约是否可以交易算法订单(algos)。

**overnightEligible:** bool。\
指示该品种是否允许 outsideRTH(常规交易时段外)交易。

**costReport:** bool。\
指示是否已请求成本报告(仅限 Client Portal)。

**canTradeAcctIds:** String 数组。\
指示允许交易该合约的账户 ID。

**error:** String。\
如果因任何原因无法获取规则信息,将在此处说明。

**orderTypes:** String 数组\
指示可用于标准数量交易的订单类型。

**ibAlgoTypes:** String 数组。\
指示可用于给定合约的算法类型。

**fraqTypes:** String 数组。\
指示可用于零股交易(fractional trading)的订单类型。

**forceOrderPreview:** bool。\
指示提交前是否强制用户进行订单预览。

**cqtTypes:** String 数组。\
指示可用于现金数量(cash quantity)的订单类型。

**orderDefaults:** 嵌套对象(Object of objects)\
指示给定证券类型的默认订单类型。

**orderTypesOutside:** String 数组。\
指示常规交易时段之外可用的订单类型。

**defaultSize:** int。\
订单的默认总数量值。

**cashSize:** float。\
默认的现金金额数量。

**sizeIncrement:** int。\
指示该合约的数量递增单位。

**tifTypes:** String 数组。\
指示该合约支持的允许 tif 类型。

**tifDefaults:** Object。\
包含 TIF 默认值详细信息的对象。\
这些默认值可在 TWS 的全局配置(Global Configuration)中查看和修改。

**limitPrice:** float。\
给定合约的默认限价。

**stopprice:** float。\
给定合约的默认止损价。

**orderOrigination:** String。\
美国证券期权和期权清算公司(Options Clearing Corporation)的订单来源标识。

**preview:** bool。\
指示是否需要订单预览(仅限 Client Portal)。

**displaySize:** int。

**fraqInt:** int。\
指示零股订单规模的保留小数位数。

**cashCcy:** String。\
指示该品种的基准货币。

**cashQtyIncr:** int。\
指示现金数量递增规则。

**priceMagnifier:** int。\
表示合约是否不是以标准现金面额交易。\
如果某个代码以美分(Cents)、便士(Pence)或该货币的分数等价单位计价,将显示相应的相对值。对于标准品种,将传递 Null。

**negativeCapable:** bool。\
指示合约的价值是否可以为负(true),还是始终为正(false)。

**incrementType:** int。\
指示递增方式的类型。

**incrementRules:** 对象数组。\
指示递增规则的值,包括 lowerEdge 和递增值。

**hasSecondary:** bool。

**modTypes:** String 数组。\
列出修改订单时支持的可用订单类型。

**increment:** float。\
价格的最小递增单位。

**incrementDigits:** int。\
表示递增值的小数位数。

```
{
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
  "fraqTypes": [],
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
      "LP": "549000.00"
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
  "sizeIncrement": 1,
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
  "limitPrice": 549000.0,
  "stopprice": 549000.0,
  "orderOrigination": null,
  "preview": true,
  "displaySize": null,
  "fraqInt": 0,
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
```
