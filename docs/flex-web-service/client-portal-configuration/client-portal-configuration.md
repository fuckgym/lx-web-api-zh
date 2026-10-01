# 简介

在使用 Flex Web Service API 以编程方式获取 Flex Query 报告之前,您需要先在 **Client Portal** 中手动获取一些值:

1. 用于验证请求的访问令牌(access token)
2. 与您想要获取的报告相对应的一个或多个查询 ID(query ID)

如果您想获取已经创建的 Flex Query,则需要使用创建这些查询的用户名登录 Client Portal,因为这些 Flex Query 报告配置是与用户名绑定的。不过,在获取这些值之后,Flex Web Service API 的使用就不再涉及您的 IB 凭据。您的用户名仅在后续管理访问令牌或重新配置报告模板时才会用到。

\*\*注意:\*\*这些步骤只能通过直接登录 Client Portal 来完成。
