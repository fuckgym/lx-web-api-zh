# 按代码搜索股票证券

返回一个对象,其中包含给定股票代码的全部股票合约

`GET /trsrv/stocks`

#### 请求对象

###### 查询参数

**symbols**: String。\
以逗号分隔的股票代码列表。代码只能包含大写字母。

#### Python

```python
request_url = f"{baseUrl}/trsrv/stocks?symbols=AAPL,IBKR"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/trsrv/stocks?symbols=AAPL,IBKR\
--request GET
```

#### 响应对象

**symbol:** Json 数组\
包含与该代码匹配的所有合约的一系列 Json。

**name:** String。\
给定合约的完整公司名称。

**chineseName:** String。\
给定公司的中文名称。

**assetClass:** String。\
给定公司的资产类别。

**contracts:** 数组。\
与 "name" 所列出的同一家公司相关的一系列数组。\
通常基于主交易所的货币加以区分。

**conid:** int。\
特定合约的合约 ID。

**exchange:** String。\
给定合约的主上市交易所。

**isUS:** bool。\
表明该合约是否托管于美国。

```
{
  "AAPL": [
    {
      "name": "APPLE INC",
      "chineseName": "苹果公司",
      "assetClass": "STK",
      "contracts": [
        {
          "conid": 265598,
          "exchange": "NASDAQ",
          "isUS": true
        },
        {
          "conid": 38708077,
          "exchange": "MEXI",
          "isUS": false
        },
        {
          "conid": 273982664,
          "exchange": "EBS",
          "isUS": false
        }
      ]
    },
    {
      "name": "LS 1X AAPL",
      "chineseName": null,
      "assetClass": "STK",
      "contracts": [
        {
          "conid": 493546048,
          "exchange": "LSEETF",
          "isUS": false
        }
      ]
    },
    {
      "name": "APPLE INC-CDR",
      "chineseName": "苹果公司",
      "assetClass": "STK",
      "contracts": [
        {
          "conid": 532640894,
          "exchange": "AEQLIT",
          "isUS": false
        }
      ]
    }
  ]
}
```
