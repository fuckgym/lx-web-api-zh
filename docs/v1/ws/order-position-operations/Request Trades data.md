# 请求成交数据

#### 成交数据请求

###### 主题:

**str**\
将用户订阅到成交数据。在流式传输期间,这将返回所有成交(execution)数据。

###### 参数:

**realtimeUpdatesOnly:** bool。可选\
决定您是要显示历史成交,还是仅显示实时可用的成交。\
默认设置为 false。

**days:** int。可选\
返回多少天的成交数据。\
默认设置为 1。

```
str+{
    "realtimeUpdatesOnly":realtimeUpdatesOnly, 
    "days":days
}
```

#### 成交数据响应

**topic:** 字符串。\
返回给定请求的主题。

**args:** 对象。\
返回包含 pnl 数据的对象。

**execution\_id:** 字符串。\
特定成交的成交标识符。

**symbol:** 字符串。\
所交易合约的股票代码。

**supports\_tax\_opt:** 字符串。\
确定合约是否支持税务优化器(tax optimizer)。仅限 Client Portal。

**side:** 字符串。\
确定订单是买入方还是卖出方。

**order\_description:** 字符串。\
描述订单的完整内容。\
取值格式:"\{SIDE} \{SIZE} @ \{PRICE} on \{EXCHANGE}"

**trade\_time:** 字符串。\
UTC 格式的成交日期时间。\
取值格式:"YYYYMMDD-HH:mm:ss"

**trade\_time\_r:** int。\
成交的 Unix 时间戳形式。

**size:** float。\
返回交易的股份数量。

**order\_ref:** 字符串。\
返回下单时的自定义订单标识符(cOID)。

**price:** 字符串。\
返回该笔交易使用的价格。

**exchange:** 字符串。\
返回订单执行的交易所。

**net\_amount:** float。\
返回计算乘数后的交易总额。

**account:** 字符串。\
返回订单交易所用的账户。

**accountCode:** 字符串。\
返回订单交易所用的账户。

**company\_name:** 字符串。\
返回合约所属公司的名称。

**contract\_description\_1:** 字符串。\
返回合约的标的符号。

**contract\_description\_2:** 字符串。\
返回衍生品的完整描述。

**sec\_type:** 字符串。\
返回所交易的证券类型。

**conid:** int。\
所交易合约的合约标识符。

**conidEx:** 字符串。\
如果指定了订单的 conidEx,则返回该值,否则返回 conid。

**open\_close:** 字符串。\
返回该成交是否为平仓交易。\
如果持仓已经存在但不是平仓订单,则返回 "???"。

**liquidation\_trade:** 字符串。\
返回该交易是否为清算所致。

**is\_event\_trading:** 字符串。\
确定订单是否可与 EventTrader 配合使用。

```
{
  "topic":"topic"
  "args":[
    {
    "execution_id":"execution_id"
    "symbol":"symbol"
    "supports_tax_opt":"supports_tax_opt"
    "side":"side"
    "order_description":"order_description"
    "trade_time":"trade_time"
    "trade_time_r":trade_time_r
    "size":size
    "order_ref": "order_ref"
    "price":"price"
    "exchange":"exchange"
    "net_amount":net_amount
    "account":"account"
    "accountCode":"accountCode"
    "company_name":"company_name"
    "contract_description_1":"contract_description_1"
    "contract_description_2":"contract_description_2"
    "sec_type":"sec_type"
    "conid":conid
    "conidEx":"conidEx"
    "open_close":"open_close"
    "liquidation_trade":"liquidation_trade"
    "is_event_trading":"is_event_trading"
    }
  ]
}
```
