# 维持会话(Ping)

#### WebSocket Ping 请求

###### 主题:

**tic**\
通过向 websocket 发送 ping 来保持 websocket 会话存活。\
要维持用于访问 /iserver 或 /ccp 端点的会话,请使用主题 **tic**。建议至少每分钟对会话执行一次 ping。

**注意:** 仍需每隔几分钟或当会话过期时(/sso/validate 返回 0)向 /tickle 端点发送请求。

不要传递参数

```
tic
```
