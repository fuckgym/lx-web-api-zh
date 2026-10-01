# 账户表现

返回给定账户的表现(MTM);如果传入多个账户,结果将合并汇总。

`POST /pa/performance`

#### 请求对象

###### 正文参数

**acctIds:** 字符串数组。必填\
包含需要获取数据的每个账户 ID。

**period:** String。必填\
指定要分析账户的周期。\
可用值:"1D","7D","MTD","1M","YTD","1Y"

#### Python

```python
request_url = f"{baseUrl}/pa/performance"
json_content = {
  "acctIds": ["U1234567"]
  "period": "1D"
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
{{baseUrl}}/pa/performance \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "acctIds": ["U1234567", "U4567890"]
  "period": "1D"
}'
```

#### 响应对象

**currencyType:** String。\
确认货币类型。\
如果主要以基础货币进行交易,将返回 "base"。

**rc:** int。\
返回数据标识符(仅限 Client Portal)。

**nav:** Object。\
账户或合并账户的净资产值数据。NAV 数据不适用于基准。

**data:** 对象数组。\
包含关联的 'nav' 数据。

**idType:** String。\
返回标识符的确定方式。

**navs:** int。\
返回与所列日期对应的数据点序列。

**start:** String。\
返回数据的首个可用日期。

**end:** String。\
返回可用频率的结束值。

**id:** String。\
返回账户标识符。

**startNAV:** Object。\
返回可用的初始 NAV。

**date:** String。\
返回请求的起始日期。

**val:** int。\
返回账户的净资产值。

**baseCurrency:** String。\
返回账户使用的基础货币。

**freq:** String。\
显示与给定频率对应的值。

**dates:** 字符串数组。\
返回与频率对应的日期数组,其长度应与 data 中 returns 的长度相同。

**nd:** int。\
返回数据点总数。

**cps:** object。\
返回包含累计表现数据的对象。

**data:** 对象数组。\
返回可用的 cps 数据数组。

**idType:** String。\
返回请求的键值。

**start:** String。\
返回数值范围的起始值。

**end:** String。\
返回数值范围的结束值。

**returns:** 整数数组。\
按顺序返回 start 与 end 时间之间的所有 cps 值。

**id:** String。\
返回账户标识符。

**baseCurrency:** String。\
返回账户的基础货币。

**freq:** String。\
返回决定数据范围的频率。

**dates:** 字符串数组。\
返回与数据频率对应的日期。

**tpps:** Object。\
返回时间段表现(Time period performance)数据。

**data:** Array。\
包含 tpps 所有相关数据的对象。

**idType:** String。\
返回请求的键值。

**start:** String。\
返回数值范围的起始值。

**end:** String。\
返回数值范围的结束值。

**returns:** 整数数组。\
按顺序返回 start 与 end 时间之间的所有 cps 值。

**id:** String。\
返回账户标识符。

**baseCurrency:** String。\
返回账户的基础货币。

**freq:** String。\
返回决定数据范围的频率。

**dates:** 字符串数组。\
返回与数据频率对应的日期。

**id:** String。\
返回请求标识符 getPerformanceData。

**included:** Array。\
返回包含所审查账户的数组。

**pm:** String。\
投资组合衡量指标(Portfolio Measure)。用于指示返回的是 TWR 还是 MWR 值。

```
{
  "currencyType": "base",
  "rc": 0,
  "nav": {
    "data": [
      {
        "idType": "acctid",
        "navs": [
          2.027673321223E8,
          {...},
          2.157185988239E8
        ],
        "start": "20230102",
        "end": "20231213",
        "id": "U1234567",
        "startNAV": {
          "date": "20221230",
          "val": 2.027677613449E8
        },
        "baseCurrency": "USD"
      }
    ],
    "freq": "D",
    "dates": [
      "20230102",
          {...},
      "20231213"
    ]
  },
  "nd": 346,
  "cps": {
    "data": [
      {
        "idType": "acctid",
        "start": "20230102",
        "end": "20231213",
        "returns": [
          0,
          {...},
          0.0639
        ],
        "id": "U1234567",
        "baseCurrency": "USD"
      }
    ],
    "freq": "D",
    "dates": [
      "20230102",
          {...},
      "20231213"
    ]
  },
  "tpps": {
    "data": [
      {
        "idType": "acctid",
        "start": "20230102",
        "end": "20231213",
        "returns": [
          0.0037,
          0.0031,
          0.0033,
          0.0034,
          0.02,
          0.0127,
          0.0036,
          0.0036,
          0.0034,
          0.0012,
          0.0026,
          0.0017
        ],
        "id": "U1234567",
        "baseCurrency": "USD"
      }
    ],
    "freq": "M",
    "dates": [
      "202301",
      "202302",
      "202303",
      "202304",
      "202305",
      "202306",
      "202307",
      "202308",
      "202309",
      "202310",
      "202311",
      "202312"
    ]
  },
  "id": "getPerformanceData",
  "included": [
    "U1234567"
  ],
  "pm": "TWR"
}
```
