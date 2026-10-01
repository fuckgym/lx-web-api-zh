# 持仓(NEW)

返回指定账户的持仓列表。\
在调用此端点之前,必须先调用 /portfolio/accounts 或 /portfolio/subaccounts。\
此端点提供近实时更新,并移除了 /portfolio/\{accountId}/positions/\{pageId} 端点中原本存在的缓存。

`GET /portfolio2/{accountId}/positions`

#### 请求对象

###### 路径参数(Path Params)

**accountId:** 字符串。必填\
应下单的账户 ID。

###### 查询参数(Query Params)

**model:** 字符串。\
用于比较的模型投资组合代码。

**sort:** 字符串。\
声明表格按哪一列排序。

**direction:** 字符串。\
排序的方向。\
'a' 表示升序\
'd' 表示降序

#### Python

```python
request_url = f"{baseUrl}/portfolio2/U1234567/positions?direction=a&sort=position"
requests.get(url=request_url) 
```

#### Abap

```abap
curl \
--url {{baseUrl}}/portfolio2/U1234567/positions?direction=a&sort=position \
--request GET
```

#### 响应对象

**position:** float。\
返回持仓的总数量。

**conid:** int。\
返回持仓的合约 ID。

**avgCost:** float。\
返回持仓中每股的平均成本乘以乘数后的值。

**avgPrice:** float。\
返回买入时持仓中每股的平均成本。

**currency:** 字符串。\
返回该合约的交易货币。

**description:** 字符串。\
返回订单的本地代码(local symbol)。

**isLastToLoq:** 字符串。\
返回该合约是否最后清算。

**mktPrice:** float。\
返回每股的当前市场价格。

**mktValue:** float。\
返回订单的总价值。

**realizedPnl:** float。\
返回当日通过交易获得的总利润。

**unrealizedPnl:** float。\
返回若进行交易可获得的总潜在利润。

**secType:** 字符串。\
返回合约的资产类别或证券类型。

**timestamp:** integer。\
返回投资组合请求的 epoch 时间戳。

**assetClass:** 字符串。\
返回合约的资产类别或证券类型。

**sector:** 字符串。\
返回该合约所属的行业板块(sector)。

**group:** 字符串。\
返回该合约所属的组(group)或行业。

**model**: 字符串。\
用于比较的模型投资组合代码。

\{\
"position": 12.0,\
"conid": "9408",\
"avgCost": 266.20888333333335,\
"avgPrice": 266.20888333333335,\
"currency": "USD",\
"description": "MCD",\
"isLastToLoq": false,\
"marketPrice": 258.8299865722656,\
"marketValue": 3105.9598388671875,\
"realizedPnl": 0.0,\
"secType": "STK",\
"timestamp": 1717444668,\
"unrealizedPnl": 88.54676113281266,\
"assetClass": "STK",\
"sector": "Consumer, Cyclical",\
"group": "Retail",\
"model": ""\
}
