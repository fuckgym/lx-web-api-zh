# 简介

要调用 Interactive Brokers 的接口来创建或修改数据,用户必须通过 localhost 使用 URL 端点。每次调用由一个基础 URL(base URL)和一个端点组成。

[Client Portal Gateway](/authentication/introduction#client-portal-gateway) 的基础 URL 为:**[https://localhost:5000/v1/api](https://localhost:5000/v1/api)**

默认情况下,Client Portal Gateway 不附带已签名的证书。因此,客户应选择自行对证书进行签名,或以"不安全(insecure)"方式向其 localhost 提交请求。

OAuth 1.0a 用户应将请求路由到 **[https://api.ibkr.com/v1/api](https://api.ibkr.com/v1/api)**。

Python Web 请求示例展示了用户可能希望使用的各种外部库。虽然本文档围绕 *requests* 库构建,但还有其他几个库可供考虑:

* requests
* json
* websocket-client

要在 Python 中发送"不安全"请求,请添加 "verify=False" 作为请求参数。

请注意,cURL 请求按照 cURL 标准进行格式化,[参见此处文档](https://curl.se/docs/manpage.html)。某些特定操作系统平台可能有所不同,需要进行相应调整。

我们的系统展示默认的 bash 结构。

* Unix 和 bash 使用 \ (反斜杠)
* Powershell 将使用 \` (反引号)
* Command Prompt 使用 ^ (脱字符)

要在 cURL 中发送"不安全"请求,请在请求中添加 "–insecure"。

#### 请求头(Headers)

所有请求都应包含以下请求头:

* Host:应设置为 "api.ibkr.com"。
* User-Agent:可以设置为任意值,但最好引用您的环境或直接从浏览器获取。
* Accept:应设置为 "\*/\*",以表示任意返回格式。通常返回 application/json,但并非总是如此。
* Connection:应设置为 "keep-alive"。
* Content-Length:发送 POST 请求必须包含 Content-Length。未包含 Content-Length 的请求将返回 411 错误。
  * 注意:大多数语言会默认传递此信息。但是,某些实现(例如 Java Springboot)在标准请求中可能不包含这些请求头。
