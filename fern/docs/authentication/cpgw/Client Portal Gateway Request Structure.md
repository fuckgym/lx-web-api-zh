# Client Portal Gateway 请求结构

每种身份验证方法在发送和接收已验证请求时的要求略有不同。

## 基础 URL

`localhost:5000`
如果[修改了 listenPort](/web-api/authentication/cpgw/how-to-modify-the-client-portal-gateway-port),localhost 所使用的端口可能会改变。

## 请求头

Client Portal Gateway 会代表用户处理几乎所有的请求头和参数。

* `User-Agent`:所有请求都应定义 `User-Agent` 请求头
