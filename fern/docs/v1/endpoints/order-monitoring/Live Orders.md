# 实时订单

此端点需要预检请求(pre-flight request)。\
orders 是实时订单(已取消、已成交、已提交)的列表。

要获取特定账户的订单信息,客户必须先查询 [/iserver/account 端点](/v1/endpoints/accounts/switch-account)以切换到相应账户。

请注意,使用 /iserver/account/orders 端点筛选订单会阻止订单详情通过 [websocket "sor" 主题](/v1/ws/order-position-operations/request-live-order-updates)传回。为解决此问题,开发人员应在后续的 /iserver/account/orders 调用中设置 "force=true",以清除围绕该端点的任何缓存行为,然后再发起 websocket 请求。

`GET /iserver/account/orders`

#### 请求对象

###### 查询参数

**filters:** String。\
可选地按唯一的状态值筛选订单列表。可以传递多个筛选条件,以逗号分隔。

**force:** bool。\
强制系统清除已保存的信息并重新请求订单。提交内容将显示为空数组。

#### Python

```python
request_url = f"{baseUrl}/iserver/account/orders?filters=filled&force=true"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/orders?filters=filled&force=true \
--request GET
```

#### 响应对象

**注意:**:/iserver/account/orders 端点最多可包含 1000 个订单。

**orders:** 对象数组。\
包含当日该账户下的所有订单。\
\[\{\
**acct:** String。\
返回所提交订单的账户 ID。

**conidex:** String。\
返回订单的合约标识符。

**conid:** int。\
返回订单的合约标识符。

**orderId:** int。\
返回订单的本地订单标识符。

**cashCcy:** String。\
返回订单使用的货币。

**sizeAndFills:** String。\
返回订单的规模及其已成交数量。

**orderDesc:** String。\
返回订单描述,包括方向、数量、订单类型、价格和 tif。

**description1:** String。\
返回订单的本地代码。

**ticker:** String。\
返回订单的股票代码。

**secType:** String。\
返回订单的证券类型。

**listingExchange:** String。\
返回订单的主上市交易所。

**remainingQuantity:** float。\
返回订单待成交的剩余数量。

**filledQuantity:** float。\
返回订单已成交的数量。

**companyName:** String。\
返回公司完整名称。

**status:** String。\
返回订单的当前状态。

**order\_ccp\_status:** String。\
返回订单的当前状态。

**origOrderType:** String。\
返回订单的原始订单类型,无论该类型是否已被更改。

**supportsTaxOpt:** String。\
返回该订单是否受税务优化器(Tax Optimizer)支持。

**lastExecutionTime:** String。\
返回订单最近一次成交的日期时间。\
返回的时间基于 UTC 时区。\
值格式:YYMMDDHHmmss

**orderType:** String。\
返回当前的订单类型,或执行时的订单类型。

**bgColor:** String。\
仅供内部使用。

**fgColor:** String。\
仅供内部使用。

**order\_ref:** String。\
用户自定义的用于标识订单的字符串。该值在下单时通过 "cOID" 字段设置。

**timeInForce:** String。\
返回订单的有效期(tif)。

**lastExecutionTime\_r:** int。\
返回订单最近一次成交的 epoch 时间。

**side:** String。\
返回订单的方向。

**avgPrice:** String。\
返回订单的平均成交价格。\
}]

**snapshot:** bool。\
返回该数据是否为账户订单的快照。

```
{
  "orders": [
    {
      "acct": "U1234567",
      "conidex": "265598",
      "conid": 265598,
      "account": "U1234567",
      "orderId": 1234568790,
      "cashCcy": "USD",
      "sizeAndFills": "5",
      "orderDesc": "Sold 5 Market, GTC",
      "description1": "AAPL",
      "ticker": "AAPL",
      "secType": "STK",
      "listingExchange": "NASDAQ.NMS",
      "remainingQuantity": 0.0,
      "filledQuantity": 5.0,
      "totalSize": 5.0,
      "companyName": "APPLE INC",
      "status": "Filled",
      "order_ccp_status": "Filled",
      "avgPrice": "192.26",
      "origOrderType": "MARKET",
      "supportsTaxOpt": "1",
      "lastExecutionTime": "231211180049",
      "orderType": "Market",
      "bgColor": "#FFFFFF",
      "fgColor": "#000000",
      "order_ref": "Order123",
      "timeInForce": "GTC",
      "lastExecutionTime_r": 1702317649000,
      "side": "SELL"
    }
  ],
  "snapshot": true
}
```
