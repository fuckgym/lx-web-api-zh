# 简介

Interactive Brokers (IBKR) 账户管理 API 面向希望定制 IBKR 注册系统和客户门户(Client Portal)或掌控客户体验的注册顾问(Registered Advisor)和介绍经纪商(Introducing Broker)开放。

### 客户注册(Client Registration)

* 创建新账户
* 查看账户状态
* 查看注册任务
* 完成注册任务

### 账户维护(Account Maintenance)

* 更新账户信息
* 管理账户设置
* 管理交易权限
* 费用管理

### 资金与银行(Funds and Banking)

* 资金划转
* 配置定期交易
* 管理银行指令
* 持仓划转
* 查看交易记录

### 报告(Reporting)

* 生成客户对账单
* 获取税务表格

### 身份验证(Authentication)

* 将用户连接到 IBKR 白标平台。

账户管理 API 可以与 IBKR Portal 并行使用,或作为其替代方案。IBKR Portal 是我们开箱即用的解决方案,免费提供给注册顾问和介绍经纪商使用。

## 受众

本服务仅面向在 FATF(金融行动特别工作组)成员国注册的顾问/经纪商,且需通过申请开通。有关如何开始使用的说明,请参见[设置流程(Setup Process)](/web-api/account-management/account-management-introduction/setup-process)。

## 连接性(Connectivity)

IBKR 的 Web API 实现遵循标准 HTTP 动词进行通信。它采用一系列 HTTP 状态码和 JSON 格式消息来传达操作状态和错误信息。为确保通信安全,所有 API 请求必须使用 HTTPS。IBKR Web API 的授权与身份验证通过 OAuth 2.0 管理。

## 身份验证(Authentication)

IBKR 仅支持 **private\_key\_jwt** 客户端身份验证,详见 [RFC 7521](https://www.rfc-editor.org/rfc/rfc7521.html) 和 [RFC 7523](https://www.rfc-editor.org/rfc/rfc7523.html)。

* 客户端通过出示一个名为 *client\_assertion* 的已签名 JWT 令牌向授权服务器进行身份验证,授权服务器使用客户端在注册时提供的公钥对该令牌进行校验。

* 这种方案被认为比早期 OAuth 2.0 集成中使用的标准 client id/client secret 身份验证方案更安全,因为它使客户端无需在后端请求中传递 client secret。

## 数据传输(Data Transmission)

用户请求将以 JSON 格式通过 HTTPS 发送至 IBKR。

* `[POST]` 和 `[PATCH]` 请求将包含以 base64 编码的 JSON 请求体。
* 最大请求大小为 20MB
* 响应大小没有上限限制
* 仅支持 ASCII 字符
