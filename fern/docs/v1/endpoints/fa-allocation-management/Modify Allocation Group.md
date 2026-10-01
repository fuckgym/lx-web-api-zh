# 修改分配组

修改现有的分配组。

`PUT /iserver/account/allocation/group`

#### Request Object

###### Body Params

**name:** String. Required Required\
用于指代你的分配组的名称。如果指定了 prev\_name，这将成为该组的新名称。

**prev\_name:** String.\
用于指代你现有分配组的名称。\
仅在更新组名称时使用。

**accounts:** Array of objects. Required\
包含一系列对象，描述涉及哪些账户，以及对于用户自定义分配方法，每个子账户的分配值。\
\[\{\
**name:** String. Required\
给定子账户的 accountId。\
取值格式："U1234567"

**amount:** Number.\
对于用户自定义的分配方法，每个子账户的总分配值。\
}]\
**default\_method:** String. Required\
为分配组指定分配方法代码。\
详情请参阅分配方法代码（Allocation Method Codes）。

#### Python

```python
request_url = f"{baseUrl}/iserver/account/allocation/group"
json_content = {
  "name":"Group_1_NetLiq",
  "accounts":[{
    "name":"U1234567",
    "amount":15
  },{
    "name":"U2345678",
    "amount":10
  }],
  "default_method":"N"
}
requests.put(url=request_url, json=json_content
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/allocation/group \
--request PUT
--header 'Content-Type:application/json' \
--data '{
  "name":"new_test_group",
  "prev_name":"Group_1_NetLiq",
  "accounts":[{
    "name":"U1234567",
    "amount":10
  },{
    "name":"U2345678",
    "amount":5
  }],
  "default_method":"A"
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
