# 开发者工具包

本节全面介绍了如何与我们的账户管理 API 集成,并提供了一个开发者工具包,帮助您快速上手。

#### 前提条件

* 一个 API 凭证(联系我们的支持团队 [am-api@interactivebrokers.com](mailto:support@example.com) 获取)
* REST API 的基本知识
* 能够发起 HTTP 请求的开发环境

## 开始交易

建立客户资料、设置您的交易账户,并执行您的第一笔交易

### 请求访问令牌

访问 IBKR Web API 需要访问令牌。使用 `[POST]/api/v1/token` 请求访问令牌。这些令牌包含一个 **scope** 参数,用于描述您可以对给定访问令牌执行哪些操作。

在本练习中,我们需要以下 scope:

* `accounts.read:` 查看经纪账户信息
* `accounts.write`:创建经纪账户
* `bank-instructions.write`:添加银行指令
* `transfers.write`:划转资金
* `statements.read`:查看客户对账单
* `instructions.read:` 查看资金划转
* `sso-browser-sessions.write`:创建到 IBKR Portal 的 SSO 会话。
* `sso.sessions.write`:下单交易

```
{
  "url": "https://api.ibkr.com/oauth2/api/v1/token",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": "x-sess-uuid=0.46eb7068.1753288804.ce36eee"
  },
  "data": {
    "client_assertion_type": "{{clientAssertionType}}",
    "client_assertion": "{{clientAssertion}}",
    "grant_type": "client_credentials",
    "scope": "accounts.read accounts.write bank-instructions.read bank-instructions.write clients.read clients.write echo.read echo.write fee-templates.read fee-templates.write instructions.read instructions.write statements.read transfers.read transfers.write sso-sessions.write sso-browser-sessions.write enumerations.read"
  }
}
```

### 创建经纪账户

要在 IBKR 平台内为客户建立经纪账户,请使用 `[POST] gw/api/v1/accounts` 向 IBKR 提交客户数据。[请求](/web-api/account-management/resources/sample-applications)所需的[数据点](/web-api/account-management/client-registration/data-for-client-registration)会因账户类型和客户类型而异。

### 身份验证与处理

在继续处理账户创建请求之前,IBKR 会对所提供的访问令牌进行身份验证,以核实服务器授权。系统通常会在 30 秒内处理请求并返回响应,但在某些情况下可能延长至 120 秒。

#### 响应解读

完成后,IBKR 会返回一个结构化响应,指示账户创建成功,或出现需要处理的错误。

**创建成功**

账户创建成功时,[响应](/web-api/account-management/resources/sample-responses/sample-responses)将包含:

* IBKR 凭证 `user`
* IBKR 账户号码 `accounts.value`
* 密码(如已启用)`password`
* 审批所需的待处理注册任务 `pendingTasks`
  * 如存在:任务完成之前,账户将不会获得批准/开立。

**注意:** 托管机构负责将这些凭证安全地传达给账户持有人。

**错误处理**

如果发生错误,账户将不会建立。托管机构必须:

1. 查看错误详情
2. 根据 [**错误库(Error Library)**](/web-api/account-management/resources/sample-responses/error-handling)文档进行必要的更正
3. 重新提交请求

### 开立经纪账户

检查申请状态,查看是否需要采取任何操作。只有 **state** 为 Open 的账户才能进行交易。**提示:** 及时处理所有要求有助于加快账户激活。请定期监控您的申请状态,以确保及时完成开户流程。

`[GET] /gw/api/v1/accounts/{accountId}/status`

* **Incomplete Application** = 使用[单点登录](/web-api/account-management/single-sign-on)将用户连接到 IBKR Portal,以完成在线注册流程。
* **Documents Required** = 需要采取措施
  * **查看审批所需的待处理任务**:`/gw/api/v1/accounts/{accountId}/tasks?type=pending`
* **Under Review with IBKR** = 申请在 IBKR 处于 PENDING 状态,无需任何操作。
* **Pending Approval** = 账户正在审批队列中,应在下一个工作日开立。
* **Open =** 账户已开立,且没有分配给该账户的待处理任务。

