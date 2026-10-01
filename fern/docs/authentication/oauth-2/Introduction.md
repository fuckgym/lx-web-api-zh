# 简介

Interactive Brokers 为获得授权的组织(Organization)、财务顾问(Financial Advisor)和 IBroker 提供 OAuth 2.0 身份验证流程。除了初始身份验证流程不同之外,OAuth 实现的行为与标准的 [Client Portal Gateway](/web-api/authentication/introduction) 相同。

通过我们的 OAuth 2.0 工作流所产生的令牌进行身份验证后,可以直接向 `https://api.ibkr.com` 发起请求,而无需任何中间软件(例如 Client Portal Gateway)。

OAuth 2.0 根据指定的范围(scope)提供对我们交易(Trading)API 和账户管理(Account Management)API 的访问。范围访问权限会在[注册流程](/web-api/authentication/oauth-2/register)中授予选定的财务顾问和 IBroker。
