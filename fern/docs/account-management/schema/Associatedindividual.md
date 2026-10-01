# Associatedindividual

AssociatedIndividual 表示与账户相关联的个人数据。个人(individual)填写部分所需的必填字段因关联关系类型和账户类型而异。

* **个人(Individual)**: customer > accountHolder > accountHolderDetails
* **退休(Retirement)**:
  * customer > accountHolder > accountHolderDetails
  * accounts> iraBeneficiaries > primaryBeneficiaries **和** contingentBeneficiaries
* **联名(Joint)**: customer > jointHolder > firstHolderDetails **和** secondHolderDetails
* **信托(Trust)**: customer > trust > grantors **和** beneficiaries
* **机构(Organization)**: customer > organization > associatedEntities > associatedIndividuals **和** associatedEntities

#### 必填字段

## externalId

由交易对手方(counterparty)定义的、与该个人关联的唯一标识符。

* `externalId`、`externalUserId` 和 `externalIndividualId` 是由交易对手方分配的唯一标识符。该标识符可用作映射,将 IBKR 账户与交易对手方系统内的账户/用户信息关联起来。
* `externalId` 在申请中会出现多次,包括:
  * `customer` = 表示该账户所关联的客户
  * `accountHolderDetails, firstHolderDetails, secondHolderDetails`:表示与账户关联的个人。
  * `accountHolder, jointHolder` = 表示账户本身
  * `users` (`externalUserId` 和 `externalIndividualId`)= 表示与账户关联的用户。

| 名称                | 描述                      |
| ------------------- | ------------------------- |
| externalId required | 字符串;最长 64 个字符 |

##### 示例

|                                        |
| -------------------------------------- |
| `"externalId": "testapplication1234",` |

##### 必填

| FD | FA | OWD | NonQI | ND-QI | ND-QI (NT) |
| -- | -- | --- | ----- | ----- | ---------- |
| ✓  | ✓  | ✓   | ✓     | ✓     | ✓          |

## name

关联个人的法定姓名。

