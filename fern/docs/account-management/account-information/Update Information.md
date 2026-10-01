# 更新信息

**`[PATCH]`**[`/api/v1/accounts/`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/update-accounts) 可用于管理用户级别和账户级别的设置。

* 在用户级别应用的更改将应用于与该用户关联的所有账户。
* 仅支持对已开户的账户进行更新。
* 或者,也可以在 [IBKR Portal](https://www.ibkrguides.com/clientportal/am_settings.htm) 中发起信息变更。

#### 用户

MIFIR 数据涉及在欧洲经济区(EEA)和英国境内运营的投资公司的交易报告要求。作为使用 IBKR 平台的投资公司的客户,您可能需要提供额外信息,以便正确提交交易报告。

更多信息请参阅此[链接](https://www.ibkrguides.com/kb/mifir-transaction-reporting.htm)

## Schema

| 名称           | 类型                                                                       | 描述                                                                                                                          |
| -------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| accountId      | 字符串                                                                     | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。                                                                                                           |
| title          | ACCOUNT HOLDER FIRST HOLDER SECOND HOLDER                                  | 个人账户类型的 title 始终为 "ACCOUNT HOLDER"。联合账户类型的 title 为以下之一:FIRST HOLDER SECOND HOLDER |
| identification | [Identification](/account-management/schema/associatedindividual) | XML 请求中包含的 `identification` 节点应与开户请求中包含的 `identification` 节点一致。                                                        |

## 示例

```
PATCH /gw/api/v1/accounts


{
    "accountManagementRequests": {
        "addMiFirData": {
            "accountId": "U12345",
            "title": "ACCOUNT HOLDER",
            "identifications": [
                {
                    "citizenship": "Liechtenstein",
                    "passport": "A11111",
                    "alienCard": "AlienCard",
                    "expire": false
                }
            ]
        }
    }
}
```

* 在请求正文中,提供该个人的更新信息。如果 `newAccountHolderDetails` 节点中包含的信息与 IBKR 存档的信息不一致,该信息将被更新。
  * 如果为单个账户提交多个请求,新请求将覆盖现有的待处理请求。
  * 提交更新账户信息的请求时,需要提供 **`id`** 或 `externalId` 其中之一。
* 对于双语(Dual Language)申请,需要同时提供原文(Native)和译文(Translated)两种详细信息。
* `changeAccountHolderDetails` 请求仅支持已开户的个人(Individual)和联合(Joint)账户,或者已分配 9974 的待处理/新申请。如果为待处理/新申请提交请求且未分配 9974,该请求将不被接受。
  * 如果需要更新待处理/新账户的账户信息,则需要提交包含更新信息的新申请。
    * 为避免产生重复账户,请使用 `abandonAccount` 删除包含错误数据的现有申请。
    * 提交新申请时,需要包含一个新的唯一 external ID。若要使用原始 external ID 为现有账户提交新申请,请使用([updateExternalId](https://www.interactivebrokers.com/campus/ibkr-api-page/webapi-ref-staging/#tag/Account-Management-Accounts/paths/~1gw~1api~1v1~1accounts/post))。
    * 更新完成后,您的团队即可使用创建原始账户时所用的原始 external ID 为申请人重新提交申请。
      * 申请重新提交后,将生成新的 IBKR 账户 ID。
        * 对于已被处理过的 externalid,无法重新提交申请,除非该 externalId 已与原账户解除关联(updateExternalId)。

## Schema

| 名称                    | 类型                                                                                                | 描述                                                                                                                                                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountId               | 字符串                                                                                              | 与该个人关联的 IBKR 账户 ID。如果用户拥有多个账户并提供了 `accountId`,则仅会更新该 `accountId` 对应账户的信息。                                                                                                                      |
| referenceUserName       | 字符串                                                                                              | 与该个人关联的用户名。如果用户拥有多个账户且提供了 `referenceUserName`,数据将在所有账户中更新。                                                                                                                     |
| inputLanguage           |                                                                                                     |                                                                                                                                                                                                                                                                           |
| translation             |                                                                                                     |                                                                                                                                                                                                                                                                           |
| id                      | 字符串                                                                                              | **`id`** 是 IBKR 为与账户关联的每个个人分配的唯一 ID。**`id`** 可用作 `externalId` 的替代。可通过调用 `GET /api/v1/accounts/{{accountId}}/details` 获取 **`id`**。                         |
| externalId              | 字符串                                                                                              | 与该个人关联的 `externalId`,与该用户相关联。`externalId` 可从账户创建响应文件的 \<Entities> 部分获取。如果一个账户上有多个个人,每个个人都将拥有唯一的 `externalId`。 |
| newAccountHolderDetails | 对象数组([AssociatedIndividual](/account-management/schema/associatedindividual)) | 在 `newAccountHolderDetails` 节点中提供要更新的申请人数据。                                                                                                                                                                                          |

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "changeAccountHolderDetail": {
            "newAccountHolderDetails": [
                {
                    "id": "172032379",
                    "name": {
                        "salutation": "Ms.",
                        "first": "Jane",
                        "last": "Smith"
                    },
                    "referenceUserName": "joesm123",
                    "inputLanguage": "en",
                    "translation": false
                }
            ]
        }
    }
}
```

* 如果您连续 60 天未登录 IBKR 交易平台,市场数据订阅将被终止。
* 有关市场数据的更多信息,请参见[此处](https://www.ibkrguides.com/brokerportal/usersettings/marketdatasubscriptions.htm)。

## Schema

| 名称              | 类型                                                  | 描述                                                                                                                                                                                                                                                                                                                                        |
| ----------------- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| referenceUserName | 字符串                                                | 与账户关联的用户名。如果您没有与账户关联的 IBKR 用户名,可使用 [/getAccountDetail](https://www.interactivebrokers.com/campus/ibkr-api-page/webapi-ref-staging/#tag/Account-Management-Accounts/paths/~1gw~1api~1v1~1accounts~1%7BaccountId%7D~1details/get) 根据账户 ID 查询用户名。 |
| service           | 使用 `/enumerations/market-data` 获取服务 ID。 | 用户请求订阅的市场数据服务 ID。                                                                                                                                                                                                                                                                                                                     |
| action            | ADD REMOVE                                            | 将 action 设置为 ADD 或 REMOVE,以添加或移除市场数据订阅。                                                                                                                                                                                                                                                                                          |

## 示例

```
PATCH /gw/api/v1/accounts

{
  "accountManagementRequests": {
    "manageMarketDataSubscriptions": {
      "service": [
        460,
        462
      ],
      "referenceUserName": "test12345"
    }
  }
}
```

## Schema

| 名称              | 类型       | 描述                                                                                                                                                                                                                                                                                                                              |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| referenceUserName | 字符串     | 与账户关联的用户名。如果您没有与账户关联的 IBKR 用户名,可使用 [/detail](https://www.interactivebrokers.com/campus/ibkr-api-page/webapi-ref-staging/#tag/Account-Management-Accounts/paths/~1gw~1api~1v1~1accounts~1%7BaccountId%7D~1details/get) 根据账户 ID 查询用户名。 |
| email             | 字符串     | 新的电子邮件地址                                                                                                                                                                                                                                                                                                                        |
| hasAccess         | true false | 指示用户是否能够访问当前电子邮件地址。如果用户无法访问当前电子邮件地址,则用户无法使用 DAM 更新电子邮件地址。                                                                                                                                                         |
| token             | 字符串     | IBKR 通过电子邮件发送给申请人的确认 `token`。                                                                                                                                                                                                                                                                                |

### 处理流程

#### 非披露客户:电子邮件地址将立即更新。

## 示例

```
PATCH /gw/api/v1/accounts

"accountManagementRequests": {
    "updateCredentials": [
        {
            "referenceUserName": "ctest9751",
            "updateEmail": {
             "email": "newemail@gmail.com", 
            "access": true
            }
        }
    ]
  }
}
```

#### 全披露客户和顾问:用户需要获取电子邮件确认令牌。

**第 1 步**:发送更新电子邮件的请求

## 示例

```
PATCH /gw/api/v1/accounts

"accountManagementRequests": {
    "updateCredentials": [
        {
            "referenceUserName": "ctest9751",
            "updateEmail": {
             "email": "newemail@gmail.com", 
            "access": true
            }
        }
    ]
  }
}
```

**第 2 步:** 提交更新电子邮件的请求后,获取当前电子邮件地址的确认令牌

* IBKR 将向用户当前的电子邮件地址发送确认令牌。
* 交易对手方指示用户查收电子邮件以获取确认令牌。
* 交易对手方将确认令牌发送给 IBKR

## 示例

```
PATCH /gw/api/v1/accounts