### 账户审批的任务要求

任务分为两类:

* **必需任务**(`"isRequiredForApproval": true`)– 账户审批必须完成
* **可选任务**(`"isRequiredForApproval": false`)– 账户审批无需完成

***完成任务***

**方案 1:API 方式**

* 使用 PATCH 端点:`/api/v1/accounts/`
* **限制**:仅支持部分[任务](/web-api/account-management/client-registration/registration-tasks/complete-registration-tasks)。
* 最适合以编程方式完成受支持的任务

**方案 2:通过单点登录使用 IBKR Portal**

* 使用[单点登录](/web-api/account-management/single-sign-on)将用户重定向至 IBKR Portal 直接完成任务
* **优势**:支持所有可能的任务;界面由 IBKR 托管,无需开发。

**推荐实施方式**

1. 首先尝试通过 API 完成任务(方案 1)
2. 如果任何必需任务不支持通过 API 完成,则回退到 IBKR Portal(方案 2)
3. 始终将方案 2 作为不受支持任务的回退机制

这种方式可提供最无缝的体验,同时确保所有必需任务都能完成。

### 账户入金

账户成功开立后,即可进行账户入金。具体的入金机制取决于您的客户类型。

### Non-Disclosed 客户

对于 Non-Disclosed 客户,所有资金必须通过 Non-Disclosed 主账户处理:

* 入金通过从 Non-Disclosed 主账户向 Non-Disclosed 子账户进行现金或持仓的[内部划转](/web-api/account-management/funds-and-banking/internal-transfer)来发起

### Direct 客户

对于 Direct 客户(包括 Fully-Disclosed 和 Advisor),入金直接在子账户层面通过[资金](/web-api/account-management/funds-and-banking/cash-transfer/cash-transfer)划转或[持仓](/web-api/account-management/funds-and-banking/position-transfers)划转发起。

**重要:** 如果前端不支持某种划转方式,API 同样不会支持该方式

### 下单交易

