# 系统连接消息

初次连接 websocket 时,system 主题会连同对应用户名返回一条确认消息。websocket 连接建立后,此后每 10 秒会返回一次带有对应 unix 时间(毫秒格式)的心跳消息。

**topic:** 字符串。\
返回该请求的主题。

**success:** 字符串。\
返回建立该 websocket 连接所登录的用户名。

```
{
    "topic": "system" ,
    "success": "success"
}
```