"accountManagementRequests": {
    "updateCredentials": [
        {
            "referenceUserName": "ctest9751",
            "updateEmail": {
             "email": "abqa@ibkr.com",
             "token": "12345",                
            "access": true
            }
        }
    ]
  }
}
```

**第 3 步:** 新电子邮件地址的确认令牌

* IBKR 将向用户新的电子邮件地址发送确认令牌。
* 交易对手方指示用户查收电子邮件以获取确认令牌。
* 交易对手方将确认令牌发送给 IBKR
* 电子邮件地址更新成功

## 示例

```
PATCH /gw/api/v1/accounts

"accountManagementRequests": {
    "updateCredentials": [
        {
            "referenceUserName": "ctest9751",
            "updateEmail": {
             "email": "abqa@ibkr.com",
             "token": "12345",                
            "access": true
            }
        }
    ]
  }
}
```

* 如果满足以下任一条件,将触发错误
  * 为 ND-NonQI、FA 或 FD 子账户提交的请求。
  * 生效日期缺失或不是当前日期(即未来或过去的日期)。

## Schema

| 名称               | 类型                                                                      | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountId          | 字符串                                                                    | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。                                                                                                                                                                                                                                                                                                                                                                                                           |
| effectiveDate      | YYYY-MM-DD                                                                | 预扣税声明(withholding statement)的 `effectivedate`。须为当前或未来日期。                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| certW8Imy          | true false                                                                | 确认:与美国国税局(IRS)的要求一致,根据您提供的 Form W-8IMY 表格,您证明您是合格中介(Qualified Intermediary),未承担第 3 章和第 4 章规定的主要预扣责任,也未对该账户承担主要的 1099 申报和备用预扣(backup withholding)责任。您已承担向您的客户进行 Form 1042 申报的责任。该账户是您的 Form W-8IMY 预扣税声明的一部分。对于您指明为税务居民的客户,我们将向其索取 W9 表格。 |
| fatcaCompliantType | FATCA\_COMPLIANT  NON\_CONSENTING\_US\_ACCOUNT  NON\_COOPERATIVE\_ACCOUNT | 指示账户持有人是否为符合 FATCA 的账户                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| treatyCountry      | [3 位 ISO 代码](https://www.iso.org/obp/ui)                            | 如果账户持有人符合美国所得税协定下的协定优惠资格,请注明相应的税收协定。>如果账户持有人不符合协定优惠资格,可接受 N/A。>[与美国签订协定的国家](https://www.irs.gov/businesses/international-businesses/united-states-income-tax-treaties-a-to-z)                                                                                                                                                                        |
| usIncomeTax        | true false                                                                | 指示该账户的所有者是否为美国所得税居民。                                                                                                                                                                                                                                                                                                                                                                                                                                   |

## 示例

```
PATCH /gw/api/v1/accounts

