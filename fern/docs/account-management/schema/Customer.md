# Customer

## customer

定义客户的一般详细信息。

|  |
| --- |
| `"externalId": "tester111111",  "type": "INDIVIDUAL",  "prefix": "aabb",  "email": "tester@gmail.com",  "mdStatusNonPro": false,  },` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| externalId | String | `externalId`、`externalUserId` 和 `externalIndividualId` 是由交易对手方分配的唯一标识符。该标识符可用作映射,将 IBKR 账户与交易对手方系统中的账户/用户信息关联起来。`externalId` 在申请中会出现多次,包括:`customer` = 表示账户所关联的客户;`accountHolderDetails, firstHolderDetails, secondHolderDetails`:表示与账户关联的个人;`accountHolder, jointHolder` = 表示账户本身;`users`(`externalUserId` 和 `externalIndividualId`)= 表示与账户关联的用户。 |
| type | INDIVIDUAL JOINT IRA TRUST ORG | 账户类型。 |
| prefix | String | 前缀将用于创建用户 ID。IBKR 会在前缀末尾追加 3-6 位数字。如果前缀包含以下内容,您将收到错误:• 符号或数字值 – 大写字母 – 前缀少于 3 个字母或多于 6 个字母 |
| email | String | 申请人的主要电子邮箱地址。 |
| userName | 字母数字  – 仅限字母(小写)和数字。 – 至少包含 3 个字母。最少 9 个字符;最多 63 个字符 – 仅限小写,不含空格,不含特殊字符。 | 默认情况下,IBKR 将使用 Customer 和 User 节点中指定的前缀生成用户 ID。如果用户希望自行选择确切的用户名,可以通过 userName 实现。可使用 [`/gw/api/v1/validations/usernames/{username}`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/get-validations-usernames) 端点验证 usernName 是否可用。   该功能仅可通过申请开通;如需使用此服务,请联系 [am-api@interactivebrokers.com](mailto:am-api@interactivebrokers.com)。 |
| mdStatusNonPro | true false | 指明申请人被归类为专业用户(Professional)还是非专业用户(Non-Professional)。实时数据的价格将视用户是专业用户(Pro)还是非专业用户(Non-Professional)而有所不同。  如果满足以下链接中列出的任一条件,则 mdStatusNonPro=FALSE:[https://ibkr.info/article/2369](https://ibkr.info/article/2369) |
| directTradingAccess | true false | 指明申请人是否将拥有直接下单进行交易的权限。仅 Non-Disclosed(非披露)客户必填。 |
| meetAmlStandard | true false | 客户符合反洗钱标准。仅 Non-Disclosed 客户必填。 |
| taxTreatyCountry | [3 位 ISO 代码](https://www.iso.org/obp/ui) | 如果账户持有人符合美国所得税协定下的协定优惠资格,请注明相应的协定。  如果账户持有人不符合协定优惠资格,可填写 N/A。[与美国签订协定的国家](https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z) |
| legalResidenceCountry | [3 位 ISO 代码](https://www.iso.org/obp/ui) | 客户的法定居住国。仅与 Non-Disclosed 经纪客户相关。 |
| preferredPrimaryLanguage | en de es jp jp zh\_CN fr zh\_TW he | 指定 IBKR 发送的通信以及 IBKR 系统(包括 Portal 和 TWS)使用的首选语言。 |
| preferredSecondaryLanguage | en de es jp jp zh\_CN fr zh\_TW he | 指定 IBKR 发送的通信以及 IBKR 系统(包括 Portal 和 TWS)使用的第二首选语言。 |

## financialInformation

提供申请人的净资产、流动净资产和年净收入。

提供 `financialInformation` 有两种方式:

* 选项 1:绝对数值
* 选项 2:提供区间范围(range\_id)

校验规则因选项而异。展开下方的各节以查看差异。

### 绝对值

* 任何大于 100 的值均被视为绝对数值。如果该值小于 100,将触发错误。
* 如果提供的是绝对数值:
  * 系统会使用 `account` 节点中指定的 `baseCurrency`,将 `financialInformation` 节点中提供的数据转换为 range ID。
  * 在根据 IBKR 的财务最低要求校验 `financialInformation` 时,我们的系统会使用 range\_id 的下限值
  * 我们的系统会将 range\_id 的下限值从 `baseCurrency` 转换为 IB 货币,以校验所申请权限的资格。
    * IBLLC = USD
    * IB-UK = GBP
    * IB-CE, IB-IE = EUR
    * IB-HK = HKD
    * IB-AU = AUD
    * IB-CAN = CAD

|  |
| --- |
| `financialInformation": [ {"netWorth": 750000, "liquidNetWorth": 500000, "annualNetIncome": 50000}` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| net\_worth | Number | 您拥有的全部资产的总价值,减去您所欠的债务(包括所有按揭贷款和负债)。您的净资产不能低于您的流动净资产。如果提供绝对数值,接受的最小值为 101;接受的最大值为 50000001 |
| liquid\_net\_worth | Number | 您拥有的可快速转换为现金的资产总价值。如果提供绝对数值,接受的最小值为 101;接受的最大值为 5000001 |
| annual\_net\_income | Number | 您一年的总收入减去从薪酬中扣除的税款或其他扣款。这些其他扣款可能包括健康保险、退休金缴款、法院判决或赡养/抚养费。如果提供绝对数值,接受的最小值为 0;接受的最大值为 1000001 |
| details | String | 最多 350 个字符。提供收入来源说明。 |

### 区间范围

* 交易权限和账户类型(Cash、Margin、Portfolio Margin)的资格将根据所提供的财务信息进行校验。[财务最低要求](https://www.interactivebrokers.com/en/index.php?f=4945\&p=tradingrequirements)
* 对于通过 API 提交给 IBKR 的申请,`financialInformation` 以与该 IBKR 实体关联的货币进行收集。
* 在根据 IBKR 的财务最低要求校验 `financialInformation` 时,我们的系统会使用 range\_id 的下限值。
* 我们的系统会将 range\_id 的下限值从 baseCurrency 转换为 IB 货币,以校验所申请权限的资格。
  * IBLLC = USD
  * IB-UK = GBP
  * IB-CE, IB-IE = EUR
  * IB-HK = HKD
  * IB-AU = AUD
  * IB-CAN = CAD
* range\_id 仅可用于以下货币:

|     |     |     |     |     |
| --- | --- | --- | --- | --- |
| AUD | GBP | KRW | PLN | USD |
| CAD | HKD | MXN | RUB |     |
| CHF | ILS | SEK | SGD |     |
| EUR | JPY | NZD | TRY |     |

|  |
| --- |
| `financialInformation": [ {"netWorth": 8, "liquidNetWorth": 5, "annualNetIncome": 7}` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| netWorth | range\_id:直接使用 `/gw/api/v1/enumerations/fin-info-ranges?currency=<CURRENCY>` 获取 | 您拥有的全部资产的总价值,减去您所欠的债务(包括所有按揭贷款和负债)。您的净资产不能低于您的流动净资产。 |
| liquidNetWorth | range\_id:直接使用 `/gw/api/v1/enumerations/fin-info-ranges?currency=<CURRENCY>` 获取 | 您拥有的可快速转换为现金的资产总价值。 |
| annualNetIncome | range\_id:直接使用 `/gw/api/v1/enumerations/fin-info-ranges?currency=<CURRENCY>` 获取 | 您一年的总收入减去从薪酬中扣除的税款或其他扣款。这些其他扣款可能包括健康保险、退休金缴款、法院判决或赡养/抚养费。 |
| details | String | 最多 350 个字符。提供收入来源说明。 |

## investmentExperience

申请人的投资经验。

* yearsTrading 会与申请人的年龄进行校验。如果 yearsTrading > 日期 – 18,您将收到错误。
* 不能硬编码。
* 我们只要求提供客户所申请产品的经验。
* FOP、SSF、WAR、FOP、ETF 和共同基金不需要提供经验,因为它们是子类别。
  * 即:如果申请人只想交易股票、共同基金和 ETF,我们只需要 STK 的经验。

|  |
| --- |
| `{ "investmentExperience": [ { "assetClass": "STK", "yearsTrading": 5, "tradesPerYear": 2, "knowledgeLevel": "Limited" }, { "assetClass": "BOND", "yearsTrading": 1, "tradesPerYear": 1, "knowledgeLevel": "Limited" } ],` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| assetClass | STK BOND OPT FUT CASH MRGN | STK= 股票(ETF、ADR 和共同基金)  BOND= 债券(国库券、市政/公司债券)  OPT= 期权  FUT= 期货(包括个股期货、期货期权)  CASH= 外汇(包括货币兑换和杠杆外汇)  MRGN= 保证金(仅适用于申请 Margin 的 IB-UK/IB-EU/IB-IE/IB-CE 账户)。 |
| knowledgeLevel | None Limited Good Extensive | 申请人交易该产品所具备的知识水平。 |
| tradesPerYear | 非负整数值 | 申请人针对指定产品每年下单的平均交易次数。 |
| yearsTrading | 非负整数值 | 申请人交易该特定产品的经验年数。 |

**对于顾问客户:**

* 投资经验的校验由 Advisor-Master 驱动。
* 如果顾问仅注册了证券(Securities)业务,则子账户仅有资格交易股票、期权、债券和共同基金。

**对于经纪客户:**

* **STK**
  * yearsTrading="1″ 且 tradesPerYear \< 10:
    * knowledgeLevel= Good 或 Extensive:校验将通过。
    * knowledgeLevel= None 或 Limited:这将触发错误,申请将不予处理。

* **OPT**
  * years\_trading="1″ 且 tradesPerYear \< 10:
    * 这将触发错误,申请将不予处理。
    * 由于客户交易期权的经验不足两年,客户必须参加期权考试
  * yearsTrading="2″ 且 tradesPerYear \< 10:
    * knowledgeLevel= Good 或 Extensive:校验将通过。
    * knowledgeLevel= None 或 Limited:这将触发错误,申请将不予处理。

* **BOND**
  * yearsTrading="1″ 且 tradesPerYear \< 10:
    * knowledgeLevel= Good 或 Extensive:校验将通过。
    * knowledgeLevel= None 或 Limited:这将触发错误,申请将不予处理。

* **FUT**
  * yearsTrading="1″ 且 tradesPerYear \< 10:
    * 这将触发错误,申请将不予处理。
    * 由于客户交易期货的经验不足两年,客户必须参加期货考试
  * yearsTrading="2″ 且 tradesPerYear \< 10:
    * knowledgeLevel= Good 或 Extensive:校验将通过。
    * knowledgeLevel= None 或 Limited:这将触发错误,申请将不予处理。
  * **CASH**
    * yearsTrading="1″ 且 tradesPerYear \< 10:
      * 校验将不通过
    * year yearsTrading="2″ 且 tradesPerYear \< 10:
      * knowledgeLevel= Good 或 Extensive:校验将通过。
      * knowledgeLevel= None 或 Limited:这将触发错误,申请将不予处理。

## sourcesOfWealth

财富来源是指申请人获得用于为账户注资资金的途径。

* 如果 EmploymentType = EMPLOYED 或 SELFEMPLOYED
  * SOW-IND-Income 必须列在 sourceOfWealth 中,但不需要被选为用于为账户注资的来源。
* 申请人不能多次指定同一来源。
* 如果 usedForFunds=\"false\",则不需要 percentage
* 所有 sourceOfWealth 的百分比之和必须 = 100%
* 所有申请人均必填(即 EMPLOYED、SELFEMPLOYED、RETIRED、UNEMPLOYMENT、STUDENT、ATHOMETRADER 或 HOMEMAKER)

|  |
| --- |
| `"sourcesOfWealth": [  {  "sourceType": "SOW-IND-Inheritance",  "percentage": 100,  "usedForFunds": true  },` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| sourceType | **个人/ 联合 / 退休**  SOW-IND-Allowance SOW-IND-Disability SOW-IND-Income SOW-IND-Inheritance SOW-IND-Interest SOW-IND-MarketProfit SOW-IND-Other SOW-IND-Pension SOW-IND-Property  **机构 / 信托**  SOW-ORG Business SOW-ORG-MarketTradingProfits SOW-ORG-Other SOW-ORG-OwnerEquity SOW-ORG-Property SOW-ORG-RetainedEarnings | Other- 需要填写 description。 |
| description | String;最多 128 个字符。 | 描述资金来源。仅当 source\_type=\"SOW-IND-Other\" 或 \"SOW-ORG-Other\" 时必填 |
| percentage | 非负整数 | 仅在以下情况下必填:1)usedForFunds = true 且账户 2)账户开立于 IB-HK、IB-AU、IB-UK、IB-UKL、IB-IE、IB-CE |
| usedForFunds | true false | 该来源是否用于为账户注资?是/否 |

## regulatoryInformation

指明申请人或与账户关联的个人是否属于 FINRA 类别。

### regulatoryDetail

**FA/FD:** **Individual、Retirement、Joint(所有实体)**

* **AFFILIATION**:申请人或任何居住在同一住户内的直系亲属,是否注册为经纪自营商,或为证券或大宗商品经纪公司的雇员、董事或所有者?(是/否)如果为 **true**,则需要填写 [affiliationDetails](/web-api/account-management/schema/customer#affiliationdetails)。

**FA/FD/OWD:** **Individual、Retirement、Joint(除 IB-AU 外的所有实体)**

* **EmployeePubTrade**:账户的所有者,或列于账户的其他非所有者,是否为某上市公司的雇员?(是/否)
* **ControlPubTraded**:账户的所有者,或列于账户的其他非所有者,是否控制某家上市公司?(是/否)

**FA/FD: Individual、Retirement、Joint(仅 IB-AU)**

* **POLITICALMILITARYDIPLOMATIC**:账户持有人或其直系亲属是否:(i) 为任何国家的高级政府官员,(ii) 为澳大利亚或非澳大利亚使馆的高级外交人员、大使或高级专员,或 (iii) 为任何国家武装部队的高级成员,或 (iv) 为任何国家任何国有企业的资深高管(CEO、CFO 或同等职位)。(是/否)
* **CONTROLLER**:账户持有人或其直系亲属,是否为任何上市公司(已上市)或任何交易所交易金融产品的发行人/管理人的董事、高级雇员或高管?(是/否)

**OWD: 机构**

* **STOCKCONTROL**:该机构是否为一家公众持有实体,其股票在受监管的交易所交易?(是/否)如果是,请在 detail 中提供股票代码。
* **FOREIGN\_BANK**:该机构是否为一家外国银行(在欧盟之外成立并位于欧盟之外)?(是/否)
* **MONEY\_TRANSMITTER**:该机构是否为一家持牌资金传输机构?(是/否)
* **HIGH\_RISK\_CONTRIBUTION**:贵机构是否有 10% 或以上的收入来自在高风险国家开展的业务?(是/否)如果是,请提供适用的国家。(如需国家列表,请联系 [dam@ibkr.com](mailto:dam@ibkr.com))。

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| code | AFFILIATION EmployeePubTrade ControlPubTraded POLITICALMILITARYDIPLOMATICCONTROLLER STOCKCONTROL FOREIGN\_BANK MONEY\_TRANSMITTER HIGH\_RISK\_CONTRIBUTION |  |
| status | true false | 对上述监管问题的回答。是 = true,否 = false |
| detail | String | 如果以下任一情况成立则必填:   **EmployeePubTrade** – 输入一家或多家公司的股票代码,以逗号分隔。股票代码必须为大写。  **ControlPubTraded** – 输入一家或多家公司的股票代码,以逗号分隔。股票代码必须为大写。  **STOCKCONTROL** – 输入一家或多家公司的股票代码,以逗号分隔。股票代码必须为大写。  **HIGH\_RISK\_CONTRIBUTION –** 输入一个或多个国家,以逗号分隔。国家必须为 3 位 ISO 代码且全部大写。 |
| externalIndividualId | String | 与账户持有人关联的 External\_ID。 |

如果 ControlPubTraded 和/或 EmployeePubTrade=\"false\"

|  |
| --- |
| `"regulatoryInformation": [ { "regulatoryDetail": [ { "code": "ControlPubTraded", "status": false }, { "code": "EmployeePubTrade", "status": false }, { "code": "AFFILIATION", "status": false } ], "translated": false } ]` |

如果 ControlPubTraded 和/或 EmployeePubTrade=\"true\"

|  |
| --- |
| `"regulatoryInformation": [ { "regulatoryDetail": [ { "code": "ControlPubTraded", "status": true, "externalIndividualId": "tester12345", "detail": "AAPL"}, { "code": "EmployeePubTrade", "status": true, "externalIndividualId": "tester12345", "detail": "AAPL"}, { "code": "AFFILIATION", "status": false } ], "translated": false } ]` |

### affiliationDetails

**选项 1:** **关联到现有的 IBKR EmployeeTrack 账户**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| isDuplicateStmtRequired | true false | 指明 IBKR 是否应向客户发送对账单副本。对于受 FINRA Rule 3210 或其所在司法辖区同等规定约束的人员,期望的答案为 true,因为他们需要向其雇主的合规办公室提交一份副本。 |
| affiliationRelationship | Other Spouse Parent Child Self | 关联人员与申请人的关系。 |
| personName | String | 关联人员的姓名。 |
| companyId | String | 如果雇主在 IBKR 拥有 EmployeeTrack 账户,您可以将该账户关联到 EmployeeTrack 账户。雇主将自动收到该账户的对账单副本。  使用 [/getEnumerations](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/get-enumerations) 的 'company\_id' 查询在 Interactive Brokers 拥有有效 EmployeeTrack 账户的公司列表。 |

**选项 2:** **提供公司详细信息(用于雇主在 IBKR 没有 [EmployeeTrack](https://www.interactivebrokers.com/en/accounts/compliance-officer.php) 账户的情况)**

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| is\_duplicate\_stmt\_required | true false | 指明 IBKR 是否应向客户发送对账单副本。对于受 FINRA Rule 3210 或其所在司法辖区同等规定约束的人员,期望的答案为 true,因为他们需要向其雇主的合规办公室提交一份副本。 |
| affiliation\_relationship | Other Spouse Parent Child Self | 关联人员与申请人的关系。 |
| person\_name | String;最多 48 个字符 | 关联人员的姓名。 |
| company | String;最多 400 个字符 | 关联人员受雇公司的名称。 |
| company\_phone | String;最多 18 个字符 | 公司合规负责人的电话号码。我们使用 Google API 验证电话号码。该 API 允许随电话号码一起传入国家代码。Google Phone Library 版本为 8.12.2[https://github.com/google/libphonenumber](https://github.com/google/libphonenumber) |
| company\_email\_address | String;最多 80 个字符 | 公司合规负责人的电子邮箱地址。我们使用正则表达式(REGEX)验证电子邮箱地址:^\[A-Z0-9]\[A-Z0-9.\_%+-]\{0,63}@(?:(?=\[A-Z0-9-]\{1,63}\[.])\[A-Z0-9]+(?:-\[A-Z0-9]+)\*\[.])\{1,8}\[A-Z]\{2,63}\$ |
| companyMailingAddress | object (Address) | 雇主的邮寄地址 |
| street1 | String;最多 200 个字符 |  |
| street2 | String;最多 200 个字符 |  |
| country | [3 位 ISO 代码](https://www.iso.org/obp/ui) | 雇主所在的国家。 |
| state | [3166-2 ISO Code](https://www.iso.org/obp/ui#search) | 雇主所在的州/省。 |
| city | String;最多 100 个字符 | 雇主所在的城市。 |
| postal\_code | String;最多 20 个字符 | 邮政编码。对于不提供邮政编码的国家,请输入 \"00000″\" |

## witholdingStatement

提供申请人的预扣税声明。

|  |
| --- |
| `"withholdingStatement": { "effectiveDate": "2024-11-01", "fatcaCompliantType": "FATCA_COMPLIANT", "treatyCountry": "GBR" }` |

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| effectiveDate | YYYY-MM-DD | 预扣税声明的生效日期。 |
| fatcaCompliantType | FATCA\_COMPLIANT NON\_CONSENTING\_US\_ACCOUNT NON\_COOPERATIVE\_ACCOUNT | 指明账户持有人是否为符合 FATCA 的账户 |
| treatyCountry | [3 位 ISO 代码](https://www.iso.org/obp/ui) | 如果账户持有人符合美国所得税协定下的协定优惠资格,请注明相应的协定。    >如果账户持有人不符合协定优惠资格,可填写 N/A。  >[与美国签订协定的国家](https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z) |
