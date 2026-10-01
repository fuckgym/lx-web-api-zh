# 按交易所获取所有 Conid

发送请求以检索指定交易所上所有可用的合约。此请求返回可在该交易所交易的所有合约,包括那些并未以该交易所作为主要上市地的合约。

**注意:** 此功能仅适用于股票(Stock)合约。

`GET /trsrv/all-conids`

#### 请求对象

###### 查询参数

**exchange:** String。必填\
指定要获取 conid 的单一交易所。

#### Python

```python
request_url = f"{baseUrl}/trsrv/all-conids?exchange=AMEX"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/trsrv/all-conids?exchange=AMEX \
--request GET
```

#### 响应对象

**ticker:** String。\
返回合约的股票代码(ticker symbol)。

**conid:** int。\
返回所返回合约的合约标识符。

**exchange:** String。\
返回所返回合约的交易所。

```
[
  {
    "ticker": "BMO",
    "conid": 5094,
    "exchange": "NYSE"
  },
  {...},
  {
    "ticker": "ZKH",
    "conid": 671347171,
    "exchange": "NYSE"
  }
]
```
