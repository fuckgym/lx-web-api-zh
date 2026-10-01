# 实时市场数据快照

获取给定 conid 的市场数据。

在首次接收数据之前必须先发出预检请求（pre-flight request）。某些字段可能需要等待片刻才能收到信息。

请参阅响应字段部分，以获取可通过 fields 参数请求的可用字段列表。

在调用 /iserver/marketdata/snapshot 之前，必须先调用 /iserver/accounts 端点。

对于衍生品合约，必须先调用 /iserver/secdef/search 端点。

#### Abap

```abap
GET /iserver/marketdata/snapshot
```

#### Python

```python
request_url = f"{baseUrl}/iserver/marketdata/snapshot?conids=265598,8314&fields=31,84,86"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/marketdata/snapshot?conids=265598,8314&fields=31,84,86 \ 
--request GET
```

#### Response Object

**server\_id:** String.\
返回请求的标识符。

**conidEx:** String.\
返回传入的 conid 字段。如果请求中指定了交易所，则可能包含交易所信息。

**conid:** int.\
返回请求的合约 ID。

**\_updated:** int\*.\
以 13 位整数返回更新的 epoch 时间。

**6119:** String.\
server\_id 的字段值。返回请求的标识符。

**fields\*:** String.\
对每个请求返回一个响应。某些字段可能不像其他字段那样容易获取。更多信息请参阅 [Market Data Fields](/web-api/v1/endpoints/market-data/market-data-fields)。

**6509:** String.\
返回一个多字符的值，代表[市场数据可用性](/web-api/v1/endpoints/market-data/market-data-availability)。

```
[
  {
    "_updated": 1702334859712,
    "conidEx": "265598",
    "conid": 265598,
    "server_id": "q1",
    "6119": "serverId",
    "31": "193.18",
    "84": "193.06",
    "86":"193.14", 
    "6509": "RpB"
  }
]
```
