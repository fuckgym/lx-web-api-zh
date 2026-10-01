# 设置动态账户

配置了 DYNACCT 属性的经纪账户在登录时不会接收到账户信息。相反,它们必须动态查询然后设置其账号。

此功能不适用于个人账户或财务顾问账户。仅对已获批准具有 DYNACCT 属性的 IBrokers 有效。

没有 DYNACCT 属性的客户将收到以下消息

#### JSON

```json
{
    "error": "Details currently unavailable. Please try again later and contact client services if the issue persists.",
    "statusCode": 503
}
```

#### Abap

```abap
request_url = f"{baseUrl}/iserver/dynaccount"
json_content = {
  "acctId": "U1234567
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/dynaccount \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "acctId": "U1234567
}'
```

#### 响应对象

**set:** bool。\
确认账户更改是否已完全设置。

**acctId:** String。\
已设置以供后续使用的账户 ID。

```
{
  "set": "true",
  "acctId": "U1234567",
}
```
