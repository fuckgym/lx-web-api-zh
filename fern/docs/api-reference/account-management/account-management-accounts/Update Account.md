# 更新账户

PATCH https://localhost:5000/gw/api/v1/accounts
Content-Type: application/json

更新现有 accountId 的信息**作用域**: `accounts.write`**安全策略**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/update-accounts

## 认证

- `Authorization` 请求头（bearer token, required）— 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱)

## 请求

### 请求体 (application/json)

该端点接受一个 AccountManagementRequestsPayload。

- `accountManagementRequests` (AccountManagementRequests, optional)

## 响应

### 200

更新现有 accountId 的信息

- `requestId` (long, optional)
- `problemDetail` (map from string to StatusResponseProblemDetail, optional)
- `dateSubmitted` (datetime, optional)
- `fileData` (FileData, optional)

### 202

发起更新现有 accountId 的信息。

- `requestId` (long, optional)
- `executedAt` (datetime, optional)

## 错误

### 400 错误请求错误

返回表示错误请求的错误描述

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

### 401 未授权错误

返回表示访问问题的错误描述

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

### 403 禁止访问错误

返回表示访问问题的错误描述

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

### 422 无法处理的实体错误

请求因业务规则或验证错误而被系统拒绝。

- `requestId` (long, optional)
- `problemDetail` (map from string to StatusResponseProblemDetail, optional)
- `dateSubmitted` (datetime, optional)
- `fileData` (FileData, optional)

### 500 服务器内部错误

返回表示服务器内部错误的错误描述

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

## 类型

### AccountManagementRequests

- `updateExternalId` (UpdateExternalId, optional)
- `updatePropertyProfile` (UpdatePropertyProfile, optional)
- `updateAccountAlias` (UpdateAccountAlias, optional)
- `changeBaseCurrency` (ChangeBaseCurrency, optional)
- `abandonAccount` (AbandonAccount, optional)
- `addNewUser` (AddNewUser, optional)
- `addLevFxCapability` (AddLEVFXCapability, optional)
- `addMiFirData` (AddMiFIRData, optional)
- `addTradingPermissions` (AddTradingPermissions, optional)
- `removeTradingPermissions` (RemoveTradingPermissions, optional)
- `changeMarginType` (ChangeMarginType, optional)
- `addCLPCapability` (AddCLPCapability, optional)
- `changeFinancialInformation` (ChangeFinancialInformation, optional)
- `resetAbandonedAccount` (ResetAbandonedAccount, optional)
- `updateCredentials` (list of UpdateCredentials, optional)
- `updateAccountRepresentatives` (UpdateAccountRepresentatives, optional)
- `completeLoginMessage` (CompleteLoginMessage, optional)
- `reopenAccount` (ReopenAccount, optional)
- `enrollInSyep` (EnrollInSYEP, optional)
- `leaveSyep` (LeaveSYEP, optional)
- `enrollInDrip` (EnrollInDRIP, optional)
- `leaveDrip` (LeaveDRIP, optional)
- `updateW8Ben` (UpdateW8BEN, optional) — 请改用 UpdateTaxForm。
- `enableAccountInBrokerage` (EnableAccountInBrokerage, optional)
- `disableAccountInBrokerage` (DisableAccountInBrokerage, optional)
- `linkDuplicateAccount` (LinkDuplicateAccount, optional)
- `duplicateAccount` (DuplicateAccount, optional)
- `documentSubmission` (DocumentSubmission, optional)
- `processDocuments` (ProcessDocuments, optional)
- `updateBcan` (UpdateBCAN, optional)
- `prohibitedCountryQuestionnaire` (ProhibitedCountryQuestionnaire, optional)
- `updateWithholdingStatement` (UpdateWithholdingStatement, optional)
- `accreditedInvestor` (AccreditedInvestor, optional)
- `changeAccountHolderDetail` (ChangeAccountHolderDetail, optional)
- `updateUserAccessRights` (UpdateUserAccessRights, optional)
- `informationChange` (InformationChange, optional)
- `addAdditionalAccount` (AddAdditionalAccount, optional)
- `accountConfiguration` (AccountConfiguration, optional)
- `allocateVan` (AllocateVAN, optional)
- `createUser` (CreateUser, optional)
- `updateTaxForm` (UpdateTaxForm, optional)
- `questionnaires` (QuestionnairesWithAccount, optional)
- `securityQuestions` (SecurityQuestions, optional)
- `applyFeeTemplate` (ApplyFeeTemplate, optional)
- `accountClose` (AccountClose, optional)
- `manageMarketDataSubscriptions` (list of ManageMarketDataSubscriptions, optional)
- `quizQuestionnaires` (QuizQuestionnaires, optional)

### StatusResponseProblemDetail

### FileData

- `data` (FileDataData, optional)
- `name` (string, optional)

### UpdateExternalId

- `accountId` (string, optional)
- `newExternalId` (string, optional)

### UpdatePropertyProfile

- `accountId` (string, optional)
- `propertyProfile` (string, optional)

### UpdateAccountAlias

- `accountId` (string, optional)
- `accountAlias` (string, optional)

### ChangeBaseCurrency

- `accountId` (string, optional)
- `newBaseCurrency` (string, optional)

### AbandonAccount

- `accountId` (string, optional)

### AddNewUser

- `accountId` (string, optional)
- `prefix` (string, optional)
- `userDetails` (UserDetails, optional)
- `userName` (string, optional)
- `inputLanguage` (enum, optional)
  - Allowed values: `en`, `zh-Hans`, `ja`, `ru`, `fr`, `pt`, `es`, `it`, `ar-AE`, `de`, `he-IL`, `hu`
- `translation` (boolean, optional)

### AddLEVFXCapability

- `accountId` (string, optional)

### AddMiFIRData

- `accountId` (string, optional)
- `title` (string, optional)
- `identifications` (list of Identification, optional)

### AddTradingPermissions

- `tradingPermissions` (list of TradingPermission, optional)
- `documentSubmission` (DocumentSubmission, optional)
- `accountId` (string, optional)
- `optionLevel` (long, optional)

### RemoveTradingPermissions

- `tradingPermissions` (list of TradingPermission, optional)
- `accountId` (string, optional)

### ChangeMarginType

- `documentSubmission` (DocumentSubmission, optional)
- `accountId` (string, optional)
- `operation` (string, optional)
- `newMargin` (string, optional)

### AddCLPCapability

- `accountId` (string, optional)
- `documents` (list of Document, optional)

### ChangeFinancialInformation

- `accountId` (string, optional)
- `referenceUserName` (string, optional)
- `newFinancialInformation` (FinancialInformation, optional)

### ResetAbandonedAccount

- `accountId` (string, optional)

### UpdateCredentials

- `updateEmail` (UpdateEmail, optional)
- `updatePassword` (UpdatePassword, optional)
- `accountId` (string, optional)
- `referenceUserName` (string, optional)

### UpdateAccountRepresentatives

- `representativeDetails` (list of RepresentativeDetail, optional)
- `accountId` (string, optional)

### CompleteLoginMessage

- `loginMessageIds` (list of long, optional)
- `accountId` (string, optional)

### ReopenAccount

- `accountId` (string, optional)

### EnrollInSYEP

- `accountId` (string, optional)
- `documents` (list of Document, optional)

### LeaveSYEP

- `accountId` (string, optional)

### EnrollInDRIP

- `accountId` (string, optional)

### LeaveDRIP

- `accountId` (string, optional)

### UpdateW8BEN

请改用 UpdateTaxForm。

- `taxPayerDetails` (TaxPayerDetails, optional)
- `documents` (list of Document, optional)
- `inputLanguage` (enum, optional)
  - Allowed values: `en`, `zh-Hans`, `ja`, `ru`, `fr`, `pt`, `es`, `it`, `ar-AE`, `de`, `he-IL`, `hu`
- `translation` (boolean, optional)
- `accountId` (string, optional)

### EnableAccountInBrokerage

- `accountId` (string, optional)

### DisableAccountInBrokerage

- `accountId` (string, optional)

### LinkDuplicateAccount

- `accountId` (string, optional)
- `externalAccountId` (string, optional)
- `clientActiveTrading` (boolean, optional)

### DuplicateAccount

- `accountId` (string, optional)
- `numberOfDuplicates` (long, optional)

### DocumentSubmission

- `documents` (list of Document, optional)
- `accountId` (string, optional)
- `inputLanguage` (enum, optional)
  - Allowed values: `en`, `zh-Hans`, `ja`, `ru`, `fr`, `pt`, `es`, `it`, `ar-AE`, `de`, `he-IL`, `hu`
- `translation` (boolean, optional)

### ProcessDocuments

- `documents` (list of Document, optional)
- `inputLanguage` (enum, optional)
  - Allowed values: `en`, `zh-Hans`, `ja`, `ru`, `fr`, `pt`, `es`, `it`, `ar-AE`, `de`, `he-IL`, `hu`
- `translation` (boolean, optional)

### UpdateBCAN

- `accountId` (string, optional)
- `bcan` (string, optional)
- `ceNumber` (string, optional)

### ProhibitedCountryQuestionnaire

- `prohibitedQuestionnaireDetails` (list of ProhibitedQuestionnaireDetail, optional)
- `accountId` (string, optional)
- `externalId` (string, optional)
- `entityId` (string, optional)

### UpdateWithholdingStatement

- `accountId` (string, optional)
- `fatcaCompliantType` (enum, optional)
  - Allowed values: `FATCA_COMPLIANT`, `NON_CONSENTING_US_ACCOUNT`, `NON_COOPERATIVE_ACCOUNT`
- `usIncomeTax` (boolean, optional)
- `treatyCountry` (string, optional)
- `certW8Imy` (boolean, optional)
- `effectiveDate` (date, optional)

### AccreditedInvestor

- `qualifiedPurchaser` (QualifiedPurchaser, optional)
- `eligibleContractParticipant` (EligibleContractParticipant, optional)
- `signedBy` (list of string, optional)
- `accountId` (string, optional)
- `status` (boolean, optional)
- `signature` (string, optional)

### ChangeAccountHolderDetail

- `newAccountHolderDetails` (list of AssociatedIndividual, optional)
- `documents` (DocumentSubmission, optional)
- `accountId` (string, optional)
- `referenceUserName` (string, optional)
- `inputLanguage` (enum, optional)
  - Allowed values: `en`, `zh-Hans`, `ja`, `ru`, `fr`, `pt`, `es`, `it`, `ar-AE`, `de`, `he-IL`, `hu`
- `translation` (boolean, optional)

### UpdateUserAccessRights

- `subAccounts` (list of string, optional)
- `repId` (string, optional)
- `action` (string, optional)

### InformationChange

- `addEntities` (list of AddEntity, optional)
- `updateEntities` (list of UpdateEntity, optional)
- `deleteEntities` (list of DeleteEntity, optional)
- `ibAccountId` (string, optional)

### AddAdditionalAccount

- `customer` (Customer, optional)
- `account` (Account, optional)
- `documents` (list of Document, optional)
- `users` (list of User, optional)
- `accountId` (string, optional)

### AccountConfiguration

- `accountId` (string, optional)
- `type` (string, optional)
- `value` (boolean, optional)

### AllocateVAN

- `accountId` (string, optional)
- `currency` (enum, optional)
  - Allowed values: `USD`, `EUR`, `GBP`, `CAD`, `JPY`, `HKD`, `AUD`, `CHF`, `MXN`, `SEK`, `NZD`, `HUF`, `CZK`, `CNH`, `DKK`, `RUB`, `ILS`, `NOK`, `SGD`, `PLN`, `ZAR`, `AED`, `KRW`, `SAR`, `TRY`, `RON`, `BGN`
- `countryCode` (string, optional)

### CreateUser

- `accountId` (string, optional)
- `prefix` (string, optional)
- `userName` (string, optional)
- `id` (string, optional)
- `externalId` (string, optional)
- `authorizedTrader` (boolean, optional)

### UpdateTaxForm

- `localTaxForms` (list of LocalTaxForm, optional)
- `w8Ben` (FormW8BEN, optional)
- `w8BenE` (FormW8BENE, optional)
- `w9` (FormW9, optional)
- `translation` (boolean, optional)
- `inputLanguage` (enum, optional)
  - Allowed values: `en`, `zh-Hans`, `ja`, `ru`, `fr`, `pt`, `es`, `it`, `ar-AE`, `de`, `he-IL`, `hu`
- `accountId` (string, optional)
- `documents` (list of Document, optional)
- `entityId` (string, optional)
- `externalId` (string, optional)

### QuestionnairesWithAccount

- `questionnaire` (list of Questionnaire, optional)
- `accountId` (string, optional)

### SecurityQuestions

- `details` (list of Details, optional)
- `referenceUserName` (string, optional)
- `inputLanguage` (enum, optional)
  - Allowed values: `en`, `zh-Hans`, `ja`, `ru`, `fr`, `pt`, `es`, `it`, `ar-AE`, `de`, `he-IL`, `hu`

### ApplyFeeTemplate

- `accountId` (string, optional)
- `templateName` (string, optional)

### AccountClose

- `accountId` (string, optional)
- `closeReason` (string, optional)

### ManageMarketDataSubscriptions

- `service` (list of Service, optional)
- `referenceUserName` (string, optional)

### QuizQuestionnaires

- `questionnaire` (list of Questionnaire, optional)
- `accountId` (string, optional)
- `task` (list of Task, optional)

### FileDataData

### UserDetails

- `name` (IndividualName, optional)
- `nativeName` (IndividualName, optional)
- `birthName` (IndividualName, optional)
- `motherMaidenName` (IndividualName, optional)
- `dateOfBirth` (string, optional) — 申请人的出生日期。申请人必须年满 18 岁才能开立账户。如果 YYY-MM-DD \< 18 岁，将触发错误且账户不会被创建。如果 YYYY-MM-DD \< 21，申请人仅限开立 CASH 账户。UGMA 和 UTMA 账户适用于 18 岁或以下的未成年人。在未成年人达到特定年龄之前为其管理账户的个人或实体。仅限美国居民。此申请必须使用 IBKR Portal 内提供的前端应用程序开立。由单一托管人（Custodian）用户管理的单一账户中持有的资产。如果 dateOfBirth 为 YYYY-MM-DD 以外的任何值，将抛出错误。
- `countryOfBirth` (string, optional)
- `cityOfBirth` (string, optional)
- `gender` (enum, optional)
  - Allowed values: `M`, `F`, `Male`, `Female`
