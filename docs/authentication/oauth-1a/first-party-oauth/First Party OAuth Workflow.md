# 第一方 OAuth 工作流程

#### 生成访问令牌

用户可以通过 Interactive Brokers 自助服务门户生成访问令牌(Access Token)和访问令牌密钥(Access Token Secret)。只有在用户注册并获得批准后,才会开放该门户的访问权限。有关获取访问权限的详情,请参阅我们的[注册流程](/web-api/authentication/oauth-1a/first-party-oauth/registration-process)。

用户应妥善保存访问令牌和访问令牌密钥,因为它们将用于生成实时会话令牌(live session token),在访问权限被手动撤销之前,该令牌一直可用。

#### 生成实时会话令牌

这是为用户的每次会话进行授权的最后阶段。在此步骤中,我们必须使用注册消费者密钥(consumer key)时所提供的 Diffie-Hellman 规范中的素数(prime)和生成元(generator)来计算 Diffie-Hellman 质询。

实时会话令牌将允许用户在 24 小时内访问其 API,以进行交易或访问投资组合。创建实时会话令牌并不会建立完整的交易会话,后者由[初始化经纪会话](/web-api/authentication/oauth-1a/first-party-oauth/first-party-o-auth-workflow)处理。

#### 初始化经纪会话

生成实时会话令牌后,用户必须初始化会话,才能开始检索市场数据、提交订单或分析账户信息。用于 /v1/api/iserver/auth/ssodh/init 的参数将用于所有其他交易 API 端点。
