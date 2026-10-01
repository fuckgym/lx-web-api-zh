# 按标的代码查询证券期货

返回给定标的代码对应的未到期期货合约列表。

`GET /trsrv/futures`

#### Request Object

###### Query Params

**symbols**: *String*. Required\
指定你想要获取期货的标的的代码（symbol）。接受以逗号分隔的代码字符串。

#### Python

```python
request_url = f"{baseUrl}/trsrv/futures?symbols=ES,MES"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/trsrv/futures?symbols=ES,MES \
--request GET
```

#### Response Body

**symbol:** Array\
以你的标的代码字符串形式显示\
包含一系列对象，每个对象对应一个与请求匹配的标的代码。

**symbol:** String.\
请求的标的代码值。

**conid:** int.\
该特定标的代码的合约标识符。

**underlyingConid:** int.\
该期货标的合约的合约标识符。

**expirationDate:** int.\
该特定期货合约的到期日。

**ltd:** int.\
该期货合约的最后交易日。

**shortFuturesCutOff:** int.\
表示空头期货合约展期的最后一天。

**longFuturesCutOff:** int.\
表示多头期货合约展期的最后一天。

```
{
  "ES": [
    {
      "symbol": "ES",
      "conid": 495512552,
      "underlyingConid": 11004968,
      "expirationDate": 20231215,
      "ltd": 20231214,
      "shortFuturesCutOff": 20231214,
      "longFuturesCutOff": 20231214
    },
    {...}
  ],
  "MES": [
    {
      "symbol": "MES",
      "conid": 586139726,
      "underlyingConid": 362673777,
      "expirationDate": 20231215,
      "ltd": 20231215,
      "shortFuturesCutOff": 20231215,
      "longFuturesCutOff": 20231215
    },
    {...}
  ]
}
```
