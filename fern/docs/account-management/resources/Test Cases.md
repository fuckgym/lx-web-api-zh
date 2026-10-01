# 测试用例

## 客户注册 – 回归测试用例

* 常规
  * meetAmlStandard 被设置为 false
  * mdStatusNonPro 被设置为 false
  * prefix 被设置为 teste
  * 提供了无效的 baseCurrency(例如 USDD)
  * externalId 已被处理过
* name
  * 姓名包含特殊字符、数字或空格
  * 姓氏(last name)仅提供了一个字母
  * 名字(first name)为 null
* dateOfBirth
  * 申请人未满 18 岁
* countryOfBirth
  * 出生国家为受禁国家(例如 AFG)
  * 出生国家为美国(例如 USA)
* residenceAddress
  * 居住国为受禁国家(例如 AFG)
  * 居住国为美国(例如 USA)
  * 居住国与税收居住国以及 W8Ben 的 part29aCountry 不同
  * 州(state)提供了完整州名而非 ISO 代码
  * street1 超过 200 个字符
  * 邮政编码为 null
* email
  * 电子邮箱地址为 null
  * 电子邮箱地址与主账户相同
  * 提供了无效的电子邮箱(例如 tester\@gmail)
* identification
  * 公民身份所属国家为受禁国家(例如 AFG)
  * 公民身份所属国家为美国(例如 USA)
  * 提供了无效的证件类型(ID Type)
  * expire 设置为 true 且缺少 expirationDate
  * expirationDate 为过去的日期
  * 缺少证件类型和证件文件
  * 提供了 SSN 且 issuingCountry **不是**美国
* employmentType 和 employmentDetails
  * employmentType 为 null
  * employmentType 为 EMPLOYED 且
    * 缺少 employmentDetails
    * occupation 和/或 employerBusiness 为 null
    * occupation 和/或 employerBusiness = 'Other'
    * 缺少 employerAddress
    * 州(state)提供了完整州名而非 ISO 代码
    * street1 超过 200 个字符
    * 邮政编码为 null
    * 工作国家与居住国家不同
    * occupation/employerBusiness 不是 IBKR 的枚举值
* taxResidencies
  * 税收居住国与 part29ACountry 不同
  * TIN 与 w8Ben.foreignTaxId 不同
  * 同时提供了 TIN 和 w8Ben.explanation
  * TINType 提供为 SSN 且国家**不是**美国
* w8Ben
  * blankForm 被设置为 FALSE **且** sha1Checksum 对应的是空白表格的 sha1Checksum。
  * part29ACountry 为 N/A 且缺少 explanation
  * part29ACountry 为 null
  * name 与 name.first + name.middle + name.Last **不同**
* financialInformation
  * liquidNetWorth 大于 netWorth
  * netWorth、liquidNetWorth、annualNetIncome 介于 101 至 999 之间
  * netWorth、liquidNetWorth、annualNetIncome 为负值
  * netWorth、liquidNetWorth、annualNetIncome 为 null
* regulatoryDetail
  * status 被设置为 true 且缺少 details
  * 缺少 ControlPubTraded 和/或 EmployeePubTrade
* documents
  * signedBy 与 name.first + name.middleInitial + name.last **不匹配**
  * 缺少 signedBy
  * sha1checksum 与所提供表格的 sha1checksum 不匹配
  * formNumber 为 8001 且缺少 proofOfIdentityType
