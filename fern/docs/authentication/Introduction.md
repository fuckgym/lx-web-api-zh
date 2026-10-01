# 简介

Interactive Brokers Web API 提供三种不同的身份验证方式。这些身份验证方法根据客户账户类型和需求提供。核心的 Trading API 功能对所有身份验证类型均可用。

## Client Portal Gateway

用于 Web API 身份验证的标准方法。Client Portal Gateway 是一个 Java 客户端,通过 SSO 反向代理身份验证。

### 支持的账户类型

* [个人账户](https://www.interactivebrokers.com/en/accounts/individual.php#:~:text=Individual%2C%20Joint%2C%20IRA%20and%20Trust%20Account%20Structures)

### 快速入门

请参阅我们的快速入门指南,了解如何使用 Client Portal Gateway 进行身份验证。
我们的 [WebAPI Basics Tutorial](https://www.interactivebrokers.com/campus/trading-course/ibkrs-client-portal-api/) 以视频形式帮助您快速上手。

## OAuth 1.0a

OAuth 1.0a 允许用户以完全编程的方式进行身份验证:使用定制构建的 OAuth 1.0a 身份验证方案,在请求头中传递通过对一组私钥进行哈希而生成的实时会话令牌(Live Session Token)。
OAuth 1.0a 是第三方开发者唯一支持的身份验证方法。

### 支持的账户类型

* [财务顾问账户](https://www.interactivebrokers.com/en/accounts/advisor.php)
* [经纪商与 FCM 账户](https://www.interactivebrokers.com/en/accounts/broker.php)
* [自营交易集团账户](https://www.interactivebrokers.com/en/accounts/proprietary-trading-group.php)
* [对冲与共同基金账户](https://www.interactivebrokers.com/en/accounts/hedge-fund.php)
* [机构对冲基金投资者](https://www.interactivebrokers.com/en/accounts/hedge-fund-allocator.php)
* [第三方软件开发商](https://www.interactivebrokers.com/docs/third-party-integrations/prospective-third-party-integrations)

### 快速入门

请参阅我们的 [OAuth 1.0a](/authentication/oauth-1-a/introduction) 部分,了解如何使用 Client Portal Gateway 进行身份验证。

## OAuth 2.0

OAuth 2.0 允许用户使用改进的 OAuth 2.0 身份验证方案,以完全编程的方式进行身份验证。
账户管理(Account Management)端点仅可通过 OAuth 2.0 用于[财务顾问](https://www.interactivebrokers.com/en/accounts/advisor.php)和[经纪商](https://www.interactivebrokers.com/en/accounts/broker.php)账户类型。

### 支持的账户类型

* [财务顾问账户](https://www.interactivebrokers.com/en/accounts/advisor.php)
* [经纪商与 FCM 账户](https://www.interactivebrokers.com/en/accounts/broker.php)
* [自营交易集团账户](https://www.interactivebrokers.com/en/accounts/proprietary-trading-group.php)
* [对冲与共同基金账户](https://www.interactivebrokers.com/en/accounts/hedge-fund.php)
* [机构对冲基金投资者](https://www.interactivebrokers.com/en/accounts/hedge-fund-allocator.php)