|                                                                                     |
| ----------------------------------------------------------------------------------- |
| \{`"name": {"first": "Jane", "middle": "May", "last": "Doe" ,"salutation":"Mrs."},` |

| 名称       | 类型                      | 描述                   |
| ---------- | ------------------------- | ---------------------- |
| first      | 字符串;最长 50 个字符 | 申请人的法定名字。 |
| middle     | 字符串;最长 50 个字符 | 申请人的中间名。     |
| last       | 字符串;最长 50 个字符 | 申请人的法定姓氏。 |
| salutation | Mr. Mrs. Ms. Dr. Mx. Ind. | 申请人的称谓。         |

* `first` 和 `last` 为必填。如果缺少其中任一项,将抛出错误。

## email

关联个人的电子邮箱地址。

|                           |
| ------------------------- |
| `"email": test@ibkr.com,` |

| 名称  | 类型   | 描述                          |
| ----- | ------ | ----------------------------- |
| email | 字符串 | 关联人员的电子邮箱地址。 |

* 正则表达式(REGEX)\
  `^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:(?=[A-Z0-9-]{1,63}[.])[A-Z0-9]+(?:-[A-Z0-9]+)*[.]){1,8}[A-Z]{2,63}$`
* 如果电子邮箱地址与主账户(master account)相同,将抛出错误。

## residenceAddress

提供该个人实际居住的居住地址。

|                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------- |
| \{`"residenceAddress": {"street1": "1 Tester Street", "city": "London", "state": "GB-ENG" ,"country":"GBR","postalCode": "SW10 9QL"},` |

| 名称       | 类型                                                 | 描述                                                                                   |
| ---------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| country    | [3 位 ISO 代码](https://www.iso.org/obp/ui)      | 申请人居住的国家。                                                                   |
| state      | [3166-2 ISO 代码](https://www.iso.org/obp/ui#search) | 申请人居住的州/省。                                                                  |
| city       | 字符串;最长 100 个字符                          | 申请人居住的城市。                                                                   |
| postalCode | 字符串;最长 20 个字符                           | 邮政编码。对于不提供邮政编码的国家,请输入 "00000″                                  |
| street1    | 字符串;最长 200 个字符                         | 申请人居住的街道                                                                     |
| street2    | 字符串;最长 200 个字符                         | 申请人居住的街道                                                                     |

* 如果邮寄地址与 `residenceAddress` 元素中提供的地址不同,则还需要包含 `mailingAddress` 元素。
* `residentialAddress` 不接受邮政信箱。
* 我们的系统会校验 `residenceAddress` 属性中包含的 `street1` 和 `street2`,以确保未提供邮政信箱地址。
  * 如果 `street1` 或 `street2` 中包含以下组合,将抛出错误:
    * PB
    * PO Box
    * Post Office Box
    * P.O. Box
    * In care of
    * General Delivery
  * 用于校验 street\_1 和 street\_2 的正则表达式:
    * 英文: `(?:P(?:ost(?:al)?)?[\.\-\s]*(?:(?:O(?:ffice)?[\.\\s]*)?B(?:ox|in|\b|\d)|o(?:ffice|\b)(?:[-\s]*\d)|code)|box[-\s]*\d)`
    * 简体中文: `PO Box (?i)\b((邮政信箱) [0-9]*)\bChinese Traditional: PO Box (?i)\b((郵政信箱) [0-9]*)\b`

| FD | FA | OWD | NonQI | ND-QI | ND-QI (NT) |
| -- | -- | --- | ----- | ----- | ---------- |
| ✓  | ✓  | ✓   | ✓     | ✓     | ✓          |

#### 取决于类型

## countryOfBirth

该个人的出生国家。

|                            |
| -------------------------- |
| `"countryOfBirth": "GBR",` |

| 名称           | 类型                                           | 描述                          |
| -------------- | ---------------------------------------------- | ----------------------------- |
| CountryOfBirth | [3 位 ISO 代码](https://www.iso.org/obp/ui) | 申请人的出生国家。          |

* 接受来自所有国家/地区的公民或居民开立账户,但被美国外国资产控制办公室(US Office of Foreign Assets Control)禁止的国家/地区的公民或居民除外。
* [点击此处](https://www.interactivebrokers.com/en/index.php?f=7021\&nhf=T)查看所有可用国家/地区的列表。
* 如果 countryOfBirth 被归类为"受禁国家"(Prohibited Country),则必须填写 `prohibitedCountryQuestionnaire`。
* 受禁国家列表可通过 `/api/v1/enumerations/prohibited-country` 端点获取。

## dateOfBirth

关联个人的出生日期。

|                               |
| ----------------------------- |
| `"dateOfBirth": "1990-08-14"` |

| 名称        | 类型       | 描述                                                                                    |
| ----------- | ---------- | --------------------------------------------------------------------------------------- |
| dateOfBirth | YYYY-MM-DD | 申请人的出生日期。开立账户时申请人必须年满 18 岁。 |

* 如果 YYY-MM-DD \< 18 岁,将触发错误且不会创建账户。
* 如果 YYYY-MM-DD \< 21 岁,申请人仅可开立 CASH 账户。
* UGMA 和 UTMA 账户适用于 18 岁或以下的未成年人。即由个人或实体为未成年人管理账户,直至该未成年人达到特定年龄。仅向美国居民提供。
  * 此申请必须使用 IBKR Portal 内提供的前端应用程序开立。
  * 资产存放于由单一托管人(Custodian)用户管理的单一账户中。
* 如果 `dateOfBirth` 是 YYYY-MM-DD 以外的任何值,将抛出错误。以下格式会触发错误:

## employmentDetails

如果为 EMPLOYED 或 SELFEMPLOYED,请提供关联个人的就业详情。

|                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \{`"employmentDetails": {  "employer": "My Test Employer",  "occupation": "ACCOUNTANT",  "employerBusiness": "ARCHITECTURE_ENGINEERING",  "employerAddress": {  "street1": "Grays Inn Road",  "city": "London",  "state": "GB-ENG",  "country": "GBR",  "postalCode": "WC1X 8PX"  }`} |

| 名称                         | 类型                                                                       | 描述                                                                                                                                                                                                                     |
| ---------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| employer                     | 字符串;最长 128 个字符                                               | 雇主名称                                                                                                                                                                                                                  |
| employerBusiness             | 使用 `/api/v1/enumerations/business-and-occupation` 获取可接受的值。 |                                                                                                                                                                                                                           |
| occupation                   | `/api/v1/enumerations/business-and-occupation` 获取可接受的值。      |                                                                                                                                                                                                                           |
| country                      | [3 位 ISO 代码](https://www.iso.org/obp/ui)                             | 雇主所在的国家。                                                                                                                                                                                                          |
| state                        | [3166-2 ISO 代码](https://www.iso.org/obp/ui#search)                       | 雇主所在的州/省。                                                                                                                                                                                                        |
| city                         | 字符串;最长 100 个字符                                               | 雇主所在的城市。                                                                                                                                                                                                          |
| postalCode                   | 字符串;最长 20 个字符                                                | 邮政编码。对于不提供邮政编码的国家,请输入 "00000″                                                                                                                                                                   |
| street1                      | 字符串;最长 200 个字符                                              | 雇主所在的街道。                                                                                                                                                                                                          |
| emplCountryResCountryDetails | 字符串;最长 200 个字符                                              | 解释受雇国家为何与当前居住国家不同。                                                                                                                                                                                      |
| description                  | 字符串;最长 200 个字符                                              | 若 business 或 occupation= OTHER 则必填\*Other 不区分大小写/空格。                                                                                                                                                       |
| businessDescription          | 字符串;最长 256 个字符                                              | **若 employmentType 为 "SELFEMPLOYED" 则必填**   业务描述,包括您所处的行业、经营所在的国家、提供的产品/服务,以及主要的收入来源。                                          |

* `employmentType: "EMPLOYED"` 或 "SELFEMPLOYED"
  * 使用 IBLLC、IB-IE、IB-CE 和 IB-UK 的 FA 和 FD 客户:必须提供完整的 `employerAddress`(`country, state, city, street1, postalCode`)
  * 对于所有其他客户,`employerAddress` 中的 `country` 为必填。
* 如果 `employmentType:"EMPLOYED"`
* `employmentType: "SELFEMPLOYED"`
  * `employerAddress` 可以与 `residenceAddress` 或 `mailingAddress` 相同。
  * `businessDescription` 为必填。
* EmploymentType="EMPLOYED" 或 "SELFEMPLOYED"
  * 当 `residenceAddress` 节点中包含的国家与 `employerAddress` 节点中包含的国家不同时,`employmentDetails` 节点中的 `emplCountryResCountryDetails` 为必填。

## employmentType

关联人员的就业状态。

|                                 |
| ------------------------------- |
| `"employmentType": "EMPLOYED",` |

| 名称           | 类型                                                                    | 描述                                  |
| -------------- | ----------------------------------------------------------------------- | ------------------------------------- |
| employmentType | UNEMPLOYED EMPLOYED SELFEMPLOYED RETIRED STUDENT ATHOMETRADER HOMEMAKER | 关联个人的就业状态。 |

* 如果 `employmentType` = EMPLOYED 或 SELFEMPLOYED,则 [EmploymentDetails](/account-management/schema/associatedindividual#employmentdetails) 为必填。

## gender

申请人的性别。

|                     |
| ------------------- |
| `"gender": "MALE",` |

| 名称   | 类型        | 描述                 |
| ------ | ----------- | -------------------- |
| gender | Male Female | 申请人的性别。 |

* 对于需要申报 MiFIR 数据的印度和 EEA 申请人,此项为必填。
* MiFIR 交易申报适用于欧洲经济区("EEA")投资公司。作为使用该平台的投资公司的客户,您可能需要提供额外信息,以便提交正确的交易申报。[更多信息](https://ibkb.interactivebrokers.com/node/2974)

## identification

关联个人的身份证明信息。

可接受的**身份证件**取决于关联个人居住的国家。

### alienCard

除 USA、CAN、HKG 和 IND 以外的所有国家。

`"identification": {"citizenship": "MEX", "alienCard": "989444798", "issuingCountry": "MEX"},`

### driversLicense

澳大利亚

`"identification": {"citizenship": "AUS", "driversLicense": "989444798", "issuingCountry": "AUS", "expire": true, "expirationDate": "2029-03-22", "rta":"9999999", "issuingState":"AU-QLD"},`

### driversLicense

除 USA、CAN、HKG、AUS 和 IND 以外的所有国家。

`"identification": {"citizenship": "MEX", "driversLicense": "989444798", "issuingCountry": "MEX", "expire": true, "expirationDate": "2029-03-22"},`

### nationalCard

除 USA、CAN、HKG 和 IND 以外的所有国家。

`"identification": {"citizenship": "MEX", "nationalCard": "989444798", "issuingCountry": "MEX"},`

### hkTravelPermit

对于位于中国的 LLC 客户,澳门及香港旅行证件可作为 POI 接受。

`"identification": {"citizenship": "CHN", "HKTravelPermit": "HO1234567", "issuingCountry": "CHN", "expire": true, "expirationDate": "2029-03-22"},`

### panNumber

印度居民、公民及税务居民必填。

`"identification": {"citizenship": "IND", "panNumber": "AABPK6504E", "issuingCountry": "IND"}`

### passport

除 USA、CAN、HKG 和 IND 以外的所有国家。

`"identification": {"citizenship": "MEX", "passport": "989444798", "issuingCountry": "MEX", "expire": true, "expirationDate": "2029-03-22"},`

### sin

加拿大居民、公民及税务居民必填。

`"identification": {"citizenship": "CAN", "sin": "989444798", "issuingCountry": "CAN"},`

### ssn

美国居民、公民及税务居民必填。

`"identification": {"citizenship": "USA","SSN": "989444798", "issuingCountry": "USA"}`

### taxId

除 USA、CAN、HKG 和 IND 以外的所有国家。

`"identification": {"citizenship": "ESP", "taxId": "989444798", "issuingCountry": "ESP"},`

| 名称              | 类型                                                 | 描述                                                                                                                                                                                                                                                                                                          |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| ----------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| citizenship       | [3 位 ISO 代码](https://www.iso.org/obp/ui)       | 申请人的国籍。如果 `citizenship` 被归类为"受禁国家"(Prohibited Country),则必须填写 `prohibitedCountryQuestionnaire`。受禁国家列表可通过 `/api/v1/enumerations/prohibited-country` 端点获取。                                                                    |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| citizenship2      | [3 位 ISO 代码](https://www.iso.org/obp/ui)       | 如果申请人拥有多重国籍,请提供申请人的其他国籍。如果 `citizenship2` 被归类为"受禁国家"(Prohibited Country),则必须填写 `prohibitedCountryQuestionnaire`。受禁国家列表可通过 `/api/v1/enumerations/prohibited-country` 端点获取。                                   |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| citizenship3      | [3 位 ISO 代码](https://www.iso.org/obp/ui)       | 如果申请人拥有多重国籍,请提供申请人的其他国籍。如果 `citizenship3` 被归类为"受禁国家"(Prohibited Country),则必须填写 `prohibitedCountryQuestionnaire`。受禁国家列表可通过 `/api/v1/enumerations/prohibited-country` 端点获取。                                   |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| issuingCountry    | [3 位 ISO 代码](https://www.iso.org/obp/ui)       | 身份证件的签发国家。                                                                                                                                                                                                                                                                                 |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| issuingState      | [3166-2 ISO 代码](https://www.iso.org/obp/ui#search) | 如果提供的是在澳大利亚签发的 driversLicense,则此项必填。                                                                                                                                                                                                                                                       |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| expire            | true false                                           | 指明身份证件是否具有到期日(ExpirationDate)。                                                                                                                                                                                                                                                                      |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| expirationDate    | YYYY-MM-DD                                           | 提供身份证件的到期日。不能为过去的日期。如果提供了 `driversLicense` 或 `passport` 且缺少 `expirationDate`,将抛出错误。                                                                                                                                            |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| rta               | 字符串                                               | 仅当 ID\_Type=DriversLicense 且 IssuingCountry=AUS 时适用                                                                                                                                                                                                                                                         |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| ssn               | 字符串                                               | **社会安全号码(Social Security Number)**:美国居民和公民必填。REGEX:(?!123456789                                                                                                                                                                                                                              | 219099999                                                                                                 | 078051120)(?!666                                 | 000)\d\{3}(?!00)\d\{2}(?!0\{4})\d\{4}\$ |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| sin               | 字符串                                               | **社会保险号码(Social Insurance Number)**:加拿大居民和公民必填。  REGEX: ^\d\{9}\$                                                                                                                                                                                                                          |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| panNumber         | 字符串                                               | 印度 PanCard,印度居民和公民必填。  REGEX: \[A-Z]\{5}\d\{4}\[A-Z]\{1}\$                                                                                                                                                                                                                      |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| driversLicense    | 字符串                                               | 驾驶执照  按国家划分的 REGEX:AUS: ^.\{0,64}$ NZL: ^[A-Z]\{2\}\d\{6\}$                                                                                                                                                                                                                                         |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| passport          | 字符串                                               | 护照  按国家划分的 REGEX:AUS: ^(\[a-zA-Z0-9]\{7,10})\$ CAN: ^\[a-zA-Z0-9]\{6,10} CHN: (^\[A-Za-z0-9]\{9})                                                                                                                                                                                                        | \d\{18}$ IND: ^[a-zA-Z]\{1\}[0-9]\{7\} SGP: [A-Za-z0-9]\{8,10\}$ USA: (^\[a-zA-Z]\*\d\{6,9})              | (\d\{3}-\d\{3}-\d\{3})\$                         |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| nationalCard      | 字符串                                               | 国民身份证  按国家划分的 REGEX:ARG: ^\d\{8}$ FRA: ^\d\{15\}$ FRA: ^(\[A-Za-z0-9]\{9})                                                                                                                                                                                                               | (\d\{4}(\[A-Z]                                                                                            | \d)\{3}\d\{5})\$ ITA: ^(\[A-Z]\{2}\d\{7}         | \d\{7}\[A-Z]\{2}                        | \[A-Z]\{2}\d\{5}\[A-Z]\{2})$ MEX: ^[A-Z]\{4\}\d\{6\}[A-Z]\{6\}\d\{2\}$ MYS: ^\d\{12}$ RUS: ^\d\{9\}$ RUS: ^\d\{10}\$ SAU: ^\[1 | 2]\(\d\{9}$) ZAF: ^\d\{13\}$                                        |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| taxId             | 字符串                                               | 税务 ID(TIN),即 \<[taxResidencies](/account-management/schema/associatedindividual#taxresidencies)> 中的 TIN、\<[w8Ben](/account-management/schema/associatedindividual#w8ben)> 中的 foreignTaxId  按国家划分的 REGEX:AUS: ^(\d\{8}                                                                       | \d\{9})$ AUT: ^\d\{9\}$ BEL: ^\d\{11}$ BGR: ^\d\{10\}$ BRA: ^\d\{11}$ CHE: ^756\d\{10\}$ CHN: ^\d\{17}(\d | X)\$ CHN: ^(?:\[0-9TMHWC]\[0-9]\{16}\[0-9A-Za-z] | \[0-9TMHWC]\[0-9]\{17}                  | J\[0-9]\{14})$ CYP: ^[069]\d\{7\}[A-Z]$ CZE: ^\d\{9,10}$ DEU: ^\d\{11\}$ DNK: ^\d\{10}\$ ESP: ^(\d\{8}\[A-Z]\{1})              | (\[A-Z]\{1}\d\{7}\[A-Z]\{1})$ EST: ^\d\{11\}$ FIN: ^((\d\{6}A\d\{3} | \d\{9})\[0-9A-Z])$ FRA: ^[0-3]\d\{12\}$ GBR: ^\[A-Z]\{2}\d\{6}\[ABCD]\{1}$ GRC: ^\d\{9\}$ HKG: ^\[A-Z]\{1,2}\[0-9]\{6}(\[0-9] | A)$ HRV: ^\d\{11\}$ HUN: ^(8\d\{9})$ IDN: ^\d\{16\}$ IRL: ^\d\{7}\[A-Z]\{1,2}$ ISL: ^\d\{10\}$ ISR: ^\d\{9}$ ITA: ^[A-Z]\{6\}\d\{2\}[A-Z]\d\{2\}[A-Z]\d\{3\}[A-Z]$ KOR: ^\d\{13}$ LTU: ^\d\{11\}$ LUX: ^\d\{13}$ LVA: ^\d\{11\}$ MLT: ^(\d\{9} | \d\{7}\[A-Z])\$ MYS: ^(\d\{12} | IG\d\{9,11})$ NLD: ^\d\{9\}$ NOR: ^\d\{11}$ POL: ^\d\{11\}$ PRT: ^\[1234]\d\{8}$ ROU: ^\d\{13\}$ RUS: ^\d\{12}$ SGP: ^[A-Z]\d\{7\}[A-Z]$ SVK: ^\d\{9,10}$ SVN: ^[1-9]\d\{7\}$ SWE: ^(\d\{10} | \d\{12})$ TUR: ^\d\{11\}$ UKR: ^\d\{10}\$ |
| alienCard         | 字符串                                               | 外侨卡(Alien Card)                                                                                                                                                                                                                                                                                              |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| cardColor         | BLUE GREEN YELLOW                                    | 如果提供了 MedicareCard 则必填。                                                                                                                                                                                                                                                                               |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| medicareCard      | 字符串;10 位数字。                                   | 仅适用于澳大利亚居民。                                                                                                                                                                                                                                                                            |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |
| mediCareReference | 字符串;1-9 位数字。                          | 如果提供了 MedicareCard 则必填。                                                                                                                                                                                                                                                                               |                                                                                                           |                                                  |                                         |                                                                                                                                |                                                                     |                                                                                                                               |                                                                                                                                                                                                                                                |                                |                                                                                                                                                                                              |                                           |

## LocalTaxForms

当非美国申请人为加拿大产品申请交易权限,或非澳大利亚/非美国申请人为澳大利亚产品申请交易权限时,此项为必填。

|                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------- |
| `"w8Ben": {  "localTaxForms": [  {  "taxAuthority": "CANADA_TA",  "qualified": true,  "treatyCountry": "DEU"  }` |

| 名称          | 类型                                           | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taxAuthority  | CANADA\_TAAUSTRALIA\_TAIRELAND\_TAISRAEL\_TA   | 税务认证(Tax Certification)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| qualify       | True False                                     | 账户持有人是否符合 'taxAuthority' 的税收协定优惠资格                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| treatyCountry | [3 位 ISO 代码](https://www.iso.org/obp/ui) | 如果符合,请提供协定国家(Treaty Country)。非协定国家可接受 N/A。   加拿大协定国家: [https://www.canada.ca/en/department-finance/programs/tax-policy/tax-treaties/in-force.html](https://www.canada.ca/en/department-finance/programs/tax-policy/tax-treaties/in-force.html)  澳大利亚协定国家: [https://treasury.gov.au/tax-treaties/income-tax-treaties](https://treasury.gov.au/tax-treaties/income-tax-treaties)  以色列协定国家: [https://www.gov.il/en/departments/dynamiccollectors/international\\\_agreements](https://www.gov.il/en/departments/dynamiccollectors/international\\_agreements) |

## mailingAddress

提供申请人的邮寄地址。

* 如果 `sameMailAaddress`: "false",则 `mailingAddress` 为必填。

| 名称                | 类型                                                                                                              |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| country required    | [3 位 ISO 代码](https://www.iso.org/obp/ui)                                                                    |
| state required      | [3166-2 ISO 代码](https://www.iso.org/obp/ui#search)                                                              |
| city required       | 字符串;最长 100 个字符                                                                                       |
| postalCode required | 字符串;最长 20 个字符  邮政编码。对于不提供邮政编码的国家,请输入 "00000″ |
| street1 required    | 字符串;最长 200 个字符                                                                                      |
| street2             | 字符串;最长 200 个字符                                                                                      |

##### **示例**

|                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------ |
| \{`"mailingAddress": {"street1": "1 Tester Street", "city": "London", "state": "GB-ENG" ,"country":"GBR","postalCode": "SW10 9QL"},` |

##### **必填**

| FD | FA | OWD | NonQI | ND-QI | ND-QI (NT) |
| -- | -- | --- | ----- | ----- | ---------- |
| ✓  | ✓  | ✓   | ✓     | ✓     | –          |

## maritalStatus

申请人的婚姻状况

| 名称                   | 类型                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| maritalStatus required | S= Single(单身) M= Married(已婚) W= Widowed(丧偶) D= Divorced(离异) C= Common law partner(同居伴侣) |

##### **示例**

|                         |
| ----------------------- |
| `"maritalStatus": "S",` |

##### 必填

| FD | FA | OWD | NonQI | ND-QI | ND-QI (NT) |
| -- | -- | --- | ----- | ----- | ---------- |
| ✓  | ✓  | –   | –     | –     | –          |

## nativeName

关联个人的法定姓名。

|                                                                                          |
| ---------------------------------------------------------------------------------------- |
| `{"nativeName": {"first": "ון", "middle": "סמית", "last": "סמית" ,"salutation":"Mrs."},` |

| 名称       | 类型                                | 描述                        |
| ---------- | ----------------------------------- | --------------------------- |
| first      | 必填- 字符串;最长 50 个字符 | 申请人的法定名字。 |
| middle     | 字符串;最长 50 个字符          | 申请人的中间名。     |
| last       | 必填- 字符串;最长 50 个字符 | 申请人的法定姓氏。 |
| salutation | Mr. Mrs. Ms. Dr. Mx. Ind.           | 申请人的称谓。         |

* 俄罗斯和以色列申请人必填。
  * 如果 first 或 last 缺失或提供了 null 值,将抛出错误。
* 对于其他国家/地区为可选。

## numDependents

账户持有人的受抚养人数量。

|                       |
| --------------------- |
| `"numDependents": 0,` |

| 名称          | 类型   | 描述                                                                                                                                                                    |
| ------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| numDependents | 数字 | 提供账户持有人所抚养的个人人数(不包括账户持有人本人)。账户持有人必须提供该人员当年总抚养费用的一半以上。 |

## ownershipPercentage

与账户关联的个人所占的所有权比例。

|                              |
| ---------------------------- |
| `ownershipPercentage": 100,` |

| 名称                  | 类型   | 描述 |
| --------------------- | ------ | ----------- |
| `ownershipPercentage` | 数字 |             |

* 为与账户关联的每个个人设置所有权比例。
  * 联名(Joint):除非 `type` 为 `tenants_common`,否则 `ownershipPercentage` 将被忽略。
  * IRA 和 TRUST:所有受益人的 `ownershipPercentage` 之和必须为 100,否则将触发错误。

## phones

关联个人的电话号码。

|                                                                                                   |
| ------------------------------------------------------------------------------------------------- |
| `"phones": [ {"type": "Mobile", "number": "2034228988", "country": "USA", "isVerified": true} ],` |

| 名称       | 类型                                           | 描述                                                                                                                                                                           |
| ---------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type       | Work Home Fax Mobile Business                  | **个人 / 联名 / 退休**:必须提供手机号码。用户可根据需要提供额外的电话号码(如家庭、工作)。  **机构**:商务电话为可选。 |
| number     | 字符串;最长 18 个字符                      | 电话号码。                                                                                                                                                                         |
| country    | [3 位 ISO 代码](https://www.iso.org/obp/ui) | 电话号码所关联的国家。                                                                                                                                                    |
| isVerified | true false                                     | 指明手机号码是否已验证。                                                                                                                                                    |

* 我们使用 Google API 来验证电话号码。该 API 允许在传入电话号码的同时传入国家代码。
* 手机号码将用于 IBKR 的双因素认证(Two-Factor Authentication)。
* Interactive Brokers 要求所有申请人注册双因素认证。
* 账户持有人将在账户开立并入金后的 1 个月内,或在第三次登录贴牌(white branded)的 Interactive Brokers 在线门户后,被提示注册双因素认证
  * 我们提供 HandyKey(移动应用程序)。该应用程序将使用贵公司的徽标进行品牌化。
    * [iOS](https://www.clientam.com/en/handysolutions/handy-trader.php?p=dsa)/[Android](https://www.clientam.com/en/handysolutions/handy-trader.php?p=dsa) – 在移动应用程序内配置
    * 详情: [https://ibkr.info/article/2260](https://ibkr.info/article/2260)
  * 使用 RESTful Web API 的客户无法启用双因素认证
* 即使启用了补充授权书(Supplemental Power of Attorney),顾问/经纪商也无法代为启用双因素认证。
* 对于联名账户,如果两个账户持有人的 `number` 相同,将抛出错误。

## residenceAddress

提供该个人实际居住的居住地址。

|                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------- |
| \{`"residenceAddress": {"street1": "1 Tester Street", "city": "London", "state": "GB-ENG" ,"country":"GBR","postalCode": "SW10 9QL"},` |

| 名称       | 类型                                                 | 描述                                                                                   |
| ---------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| country    | [3 位 ISO 代码](https://www.iso.org/obp/ui)      | 申请人居住的国家。                                                                   |
| state      | [3166-2 ISO 代码](https://www.iso.org/obp/ui#search) | 申请人居住的州/省。                                                                  |
| city       | 字符串;最长 100 个字符                          | 申请人居住的城市。                                                                   |
| postalCode | 字符串;最长 20 个字符                           | 邮政编码。对于不提供邮政编码的国家,请输入 "00000″                                  |
| street\_1  | 字符串;最长 200 个字符                         | 申请人居住的街道                                                                     |
| street\_2  | 字符串;最长 200 个字符                         | 申请人居住的街道                                                                     |

* 如果邮寄地址与 Residence 元素中提供的地址不同,则还需要包含 MailingAddress 元素。
* 居住地址(Residential Address)不接受邮政信箱。
* 我们的系统会校验 Residence 属性中包含的 street\_1 和 street\_2,以确保未提供邮政信箱地址。
  * 如果 street\_1 或 street\_2 中包含以下组合,将抛出错误:
    * PB
    * PO Box
    * Post Office Box
    * P.O. Box
    * In care of
    * General Delivery
  * 用于校验 street\_1 和 street\_2 的正则表达式:
    * 英文: `(?:P(?:ost(?:al)?)?[\.\-\s]*(?:(?:O(?:ffice)?[\.\\s]*)?B(?:ox|in|\b|\d)|o(?:ffice|\b)(?:[-\s]*\d)|code)|box[-\s]*\d)`
    * 简体中文: `PO Box (?i)\b((邮政信箱) [0-9]*)\bChinese Traditional: PO Box (?i)\b((郵政信箱) [0-9]*)\b`

## sameMailAddress

指明邮寄地址是否与居住地址不同。

|                            |
| -------------------------- |
| `"sameMailAddress": true,` |

| 名称              | 类型       | 描述                                                                     |
| ----------------- | ---------- | ------------------------------------------------------------------------ |
| `sameMailAddress` | true false | 指明邮寄地址是否与居住地址不同。 |

* 如果  `"sameMailAddress": false,` 则 mailingAddress 为必填

## taxResidencies

关联个人的税务居住地信息。

|                                                                                 |
| ------------------------------------------------------------------------------- |
| `"taxResidencies": [ {"country": "USA", "tin": "132228833", "tinType": "SSN" }` |

* 提供关联个人的税务居住地。
* 可提供多个税务居住地。

| 名称    | 类型                                                                | 描述                                                                                                                                                                                                                                                                                                                                      |
| ------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tinType | SSN NonUS\_NationalId EIN                                           | **个人 / 退休 / 联名** 所提供的税务 ID 号码类型。  **SSN**:美国公民和居民必填。  **NonUS\_NationalId**:所有其他国家必填。\*对于非美国申请人,如果申请人没有外国税务 ID,则可省略此项。  **机构 / 信托** EIN 为必填 |
| country | [3 位 ISO 代码](https://www.iso.org/obp/ui) 或完整国家名称 | 申请人缴税所在的国家。                                                                                                                                                                                                                                                                                                    |
| tin     | 字符串                                                              | 税务识别号(Tax Identification Number)。  美国公民和居民:此项必填。请提供申请人的 SSN。  所有其他国家:如果申请人没有外国税务 ID,则可省略此项。                                                                                                                        |

## translated

对于以双语提交的申请,指明数据是否已翻译。

|                        |
| ---------------------- |
| `"translated": false,` |

| 名称       | 类型       | 描述                                                                                                                                                              |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| translated | true false | 指明该信息是否为翻译版本。仅在以其他语言和英语提供信息时使用。默认值为 "false"。 |

* 指明该信息是否为翻译版本。
* 仅在以其他语言和英语提供信息时使用。
* 默认值为 "false"。
* 如果 `hasTranslation` 设置为 `true`,

## w8Ben

仅适用于非美国申请人的税务表格。

* 提交税务表格的选项:
* 选项 1:Advisor/IBroker 在您的网站上收集税务表格记录,并在 JSON 中附上相应的空白表格。
* 选项 2:Advisor/IBroker 在您的网站上展示税务表格,由客户以电子方式填写并签署税务表格。Advisor/IBroker 将电子填写并签署完成的税务表格与 JSON 一并附上。

|                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"w8Ben": { "name": "John Smith", "foreignTaxId": "2555558888", "tinOrExplanationRequired": true, "part29ACountry": "N/A", "cert": true, "blankForm": true, "taxFormFile": "Form5001.pdf", "proprietaryFormNumber": 5001, "electronicFormat": true }` |

| 名称                  | 类型                                                            | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| part29ACountry        | [3 位 ISO 代码](https://www.iso.org/obp/ui)                  | 证明受益所有人是美国与该国之间的所得税协定意义上的 **\<part29ACountry>** 居民。  > 如果账户持有人是非协定国家/地区的居民,请输入 N/A  >如果账户持有人符合美国所得税协定规定的协定优惠资格,请注明适用的协定。  >[与美国签订协定的国家](https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| name                  | 字符串                                                          | W8 上列出的姓名必须 = 申请人的名(First Name)+ 中间名(Middle Name,如适用)+ 姓(Last Name)+ 后缀(Suffix,如适用) \*数据区分大小写和空格。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| blankForm             | true false                                                      | 指明提供给 IBKR 的税务表格是否为空白表格。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| signatureType         | Electronic                                                      | 为税务表格记录的签名类型。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| taxFormFile           | 字符串                                                          | 在归档文件中提供给 IBKR 的税务表格的文件名。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| foreignTaxId          | 字符串                                                          | 申请人的外国税务 ID。应与 TaxResidency 节点中提供的 TIN 相同。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| proprietaryFormNumber | 字符串                                                          | 若经纪商/顾问发送自有空白表格而非使用 IBKR 提供的表格编号,则为该表格编号。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| explanation           | US\_TIN TIN\_NOT\_DISCLOSED TIN\_NOT\_REQUIRED TIN\_NOT\_ISSUED | 如果客户没有外国税务 ID(taxID)则为必填。未提供 TIN 或外国税务 ID 的原因说明:\[US\_TIN] 账户持有人拥有美国 TIN;该 TIN 将被添加到 W8 表格中。  \[TIN\_NOT\_DISCLOSED] 该国家/地区发放 TIN;但根据该国法律,申请人可免于披露 TIN。  \[TIN\_NOT\_REQUIRED] 账户持有人在法律上无需取得 TIN。  \[TIN\_NOT\_ISSUED] 该国家/地区不发放 TIN。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| cert                  | true false                                                      | 在伪证罪的处罚下,我声明本人已审查本表格中的信息,且据本人所知及所信,该信息真实、正确、完整。通过点击每一项,本人在伪证罪的处罚下进一步证明:  >本人是本表格所涉全部收入的受益所有人(或获授权代表该受益所有人签署),或本人正使用本表格将本人记录为某外国金融机构的所有人或申请人  >本表格第 1 行所列人员并非美国人士,  >本表格所涉收入:  >与在美国境内开展贸易或业务的经营行为无实际关联,  >有实际关联但根据所得税协定无需纳税,或  >为合伙企业实际关联收入中合伙人所占的份额,  >本表格第 1 行所列人员是美国与该国之间的所得税协定意义上的、本表格第 9 行所列协定国家(如有)的居民,并且  >对于经纪商交易或易货交易,受益所有人是说明中所定义的免税外国人。   >勾选此框即表示您确认本 W-8BEN 表格上的信息正确。 |
| submitDate            | YYYY-MM-DD                                                      | 对于现有客户,如果公司已为该账户存有(有效的)税务表格,请包含 submitDate。submitDate 表示客户最初签署税务表格的日期。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

## w9

适用于美国居民、公民和纳税人的税务表格。

* 提交税务表格的选项:
* 选项 1:Advisor/IBroker 在您的网站上收集税务表格记录,并在 JSON 中附上相应的空白表格。
* 选项 2:Advisor/IBroker 在您的网站上展示税务表格,由客户以电子方式填写并签署税务表格。Advisor/IBroker 将电子填写并签署完成的税务表格与 JSON 一并附上。

|                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `"w9": {  "name": "paulina orr M ibllc test", "customerType": "Individual", "tin": "132228833", "tinType": "SSN", "cert1": true, "cert2": true, "cert3": true, "blankForm": true, "taxFormFile": "Form5002.pdf", "proprietaryFormNumber": 5002  }` |

| 名称                  | 类型             | 描述                                                                                                                                                                                                                                                                                                                                          |
| --------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cert1                 | true false       | 本表格上显示的号码是我的正确纳税人识别号(或我正在等待号码发放)                                                                                                                                                                                                                          |
| cert2                 | true false       | 我无需缴纳备用预扣税(backup withholding),因为:(a) 我免于备用预扣税,或 (b) 我未收到美国国税局(IRS)的通知,被告知因未申报全部利息或股息而需缴纳备用预扣税,或 (c) IRS 已通知我不再需要缴纳备用预扣税 |
| cert3                 | true false       | 我是美国公民或其他美国人士(U.S. Person)                                                                                                                                                                                                                                                                                                              |
| customerType          | Individual Joint | 指定账户类型                                                                                                                                                                                                                                                                                                                                              |
| name                  | 字符串           | W9 上列出的姓名必须 = 申请人的名(First Name)+ 中间名(Middle Name,如适用)+ 姓(Last Name)+ 后缀(Suffix,如适用)\*数据区分大小写和空格。                                                                                                                                                                                              |
| signatureType         | Electronic       | 为税务表格记录的签名类型。                                                                                                                                                                                                                                                                                                             |
| taxFormFile           | 字符串           | 在归档文件中提供给 IBKR 的税务表格的文件名。                                                                                                                                                                                                                                                                                       |
| tin                   | 字符串           | 申请人的 SSN。应与 TaxResidency 节点中提供的 TIN 相同。                                                                                                                                                                                                                                                                                                                  |
| tinType               | SSN              | 对于美国公民和居民,该值始终为 SSN。                                                                                                                                                                                                                                                                                                   |
| blankForm             | true false       | 指明提供给 IBKR 的税务表格是否为空白表格。                                                                                                                                                                                                                                                                                                   |
| proprietaryFormNumber | 字符串           | 若经纪商/顾问发送自有空白表格而非使用 IBKR 提供的表格编号,则为该表格编号。                                                                                                                                                                                                                                       |

#### 组织(Organization)或信托(Trust)专属的 AssociatedIndividual 字段

## authorizedPerson

对于机构(orgs),指填写申请并签署协议的个人。

|                             |
| --------------------------- |
| `"authorizedPerson": false` |

| 名称               | 类型       | 描述                                                                                                                                                |
| ------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `authorizedPerson` | true false | 正在填写申请并有权代表开户实体签署协议的自然人。 |

* 该个人需要提供公司决议或类似文件,以授权开立账户,并证明本页所确认的人员可以代表账户持有人签署且有权这样做。
* 适用于机构(Org)中列出的 `associatedIndividuals`。

## authorizedTrader

指明该个人是否有权为该账户下单交易。

|                              |
| ---------------------------- |
| `"authorizedTrader": false,` |

| 名称               | 类型       | 描述                                                                       |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `authorizedTrader` | true false | 指明与该实体关联的员工是否可以代表信托进行交易。 |

* 如果信托(Trust)列出了 `entityTrustee`,则此项必填。
* 如果仅提供 `entityTrustee` 作为受托人,则 `entityTrustee` 的至少一名 `employee` 必须获授权进行交易。
* 如果 `individual` 和 `entityTrustee` 均被列为受托人,则该值可设置为 `false`,并且 `individual` 将被设为获授权的交易人

## authorizedToSignOnBehalfOfOwner

指明该个人是否可以代表所有者签署。

|                                             |
| ------------------------------------------- |
| `"authorizedToSignOnBehalfOfOwner": false,` |

| 名称                              | 类型       | 描述                                                                          |
| --------------------------------- | ---------- | ------------------------------------------------------------------------------ |
| `authorizedToSignOnBehalfOfOwner` | true false | 指明与该实体关联的员工是否可以代表所有者签署。 |

* 如果信托(Trust)列出了 `entityTrustee`,则此项必填。
* 如果仅提供 `entityTrustee` 作为受托人,则 `entityTrustee` 的至少一名 `employee` 必须获授权代表所有者签署。
* 如果 `individual` 和 `entityTrustee` 均被列为受托人,则该值可设置为 `false`,并由 `individual` 担任获授权的签署人。

## primaryTrustee

指明该个人是否为主要受托人。

|                           |
| ------------------------- |
| `"primaryTrustee": true,` |

| 名称             | 类型       | 描述                                                    |
| ---------------- | ---------- | ------------------------------------------------------ |
| `primaryTrustee` | true false | 指明是否为与该信托关联的主要受托人。 |

* 适用于澳大利亚信托账户。
  * 如果是非澳大利亚信托,则无需此项。
* 主要受托人不能超过一名。
* 如果提供了 `entityTrustee`,则应为与该 `entityTrustee` 关联的 `employee` 包含 primary 标志
* 如果是个人受托人,则为 **`individual`** 包含该标志

## title

提供关联个人的头衔。

|                                              |
| -------------------------------------------- |
| `"titles": [ { "code": "Account Holder" } ]` |

| 名称 | 类型                                                                                                                                    | 描述                           |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| code | **Org-**(机构)Authorized Person(授权人士)  DIRECTOR OTHER OFFICER SECRETARY  **Org- Owner**(机构所有者) SIGNATORY CEO OWNER  **Trust**(信托) Grantor(授予人) Trustee(受托人) Beneficiary(受益人) | 与该个人关联的头衔。 |

* 对于机构(Orgs)和信托(Trusts),为与账户关联的每个个人设置头衔。
* 对于 ORG,如果 "`authorizedPerson": true`,则头衔代码应为以下之一:
  * DIRECTOR
  * OTHER OFFICER
  * SECRETARY
* 对于信托(Trust),必须至少指定一名受托人。
