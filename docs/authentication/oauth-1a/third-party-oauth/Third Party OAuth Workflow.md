# 第三方 OAuth 工作流程

一旦获得第三方 OAuth(Third Party OAuth)批准,开发者必须使用提供的证书和消费者密钥(consumer key)为用户完成注册、授权并生成访问令牌(access token),之后才能获取用于[基于 OAuth 1.0A 的已验证请求](/web-api/authentication/oauth-1a/introduction)的实时会话令牌(Live Session Token)。

#### 生成请求令牌(Request Token)

第三方 OAuth 用户使用来自 /v1/api/oauth/request\_token 端点的请求令牌(request token)启动 OAuth 流程。

请求令牌将作为一个临时身份验证令牌,供个人用户与 Interactive Brokers 进行身份验证,以授权第三方的消费者密钥与其用户账户关联。在完成访问令牌(Access Token)步骤后,返回的令牌将被丢弃。

> **警告**
>
> 如果您是第一方 OAuth(First Party OAuth)用户,请勿执行此步骤,否则会收到错误。实现第一方 OAuth 的开发者应直接进入请求实时会话令牌的步骤。

#### 授权消费者密钥

获取请求令牌后,我们需要将该值提交到 Interactive Brokers 服务器进行授权。做法是引导用户访问 [https://interactivebrokers.com/authorize?oauth\\\_token=\\\{REQUEST\_TOKEN}](https://interactivebrokers.com/authorize?oauth\\_token=\\\{REQUEST_TOKEN}),用户将使用其 Interactive Brokers 凭据登录。

用户登录后,将被重定向到创建消费者密钥时指定的 URL,该 URL 中会包含两个查询参数:
oauth\_token 和 oauth\_verifier

oauth\_token 即请求令牌,而 oauth\_verifier 是下一步所需的验证令牌(verifier token),应将其捕获以供后续步骤使用。

用户登录后 URL 的示例:`{CALLBACK_URL}?oauth_token=b9082d68cfef06b030de&oauth_verifier=0ffb93ab9aa0d2177cc2`。

与请求令牌一样,验证令牌在获取访问令牌后也可以丢弃。

#### 生成访问令牌(Access Token)

获取验证令牌后,我们向 /v1/api/oauth/access\_token 端点发起请求。

`oauth_verifier` 必须添加到授权头(authorization header)中,其值为上一步获取的验证令牌。

`oauth_token` 也必须添加到授权头中,其值为请求令牌。

如果请求成功,响应将包含两个值:`oauth_token` 和 `oauth_token_secret`。响应中的 `oauth_token` 即用户的访问令牌,`oauth_token_secret` 将用于下一步。

此后,访问令牌的值将用于所有后续请求,作为用户授权我方消费者密钥的标识。同时,访问令牌密钥(Access Token Secret)用于在下一步中生成实时会话令牌,以验证之后 24 小时内的会话。访问令牌和访问令牌密钥只需生成一次,除非被用户删除。它们可以在客户端与第三方之间连接的生命周期内缓存并重复使用。

#### 生成实时会话令牌(Live Session Token)

这是为用户完成每次会话授权的最后阶段。在此步骤中,我们必须使用注册消费者密钥时提供的 Diffie-Hellman 规范中的素数(prime)和生成元(generator)计算 Diffie-Hellman 挑战。

实时会话令牌将允许用户在 24 小时内访问其 API,用于交易或投资组合访问。实时会话令牌的创建并不会建立完整的交易会话,那需要通过初始化经纪会话(Initializing the Brokerage Session)来完成。

#### 初始化经纪会话

生成实时会话令牌后,用户必须初始化会话,才能开始获取市场数据、提交订单或分析账户信息。用于 /v1/api/iserver/auth/ssodh/init 的参数将用于所有其他交易 API 端点。
