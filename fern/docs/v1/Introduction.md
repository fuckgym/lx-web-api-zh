# 简介

Interactive Brokers 的 Client Portal Web API 提供对 Interactive Brokers 交易功能的实时访问,包括实时市场数据、市场扫描器以及盘中投资组合更新。客户可以直接与 IBKR 基础设施通信,既可以通过 HTTP 端点同步通信,也可以通过 websocket 以异步、事件驱动的方式通信。我们提供多种[授权与身份验证](/web-api/authentication/introduction/)方法,可满足任何使用场景,包括 OAuth 1.0a、OAuth 2.0、SSO 以及我们基于 Java 的 CP Gateway 工具。

使用 Web API 需要拥有一个有效的 Interactive Brokers 账户。如果您还没有账户,可以[免费创建一个](https://www.interactivebrokers.com/en/index.php?f=46380#open-account)。请注意,您必须等待账户完全激活后才能连接 API。

Web API 仅支持 IBKR Pro 账户。
