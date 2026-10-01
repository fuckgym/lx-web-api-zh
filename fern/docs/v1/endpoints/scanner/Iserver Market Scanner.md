# Iserver 市场扫描器

根据 /iserver/scanner/params 端点中指定的筛选条件搜索合约。

用户单次请求最多可接收 50 个合约。

`POST /iserver/scanner/run`

#### 请求对象

###### 正文参数

**instrument:** String。必填\
作为市场扫描器请求目标的品种类型。\
可在 /iserver/scanner/params 响应的 "instrument\_list" 部分中找到。

**type:** String。必填\
市场扫描器排序所依据的扫描器值。\
基于 /iserver/scanner/params 响应的 "scan\_type\_list" 部分。

**location:** String。必填\
市场扫描器搜索的位置值。\
基于 /iserver/scanner/params 响应的 "location\_tree" 部分。

**filter:** 对象数组。\
包含应应用于响应的任何附加筛选条件。\
\[\{\
**code:** String。\
筛选条件的 code 值。\
基于 /iserver/scanner/params 响应的 "filter\_list" 部分内的 "code" 值。

**value:** int。\
与 "code" 输入对应的值。\
}]

#### Python

```python
request_url = f"{baseUrl}/iserver/scanner/run"
json_content = {
  "instrument": "STK",
  "location": "STK.US.MAJOR",
  "type": "TOP_TRADE_COUNT",
  "filter": [
    {
      "code":"priceAbove",
      "value":5
    }
  ]
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl/iserver/scanner/run \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "instrument": "STK",
  "location": "STK.US.MAJOR",
  "type": "TOP_PERC_GAIN",
  "filter": [
    {
      "code":"priceAbove",
      "value":5
    }
  ]
}'
```

#### 响应对象

**contracts:** 对象数组。\
包含与市场扫描器请求相关的合约。\
\[\{\
**server\_id:** String。\
合约相对于该市场扫描器类型排序优先级的索引。

**column\_name:** String。\
始终为第一个合约返回。\
用于 Client Portal(仅内部使用)

**symbol:** String。\
返回合约的股票代码(ticker symbol)。

**conidex:** String。\
返回该合约的合约 ID。

**con\_id:** int。\
返回该合约的合约 ID。

**available\_chart\_periods:** String。\
用于 Client Portal(仅内部使用)

**company\_name:** String。\
返回公司全称。

**contract\_description\_1:** String。\
对于期货等衍生品,将返回合约的本地代码(local symbol)。

**listing\_exchange:** String。\
返回该合约的主要上市交易所。

**sec\_type:** String。\
返回该合约的证券类型。\
}],

**scan\_data\_column\_name:** String。\
用于 Client Portal(仅内部使用)

```
{
  "contracts": [
    {
      "server_id": "0",
      "symbol": "AMD",
      "conidex": "4391",
      "con_id": 4391,
      "available_chart_periods": "#R|1",
      "company_name": "ADVANCED MICRO DEVICES",
      "scan_data": "163.773K",
      "contract_description_1": "AMD",
      "listing_exchange": "NASDAQ.NMS",
      "sec_type": "STK"
    }
  ],
  "scan_data_column_name": "Trades"
}
```
