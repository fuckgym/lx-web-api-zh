# OAuth 1.0a 请求结构

每种身份验证方法在发送和接收经过身份验证的请求方面都有略微不同的要求。

## Base URL

`api.ibkr.com`

## 请求头(Headers)

OAuth 1.0a 请求

| Header          | 要求     | 描述                                                                                                                                                    |
| --------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Accept`        | 必需    | 应设置为 `"*/*"`                                                                                                                                   |
| `Authorization` | 必需    | 应设置为 `OAuth {oauth_header}`。详情请参阅 [OAuth 1.0a 授权头(Authorization Header)](/web-api/authentication/oauth-1a/request-requirements#headers)。 |
| `Connection`    | 建议   | 建议设置为 `"keep-alive"` 以获得最佳性能。                                                                                              |
| `Host`          | 必需    | 所有请求均应设置为 `api.ibkr.com`。                                                                                                          |
| `User-Agent`    | 必需    | 可设置为任何可识别的接口。                                                                                                                  |
