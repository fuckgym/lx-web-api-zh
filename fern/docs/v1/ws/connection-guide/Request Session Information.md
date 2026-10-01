# 请求会话信息

首先请求 [/tickle](/v1/endpoints/session/ping-the-server) 端点,并保存返回的 session 值。

```
{
    "session": "d21b8cf5ebc8ea01c6ce37c8125ec83f",
    "ssoExpires": ssoExpires,
    "collission": collission,
    "userId": userId,
    "hmds": {
        "error": "no bridge"
    },
    "iserver": {
        "authStatus": {
            "authenticated": true,
            "competing": false,
            "connected": true,
            "message": "",
            "MAC": "MAC",
            "serverInfo": {
                "serverName": "serverName",
                "serverVersion": "serverVersion"
            }
        }
    }
}
```
