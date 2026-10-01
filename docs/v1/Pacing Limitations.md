# 访问频率限制

Interactive Brokers 已对可通过 Web API 访问的端点实施了访问频率限制。

* 全局限制为每秒总计 10 个请求。
* 部分端点还有各自的专属限制。这些限制见下表。
* 下表中未列出的任何端点均遵循每秒 10 个请求的全局限制。

超出此限制时,API 将返回 "429 Too Many Requests" 异常。违规 IP 地址会被放入隔离区(penalty box)15 分钟。该时段结束后,该 IP 地址将从隔离区中移除,直到再次有请求超出限制。屡次违规的 IP 地址可能会被永久封禁,直至问题得到解决。

| 端点                                 | 方法   | 限制                     |
| ------------------------------------ | ------ | ------------------------ |
| /fyi/unreadnumber                    | GET    | 1 req/sec                |
| /fyi/settings                        | GET    | 1 req/sec                |
| /fyi/settings/\{typecode}            | POST   | 1 req/sec                |
| /fyi/disclaimer/\{typecode}          | GET    | 1 req/sec                |
| /fyi/disclaimer/\{typecode}          | PUT    | 1 req/sec                |
| /fyi/deliveryoptions                 | GET    | 1 req/sec                |
| /fyi/deliveryoptions/email           | PUT    | 1 req/sec                |
| /fyi/deliveryoptions/device          | POST   | 1 req/sec                |
| /fyi/deliveryoptions/\{deviceId}     | DELETE | 1 req/sec                |
| /fyi/notifications                   | GET    | 1 req/sec                |
| /fyi/notifications/more              | GET    | 1 req/sec                |
| /fyi/notifications/\{notificationId} | PUT    | 1 req/sec                |
| /iserver/account/orders              | GET    | 1 req/5 secs             |
| /iserver/account/pnl/partitioned     | GET    | 1 req/5 secs             |
| /iserver/account/trades              | GET    | 1 req/5 secs             |
| /iserver/marketdata/history          | GET    | 10 req/sec 或 50 req/min |
| /iserver/marketdata/snapshot         | GET    | 10 req/s                 |
| /iserver/scanner/params              | GET    | 1 req/15 mins            |
| /iserver/scanner/run                 | POST   | 1 req/sec                |
| /pa/performance                      | POST   | 1 req/15 mins            |
| /pa/summary                          | POST   | 1 req/15 mins            |
| /pa/transactions                     | POST   | 1 req/15 mins            |
| /portfolio/accounts                  | GET    | 1 req/5 secs             |
| /portfolio/subaccounts               | GET    | 1 req/5 secs             |
| /sso/validate                        | GET    | 1 req/min                |
| /tickle                              | GET    | 1 req/sec                |