{
  "accountManagementRequests": {
    "updateWithholdingStatement": 
        {
            "accountId": "U12345",
            "treatyCountry": "CHN",
            "fatcaCompliantType": "FATCA_COMPLIANT",
            "effectiveDate": "2020-01-02",
            "certW8Imy": true,
            "usIncomeTax": true
        }
    
  }
}
```

* `w8Ben`:如果设置了税收协定国家(`w8Ben` 中的 `part29ACountry`),美国财政部和 IRS 要求 IBKR 每 3 年向非美国人士索取一次新的税务身份表格。
  * 账户持有人必须向 IBKR 提供新的税务表格(Form 5001)。电子签名及表格提交要求与开户时相同。重新认证此表格可确保账户持有人在税务上被视为非美国人士。如果未在到期日前提供更新的税务表格,账户的利息、股息、替代付款(payments in lieu)和特许权使用费将被按 30% 的税率预扣美国税款。此外,所有销售所得总额将适用 28% 的美国预扣税。如果未设置税收协定(`part29ACountry` ="N/A"),则 `w8Ben` 不会过期。
* 某些 `changeAccountHolderDetail` 请求要求用户提交反映更新信息的新税务表格。税务表格可通过 Web API 或 IBKR Hosted Portal 提交。
  * 需要用户提交新税务表格的资料变更:
    * `name (first, last)`
    * `citizenship`
    * `residenceAddress`
    * `mailingAddress`
    * `taxResidency country`
    * `/gw/api/v1/accounts/{accountId}/login-messages` 可用于查看分配给特定账户的登录消息。

## Schema

| 名称                                                      | 类型                                                                                                                                                                                                                                                         | 描述                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountId                                                 | 字符串                                                                                                                                                                                                                                                       | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。                                                                                                                                                                                                                                                                     |
| externalId                                                | 字符串                                                                                                                                                                                                                                                       | 与该个人关联的 `externalId`。                                                                                                                                                                                                                                                                                                                   |
| entityId                                                  | 字符串                                                                                                                                                                                                                                                       | 与该个人关联的唯一 ID。该 ID 可从 [create](https://www.interactivebrokers.com/campus/ibkr-api-page/webapi-ref-staging/#tag/Account-Management-Accounts/paths/~1gw~1api~1v1~1accounts/post) 响应文件的 \<Entities> 部分获取。如果一个账户上有多个个人,每个个人都将拥有唯一的 id。 |
| \<TaxForm>                                                | [w8Ben](/account-management/schema/associatedindividual#w8ben)(非美国)  [localTaxForms](/account-management/schema/associatedindividual#localtaxforms) 或  [w9](/account-management/schema/associatedindividual#w9)(美国客户) | 输入新的税务表格详细信息。本部分的验证规则与客户注册时包含税务表格所适用的验证规则相同。                                                                                                                                                                                                                                                                              |
| [documents](/account-management/schema/documents) |                                                                                                                                                                                                                                                              | 包含与税务表格关联的文档详细信息。本部分的验证规则与客户注册时包含税务表格所适用的验证规则相同。                                                                                                                                                                                    |

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "updateTaxForm": {
            "accountId": "U12345",
            "entityId": "123456",
            "externalId": "Test12346",
            "documents": {
                "formNumber": "5001",
                "execTimestamp": "20161221123500",
                "execLoginTimestamp": "20161221123500",
                "signedBy": "John Doe",
                "attachedFile": {
                    "fileName": "Form5001.pdf",
                    "fileLength": "67700",
                    "sha1Checksum": "D8AA699678D12DE6AC468A864D4FAE7999AA904B"
                },
                "w8Ben": {
                    "name": "John Doe",
                    "explanation": "TIN_NOT_REQUIRED",
                    "part29ACountry": "CAN",
                    "cert": true,
                    "blankForm": true,
                    "taxFormFile": "Form5001.pdf",
                    "proprietaryFormNumber": "5001"
                }
            }
        }
    }
}
```