1. **请求 SSO Bearer Token**
   * [**`[POST]/api/v1/sso-sessions`**](https://ibkrcampus.com/docs/web-api/api-reference/authentication/oauth-2-0/create-sso-sessions):创建单点登录(SSO)会话,以访问 IBKR 的交易 Web API
   * 返回一个 JSON 对象,其中包含对新创建 SSO 会话的引用(包括 SSO Bearer Token)。
2. **初始化经纪会话**
   * `[POST]/iserver/auth/ssodh/init` :要使用所有 /iserver 交易与市场数据端点,此步骤必不可少。
     * 有关交易 Web API 会话的更多背景信息可参见[此处](/web-api/authentication/sessions)。
   * **接收经纪账户**(可选):通过 **\[GET\]/iserver/accounts** 接收用户有权交易的经纪账户列表、各自的别名以及当前的 *selectedAccount*。
3. **下单**
   * `[POST]/iserver/account/{accountID}/orders`:可用订单类型包括(但不限于):MKT、LMT、STP、STP LMT、TRAIL、MOC、LOC、VWAP(IBALGO 订单)、Bracket、OCA、交易前分配组订单(针对财务顾问)、cashQty 订单等。
4. **登出**
   * 使用 **`[POST]/logout`** 将用户登出交易 Web API 会话。任何后续活动都需要重新进行身份验证。

### 查看账户活动

#### 方案 1:使用 Web API 查询账户信息

* `[GET]/portfolio/accounts`:实时数据访问,可查看日内数据,包括持仓和账户余额。
* `[GET]/iserver/account/trades`:实时订单监控和成交报告。

#### 方案 2:使用 Web API 生成对账单 `[POST]/api/v1/statements`

* 生成指定日期范围的 PDF 对账单
* 每次请求的最大范围:365 天

#### 方案 3:Start of Day 与 End of Day 文件

* 我们为用户提供全套报告,包括[账户对账单](https://ibkrguides.com/clientportal/performanceandstatements/statements.htm)、[PortfolioAnalyst](https://www.interactivebrokers.com/en/portfolioanalyst/overview.php) 以及 [Flex 查询(flex queries)](https://ibkrguides.com/clientportal/performanceandstatements/flex.htm)(原始数据文件)。
  * 直接在 [IBKR Portal](https://ibkrguides.com/clientportal/performanceandstatements/reports.htm) 中即时生成
  * 通过 sFTP 安全投递接收(联系 [filedelivery@interactivebrokers.com](mailto:filedelivery@interactivebrokers.com))
  * 可使用 [Flex Web Service](https://ibkrguides.com/clientportal/performanceandstatements/flex-web-service.htm) 检索文件,以实现 Flex 查询处理的自动化。

### 账户维护

实现全面的账户维护功能,对于审批后的有效客户管理至关重要。

### [资料变更](/web-api/account-management/account-information/update-information)

* **changeAccountHolderDetail**:更新客户账户信息,确保数据准确性并符合 KYC 要求。
* **updateCredentials**:支持安全地更新与账户关联的电子邮件地址,以保障正常的客户沟通和安全协议。
* **updateTaxForm**:便于及时更新与账户关联的税务表格,确保准确的税务申报并符合税务机关的要求。
* **completeLoginMessages**:允许用户处理审批后分配给账户的待处理任务,包括确认或更改现有的 IBKR 协议和披露文件。
* **changeFinancialInformation**:允许更新客户的财务状况信息,包括投资目标、经验和财富来源。
* **changeBaseCurrency**:支持国际客户以及币种需求发生变化的客户。

### [账户功能](/web-api/account-management/account-information/update-information)

* [交易权限](https://www.interactivebrokers.com/en/trading/products-stocks.php)
  * `addTradingPermissions`:在账户获得批准后,使客户能够随着需求的变化访问更多产品和市场。此功能通过对交易功能的受控访问实现适当的风险管理。
  * `removeTradingPermissions`:在需要时移除交易功能,既支持客户主动请求的变更,也支持合规驱动的限制。
* [股息再投资(DRIP)](https://ibkrguides.com/kb/en-us/overview-of-drip.htm)
  * `enrollInDRIP`:支持参与股息再投资计划,助力长期投资策略和账户增长。此功能促进被动财富积累和客户留存。
  * `leaveDRIP`:在客户需求或策略变化时,提供退出股息再投资计划的灵活性,支持客户自主性和账户管理的灵活性。
* [股票收益增强计划](https://www.interactivebrokers.com/en/pricing/stock-yield-enhancement-program.php)
  * `enrollInSYEP`:允许客户参与股票收益增强计划,通过证券出借创造获得额外收入的机会。此功能支持投资组合优化和收益生成策略。
  * `leaveSYEP:` 当客户的投资策略发生变化,或希望重新完全掌控其证券时,为客户提供退出股票收益增强计划的灵活性。这支持客户自主性和风险管理偏好。

## 现金交易

在外部银行账户与 IBKR 经纪账户之间划转资金

### 请求访问令牌

访问 IBKR Web API 需要访问令牌。使用 `[POST]/api/v1/token` 请求访问令牌。这些令牌包含一个 **scope** 参数,用于描述您可以对给定访问令牌执行哪些操作。

在本练习中,我们需要以下 scope:

* `bank-instructions.write`:添加银行指令
* `transfers.write`:划转资金
* `instructions.read:` 查看资金划转

```
{
  "url": "https://api.ibkr.com/oauth2/api/v1/token",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": "x-sess-uuid=0.46eb7068.1753288804.ce36eee"
  },
  "data": {
    "client_assertion_type": "{{clientAssertionType}}",
    "client_assertion": "{{clientAssertion}}",
    "grant_type": "client_credentials",
    "scope": "accounts.read accounts.write bank-instructions.read bank-instructions.write clients.read clients.write echo.read echo.write fee-templates.read fee-templates.write instructions.read instructions.write statements.read transfers.read transfers.write sso-sessions.write sso-browser-sessions.write enumerations.read"
  }
}
```

### 银行指令

在允许资金划转之前,请先确认指定账户已存在银行指令。

1. **验证账户是否存在有效的银行指令**:`/gw/api/v1/bank-instructions/query` 端点可用于按 `accountId` 和 `bankInstructionMethod` 查看已存档的银行指令列表。响应将返回对应的 `bankInstructionName`、`bankRoutingNumber`、`currency` 以及 `bankAccountNumber` 的后 4 位(如适用)。
   * 如果返回了指令,可向用户提供使用现有指令的选项
   * 如果未返回任何指令,或用户不想使用已存档的指令,托管机构需告知用户需要添加指令才能处理请求。
2. **添加银行指令**
   * **ACH:**`/gw/api/v1/bank-instructions` 端点可用于向现有 IBKR 经纪账户添加银行指令。仅适用于拥有[关联银行账户](/web-api/account-management/funds-and-banking/bank-instructions)的美国居民。
   * 其他支付类型和货币(包括 Open Banking、Wise、Bill Pay、EFT 等)需要使用 IBKR 托管界面添加。可利用我们的[单点登录(SSO)](/web-api/account-management/single-sign-on)功能和 IFRAME 嵌入,将这些选项无缝集成到您的平台中,使 IBKR 的入金页面能够在您的应用界面内原生显示。

### 查看可用现金余额

可以使用 `/gw/api/v1/external-cash-transfers/query` 基于 `accountId` **和** `currency`,查看在计入与不计入保证金贷款两种情况下可供提款的现金金额。对于 Non-Disclosed 客户,该端点将返回可在主账户与子账户之间划转的可用现金。

响应将返回以下值:

* `withdrawableAmount`:可供提款的现金金额(计入保证金贷款)。仅适用于 Fully-Disclosed 和 Advisor 客户。
* `withdrawableAmountNoBorrow`:可供提款的现金金额(不计入保证金贷款)。仅适用于 Fully-Disclosed 和 Advisor 客户。
* `allowedTransferAmountToMaster`:允许划转至主账户的金额(计入保证金贷款)。仅适用于 Non-Disclosed 客户。
* `allowedTransferAmountToMasterNoBorrow`:允许划转至主账户的金额(no\_borrow)。仅适用于 Non-Disclosed 客户。
* `withdrawableBalanceWithoutOriginHold`:不含来源冻结限制的可提款金额。

### 划转资金

可以使用 `/gw/api/v1/external-cash-transfers` 管理外部银行账户与 IBKR 经纪账户之间的资金划转。划转详情(包括方式(`ACH` 和 `WIRE`)、交易类型(`DEPOSIT` 或 `WITHDRAWAL`)、`currency` 和 `amount`)将在请求正文中定义。

#### GBP - Open Banking

```
POST /gw/api/v1/external-cash-transfers
{
  "instructionType": "DEPOSIT",
  "instruction": {
    "clientInstructionId": 7013045,
    "accountId": "U46377",
    "currency": "GBP",
    "amount": 100,
    "bankInstructionMethod": "ACH",
    "bankInstructionName": "British Bank",
  }
}
```

#### USD - ACH 入金

```
POST /gw/api/v1/external-cash-transfers
{
  "instructionType": "DEPOSIT",
  "instruction": {
    "clientInstructionId": 7013045,
    "accountId": "U46377",
    "currency": "USD",
    "amount": 100,
    "bankInstructionMethod": "ACH",
    "bankInstructionName": "My Checking Account",
  }
}
```

#### USD - 电汇出金

```
POST /gw/api/v1/external-cash-transfers
{
  "instructionType": "WITHDRAWAL",
  "instruction": {
    "clientInstructionId": 7013045,
    "accountId": "U46377",
    "currency": "USD",
    "amount": 100,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "CHASE Bank",
  }
}
```
