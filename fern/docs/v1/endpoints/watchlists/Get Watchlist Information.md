# 获取自选列表信息

请求特定自选列表中所列的合约。

`GET /iserver/watchlist`

#### Request Object

###### Query Params

**id:** String. Required\
设置为你要获取数据的自选列表 ID。

#### Python

```python
request_url = f"{baseUrl}/iserver/watchlist?id=1234"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/watchlist?id=1234 \
--request GET
```

#### Response Object

首次请求可能只返回 C、conid 和 name 值。后续请求将添加更多合约信息。

**id:** String.

**hash:** String.

**name:** String.

**readOnly:** bool.

**instruments:** Array of Objects.\
\[\{\
**C:** String.\
返回合约 ID。

**conid:** int.\
返回合约 ID。

**name:** String.\
返回公司的完整名称。

**fullName:** String.\
返回合约的本地代码（local symbol）。

**assetClass:** String.\
返回合约的证券类型。

**ticker:** String.\
返回合约的股票代码（ticker symbol）。

**chineseName:** String.\
返回合约的中文（汉字）名称。\
}]

```
{
  "id": "1234",
  "hash": "1702581306241",
  "name": "Test Watchlist",
  "readOnly": false,
  "instruments": [
    {
      "ST": "STK",
      "C": "8314",
      "conid": 8314,
      "name": "INTL BUSINESS MACHINES CORP",
      "fullName": "IBM",
      "assetClass": "STK",
      "ticker": "IBM",
      "chineseName": "国际商业机器"
    },
    {
      "ST": "STK",
      "C": "8894",
      "conid": 8894,
      "name": "COCA-COLA CO/THE",
      "fullName": "KO",
      "assetClass": "STK",
      "ticker": "KO",
      "chineseName": "可口可乐"
    }
  ]
}
```