#### 账户

目前仅支持 LITE/PRO 指定。美国东部时间(EST)下午 3 点前提交的请求将在下午 5 点左右处理。下午 3 点后提交的请求将在下一个工作日下午 5 点处理。

* 用户在任何 90 天周期内最多可在 LITE 和 PRO 之间切换三次。超过此限制的请求将被拒绝,并需接受 90 天的处理延迟。
  * **超出限制响应:** 请求无法处理。您已超出每 90 天周期三次订阅变更的限制。请从您第一次变更请求起等待 90 天后再重新提交。
  * **重要说明:**
    * 被拒绝的请求必须在 90 天周期届满后重新提交

## Schema

| 名称      | 类型          | 描述                                                                                |
| --------- | ------------- | ------------------------------------------------------------------------------------------ |
| accountId | 字符串        | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |
| value     | true false    | true:启用服务 false:禁用服务                                                                |
| type      | LiteExecution | 配置类型                                                                         |

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "accountConfiguration" : 
            {
                "accountId" : "U12345",
                "type" : "LiteExecution",
                "value" : "true"
            }   
        
    }
}
```

* 净资产至少为 \$1,000,000 的个人/联合/IRA 账户将被认定为合格投资者(Accredited Investor)。
* 如果合格投资者的 `netWorth` > 500 万美元或等值金额,则可以在 IBKR Portal 中将其投资者类别更新为合格购买人(Qualified Purchaser)或合格合约参与者(Eligible Contract Participant)。

[更多信息](https://www.ibkrguides.com/advisorportal/investorcategory.htm?cid=67cc40e3-b273-47c2-abe3-bb0abed6f201)

## Schema

| 代码                        | 用法                                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| accountId                   | 字符串                                         | 需要变更投资者类别的顾问/经纪商客户账户的 IBKR 账户 ID。                                                                                                                                                                                                                                                                                                     |
| signedBy                    | 字符串                                         | 账户持有人的签名。`signedBy` 应为名字(First Name)+ 中间名首字母(如适用)+ 姓氏(Last Name)+ 后缀(如适用)。数据区分大小写。                                                                                                                                                                                                                                   |
| status                      | true false                                     | true= 是 Fales = 否                                                                                                                                                                                                                                                                                                                                                                                       |
| accreditedInvestor          | 必填                                       | 您在账户申请中提供的答案表明您符合合格投资者(Accredited Investor,定义见 1933 年《证券法》Regulation D 第 501(a) 条)的资格。                                                                                                                                                                                                                  |
| qualifiedPurchaser          | 可选                                       | qualifiedPurchaser:您可能符合合格购买人(Qualified Purchaser,定义见 1940 年《投资公司法》第 2(a)(51) 条)的资格,这将使您能够参与某些特殊项目。您是否愿意回答几个问题,以便 Interactive Brokers 确定您是否可能符合 ECP 资格?YES/NO                                                                           |
| investmentCompanyAct        | qualifiedPurchaser=true 时必填            | 您是否为拥有至少 \$5,000,000 投资资产(定义见 1940 年《投资公司法》下的 Rule 2a51-1)的自然人?YES/NO                                                                                                                                                                                                                                                          |
| discretionaryBasis          | qualifiedPurchaser=true 时必填            | 您是否为自己的账户或其他合格购买人的账户行事、并以 `discretionaryBasis`(全权委托方式)合计拥有并投资至少 \$25,000,000 投资资产的自然人?YES/NO                                                                                                                                                                                  |
| eligibleContractParticipant | 可选                                       | 合格合约参与者 美国法规对非合格合约参与者(ECP,定义见《商品交易法》第 1a(12) 条)的客户施加限制,这可能限制您的交易。点击此处了解成为 ECP 的好处。您在账户申请中提供的答案表明您可能符合 ECP 资格。YES/NO |
| discretionaryBasis          | EligibleContractParticipant = True 时必填 | 您是否为自己的账户行事的个人,且以全权委托方式投资超过 \$10,000,000?YES/NO                                                                                                                                                                                                                                                                               |
| highRisk                    | discretionaryBasis= False 时必填          | 您是否为自己的账户行事的个人,且以全权委托方式投资超过 \$5,000,000,并且您的交易活动旨在对冲您拥有(或合理可能拥有)的其他资产的风险?YES/NO                                                                                                                                               |

## 示例

```
PATCH /gw/api/v1/accounts

