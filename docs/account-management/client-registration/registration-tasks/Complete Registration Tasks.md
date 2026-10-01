# 完成注册任务

**`[PATCH]`**[`/api/v1/accounts/`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/update-accounts) 可用于为现有账户完成注册任务。

## documentSubmission

提交 IBKR 进行账户批准或账户升级所需的文件。

该服务可用于提交以下内容:

* IBKR 协议/披露文件
* KYC 文件,包括身份证明、地址证明和财富来源证明。
  * 每个 formNumber 仅接受一份文件;如果文件有多面或多页,请在提交给 IBKR 之前将其合并为单个文件。

### Schema

| 名称 | 类型 | 基于 form\_no 的用途 | 描述 |  |
| --- | --- | --- | --- | --- |
| accountId | String | 全部 | 为其提交文件的顾问/经纪客户账户的 IBKR 账户 ID。 |  |
| fileName | String | 全部 | 提交给 IBKR 的 PDF 文件的文件名。`documents` 请求中包含的 `fileName` 必须与签名请求中包含的 PDF 文件的 `fileName` 相匹配。  可接受的格式:.jpeg、.jpg、.pdf、.png 最大大小:10 MB |  |
| sha1Checksum | String | 全部 | SHA-1 是一种用于验证文件未被更改的加密算法。具体做法是在文件传输之前生成一次校验和,然后在文件到达目的地时再次生成校验和。 |  |
| formNumber | String | 全部 | 使用 `/gw/api/v1/accounts/{accountId}/tasks` 查看审批所需的表格列表。 |  |
| execTimestamp | YYYYMMDDHHMMSS | 全部 | 客户签署协议的时间戳(即客户签署协议的时间)。 |  |
| execLoginTimestamp | YYYYMMDDHHMMSS | 全部 | 该会话的登录时间戳(即客户登录并确认协议的时间。 |  |
| signedBy | String | 全部 | `signedBy` 必须与所提交的姓名相匹配(`first + middle` 首字母(如适用)+ `last`)。\*数据区分大小写和空格。 |  |
| proofOfIdentityType | **除 IB-CAN 外的所有实体** Driver License Passport Alien ID Card National ID Card **仅 IB-CAN** Bank Statement Evidence of Ownership of Property Credit Card Statement Utility Bill Brokerage Statement T4 Statement CRA Assessment | 8001 8205 8053 8057 | 为证明身份而提交的文件的描述。 |  |
| proofOfAddressType | Additional Proof of Identity Document Authorization to Open Account – Certification Authorization to Open Account – Evidence Bank Statement Brokerage Statement Certificate of Good Standing Certificate of Incorporation Certificate of Registration Certified Proof of Address Certified Proof of Identity Check Company Charter Company Ownership Corporate Charter Articles of Incorporation Court- or Govt-issued document CRS card of Lombardy Current Lease Divorce Settlement Drivers License  Employer Confirmation Entitlement to Payments Evidence of Ownership of Property Financial Statement Formation Government-issued Business License Income Tax Return Italian Electronic ID Card – CIE Italian Health Card (Tessera Sanitaria) Letter National ID Ownership Passport Pay Slip Proof of Principal Place of Business and Registration Proof of Sale Proof of Winnings Severance Statement Tax Return Utility Bill Will | 8002 8001 8205 8053 8057 | 为证明地址而提交的文件的描述。 |  |
| validAddress | true false | 8001 | 如果提供 `Driver License` 作为 `proofOfIdentityType` 且 `validAddress`=true,则可使用单个文件同时满足身份证明和地址证明。 ] |  |
| documentType | Check Company Ownership Divorce Settlement Employer Confirmation Entitlement to Payments Letter Ownership Pay Slip Proof of Sale Proof of Winnings Severance Tax Return Will Bank Statement Brokerage Statement Current Lease | 8541 8542 8543 8544 8545 8546 8547 8548 8549 | 可接受的文件因 formNo 而异。 |  |
| externalIndividualId | String |  | 外部实体中签署协议之个人的标识符。必须是申请中列出的个人。对于 INDIVIDUAL 申请,该字段将被忽略,因为协议必须由账户持有人签署。对于通过 ECA 创建的 JOINT 账户,提交 POI/POA 时必填。对于通过 ECA 创建的 JOINT 持有人,需要提供正在为其提交 POI/POA 的账户持有人的外部 ID。 |  |
| expirationDate | YYYY-MM-DD | Drivers License OR Passport | 提供该身份证件的到期日。 |  |
| mimeType | application/pdf application/pdf image/png  image/jpeg (Includes .jpeg, .jpg) |  | 文件的格式。 |  |
| data | String |  | 包含以 base64 编码的文件。 |  |

### 校验规则

* 可接受的格式:.jpeg、.jpg、.pdf、.png
* 最大上传大小:25 MB

#### 基于 formNumber 的可接受 documentType

