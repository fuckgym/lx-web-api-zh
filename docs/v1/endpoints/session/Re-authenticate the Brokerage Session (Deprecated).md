# 重新验证经纪会话(已弃用)

使用 CP Gateway 时,只要存在有效的经纪会话,该端点便提供了一种向经纪系统重新进行身份验证的方法。

重新验证网关会话的相关需求,均应改用 /iserver/auth/ssodh/init 端点处理。

`POST /iserver/reauthenticate`

#### 请求对象

不应发送任何参数或请求体内容。

#### Python

```python
request_url = f"{baseUrl}/iserver/reauthenticate"
json_content = {}
requests.post(url=request_url, json=json_content )
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/reauthenticate \ 
--request POST \ 
--header 'Content-Type:application/json' \ 
--data '{}'
```

#### 响应对象

**message:** String。\
返回 "triggered",表示响应已发送。

```
{
  "message": "triggered"
}
```
