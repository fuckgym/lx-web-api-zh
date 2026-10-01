# 请求实时订单更新

只要订单处于活动状态,就可以通过 Web API 获取它。可以通过订阅 sor 主题来请求实时订单流。一旦请求了实时订单,当有更新时我们就会开始转发。要接收当日的全部订单,可以使用 /iserver/account/orders 端点。建议在订阅实时订单之前,先查询当日的全部订单。

#### 订单更新请求

###### 主题:

**sor**\
将用户订阅到实时订单更新。

###### 参数:

**filters**: 字符串数组\
传入一个包含单个字符串的数组,指示要返回的排他性[订单状态值](/web-api/v1/endpoints/order-monitoring/order-status-value)。

```
sor+{"filters":["Submitted"]}
```

#### 订单更新响应

**topic:** 字符串。

**args:** 对象数组。

**acct:** 字符串。\
返回发起请求的账户的账户 ID。

**conid:** int。\
给定订单的合约标识符。

**orderId:** int。\
与给定订单关联的订单标识符。

**cashCcy:** 字符串。\
交易使用的基础货币。

**sizeAndFills:** 字符串。\
订单已成交的总数量。

**orderDesc:** 字符串。\
给定订单的订单描述。\
描述该订单的方向、数量、orderType、价格和 tif。

**description1:** 字符串。\
请求的股票代码。

**ticker:** 字符串。\
请求的股票代码。

**secType:** 字符串。\
请求的证券类型。

**listingExchange:** 字符串。\
合约所在的主交易所。

**remainingQuantity:** float。\
订单剩余数量的百分比。

**filledQuantity:** float。\
订单已成交数量的百分比。

**companyName:** 字符串。\
合约所属公司的完整名称。

**status:** 字符串。\
当前订单状态。\
取值格式:Presubmitted、Submitted、Filled、Cancelled。

**origOrderType:** 字符串。\
返回给定订单的原始订单类型。

**supportsTaxOpt:** 字符串。\
确定订单是否支持税务优化器(Tax Optimizer)。

**lastExecutionTime:** 字符串。\
返回最近一次成交的日期时间对象。

**lastExecutionTime\_r:** int。\
返回最近一次成交的 Unix 时间戳。

**order\_ref:** 字符串。\
返回下单时的自定义订单标识符(cOID)。

**orderType:** 字符串。\
返回订单当前的订单类型。\
取值格式:MARKET、LIMIT、STOP

**side:** 字符串。\
返回交易方向。\
取值格式:BUY、SELL

**timeInForce:** 字符串。\
返回给定订单的订单有效期(time in force)。

**price:** int。\
提供所提交订单的限价或止损价。

**bgColor:** 字符串。\
背景颜色。仅用于 Client Portal。

**fgColor:** 字符串。\
前景颜色。仅用于 Client Portal。

```
{
    "topic": "sor" ,
    "args": [
        {
            "acct": "acct",
            "conid": conid,
            "orderId": orderId,
            "cashCcy": "cashCcy",
            "sizeAndFills": "sizeAndFills",
            "orderDesc": "orderDesc",
            "description1": "description1",
            "ticker": "ticker",
            "secType": "secType",
            "listingExchange": "listingExchange",
            "remainingQuantity": remainingQuantity,
            "filledQuantity": filledQuantity,
            "companyName": "companyName",
            "status": "status",
            "origOrderType": "origOrderType",
            "supportsTaxOpt": "supportsTaxOpt",
            "lastExecutionTime": "lastExecutionTime",
            "lastExecutionTime_r": lastExecutionTime_r,
            "order_ref": "order_ref,
            "orderType": "orderType",
            "side": "side",
            "timeInForce": "timeInForce",
            "price": price,
            "bgColor": "#000000",
            "fgColor": "#00F000"
        }
    ]
}
```
