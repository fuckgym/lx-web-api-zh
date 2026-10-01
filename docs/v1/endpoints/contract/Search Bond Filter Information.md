# 债券搜索筛选条件信息

请求与给定债券(Bond)issuerID 相关的筛选条件列表。issuerId 可通过 [/iserver/secdef/search](/web-api/v1/endpoints/contract/search-contract-by-symbol) 获取,并可在 [/iserver/secdef/info?issuerId=\{\{ issuerId }}](/web-api/v1/endpoints/contract/search-sec-def-information-by-conid) 中用于检索 conIds。

`/iserver/secdef/bond-filters`

#### 请求对象

###### 查询参数(Query Params)

**symbol:** 字符串。必填\
此值应始终设置为 "BOND"。

**issuerId:** 字符串。必填\
指定用于标识债券发行人类型的 issuerId 值。

#### Python

```python
request_url = f"{baseUrl}/iserver/secdef/bond-filters?symbol=BOND&issuerId=e1400715"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/secdef/bond-filters?symbol=BOND&issuerId=e1400715 \
--request GET
```

**bondFilters:** 对象数组。\
包含与给定 issuerId 相关的所有筛选条件。\
\[\{\
**displayText:** 字符串。\
用于记录返回选项/值的标识符。可以将其理解为一个键值(key)。

**columnId:** int。\
用于用户界面。仅限内部使用。

**options:** 对象数组。\
包含值对应于父级 displayText 键的所有对象。\
\[\{\
**text:** 字符串。\
在某些情况下,会返回一个文本值,表示标准化后的值格式,例如明文日期,而不仅仅是数值。

**value:** 字符串。\
返回与 displayText 键直接对应的值。可能包括交易所、到期日、发行日、票息(coupon)或货币。

}]

}]

```
{
  "bondFilters": [
    {
      "displayText": "Exchange",
      "columnId": 0,
      "options": [
      {
        "value": "SMART"
      }]
    },
    {
      "displayText": "Maturity Date",
      "columnId": 27,
      "options": [
        {
          "text": "Jan 2025",
          "value": "202501"
      }]
    },
    {
      "displayText": "Issue Date",
      "columnId": 28,
      "options": [{
        "text": "Sep 18 2014",
        "value": "20140918"
      }]
    },
    {
      "displayText": "Coupon",
      "columnId": 25,
      "options": [{
        "value": "1.301"
      }]
    },
    {
      "displayText": "Currency",
      "columnId": 5,
      "options": [{
        "value": "EUR"
      }]
    }
  ]
}
```
