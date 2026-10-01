# 签名与持有人

获取账户上所有申请人姓名的列表,以及各姓名所代表的账户与实体。

`GET /acesws/{{ accountID }}/signatures-and-owners`

#### 请求对象

###### 路径参数(Path Params)

**accountId:** 字符串。必填\
传入要获取信息的账户标识符。\
有效结构:"U1234567"

#### Python

```python
request_url = f"{baseUrl}/acesws/U1234567/signatures-and-owners"
request.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/acesws/U1234567/signatures-and-owners \
--request GET
```

#### 响应对象

**accountId:** 字符串。\
请求中指定的账户标识符。

**users:** 对象数组。\
返回与该账户关联的所有用户名及其信息。\
\[\{\
**roleId:** 字符串。\
返回该用户名相对于账户的角色。

**hasRightCodeInd:** bool。\
仅限内部使用。

**username:** 字符串。\
返回账户下该特定用户的用户名。

**entity:** 对象。\
提供特定实体的信息。\
\{\
**firstName:** 字符串。\
返回用户的名字。

**lastName:** 字符串。\
返回用户的姓氏。

**entityType:** 字符串。\
返回分配给该用户的实体类型。\
有效值:"INDIVIDUAL"、"Joint"、"ORG"

**entityName:** 字符串。\
返回完整的实体名称,由名字和姓氏字段拼接而成。\
}}]

**applicant:** 对象。\
提供账户所列个人的信息。\
\{\
**signatures:** 字符串数组。\
返回附着于该账户的所有姓名。\
}

```
{
  "accountId": "U1234567",
  "users": [
    {
      "roleId": "OWNER",
      "hasRightCodeInd": true,
      "userName": "user1234",
      "entity": {
        "firstName": "John",
        "lastName": "Smith",
        "entityType": "INDIVIDUAL",
        "entityName": "John Smith"
      }
    },
    {
      "roleId": "Trustee",
      "hasRightCodeInd": False,
      "userName": "user5678",
      "entity": {
        "firstName": "Jane",
        "lastName": "Doe",
        "entityType": "INDIVIDUAL",
        "entityName": "Jane Doe"
      }
    }
  ],
  "applicant": {
    "signatures": [
      "John Smith",
      "Jane Doe"
    ]
  }
}
```
