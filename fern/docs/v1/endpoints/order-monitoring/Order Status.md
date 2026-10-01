# 订单状态(Order Status)

Order Status 端点可用于在单个特定订单保持活跃期间对其进行监控。

重要提示:

* 对于财务顾问(Financial Advisors)或关联账户结构等多账户结构,用户必须在请求订单状态之前调用 [/iserver/account](/v1/endpoints/accounts/switch-account) 切换到相应的关联账户。否则预计会导致 '503' 错误。
* 如果订单在当前活跃会话之前已被取消或成交,且没有保存任何缓存信息,则查询订单状态端点预计会导致 '503' 错误。

使用下单响应返回的 orderId,或实时订单(live order)响应中提供的 orderId,获取单个订单的给定状态。

#### Abap

```abap
GET /iserver/account/order/status/{{ orderId }}
```

#### Python

```python
request_url = f"{baseUrl}/iserver/account/order/status/1234567890"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/order/status/1234567890\
--request GET
```

#### 响应对象

**sub\_type:** null。\
仅内部使用。

**request\_id:** String。\
返回用户所下订单的 requestId。

**order\_id:** int。\
返回所请求订单的 orderId。

**conidex:** String。\
返回该订单的合约标识符。

**conid:** int。\
返回该订单的合约标识符。

**symbol:** String。\
返回该订单的股票代码。

**side:** String。\
返回订单的方向。

**contract\_description\_1:** String。\
返回订单的本地代码。

**listing\_exchange:** String。\
返回订单的主要上市交易所。

**option\_acct:** String。\
供 Client Portal 使用(仅内部使用)。

**company\_name:** String。\
返回公司全名。

**size:** String。\
订单待成交的剩余数量。

**total\_size:** String。\
订单的总数量。

**currency:** String。\
返回订单的基准货币。

**account:** String。\
返回下单所用的账户。

**order\_type:** String。\
返回给定订单的订单类型。

**cum\_fill:** String。\
订单的累计成交数量。

**order\_status:** String。\
返回订单的当前状态。

**order\_ccp\_status:** String。\
以代码形式返回订单的当前状态。

**order\_status\_description:** String。\
返回订单状态的人类可读描述。

**tif:** String。\
返回订单的有效期(Time in Force)。

**fg\_color:** String。\
供 Client Portal 使用(仅内部使用)。

**bg\_color:** String。\
供 Client Portal 使用(仅内部使用)。

**order\_not\_editable:** bool。\
返回订单是否可以修改。\
这适用于正在成交或已经成交的订单。

**editable\_fields:** null。\
供 Client Portal 使用(仅内部使用)。

**cannot\_cancel\_order:** bool。\
返回订单是否可以取消。\
这适用于正在成交或已经成交的订单。

**deactivate\_order:** bool。\
返回订单是否已被标记为不活跃。

**sec\_type:** String。\
返回订单合约的证券类型。

**available\_chart\_periods:** String。\
供 Client Portal 使用(仅内部使用)。

**order\_description:** String。\
返回订单的描述,包括方向、数量、订单类型、价格和 tif。

**order\_description\_with\_contract:** String。\
返回订单的描述,包括方向、数量、代码、订单类型、价格和 tif。

**alert\_active:** int。\
返回该订单上是否存在处于活动状态的警报。

**child\_order\_type:** String。\
子订单的类型\
取值格式:A=attached(附加),B=beta-hedge(贝塔对冲),0=无子订单

**order\_clearing\_account:** String。\
返回所提交订单的 accountID。

**size\_and\_fills:** String。\
显示 `size / cumulative fill`。

**exit\_strategy\_display\_price:** String。\
显示订单最终成交时的价格。

**exit\_strategy\_chart\_description:** String。\
返回订单的描述,包括方向、数量、订单类型、价格和 tif。

**average\_price:** String。\
返回订单的成交均价。

**exit\_strategy\_tool\_availability:** String。\
仅内部使用。

**allowed\_duplicate\_opposite:** bool。\
返回是否允许向市场提交相反方向的订单。

**order\_time:** String。\
返回下单的日期时间。\
返回的时间基于 UTC 时区。\
取值格式:YYMMDDHHmmss

```
{
  "sub_type": null,
  "request_id": "209",
  "server_id": "0",
  "order_id": 1799796559,
  "conidex": "265598",
  "conid": 265598,
  "symbol": "AAPL",
  "side": "S",
  "contract_description_1": "AAPL",
  "listing_exchange": "NASDAQ.NMS",
  "option_acct": "c",
  "company_name": "APPLE INC",
  "size": "0.0",
  "total_size": "5.0",
  "currency": "USD",
  "account": "U1234567",
  "order_type": "MARKET",
  "cum_fill": "5.0",
  "order_status": "Filled",
  "order_ccp_status": "2",
  "order_status_description": "Order Filled",
  "tif": "DAY",
  "fg_color": "#FFFFFF",
  "bg_color": "#000000",
  "order_not_editable": true,
  "editable_fields":"",
  "cannot_cancel_order": true,
  "deactivate_order": false,
  "sec_type": "STK",
  "available_chart_periods": "#R|1",
  "order_description": "Sold 5 Market, Day",
  "order_description_with_contract": "Sold 5 AAPL Market, Day",
  "alert_active": 1,
  "child_order_type": "0",
  "order_clearing_account": "U1234567",
  "size_and_fills": "5",
  "exit_strategy_display_price": "193.12",
  "exit_strategy_chart_description": "Sold 5 @ 192.26",
  "average_price": "192.26",
  "exit_strategy_tool_availability": "1",
  "allowed_duplicate_opposite": true,
  "order_time": "231211180049"
}
```
