# 投资组合配置(单个)

关于账户投资组合按资产类别(Asset Class)、行业(Industry)和类别(Category)划分的配置信息。在调用此端点之前,必须先调用 /portfolio/accounts 或 /portfolio/subaccounts。

`GET /portfolio/{accountId}/allocation`

#### 请求对象

###### 路径参数(Path Params)

**accountId:** 字符串。必填\
指定该请求的账户 ID。

#### Python

```python
request_url = f"{baseUrl}/portfolio/U1234567/allocation"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/portfolio/U1234567/allocation \
--request GET
```

#### 响应对象

**assetClass:** 对象。\
包含与特定证券类型相关的细节。\
\{\
**long:** 对象。\
返回当前做多的资产类别的价值。

**short:** 对象。\
返回当前做空的资产类别的价值。\
},

**sector:** 对象。\
包含与特定交易板块(sector)相关的细节。\
\{\
**long:** 对象。\
返回当前做多的交易板块的价值。

**short:** 对象。\
返回当前做空的交易板块的价值。\
},

**group:** 对象。\
包含与特定行业组(group)相关的细节。\
\{\
**long:** 对象。\
返回当前做多的行业组的价值。

**short:** 对象。\
返回当前做空的行业组的价值。\
}

```
{
  "assetClass": {
    "long": {
      "OPT": 27.12,
      "STK": 317071.39468663215,
      "CASH": 2.1510110008312488E8
    },
    "short": {
      "OPT": -30.0,
      "CASH": -25.917167515158653
    }
  },
  "sector": {
    "long": {
      "Others": 5628.650040692091,
      "Technology": 237511.16,
      "Industrial": 43134.63,
      "Consumer, Cyclical": 22537.62620745659,
      "Financial": 2504.35,
      "Communications": 5116.61,
      "Consumer, Non-cyclical": 665.4884384834767
    },
    "short": {
      "Others": -30.0
    }
  },
  "group": {
    "long": {
      "Computers": 121517.38,
      "Others": 5628.650040692091,
      "Semiconductors": 115993.78,
      "Auto Manufacturers": 22537.62620745659,
      "Banks": 2504.35,
      "Miscellaneous Manufactur": 43134.63,
      "Internet": 5116.61,
      "Beverages": 649.07,
      "Pharmaceuticals": 16.41843848347664
    },
    "short": {
      "Others": -30.0
    }
  }
}
```
