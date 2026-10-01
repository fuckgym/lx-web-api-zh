# 切换账户

切换用于请求数据的活动账户。

仅适用于财务顾问和多账户结构。

`POST /iserver/account`

#### 请求对象:

###### 请求体参数

**acctId:** *String*。必填\
要从中获取信息的唯一账户的标识符。\
值格式:"DU1234567"

#### Abap

```abap
request_url = f"{baseUrl}/iserver/account"
json_content = {
  "acctId": "U1234567,
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "acctId": "U1234567,
}'
```

#### 响应对象:

**set:** bool。\
确认账户切换已设置。

**acctId:** String。\
确认已切换到的账户。

```
{
    "set": true,
    "acctId": "U1234567
}
```