{
  "accountManagementRequests": {
    "accreditedInvestor": 
        {
            "accountId": "U12345",
            "status": true,
            "signedBy": 
                "Test Test"
            
"qualifiedPurchaser": {
                "status": true,
                "qualifiedPurchaserDetails": 
                    {
                        "code": "InvestmentCompanyAct",
                        "status": true
                    },
                    {
                        "code": "DiscretionaryBasis",
                        "status": true
                    }
             
            },
            "eligibleContractParticipant": {
                "status": true,
                "eligibleContractParticipantDetails": [
                    {
                        "code": "HighRisk",
                        "status": true
                    },
                    {
                        "code": "DiscretionaryBasis",
                        "status": false
                    }
                
            }
        }
    
  }
}
```

* 为现有账户添加 CLP(复杂杠杆产品,Complex Leverage Product)功能。

## Schema

| 名称      | 类型   | 描述                                                                                |
| --------- | ------ | ------------------------------------------------------------------------------------------ |
| accountId | 字符串 | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |

## 非披露客户示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "addCLPCapability" : 
            {
                "accountId" : "U12345"
            }   
        
    }
}
```

## 全披露客户和顾问示例

#### 全披露客户和顾问客户的验证要求

1. 在交易对手方向 IBKR 提交请求之前,必须向账户持有人出示所需表格并由其签署所需表格。
   * 4155:复杂或杠杆类交易所交易产品风险披露(Risk Disclosure for Complex or Leveraged Exch-Traded Products)
2. 资格将根据用户的年龄、投资经验和财务信息进行验证。
3. 对于全披露客户,账户持有人必须至少具有两年的股票交易经验,并且具有期权或期货交易经验。

**期货**

* 1 年,每年 1-10 笔交易
  * 无法通过验证
  * 由于客户交易期货的时间不足两年,客户必须参加期货考试(Futures Exam)
* 2 年,每年 1-10 笔交易
  * 如果知识水平(Knowledge level)为 Good 或 Extensive,则可以通过验证
  * 如果知识水平为 Limited,则无法通过验证

**期权**

* 1 年,每年 1-10 笔交易
  * 无法通过验证
  * 由于客户交易期权的时间不足两年,客户必须参加期权考试(Options Exam)
* 2 年,每年 1-10 笔交易
  * 如果知识水平为 Good 或 Extensive,则可以通过验证
  * 如果知识水平为 Limited,则无法通过验证

默认情况下,所有客户均可使用货币兑换功能。杠杆外汇(Leveraged FX)允许您以杠杆方式交易货币对。借助杠杆外汇,您可以用较少的保证金交易更大的头寸。杠杆外汇交易面向符合条件的客户开放。

## Schema

| 名称      | 类型   | 描述                                                                                |
| --------- | ------ | ------------------------------------------------------------------------------------------ |
| accountId | 字符串 | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "addLevFxCapability" : 
            {
                "accountId" : "U12345"
            }   
        
    }
}
```

为已开户的账户添加交易权限。

**处理时间:**

* 新增地区:新地区的交易权限立即生效

* 新增产品:新增产品需要 1-2 个工作日由我们的合规团队处理和审核。

## Schema

| 名称                  | 类型                                                                                                  | 描述                                                                                |
| --------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| addTradingPermissions | 对象数组 [tradingPermissions](/account-management/schema/accounts#tradingpermissions) | 所请求的交易权限。                                             |
| accountId             | 字符串                                                                                                | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |

## 非披露客户示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "addTradingPermissions": 
            {
                "tradingPermissions": [
                    {
                        "country": "BELGIUM",
                        "product": "STOCKS"
                    }
                ],
                    "accountId": "U1234",
            }
        
    }
}
```

