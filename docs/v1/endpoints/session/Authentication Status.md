# 身份验证状态

当前与经纪系统的身份验证状态。如果未通过身份验证(例如 authenticated 显示为 false),则无法进行市场数据订阅和交易。

`POST /iserver/auth/status`

#### 请求对象

不应发送任何参数或请求体内容。

#### Python

```python
request_url = f"{baseUrl}/iserver/auth/status"
json_content = {}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/auth/status \
--request POST \
--header 'Content-Type:application/json' \
--data '{}'
```

#### 响应对象

**authenticated:** bool。\
返回您的经纪会话是否已通过身份验证。

**competing:** bool。\
返回您是否在另一个连接中存在竞争的经纪会话。

**connected:** bool。\
返回您是否已连接到网关(无论是否已通过身份验证)。

**message:** String。\
如果有关于您身份验证状态的消息,将在此返回。\
已通过身份验证的会话返回空字符串。

**MAC:** String。\
IBKR MAC 信息。仅供内部使用。

**serverInfo:** Object(对象)。

**serverName:** String。\
IBKR 服务器信息。仅供内部使用。

**serverVersion:** String。\
IBKR 版本信息。仅供内部使用。

**hardware\_info:** String。\
IBKR 版本信息。仅供内部使用。

**fail:** String。\
返回获取身份验证状态失败的原因。

```
{
  "authenticated": true,
  "competing": false,
  "connected": true,
  "message": "",
  "MAC": "12:B:B3:23:BF:A0",
  "serverInfo": {
    "serverName": "JifN19053",
    "serverVersion": "Build 10.25.0p, Dec 5, 2023 5:48:12 PM"
  },
  "hardware_info": "3b0679ee|98:A2:B3:23:BC:A0",
  "fail": ""
}
```

#### 替代响应对象

已超时或已退出会话的用户将得到 "false" 的身份验证状态,表明该用户未维持经纪会话。

```
{
  "authenticated": false,
  "competing": false,
  "connected": false,
  "MAC": "98:B2:C3:45:DE:F6"
}
```
