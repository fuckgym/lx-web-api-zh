# 成交记录

返回当前所选账户当日及之前六天的成交列表。建议每个会话只调用一次此端点。

#### Abap

```abap
GET /iserver/account/trades
```

#### Python

```python
request_url = f"{baseUrl}/iserver/account/trades?days=3"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/trades?days=3 \
--request GET
```

#### 响应对象

**execution\_id:** 字符串。\
返回该笔交易的成交 ID。

**symbol:** 字符串。\
返回标的符号。

**supports\_tax\_opt:** 字符串。\
返回该订单是否支持税务优化器(tax optimizer)。

**side:** 字符串。\
返回订单方向,买入(Buy)或卖出(Sell)。

**order\_description:** 字符串。\
返回订单描述,包括方向、数量、符号、订单类型、价格和 tif。

**order\_ref:** 字符串。\
用户定义的字符串,用于标识订单。下单时通过 "cOID" 字段设置该值。

**trade\_time:** 字符串。\
返回 UTC 格式的交易时间。

**trade\_time\_r:** int。\
返回交易的 Unix 时间戳。

**size:** float。\
返回订单数量。

**price:** 字符串。\
返回成交价格。

**submitter:** 字符串。\
返回提交订单的用户名。

**exchange:** 字符串。\
返回订单执行的交易所。

**commission:** 字符串。\
返回该笔交易的佣金成本。

**net\_amount:** float。\
返回订单的净总成本。

**account:** 字符串。\
返回账户标识符。

**accountCode:** 字符串。\
返回账户标识符。

**company\_name:** 字符串。\
返回合约所属公司的完整名称。

**contract\_description\_1:** 字符串。\
返回订单的本地符号(local symbol)。

**sec\_type:** 字符串。\
返回合约的证券类型。

**listing\_exchange:** 字符串。\
返回合约的主上市交易所。

**conid:** int。\
返回订单的合约标识符。

**conidEx:** 字符串。\
返回订单的合约标识符。

**clearing\_id:** 字符串。\
返回清算商标识符。

**clearing\_name:** 字符串。\
返回清算商标识符。

**liquidation\_trade:** 字符串。\
返回该订单是否属于账户清算的一部分。

**is\_event\_trading:** 字符串。\
返回该订单是否属于事件交易。

```
[
  {
    "execution_id": "0000e0d5.6576fd38.01.01",
    "symbol": "AAPL",
    "supports_tax_opt": "1",
    "side": "S",
    "order_description": "Sold 5 @ 192.26 on ISLAND",
    "trade_time": "20231211-18:00:49",
    "trade_time_r": 1702317649000,
    "size": 5.0,
    "price": "192.26",
    "order_ref": "Order123",
    "submitter": "user1234",
    "exchange": "ISLAND",
    "commission": "1.01",
    "net_amount": 961.3,
    "account": "U1234567",
    "accountCode": "U1234567",
    "account_allocation_name": "U1234567",
    "company_name": "APPLE INC",
    "contract_description_1": "AAPL",
    "sec_type": "STK",
    "listing_exchange": "NASDAQ.NMS",
    "conid": 265598,
    "conidEx": "265598",
    "clearing_id": "IB",
    "clearing_name": "IB",
    "liquidation_trade": "0",
    "is_event_trading": "0"
  }
]
```
