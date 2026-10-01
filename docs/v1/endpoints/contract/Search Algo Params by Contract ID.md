# 按合约 ID 搜索算法参数

返回合约支持的 IB 算法（Algo）。

在获取信息之前必须先提交一个预检请求（pre-flight request）。

`GET /iserver/contract/{{ conid }}/algos`

#### 请求对象

###### 路径参数

**conid:** String。必填\
所关注的目标合约的合约标识符。

###### 查询参数

**algos:** String。可选\
以 ";" 分隔的 algo id 列表，用于过滤。\
最多可指定 8 个 algo id。\
对 algo id 区分大小写。

**addDescription:** String。可选\
是否在响应中添加算法描述。设为 1 表示是，0 表示否。

**addParams:** String。可选\
是否显示算法参数。设为 1 表示是，0 表示否。

#### Python

```python
request_url = f"{baseUrl}/iserver/contract/265598/algos?algos=Adaptive;Vwap&addDescription=1&addParams=1"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/contract/265598/algos?algos=Adaptive;Vwap&addDescription=1&addParams=1 \
--request GET
```

#### 响应对象

**algos:** 对象数组。\
包含该合约所有相关的算法。

\[\{

**name:** String。\
算法的通用名称。

**id:** String。\
用于请求的算法标识符。

**parameters:** 对象数组。\
与给定算法相关的所有参数。\
仅在 addParams=1 时返回。

\[\{

**guiRank:** int。\
算法的位置排序。用于 Client Portal。

**defaultValue:** int。\
参数的默认值。

**name:** String。\
参数名称。

**id:** String。\
该算法的参数标识符。

**legalStrings:** Array\
该参数允许的取值。

**required:** String。\
说明下该算法订单下单时是否必须提供该参数。\
返回布尔值的字符串表示。

**valueClassName:** String。\
返回该参数的变量类型。\
}]\
}]

```
{
  "algos": [
    {
      "name": "Adaptive",
      "id": "Adaptive",
      "parameters": [
        {
          "guiRank": 1,
          "defaultValue": "Normal",
          "name": "Adaptive order priority/urgency",
          "id": "adaptivePriority",
          "legalStrings": [
            "Urgent",
            "Normal",
            "Patient"
          ],
          "required": "true",
          "valueClassName": "String"
        }
      ]
    },
    {
      "name": "VWAP",
      "id": "Vwap",
      "parameters": [
        {
          "guiRank": 5,
          "defaultValue": false,
          "name": "Attempt to never take liquidity",
          "id": "noTakeLiq",
          "valueClassName": "Boolean"
        },
        {
          "guiRank": 11,
          "defaultValue": false,
          "name": "Opt-out closing auction",
          "id": "optoutClosingAuction",
          "valueClassName": "Boolean"
        },
        {
          "guiRank": 4,
          "defaultValue": false,
          "name": "Allow trading past end time",
          "id": "allowPastEndTime",
          "valueClassName": "Boolean"
        },
        {
          "guiRank": 8,
          "defaultValue": false,
          "name": "Speed up when market approaches limit price",
          "description": "Compensate for decreased fill rate due to presence of limit price.",
          "id": "speedUp",
          "enabledConditions": [
            "MKT:speedUp:=:no"
          ],
          "valueClassName": "Boolean"
        },
        {
          "guiRank": 12,
          "name": "Trade when price is more aggressive than:",
          "description": "Evaluates with bid for buy order and ask for sell order",
          "id": "conditionalPrice",
          "valueClassName": "Double"
        },
        {
          "guiRank": 2,
          "name": "Start Time",
          "description": "Defaults to start of market trading",
          "id": "startTime",
          "valueClassName": "Time"
        },
        {
          "guiRank": 1,
          "minValue": 0.01,
          "maxValue": 50,
          "name": "Max Percentage",
          "description": "From 0.01 to 50.0",
          "id": "maxPctVol",
          "valueClassName": "Double"
        },
        {
          "guiRank": 3,
          "name": "End Time",
          "description": "Defaults to end of market trading",
          "id": "endTime",
          "valueClassName": "Time"
        }
      ]
    }
  ]
}
```