## 全披露客户和顾问示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "addTradingPermissions": 
            {
                "tradingPermissions": [
                    {
                        "country": "BELGIUM",
                        "product": "STOCKS"
                    }
                ],
                "documentSubmission": {
                    "documents": [],
                    "accountId": "U1234",
                    "inputLanguage": "en",
                    "translation": false
                },
                    "accountId": "U1234",
            }
        
    }
}
```

免责声明:适用于全披露客户和顾问客户

* 如果 exchange\_group 需要表格,则 AddTradePermissions 请求必须由客户发起。

* 在交易对手方向 IBKR 提交请求之前,必须向账户持有人出示所需表格并由其签署所需表格。

* 如果交易组合(trading bundle)不需要表格,您可以直接向 IBKR 提交,因为客户无需签署披露文件。

* 对于经纪商客户,美国东部时间 17:00 之前提交的费率变更将在当天处理,并自下一个工作日零点起生效。

* 对于顾问客户,如果费用上调或费用类型变更,客户需要直接在账户管理/客户门户(Account Management/Client Portal)中确认该费用上调。
  * 客户在美国东部时间下午 5:45 之前确认的费用模板将在当天处理。
  * 客户在美国东部时间下午 5:45 之后确认的费用模板将在下一个工作日处理。
  * 如果费用下调,费用将自动处理(无需客户确认)。

## Schema

| 名称         | 类型   | 描述                                                                                                                                                                                                                                                                                                   |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| templateName | 字符串 | 所应用的费用模板名称。数据区分大小写和空格。`templateName` 必须与之前在顾问/经纪商门户中创建的模板名称一致。[详情](https://www.ibkrguides.com/advisorportal/homemenu/configclientfeetemplate.htm?Highlight=fee%20template) |
| accountId    | 字符串 | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。                                                                                                                                                                                                                    |

## 示例

```
PATCH /gw/api/v1/accounts
 {
  "accountManagementRequests": {
   "applyFeeTemplate": {
      "accountId": "U10032411",
      "templateName": "FeePerTradeUnit100"
    }
  }
}
```

更新已开户账户的基本货币。基本货币变更请求要到下一个工作日才会生效。

## Schema

| 名称                | 类型                                                                                                                                   | 描述                                                                                |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| accountId           | 字符串                                                                                                                                 | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |
| new\_base\_currency | 货币代码(3 位)。可用货币请参见[此处](https://www.interactivebrokers.com/en/support/fund-my-account.php)。 | 账户的新基本货币。                                                         |

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "changeBaseCurrency": {
            "accountId": "U12345",
            "newBaseCurrency": "USD"
        }
    }
}
```

* 用于更新和提升现有账户的投资经验、投资目标和/或财务信息。
  * 该服务不能用于下调知识水平。
* **处理时间**
  * 全披露客户和顾问客户:需要 1-2 个工作日由我们的合规团队处理和审核。

## Schema

| 名称                    | 类型                                                                                                                                                                                                                                                               | 描述                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| accountId               | 字符串                                                                                                                                                                                                                                                             | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |
| newFinancialInformation | 对象数组 [financialInformation  investmentExperience](/account-management/schema/accounts) [investmentObjectives](/account-management/schema/accounts#investmentobjectives) [sourcesOfWealth](/account-management/schema/accounts) | 提供更新后的信息。                                                               |

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
    "changeFinancialInformation": [
        {
          "accountId": "U12345",
          "newFinancialInformation": {
            "investmentExperience": [
              {
                "assetClass": "BILL",
                "yearsTrading": 2,
                "tradesPerYear": 5,
                "knowledgeLevel": "Extensive"
              }
            ],
            "investmentObjectives": [
              "Trading",
              "Growth",
              "Speculation",
              "Hedging",
              "Preservation",
              "Income"
            ],
            "additionalSourcesOfIncome": [
                {
                    "sourceType": "CONSULTING",
                    "percentage": 4,
                    "description": "from Spouse"
                },
                {
                    "sourceType": "INHERITANCE",
                    "percentage": 10,
                    "description": "father property"
                }
            ],
            "sourcesOfWealth": [
                {
                    "sourceType": "SOW-IND-Allowance",
                    "percentage": 25,
                    "usedForFunds": false,
                    "description": "Allowance from spouse"
                },
                {
                    "sourceType": "SOW-IND-Disability",
                    "percentage": 50,
                    "usedForFunds": false,
                    "description": "Allowance from spouse"
                },
                {
                    "sourceType": "SOW-IND-Inheritance",
                    "percentage": 23,
                    "usedForFunds": true,
                    "description": "Allowance from spouse"
                }
            ],
            "netWorth": 1700000,
            "liquidNetWorth": 120000,
            "annualNetIncome": 210000,
            "totalAssets": 173000,
            "sourceOfFunds": "string",
            "translated": false
          }
        }
      ]
    }
}
```

为现有账户升级保证金功能。

* 现金账户可以升级为保证金(Margin)账户。

* 要升级为投资组合保证金(Portfolio Margin)账户,您必须已获准交易期权,且账户的净清算价值(Net Liquidation Value)必须至少为 110,000 美元(或等值美元)。

* **处理时间**
  * 升级请求可能需要 1-2 个工作日由我们的合规团队处理和审核。

## Schema

| 名称      | 类型                                      | 描述                                                                                                                                                                                                                                                                                                                                                                                         |
| --------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountId | 字符串                                    | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。                                                                                                                                                                                                                                                                                                          |
| newMargin | RegT REGT PortfolioMargin PORTFOLIOMARGIN | **Portfolio Margin(投资组合保证金):** 基于风险的模型,对于多样化的投资组合可提供最高 6:1 的杠杆;对于较为集中的投资组合则可低至 3:1 的杠杆。最低权益:\$100,000。如果账户低于 \$100,000,账户将处于只能平仓(close only)模式。**RegT:** 基于规则的保证金,日内提供 4:1 杠杆,隔夜提供 2:1 杠杆。最低权益:\$2,000 |

## 非披露客户示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "changeMarginType": {
            "accountId": "U12345",
            "newMargin": "Margin"
        }
    }
}
```

