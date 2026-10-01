# 访问频率限制

Interactive Brokers 目前对每个经过身份验证的用户名(即每个 Web API 会话)实施每秒 10 个请求的全局请求速率限制。

此外,部分端点还受制于各自的频率限制,如下表所述。

当超出速率限制时,Web API 将返回 `429 Too Many Requests` 状态码。

违规 IP 地址可能会被放入隔离区(penalty box)10 分钟。该时段结束后,该 IP 地址将从隔离区中移除。屡次违规的 IP 地址可能会被永久封禁,直至问题得到解决。

### 各端点请求速率限制

| 端点                                  | 方法   | 限制                      |
| ------------------------------------- | ------ | ------------------------- |
| `/iserver/marketdata/snapshot`        | GET    | 10 req/s                  |
| `/iserver/marketdata/history`         | GET    | 10 req/s 或 50 req/minute |
| `/iserver/scanner/params`             | GET    | 1 req/15 mins             |
| `/iserver/scanner/run`                | POST   | 1 req/sec                 |
| `/iserver/trades`                     | GET    | 1 req/5 secs              |
| `/iserver/orders`                     | GET    | 1 req/5 secs              |
| `/iserver/account/pnl/partitioned`    | GET    | 1 req/5 secs              |
| `/portfolio/accounts`                 | GET    | 1 req/5 secs              |
| `/portfolio/subaccounts`              | GET    | 1 req/5 secs              |
| `/pa/performance`                     | POST   | 1 req/15 mins             |
| `/pa/summary`                         | POST   | 1 req/15 mins             |
| `/pa/transactions`                    | POST   | 1 req/15 mins             |
| `/fyi/unreadnumber`                   | GET    | 1 req/sec                 |
| `/fyi/settings`                       | GET    | 1 req/sec                 |
| `/fyi/settings/{typecode}`            | POST   | 1 req/sec                 |
| `/fyi/disclaimer/{typecode}`          | GET    | 1 req/sec                 |
| `/fyi/disclaimer/{typecode}`          | PUT    | 1 req/sec                 |
| `/fyi/deliveryoptions`                | GET    | 1 req/sec                 |
| `/fyi/deliveryoptions/email`          | PUT    | 1 req/sec                 |
| `/fyi/deliveryoptions/device`         | POST   | 1 req/sec                 |
| `/fyi/deliveryoptions/{deviceId}`     | DELETE | 1 req/sec                 |
| `/fyi/notifications`                  | GET    | 1 req/sec                 |
| `/fyi/notifications/more`             | GET    | 1 req/sec                 |
| `/fyi/notifications/{notificationId}` | PUT    | 1 req/sec                 |
| `/tickle`                             | GET    | 1 req/sec                 |
| `/sso/validate`                       | GET    | 1 req/min                 |
