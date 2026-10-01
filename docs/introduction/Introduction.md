# 简介

Interactive Brokers(IBKR)RESTful Web API 旨在为用户提供对其 IBKR 账户无缝、安全且实时的访问。Web API 与 IBKR 托管的应用程序并行运行,为用户提供可扩展且高效的核心服务访问。我们的 API 分为两个关键组成部分:

#### [账户管理](/web-api/account-management/)

为介绍经纪商(Introducing Brokers)和财务顾问(Financial Advisors)提供解决方案,使其在依赖 IBKR 经纪服务的同时,保留现有的用户体验和界面设计。顾问和经纪商可以集成账户管理 API 来管理客户注册、客户账户维护、用户身份验证、入金和报告。

#### [交易](/web-api/trading/)

我们的交易 API 面向所有 IBKR 客户免费提供,可用于管理交易、查看实时投资组合信息、访问市场数据、查看合约信息以及进行经纪会话身份验证。

### 连接性

IBKR 的 Web API 实现遵循标准 HTTP 动词进行通信。它采用一系列 HTTP 状态码和 JSON 格式消息来传达操作状态和错误信息。为确保通信安全,所有 API 请求必须使用 HTTPS。IBKR Web API 的授权与身份验证通过 OAuth 2.0 进行管理。

### 身份验证

IBKR 仅支持 **private\_key\_jwt** 客户端身份验证,如 [RFC 7521](https://www.rfc-editor.org/rfc/rfc7521.html) 和 [RFC 7523](https://www.rfc-editor.org/rfc/rfc7523.html) 所述。

* 客户端通过出示名为 *client\_assertion* 的已签名 JWT 令牌向授权服务器进行身份验证,授权服务器使用客户端在注册时提供的公钥对其进行验证。
* 与早期 OAuth 2.0 集成中使用的标准 client id/client secret 身份验证方案相比,该方案被认为更安全,因为它使客户端无需在后端请求中传递 client secret。

### 数据传输

用户请求将以 JSON 格式通过 HTTPS 发送至 IBKR。