- `maritalStatus` (enum, optional)
  - Allowed values: `S`, `M`, `W`, `D`, `C`
- `numDependents` (long, optional)
- `residenceAddress` (ResidenceAddress, optional) — 提供申请人实际居住的居住地址。如果邮寄地址与 Residence 元素中提供的地址不同，那么您还需要包含 MailingAddress 元素。居住地址不接受邮政信箱（Post Office Box）。我们的系统会验证 Residence 属性中包含的 street\_1 和 street\_2，以确保未提供邮政信箱地址。如果 street\_1 或 street\_2 中包含以下任何组合，将抛出错误：PBPO BoxPost Office BoxP.O. BoxIn care ofGeneral Delivery用于验证 street\_1 和 street\_2 的正则表达式：English: (?:P(?:ost(?:al)?)?\[.-\s]*(?:(?:O(?:ffice)?\[.\s]*)?B(?:ox|in|\b|\d)|o(?:ffice|\b)(?:\[-\s]*\d)|code)|box\[-\s]*\d)Chinese Simplified: PO Box (?i)\b((邮政信箱) \[0-9]*)\bChinese Traditional: PO Box (?i)\b((郵政信箱) \[0-9]*)\b
- `mailingAddress` (Address, optional)
- `phones` (list of PhoneInfo, optional)
- `email` (string, optional)
- `identification` (Identification, optional) — 关联人员的身份识别信息。
- `employmentType` (string, optional)
- `employmentDetails` (EmploymentDetails, optional)
- `employeeTitle` (string, optional)
- `taxResidencies` (list of TaxResidency, optional)
- `w9` (FormW9, optional)
- `w8Ben` (FormW8BEN, optional)
- `crs` (FormCRS, optional)
- `prohibitedCountryQuestionnaire` (ProhibitedCountryQuestionnaireList, optional)
- `id` (string, optional)
- `externalId` (string, optional)
- `userId` (string, optional)
- `sameMailAddress` (boolean, optional)
- `authorizedToSignOnBehalfOfOwner` (boolean, optional)
- `authorizedTrader` (boolean, optional)
- `usTaxResident` (boolean, optional)
- `translated` (boolean, optional)
- `primaryTrustee` (boolean, optional)
- `ownershipPercentage` (double, optional)
- `title` (list of Title, optional)
- `authorizedPerson` (boolean, optional)
- `referenceUsername` (string, optional)

### Identification

关联人员的身份识别信息。

- `citizenship` (string, optional) — 申请人的国籍。如果 citizenship、citizenship2 或 citizenship3 中任何一个被归类为“禁止国家/地区”，则必须填写 ProhibitedCountryQuestionnaire。禁止国家/地区列表可通过 /getEnumerations 获取。按签发国家/地区（IssuingCountry）确定的首选身份证件。
- `citizenship2` (string, optional) — 如果申请人拥有多重国籍，请提供申请人的其他国籍。如果 citizenship、citizenship2 或 citizenship3 中任何一个被归类为“禁止国家/地区”，则必须填写 ProhibitedCountryQuestionnaire。禁止国家/地区列表可通过 /getEnumerations 获取。按签发国家/地区（IssuingCountry）确定的首选身份证件。
- `citizenship3` (string, optional) — 如果申请人拥有多重国籍，请提供申请人的其他国籍。如果 citizenship、citizenship2 或 citizenship3 中任何一个被归类为“禁止国家/地区”，则必须填写 ProhibitedCountryQuestionnaire。禁止国家/地区列表可通过 /getEnumerations 获取。按签发国家/地区（IssuingCountry）确定的首选身份证件。
- `ssn` (string, optional) — 社会安全号码，美国居民和美国公民必填。
- `sin` (string, optional) — 社会保险号码，加拿大居民和加拿大公民必填。
- `driversLicense` (string, optional) — 驾照Pattern for AUS: ^.$<br />Pattern for NZL: ^[A-Z]{2}\d{6}$
- `passport` (string, optional) — 护照
- `alienCard` (string, optional) — 外国人卡
- `hkTravelPermit` (string, optional) — 港澳通行证
- `medicareCard` (string, optional) — 仅适用于澳大利亚居民。
- `cardColor` (enum, optional) — 若提供 MedicareCard，则必填。
  - Allowed values: `BLUE`, `GREEN`, `YELLOW`
- `medicareReference` (string, optional) — 若提供 MedicareCard，则必填。
- `nationalCard` (string, optional) — 国民身份证Pattern by Country- ARG: ^\d$<br />AUS: ^(\d{8}|\d{9})$BRA: ^\d$<br />CHN: ^\d{17}(\d|X)$DNK: ^\d$<br />ESP: ^\d{8}[A-Z]$FRA: ^\d$<br />FRA: ^\d{4}([A-Z]|\d){3}\d{5}$ITA: ^(\[A-Z]\d|\d\[A-Z]|\[A-Z]\d\[A-Z])$<br />ITA: ^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$MEX: ^\[A-Z]\d\[A-Z]\d$<br />MYZ: ^\d{12}$RUS: ^\d$<br />RUS: ^\d{9}$SGP: ^\[A-Z]\d\[A-Z]$<br />SWE: ^(\d{10}|\d{12})$TUR: ^\d$<br />ZAF: ^\d{13}$
- `issuingCountry` (string, optional) — 身份证件的签发国家/地区。
- `issuingState` (string, optional) — 身份证件的签发州/省。
- `rta` (string, optional) — 仅当 ID_Type=DriversLicense 且 IssuingCountry=AUS 时适用
- `legalResidenceCountry` (string, optional)
- `legalResidenceState` (string, optional)
- `educationalQualification` (string, optional)
- `fathersName` (string, optional)
- `greenCard` (boolean, optional)
- `panNumber` (string, optional) — 印度 PanCard，印度居民和印度公民必填。
- `taxId` (string, optional) — 税务 ID：\<TaxResidencies> 中的 TIN；\<W8Ben> 中的 foreign\_tax\_id
- `proofOfAgeCard` (string, optional)
- `expire` (boolean, optional) — 指示身份证件是否具有到期日。
- `expirationDate` (date, optional) — 提供身份证件的到期日期。不能是过去的日期。
- `identityDocuments` (list of IdentityDocument, optional) — 用于 MiFIR 合规的身份证件列表。

### TradingPermission

- `assetClass` (enum, optional)
  - Allowed values: `BILL`, `BOND`, `CASH`, `CFD`, `COMB`, `FOP`, `FUND`, `FUT`, `OPT`, `SSF`, `STK`, `WAR`, `MRGN`, `CLP`
- `exchangeGroup` (string, optional)
- `country` (enum, optional)
  - Allowed values: `ALL`, `AUSTRALIA`, `AUSTRIA`, `BELGIUM`, `CANADA`, `FRANCE`, `GERMANY`, `HONG KONG`, `ITALY`, `JAPAN`, `KOREA`, `MEXICO`, `NORWAY`, `SINGAPORE`, `SPAIN`, `SWEDEN`, `SWITZERLAND`, `THE NETHERLANDS`, `UNITED KINGDOM`, `UNITED STATES`, `HK-CHINA`
- `product` (enum, optional)
  - Allowed values: `BONDS`, `FUTURES`, `FOREX`, `FUTURES OPTIONS`, `MUTUAL FUNDS`, `STOCKS`, `SINGLE STOCK FUTURES`, `OPTIONS`, `STOCK OPTIONS`, `WARRANTS`

### Document

