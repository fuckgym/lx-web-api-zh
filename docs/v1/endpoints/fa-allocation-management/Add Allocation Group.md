# 添加分配组

添加一个新的分配组。该组可用于交易。

`POST /iserver/account/allocation/group`

#### Request Object

###### Body Params

**name:** String. Required Required\
用于指代你的分配组的名称。下单时会用到该名称。

**accounts:** Array of objects. Required\
包含一系列对象，描述涉及哪些账户，以及对于用户自定义分配方法，每个子账户的分配值。\
\[\{\
**name:** String. Required\
给定子账户的 accountId。\
取值格式："U1234567"

**amount:** Number.\
对于用户自定义的分配方法，每个子账户的总分配值。\
}]\
**default\_method:** String.\
为分配组指定分配方法代码。\
详情请参阅分配方法代码（Allocation Method Codes）。

#### Python

```python
request_url = f"{baseUrl}/iserver/account/allocation/group"
json_content = {
  "name":"Group_1_NetLiq",
  "accounts":[{
    "name":"U1234567",
    "amount":10
  },{
    "name":"U2345678",
    "amount":5
  }],
  "default_method":"N"
}
requests.post(url=request_url, json=json_content
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/allocation/group \
--request POST
--header 'Content-Type:application/json' \
--data '{
  "name":"Group_1_NetLiq",
  "accounts":[{
    "name":"U1234567",
    "amount":10
  },{
    "name":"U2345678",
    "amount":5
  }],
  "default_method":"N"
}'
```

#### Response Object

**success:** bool.\
确认分配组已正确设置。

```
{
  "success": true
}
```
