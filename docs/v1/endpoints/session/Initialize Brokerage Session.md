# 初始化经纪会话

这对于使用 /portfolio 以外的所有端点至关重要，包括交易和市场数据的访问。

`POST /iserver/auth/ssodh/init`

#### Request Object

###### Body Params

**publish:** Boolean. Required\
决定是否应立即发送该请求。\
用户应始终传入 true。否则，将返回 '500' 响应。

**compete:** Boolean. Required\
决定是否应断开其他经纪会话以优先保证此连接。

#### Python

```python
request_url = "{baseUrl}/iserver/auth/ssodh/init"
json_content= {"publish":True,"compete":True}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/auth/ssodh/init \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "publish":true,
  "compete":true
}'
```

#### Response Object

**authenticated:** bool.\
返回你的经纪会话是否已通过认证。

**competing:** bool.\
返回你在另一个连接上是否存在竞争的经纪会话。

**connected:** bool.\
返回你是否已连接到网关，无论是否已认证。

**message:** String.\
如果有关于你认证状态的消息，将在此返回。\
已认证的会话返回空字符串。

**MAC:** String.\
IBKR MAC 信息。仅限内部使用。

**serverInfo:** Object.

**serverName:** String.\
IBKR 服务器信息。仅限内部使用。

**serverVersion:** String.\
IBKR 版本信息。仅限内部使用。

```
{
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
```
