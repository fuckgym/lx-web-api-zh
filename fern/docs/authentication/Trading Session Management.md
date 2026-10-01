# Web API 中的交易会话

在 Web API 中使用交易功能,需要创建一个启用交易的*经纪会话*(brokerage session)。

经纪会话与一个 IB *用户名*(username,即您的凭据)相关联,而该用户名又拥有对一个或多个*账户*(account,即实际的资金池)的交易权限。

一个用户名在所有 IB 平台上同一时间只能有一个处于活动状态的经纪会话。

一般交易权限、特定资产类别的交易权限、市场数据订阅(以及对已订阅数据源的访问权限)等均由 IB 用户名承载,而非底层账户。因此,提及经纪会话时,指的是一个已登录并与 IBKR 后端交易基础设施保持连接的用户名。

尽管 Interactive Brokers 允许一个用户名在任意时刻只拥有一个经纪会话,但 Web API 的部分交易功能无需经纪会话即可访问。这使得用户名的活动经纪会话可以在其他地方不受干扰地继续运行。

我们通常将这些非经纪功能称为 Web API 交易部分的"只读"子集。只读功能的示例包括投资组合数据检索和某些合约搜索工具。因此,在使用 Web API 进行交易时,会话可以被视为两个层级:

## 交易会话最佳实践

1. 一个"外层"前提条件*只读会话*(read-only session),它必须处于活动/有效状态才能发出任何 CP Web API 请求,但其本身仅允许访问非 `/iserver` 端点。
2. *经纪会话*(brokerage session),在只读会话之后建立,允许访问交易、市场数据消费以及 `/iserver` 端点背后的所有其他功能。

交易 Web API 的某些功能只能通过经纪会话使用。经纪端点的路径中包含 `/iserver`。这涵盖了所有市场数据和订单提交功能。

经纪会话是有状态的。在创建新的经纪会话之后,需要(或强烈建议)立即执行一些步骤,其效果将在会话期间持续生效。

* 经纪会话通过 [POST /iserver/auth/ssodh/init?publish=true\&compete=true](/web-api/api-reference/trading/trading-session/initialize-session) 创建。
* 在 `/init` 请求成功后,API 客户端应等待 2 秒,然后再继续发出其他 `/iserver` 请求。
* 在 2 秒的暂停之后,向 [GET /iserver/accounts](/web-api/api-reference/trading/trading-accounts/get-brokerage-accounts) 发出请求,并确认其响应非空。该非空响应表明经纪会话已激活并可供使用。
* 可选但强烈建议:如果您打算使用经纪会话提交订单,可以考虑抑制该过程中发出的各类消息。这些消息通常表现为需要客户端进行额外确认或应答的形式,若无应答,订单将不会被接受。所有此类消息都可以通过向 [POST /iserver/questions/suppress](/web-api/api-reference/trading/trading-orders/suppress-order-replies) 发送一次请求来预先禁用,其载荷见[订单回复抑制](/web-api/trading/orders/order-reply-suppression)中的规定。

经纪会话在超过 5 分钟未使用后将被终止。如果您打算在一天内持续使用经纪功能,我们强烈建议您只实例化一次经纪会话,并在需要期间保持其活跃,而不是反复执行上述启动流程。对任何 /iserver 端点的请求都可以实现这种保活(keep-alive)行为,通过 websocket 打开市场数据流也可以。或者,您可以定期轮询 [/tickle 端点](/web-api/api-reference/trading/trading-session/get-session-token)。
