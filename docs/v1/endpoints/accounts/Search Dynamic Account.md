# 搜索动态账户

配置了 DYNACCT 属性的经纪账户在登录时不会接收账户信息。相反,它们必须动态查询并设置自己的账号。

此功能不适用于个人账户或财务顾问账户,仅适用于已获准使用 DYNACCT 属性的 IBrokers。

不具备 DYNACCT 属性的客户将收到以下消息

#### JSON

```json
{
    "error": "Details currently unavailable. Please try again later and contact client services if the issue persists.",
    "statusCode": 503
}
```

#### Python

```python
request_url 
 f"{baseUrl}/iserver/account/search/U123"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/search/U123 \
--request GET
```

#### 响应对象

**matchedAccounts:** 对象列表。\
包含一系列与所请求账户信息相关的对象。\
\[\{\
**accountId:** 字符串。\
返回与匹配值相对应的账户 ID。

**alias:** 字符串。\
返回特定账户 ID 对应的别名或替代名称。在大多数情况下,可能与 accountId 值相同。

**allocationId:** 字符串。\
返回该账户在内部使用的分配标识符。\
}]\
**pattern:** 字符串。\
显示请求所使用的 searchPattern。

```
{
  "matchedAccounts": [
    {
      "accountId": "U1234567",
      "alias": "U1234567",
      "allocationId": "1"
    }
  ],
  "pattern":"U123"
}
```
