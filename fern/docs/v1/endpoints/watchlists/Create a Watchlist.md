# 创建自选列表

创建一个自选列表以监控一系列合约。

`POST /iserver/watchlist`

#### Request Object

###### Body Params

**id:** String. Required\
提供一个唯一标识符来跟踪给定的自选列表。必须提供数字。

**name:** String. Required\
提供给定自选列表的可读名称。该名称会显示在 TWS 和 Client Portal 中。

**rows:** Array of Objects. Required\
\[\{\
**C:** int.\
提供要添加的 conid（合约标识符）。

**H:** Empty String.\
可用于在自选列表中的合约之间添加一个空行。\
}]

#### Python

```python
request_url = f"{baseUrl}/iserver/watchlist"
json_content = {
  "id":"1234",
  "name":"Test Watchlist",
  "rows":[
    {"C":8314},
    {"C":8894}
  ]
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/watchlist \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "id":"1234",
  "name":"Test Watchlist",
  "rows":[
    {"C":8314},
    {"C":8894}
  ]
}'
```

#### Response Object

**id:** String.\
返回用于创建自选列表的 id 值。

**hash:** String.\
返回该订单的内部 IB 哈希值。

**name:** String.\
返回自选列表的可读名称。

**readOnly:** bool.\
确定该自选列表是否被标记为写入受限。

**instruments:** Empty Array.\
始终返回一个空数组。\
所提供的 conid 仍会出现在最终的自选列表中。\
更多详情请参阅 [/iserver/watchlist?id](/v1/endpoints/watchlists/get-all-watchlists) 端点。

```
{
  "id": "1234",
  "hash": "1702581306241",
  "name": "Test Watchlist",
  "readOnly": false,
  "instruments": []
}
```
