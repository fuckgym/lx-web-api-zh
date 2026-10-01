# 简介

Interactive Brokers 为获得授权的财务顾问(Financial Advisor)、组织(Organization)、IBroker 以及第三方服务提供 OAuth 1.0a 身份验证流程。除了初始身份验证流程不同之外,OAuth 实现的行为与标准的 [Client Portal Gateway](/web-api/authentication/introduction) 相同。

通过我们的 OAuth 1.0a 工作流所产生的令牌进行身份验证后,可以直接向 `https://api.ibkr.com` 发起请求,而无需任何中间软件(例如 Client Portal Gateway)。无论采用何种身份验证方式,资源路径均保持不变。

Interactive Brokers 对客户直接使用 OAuth 的第一方场景与软件供应商使用 OAuth 的第三方场景作了区分,详见下文说明。
