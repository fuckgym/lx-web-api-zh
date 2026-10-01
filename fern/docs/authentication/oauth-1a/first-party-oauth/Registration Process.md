# 注册流程

Interactive Brokers 将第一方(first party)实体定义为代表其自身或其机构进行交易的机构。开发 API 平台的实体与使用该平台进行交易的实体是同一个实体。

第一方实体的例子包括财务顾问、对冲基金以及希望交易自有资金的机构。

有意向的第一方申请者,请发送电子邮件至 [apiintegration@interactivebrokers.com](mailto:apiintegration@interactivebrokers.com),并回答以下问题。

1. 您打算使用 OAuth 访问权限做什么?
2. 请列出将使用所开发的 OAuth 程序的所有账户。
3. 客户端应用程序是由内部开发,还是由第三方开发者开发?

获得批准并使用第一方 OAuth 的机构,需要使用自助服务门户(Self Service Portal)来生成其消费者密钥(consumer key)、加密密钥和访问令牌。该链接将在入驻(onboarding)过程中直接提供给获得批准的实体。这是创建您的程序并遵循下列步骤的必要环节。

通过自助服务门户注册的消费者密钥(Consumer Key),要等到美国纽约、瑞士楚格(Zug)或中国香港地区的午夜之后才会生效。在重置之前尝试使用新的消费者密钥将导致错误(您可能会收到 401 Invalid Consumer 错误)。
