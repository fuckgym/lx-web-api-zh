# 检索单个分配组

检索单个账户组的配置。这描述了分配组的名称、组中包含的具体账户，以及正在使用的分配方法和任何相关的数量。

`POST /iserver/account/allocation/group/single`

#### Request Object

###### Body Params

**name:** String. Required.\
现有分配组的名称。

#### Python

```python
request_url = f"{baseUrl}/iserver/account/allocation/group/single" 
json_content ={
  "name":"Group_1_NetLiq"
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/allocation/group/single \
--request POST
--header 'Content-Type:application/json' \
--data '{"name":"Group_1_NetLiq"}'
```

#### Response Object

\{ **name:** String. Required Required\
用于指代你的分配组的名称。下单时会用到该名称。

**accounts:** Array of objects. Required\
包含一系列对象，描述涉及哪些账户，以及对于用户自定义分配方法，每个子账户的分配值。\
\[\
\{\
**name:** String. Required\
给定子账户的 accountId。\
取值格式："U1234567"

**amount:** Number.\
对于用户自定义的分配方法，每个子账户的总分配值。\
}\
]\
**default\_method:** String.\
为分配组指定分配方法代码。\
详情请参阅分配方法代码（Allocation Method Codes）。\
}

```
{
  "name": "Group_1_NetLiq",
  "accounts": [
    {
      "amount": 1,
      "name": "DU1234567"
    },
    {
      "amount": 5,
      "name": "DU9876543"
    }
  ],
  "default_method": "R"
}
```
