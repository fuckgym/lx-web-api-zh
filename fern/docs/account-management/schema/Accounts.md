# 账户

### 账户配置

## account

账户中必须包含的强制属性

|                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------- |
| `"accounts": [ "externalId": "TEST12345", "baseCurrency": "USD", "margin": "RegT", "alias": "My Individual Account"}` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| external\_id | String;最多 64 个字符 | 账户的标识符。该标识符将由交易对手方指定。 |
| baseCurrency | 货币代码(3 位)。可用货币可参见[此处](https://www.interactivebrokers.com/en/support/fund-my-account.php)。 | 账户的基础货币。 |
| alias | String;最多 80 个字符 | 账户的昵称。如果创建了账户别名,该别名将在对账单、门户和 TWS 中取代 IBKR 账号显示。 |
| margin | Cash Margin RegT PortfolioMargin | 应用于账户的保证金规则类型。**Cash**:无保证金交易能力。**Margin/RegT**:基于规则的保证金,日内提供 4:1 杠杆,隔夜提供 2:1 杠杆。最低权益:$2,000 **Portfolio Margin**:基于风险的模型,分散的投资组合可提供高达 6:1 的杠杆;较集中的投资组合则低至 3:1 杠杆。最低权益:$100,000。若账户权益低于 \$100,000,账户将进入只平仓(close only)模式。注意:澳大利亚居民或 IB-AU 旗下账户不支持保证金交易。对于 IB-AU 账户,margin 始终为 "CASH" |

## capabilities

如果申请人在开户过程中申请了 CLP(Complex Leverage Products,复杂杠杆产品)和/或 LEVFX(Cash Forex,现金外汇),则会包含此部分。

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| capabilities | CLP LEVFX | CLP= 复杂杠杆产品(Complex Leveraged Product)。  LEVFX= 杠杆外汇(Leveraged Forex,即现金外汇) |

|                                                            |
| ---------------------------------------------------------- |
| `"accounts": [  {  "capabilities": [  "CLP",  "LEVFX"  ],` |

* LEVFX 允许您以杠杆方式交易货币对。借助杠杆外汇,您可以用较少的保证金交易更大的持仓规模。杠杆外汇交易仅面向符合条件的客户提供。
* CLP 适用于全披露(Fully-Disclosed)客户;账户持有人必须拥有至少两年的股票交易经验,并同时具备期权或期货其中之一的交易经验。
* **期货**
* 1 年,每年 1-10 笔交易
  * 该情况将无法通过验证
  * 由于客户的期货交易经验不足两年,客户必须参加期货考试(Futures Exam)
* 2 年,每年 1-10 笔交易
  * 若知识水平(Knowledge level)为 Good 或 Extensive,则可通过验证
  * 若知识水平为 Limited,则无法通过验证
* **期权**
* 1 年,每年 1-10 笔交易
  * 该情况将无法通过验证
  * 由于客户的期权交易经验不足两年,客户必须参加期权考试(Options Exam)
* 2 年,每年 1-10 笔交易

## investmentObjectives

为申请人指定 investmentObjectives。

* TradingPermissions 的可用资格将因 InvestmentObjectives 而异。
* 此项不可硬编码。
* *交易所有产品*
  * Growth + Trading Profits + Speculation + Hedging
  * Growth + Speculation + Hedging
  * Growth + Speculation
  * Growth + Trading Profits
  * Hedging + Trading Profits
  * Speculation + Hedging
  * Speculation + Hedging + Trading Profits
* *仅债券*
  * 仅限 Preservation of Capital
* Income + Preservation of Capital + Growth= 不可包含期权或外汇
* Income + Preservation of Capital + Growth + Hedging= 不可包含期权

|                                                                  |
| ---------------------------------------------------------------- |
| `"accounts": [ { "investmentObjectives": [ "Income", "Growth"],` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| objective | Preservation Income Growth Trading Speculation Hedging | **Preservation of Capital:**通过专注于风险较低的证券和投资,为本金寻求最大程度的安全与稳定。  **Income**:产生股息、利息或其他收入,以此取代或补充对长期资本增值的追求。  **Growth**:追求投资本金价值随时间增长,而非寻求当期收入。投资者承担较高的风险。  **Trading Profits**:通过采用较短期限的交易策略并承担较高风险,来增加投资的本金价值。  **Speculation**:通过为投资资本承担大幅更高的风险,来大幅增加投资的本金价值。  **Hedging**:在某一产品中建立持仓,以对冲或抵消另一产品中的风险。 |

## tradingPermissions

为账户指定交易权限。

权限可以按交易所申请,或按产品与市场申请。

对于 `exchange_group`,使用[`/api/v1/enumerations/exchange-bundles`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/get-enumerations)端点查询可用权限列表。

* 若要交易碎股(Fractional Shares),请包含 `"exchangeGroup": "IB-FRAC-STK".`

|                                                               |
| ------------------------------------------------------------- |
| `{ "tradingPermissions": [ { "exchangeGroup": "US-Sec", } ],` |

对于基于组合(bundle)的方式,请指定国家/地区与产品。下表列出了可用产品和国家/地区。

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| product | BONDS FUTURES FOREX FUTURES OPTIONS MUTUAL FUNDS STOCKS SINGLE STOCK FUTURES OPTIONS STOCK OPTIONS | 所申请的产品类型 |
| country | All AUSTRALIA AUSTRIA BELGIUM CANADA FRANCE GERMANY HONG KONG ITALY JAPAN KOREA MEXICO NORWAY SINGAPORE SPAIN SWEDEN SWITZERLAND THE NETHERLANDS UNITED KINGDOM UNITED STATES | 用户申请交易该产品的地区。如果选择 ALL,则包括该 PRODUCT 的所有可用地区。基于地区的可用产品可参见[此处](https://www.interactivebrokers.com/en/index.php?f=1563)。 |

|                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------- |
| \{`"tradingPermissions": [`  `{"country": "AUSTRALIA",`  `"product": "STOCKS"` `},`  `{"country": "AUSTRIA",` `"product": "STOCKS"` `},` |

### 可选配置

#### 费用管理

## advisorWrapFees

为账户指定费用计划。

|                                                                                                               |
| ------------------------------------------------------------------------------------------------------------- |
| `"advisorWrapFees": {  "strategy": "NO_FEE",  "chargeAdvisor": false,  "chargeOtherFeesToAdvisor": false  },` |

* 财务顾问客户(advisor-clients)必填。可选:使用 `feeTemplateName`,根据在 Advisor Portal 中创建的预定义模板设置费用。
* 顾问费用概述可参见[此处](https://www.interactivebrokers.com/en/pricing/advisor-fees.php)。

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| strategy | NO\_FEES AUTOMATED | **NO\_FEES** = 不对账户收取管理费。管理费可在账户获批/开立后添加。请注意,如果在账户获批/开立后才应用费用,客户需要签署确认该费用变更。**AUTOMATED**= 仅在包含 automated\_fees\_detail 时可用。费用将凭客户的全权授权(blanket client authorization)计入客户账户。 |
| chargeAdvisor | true false | 指示佣金是否将计入顾问账户。默认设置为 false。 |
| type | ANNUALFLATFEE ANNUALFLATFEE\_MONTHLY ANNUALFLATFEE\_QUATERLY BLENDEDPERCENTOFEQUITY BLENDEDPERCENTOFEQUITY\_EOM BLENDEDPERCENTOFEQUITY\_EOQ BLENDEDPERCENTOFEQUITY\_MONTHLY BLENDEDPERCENTOFEQUITY\_QUARTERLY PERCENTOFEQUITY PERCENTOFEQUITY\_EOM PERCENTOFEQUITY\_EOQ PERCENTOFEQUITY\_MONTHLY PERCENTOFEQUITY\_QUARTERLY PERCENTOFNLV\_CAP PERCENTOFNLV\_CAP\_EOPEQTY PERCENTOFNLV\_CAP\_EOPEQTY\_Q PERCENTOFNLV\_CAP\_Q | *年度固定费(Annual Flat Fee);以年化金额录入,按日、月或季度应用(按 252 天分摊)。* ANNUALFLATFEE ANNUALFLATFEE\_MONTHLY ANNUALFLATFEE\_QUATERLY  *净清算价值百分比(含区间);最多输入五个独立的净资产值区间,并为每个区间输入一个年化费率百分比。* BLENDEDPERCENTOFEQUITY BLENDEDPERCENTOFEQUITY\_EOM BLENDEDPERCENTOFEQUITY\_EOQ BLENDEDPERCENTOFEQUITY\_MONTHLY BLENDEDPERCENTOFEQUITY\_QUARTERLY  *净清算价值百分比。以年化百分比录入,按日、月或季度应用。* PERCENTOFEQUITY PERCENTOFEQUITY\_MONTHLY PERCENTOFEQUITY\_QUARTERLY  *净清算价值百分比,通过使用月末/季末(End of Month\_/Quarter\_)净清算价值、费率以及相应月度期间内的营业日天数计算得出。* PERCENTOFEQUITY\_EOM PERCENTOFEQUITY\_EOQ  *发票(Invoice);指定每月或每季度可从客户资产净值(Net Asset Value)中扣除为顾问费用的最大百分比。* PERCENTOFNLV\_CAP PERCENTOFNLV\_CAP\_Q  *期末发票上限;月末余额和季末余额开票选项允许顾问按照基于上一期间期末价值计算的上限向客户开票。* PERCENTOFNLV\_CAP\_EOPEQTY PERCENTOFNLV\_CAP\_EOPEQTY\_Q |
| maxFee | 非负整数 | 向客户账户收取的最高费用,以年化金额显示。 |

## feesTemplateName

将预定义的费用模板分配给账户。费用模板需要先在 Advisor/Broker Portal 中创建。

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `feesTemplateName` | String | 所应用费用模板的名称。数据区分大小写和空格。`feesTemplateName` 必须与之前在 Advisor/Broker Portal 中创建的模板名称完全一致。[详情](https://www.ibkrguides.com/advisorportal/homemenu/configclientfeetemplate.htm?Highlight=fee%20template) |

|                                        |
| -------------------------------------- |
| `"feesTemplateName": "MyFeeTemplate",` |

免责声明:账户开立并完成入金后,费用计划将自动应用。

#### 入金

## depositNotification

在客户注册期间包含入金指示。

* 在开户过程中,我们支持支票(Check)或电汇(Wire)的入金通知。我们的新账户团队会优先处理已完成入金的申请,因此我们鼓励用户在申请(Application)中包含入金指示。
* CHECK:该请求表示支票入金通知。客户仍需将纸质支票寄送至 IBKR。IBKR 会使用该入金通知将入账资金与账户进行匹配。
* WIRE:该请求表示电汇入金通知。客户仍需联系其银行以发起转账。IBKR 会使用该入金通知将入账资金与账户进行匹配。各币种的电汇指示列表,请联系 [dam@ibkr.com](mailto:dam@ibkr.com)。
* 请参阅[入金限制](https://www.interactivebrokers.com/en/index.php?f=1544\&p=cash1)

|                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"depositNotification": {`  `"wireDetails": {`  `"bankName": "Macquarie"`  `},`  `"type": "WIRE",`  `"amount": 30000,`  `"currency": "AUD"`  `},` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| type | CHECK WIRE | 指定资金以何种方式发送至 IBKR。 |
| amount | 非负整数值 | 存入 IBKR 的金额。如果请求中填写的金额与实际发送至 IBKR 的金额不一致,资金将不会自动记入账户。申请人需要联系我们的客服团队以核实该笔资金转账。 |
| currency | 货币代码(3 位)。可用货币可参见[此处](https://www.interactivebrokers.com/en/support/fund-my-account.php)。 | 发送至 IBKR 的资金币种。 |
| bankName | String | 发送机构名称。仅 WIRE 入金时必填 |
| acctNumber | String | 在银行的账户号码。仅 CHECK 入金时必填。 |
| routingNumber | String;最多 9 个字符 | 支票上列示的路由号码(routing number)。仅 CHECK 入金时必填。 |
| checkNumber | String;最多 16 个字符 | 寄送至 IBKR 的支票上列示的支票号码。仅 CHECK 入金时必填。 |

## extPositionsTransfers

* 向 IBKR 账户发起 ACATS 转户。IBKR 账户获批/开立后,ACATS 将自动启动。在开户过程中,我们支持全部(FULL)或部分(Partial)转户。本指南仅提供全部(FULL)转户的相关信息。有关部分(PARTIAL)转户的信息,请发送电子邮件至 [dam@ibkr.com](mailto:dam@ibkr.com)。
* 此项为可选项。
* [限制与到账时间](https://www.interactivebrokers.com/en/index.php?f=1544\&p=transfer)

|                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"extPositionsTransfers":  {  "type": "FULL",  "subType": "ACATS",  "brokerId": "0226",  "brokerName": "Wall Street Financial Group",`  `"accountAtBroker": "SOL12345", "sourceIRAType": "RO",  "ssn": "123232323",  "signature": "John Tester" "marginLoan": true, "shortPos": false, "optionPos": false, "authorizeToRemoveFund": true }` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| type | FULL PARTIAL | 指示这是全部转户还是部分转户。 |
| optionPos | true false | 账户是否持有期权持仓?是/否 |
| ssn | String | 账户上列示的 SSN(应与 Identification 元素和 TaxResidency 元素中列示的 SSN 一致) |
| brokerId | 使用 [`/api/v1/enumerations/acats`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/get-enumerations)查看取值。 | 转出机构的 DTC 号码 |
| brokerName | 使用 [`/api/v1/enumerations/acats`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/get-enumerations)查看取值。 | 转出经纪商的名称 |
| signature | String | 应与名字(First Name)+ 中间名首字母(如适用)+ 姓氏(Last Name)一致。 |
| subType | ACATS | 静态值——对于 ACATS 转户,始终为 ACATS |
| accountAtBroker | String | 在转出机构的账户号码。 |
| marginLoan | true false | 账户是否持有空头持仓?是/否 |

#### **退休账户**

## decendent

|                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"decendent": [  {  "name": {  "salutation": "Mr.",  "first": "paulina",  "last": "ibllc test",  "middle": "M"  },  "dateOfDeath": "2021-12-15",  "relationship": "Individual",  "inheritorType": I,  "identification": {  "SSN": "1231231212",  "citizenship": "USA",  },` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| dateOfDeath | YYYY-MM-DD | 死亡日期。 |
| SSN | String | 社会安全号码,逝者必填。 |
| citizenship | [3 位 ISO 代码](https://www.iso.org/obp/ui) | 逝者的国籍。 |
| inheritorType | I O T S | I=Individual(个人) O= Other(其他) T= Trust(信托) S= Spouse(配偶) |
| relationship | Individual Other Trust Spouse | |

## employeePlan

|                              |
| ---------------------------- |
| `"employePlan": "U1234456",` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| employeePlan | String | 与员工计划管理员(Employee Plan Administrator)相关联的 IBKR 账户 ID。 |

* 可使用 `/api/v1/enumerations/employee-plans` 查看与主账户(master)关联的 EPA 列表。
* 如果员工计划管理员未与主账户关联,将抛出错误。
* 雇主将直接与 Interactive Brokers 开立雇主计划管理账户(**EPA**)
* 顾问/经纪商主账户将向 EPA 提交一次性关联请求
  * EPA 将接受该请求
* SIMPLE IRA 账户将关联至 EPA 和顾问。
  * 顾问/经纪商与 EPA 双方都必须在 Interactive Brokers 开有账户
* EPA 管理 SIMPLE IRA 账户的所有缴款
* 顾问/经纪商可代表 SIMPLE IRA 持有人进行交易
* 顾问/经纪商可以使用所有指定的 FA(财务顾问)功能,但发起入金通知除外

## iraBeneficiaries

|                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"iraBeneficiaries": { "primaryBeneficiaries": [ { "name": { "salutation": "Mr.", "first": "Joe", "last": "Smith", "middle": "A" }, "dateOfBirth": "1967-11-09", "countryOfBirth": "USA", "residenceAddress": { "street1": "1 Tester Way", "city": "Stamford", "state": "CT", "country": "United States", "postalCode": "94510" }, "identification": { "citizenship": "United States", "ssn": "132121212", }, "externalId": "100883PB1", "sameMailAddress": true, "ownershipPercentage": 100, "relationship": "Husband" } ], "successor": false "spousePrimaryBeneficiary": false },` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| spousePrimaryBeneficiary | true false | 指示配偶是否为主要受益人。 |
| successor | true false | 指示是否为继承(successor)。仅适用于加拿大 TSFA 账户。 |

* 如果 **MaritalStatus="M"** 且 **spouse\_primary\_beneficiary="false"**,则需要提交配偶同意书(Spousal Consent Form,form\_no="4091″)才能获批。配偶同意书可通过 [/update](https://www.interactivebrokers.com/campus/ibkr-api-page/webapi-ref-staging/#tag/Account-Management-Accounts/paths/~1gw~1api~1v1~1accounts/patch)端点,使用 '[DocumentSubmission](https://www.interactivebrokers.com/campus/ibkr-api-page/webapi-ref-staging/#tag/Account-Management-Accounts/paths/~1gw~1api~1v1~1accounts/patch)' 提交给 IBKR。[下载配偶同意书](https://gdcdyn.interactivebrokers.com/Universal/servlet/Registration_v2.formSampleView?formdb=4091)

## ira & iraType

退休账户必填。

* 指示是否为退休账户,并设置退休账户类型。

|                                        |
| -------------------------------------- |
| `"iraType": "SIMPLE",` `"ira": "true"` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| ira | true false | 默认为 false。若为退休账户,则设置为 true。 |
| iraType | RI RO RT SP TH RH SH TFSA RRSP SRRSP SIMPLE ISA | 若 `ira:"true"` 则必填  仅适用于美国居民:RI= Traditional New(传统型新账户) RO = Traditional Rollover(传统型转存) RT = Roth New(Roth 型新账户) SP= SEP New(SEP 型新账户) TH = Traditional- Inherited(传统型继承) RH= Roth- Inherited(Roth 型继承) SIMPLE 详情:[https://www.interactivebrokers.com/en/index.php?f=14429](https://www.interactivebrokers.com/en/index.php?f=14429)  仅适用于加拿大居民:TFSA= Tax Free Savings Account(免税储蓄账户)。RRSP = Registered Retirement Savings Plan(注册退休储蓄计划)。SRRSP= Spousal Registered Retirement Savings Plan(配偶注册退休储蓄计划)。详情:[https://www.interactivebrokers.ca/en/index.php?f=11792](https://www.interactivebrokers.ca/en/index.php?f=13406\&p=tfsa)  仅适用于英国居民:ISA= Individual Savings Account(个人储蓄账户) 详情:[https://www.interactivebrokers.co.uk/en/trading/isa-accounts.php](https://www.interactivebrokers.co.uk/en/trading/isa-accounts.php) |

#### 交易配置

## accountConfiguration

管理账户的 LITE/PRO 标识。

仅可按需申请;如需使用该服务,请联系 [dam@ibkr.com](mailto:dam@ibkr.com)。

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| value | true false | true:启用服务 false:停用服务 |
| type | LiteExecution | 配置类型 |

|                                                                               |
| ----------------------------------------------------------------------------- |
| `"accountConfiguration": {`  `"type": "LiteExecution",`  `"value": true` `},` |

## accountType

设置交易账户类型,仅适用于面向 IB-AU 的客户。

* 适用于面向 IB-AU 实体的账户。

|                            |
| -------------------------- |
| `"accountType":"Trading",` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| accountType | Investment Trading | **Investment**:面向最低入金 2K AUD、最低流动净资产 20K AUD 的个人投资者。不允许保证金交易,仅允许有限期权、无杠杆现货外汇以及部分低杠杆衍生品交易。**Trading**:面向最低入金 10K AUD、且最低流动净资产为 100K AUD,或流动净资产 20K AUD 加最低收入 50K AUD 的个人投资者。不可进行保证金交易,但允许有限期权和无杠杆现货外汇。 |

## drip

为账户注册股息再投资计划。

* 股息再投资(DRIP)是一种可选功能,您可以选择以何种方式接收股票和共同基金的股息。股息再投资仅面向 IB LLC、IB AU、IB CAN、IB HK、IB IE、IB JP、IB SG 和 IB UK 客户提供。
* 有关 DRIP 的信息可参见[此处](https://www.ibkrguides.com/clientportal/dividendreinvestment.htm)。

|                  |
| ---------------- |
| `"drip": false,` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| drip | true false | 标志,指示账户是否将订阅股息再投资计划(Dividend Reinvestment Plan)。IBKR 提供股息再投资计划,账户持有人可选择将符合条件的现金股息再投资,用于购买发行公司的股票 |

## stockYieldProgram

将账户注册加入 Stock Yield Enhancement Program(股票收益增强计划)。

* Stock Yield Enhancement 计划允许 IBKR 将原本会被隔离存放的证券持仓(即全额缴清证券和超额保证金证券)出借给第三方,从而为客户提供在这些证券持仓上赚取额外收入的机会。参与该计划的客户将获得现金抵押品,以确保在股票借贷终止时归还该股票借贷;此外,在借贷存续的每一天,客户还可就借入方提供的现金抵押品获得利息。
* 有关 Stock Yield Program 的信息可参见[此处](https://www.interactivebrokers.com/en/pricing/stock-yield-enhancement-program.php)。

|                               |
| ----------------------------- |
| `"stockYieldProgram": false,` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| stockYieldProgram | true false | 标志,指示账户是否将加入 IBKR 的 Stock Yield Enhancement Program(股票收益增强计划)。 |

## limitedOptions

启用有限期权(Level 1 和 Level 2)的访问权限

|                           |
| ------------------------- |
| `"limitedOptions": false` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| limitedOptions | true false | 指示是否选择有限期权交易。默认为 "False" |

* 有限期权交易可搭配任何投资目标(Investment Objective)使用。
* 有限期权交易允许您交易以下期权策略:
  * 买入看涨期权或看跌期权(Long Call or Put)
  * 备兑看涨期权(Covered Calls)
  * 卖出无备兑看跌期权(Short Naked Put):仅限有现金担保时
  * 看涨价差(Call Spread):仅限欧式现金结算
  * 看跌价差(Put Spread):仅限欧式现金结算
  * 买入蝶式(Long Butterfly):仅限欧式现金结算
  * 铁鹰(Iron Condor):仅限欧式现金结算
  * 买入看涨期权与看跌期权(Long Call and Puts)
* 有关期权等级的信息可参见[此处](https://www.ibkrguides.com/clientportal/optionstradingpermissions.htm)。

## multiCurrency

管理对非基础货币产品的访问权限。

|                          |
| ------------------------ |
| `"multiCurrency": true,` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| multicurrency | true false | 指示该账户是否具备多币种能力。 |

* 默认情况下,所有账户均可使用货币兑换功能(例如多币种)。

#### 补充

## accountRep

为账户指定账户代表。

|                                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------- |
| `"accountRep": {`  `"repDetails": {`  `"repId": "potest123",`  `"percentage": 50`  `},` `"repId": "w3test123",`  `"percentage": 50`  `},` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| **repId** | String | 与账户代表(account rep)关联的用户名。 |
| percentage | Number | |

* 为账户指定账户代表。账户代表在主账户(master)层面代表用户。
* 可以为单个账户分配多个代表。所有代表的百分比之和必须等于 100。
* 如果代表不是主账户层面的用户,将抛出错误。

## migration

指示账户是否属于批量迁移的一部分。

|                       |
| --------------------- |
| `"migration": false,` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| migration | true false | 指示账户是否为迁移账户。 |

* 仅适用于正在完成批量迁移的顾问/经纪商。
* 该属性仅可按需申请使用,请联系 [dam@ibkr.com](mailto:dam@ibkr.com)。

## propertyProfile

为账户分配账户属性。

|                                  |
| -------------------------------- |
| `"propertyProfile": "Standard",` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| propertyProfile | String | 所分配属性的名称。 |

* 为账户分配属性配置(property profile)。
* 仅可按需申请。如需使用,请联系 [am-api@interactivebrokers.com](mailto:am-api@interactivebrokers.com)。

## sourceAccountId

对于正在完成批量迁移的顾问/经纪商,请包含源账户的账户 ID。

|                                   |
| --------------------------------- |
| `"sourceAccountId": "ABA123123",` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| sourceAccountId | String | 与转出机构(delivering firm)处的个人账户相关联的账户 ID。 |

* 仅适用于正在完成批量迁移的顾问/经纪商。
* 该属性仅可按需申请使用,请联系 [am-api@ibkr.com](mailto:am-api@ibkr.com)。