## 全披露客户和顾问客户示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "changeMarginType": {
            "documentSubmission": {
                "documents": [
                    "signedBy": "John Smith",
                    "validAddress": true,
                    "execTimestamp": 10,
                    "documentType": "Certified Proof of Address",
                    "expirationDate": "2033-11-22"
                ],
                "accountId": "U12345",
                "inputLanguage": "en",
                "translation": false
            },
            "accountId": "U12345",
            "newMargin": "xMargin"
        }
    }
}
```

免责声明:适用于全披露客户和顾问客户

* 在交易对手方向 IBKR 提交请求之前,必须向账户持有人出示所需表格并由其签署所需表格。

股息再投资(DRIP)是一项可选项,您可以选择股票和共同基金股息的接收方式。股息再投资仅适用于 IB LLC、IB AU、IB CAN、IB HK、IB IE、IB JP、IB SG 和 IB UK 客户。

有关 DRIP 的信息,请参见[此处](https://www.ibkrguides.com/clientportal/dividendreinvestment.htm)。

## Schema

| 名称      | 类型   | 描述                                                                                |
| --------- | ------ | ------------------------------------------------------------------------------------------ |
| accountId | 字符串 | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests":{
        "enrollInDrip":{
            "accountId": "U12345",
        }
    }
}
```

免责声明:适用于全披露客户和顾问客户

* 在交易对手方向 IBKR 提交请求之前,必须向账户持有人出示所需表格并由其签署所需表格。

## Schema

| 名称      | 类型   | 描述                                                                                |
| --------- | ------ | ------------------------------------------------------------------------------------------ |
| accountId | 字符串 | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests":{
        "leaveDrip":{
            "accountId": "U12345",
        }
    }
}
```

* **处理时间**
  * 美国东部时间下午 5 点前提交的请求将在当天处理。
  * 美国东部时间下午 5 点后提交的请求将在下一个工作日处理。
  * 用户必须距上次取消注册之日起 90 天后才能重新注册。

## Schema

| 名称      | 类型   | 描述                                                                                |
| --------- | ------ | ------------------------------------------------------------------------------------------ |
| accountId | 字符串 | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests":{
        "enrollInSyep":{
            "accountId": "U12345",
        }
    }
}
```

* **处理时间**
  * 美国东部时间下午 5 点前提交的请求将在当天处理。
  * 美国东部时间下午 5 点后提交的请求将在下一个工作日处理。
  * 用户必须距上次取消注册之日起 90 天后才能重新注册。

## Schema

