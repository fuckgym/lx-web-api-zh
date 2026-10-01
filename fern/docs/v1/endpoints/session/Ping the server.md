# 向服务器发送 Ping

如果网关连续几分钟未收到任何请求，打开的会话将自动超时。tickle 端点会向服务器发送 ping 以防止会话结束。应大约每 60 秒调用一次该端点，以维持与经纪会话的连接。

`POST /tickle`

#### Request Object

不应发送任何参数或请求体内容。

#### Python

```python
request_url = f"{baseUrl}/tickle"
json_content = {}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \ 
--url {{baseUrl}}/tickle \
--request POST \
--header 'Content-Type:application/json' \
--data '{}'
```

#### Response Object

**session:** String.\
返回你连接的会话标识符。\
可用于请求的 cookie 参数。

**ssoExpires:** int.\
显示距会话过期的剩余时间（毫秒）。

**collission:** bool.\
仅限内部使用。

**userId:** int.\
仅限内部使用。

**hmds:** object.\
返回任何可能的历史数据相关信息。\
"No bridge" 表示当前没有请求历史数据。

**iserver:** object.\
返回 /iserver/auth/status 端点的内容。

```
{
  "session": "bb665d0f55b6289d70bc7380089fc96f",
  "ssoExpires": 460311,
  "collission": false,
  "userId": 123456789,
  "hmds": {
    "error": "no bridge"
  },
  "iserver": {
    "authStatus": {
      "authenticated": true,
      "competing": false,
      "connected": true,
      "message": "",
      "MAC": "98:F2:B3:23:BF:A0",
      "serverInfo": {
        "serverName": "JifN19053",
        "serverVersion": "Build 10.25.0p, Dec 5, 2023 5:48:12 PM"
      }
    }
  }
}
```
