# OAuth 2.0 注册流程

Interactive Brokers 为获得许可的组织(Organization)、财务顾问(Financial Advisor)和 IBroker 提供 OAuth 2.0 身份验证流程。有意向的机构应联系 [api-solutions@interactivebrokers.com](mailto:api-solutions@interactivebrokers.com) 获取注册指引。

**OAuth 2.0 不适用于个人账户结构**。

### OAuth 2.0 公钥要求

获得 OAuth 2.0 访问权限的批准后,OAuth 2.0 的初始设置需要通过安全消息中心向 IBKR 提交一个 RSA 公钥(密钥位长 >= 3072)。

请仅提供公钥,并请通过真实账户(live account)中的用户提交工单:

> `openssl genrsa -out privatekey.pem 3072`

> `openssl rsa -pubout -in privatekey.pem -out publickey.pem -outform PEM`

或

> `openssl genrsa -out privatekey.pem 4096`

> `openssl rsa -pubout -in privatekey.pem -out publickey.pem -outform PEM`
