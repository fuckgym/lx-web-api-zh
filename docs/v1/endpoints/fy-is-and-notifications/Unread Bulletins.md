# 未读公告

返回未读 fyi 的总数量

`GET /fyi/unreadnumber`

#### 请求对象

不应发送任何参数或请求体内容。

#### Python

```python
request_url = f"{baseUrl}/fyi/unreadnumber"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/fyi/unreadnumber \
--request GET
```

#### 响应对象

**BN:** 整数。\
返回未读公告的数量。

```
{
  "BN": 4
}
```