- `attachedFile` (AttachedFileType, required)
- `formNumber` (long, required) — pendingTask 或已提交文档的表单编号。
- `execLoginTimestamp` (long, required) — 会话的登录时间戳（客户登录并确认协议的时间）。
- `execTimestamp` (long, required) — 客户执行协议的时间戳（即客户签署协议的时间）。
- `signedBy` (list of string, optional) — signedBy 必须与所提交的：name（名 + 中间名首字母（如适用）+ 姓）一致。\*数据区分大小写和空格。如果为以下端点提交文档，则该对象为必填：客户注册：\[POST]: [https://api.ibkr.com/gw/api/v1/accounts](https://api.ibkr.com/gw/api/v1/accounts)更新账户信息：\[PATCH] [https://api.ibkr.com/gw/api/v1/account](https://api.ibkr.com/gw/api/v1/account)
- `validAddress` (boolean, optional) — 如果以 Driver License 作为 proofOfIdentityType 提供，且 validAddress=true，则单份文档即可同时满足身份证明（Proof of Identity）和地址证明（Proof of Address）。
- `documentType` (enum, optional) — 可接受的文档因 formNumber 而异。
  - Allowed values: `Check`, `Company Ownership`, `Divorce Settlement`, `Employer Confirmation`, `Entitlement to Payments`, `Letter`, `Ownership`, `Pay Slip`, `Proof of Sale`, `Proof of Winnings`, `Severance`, `Tax Return`, `Will`, `Bank Statement`, `Brokerage Statement`, `Current Lease`, `Financial Statement`, `Certificate of Incorporation/Formation`, `Certificate of Registratios`, `Company Charter`, `Certificate of Good Standing`, `Government-issued Business License`, `Corporate Charter`, `Articles of Incorporation`, `Bank Passbook/Statement`, `Certified Proof of Identity`, `Certified Proof of Address`, `Income Tax Return`, `Additional Proof of Identity Document`, `Proof of Principal Place of Business and Registration`, `Utility Bill`, `Evidence of Ownership of Property`, `Authorization to Open Account - Evidence`, `Authorization to Open Account - Certification`, `Italian Health Card (Tessera Sanitaria)`, `CRS card of Lombardy`, `Italian Electronic ID Card - CIE`, `Court- or Govt-issued document`, `Copy of Passport, National Id or Driver's License`, `Passport`, `National ID`
- `signature` (string, optional)
- `externalAccountId` (string, optional)
- `externalIndividualId` (string, optional) — 执行协议的个人在外部实体处的标识符。必须是申请中列出的个人。对于 INDIVIDUAL 申请将被忽略，因为协议必须由账户持有人签署。对于通过 ECA 创建并为提交 POI 和 POA 的 JOINT 账户，此字段为必填。对于通过 ECA 创建的 JOINT 持有人，需要提供为其提交 POI/POA 的账户持有人的外部 ID。
- `proofOfIdentityType` (enum, optional) — 为满足身份证明（Proof of Identity）而提交的文档描述。
  - Allowed values: `Driver License`, `Passport`, `Alien ID Card`, `National ID Card`, `Bank Statement`, `Evidence of Ownership of Property`, `Credit Card Statement`, `Utility Bill`, `Brokerage Statement`, `T4 Statement`, `CRA Assessment`, `Hong Kong and Macao Entry Permit`
- `expirationDate` (date, optional) — 身份证件的到期日期。
- `proofOfAddressType` (enum, optional) — 为满足地址证明（Proof of Address）而提交的文档描述。
  - Allowed values: `Driver License`, `Bank Statement`, `Brokerage Statement`, `Homeowner Insurance Policy Bill`, `Homeowner Insurance Policy Document`, `Renter Insurance Policy bill`, `Renter Insurance Policy Document`, `Security System Bill`, `Government Issued Letters`, `Utility Bill`, `Current Lease`, `Evidence of Ownership of Property`, `Other Document`
- `payload` (FilePayload, optional)

### FinancialInformation

- `investmentExperience` (list of AssetExperience, optional)
- `investmentObjectives` (list of enum, optional)
  - Allowed values: `Trading`, `Growth`, `Speculation`, `Hedging`, `Preservation`, `Income`
- `additionalSourcesOfIncome` (list of SourceOfIncomeType, optional)
- `sourcesOfWealth` (list of SourceOfWealthType, optional)
- `soiQuestionnaire` (SOIQuestionnaire, optional)
- `questionnaires` (list of QuestionnaireType, optional)
- `netWorth` (double, optional)
- `liquidNetWorth` (double, optional)
- `annualNetIncome` (double, optional)
- `totalAssets` (double, optional)
- `sourceOfFunds` (string, optional)
- `translated` (boolean, optional)

### UpdateEmail

- `email` (string, optional)
- `token` (string, optional)
- `access` (boolean, optional)
- `externalId` (string, optional)
- `entityId` (string, optional)

### UpdatePassword

- `encryptedPassword` (string, optional)
- `encryptedKeyName` (string, optional)
- `token` (string, optional)

### RepresentativeDetail

- `representativeId` (string, optional)
- `percentage` (long, optional)

### TaxPayerDetails

- `w8Ben` (FormW8BEN, optional)
- `userName` (string, optional)

### ProhibitedQuestionnaireDetail

- `code` (enum, optional)
  - Allowed values: `PASSPORT`, `CITIZENSHIP`, `BUSINESSDEALINGS`, `FINANCIALACCOUNTS`, `RESIDENT`, `MULTI`, `BIRTH`
- `status` (boolean, optional)
- `details` (string, optional)

### QualifiedPurchaser

- `qualifiedPurchaserDetails` (list of QualifiedPurchaserDetails, optional)
- `status` (boolean, optional)

### EligibleContractParticipant

- `eligibleContractParticipantDetails` (list of EligibleContractParticipantDetails, optional)
- `status` (boolean, optional)

### AssociatedIndividual

- `name` (IndividualName, optional)
- `nativeName` (IndividualName, optional)
- `birthName` (IndividualName, optional)
- `motherMaidenName` (IndividualName, optional)
- `dateOfBirth` (string, optional) — 申请人的出生日期。申请人必须年满 18 岁才能开立账户。如果 YYY-MM-DD \< 18 岁，将触发错误且账户不会被创建。如果 YYYY-MM-DD \< 21，申请人仅限开立 CASH 账户。UGMA 和 UTMA 账户适用于 18 岁或以下的未成年人。在未成年人达到特定年龄之前为其管理账户的个人或实体。仅限美国居民。此申请必须使用 IBKR Portal 内提供的前端应用程序开立。由单一托管人（Custodian）用户管理的单一账户中持有的资产。如果 dateOfBirth 为 YYYY-MM-DD 以外的任何值，将抛出错误。
- `countryOfBirth` (string, optional)
- `cityOfBirth` (string, optional)
- `gender` (enum, optional)
  - Allowed values: `M`, `F`, `Male`, `Female`
- `maritalStatus` (enum, optional)
  - Allowed values: `S`, `M`, `W`, `D`, `C`
- `numDependents` (long, optional)
- `residenceAddress` (ResidenceAddress, optional) — 提供申请人实际居住的居住地址。如果邮寄地址与 Residence 元素中提供的地址不同，那么您还需要包含 MailingAddress 元素。居住地址不接受邮政信箱（Post Office Box）。我们的系统会验证 Residence 属性中包含的 street\_1 和 street\_2，以确保未提供邮政信箱地址。如果 street\_1 或 street\_2 中包含以下任何组合，将抛出错误：PBPO BoxPost Office BoxP.O. BoxIn care ofGeneral Delivery用于验证 street\_1 和 street\_2 的正则表达式：English: (?:P(?:ost(?:al)?)?\[.-\s]*(?:(?:O(?:ffice)?\[.\s]*)?B(?:ox|in|\b|\d)|o(?:ffice|\b)(?:\[-\s]*\d)|code)|box\[-\s]*\d)Chinese Simplified: PO Box (?i)\b((邮政信箱) \[0-9]*)\bChinese Traditional: PO Box (?i)\b((郵政信箱) \[0-9]*)\b
- `mailingAddress` (Address, optional)
- `phones` (list of PhoneInfo, optional)
- `email` (string, optional)
- `identification` (Identification, optional) — 关联人员的身份识别信息。
- `employmentType` (string, optional)
- `employmentDetails` (EmploymentDetails, optional)
- `employeeTitle` (string, optional)
- `taxResidencies` (list of TaxResidency, optional)
- `w9` (FormW9, optional)
- `w8Ben` (FormW8BEN, optional)
- `crs` (FormCRS, optional)
- `prohibitedCountryQuestionnaire` (ProhibitedCountryQuestionnaireList, optional)
- `id` (string, optional)
- `externalId` (string, optional)
- `userId` (string, optional)
- `sameMailAddress` (boolean, optional)
- `authorizedToSignOnBehalfOfOwner` (boolean, optional)
- `authorizedTrader` (boolean, optional)
- `usTaxResident` (boolean, optional)
- `translated` (boolean, optional)
- `primaryTrustee` (boolean, optional)
- `ownerType` (enum, optional)
  - Allowed values: `INDIVIDUAL`, `LEGAL_ENTITY`, `TRUST`
- `ownershipPercentage` (double, optional)
- `titles` (list of Title, optional)
- `authorizedPerson` (boolean, optional)
- `referenceUsername` (string, optional)

### AddEntity

- `addRelationships` (list of AddRelationship, optional)
- `individual` (Individual, optional)
- `legalEntity` (LegalEntity, optional)
- `organization` (Organization, optional)
- `documents` (list of Document, optional)

### UpdateEntity

- `addRelationships` (list of AddRelationship, optional)
- `deleteRelationships` (list of DeleteRelationship, optional)
- `individual` (Individual, optional)
- `legalEntity` (LegalEntity, optional)
- `trust` (Trust, optional)
- `organization` (Organization, optional)
- `documents` (list of Document, optional)
- `ibEntityId` (long, optional)
- `externalId` (string, optional)

### DeleteEntity

- `ibEntityId` (long, optional)
- `externalId` (string, optional)

### Customer

- `organization` (OrganizationApplicant, optional)
- `accountHolder` (IndividualApplicant, optional)
- `jointHolders` (JointApplicant, optional)
- `trust` (TrustApplicant, optional)
- `id` (string, optional)
- `externalId` (string, optional)
- `transferUsMicroCapStock` (boolean, optional)
- `type` (enum, optional)
  - Allowed values: `INDIVIDUAL`, `JOINT`, `TRUST`, `UGMA`, `UTMA`, `ORG`, `IRA`
- `prefix` (string, optional)
- `userName` (string, optional)
- `userNameAlias` (string, optional)
- `userNameSource` (string, optional)
- `email` (string, optional)
- `mdStatusNonPro` (boolean, optional)
- `preferredPrimaryLanguage` (string, optional)
- `preferredSecondaryLanguage` (string, optional)
- `legalResidenceCountry` (string, optional)
- `taxTreatyCountry` (string, optional)
- `meetAmlStandard` (string, optional)
- `meetsAmlStandard` (string, optional)
- `directTradingAccess` (boolean, optional)
- `originCountry` (string, optional)
- `terminationAge` (long, optional)
- `governingState` (string, optional)
- `optForDebitCard` (boolean, optional)
- `roboFaClient` (boolean, optional)
- `independentAccount` (boolean, optional)
- `paperAccount` (boolean, optional)

### Account

- `accountConfiguration` (AccountConfigurationType, optional)
- `investmentObjectives` (list of enum, optional)
  - Allowed values: `Trading`, `Growth`, `Speculation`, `Hedging`, `Preservation`, `Income`
- `brokerageServiceCodes` (list of enum, optional)
  - Allowed values: `IBClearing`, `IBExecution`, `IBPrime`
- `capabilities` (list of enum, optional)
  - Allowed values: `BOND`, `FOP`, `FUND`, `FUT`, `MRGN`, `MULT`, `OPT`, `SSF`, `CFD`, `STK`, `CLP`, `LEVFX`, `CMDTY`
- `optionLevel` (long, optional)
- `tradingPermissions` (list of TradingPermission, optional)
- `commissionConfigs` (list of CommissionConfig, optional)
- `allExchangeAccess` (list of ExchangeAccess, optional)
- `dvpInstructions` (list of DVPInstruction, optional)
- `tradingLimits` (TradingLimits, optional)
- `advisorWrapFees` (AdvisorWrapFeesType, optional)
- `feesTemplateName` (string, optional)
- `clientCommissionSchedule` (CommissionScheduleType, optional)
- `clientInterestMarkupSchedules` (list of InterestMarkupType, optional)
- `decendent` (IRADecedent, optional)
- `iraBeneficiaries` (IRABeneficiariesType, optional)
- `extPositionsTransfers` (list of ExtPositionsTransferType, optional)
- `depositNotification` (DepositNotification, optional)
- `custodian` (CustodianType, optional)
- `successorCustodian` (CustodianType, optional)
- `accountRep` (AccountRep, optional)
- `id` (string, optional)
- `externalId` (string, optional)
- `propertyProfile` (string, optional)
- `baseCurrency` (enum, optional)
  - Allowed values: `USD`, `EUR`, `GBP`, `CAD`, `JPY`, `HKD`, `AUD`, `CHF`, `MXN`, `SEK`, `NZD`, `HUF`, `CZK`, `CNH`, `DKK`, `RUB`, `ILS`, `NOK`, `SGD`, `PLN`, `ZAR`, `AED`, `KRW`, `SAR`, `TRY`, `RON`, `BGN`
- `employeePlan` (string, optional)
- `multiCurrency` (boolean, optional)
- `migration` (boolean, optional)
- `sourceAccountId` (string, optional)
- `margin` (string, optional)
- `ira` (boolean, optional)
- `iraType` (enum, optional)
  - Allowed values: `RI`, `RO`, `RT`, `SP`, `ED`, `TH`, `RH`, `SH`, `RRSP`, `SRRSP`, `TFSA`, `SIMPLE`, `ISA`, `JISA`
- `iraOfficialTitle` (string, optional)
- `clientActiveTrading` (boolean, optional)
- `duplicate` (boolean, optional)
- `numberOfDuplicates` (long, optional)
- `stockYieldProgram` (boolean, optional)
- `alias` (string, optional)
- `accountType` (enum, optional)
  - Allowed values: `Investment`, `Trading`, `SMSF`
- `drip` (boolean, optional)
- `qiSubType` (enum, optional)
  - Allowed values: `ISA`, `JISA`, `SIPP`

### User

- `userPrivileges` (list of UserPrivilege, optional)
- `mdServices` (list of long, optional)
- `id` (string, optional)
- `externalUserId` (string, optional)
- `externalIndividualId` (string, optional)
- `encryptedPassword` (string, optional)
- `encryptedKeyName` (string, optional)
- `prefix` (string, optional)

### LocalTaxForm

- `taxAuthority` (enum, optional)
  - Allowed values: `ISRAEL_TA`, `CANADA_TA`, `RUSSIA_TA`, `SWEDEN_TA`, `AUSTRALIA_TA`
- `qualified` (boolean, optional)
- `treatyCountry` (string, optional)

### FormW8BEN

- `localTaxForms` (list of LocalTaxForm, optional)
- `name` (string, optional)
- `tin` (string, optional)
- `foreignTaxId` (string, optional)
- `tinOrExplanationRequired` (boolean, optional)
- `explanation` (enum, optional)
  - Allowed values: `US_TIN`, `TIN_NOT_DISCLOSED`, `TIN_NOT_REQUIRED`, `TIN_NOT_ISSUED`
- `referenceNumber` (long, optional)
- `part29ACountry` (string, optional)
- `cert` (boolean, optional)
- `signatureType` (enum, optional)
  - Allowed values: `Electronic`, `Physical`
- `blankForm` (boolean, optional)
- `taxFormFile` (string, optional)
- `proprietaryFormNumber` (long, optional)
- `electronicFormat` (boolean, optional)
- `submitDate` (string, optional)

### FormW8BENE

- `substantialUsOwnerExternalIds` (list of string, optional)
- `name` (string, optional)
- `countryOfOrganization` (string, optional)
- `disregardedEntityName` (string, optional)
- `entityType` (enum, optional)
  - Allowed values: `CORPORATION`, `DISREGARDED_ENTITY`, `PARTNERSHIP`, `SIMPLE_TRUST`, `GRANTOR_TRUST`, `COMPLEX_TRUST`, `ESTATE`, `GOVERNMENT`, `CENTRAL_BANK_OF_ISSUE`, `TAX_EXEMPT_ORGANIZATION`, `PRIVATE_FOUNDATION`
- `fatcaStatus` (enum, optional)
  - Allowed values: `NONPARTICIPATING_FFI`, `PARICIPATING_FFI`, `REPORTING_MODEL_1_FFI`, `REPORTING_MODEL_2_FFI`, `REGISTERED_DEEMED_COMPLIANT_FFI`, `SPONSORED_FFI`, `CERTIFIED_DEEMED_COMPLIANT_NONREGISTERING_LOCAL_BANK`, `CERTIFIED_DEEMED_COMPLIANT_FFI`, `CERTIFIED_DEEMED_COMPLIANT_SPONSORED_VEHICLE`, `CERTIFIED_DEEMED_COMPLIANT_LIMITED_LIFE_DEBT`, `CERTIFIED_DEEMED_COMPLIANT_INVESTMENT_ADVISORS`, `OWNER_DOCUMENTED_FFI`, `RESTRICTED_DISTRIBUTOR`, `NONREPORTING_IGA_FFI`, `FOREIGN_GOVERNMENT`, `INTERNATIONAL_ORGANIZATION`, `EXEMPT_RETIREMENT_PLANS`, `ENTITY_OWNED_BY_EXEMPT_BENEFICIAL_OWNERS`, `TERRITORY_FINANCIAL_INSTITUTION`, `NONFINANCIAL_GROUP`, `EXCEPTED_NONFINANCIAL_STARTUP`, `EXCEPTED_NONFINANCIAL_ENTITY`, `AN_501_C_ORGANIZATION`, `NONPROFIT_ORGANIZATION`, `PUBLICLY_TRADED_NFFE`, `EXCEPTED_TERRITORY_NFFE`, `ACTIVE_NFFE`, `PASSIVE_NFFE`, `EXCEPTED_INTER_AFFILIATE_FFI`, `DIRECT_REPORTING_NFFE`, `SPONSORED_DIRECT_REPORTING_NFFE`
- `usTin` (string, optional)
- `giin` (string, optional)
- `foreignTin` (string, optional)
- `tinOrExplanationRequired` (boolean, optional)
- `explanation` (enum, optional)
  - Allowed values: `US_TIN`, `TIN_NOT_DISCLOSED`, `TIN_NOT_REQUIRED`, `TIN_NOT_ISSUED`
- `referenceNumber` (long, optional)
- `submitDate` (string, optional)
- `box11Status` (enum, optional)
  - Allowed values: `LIMITED_BRANCH`, `US_BRANCH`, `PARTICIPATING_FFI`, `REPORTING_MODEL_1_FFI`, `REPORTING_MODEL_2_FFI`
- `part314A` (boolean, optional)
- `part314ACountry` (string, optional)
- `part314B` (enum, optional)
  - Allowed values: `CompanyMeetsOwnershipAndBaseErosionTest`, `TaxExemptPensionTrustOrPensionFund`, `CompanyMeetsDerivativeBenefitsTest`, `TaxExemptOrganization`, `CompanyWithIncomeActiveBusiness`, `PubliclyTradedCorporation`, `FavorableDiscretionaryDetermination`, `SubsidiaryOfAPubliclyTradedCorporation`, `Government`, `NoLobArticleInTreaty`, `Other`
- `part314C` (boolean, optional)
- `part416` (string, optional)
- `part417I` (boolean, optional)
- `part417Ii` (boolean, optional)
- `part518` (boolean, optional)
- `part619` (boolean, optional)
- `part720` (string, optional)
- `part721` (boolean, optional)
- `part822` (boolean, optional)
- `part923` (boolean, optional)
- `part1024A` (boolean, optional)
- `part1024B` (boolean, optional)
- `part1024C` (boolean, optional)
- `part1024D` (boolean, optional)
- `part1125A` (boolean, optional)
- `part1125B` (boolean, optional)
- `part1125C` (boolean, optional)
- `part1226` (boolean, optional)
- `part1226Desc1` (string, optional)
- `part1226Desc2` (string, optional)
- `part1226Desc3` (enum, optional)
  - Allowed values: `CollectiveInvestmentVehicle`, `ExemptBeneficialOwner-RetirementPlan`, `FinancialInstitutionwithlocalClientBase`, `InvestmentAdvisorsandManagers`, `LocalBank`, `SponsoredCloselyHeldInvestmentVehicle`, `SponsoredInvestmentEntity`, `TrusteeDocumentedTrust`
- `part1226Desc4` (string, optional)
- `part1327` (boolean, optional)
- `part1428A` (boolean, optional)
- `part1428B` (boolean, optional)
- `part1529A` (boolean, optional)
- `part1529B` (boolean, optional)
- `part1529C` (boolean, optional)
- `part1529D` (boolean, optional)
- `part1529E` (boolean, optional)
- `part1529F` (boolean, optional)
- `part1630` (boolean, optional)
- `part1731` (boolean, optional)
- `part1832` (boolean, optional)
- `part1933` (boolean, optional)
- `part2034` (boolean, optional)
- `part2135` (boolean, optional)
- `part2135Date` (string, optional)
- `part2236` (boolean, optional)
- `part2337A` (boolean, optional)
- `part2337ADesc` (string, optional)
- `part2337B` (boolean, optional)
- `part2337BDesc1` (string, optional)
- `part2337BDesc2` (string, optional)
- `part2438` (boolean, optional)
- `part2539` (boolean, optional)
- `part2640A` (boolean, optional)
- `part2640B` (boolean, optional)
- `part2640C` (boolean, optional)
- `part2741` (boolean, optional)
- `part2842` (string, optional)
- `part2843` (boolean, optional)
- `cert` (boolean, optional)
- `signatureType` (enum, optional)
  - Allowed values: `Electronic`, `Physical`
- `blankForm` (boolean, optional)
- `taxFormFile` (string, optional)
- `proprietaryFormNumber` (long, optional)
- `electronicFormat` (boolean, optional)

### FormW9

- `localTaxForms` (list of LocalTaxForm, optional)
- `name` (string, optional)
- `businessName` (string, optional)
- `customerType` (enum, optional)
  - Allowed values: `Individual`, `Corporation`, `Partnership`, `LLC`, `Other`
- `taxClassification` (string, optional)
- `otherCustomerType` (string, optional)
- `tin` (string, optional)
- `tinType` (enum, optional)
  - Allowed values: `SSN`, `EIN`, `NonUS_NationalId`
- `cert1` (boolean, optional)
- `cert2` (boolean, optional)
- `cert3` (boolean, optional)
- `cert4` (boolean, optional)
- `signatureType` (enum, optional)
  - Allowed values: `Electronic`, `Physical`
- `blankForm` (boolean, optional)
- `taxFormFile` (string, optional)
- `proprietaryFormNumber` (long, optional)

### Questionnaire

- `answers` (list of Answer, optional)
- `formNumber` (long, optional)

### Details

- `question` (string, optional)
- `answer` (string, optional)

### Service

- `value` (long, optional)
- `action` (enum, optional)
  - Allowed values: `ADD`, `REMOVE`

### Task

- `formNumber` (long, optional)
- `status` (boolean, optional)

### IndividualName

- `salutation` (enum, optional)
  - Allowed values: `Mr.`, `Mrs.`, `Ms.`, `Dr.`, `Mx.`, `Ind.`
- `first` (string, optional)
- `last` (string, optional)
- `middle` (string, optional)
- `suffix` (enum, optional)
  - Allowed values: `Jr.`, `Sr.`, `I`, `II`, `III`, `IV`, `V`
- `title` (string, optional)

### ResidenceAddress

提供申请人实际居住的居住地址。如果邮寄地址与 Residence 元素中提供的地址不同，那么您还需要包含 MailingAddress 元素。居住地址不接受邮政信箱（Post Office Box）。我们的系统会验证 Residence 属性中包含的 street\_1 和 street\_2，以确保未提供邮政信箱地址。如果 street\_1 或 street\_2 中包含以下任何组合，将抛出错误：PBPO BoxPost Office BoxP.O. BoxIn care ofGeneral Delivery用于验证 street\_1 和 street\_2 的正则表达式：English: (?:P(?:ost(?:al)?)?\[.-\s]*(?:(?:O(?:ffice)?\[.\s]*)?B(?:ox|in|\b|\d)|o(?:ffice|\b)(?:\[-\s]*\d)|code)|box\[-\s]*\d)Chinese Simplified: PO Box (?i)\b((邮政信箱) \[0-9]*)\bChinese Traditional: PO Box (?i)\b((郵政信箱) \[0-9]*)\b

- `street1` (string, optional) — 申请人居住的街道
- `street2` (string, optional) — 申请人居住的街道
- `city` (string, optional) — 申请人居住的城市。
- `state` (string, optional) — 申请人居住的州/省。
- `country` (string, optional) — 申请人居住的国家/地区。
- `postalCode` (string, optional) — 邮政编码。对于不提供邮政编码的国家/地区，请输入 00000

### Address

- `street1` (string, optional)
- `street2` (string, optional)
- `city` (string, optional)
- `state` (string, optional)
- `country` (string, optional)
- `postalCode` (string, optional)

### PhoneInfo

- `type` (enum, optional)
  - Allowed values: `Work`, `Home`, `Fax`, `Mobile`, `Mobile (work)`, `Mobile (other)`, `Business`, `Other (voice)`
- `number` (string, optional)
- `country` (string, optional)
- `verified` (boolean, optional)

### EmploymentDetails

- `employer` (string, optional)
- `occupation` (string, optional)
- `description` (string, optional)
- `employerBusiness` (string, optional)
- `employerAddress` (Address, optional)
- `employerPhone` (string, optional)
- `emplCountryResCountryDetails` (string, optional)
- `businessDescription` (string, optional)

### TaxResidency

- `country` (string, optional)
- `tin` (string, optional)
- `tinType` (enum, optional)
  - Allowed values: `SSN`, `EIN`, `NonUS_NationalId`

### FormCRS

- `controllingPersonDesignation` (enum, optional)
  - Allowed values: `SENIOR_MGMT_OFFICER`, `BY_OWNERSHIP`, `BY_OTHER_MEANS`
- `oecdStatus` (enum, optional)
  - Allowed values: `DEPOSITORY_INSTITUTION`, `CUSTODIAL_INSTITUTION`, `SPECIFIED_INSURANCE_COMPANY`, `INVESTMENT_ENTITY_IN_NONPARTICIPATING_JURISDICTION`, `INVESTMENT_ENTITY_NOT_LISTED`, `PUBLICLY_TRADED_CORPORATION_OR_AFFILIATE`, `OTHER_ACTIVE_NON_FINANCIAL_ENTITY`, `PASSIVE_NON_FINANCIAL_ENTITY`, `EXEMPT_RETIREMENT_PLAN`, `NON_REPORTING_FI`, `OTHER_INVESTMENT_ENTITY`, `FINANCIAL_INSTITUTION`, `NON_REPORTING_FINANCIAL_INSTITUTION`

### ProhibitedCountryQuestionnaireList

- `prohibitedQuestionnaireDetail` (list of ProhibitedQuestionnaireDetail, optional)
- `accountId` (string, optional)
- `externalId` (string, optional)
- `entityId` (string, optional)

### Title

- `value` (string, optional)
- `code` (enum, optional)
  - Allowed values: `Account Holder`, `FIRST HOLDER`, `SECOND HOLDER`, `TRADER`, `CEO`, `SECRETARY`, `TREASURER`, `OWNER`, `PRINCIPAL`, `SHAREHOLDER`, `TRUSTEE`, `BENEFICIARY`, `GRANTOR`, `Employee`, `CONTINGENT`, `IRA_BENEFICIARY`, `IRA DECEDENT`, `COMP_OFFICER`, `Other Officer`, `Controlling Officer`, `SIGNATORY`, `NON-EMPLOYEE`, `CUSTODIAN`, `SUCCESSOR_CUSTODIAN`, `DIRECTOR`, `PARTNER`, `CUSTODIAN EMPLOYEE`, `SUCCESSOR CUSTODIAN EMPLOYEE`, `SPOUSE`, `Successor Holder`, `Registered Contact`

### IdentityDocument

用于 MiFIR 合规的身份证件列表。

- `issuingCountry` (string, required) — 签发国家/地区的 ISO alpha-3 国家/地区代码。
- `docType` (enum, required) — 身份证件类型。
  - Allowed values: `DRIVERS_LICENSE`, `PROOF_OF_AGE`, `NATIONAL_ID`, `PASSPORT`, `ALIEN_ID`, `MEDICARE_CARD`
- `docId` (string, required) — 主证件号码。
- `docId2` (string, optional) — 次级证件号码，当证件类型要求提供次级号码时必填。
- `expirationDate` (date, optional) — 身份证件的到期日期。

### AttachedFileType

- `fileName` (string, required) — 提交给 IBKR 的 PDF 文档的文件名。documents 请求中包含的 fileName 必须与签名请求中包含的 PDF 文件的 fileName 一致。• 可接受的格式：.jpeg、.jpg、.pdf、.png • 最大大小：10 MB
- `fileLength` (long, required) — PDF 表单的长度
- `sha1Checksum` (string, required) — SHA-1 是一种用于验证文件未被篡改的加密算法。具体做法是在文件传输之前生成一次校验和，然后在文件到达目的地后再次生成校验和。

### FilePayload

- `mimeType` (string, required) — 文件的格式。
- `data` (string, required) — 包含以 base64 编码的文档。

### AssetExperience

- `assetClass` (enum, optional)
  - Allowed values: `BILL`, `BOND`, `CASH`, `CFD`, `COMB`, `FOP`, `FUND`, `FUT`, `OPT`, `SSF`, `STK`, `WAR`, `MRGN`, `CLP`
- `yearsTrading` (long, optional)
- `tradesPerYear` (long, optional)
- `knowledgeLevel` (enum, optional)
  - Allowed values: `Extensive`, `Good`, `Limited`, `None`

### SourceOfIncomeType

- `sourceType` (enum, optional)
  - Allowed values: `CONSULTING`, `DISABILITY`, `INHERITANCE`, `INTEREST`, `REALESTATE`, `RENTAL`, `SEVERANCE`, `SPOUSE`, `TRADINGANDINVESTMENTS`, `PENSIONANDSOCIALSECURITY`, `UNEMPLOYMENT`, `OTHER`
- `percentage` (long, optional)
- `description` (string, optional)

### SourceOfWealthType

- `sourceType` (enum, optional)
  - Allowed values: `SOW-IND-Allowance`, `SOW-IND-Disability`, `SOW-IND-Income`, `SOW-IND-Inheritance`, `SOW-IND-Interest`, `SOW-IND-MarketProfit`, `SOW-IND-Other`, `SOW-IND-Pension`, `SOW-IND-Property`, `SOW-ORG-Business`, `SOW-ORG-MarketTradingProfits`, `SOW-ORG-Other`, `SOW-ORG-OwnerEquity`, `SOW-ORG-Property`, `SOW-ORG-RetainedEarnings`
- `percentage` (long, optional)
- `usedForFunds` (boolean, optional)
- `description` (string, optional)

### SOIQuestionnaire

- `details` (string, optional)

### QuestionnaireType

- `formNumber` (long, optional)
- `detail` (string, optional)

### QualifiedPurchaserDetails

- `code` (enum, optional)
  - Allowed values: `InvestmentCompanyAct`, `DiscretionaryBasis`
- `status` (boolean, optional)

### EligibleContractParticipantDetails

- `code` (enum, optional)
  - Allowed values: `DiscretionaryBasis`, `HighRisk`
- `status` (boolean, optional)

### AddRelationship

- `name` (enum, optional)
  - Allowed values: `Account_Holder`, `Spouse`, `Firstholder`, `Secondholder`, `Trader`, `Secretary`, `Treasurer`, `Ceo`, `Owner`, `Trustee`, `Beneficiary`, `Grantor`, `Director`, `Principal`, `Shareholder`, `Partner`, `Controlling_Officer`, `Beneficialowner`, `Signatory`, `Comp_Officer`, `Superv_Broker`, `Pooled_User`, `Financial_User`, `Contingent`, `Ira_Beneficiary`, `Employee`, `Non_Employee`, `Fund_Admin`, `Fund_Contact`, `Firm_Admin`, `Firm_Billing`, `Firm_Clearing`, `Firm_Sales`, `Firm_Trading`, `Firm_User`, `Account_Admin`, `Account_Billing`, `Account_Clearing`, `Account_Sales`, `Account_Trading`, `User_Individual`, `Fund_Manager`, `Investment_Advisor`, `Shf_Investmanager`, `Advisory_Principal`, `Advisory_Signatory`, `Associated_Fund`, `Primary_Contributor`, `Administrator`, `Contact`, `Lead_Compliance_Officer`, `Compliance_Officer`, `Other_Officer`, `Apply_User`, `Transfer_On_Death_Legator`, `Tod_Primary_Beneficiary`, `Tod_Contingent_Beneficiary`, `Nominee`, `Nominee_Guardian`, `Ira_Decedent`, `Authorized_Person`, `Promoter`, `Wholetime_Director`, `Nominee_Owner`, `Third_Party_Admin`, `Compliance_Contact`, `Trust_Controller`, `Trust_Applicant`, `Organization_Applicant`, `Mm_Contact`, `Reg_Rep`, `Plan_Sponsor`, `Plan_Sponsor_Officer`, `Pension_Admin`, `Pension_Admin_Contact`, `Accountant`, `Joint_Applicant`, `Custodian_Employee`, `Successor_Custodian`, `Custodian`, `Successor_Custodian_Employee`, `Chief_Compliance_Officer`, `Chief_Financial_Officer`, `Trading_Officer`, `Child`, `Parent`, `Sibling`, `Estate`, `As_Interest_May_Appear`, `Ira_Present_Trust`, `Other`, `Life_Partner`, `Common_Law_Partner`, `Grandchild`, `Charity`, `Trust_Ira`, `Successor_Holder`, `Head_Of_Desk`, `Cftc_Non_Applicant_Ocr_Contact`, `Ocr_Account_Controller`, `Cftc_Applicant_Ocr_Contact`
- `ownershipPercentage` (long, optional)

### Individual

- `name` (IndividualName, optional)
- `nativeName` (IndividualName, optional)
- `birthName` (IndividualName, optional)
- `motherMaidenName` (IndividualName, optional)
- `dateOfBirth` (string, optional) — 申请人的出生日期。申请人必须年满 18 岁才能开立账户。如果 YYY-MM-DD \< 18 岁，将触发错误且账户不会被创建。如果 YYYY-MM-DD \< 21，申请人仅限开立 CASH 账户。UGMA 和 UTMA 账户适用于 18 岁或以下的未成年人。在未成年人达到特定年龄之前为其管理账户的个人或实体。仅限美国居民。此申请必须使用 IBKR Portal 内提供的前端应用程序开立。由单一托管人（Custodian）用户管理的单一账户中持有的资产。如果 dateOfBirth 为 YYYY-MM-DD 以外的任何值，将抛出错误。
- `countryOfBirth` (string, optional)
- `cityOfBirth` (string, optional)
- `gender` (enum, optional)
  - Allowed values: `M`, `F`, `Male`, `Female`
- `maritalStatus` (enum, optional)
  - Allowed values: `S`, `M`, `W`, `D`, `C`
- `numDependents` (long, optional)
- `residenceAddress` (ResidenceAddress, optional) — 提供申请人实际居住的居住地址。如果邮寄地址与 Residence 元素中提供的地址不同，那么您还需要包含 MailingAddress 元素。居住地址不接受邮政信箱（Post Office Box）。我们的系统会验证 Residence 属性中包含的 street\_1 和 street\_2，以确保未提供邮政信箱地址。如果 street\_1 或 street\_2 中包含以下任何组合，将抛出错误：PBPO BoxPost Office BoxP.O. BoxIn care ofGeneral Delivery用于验证 street\_1 和 street\_2 的正则表达式：English: (?:P(?:ost(?:al)?)?\[.-\s]*(?:(?:O(?:ffice)?\[.\s]*)?B(?:ox|in|\b|\d)|o(?:ffice|\b)(?:\[-\s]*\d)|code)|box\[-\s]*\d)Chinese Simplified: PO Box (?i)\b((邮政信箱) \[0-9]*)\bChinese Traditional: PO Box (?i)\b((郵政信箱) \[0-9]*)\b
- `mailingAddress` (Address, optional)
- `phones` (list of PhoneInfo, optional)
- `email` (string, optional)
- `identification` (Identification, optional) — 关联人员的身份识别信息。
- `employmentType` (string, optional)
- `employmentDetails` (EmploymentDetails, optional)
- `employeeTitle` (string, optional)
- `taxResidencies` (list of TaxResidency, optional)
- `w9` (FormW9, optional)
- `w8Ben` (FormW8BEN, optional)
- `crs` (FormCRS, optional)
- `prohibitedCountryQuestionnaire` (ProhibitedCountryQuestionnaireList, optional)
- `id` (string, optional)
- `externalId` (string, optional)
- `userId` (string, optional)
- `sameMailAddress` (boolean, optional)
- `authorizedToSignOnBehalfOfOwner` (boolean, optional)
- `authorizedTrader` (boolean, optional)
- `usTaxResident` (boolean, optional)
- `translated` (boolean, optional)
- `primaryTrustee` (boolean, optional)

### LegalEntity

- `name` (string, optional)
- `address` (Address, optional)
- `phones` (list of PhoneInfo, optional)
- `email` (string, optional)
- `legalEntityIdentification` (LegalEntityIdentification, optional)
- `taxResidencies` (list of TaxResidency, optional)
- `id` (string, optional)
- `externalId` (string, optional)
- `usTaxResident` (boolean, optional)
- `translated` (boolean, optional)

### Organization

- `identification` (OrganizationIdentification, optional)
- `regulatoryInformation` (RegulatoryInformation, optional)
- `associatedEntities` (AssociatedEntities, optional)

### DeleteRelationship

- `name` (enum, optional)
  - Allowed values: `Account_Holder`, `Spouse`, `Firstholder`, `Secondholder`, `Trader`, `Secretary`, `Treasurer`, `Ceo`, `Owner`, `Trustee`, `Beneficiary`, `Grantor`, `Director`, `Principal`, `Shareholder`, `Partner`, `Controlling_Officer`, `Beneficialowner`, `Signatory`, `Comp_Officer`, `Superv_Broker`, `Pooled_User`, `Financial_User`, `Contingent`, `Ira_Beneficiary`, `Employee`, `Non_Employee`, `Fund_Admin`, `Fund_Contact`, `Firm_Admin`, `Firm_Billing`, `Firm_Clearing`, `Firm_Sales`, `Firm_Trading`, `Firm_User`, `Account_Admin`, `Account_Billing`, `Account_Clearing`, `Account_Sales`, `Account_Trading`, `User_Individual`, `Fund_Manager`, `Investment_Advisor`, `Shf_Investmanager`, `Advisory_Principal`, `Advisory_Signatory`, `Associated_Fund`, `Primary_Contributor`, `Administrator`, `Contact`, `Lead_Compliance_Officer`, `Compliance_Officer`, `Other_Officer`, `Apply_User`, `Transfer_On_Death_Legator`, `Tod_Primary_Beneficiary`, `Tod_Contingent_Beneficiary`, `Nominee`, `Nominee_Guardian`, `Ira_Decedent`, `Authorized_Person`, `Promoter`, `Wholetime_Director`, `Nominee_Owner`, `Third_Party_Admin`, `Compliance_Contact`, `Trust_Controller`, `Trust_Applicant`, `Organization_Applicant`, `Mm_Contact`, `Reg_Rep`, `Plan_Sponsor`, `Plan_Sponsor_Officer`, `Pension_Admin`, `Pension_Admin_Contact`, `Accountant`, `Joint_Applicant`, `Custodian_Employee`, `Successor_Custodian`, `Custodian`, `Successor_Custodian_Employee`, `Chief_Compliance_Officer`, `Chief_Financial_Officer`, `Trading_Officer`, `Child`, `Parent`, `Sibling`, `Estate`, `As_Interest_May_Appear`, `Ira_Present_Trust`, `Other`, `Life_Partner`, `Common_Law_Partner`, `Grandchild`, `Charity`, `Trust_Ira`, `Successor_Holder`, `Head_Of_Desk`, `Cftc_Non_Applicant_Ocr_Contact`, `Ocr_Account_Controller`, `Cftc_Applicant_Ocr_Contact`

### Trust

- `identification` (TrustIdentification, optional)
- `regulatoryInformation` (RegulatoryInformation, optional)

### OrganizationApplicant

- `identifications` (list of OrganizationIdentification, optional)
- `accountSupport` (AccountSupportType, optional)
- `financialInformation` (list of FinancialInformation, optional)
- `accreditedInvestorInformation` (AccreditedInvestorInformation, optional)
- `regulatoryInformation` (list of RegulatoryInformation, optional)
- `managingOwner` (ManagingOwner, optional)
- `associatedEntities` (AssociatedEntities, optional)
- `regulatedMemberships` (list of RegulatedMembership, optional)
- `taxResidencies` (list of TaxResidency, optional)
- `w8BenE` (FormW8BENE, optional)
- `w8IMY` (FormW8IMY, optional)
- `withholdingStatement` (WithholdingStatementType, optional)
- `typeOfTrading` (enum, optional)
  - Allowed values: `FIRM`, `CUSTOMER`
- `type` (enum, optional)
  - Allowed values: `LLC`, `CORPORATION`, `PARTNERSHIP`, `UNINCORPORATED BUSINESS`
- `orgUsSubsidiary` (boolean, optional)
- `qualifiedIntermediary` (boolean, optional)
- `assumedPrimaryReporting` (boolean, optional)
- `acceptedPrimaryWithholding` (boolean, optional)
- `usTaxPurposeType` (enum, optional)
  - Allowed values: `C`, `P`, `E`
- `propAccount` (boolean, optional) — 指示该组织是否为 PAB（Prop Account）账户。
- `lei` (string, optional)
- `noLeiConfirmation` (boolean, optional)

### IndividualApplicant

- `accountHolderDetails` (list of AssociatedIndividual, optional)
- `associatedIndividual` (AssociatedIndividual, optional)
- `financialInformation` (list of FinancialInformation, optional)
- `regulatoryInformation` (list of RegulatoryInformation, optional)
- `regulatedMemberships` (list of RegulatedMembership, optional)
- `accreditedInvestorInformation` (AccreditedInvestorInformation, optional)
- `taxInformation` (IndividualTaxInformation, optional)
- `withholdingStatement` (WithholdingStatementType, optional)

### JointApplicant

- `firstHolderDetails` (list of AssociatedIndividual, optional)
- `secondHolderDetails` (list of AssociatedIndividual, optional)
- `financialInformation` (list of FinancialInformation, optional)
- `regulatoryInformation` (list of RegulatoryInformation, optional)
- `regulatedMemberships` (list of RegulatedMembership, optional)
- `accreditedInvestorInformation` (AccreditedInvestorInformation, optional)
- `taxInformation` (IndividualTaxInformation, optional)
- `withholdingStatement` (WithholdingStatementType, optional)
- `type` (enum, optional)
  - Allowed values: `community`, `joint_tenants`, `tenants_common`, `tbe`, `au_joint_account`

### TrustApplicant

- `identification` (list of TrustIdentification, optional)
- `financialInformation` (list of FinancialInformation, optional)
- `regulatoryInformation` (list of RegulatoryInformation, optional)
- `regulatedMemberships` (list of RegulatedMembership, optional)
- `accreditedInvestorInformation` (AccreditedInvestorInformation, optional)
- `trustees` (TrusteesType, optional)
- `beneficiaries` (AssociationTypeEntities, optional)
- `grantors` (AssociationTypeEntities, optional)
- `taxResidencies` (list of TaxResidency, optional)
- `w8BenE` (FormW8BENE, optional)
- `w8IMY` (FormW8IMY, optional)
- `withholdingStatement` (WithholdingStatementType, optional)
- `thirdPartyManagement` (boolean, optional)
- `trustType` (enum, optional)
  - Allowed values: `COMPLEX_TRUST`, `SINGLE_TRUST`, `GRANTOR_TRUST`, `US_TAXABLE_TRUST`

### AccountConfigurationType

- `type` (string, optional)
- `value` (boolean, optional)

### CommissionConfig

- `style` (enum, optional)
  - Allowed values: `Bundled`, `Unbundled`
- `type` (enum, optional)
  - Allowed values: `Commodities`, `Securities`

### ExchangeAccess

- `assetClass` (enum, optional)
  - Allowed values: `BILL`, `BOND`, `CASH`, `CFD`, `COMB`, `FOP`, `FUND`, `FUT`, `OPT`, `SSF`, `STK`, `WAR`, `MRGN`, `CLP`
- `exchange` (enum, optional)
  - Allowed values: `NYSE`, `AMEX`, `NASDAQ`, `CBOE`, `ISE`, `BOX`, `PHLX`, `PSE`

### DVPInstruction

- `id` (string, optional)
- `externalId` (string, optional)
- `externalAccountID` (string, optional)
- `accountID` (string, optional)
- `name` (string, optional)
- `type` (enum, optional)
  - Allowed values: `DTCID`, `NSCC`, `CMTA`, `GUS`, `OCCSSF`
- `role` (enum, optional)
  - Allowed values: `E`, `C`, `B`
- `agentID` (string, optional)
- `firmID` (string, optional)
- `agentName` (string, optional)
- `accountName` (string, optional)
- `dayDoID` (string, optional)
- `txGroupCode` (enum, optional)
  - Allowed values: `G`, `Z`, `R`, `N`
- `brokerCode` (string, optional)
- `assetClass` (enum, optional)
  - Allowed values: `BILL`, `BOND`, `CASH`, `CFD`, `COMB`, `FOP`, `FUND`, `FUT`, `OPT`, `SSF`, `STK`, `WAR`, `MRGN`, `CLP`
- `exchange` (enum, optional)
  - Allowed values: `NYSE`, `AMEX`, `NASDAQ`, `CBOE`, `ISE`, `BOX`, `PHLX`, `PSE`
- `prepayTax` (boolean, optional)
- `prepayCommission` (boolean, optional)
- `expiry` (date, optional)
- `default` (boolean, optional)

### TradingLimits

- `orderValueLimits` (OrderValueLimits, optional)
- `efpQuantityLimits` (EFPQuantityLimits, optional)
- `orderQuantityLimits` (list of OrderQuantityLimit, optional)
- `dayQuantityLimits` (list of DayQuantityLimit, optional)

### AdvisorWrapFeesType

- `automatedFeesDetails` (list of AutomatedWrapFeeDetailsType, optional)
- `highWaterMarkConfigHwma` (HighWaterMarkType, optional)
- `highWaterMarkConfigHwmq` (HighWaterMarkType, optional)
- `strategy` (enum, optional)
  - Allowed values: `AUTOMATED`, `DIRECTBILLING`, `NO_FEE`
- `chargeAdvisor` (boolean, optional)
- `chargeOtherFeesToAdvisor` (boolean, optional)

### CommissionScheduleType

- `markups` (list of CommissionMarkupType, optional)
- `pricingStructure` (enum, optional)
  - Allowed values: `FIXED`, `TIERED`

### InterestMarkupType

- `currency` (enum, optional)
  - Allowed values: `USD`, `EUR`, `GBP`, `CAD`, `JPY`, `HKD`, `AUD`, `CHF`, `MXN`, `SEK`, `NZD`, `HUF`, `CZK`, `CNH`, `DKK`, `RUB`, `ILS`, `NOK`, `SGD`, `PLN`, `ZAR`, `AED`, `KRW`, `SAR`, `TRY`, `RON`, `BGN`
- `debitMarkup` (double, optional)
- `ibDebitMarkup` (double, optional)
- `creditMarkdown` (double, optional)
- `shortCreditMarkdown` (double, optional)
- `shortCfdCreditMarkdown` (double, optional)
- `longCfdDebitMarkdown` (double, optional)
- `shortIndexCfdCreditMarkdown` (double, optional)
- `longIndexCfdDebitMarkdown` (double, optional)
- `shortFxCfdMarkup` (double, optional)
- `longFxCfdMarkdown` (double, optional)

### IRADecedent

- `name` (IndividualName, optional)
- `nativeName` (IndividualName, optional)
- `birthName` (IndividualName, optional)
- `motherMaidenName` (IndividualName, optional)
- `dateOfBirth` (string, optional) — 申请人的出生日期。申请人必须年满 18 岁才能开立账户。如果 YYY-MM-DD \< 18 岁，将触发错误且账户不会被创建。如果 YYYY-MM-DD \< 21，申请人仅限开立 CASH 账户。UGMA 和 UTMA 账户适用于 18 岁或以下的未成年人。在未成年人达到特定年龄之前为其管理账户的个人或实体。仅限美国居民。此申请必须使用 IBKR Portal 内提供的前端应用程序开立。由单一托管人（Custodian）用户管理的单一账户中持有的资产。如果 dateOfBirth 为 YYYY-MM-DD 以外的任何值，将抛出错误。
- `countryOfBirth` (string, optional)
- `cityOfBirth` (string, optional)
- `gender` (enum, optional)
  - Allowed values: `M`, `F`, `Male`, `Female`
- `maritalStatus` (enum, optional)
  - Allowed values: `S`, `M`, `W`, `D`, `C`
- `numDependents` (long, optional)
- `residenceAddress` (ResidenceAddress, optional) — 提供申请人实际居住的居住地址。如果邮寄地址与 Residence 元素中提供的地址不同，那么您还需要包含 MailingAddress 元素。居住地址不接受邮政信箱（Post Office Box）。我们的系统会验证 Residence 属性中包含的 street\_1 和 street\_2，以确保未提供邮政信箱地址。如果 street\_1 或 street\_2 中包含以下任何组合，将抛出错误：PBPO BoxPost Office BoxP.O. BoxIn care ofGeneral Delivery用于验证 street\_1 和 street\_2 的正则表达式：English: (?:P(?:ost(?:al)?)?\[.-\s]*(?:(?:O(?:ffice)?\[.\s]*)?B(?:ox|in|\b|\d)|o(?:ffice|\b)(?:\[-\s]*\d)|code)|box\[-\s]*\d)Chinese Simplified: PO Box (?i)\b((邮政信箱) \[0-9]*)\bChinese Traditional: PO Box (?i)\b((郵政信箱) \[0-9]*)\b
- `mailingAddress` (Address, optional)
- `phones` (list of PhoneInfo, optional)
- `email` (string, optional)
- `identification` (Identification, optional) — 关联人员的身份识别信息。
- `employmentType` (string, optional)
- `employmentDetails` (EmploymentDetails, optional)
- `employeeTitle` (string, optional)
- `taxResidencies` (list of TaxResidency, optional)
- `w9` (FormW9, optional)
- `w8Ben` (FormW8BEN, optional)
- `crs` (FormCRS, optional)
- `prohibitedCountryQuestionnaire` (ProhibitedCountryQuestionnaireList, optional)
- `id` (string, optional)
- `externalId` (string, optional)
- `userId` (string, optional)
- `sameMailAddress` (boolean, optional)
- `authorizedToSignOnBehalfOfOwner` (boolean, optional)
- `authorizedTrader` (boolean, optional)
- `usTaxResident` (boolean, optional)
- `translated` (boolean, optional)
- `primaryTrustee` (boolean, optional)
- `dateOfDeath` (date, optional)
- `title` (Title, optional)
- `inheritorType` (enum, optional)
  - Allowed values: `S`, `I`, `T`, `O`
- `relationship` (enum, optional)
  - Allowed values: `Other`, `Trust`, `Spouse`, `Individual`

### IRABeneficiariesType

- `primaryBeneficiaries` (list of IRAPrimaryBeneficiary, optional)
- `primaryBeneficiaryEntities` (list of IRAPrimaryBeneficiaryEntity, optional)
- `contingentBeneficiaries` (list of IRAContingentBeneficiary, optional)
- `contingentBeneficiaryEntities` (list of IRAContingentBeneficiaryEntity, optional)
- `spousePrimaryBeneficary` (boolean, optional)
- `successor` (boolean, optional)

### ExtPositionsTransferType

- `partialStockPositions` (list of PartialStockPosition, optional)
- `partialBondPositions` (list of PartialBondPosition, optional)
- `partialOptionPositions` (list of PartialOptionPosition, optional)
- `partialWarrantPositions` (list of PartialWarrantPosition, optional)
- `partialFundPositions` (list of PartialFundPosition, optional)
- `partialCashPositions` (list of PartialCashPosition, optional)
- `type` (enum, optional)
  - Allowed values: `FULL`, `PARTIAL`
- `subType` (enum, optional)
  - Allowed values: `ACATS`, `ATON`
- `brokerId` (string, optional)
- `brokerName` (string, optional)
- `accountAtBroker` (string, optional)
- `srcIRAType` (enum, optional)
  - Allowed values: `RI`, `RO`, `RT`, `SP`, `ED`, `TH`, `RH`, `SH`, `RRSP`, `SRRSP`, `TFSA`, `SIMPLE`, `ISA`, `JISA`
- `marginLoan` (boolean, optional)
- `shortPos` (boolean, optional)
- `optionPos` (boolean, optional)
- `ibAccount` (string, optional)
- `thirdPartyType` (string, optional)
- `approximateAccountValue` (long, optional)
- `ssn` (string, optional)
- `ein` (string, optional)
- `signature` (string, optional)
- `authorizeToRemoveFund` (boolean, optional)

### DepositNotification

- `checkDetails` (CheckDetails, optional)
- `wireDetails` (WireDetails, optional)
- `achDetails` (ACHDetails, optional)
- `iraDepositDetails` (IRADepositDetails, optional)
- `type` (enum, optional)
  - Allowed values: `CHECK`, `WIRE`, `ACH`, `SKIP_DEPOSIT`
- `amount` (double, optional)
- `currency` (enum, optional)
  - Allowed values: `USD`, `EUR`, `GBP`, `CAD`, `JPY`, `HKD`, `AUD`, `CHF`, `MXN`, `SEK`, `NZD`, `HUF`, `CZK`, `CNH`, `DKK`, `RUB`, `ILS`, `NOK`, `SGD`, `PLN`, `ZAR`, `AED`, `KRW`, `SAR`, `TRY`, `RON`, `BGN`
- `ibAccount` (string, optional)

### CustodianType

- `individual` (Individual, optional)
- `legalEntity` (LegalEntity, optional)
- `employee` (Individual, optional)

### AccountRep

- `repDetails` (list of RepDetail, optional)
- `included` (boolean, optional)

### UserPrivilege

- `externalAccountId` (string, optional)
- `privilege` (enum, optional)
  - Allowed values: `OWNER`, `TRADER`, `CUSTOM`, `NONE`

### Answer

- `answerDetail` (list of AnswerDetail, optional)
- `detail` (string, optional)
- `id` (long, optional)
- `questionId` (long, optional)

### LegalEntityIdentification

- `placeOfBusinessAddress` (Address, optional)
- `mailingAddress` (Address, optional)
- `identification` (string, optional)
- `identificationCountry` (string, optional)
- `formationCountry` (string, optional)
- `formationType` (enum, optional)
  - Allowed values: `PUBLIC`, `PRIVATE`, `OTHER`
- `exchangeCode` (string, optional)
- `exchangeSymbol` (string, optional)
- `sameMailAddress` (boolean, optional)

### OrganizationIdentification

- `placeOfBusinessAddress` (Address, optional)
- `mailingAddress` (Address, optional)
- `phones` (list of PhoneInfo, optional)
- `name` (string, optional)
- `businessDescription` (string, optional)
- `websiteAddress` (string, optional)
- `identification` (string, optional)
- `identificationCountry` (string, optional)
- `formationCountry` (string, optional)
- `formationState` (string, optional)
- `sameMailAddress` (boolean, optional)
- `translated` (boolean, optional)

### RegulatoryInformation

- `regulatoryDetails` (list of RegulatoryDetail, optional)
- `regulatoryDetail` (list of RegulatoryDetail, optional)
- `selfRegulatedMembership` (SelfRegulatedMembershipType, optional)
- `affiliationDetails` (AffiliationDetailsType, optional)
- `financialOrgTypes` (list of string, optional)
- `orgRegulatoryInfo` (ORGRegulatoryInfoType, optional)
- `ausExposureDetails` (AUSExposureDetailsType, optional)
- `controllerExchangeCode` (string, optional)
- `politicalMilitaryDiplomaticDetails` (PoliticalMilitaryDiplomaticDetailsType, optional)
- `translated` (boolean, optional)

### AssociatedEntities

- `associatedIndividuals` (list of AssociatedIndividual, optional)
- `associatedEntities` (list of AssociatedEntity, optional)

### TrustIdentification

- `address` (Address, optional)
- `mailingAddress` (Address, optional)
- `phones` (list of PhoneInfo, optional)
- `name` (string, optional)
- `description` (string, optional)
- `typeOfTrust` (enum, optional)
  - Allowed values: `IRREVOC`, `SMSF`, `REVOCABLE`, `TESTAMENTARY`, `RETIREMENT`, `ERISA`, `OTHER`
- `purposeOfTrust` (string, optional)
- `dateFormed` (date, optional)
- `formationCountry` (string, optional)
- `formationState` (string, optional)
- `registrationNumber` (string, optional)
- `registrationType` (enum, optional)
  - Allowed values: `SSN`, `EIN`, `NonUS_NationalId`
- `registrationCountry` (string, optional)
- `sameMailAddress` (boolean, optional)
- `translated` (boolean, optional)

### AccountSupportType

- `businessDescription` (string, optional)
- `primaryContributor` (PrimaryContributorType, optional)
- `administrator` (AdministratorType, optional)
- `administratorContactPerson` (AdministratorContactPersonType, optional)
- `ownersResideUS` (boolean, optional)
- `solicitOwnersResideUS` (boolean, optional)
- `acceptOwnersResideUS` (boolean, optional)
- `type` (enum, optional)
  - Allowed values: `FINANCIALINSTITUTION`, `PROPRIETARYTRADING`, `FAMILYINVVEHICLE`, `OPERATINGBUSINESS`, `BROKERDEALER`, `LICENSEDADVISOR`

### AccreditedInvestorInformation

- `q1` (boolean, optional)
- `q2` (boolean, optional)
- `q3` (boolean, optional)
- `q4` (boolean, optional)
- `q5` (boolean, optional)

### ManagingOwner

- `externalId` (string, optional)
- `is25PercentOwner` (boolean, optional)

### RegulatedMembership

- `organizationCode` (string, optional)
- `membershipId` (string, optional)

### FormW8IMY

- `name` (string, optional)
- `countryOfIncorporation` (string, optional)
- `disregardedEntityName` (string, optional)
- `entityType` (enum, optional)
  - Allowed values: `QUALIFIED_INTERMEDIARY`, `NONQUALIFIED_INTERMEDIARY`, `TERRITORY_FINANCIAL`, `US_BRANCH`, `WITHHOLDING_FOREIGN_PARTNERSHIP`, `WITHHOLDING_FOREIGN_TRUST`, `NONWITHHOLDING_FOREIGN_PARTNERSHIP`, `NONWITHHOLDING_FOREIGN_SIMPLE_TRUST`, `NONWITHHOLDING_FOREIGN_GRANTOR_TRUST`
- `fatcaStatus` (enum, optional)
  - Allowed values: `NONPARTICIPATING_FFI`, `PARTICIPATING_FFI`, `REPORTING_MODEL1_FFI`, `REPORTING_MODEL2_FFI`, `REGISTERED_DEEMED_COMPLAINT`, `TERRITORY_FINANCIAL_INSTITUTION`, `SPONSORED_FFI`, `CERTIFIED_DEEMED_COMPLAINT_FFI`, `CERTIFIED_DEEMED_COMPLAINT_SPONSORED`, `CERTIFIED_DEEMED_COMPLAINT_LIMITED_LIFE_DEBT`, `OWNER_DOCUMENTED_FFI`, `RESTRICTED_DISTRIBUTOR`, `FOREIGN_CENTRAL_BANK_ISSUE`, `NONREPORTING_IGA_FFO`, `EXEMPT_RETIREMENT_PLAN`, `EXCEPTED_NONFINANCIAL_GROUP_ENTITY`, `EXCEPTED_NONFINANCIAL_STARTUP_COMPANY`, `EXCEPTED_NONFINANCIAL_ENTITY_IN_LIQUIDATION`, `PUBLICLY_TRADED_NFFE`, `EXCEPTED_TERRITORY_NFFE`, `ACTIVE_NFFE`, `PASSIVE_NFFE`, `DIRECT_REPORTING_NFFE`, `SPONSORED_DIRECT_REPORTING_NFFE`
- `usTin` (string, optional)
- `usTinType` (enum, optional)
  - Allowed values: `QI-EIN`, `WP-EIN`, `WT-EIN`, `EIN`, `SSN`, `ITIN`
- `giin` (string, optional)
- `referenceNumber` (long, optional)
- `box11Status` (enum, optional)
  - Allowed values: `LIMITED_BRANCH`, `US_BRANCH`, `PARTICIPATING_FFI`, `REPORTING_MODEL_1_FFI`, `REPORTING_MODEL_2_FFI`
- `part314A` (boolean, optional)
- `part314B` (boolean, optional)
- `part314C` (boolean, optional)
- `part314CDesc` (string, optional)
- `part314D` (boolean, optional)
- `part314DDesc` (string, optional)
- `part314E` (boolean, optional)
- `part314EDesc` (string, optional)
- `part314EI` (boolean, optional)
- `part314EIi` (boolean, optional)
- `part415A` (boolean, optional)
- `part415B` (boolean, optional)
- `part415C` (boolean, optional)
- `part415D` (boolean, optional)
- `part516A` (boolean, optional)
- `part516B` (boolean, optional)
- `part516C` (boolean, optional)
- `part617A` (boolean, optional)
- `part617B` (boolean, optional)
- `part617C` (boolean, optional)
- `part718` (boolean, optional)
- `part819` (boolean, optional)
- `part920` (boolean, optional)
- `part1021` (string, optional)
- `part1021A` (string, optional)
- `part1021B` (boolean, optional)
- `part1021C` (boolean, optional)
- `part1122A` (boolean, optional)
- `part1122B` (boolean, optional)
- `part1122C` (boolean, optional)
- `part1223` (boolean, optional)
- `part1324` (boolean, optional)
- `part1425A` (string, optional)
- `part1425B` (boolean, optional)
- `part1526` (boolean, optional)
- `part1627A` (boolean, optional)
- `part1627B` (boolean, optional)
- `part1627C` (boolean, optional)
- `part1728` (boolean, optional)
- `part1829` (boolean, optional)
- `part1829Desc1` (string, optional)
- `part1829Desc2` (string, optional)
- `part1829Desc3` (string, optional)
- `part1930A` (boolean, optional)
- `part1930B` (boolean, optional)
- `part1930C` (boolean, optional)
- `part1930D` (boolean, optional)
- `part1930E` (boolean, optional)
- `part1930F` (boolean, optional)
- `part2031` (boolean, optional)
- `part2132` (boolean, optional)
- `part2132Desc` (string, optional)
- `part2233` (boolean, optional)
- `part2233Desc` (string, optional)
- `part2334A` (boolean, optional)
- `part2334ADesc` (string, optional)
- `part2334B` (boolean, optional)
- `part2334BDesc` (string, optional)
- `part2435` (boolean, optional)
- `part2536` (boolean, optional)
- `part2637` (boolean, optional)
- `part2738` (string, optional)
- `part2739` (boolean, optional)
- `cert` (boolean, optional)

### WithholdingStatementType

- `accountId` (string, optional)
- `fatcaCompliantType` (enum, optional)
  - Allowed values: `FATCA_COMPLIANT`, `NON_CONSENTING_US_ACCOUNT`, `NON_COOPERATIVE_ACCOUNT`
- `usBackupWithholding` (boolean, optional)
- `treatyCountry` (string, optional)
- `corporation` (boolean, optional)
- `flowThrough` (boolean, optional)
- `effectiveDate` (date, optional)
- `dividendRate` (float, optional)
- `interestRate` (float, optional)
- `usOtherRate` (float, optional)
- `eciRate` (float, optional)

### IndividualTaxInformation

- `w9` (FormW9, optional)
- `w8Ben` (FormW8BEN, optional)
- `crs` (FormCRS, optional)
- `w8BenE` (FormW8BENE, optional)

### TrusteesType

- `individuals` (list of TrusteeIndividual, optional)
- `entities` (list of TrusteeEntityType, optional)

### AssociationTypeEntities

- `individual` (list of AssociatedIndividual, optional)
- `legalEntity` (list of LegalEntity, optional)

### OrderValueLimits

- `maxOrderValue` (double, optional)
- `maxGrossValue` (double, optional)
- `maxNetValue` (double, optional)
- `netContractLimit` (double, optional)

### EFPQuantityLimits

- `maxNominalEfpPerOrder` (long, optional)
- `maxNetEfpTrades` (long, optional)
- `maxGrossEfpTrades` (long, optional)

### OrderQuantityLimit

- `asset` (enum, optional)
  - Allowed values: `BILL`, `BOND`, `CASH`, `CFD`, `COMB`, `FOP`, `FUND`, `FUT`, `OPT`, `SSF`, `STK`, `WAR`, `MRGN`, `CLP`
- `quantity` (long, optional)

### DayQuantityLimit

- `asset` (enum, optional)
  - Allowed values: `BILL`, `BOND`, `CASH`, `CFD`, `COMB`, `FOP`, `FUND`, `FUT`, `OPT`, `SSF`, `STK`, `WAR`, `MRGN`, `CLP`
- `quantity` (long, optional)

### AutomatedWrapFeeDetailsType

- `perTradeMarkups` (CommissionScheduleType, optional)
- `annualBlendedPercentages` (list of AnnualBlendedPercentage, optional)
- `navRanges` (list of NAVRangeType, optional)
- `type` (enum, optional)
  - Allowed values: `ANNUALFLATFEE`, `ANNUALFLATFEE_MONTHLY`, `ANNUALFLATFEE_QUATERLY`, `PERCENTOFEQUITY`, `PERCENTOFEQUITY_MONTHLY`, `PERCENTOFEQUITY_EOM`, `PERCENTOFEQUITY_QUATERLY`, `PERCENTOFEQUITY_QUARTERLY`, `PERCENTOFEQUITY_EOQ`, `BLENDEDPERCENTOFEQUITY`, `BLENDEDPERCENTOFEQUITY_MONTHLY`, `BLENDEDPERCENTOFEQUITY_EOM`, `BLENDEDPERCENTOFEQUITY_QUARTERLY`, `BLENDEDPERCENTOFEQUITY_EOQ`, `INVOICE_LIMIT`, `INVOICE_LIMIT_Q`, `PERCENTOFPROFIT`, `PERCENTOFPROFIT_QUARTER`, `PERTRADE`, `PERCENTOFNLV_CAP`, `PERCENTOFNLV_CAP_EOPEQTY`, `PERCENTOFNLV_CAP_Q`, `PERCENTOFNLV_CAP_EOPEQTY_Q`
- `maxFee` (double, optional)
- `numContracts` (long, optional)
- `postFrequency` (string, optional)
- `percentOfNLVCap` (string, optional)
- `percentOfNLVCapQ` (string, optional)

### HighWaterMarkType

- `hwm` (HighWaterMarkConfigurationType, optional)
- `previousLosses` (list of PreviousLossesType, optional)

### CommissionMarkupType

- `stairs` (list of MarkupStaircaseType, optional)
- `code` (string, optional)
- `minimum` (double, optional)
- `maximum` (double, optional)
- `type` (enum, optional)
  - Allowed values: `FA`, `FM`, `PM`
- `amount` (double, optional)
- `plusCost` (boolean, optional)
- `ticketCharge` (double, optional)

### IRAPrimaryBeneficiary

- `name` (IndividualName, optional)
- `nativeName` (IndividualName, optional)
- `birthName` (IndividualName, optional)
- `motherMaidenName` (IndividualName, optional)
- `dateOfBirth` (string, optional) — 申请人的出生日期。申请人必须年满 18 岁才能开立账户。如果 YYY-MM-DD \< 18 岁，将触发错误且账户不会被创建。如果 YYYY-MM-DD \< 21，申请人仅限开立 CASH 账户。UGMA 和 UTMA 账户适用于 18 岁或以下的未成年人。在未成年人达到特定年龄之前为其管理账户的个人或实体。仅限美国居民。此申请必须使用 IBKR Portal 内提供的前端应用程序开立。由单一托管人（Custodian）用户管理的单一账户中持有的资产。如果 dateOfBirth 为 YYYY-MM-DD 以外的任何值，将抛出错误。
- `countryOfBirth` (string, optional)
- `cityOfBirth` (string, optional)
- `gender` (enum, optional)
  - Allowed values: `M`, `F`, `Male`, `Female`
- `maritalStatus` (enum, optional)
  - Allowed values: `S`, `M`, `W`, `D`, `C`
- `numDependents` (long, optional)
- `residenceAddress` (ResidenceAddress, optional) — 提供申请人实际居住的居住地址。如果邮寄地址与 Residence 元素中提供的地址不同，那么您还需要包含 MailingAddress 元素。居住地址不接受邮政信箱（Post Office Box）。我们的系统会验证 Residence 属性中包含的 street\_1 和 street\_2，以确保未提供邮政信箱地址。如果 street\_1 或 street\_2 中包含以下任何组合，将抛出错误：PBPO BoxPost Office BoxP.O. BoxIn care ofGeneral Delivery用于验证 street\_1 和 street\_2 的正则表达式：English: (?:P(?:ost(?:al)?)?\[.-\s]*(?:(?:O(?:ffice)?\[.\s]*)?B(?:ox|in|\b|\d)|o(?:ffice|\b)(?:\[-\s]*\d)|code)|box\[-\s]*\d)Chinese Simplified: PO Box (?i)\b((邮政信箱) \[0-9]*)\bChinese Traditional: PO Box (?i)\b((郵政信箱) \[0-9]*)\b
- `mailingAddress` (Address, optional)
- `phones` (list of PhoneInfo, optional)
- `email` (string, optional)
- `identification` (Identification, optional) — 关联人员的身份识别信息。
- `employmentType` (string, optional)
- `employmentDetails` (EmploymentDetails, optional)
- `employeeTitle` (string, optional)
- `taxResidencies` (list of TaxResidency, optional)
- `w9` (FormW9, optional)
- `w8Ben` (FormW8BEN, optional)
- `crs` (FormCRS, optional)
- `prohibitedCountryQuestionnaire` (ProhibitedCountryQuestionnaireList, optional)
- `id` (string, optional)
- `externalId` (string, optional)
- `userId` (string, optional)
- `sameMailAddress` (boolean, optional)
- `authorizedToSignOnBehalfOfOwner` (boolean, optional)
- `authorizedTrader` (boolean, optional)
- `usTaxResident` (boolean, optional)
- `translated` (boolean, optional)
- `primaryTrustee` (boolean, optional)
- `ownershipPercentage` (double, optional)
- `title` (Title, optional)
- `relationship` (enum, optional)
  - Allowed values: `Brother`, `Daughter`, `Estate`, `Father`, `Husband`, `Mother`, `Other`, `Sister`, `Son`, `Wife`, `Charity`, `Trust`, `Spouse`, `Child`, `Sibling`, `Parent`, `Grandchild`, `Common Law Partner`

### IRAPrimaryBeneficiaryEntity

- `name` (string, optional)
- `address` (Address, optional)
- `id` (string, optional)
- `externalId` (string, optional)
- `ownershipPercentage` (double, optional)
- `title` (Title, optional)
- `relationship` (enum, optional)
  - Allowed values: `Brother`, `Daughter`, `Estate`, `Father`, `Husband`, `Mother`, `Other`, `Sister`, `Son`, `Wife`, `Charity`, `Trust`, `Spouse`, `Child`, `Sibling`, `Parent`, `Grandchild`, `Common Law Partner`
- `executor` (Individual, optional)
- `executionDate` (date, optional)
- `articleOfWill` (string, optional)
- `entityType` (enum, optional)
  - Allowed values: `Trust`, `Estate`, `Charity`
- `charityNumber` (string, optional)

### IRAContingentBeneficiary

- `name` (IndividualName, optional)
- `nativeName` (IndividualName, optional)
- `birthName` (IndividualName, optional)
- `motherMaidenName` (IndividualName, optional)
- `dateOfBirth` (string, optional) — 申请人的出生日期。申请人必须年满 18 岁才能开立账户。如果 YYY-MM-DD \< 18 岁，将触发错误且账户不会被创建。如果 YYYY-MM-DD \< 21，申请人仅限开立 CASH 账户。UGMA 和 UTMA 账户适用于 18 岁或以下的未成年人。在未成年人达到特定年龄之前为其管理账户的个人或实体。仅限美国居民。此申请必须使用 IBKR Portal 内提供的前端应用程序开立。由单一托管人（Custodian）用户管理的单一账户中持有的资产。如果 dateOfBirth 为 YYYY-MM-DD 以外的任何值，将抛出错误。
- `countryOfBirth` (string, optional)
- `cityOfBirth` (string, optional)
- `gender` (enum, optional)
  - Allowed values: `M`, `F`, `Male`, `Female`
- `maritalStatus` (enum, optional)
  - Allowed values: `S`, `M`, `W`, `D`, `C`
- `numDependents` (long, optional)
- `residenceAddress` (ResidenceAddress, optional) — 提供申请人实际居住的居住地址。如果邮寄地址与 Residence 元素中提供的地址不同，那么您还需要包含 MailingAddress 元素。居住地址不接受邮政信箱（Post Office Box）。我们的系统会验证 Residence 属性中包含的 street\_1 和 street\_2，以确保未提供邮政信箱地址。如果 street\_1 或 street\_2 中包含以下任何组合，将抛出错误：PBPO BoxPost Office BoxP.O. BoxIn care ofGeneral Delivery用于验证 street\_1 和 street\_2 的正则表达式：English: (?:P(?:ost(?:al)?)?\[.-\s]*(?:(?:O(?:ffice)?\[.\s]*)?B(?:ox|in|\b|\d)|o(?:ffice|\b)(?:\[-\s]*\d)|code)|box\[-\s]*\d)Chinese Simplified: PO Box (?i)\b((邮政信箱) \[0-9]*)\bChinese Traditional: PO Box (?i)\b((郵政信箱) \[0-9]*)\b
- `mailingAddress` (Address, optional)
- `phones` (list of PhoneInfo, optional)
- `email` (string, optional)
- `identification` (Identification, optional) — 关联人员的身份识别信息。
- `employmentType` (string, optional)
- `employmentDetails` (EmploymentDetails, optional)
- `employeeTitle` (string, optional)
- `taxResidencies` (list of TaxResidency, optional)
- `w9` (FormW9, optional)
- `w8Ben` (FormW8BEN, optional)
- `crs` (FormCRS, optional)
- `prohibitedCountryQuestionnaire` (ProhibitedCountryQuestionnaireList, optional)
- `id` (string, optional)
- `externalId` (string, optional)
- `userId` (string, optional)
- `sameMailAddress` (boolean, optional)
- `authorizedToSignOnBehalfOfOwner` (boolean, optional)
- `authorizedTrader` (boolean, optional)
- `usTaxResident` (boolean, optional)
- `translated` (boolean, optional)
- `primaryTrustee` (boolean, optional)
- `ownershipPercentage` (double, optional)
- `title` (Title, optional)
- `relationship` (enum, optional)
  - Allowed values: `Brother`, `Daughter`, `Estate`, `Father`, `Husband`, `Mother`, `Other`, `Sister`, `Son`, `Wife`, `Charity`, `Trust`, `Spouse`, `Child`, `Sibling`, `Parent`, `Grandchild`, `Common Law Partner`

### IRAContingentBeneficiaryEntity

- `name` (string, optional)
- `address` (Address, optional)
- `id` (string, optional)
- `externalId` (string, optional)
- `ownershipPercentage` (double, optional)
- `title` (Title, optional)
- `relationship` (enum, optional)
  - Allowed values: `Brother`, `Daughter`, `Estate`, `Father`, `Husband`, `Mother`, `Other`, `Sister`, `Son`, `Wife`, `Charity`, `Trust`, `Spouse`, `Child`, `Sibling`, `Parent`, `Grandchild`, `Common Law Partner`
- `executor` (Individual, optional)
- `executionDate` (date, optional)
- `articleOfWill` (string, optional)
- `entityType` (enum, optional)
  - Allowed values: `Trust`, `Estate`, `Charity`

### PartialStockPosition

- `symbol` (string, optional)
- `numberOfShares` (long, optional)
- `all` (boolean, optional)
- `position` (enum, optional)
  - Allowed values: `LONG`, `SHORT`
- `exchange` (string, optional)

### PartialBondPosition

- `cusipNumber` (string, optional)
- `numberOfBonds` (long, optional)
- `all` (boolean, optional)

### PartialOptionPosition

- `symbol` (string, optional)
- `numberOfContracts` (long, optional)
- `all` (boolean, optional)
- `position` (enum, optional)
  - Allowed values: `LONG`, `SHORT`
- `optionType` (enum, optional)
  - Allowed values: `CALL`, `PUT`
- `strikePrice` (long, optional)
- `expirationDate` (string, optional)

### PartialWarrantPosition

- `symbol` (string, optional)
- `numberOfShares` (long, optional)
- `all` (boolean, optional)
- `position` (enum, optional)
  - Allowed values: `LONG`, `SHORT`
- `optionType` (enum, optional)
  - Allowed values: `CALL`, `PUT`
- `strikePrice` (long, optional)
- `expirationDate` (string, optional)

### PartialFundPosition

- `symbol` (string, optional)
- `numberOfShares` (long, optional)
- `all` (boolean, optional)

### PartialCashPosition

- `amount` (float, optional)
- `marginLoan` (boolean, optional)
- `fullCash` (boolean, optional)

### CheckDetails

- `checkNumber` (string, optional)
- `routingNumber` (string, optional)
- `accountNumber` (string, optional)

### WireDetails

- `bankName` (string, optional)
- `bankAccountNumber` (string, optional)
- `bankCode` (string, optional)
- `routingNumber` (string, optional)
- `instruction` (string, optional)
- `countryCode` (string, optional)
- `referenceNumber` (string, optional)

### ACHDetails

- `custInitAch` (boolean, optional)
- `bankName` (string, optional)

### IRADepositDetails

- `depositType` (enum, optional)
  - Allowed values: `contribution`, `rollover`
- `taxYear` (enum, optional)
  - Allowed values: `current`, `prior`
- `fromIraType` (enum, optional)
  - Allowed values: `RI`, `RO`, `RT`, `SP`, `ED`, `TH`, `RH`, `SH`, `RRSP`, `SRRSP`, `TFSA`, `SIMPLE`, `ISA`, `JISA`

### RepDetail

- `repId` (string, optional)
- `percentage` (long, optional)

### AnswerDetail

- `name` (string, optional)
- `detail` (string, optional)

### RegulatoryDetail

- `code` (enum, optional)
  - Allowed values: `CRIMINAL`, `AFFILIATION`, `CFTCREGISTERED`, `IBACCOUNTS`, `REGULATORYCONTROL`, `EmployeePubTrade`, `ControlPubTraded`, `BROKERDEALER`, `EXCHANGEMEMBERSHIP`, `STOCKCONTROL`, `DISPUTE`, `INVESTIGATION`, `MEMBERSHIP`, `AUSEXPOSURE`, `CONTROLLER`, `POLITICALMILITARYDIPLOMATIC`, `FOREIGN_BANK`, `BROKER_DEALER`, `FUTURES_COMMISSION_MERCHANT`, `MUTUAL_FUND`, `FOREIGN_EXCHANGE`, `MONEY_TRANSMITTER`, `EMPLOYEE_BENEFIT_PLAN`, `US_BANK`, `US_SWAP_DEALER`, `US_SWAP_PARTICIPANT`, `US_INSURANCE_COMPANY`, `NON_US_INSURANCE_COMPANY`, `US_DEPT`, `FINANCIAL_ADVISOR`, `HIGH_RISK_CONTRIBUTION`
- `status` (boolean, optional)
- `details` (string, optional)
- `detail` (string, optional)
- `externalIndividualId` (string, optional)

### SelfRegulatedMembershipType

- `exchanges` (string, optional)
- `organizations` (string, optional)

### AffiliationDetailsType

- `affiliationRelationship` (enum, optional)
  - Allowed values: `Self`, `Spouse`, `Parent`, `Child`, `Other`
- `personName` (string, optional)
- `companyId` (long, optional)
- `company` (string, optional)
- `companyMailingAddress` (Address, optional)
- `companyPhone` (string, optional)
- `companyEmailAddress` (string, optional)
- `duplicateStmtRequired` (boolean, optional)

### ORGRegulatoryInfoType

- `publicCompanyInfo` (PublicCompanyInfoType, optional)
- `orgRegulators` (list of ORGRegulatorType, optional)
- `regulated` (boolean, optional)
- `public` (boolean, optional)

### AUSExposureDetailsType

- `ausExposureRelationship` (string, optional)
- `personName` (string, optional)
- `licenseNumber` (long, optional)

### PoliticalMilitaryDiplomaticDetailsType

- `personName` (string, optional)
- `title` (string, optional)
- `organization` (string, optional)
- `country` (string, optional)

### AssociatedEntity

- `entityId` (long, optional)
- `externalCode` (string, optional)
- `name` (string, optional)
- `email` (string, optional)
- `organizationCountry` (string, optional)
- `phones` (map from string to string, optional)
- `residence` (map from string to string, optional)
- `mailing` (map from string to string, optional)
- `associations` (list of string, optional)
- `identityDocuments` (list of map from string to string, optional)
- `taxTreatyDetails` (list of map from string to string, optional)
- `AssociatedPersons` (list of AssociatedPerson, optional)

### PrimaryContributorType

- `firstName` (string, optional)
- `middleInitial` (string, optional)
- `lastName` (string, optional)
- `suffix` (enum, optional)
  - Allowed values: `Jr.`, `Sr.`, `I`, `II`, `III`, `IV`, `V`
- `employer` (string, optional)
- `occupation` (string, optional)
- `address` (Address, optional)
- `sourceOfFunds` (string, optional)

### AdministratorType

- `firstName` (string, optional)
- `middleInitial` (string, optional)
- `lastName` (string, optional)
- `suffix` (enum, optional)
  - Allowed values: `Jr.`, `Sr.`, `I`, `II`, `III`, `IV`, `V`
- `address` (Address, optional)

### AdministratorContactPersonType

- `firstName` (string, optional)
- `middleInitial` (string, optional)
- `lastName` (string, optional)
- `suffix` (enum, optional)
  - Allowed values: `Jr.`, `Sr.`, `I`, `II`, `III`, `IV`, `V`
- `phoneNumber` (string, optional)

### TrusteeIndividual

- `name` (IndividualName, optional)
- `nativeName` (IndividualName, optional)
- `birthName` (IndividualName, optional)
- `motherMaidenName` (IndividualName, optional)
- `dateOfBirth` (string, optional) — 申请人的出生日期。申请人必须年满 18 岁才能开立账户。如果 YYY-MM-DD \< 18 岁，将触发错误且账户不会被创建。如果 YYYY-MM-DD \< 21，申请人仅限开立 CASH 账户。UGMA 和 UTMA 账户适用于 18 岁或以下的未成年人。在未成年人达到特定年龄之前为其管理账户的个人或实体。仅限美国居民。此申请必须使用 IBKR Portal 内提供的前端应用程序开立。由单一托管人（Custodian）用户管理的单一账户中持有的资产。如果 dateOfBirth 为 YYYY-MM-DD 以外的任何值，将抛出错误。
- `countryOfBirth` (string, optional)
- `cityOfBirth` (string, optional)
- `gender` (enum, optional)
  - Allowed values: `M`, `F`, `Male`, `Female`
- `maritalStatus` (enum, optional)
  - Allowed values: `S`, `M`, `W`, `D`, `C`
- `numDependents` (long, optional)
- `residenceAddress` (ResidenceAddress, optional) — 提供申请人实际居住的居住地址。如果邮寄地址与 Residence 元素中提供的地址不同，那么您还需要包含 MailingAddress 元素。居住地址不接受邮政信箱（Post Office Box）。我们的系统会验证 Residence 属性中包含的 street\_1 和 street\_2，以确保未提供邮政信箱地址。如果 street\_1 或 street\_2 中包含以下任何组合，将抛出错误：PBPO BoxPost Office BoxP.O. BoxIn care ofGeneral Delivery用于验证 street\_1 和 street\_2 的正则表达式：English: (?:P(?:ost(?:al)?)?\[.-\s]*(?:(?:O(?:ffice)?\[.\s]*)?B(?:ox|in|\b|\d)|o(?:ffice|\b)(?:\[-\s]*\d)|code)|box\[-\s]*\d)Chinese Simplified: PO Box (?i)\b((邮政信箱) \[0-9]*)\bChinese Traditional: PO Box (?i)\b((郵政信箱) \[0-9]*)\b
- `mailingAddress` (Address, optional)
- `phones` (list of PhoneInfo, optional)
- `email` (string, optional)
- `identification` (Identification, optional) — 关联人员的身份识别信息。
- `employmentType` (string, optional)
- `employmentDetails` (EmploymentDetails, optional)
- `employeeTitle` (string, optional)
- `taxResidencies` (list of TaxResidency, optional)
- `w9` (FormW9, optional)
- `w8Ben` (FormW8BEN, optional)
- `crs` (FormCRS, optional)
- `prohibitedCountryQuestionnaire` (ProhibitedCountryQuestionnaireList, optional)
- `id` (string, optional)
- `externalId` (string, optional)
- `userId` (string, optional)
- `sameMailAddress` (boolean, optional)
- `authorizedToSignOnBehalfOfOwner` (boolean, optional)
- `authorizedTrader` (boolean, optional)
- `usTaxResident` (boolean, optional)
- `translated` (boolean, optional)
- `primaryTrustee` (boolean, optional)
- `nfaRegistered` (boolean, optional)
- `nfaRegistrationNumber` (string, optional)

### TrusteeEntityType

- `legalEntity` (LegalEntity, optional)
- `employees` (list of Individual, optional)

### AnnualBlendedPercentage

- `blendedFrom` (string, optional)
- `blendedTo` (string, optional)
- `percentage` (string, optional)

### NAVRangeType

- `min` (double, optional)
- `max` (double, optional)
- `maxFee` (double, optional)

### HighWaterMarkConfigurationType

- `numberOfPeriods` (long, optional)
- `prorateForWithdrawals` (boolean, optional)

### PreviousLossesType

- `loss` (long, optional)
- `quarter` (long, optional)
- `year` (long, optional)
- `currency` (string, optional)

### MarkupStaircaseType

- `amount` (double, optional)
- `break` (double, optional)

### PublicCompanyInfoType

- `exchangeTradedOn` (string, optional)
- `quotedSymbol` (string, optional)

### ORGRegulatorType

- `regulatorName` (string, optional)
- `regulatorCountry` (string, optional)
- `regulatedInCapacity` (string, optional)
- `regulatorId` (string, optional)

### AssociatedPerson

- `entityId` (long, optional)
- `externalCode` (string, optional)
- `firstName` (string, optional)
- `middleName` (string, optional)
- `middleInitial` (string, optional)
- `lastName` (string, optional)
- `suffix` (string, optional)
- `username` (string, optional)
- `passwordDate` (string, optional)
- `userStatus` (string, optional)
- `userStatusTrading` (string, optional)
- `lastLogin` (string, optional)
- `gender` (string, optional)
- `maritalStatus` (string, optional)
- `salutation` (string, optional)
- `ownershipPercentage` (double, optional)
- `email` (string, optional)
- `countryOfCitizenship` (string, optional)
- `countryOfBirth` (string, optional)
- `dateOfBirth` (string, optional)
- `motersMaidenName` (string, optional)
- `numberOfDependents` (long, optional)
- `securityDevice` (string, optional)
- `commercial` (string, optional)
- `countryOfLegalResidence` (string, optional)
- `stateOfLegalResidence` (string, optional)
- `mdSubscriberStatus` (string, optional)
- `phones` (map from string to string, optional)
- `residence` (map from string to string, optional)
- `mailing` (map from string to string, optional)
- `associations` (list of string, optional)
- `identityDocuments` (list of map from string to string, optional)
- `employmentType` (string, optional)
- `employmentDetails` (map from string to AssociatedPersonEmploymentDetails, optional)
- `subscribedServices` (list of map from string to AssociatedPersonSubscribedServicesItems, optional)
- `taxTreatyDetails` (list of map from string to string, optional)

### AssociatedPersonEmploymentDetails

### AssociatedPersonSubscribedServicesItems

## 示例

### 示例 1

**请求**

```json
{}
```

**响应**

```json
{
  "requestId": 1,
  "dateSubmitted": "2024-01-15T09:30:00Z",
  "fileData": {
    "data": {},
    "name": "string"
  }
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/accounts"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.patch(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/accounts';
const options = {
  method: 'PATCH',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/accounts"

	payload := strings.NewReader("{}")

	req, _ := http.NewRequest("PATCH", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/accounts")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.patch("https://localhost:5000/gw/api/v1/accounts")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://localhost:5000/gw/api/v1/accounts', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/accounts");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/accounts")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```

### 示例 2

**请求**

```json
{}
```

**响应**

```json
{
  "requestId": 1,
  "executedAt": "2024-01-15T09:30:00Z"
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/accounts"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.patch(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/accounts';
const options = {
  method: 'PATCH',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/accounts"

	payload := strings.NewReader("{}")

	req, _ := http.NewRequest("PATCH", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/accounts")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Patch.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.patch("https://localhost:5000/gw/api/v1/accounts")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('PATCH', 'https://localhost:5000/gw/api/v1/accounts', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/accounts");
var request = new RestRequest(Method.PATCH);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/accounts")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PATCH"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```