# 注销当前会话

将用户从网关会话中注销。之后的任何操作都需要重新进行身份验证。

`POST /logout`

#### 请求对象

无需发送任何参数或请求体内容。

#### Python

```python
request_url = "{baseUrl}/logout"
json_content= {}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/logout \
--request POST \
--header 'Content-Type:application/json' \
--data '{}'
```

#### 响应对象

**status:** 布尔值。\
如果会话已结束,则返回 true。

```
{
  "status":true
}
```