| formName | formNumber | documentType |
| --- | --- | --- |
| 身份证明和出生日期证明 | 8001 | Driver License Passport Alien ID Card National ID Card |
| 地址证明 | 8002 | Bank Statement Brokerage Statement Homeowner Insurance Policy Bill Homeowner Insurance Policy Document Renter Insurance Policy bill Renter Insurance Policy Document Security System Bill Government Issued Letters Utility Bill Current Lease Evidence of Ownership of Property Driver License Other Document |
| 自拍验证 | 8205 | 账户持有人需要手持其身份证件拍摄"自拍"。对于身份证件,我们仅接受 National ID 或 Passport。不接受 Driver's License/Alien card。 |
| 香港签名验证 | 8043 | [Form8043.pdf](https://ndcdyn.interactivebrokers.com/Universal/servlet/Registration_v2.formSampleView?formdb=8043\&preferredFormat=pdf) |
| 财富来源证明(SOW-IND-Allowance) | 8541 | Bank Statement Pay Slip Employer Confirmation Divorce Settlement Company Ownership |
| 财富来源证明(SOW-IND-Disability) | 8542 | Bank Statement Entitlement to Payments Severance |
| 财富来源证明(SOW-IND-Income) | 8543 | Pay Slip Bank Statement Employer Confirmation |
| 财富来源证明(SOW-IND-Inheritance) | 8544 | Letter Bank Statement Check Will Brokerage Statement |
| 财富来源证明(SOW-IND-Interest) | 8545 | Brokerage  Statement Tax Return |
| 财富来源证明(SOW-IND-MarketProfit) | 8546 | Ownership Brokerage Statement Tax Return |
| 财富来源证明(SOW-IND-Other) | 8547 | Proof of Winnings Bank Statement Tax Return Brokerage Statement |
| 财富来源证明(SOW-IND-Pension) | 8548 | Bank Statement Pay Slip |
| 财富来源证明(SOW-IND-Property) | 8549 | Proof of Sale Current Lease |
| 存续证明 | 8003 | Certificate of Incorporation Formation Certificate of Registration Company Charter Certificate of Good Standing Government-issued Business License Corporate Charter Articles of Incorporation |
| 主要营业地址证明 | 8004 | Statement Certified Proof of Identity Certified Proof of Address Income Tax Return Additional Proof of Identity Document Proof of Principal Place of Business and Registration Utility Bill Bank Statement Bank Statement Brokerage Statement Current Lease Evidence of Ownership of Property |
| 改名证明 | 8039 | Court- or Govt-issued document Passport National ID Drivers License |
| 姓名变更证明 | 8040 | Court- or Govt-issued document |
| 公民身份证明 | 8138 | Passport National ID |
| 开户授权证明 – 认证任务 | 8175 | Authorization to Open Account – Certification |
| 开户授权证明 – 证据任务 | 8176 | Authorization to Open Account – Evidence |
| 税号证明 | 8360 | CRS card of Lombardy Italian Electronic ID Card – CIE Italian Health Card (Tessera Sanitaria) |
| 流动净资产证明 | 9975 | Bank Statement Brokerage Statement Financial Statement |

### 示例

```
PATCH /api/v1/accounts/

{"accountManagementRequests": {       
"documentSubmission": 
            {
                "documents": [
                    {
                        "signedBy": [
                            "Jane Doe"
                        ],
                        "attachedFile": {
                            "fileName": "ProofOfId.pdf",
                            "fileLength": 9508,
                            "sha1Checksum": "b6e3235d3d21dc999da2fa24c7009ad0815e7330"
                        },
                        "formNumber": 8001,
                        "validAddress": true,
                        "execLoginTimestamp": 20210929123113,
                        "execTimestamp": 20210929123113,
                        "proofOfIdentityType": "Drivers License",
                        "payload": {
                         "mimeType": "application/pdf",
                         "data": "<DocumentEncodedInBase64>"         }

                    }
                ],
                "accountId":"U123456,
                "inputLanguage": "en",
                "translation": false
            }
        
    }
```

## questionnaires

为现有账户完成问卷调查。

该服务支持以下问卷调查:

* 尽职调查(EDD)
* 知识评估

[/api/v1/enumerations/questionnaires?form-number=\<formNumber>](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/get-enumerations) 可用于根据 `formNumber` 检索关联问卷的问题列表。该端点会指明是否支持通过 API 处理该任务。

* 如果 `apiSupportedTask='true'`,表示该任务可以通过 API 完成。

* 如果 `apiSupportedTask='false'`,表示该任务需要由主用户(master user)**或**终端客户在 IBKR Portal 中完成。

### Schema

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| accountId | String | 为其请求文件的顾问/经纪客户账户的 IBKR 账户 ID。 |
| formNumber | String | 与问卷关联的表格编号。 |
| detail | String | 最多 350 个字符。 |

### 示例 - 尽职调查

```
PATCH /api/v1/accounts/{
{
    "accountManagementRequests": {
        "questionnaires": {
            "accountId": "U123456",
            "questionnaire": [
                {
                    "formNumber": 9943,
                    "answers": [
                        {
                            "detail": "description",
                            "id": 2396,
                            "questionId": 1620
                        }
                    ]
                }
            ]
        }
    }
}
```

### 示例 - 知识评估

```
PATCH /api/v1/accounts/
{
"accountManagementRequests": {
"quizQuestionnaires": {
"questionnaire": [
{
"answers": [
{
"id": 4,
"questionId": 1
},
{
"id": 4,
"questionId": 2
},
{
"id": 4,
"questionId": 3
},
{
"id": 4,
"questionId": 4
},
{
"id": 4,
"questionId": 5
},
{
"id": 4,
"questionId": 6
},
{
"id": 4,
"questionId": 7
},
{
"id": 4,
"questionId": 8
},
{
"id": 4,
"questionId": 9
},
{
"id": 4,
"questionId": 10
}
],
"formNumber": 2430
},
{
"answers": [
{
"id": 4,
"questionId": 1
},
{
"id": 4,
"questionId": 2
},
{
"id": 4,
"questionId": 3
},
{
"id": 4,
"questionId": 4
},
{
"id": 4,
"questionId": 5
},
{
"id": 4,
"questionId": 6
},
{
"id": 4,
"questionId": 7
},
{
"id": 4,
"questionId": 8
},
{
"id": 4,
"questionId": 9
},
{
"id": 4,
"questionId": 10
}
],
"formNumber": 2438
},
{
"answers": [
{
"id": 4,
"questionId": 1
},
{
"id": 4,
"questionId": 2
},
{
"id": 4,
"questionId": 3
},
{
"id": 4,
"questionId": 4
},
{
"id": 4,
"questionId": 5
},
{
"id": 4,
"questionId": 6
},
{
"id": 4,
"questionId": 7
},
{
"id": 4,
"questionId": 8
},
{
"id": 4,
"questionId": 9
},
{
"id": 4,
"questionId": 10
}
],
"formNumber": 2432
}
],
"accountId": "U1111111",
"task": [
{
"formNumber": 2431,
"status": false
},
{
"formNumber": 2439,
"status": false
},
{
"formNumber": 2433,
"status": false
}
]
}
}
}
```

## prohibitedCountryQuestionnaire

完成禁止国家(Prohibited Country)问卷。

* 如果 `citizenship, citizenship2, citizenship3` 或 `countryOfBirth` 为禁止国家,则会为该账户分配 `prohibitedCountryQuestionnaire`(`formNumber` 3442)。
* 可使用 `/api/v1/enumerations/prohibited-country` 端点获取禁止国家列表。

### Schema

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| accountId | String | 为其提交 `prohibitedCountryQuestionnaire` 的客户账户的 IBKR 账户 ID。 |
| code | PASSPORT CITIZENSHIP BUSINESSDEALINGS FINANCIALACCOUNTS RESIDENT MULTI BIRTH | **PASSPORT**:您目前是否持有来自禁止国家的护照?  **CITIZENSHIP**:您目前是否拥有来自禁止国家的公民身份?  **BUSINESSDEALINGS**:您目前是否在禁止国家有业务往来?  **FINANCIALACCOUNTS**:您目前在禁止国家是否有金融账户?  **RESIDENT**:您目前是否计划居住在禁止国家?  **MULTI**:您是否拥有多个国家的公民身份和/或居民身份  **BIRTH**:您是否出生于以下任一国家 \<Prohibited Country> |
| externalId | String | 与账户持有人关联的 `externalID`。应与创建账户的请求中包含的 `externalID` 相同。 |
| status | true false |  |
| details | string | 如果 status=\"true\" 则必填;请提供描述。 |

### 示例

**PATCH /gw/api/v1/accounts**

```
{
  "accountManagementRequests": {
    "prohibitedCountryQuestionnaire": {
      "accountId": "accountId",
      "entityId": "247519520",
      "prohibitedQuestionnaireDetails": [
        {
          "code": "PASSPORT",
          "details": "Do you hold passport for the following countries"
        },
        {
          "code": "BIRTH",
          "details": "Were you born in the following countries"
        },
        {
          "code": "CITIZENSHIP",
          "details": "Do you hold citizenship in the following countries"
        },
        {
          "code": "BUSINESSDEALINGS",
          "details": "Do you have business dealings in the following countries"
        },
        {
          "code": "FINANCIALACCOUNTS",
          "details": "Do you have financial accounts in the following countries"
        },
        {
          "code": "RESIDENT",
          "details": "Do you plan to reside in the following countries"
        },
        {
          "code": "MULTI",
          "details": "Do you hold citizenship and/or residency details in multiple countries"
        }
      ]
    }
  }
}
```
