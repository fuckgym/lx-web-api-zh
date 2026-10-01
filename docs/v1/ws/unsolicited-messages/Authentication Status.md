# 认证状态

初次连接到 websocket 端点时,主题 sts 会回传用户当前的认证状态。认证状态的更新(例如由竞争会话所导致的变化)也会通过该主题回传给 websocket 客户端。

**topic:** 字符串。\
返回给定请求的主题。

**args:** 对象。\
返回数据对象。

**authenticated**\*\*:\*\* 布尔值。\
返回用户是否已通过经纪会话的身份验证。

```
{
    "topic": "sts" ,
    "args": {
        "authenticated": authenticated
    }
}
```
