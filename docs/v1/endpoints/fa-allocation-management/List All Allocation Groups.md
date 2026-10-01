# 列出所有分配组

检索该财务顾问所有分配组的列表。其中描述了分配组的名称、组内的子账户数量,以及该组所使用的分配方法。

`GET /iserver/account/allocation/group`

#### 请求对象

不应发送任何参数或请求体内容。

#### Python

```python
request_url = f"{baseUrl}/iserver/account/allocation/group" 
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/allocation/group \
--request GET
```

#### 响应对象

**data:** 对象数组。\
包含每个分配组的对象对\
\[\{\
**allocation\_method:** String。\
使用分配方法代码(Allocation Method Code)表示该组采用的方法。

**size:** int。\
表示该组内子账户的总数。

**name:** String。\
为给定分配组设置的名称。\
}]

```
{
  "data": [
    {
      "allocation_method": "N",
      "size": 10,
      "name": "Group_1_NetLiq"
    }
  ]
}
```