| 名称      | 类型   | 描述                                                                                |
| --------- | ------ | ------------------------------------------------------------------------------------------ |
| accountId | 字符串 | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests":{
        "leaveSyep":{
            "accountId": "U12345",
        }
    }
}
```

* **处理时间**
  * 美国东部时间下午 5 点前提交的请求将在当天处理。
  * 美国东部时间下午 5 点后提交的请求将在下一个工作日处理。

## Schema

| 名称              | 类型                                                                                                  | 描述                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| tradingPermission | 对象数组 [tradingPermissions](/account-management/schema/accounts#tradingpermissions) | 要移除的交易权限。                                                         |
| accountId         | 字符串                                                                                                | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |

## 示例

```
PATCH /gw/api/v1/accounts
{
    "accountManagementRequests": {
        "removeTradingPermissions": [
            {
                "tradingPermissions": [
                    {
                        "assetClass": "STK",
                        "exchangeGroup": "EU-IBET",
                        "country": "BELGIUM",
                        "product": "STOCKS"
                    }
                ]
                "accountId":"U123456"
            }
        ]
    }
}
```

账户别名将显示在对账单、门户和 TWS 中。

* **处理时间:** 更改将立即生效。您需要重启 TWS 或 Portal 才能查看新别名。

## Schema

| 名称         | 类型                           | 描述                                                                                |
| ------------ | ------------------------------ | ------------------------------------------------------------------------------------------ |
| accountId    | 字符串                         | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |
| accountAlias | 字符串 最大字符数:80 | 账户别名或昵称                                                                  |

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "updateAccountAlias": [
            {
                "accountId": "U12345",
                "accountAlias": "U111"
            }
        ]
    }
}
```

## Schema

| 名称             | 类型   | 描述                                                                                                              |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| accountId        | 字符串 | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。                               |
| representativeId | 字符串 | 账户代表的 IBKR 用户名。该用户必须列在账户所关联的主账户(master account)上。 |
| percentage       | 数字 | 所有代表的百分比总和应等于 100%。                                                       |

## 示例

```
PATCH /gw/api/v1/accounts

{
  "accountManagementRequests": {
    "updateAccountRepresentatives": [
        {
            "accountId": "U12345",
            "representativeDetails": [
                {
                    "representativeId": "ajd0318a",
                    "percentage": 100
                }
            ]
        }
    ]
  }
}
```

SFC 监管要求 IBHK 下拥有 SEHK 股票或债券交易权限的客户提供 BCAN。

* 仅适用于非披露客户(QI 和 NonQI)- 所有客户类型。

## Schema

| 名称      | 类型   | 描述                                                                                                       |
| --------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| accountId | 字符串 | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。                        |
| bcan      | 字符串 | 经纪商分配给客户的编号(Broker-to-Client-Assigned-Number,bcan)。- 必须为不超过 10 位、不以 0 开头的数字,且不能是 1-99。 |
| ceNumber  | 字符串 | 经纪商的中央实体编号(Central entity number,CE#)。必须为 6 位字母数字标识符。                                |

## 示例

```
PATCH /gw/api/v1/accounts

{
  "accountManagementRequests": {
    "updateBcan": [
        {
            "accountId": "U12345",
            "bcan": "1125",
            "ceNumber": "BNO808"
        }
    ]
  }
}
```

## Schema

| 名称          | 类型   | 描述                                                                                |
| ------------- | ------ | ------------------------------------------------------------------------------------------ |
| accountId     | 字符串 | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |
| newExternalId | 字符串 | 要分配给该账户的新 external ID。                                             |

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "updateExternalId" : 
            {
                "accountId" : "U12345",
                "newExternalId" : "Test1234"            }   
        
    }
}
```

该服务仅可应请求提供。如需使用此服务,请联系 [am-api@interactivebrokers.com](mailto:am-api@interactivebrokers.com)。

## Schema

| 名称            | 类型   | 描述                                                                                |
| --------------- | ------ | ------------------------------------------------------------------------------------------ |
| accountId       | 字符串 | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。 |
| propertyProfile | 字符串 | 所分配的 property profile 名称。                                                           |

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "updatePropertyProfile" : 
            {
                "accountId" : "U12345",
                "propertyProfile" : "Standard"            }   
        
    }
}
```

管理与主账户关联的用户对账户的访问权限。

* 仅当用户在 UAR 中被配置为“特定子账户(Specific Sub Accounts)”时适用

* 该服务允许顾问/经纪商在主账户层面为有权访问“特定子账户(Specific Sub Accounts)”的用户添加/移除账户访问权限

## Schema

| 名称      | 类型       | 描述                                                                                                    |
| --------- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| accountId | 字符串     | 所提交请求对应的顾问/经纪商客户账户的 IBKR 账户 ID。                     |
| action    | ADD REMOVE | ADD=用户将有权访问给定账户。REMOVE=用户将不再有权访问给定账户。 |
| repId     | 字符串     | 要更新其账户访问权限的用户 ID。应为与主账户关联的用户 ID。  |

## 示例

```
PATCH /gw/api/v1/accounts

{
  "accountManagementRequests": {
    "updateUserAccessRights": [
        {
            "accountId": "U12345",
            "repId": "potest123",
            "action": "ADD"
        }
    ]
  }
}
```
