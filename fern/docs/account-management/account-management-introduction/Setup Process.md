# 设置流程

*IBKR 的账户注册系统和客户门户均经过精心设计以满足我们的要求;任何外包申请工作流程的请求都需要获得额外批准。我们按先后顺序总结了使用 API 进行注册和入金的步骤。*

### 前期准备

1. 发送电子邮件至 **[api-solutions@interactivebrokers.com](mailto:api-solutions@interactivebrokers.com)**,内容包括:
   * 公司名称
   * 公司角色(例如介绍经纪商(Introducing Broker)、财务顾问(Financial Advisor)或第三方服务提供商)
   * 您有意使用的 API 服务(例如注册、入金、单点登录、查看投资组合数据、交易、报表)
   * 描述预期用途(1-2 句话)
2. 我们 API 团队的代表将提供链接,供您(以电子方式)填写整合调查问卷。
3. 完成调查问卷后,API 解决方案团队的代表将与您联系,安排一次介绍性通话,以评估需求并确定成功整合所需的服务。

### 构建与测试

在就整合要求达成一致后,将授予 QA 环境的访问权限。

1. 要为注册与入金 API 搭建 QA(沙盒)环境,请向 **am-api@**interactivebrokers**.com** 提供以下内容:
   * RSA 密钥
     * 大小:3072 或 4096
     * 格式:PEM
     * IP 地址(CIDR 格式)
   * 已签署的服务[协议](https://www.interactivebrokers.com/campus/wp-content/uploads/sites/2/2024/09/Web-API-Account-Management-Services-Agreement-3.pdf)
2. IBKR 将提供用于访问 QA 环境的 QA 凭据。
3. 构建接口并测试 IBKR 的 API。
   * [开发者工具包](/account-management/resources/developer-tool-kit)包含快速入门指南
   * 建议[测试用例](/account-management/resources/test-cases)

### 上线

1. 如果所有开发工作已完成,且您的团队已准备好使用该 API 整合上线,请完成以下事项:
   * 通过 [IBKR 消息中心](https://ibkrguides.com/brokerportal/messagecenter/messagecenter.htm#)向 IBKR 提供用于生产环境的 RSA 密钥。
     * 生产环境的 RSA 密钥不能与 QA 使用的密钥相同
   * 联系您的 API 整合经理,并提供以下内容:
     * 与 RSA 密钥关联的 Web 工单号
     * 平台内将提供的服务的摘要
       * 例如:混合注册、账户入金、客户门户单点登录、添加交易权限
     * 在 QA 中访问应用界面的说明
     * 按先后顺序排列的注册流程截图(PDF)
     * 已签署的服务[协议](https://www.interactivebrokers.com/campus/wp-content/uploads/sites/2/2024/09/Web-API-Account-Management-Services-Agreement.pdf)(若在前期准备阶段尚未完成)。
2. IBKR 将审核并测试接口。
3. IBKR 将发送电子邮件告知接口的批准状态。如果获得批准,IBKR 将通过 [IBKR 消息中心](https://ibkrguides.com/brokerportal/messagecenter/messagecenter.htm#)向您的团队提供生产环境凭据(Client ID)。
4. 使用生产环境凭据测试连接。如果成功,请向您的 IBKR API 整合经理提供以下内容:
   * 生产环境中应用程序的 URL 地址。
   * 生产环境联系人(运营与维护)。
5. 正式上线至生产环境
