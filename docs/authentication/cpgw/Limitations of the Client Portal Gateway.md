# Client Portal Gateway 的局限性

尽管 Interactive Brokers 通过 WebAPI 文档发布的绝大多数端点既可在 Client Portal Gateway(CPGW)中使用,也可通过 OAuth 使用,但仍有一些该系统独有的限制需要了解。

* 用户必须在 Client Portal Gateway 所在的同一台机器上通过浏览器登录,才能完成身份验证。
* 所有 API 端点调用必须在完成 Client Portal Gateway 身份验证的同一台机器上进行。
* 以 /gw/api、/oauth 或 /oauth2 开头的端点均不支持在 Client Portal Gateway 中使用。
