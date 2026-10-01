# 故障排除

## SSL 错误 - 自签名证书

出现此问题的原因是 API gateway 未随附有效证书。有关如何生成并安装有效网关证书的信息,请参阅以下[文章](https://www.sslshopper.com/article-how-to-create-a-self-signed-certificate-using-java-keytool.html)。

## 401 错误

请确保您已登录 API gateway。相关操作步骤可参见[此处](/web-api/api/web-api/initializing-brokerage-session)。

如果您已经登录但仍然收到此错误,则可能需要初始化经纪会话。如果您已经初始化过经纪会话,那么您的会话可能已过期。为避免这种情况,请定期[ping](/web-api/v1/endpoints/session/ping-the-server)服务器。
