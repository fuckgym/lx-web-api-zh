# 错误处理

## 客户注册 – 创建新账户

\[POST] 或 \[PATCH] gw/api/v1/accounts

向我们的 API 发起请求时,您会收到指示请求结果的 HTTP 状态码。但请务必理解,状态码为 200 并不总是意味着您的请求已成功。

### HTTP 状态码

1. **200**:您的请求已到达服务器并被处理
2. **非 200 状态码**:您的请求未通过网关验证(例如 400、401、404、500)

### 200 OK

200 状态码仅表示您的请求成功到达了我们的应用程序并被处理。但实际结果可能是以下两种类型之一:

**成功响应(200):**这表示您的请求不仅到达了服务器,还通过了所有验证检查并被成功处理。

**错误响应(200 带错误):**这表示您的请求虽然成功到达了应用程序(通过了网关验证),但在应用程序内部的某些业务逻辑或验证检查中失败。

* 响应内的 status 将返回 `ERROR`
* 错误详情将包含在 `error.value` 中

### 示例响应

```
{
    "requestId": 464041722,
    "dateSubmitted": "20250805143508 UTC",
    "fileData": {
        "data": {
            "execution": {
                "executedAt": "20250805143509 UTC",
                "client": "Test client for account I19565014",
                "clientMasterAccount": "I1111111",
                "processFile": "II1111111-08-05_103508896_853839.json"
            },
            "application": {
                "customer": "Jane F Tester",
                "externalId": "testUser12345",
                "status": "Error",
                "error": [
                    {
                        "value": "Unable to determine client IB entity. Kindly provide valid Residence country and Legal Residence Country."
                    }
                   
                    }
                ]
            }
        },
        "name": "II1111111-103509392_144127.json.report"
    }
}
```

理解这一区别至关重要,原因如下:

1. 您不能仅依赖 HTTP 状态码来判断操作是否成功
2. 您的代码应始终检查响应体的结构和 status 字段
3. 网关错误(非 200)表示请求格式、身份验证或服务器可用性存在问题
4. 应用程序错误(200 带错误状态)表示数据或业务逻辑存在问题

## 错误库

### 200 带错误

### **customer**

