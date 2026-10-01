# 所有周期

返回给定账户在所有可用时间段内的表现;如果传入多个账户,结果将合并汇总。

`POST /pa/allperiods`

#### 请求对象

###### 正文参数

**acctIds:** 字符串数组。必填\
包含需要获取数据的每个账户 ID。

#### Python

```python
request_url = f"{baseUrl}/pa/performance"
json_content = {
  "acctIds": ["U1234567"]
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
{{baseUrl}}/pa/allperiods\
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "acctIds": ["U1234567", "U4567890"]}'
```

#### 响应对象

**currencyType:** String。\
确认货币类型。\
如果完全以基础货币进行交易,将返回 "base"。

**rc:** int。\
返回数据标识符(仅限 Client Portal)。

**view:** 字符串数组。\
返回响应中包含的账户。

**nd:** int。\
返回数据点总数。

**id:** String。\
返回请求标识符。\
仅供内部使用。

**included:** 字符串数组。\
返回响应中包含的账户。

**pm:** String。\
投资组合衡量指标(Portfolio Measure)。用于指示返回的是 TWR 还是 MWR 值。

**\{AccountID}:** Object。\
返回所引用对象的账户标识符。

**\{Period Value}:** Object。\
指定数据覆盖的周期。\
可能取值:"1D","7D","MTD","1M","YTD","1Y"\
\{\
**nav:** Object。\
账户或合并账户的净资产值数据。NAV 数据不适用于基准。

**cps:** 整数数组。\
返回包含该周期内累计表现数据的数组。

**freq:** String。\
显示与给定频率对应的值。

**dates:** 字符串数组。\
返回与频率对应的日期数组,其长度应与 data 中 returns 的长度相同。

**startNAV:** Object。\
返回可用的初始 NAV。\
\{\
**date:** String。\
返回请求的起始日期。

**val:** int。\
返回账户的净资产值。\
}\
}

**periods:** String。\
返回响应中包含的周期范围。

**start:** String。\
返回数值范围的起始值。

**end:** String。\
返回可用频率的结束值。

**baseCurrency:** String。\
返回账户使用的基础货币。

```
{
    "currencyType": "base",
    "rc": 0,
    "view": [
        "U1234567"
    ],
    "nd": 366,
    "id": "getPerformanceAllPeriods",
    "included": [
        "U1234567"
    ],
    "pm": "TWR",
    "U1234567": {
        "1D": {
            "nav": [
                3666392.5393
            ],
            "cps": [
                0.0005
            ],
            "freq": "D",
            "dates": [
                "20250603"
            ],
            "startNAV": {
                "date": "20250602",
                "val": 3664681.7504
            }
        },
        "lastSuccessfulUpdate": "2025-06-03 15:22:03",
        "start": "20240603",
        "YTD": {
            "nav": [
                3674381.3273,
                ...,
                3666392.5393
            ],
            "cps": [
                0,
                -0.0061,
                ...,
                -0.0021
            ],
            "freq": "D",
            "dates": [
                "20250101",
                ...,
                "20250603"
            ],
            "startNAV": {
                "date": "20241231",
                "val": 3674236.8245
            }
        },
        "1Y": {
            "nav": [
                3072764.5772,
                ...,
                3666392.5393
            ],
            "cps": [
                0.0054,
                ...,
                0.1996
            ],
            "freq": "D",
            "dates": [
                "20240603",
                ...,
                "20250603"
            ],
            "startNAV": {
                "date": "20240531",
                "val": 3056403.4525
            }
        },
        "periods": [
            "1D",
            "7D",
            "MTD",
            "1M",
            "YTD",
            "1Y"
        ],
        "end": "20250603",
        "MTD": {
            "nav": [
                3664681.7504,
                3666392.5393
            ],
            "cps": [
                0.003,
                0.0035
            ],
            "freq": "D",
            "dates": [
                "20250602",
                "20250603"
            ],
            "startNAV": {
                "date": "20250530",
                "val": 3653634.7799
            }
        },
        "1M": {
            "nav": [
                3626879.8271,
                ...,
                3666392.5393
            ],
            "cps": [
                -0.0046,
                ...,
                0.0063
            ],
            "freq": "D",
            "dates": [
                "20250505",
                ...,
                "20250603"
            ],
            "startNAV": {
                "date": "20250502",
                "val": 3643556.8781
            }
        },
        "7D": {
            "nav": [
                3649592.4093,
                ...,
                3666392.5393
            ],
            "cps": [
                -0.0005,
                ...,
                0.0041
            ],
            "freq": "D",
            "dates": [
                "20250528",
                ...,
                "20250603"
            ],
            "startNAV": {
                "date": "20250527",
                "val": 3651501.5873
            }
        },
        "baseCurrency": "USD"
    }
}
```
