# 订阅 BookTrader 价格阶梯

#### 价格阶梯请求

###### Topic:

**sbd**\
将用户订阅到 BookTrader 价格阶梯数据。\
流式传输 BookTrader 数据要求用户保有 L2、Depth of Book（盘口深度）市场数据订阅。更多详情请参阅[市场数据订阅页面](/general/market-data-subscriptions/)。

###### Topic Target:

**acctId:** Required.\
必须传入单个 AccountId。

**conids:** Required.\
必须传入单个合约标识符。

**exchange:** Optional.\
提供一个路由交易所标识符。\
如果未指定交易所，则默认为所有可用的深度交易所。

```
sbd+acctId+conid+exchange
```

#### 价格阶梯响应

**topic:** String.\
返回请求的主题字符串。

**data:** Array of Objects.\
返回一个对象数组，用于表示阶梯深度。

**row:** int.\
返回阶梯数据的行标识符。

**focus:** int.\
指示该值是否被标记为该合约的最后成交价。

**price:** String.\
返回最新价（Last），即最近一次成交的价格。\
在某些情况下，price 和 size 会以 '"price":"size @ price"' 的结构返回。

**ask:** String.\
返回对应的卖方报价数量（ask size）。

**bid:** String.\
返回对应的买方报价数量（bid size）。

```
{
  "topic":"sbd+acctId+conid",
  "data":[
    {"row":0,"focus":0,"price":"price"},
    {"row":1,"focus":0,"price":"size @ price"},
    {"row":n,"focus":0,"price":"price", "bid":"bid"},
    {"row":n+1,"focus":0,"price":"price", "ask":"ask"},
    {"row":n+1,"focus":0,"price":"size @ price", "ask":"ask"}
  ]
}
```
