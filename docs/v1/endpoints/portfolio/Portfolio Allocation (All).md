# 投资组合配置(全部)

与 /portfolio/\{accountId}/allocation 类似,但返回 /portfolio/accounts 所返回的所有账户的合并视图。在调用此端点之前,必须先调用 /portfolio/accounts 或 /portfolio/subaccounts。

`POST /portfolio/allocation`

#### 请求对象

###### 正文参数(Body Params)

**acctIds:** 字符串数组。必填\
以字符串形式包含用户应获取数据的所有账户 ID。

#### Python

```python
request_url = f"{baseUrl}/portfolio/allocation"
json_content = {
  "acctIds": [
    "U1234567",
    "U4567890"
  ]
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/portfolio/allocation \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "acctIds": [
    "U1234567",
    "U4567890"
  ]
}'
```

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
      "STK": 316441.2320366,
      "CASH": 2.1510102008312488E8
    },
    "short": {
      "OPT": -30.0,
      "CASH": -25.923946709036827
    }
  },
  "sector": {
    "long": {
      "Others": 5624.600040692091,
      "Technology": 237014.72999999998,
      "Industrial": 43077.12,
      "Consumer, Cyclical": 22453.78620745659,
      "Financial": 2503.3599999999997,
      "Communications": 5126.98,
      "Consumer, Non-cyclical": 667.7757884514332
    },
    "short": {
      "Others": -30.0
    }
  },
  "group": {
    "long": {
      "Computers": 121222.53,
      "Others": 5624.600040692091,
      "Semiconductors": 115792.2,
      "Auto Manufacturers": 22453.78620745659,
      "Banks": 2503.3599999999997,
      "Miscellaneous Manufactur": 43077.12,
      "Internet": 5126.98,
      "Beverages": 651.35,
      "Pharmaceuticals": 16.42578845143318
    },
    "short": {
      "Others": -30.0
    }
  }
}
```