| 错误消息 | 说明 |
| --- | --- |
| "不支持的值。Property:'sourceType', value:'SOW-IND-inheritance", | Inheritance 的首字母需大写。请参阅 [https://www.interactivebrokers.com/campus/ibkr-api-page/web-api-account-management/#customer-26](https://www.interactivebrokers.com/campus/ibkr-api-page/web-api-account-management/#customer-26) |
| "当 EmploymentType 为 EMPLOYED 时,SourcesOfWealth 必须包含 SOW-IND-Income" | 由于个人为受雇状态,财富来源中必须包含就业所得收入。 |
| "用于账户注资的 SourcesOfWealth 总百分比为 10%。其总和必须为 100%。" | 如果财富来源(Sources of Wealth)占比之和达不到 100%,则会抛出此错误。 |
| "缺少投资经验。" | 如果载荷(payload)中缺少 'investmentExperience',则会抛出此错误。 |
| "缺少财务信息。" | 如果载荷中缺少 'financialInformation',则会抛出此错误。 |
| 缺少财富来源(Source(s) of Wealth)。 | 如果缺少 sourcesOfWealth,则会抛出此错误。 |
| "缺少监管信息。" | 如果缺少 'regulatoryInformation',则会抛出此错误。 |
| "投资目标为必填项。" | 如果缺少 'investment objectives',则会抛出此错误。 |
| "无法识别的属性:'isUsTaxResident'", | 如果缺少 'usTaxresident',则会抛出此错误。 |
| "无法识别的属性:'hasExpirationDate'", | 如果 POI(身份证明)文件中缺少 'hasExpirationDate'。 |
| "不支持的值。Property:'customerType', value:'INDIVIDUAL'" | 客户类型应填写为 'Individual'。 |
| "不支持的值。Property:'knowledgeLevel', value:'LMT'" | knowledgeLevel 应填写为 'Limited'。 |
| "不支持的值。Property:'knowledgeLevel', value:'NO Knowledge | knowledgeLevel 应填写为 'Limited'、'Good' 或 'Extensive'。 |
| "不支持的值。Property:'assetClass', value:'opt'," | assetClass 应填写为大写的 'OPT'。 |
| "缺少账户持有人的 Identification 节点中的签发国家/地区。" | 请在 Identification 节点中填写签发国家/地区(身份证件的签发国家/地区)。 |
| "缺少账户持有人的有效身份证明。请提供有效的身份证明,例如 SSN、SIN、护照(Passport)、国民身份证(National Card)、外侨卡(Alien Card)、驾照(Driver's License)或纳税人识别号(Tax Id)。" | 请提供有效身份证件。请参阅:[此文档](/account-management/schema/associatedindividual) |
| financialInformation 节点中的总资产(Total Assets)值无效。总资产必须为正值。 | 为 `totalAssets` 提供的值无效。 |
| 发生 accounts 异常:指定了不正确的投资目标。 | 如果 `investmentObjectives` 无效/与可接受的值不匹配,则会抛出此错误。详情请参阅[此处](/account-management/schema/accounts)。 |
| 指定的资产类别不正确。 | 如果 `investmentExperience` 内的 `assetClass` 属性无效或缺失,则会抛出以下错误。 |
| 缺少资产经验。 | 如果 JSON 中缺少 `assetClass`,则会抛出此错误。 |
| AssetExperience 节点中资产类别 BOND 缺少知识水平。 | 如果 assetExperience 中的 knowledgeLevel 缺失或为空,则会抛出以下错误。 |
| AssetExperience 节点中资产类别 BOND 缺少交易年限。 | 如果 assetExperience 中的 `yearsTrading` 缺失或为空,则会抛出此错误。 |
| AssetExperience 节点中资产类别 BOND 缺少每年交易次数。 | 如果 assetExperience 中的 `tradesPerYear` 缺失或为空,则会抛出此错误。 |
| 当 employmentType 为 EMPLOYED 时,SourcesOfWealth 必须包含 SOW-IND-Income。 | 如果 `employmentType` 为 Employed,则必须有一个 SOW 类型为 "Income"。 |
| 来源类型 SOW-IND-Other 缺少描述。 | 如果 "Other" 类型的 SoW 缺少 `description`,则会抛出此错误。 |
| sourceOfWealth 的来源类型缺失或无效。 | 如果 `sourcesOfWealth` 的 `sourceType` 缺失或值无效,则会抛出此错误。 |
| 必须至少使用一个 sourceOfWealth 为账户注资。 | 如果不存在 `sourceofWealth` 节点,或它们用于账户注资的标志全部为 false,则会抛出此错误。 |
| 仅当使用 SourceOfWealth 为账户注资时才需要填写百分比。 | 如果为不用于账户注资的 SoW 填写了百分比(0 以外的值),则会抛出此错误。 |
| 发生 accounts 异常:\* Capabilities 的财务标准检查失败:\{financial=流动净资产必须大于 USD 20,000.} | 如果 `liquidNetWorth` 的值小于 20,000,则会抛出此错误。 |
| 发生 accounts 异常:\* Capabilities 的财务标准检查失败:\{est\_net\_worth=您的流动净资产不能大于净资产} | 如果 `netWorth` 小于流动净资产,则会抛出此错误。 |
| FinancialInformation 节点中的净资产、流动净资产和年度净收入值无效。 | 如果 `financialInformation` 节点中缺少 `netWorth`、`liquidNetWorth` 或 `annualNetIncome`,则会抛出此错误。 |
| NOT valid – null | 如果在 `financialInformation` 节点的属性中输入了无效字符(例如包含字母、逗号、空格,而非仅数字),则会抛出以下错误。 |
| 客户类型为 null 或无效(不是 INDIVIDUAL、UGMA、UTMA、JOINT、TRUST 或 ORG) | 如果 customer 节点中的 `type` 属性为空或值无效,则会抛出此错误。 |
| Customer 层级缺少 prefix 属性。 | 如果 `prefix` 值为空或缺失,则会抛出此错误。 |
| NullPointerException |  |
| Regulatory Details 中的代码无效或缺失。 | 如果 `regulatoryDetail` 中的 `code` 属性无效或为空,则会抛出此错误。 |
| String index out of range: 0 | 如果某个属性为空,则会抛出此错误。例如 `regulatoryDetail.` 中的 status 为空。 |
| 用于账户注资的 SourcesOfWealth 总百分比为 95%。其总和必须为 100%。 | 如果 SOW 百分比之和不是恰好 100%,则会抛出此错误。 |
| 以 \<insertPrefixHere> 为前缀的所有用户名均已被占用。请使用其他前缀。 | 表示该特定前缀的所有有效组合(000 – 999)均已被占用。请修正 `customer` 和 `users` 节点中包含的前缀并重新提交。 |
| 以下美国标识(US Indicia)检查结果呈阳性。 | 对于非美国申请人,若满足以下任一条件,US Indicia 检查将呈阳性:[countryOfBirth](https://www.ibkrguides.com/dameca/Schema/CountryOfBirth.htm) 中提供了 'United States' 或 'USA' IssuingCountry([Identification](https://www.ibkrguides.com/dameca/Schema/Identification.htm)) Citizenship、Citizenship2、Citizenship3([Identification](https://www.ibkrguides.com/dameca/Schema/Identification.htm)) country(mailingAddress 或 Residence) phone – AML/开户文件中的永久地址或邮寄地址所在国家/地区与 W8BEN 第 9 栏中的国家/地区代码不一致 – 客户未申报税务居民身份的地址(永久地址或邮寄地址) – 地址位于根西岛、泽西岛、直布罗陀或马恩岛,但客户未在该地申报税务居民身份 |
| "不支持的值。Property:'customerType', value:'individual |  |

#### **AssociatedIndividual**

| **错误消息** | **说明** |
| --- | --- |
| 开户人必须年满 18 岁 | 个人必须年满 18 岁才能开户。 |
| 缺少个人的婚姻状况类型 | 如果缺少婚姻状况(Marital Status),则会抛出此错误。 |
| 缺少个人的雇佣类型。 | 如果 `employmentType` 缺失、为空或无效,则会抛出此错误。 |
| 美国 SSN 无效。 | 如果 `Identification` 节点中的 `ssn` 属性为空或无效,则会抛出此错误。 |
| 划转时必须提供 SSN 或 EIN | 如果 `extPostisionTransfer` 节点中缺少 `ssn` 属性,则会抛出此错误。 |
| 客户 \<externalID> – 州代码 \<stateCode> 无效 | 如果任一节点中的 `state` 无效,则会抛出此错误。 |
| 缺少账户持有人的母语姓名 | 缺少账户持有人的母语姓名。 |
| 账户持有人的 NativeName 节点中的详细信息必须以母语提供。 | `nativeName` 节点中的值是以英文提供的。 |
| 缺少账户持有人的个人姓名 | 缺少 Name 节点。 |
| 缺少账户持有人的英文中间名。 | 中间名包含在 `nativeName` 中,但在 Name 节点中缺失。 |
| 账户持有人的出生日期格式无效。预期格式为 yyyy-mm-dd。 | 如果 DOB 为 yyyy-mm-dd 以外的任何值,则会抛出错误。针对下方列出的所有测试用例将验证以下格式\.97-12-24(年份格式无效)24-12-1997(顺序无效)1997/12/24(分隔符无效)1997-12-24T07:00:00.000Z(包含时间戳)1997-02-29(非闰年的 29 日)1997-13-24(月份无效)1997-12-24a(日期中包含字符)1990-12-32(日期无效)1990-8-8 0000-00-001990-12-12 |
| 账户持有人必须提供雇主国家/地区与居住国家/地区详细信息。 | 就业国家/地区与 `residenceAddress` 的国家/地区不同,且 [employmentDetails](https://www.ibkrguides.com/dameca/Schema/EmployerDetails.htm) 节点中缺少 `emplcountryRescountryDetail`。 |
| 邮政信箱不能作为居住地址 | 我们会校验 `street1` 和 `street2`,以确保 `residenceAddress` 中未提供邮政信箱(PO Box)。请参阅相关校验。 |
| 手机号码 \<insertNumber> 无效。 | 提供的电话号码无效。我们使用 Google API 校验电话号码。该 API 允许在电话号码中附带国家/地区代码,详情请见 [Phone](https://www.ibkrguides.com/dameca/Schema/Phones.htm)。Google Phone Library 版本为 8.12.2([https://github.com/google/libphonenumber](https://github.com/google/libphonenumber))。 |
| 账户持有人的 Formw8BEN 中的外国税号必须至少为 6 位字母数字字符 | [`w8Ben`](https://www.ibkrguides.com/dameca/Schema/W8Ben.htm) 中的 `foreignTaxId` 需要超过 6 个字符。 |
| 账户持有人的 Formw8BEN 中的 part29aCountry 为非税收协定国家/地区 | `w8Ben` 中的 `part29aCountry` 与美国没有税收协定。`part29aCountry` 和 `treatyCountry` 可填写 N/A。美国税收协定国家/地区(`part29aCountry`):[https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-zCanada](https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-zCanada) 税收协定国家/地区(`treatyCountry`):[https://www.canada.ca/en/department-finance/programs/tax-policy/tax-treaties/in-force.htmlAustralia](https://www.canada.ca/en/department-finance/programs/tax-policy/tax-treaties/in-force.htmlAustralia) 税收协定国家/地区(`treatyCountry`):[https://treasury.gov.au/tax-treaties/income-tax-treaties](https://treasury.gov.au/tax-treaties/income-tax-treaties) |
| 个人的居住地址与雇主地址相同。 | 如果 `"employmentType":"EMPLOYED"`,则 `employerAddress` 不能与 `residenceAddress` 或 `mailingAddress` 相同,否则将收到错误。如果申请人为远程工作,请提供雇主的法定地址。如果 `"employmentType": "SELFEMPLOYED"`,则 employerAddress 可以与居住地址或邮寄地址相同。 |
| 账户持有人必须提供雇主国家/地区与居住国家/地区详细信息 | 当 `residenceAddress` 节点中的国家/地区与 `employerAddress` 节点中的国家/地区不同时,必须在 \<[employmentDetails](https://www.ibkrguides.com/dameca/Schema/EmployerDetails.htm)> 节点中提供 emplCountryResCountryDetails。 |
| 无法确定客户的 IB 实体。请提供有效的居住国家/地区(Residence country)和法定居住国家/地区(Legal Residence Country)。 | 由于申请人的 legalResidenceCountry 或 \<residence> 中的 country,顾问/经纪人无法为申请人开户。**美国:**仅限总部位于美国的 IB-LLC 顾问/经纪人。**加拿大**:仅限 IB-CAN 顾问/经纪人。**香港**:仅限 IB-HK 顾问/经纪人。**澳大利亚**:仅限 IB-AU 顾问/经纪人。**日本**:仅限已获 FSA 注册的 IBLLC 顾问/经纪人。**英国**:仅限 IB-UK 顾问/经纪人。**新加坡**:仅限 IB-SG 顾问/经纪人。**欧洲经济区(EEA)**:仅限 IB-IE 或 IB-CE 顾问/经纪人。**EEA 国家/地区:**奥地利、捷克共和国、德国、意大利、马耳他、罗马尼亚、比利时、丹麦、希腊、拉脱维亚荷兰、斯洛伐克、保加利亚、爱沙尼亚、匈牙利、列支敦士登 挪威 斯洛文尼亚、克罗地亚,芬兰、冰岛、立陶宛、波兰、西班牙、塞浦路斯 |
| 居住地址/雇主地址/邮寄地址中列出了受限国家/地区。 | 账户持有人的 \[residence/employer address/ mailing Address] \<countryCode> 为受限国家/地区。 |
| externalId 为 .. 的账户持有人缺少职业(Occupation)描述。 | 如果 employerBusiness 或 occupation 填写为 'other' 且缺少 description,则会触发此错误。请参阅 [employmentDetails](https://www.ibkrguides.com/dameca/Schema/EmployerDetails.htm) |
| 客户 externalId- 国家/地区不存在 \[name = States] | 触发此错误是因为提供的国家/地区无效。对于 country,IBKR 要求使用 [3 位 ISO 代码](https://www.iso.org/obp/ui)。 |
| 本顾问不接受法定居住国家/地区为 \[United States] 的客户 |  |
| 账户持有人的雇佣类型 \[Employed] 无效 | 雇佣类型必须为大写字母。例如:"employmentType": "EMPLOYED" |
| "IB 实体为 IBLLC-US 的顾问不接受居住国家/地区 \[Australia] 或法定居住国家/地区 \[Australia] 的客户。" | 澳大利亚账户必须在 IB-AU 经纪人下创建。 |
| "缺少账户持有人雇主地址节点中的国家/地区。" | 如果雇主地址中缺少 'Country',则会抛出此错误。 |
| "缺少账户持有人居住节点中的城市。" | 如果 Residence 节点中缺少 'City',则会抛出此错误。 |
| "无法识别的属性:'residence'," | 如果载荷中缺少 'residenceAddress',则会抛出此错误。 |
| "无法识别的属性:'hasSameMailAddress'," | 如果载荷中缺少 'sameMailAddress',则会抛出此错误。 |
| "缺少账户持有人的雇佣类型。" | 如果载荷中缺少 'employmentType',则会抛出此错误。 |
| "value": "手机号码 0022960414 无效。" | 如果手机号码无效。 |
| "账户持有人的出生日期格式无效。预期格式为 yyyy-mm-dd。" | 出生日期(DOB)必须为 yyyy-mm-dd 格式。 |
| "账户持有人的雇佣类型 \[Retired] 无效。" | 雇佣类型必须为大写字母。例如:"employmentType": "RETIRED" |

### **accounts**

| **错误消息** | **说明** |
| --- | --- |
|  |  |
| "未找到主账户 \[account ID] 名为 \[Test template] 的费用模板" | 如果未应用任何费用模板,或所应用的费用配置并非由模板定义,则将返回 FEE\_TEMPLATE\_NOT\_FOUND 响应。例如:如果不存在费用模板,您可以添加 'No fees' 费用模板。 |
| 创建账户时出现"澳大利亚账户不允许在 IBLLC-US 顾问下开立" | 澳大利亚账户必须在 IB-AU 经纪人下创建。 |
| "由于 FA 不在加拿大,加拿大法定居民客户不能成为本顾问的客户" | 加拿大账户必须在位于加拿大的 FA 下开立。 |
| 错误 "product": "STK" | assetclass 应填写为 'Stock'。 |
| "不支持的值。Property:'assetClass', value:'BONDS'," | assetclass 应填写为 'Bond'。 |
| 账户基础货币缺失或无效。 | 如果 `account` 中的 `baseCurrency` 无效或缺失,则会抛出此错误。 |
| 费用详情类型为必填项,且应为可接受值列表中的值。 | 如果 `automatedFeesDetails` 节点中缺少 type 属性,则会抛出此错误。 |
| 处理顾问打包费用时出错:\{type=required} | 如果 `advisorWrapFees` 节点中的 `automatedFeesDetails` 节点缺失,则会抛出此错误。 |
| 顾问必须为该账户指定费用方案 | 顾问可通过自动计费、电子发票或直接计费的方式,就所提供的服务向客户收费。您在客户注册时确定顾问费用,并可随时在账户管理(Account Management)中修改这些费用。费用将在 Accounts 节点内通过 [advisorWrapFees](https://www.ibkrguides.com/dameca/Schema/AdvisorWrapFees.htm) 或 [Fees](https://www.ibkrguides.com/dameca/Schema/Fees.htm) 指定。 |
| 顾问必须为账户指定费用方案。 | 对于顾问客户,需要在 `advisorWrapFees` **或** `feeTemplateName` 中定义费用方案。详情请参阅[此处](/account-management/schema/accounts)。 |
|  |  |

### **users**

| **错误消息** | **说明** |
| --- | --- |
| 创建账户时缺少城市。 |  |
| Already Processed | e`xternalId` 对每个请求必须唯一。如果 `externalId` 已被处理过,您将收到错误 "Already Processed"。请使用新的唯一 `externalId` 重新提交请求。可以使用 [/getResponseFile](https://www.ibkrguides.com/dameca/Endpoint/getResponseFile.htm) 根据 `externalId` 获取申请详情。 |
| "User 节点中的外部用户 ID 46781USR 已被占用。请提供其他 ID。" | 如果外部 ID 已被使用,则会抛出此错误。请创建并更新一个新的外部 ID。 |

### **documents**

| **错误消息** | **说明** |
| --- | --- |
| 无法识别的属性:'isAuthorizedToSignOnBehalfOfOwner | 如果输入的格式不正确。请在载荷中将 "authorizedToSignOnBehalfOfOwner" 作为对象填写。 |
| "英国的有效 MIFIR 文件类型:National ID" | 如果提交的 MIFIR ID 无效,则会抛出此错误。 |
| "账户持有人的 W8Ben 节点中的外国税号应与 TaxResidency 中的 TIN 一致 | 外国税号(Foreign Tax Id)与 TIN 号码必须相同。 |
| 账户持有人必须填写受限国家/地区问卷 | 如果 `countryOfBirth` 为"受限国家/地区(Prohibited Country)"且缺少 [prohibitedCountryQuestionnaire](https://www.ibkrguides.com/dameca/updateFunction/ProhibitedCountryQuestionnaire.htm),则会触发此错误。 |
| 账户持有人必须填写受限国家/地区问卷 | 如果 `citizenship`、`citizenship2, citizenship3` 或 `countryOfBirth` 为受限国家/地区,则需要提供 `prohibitedCountryQuestionnaire`。 |
| Unable to process documents::java.sql.SQLIntegrityConstraintViolationException: ORA-02291: integrity constraint (IBCUST.TOSEND\_FKDOCUMENTID) violated – parent key not found | [Documents](https://www.ibkrguides.com/dameca/Schema/Document.htm) 中的 fileName 超过 20 个字符。 |
| 身份证明类型(Form 8001)缺失或不正确 | [Documents](https://www.ibkrguides.com/dameca/Schema/Document.htm) 中的 `proofOfIdentityType` 无效或缺失。数据对空格和大小写敏感。 |
| 地址证明类型(Form 8002)缺失或不正确 | [Documents](https://www.ibkrguides.com/dameca/Schema/Document.htm) 中的 `proofOfAddressType` 无效或缺失。数据对空格和大小写敏感。 |
| 签名不被接受。 | [Documents](https://www.ibkrguides.com/dameca/Schema/Document.htm) 中的 `signedBy` 必须与所提交的内容一致:名 中间名首字母(如适用) 姓 姓氏后缀(如适用)。数据对大小写和空格敏感。 |
| 文件处理 I/O 错误 | 当申请的 `documents` 部分中包含的 `fileName` 未提交至 IBKR 时,会触发此错误。请使用 [DocumentSubmission](/account-management/client-registration/registration-tasks/complete-registration-tasks) 将表单重新提交至 IBKR。 |
| 文件的 SHA-1 校验和与归档原件不同 | 当数据库中存储的 sha1Checksum 与数据库中存储的 sha1Checksum 不同时,会触发此错误。提交过时的文档时会触发此错误。拉取表单的说明请参阅[此处](https://www.interactivebrokers.com/campus/ibkr-api/account-management-api/#download-ibkr-agreements-and-disclosures-65)。重新提交表单的说明请参阅[此处](https://www.interactivebrokers.com/campus/ibkr-api/account-management-api/#complete-registration-tasks-10)。 |
| 缺少 TaxAuthority AUSTRALIA\_TA 的当地税务表格 缺少 TaxAuthority CANADA\_TA 的当地税务表格 | 当请求加拿大或澳大利亚权限且 [w8Ben](/account-management/schema/associatedindividual#dependent-on-type) 中缺少 [localTaxForms](https://www.ibkrguides.com/dameca/Schema/LocalTaxForms.htm) 时,会触发此错误。 |
| 缺少身份证明文件(Form 8001)的到期日。 | 如果 `proofOfIdentityType` 为 Passport 或 Drivers License,则身份证明文件需要填写到期日。 |

### 非 200 状态码

您的请求未通过网关验证(例如 400、401、404、500)

| **错误消息** | **说明** |
| --- | --- |
| 包含非 ASCII 字符。 | 仅支持 ASCII 字符。如果包含非 ASCII 字符,则会抛出错误。 |
| 安全策略 SIGNED\_JWT 的载荷无效 | 由以下两种原因之一触发:  1. 请求包含非 ASCII 字符。 2. JWT 被包裹在 JSON 结构中。我们期望直接接收 JWT 令牌。也就是说,应为 application/jwt 而**不是** application/json。 |
