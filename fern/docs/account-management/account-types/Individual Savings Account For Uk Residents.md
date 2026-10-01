# 英国居民个人储蓄账户(Individual Savings Account)

IBKR 为英国客户提供税收优惠账户,包括个人储蓄账户(ISA)和儿童个人储蓄账户(JISA)。本节提供通过 API 实现 ISA 和 JISA 账户创建的指导。

## ISA(Individual Savings Account,个人储蓄账户)

### 账户关联要求

IBKR 对 ISA 账户强制实施账户关联。当提交 ISA 申请时,IBKR 会自动在 IB-UK 主账户之下创建一个普通投资账户(GIA)。

**重要提示:** 通过 `/accounts` 端点提交至 IBKR 的 JSON 申请中,必须在 `documents` 部分同时包含 GIA 和 ISA 的协议。

### ISA 限制

#### 交易权限

* **仅限股票** – 不允许其他资产类型

#### 保证金要求

* **不允许保证金交易** – 账户必须配置为 CASH(现金账户)

#### 身份识别要求

* **税务居住地:** 必须为 GBR(英国)
* **国民身份证:** 如果 "`issuingCountry":"GBR`",则需要 `nationalCard`

### ISA 与 GIA 关联详情

#### 创建方式

* ISA **只能**通过新的开户流程创建(使用 `/accounts` 端点提交申请)
* ISA **不能**使用 `addAdditionalAcct` 添加

#### 账户关联

* ISA 及其关联的 GIA 将关联到单一的用户名和密码
* GIA 账户的凭据将包含在响应文件的 `ISASatelliteAccount` 部分中
  * **属性:** `satelliteAccountId`

#### 多个 GIA 的情形

如果用户已有 GIA 并申请 ISA:

* 用户此时将拥有 **两个 GIA 账户**,每个账户具有不同的用户名
* 与 ISA 关联的 GIA **不能**与现有 GIA 关联
* 每个 GIA 独立运行,拥有各自的凭据

#### 账户关闭规则

* 与 ISA 关联的 GIA **不能**独立于 ISA 单独关闭
* 关闭方式:提交 ISA 的关闭请求,关联的 GIA 将自动关闭
* 如果为与 ISA 关联的 GIA 提交关闭请求,将**抛出错误**

### 注册任务分配

注册任务在申请人级别分配:

#### 两个申请人的情形

* **申请人 1:** ISA 及关联 GIA
* **申请人 2:** 独立 GIA

#### 单个申请人的情形

选项包括:

* GIA + 关联 GIA(使用 `addAdditionalAcct` 创建)
* ISA 及关联 GIA

### 技术实现

| **对象**                                                                                                                              | FD                                     | FA                                     |   |   |   |   |
| ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------------------------------- | - | - | - | - |
| **[账户持有人](/account-management/schema/associatedindividual)**\*                                                             |                                        |                                        |   |   |   |   |
| email\*                                                                                                                               | Y                                      | Y                                      |   |   |   |   |
| name\* first, last                                                                                                                    | Y                                      | Y                                      |   |   |   |   |
| dateOfBirth                                                                                                                           | Y                                      | Y                                      |   |   |   |   |
| countryOfBirth                                                                                                                        | Y                                      | Y                                      |   |   |   |   |
| numDependents                                                                                                                         | Y                                      | Y                                      |   |   |   |   |
| maritalStatus                                                                                                                         | Y                                      | Y                                      |   |   |   |   |
| identification  身份证件、citizenship                                                                                                   | Y                                      | Y                                      |   |   |   |   |
| mailingAddress country\*, state, city, street1, postalCode                                                                            | Y                                      | Y                                      |   |   |   |   |
| residenceAddress  country\*, state, city, street1, postalCode                                                                         | Y                                      | Y                                      |   |   |   |   |
| phones  number, type- Mobile 必填                                                                                                      | Y                                      | Y                                      |   |   |   |   |
| employmentType                                                                                                                        | Y                                      | Y                                      |   |   |   |   |
| employmentDetails 若为 EMPLOYED 或 SELFEMPLOYED:employer、occupation、employerBusiness、employerAddress                                     | Y                                      | Y                                      |   |   |   |   |
| taxResidencies\* country 和 tin                                                                                                       | Y                                      | Y                                      |   |   |   |   |
| 税务表格  w8Ben、w9                                                                                                                      | Y                                      | Y                                      |   |   |   |   |
| IBKR 协议与披露文件                                                                                                                         | Y                                      | Y                                      |   |   |   |   |
| 地址证明和身份证明文件                                                                                                                          | Y(若 Trulioo 验证为 NoMatch)             | Y(若 Trulioo 验证为 NoMatch)             |   |   |   |   |
| **[账户信息](https://www.interactivebrokers.com/campus/ibkr-api-page/web-api-account-management/#customer-28)**                            |                                        |                                        |   |   |   |   |
| financialInformation  netWorth、liquidNetWorth、annualNetIncome                                                                        | Y                                      | Y                                      |   |   |   |   |
| sourcesOfWealth                                                                                                                       | Y                                      | Y                                      |   |   |   |   |
| investmentExperience yearsTrading、tradesPerYear、knowledgeLevel                                                                       | Y                                      | Y                                      |   |   |   |   |
| regulatoryInformation 账户持有人或直系亲属控制人、上市公司雇员或注册经纪代表                                                                                 | Y                                      | Y                                      |   |   |   |   |
| accounts\* baseCurrency、margin                                                                                                       | Y                                      | Y                                      |   |   |   |   |
| tradingPermissions\*                                                                                                                  | Y                                      | Y                                      |   |   |   |   |
| investmentObjectives                                                                                                                  | Y                                      | Y                                      |   |   |   |   |
| advisorWrapFees\*                                                                                                                     | N                                      | Y                                      |   |   |   |   |

#### 示例申请

## ISA | GBR | 完全集成(Full Integration)

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "Jane",
              "last": "Doe"
            },
            "dateOfBirth": "1995-04-28",
            "countryOfBirth": "GBR",
            "maritalStatus": "S",
            "numDependents": 0,
            "residenceAddress": {
              "street1": "1 Tester Lane",
              "city": "London",
              "state": "GB-ENG",
              "country": "GBR",
              "postalCode": "SW9 9NY"
            },
            "phones": [
              {
                "type": "Mobile",
                "number": "+4407584089999",
                "country": "GBR"
              }
            ],
            "email": "janedoe@tester.com",
            "identification": {
              "citizenship": "GBR",
              "nationalCard": "PA123456D",
              "issuingCountry": "GBR",
              "expire": false
            },
            "employmentType": "EMPLOYED",
            "employmentDetails": {
              "employer": "CHIPOTLE",
              "occupation": "EXECUTIVE",
              "employerBusiness": "FOOD AND BEVERAGE",
              "employerAddress": {
                "street1": "1 TESTER Square",
                "city": "London",
                "state": "GB-ENG",
                "country": "GBR",
                "postalCode": "W1G 0PW"
              }
            },
            "taxResidencies": [
              {
                "country": "GBR",
                "tin": "PA123456D",
                "tinType": "NonUS_NationalId"
              }
            ],
            "w8Ben": {
              "name": "Jane Doe",
              "foreignTaxId": "PA141807D",
              "tinOrExplanationRequired": true,
              "part29ACountry": "GBR",
              "cert": true,
              "blankForm": true,
              "taxFormFile": "Form5001.pdf",
              "electronicFormat": true
            },
            "externalId": "testapp1234",
            "sameMailAddress": true,
            "translated": false
          }
        ],
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "STK",
                "yearsTrading": 5,
                "tradesPerYear": 4,
                "knowledgeLevel": "Extensive"
              },
              {
                "assetClass": "OPT",
                "yearsTrading": 5,
                "tradesPerYear": 4,
                "knowledgeLevel": "Extensive"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Income",
                "percentage": 100,
                "usedForFunds": true
              }
            ],
            "netWorth": 500000,
            "liquidNetWorth": 500000,
            "annualNetIncome": 250000,
            "translated": false
          }
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "ControlPubTraded",
                "status": false
              },
              {
                "code": "EmployeePubTrade",
                "status": false
              },
              {
                "code": "AFFILIATION",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "testapp1234",
      "type": "INDIVIDUAL",
      "prefix": "nvest",
      "email": "janedoe@tester.com",
      "mdStatusNonPro": true
    },
    "accounts": [
      {
        "investmentObjectives": [
          "Speculation"
        ],
        "tradingPermissions": [
          {
            "country": "ALL",
            "product": "STOCKS"
          }
        ],
        "advisorWrapFees": {
          "strategy": "NO_FEE"
        },
        "externalId": "testapp1234",
        "baseCurrency": "GBP",
        "multiCurrency": false,
        "margin": "Cash",
        "ira": true,
        "iraType": "ISA"
      }
    ],
    "users": [
      {
        "externalUserId": "testapp1234",
        "externalIndividualId": "testapp1234",
        "prefix": "nvest"
      }
    ],
    "documents": [
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form5001.pdf",
          "fileLength": 67700,
          "sha1Checksum": "D8AA699678D12DE6AC468A864D4FAE7999AA904B"
        },
        "formNumber": 5001,
        "validAddress": false,
        "execLoginTimestamp": 1731406668576,
        "execTimestamp": 1731406668576
      },
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form2109.pdf",
          "fileLength": 15697,
          "sha1Checksum": "BF01D3C5B2B7BC6CA90A4051636051A828FD735F"
        },
        "formNumber": 2109,
        "validAddress": false,
        "execLoginTimestamp": 20240117041717,
        "execTimestamp": 20240117041717
      },
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form3024.pdf",
          "fileLength": 67600,
          "sha1Checksum": "274FA053D7E4080F0AD429787B9F94ABDF5498D7"
        },
        "formNumber": 3024,
        "validAddress": false,
        "execLoginTimestamp": 20150716015642,
        "execTimestamp": 20150716152843
      },
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form4319.pdf",
          "fileLength": 472704,
          "sha1Checksum": "485e44e6bc1e969ee1888fbf12bc957d7d41a182"
        },
        "formNumber": 4319,
        "validAddress": false,
        "execLoginTimestamp": 1731406668576,
        "execTimestamp": 1731406668576
      },
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form4376.pdf",
          "fileLength": 118429,
          "sha1Checksum": "67D8506963789C3A2DA7B68F134D8F3F2515AFBC"
        },
        "formNumber": 4376,
        "validAddress": false,
        "execLoginTimestamp": 1731406668576,
        "execTimestamp": 1731406668576
      },
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form4547.pdf",
          "fileLength": 409788,
          "sha1Checksum": "C7A601FD4C746EFC8767FCE886B03782A5C89A1C"
        },
        "formNumber": 4547,
        "validAddress": false,
        "execLoginTimestamp": 1731406668576,
        "execTimestamp": 1731406668576
      },
      {
        "signedBy": [
          "Jane Doe"
        ],
        "attachedFile": {
          "fileName": "Form4548.pdf",
          "fileLength": 416100,
          "sha1Checksum": "5FFF4BFEDD2F75A63EF493BB9F6ADEA63EBAF2A6"
        },
        "formNumber": 4548,
        "validAddress": false,
        "execLoginTimestamp": 1731406668576,
        "execTimestamp": 1731406668576
      }
    ],
    "translation": false
  }
}
```

## ISA | GBR | Hybrid - 全部信息

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "Jane",
              "last": "Doe"
            },
            "dateOfBirth": "1995-04-28",
            "countryOfBirth": "GBR",
            "maritalStatus": "S",
            "numDependents": 0,
            "residenceAddress": {
              "street1": "1 Tester Lane",
              "city": "London",
              "state": "GB-ENG",
              "country": "GBR",
              "postalCode": "SW9 9NY"
            },
            "phones": [
              {
                "type": "Mobile",
                "number": "+4407584089999",
                "country": "GBR"
              }
            ],
            "email": "janedoe@tester.com",
            "identification": {
              "citizenship": "GBR",
              "nationalCard": "PA123456D",
              "issuingCountry": "GBR",
              "expire": false
            },
            "employmentType": "EMPLOYED",
            "employmentDetails": {
              "employer": "CHIPOTLE",
              "occupation": "EXECUTIVE",
              "employerBusiness": "FOOD AND BEVERAGE",
              "employerAddress": {
                "street1": "1 TESTER Square",
                "city": "London",
                "state": "GB-ENG",
                "country": "GBR",
                "postalCode": "W1G 0PW"
              }
            },
            "taxResidencies": [
              {
                "country": "GBR",
                "tin": "PA123456D",
                "tinType": "NonUS_NationalId"
              }
            ],
            "w8Ben": {
              "name": "Jane Doe",
              "foreignTaxId": "PA141807D",
              "tinOrExplanationRequired": true,
              "part29ACountry": "GBR",
              "cert": true,
              "blankForm": true,
              "taxFormFile": "Form5001.pdf",
              "electronicFormat": true
            },
            "externalId": "testapp1234",
            "sameMailAddress": true,
            "translated": false
          }
        ],
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "STK",
                "yearsTrading": 5,
                "tradesPerYear": 4,
                "knowledgeLevel": "Extensive"
              },
              {
                "assetClass": "OPT",
                "yearsTrading": 5,
                "tradesPerYear": 4,
                "knowledgeLevel": "Extensive"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Income",
                "percentage": 100,
                "usedForFunds": true
              }
            ],
            "netWorth": 500000,
            "liquidNetWorth": 500000,
            "annualNetIncome": 250000,
            "translated": false
          }
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "ControlPubTraded",
                "status": false
              },
              {
                "code": "EmployeePubTrade",
                "status": false
              },
              {
                "code": "AFFILIATION",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "testapp1234",
      "type": "INDIVIDUAL",
      "prefix": "nvest",
      "email": "janedoe@tester.com",
      "mdStatusNonPro": true
    },
    "accounts": [
      {
        "investmentObjectives": [
          "Speculation"
        ],
        "tradingPermissions": [
          {
            "country": "ALL",
            "product": "STOCKS"
          }
        ],
        "advisorWrapFees": {
          "strategy": "NO_FEE"
        },
        "externalId": "testapp1234",
        "baseCurrency": "GBP",
        "multiCurrency": false,
        "margin": "Cash",
        "ira": true,
        "iraType": "ISA"
      }
    ],
    "users": [
      {
        "externalUserId": "testapp1234",
        "externalIndividualId": "testapp1234",
        "prefix": "nvest"
      }
    ],
    "translation": false
  }
}
```

---

## JISA(Junior Individual Savings Account,儿童个人储蓄账户)

与 ISA 不同,JISA **不**强制与 GIA 进行账户关联。但是,JISA 申请需要两组联系人信息:

#### 1. 账户持有人详细信息

* `accountHolderDetails` 部分反映拥有该账户的**未成年人联系人(Junior Contact,minor)**

#### 2. 注册联系人(Registered Contact)

* `associatedIndividual` 部分包含监督或管理该账户的个人(父母/监护人)的信息

### 技术实现

## Junior ISA 账户的必填字段

| **对象**                                                                                                                              | FD                                     | FA                                     |   |   |   |   |
| ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------------------------------- | - | - | - | - |
| **未成年人联系人(Junior Contact)信息**                                                                                                      | Y                                      | Y                                      |   |   |   |   |
| name\* first, last                                                                                                                    | Y                                      | Y                                      |   |   |   |   |
| residenceAddress  country\*, state, city, street1, postalCode                                                                         | Y                                      | Y                                      |   |   |   |   |
| mailingAddress  country\*, state, city, street1, postalCode                                                                           | Y                                      | Y                                      |   |   |   |   |
| dateOfBirth                                                                                                                           | Y                                      | Y                                      |   |   |   |   |
| countryOfBirth                                                                                                                        | Y                                      | Y                                      |   |   |   |   |
| identification  身份证件、citizenship                                                                                                   | Y                                      | Y                                      |   |   |   |   |
| taxResidencies\* country 和 tin                                                                                                       | Y                                      | Y                                      |   |   |   |   |
| sourcesOfWealth                                                                                                                       | Y                                      | Y                                      |   |   |   |   |
| 税务表格  w8Ben                                                                                                                         |                                        |                                        |   |   |   |   |
| **注册联系人(Registered Contact)**                                                                                                      |                                        |                                        |   |   |   |   |
| email\*                                                                                                                               | Y                                      | Y                                      |   |   |   |   |
| name\* first, last                                                                                                                    | Y                                      | Y                                      |   |   |   |   |
| dateOfBirth                                                                                                                           | Y                                      | Y                                      |   |   |   |   |
| countryOfBirth                                                                                                                        | Y                                      | Y                                      |   |   |   |   |
| mailingAddress country\*, state, city, street1, postalCode                                                                            | Y                                      | Y                                      |   |   |   |   |
| residenceAddress  country\*, state, city, street1, postalCode                                                                         | Y                                      | Y                                      |   |   |   |   |
| identification  身份证件、citizenship                                                                                                   |                                        |                                        |   |   |   |   |
| phones  number, type- Mobile 必填                                                                                                      | Y                                      | Y                                      |   |   |   |   |
| employmentType                                                                                                                        | Y                                      | Y                                      |   |   |   |   |
| employmentDetails 若为 EMPLOYED 或 SELFEMPLOYED:employer、occupation、employerBusiness、employerAddress                                     | Y                                      | Y                                      |   |   |   |   |
| IBKR 协议与披露文件                                                                                                                         | Y                                      | Y                                      |   |   |   |   |
| 地址证明和身份证明文件                                                                                                                          | Y(若 Trulioo 验证为 NoMatch)             | Y(若 Trulioo 验证为 NoMatch)             |   |   |   |   |
| **[账户信息](https://www.interactivebrokers.com/campus/ibkr-api-page/web-api-account-management/#customer-28)**                            |                                        |                                        |   |   |   |   |
| financialInformation  netWorth、liquidNetWorth、annualNetIncome                                                                        | Y                                      | Y                                      |   |   |   |   |
| investmentExperience yearsTrading、tradesPerYear、knowledgeLevel                                                                       | Y                                      | Y                                      |   |   |   |   |
| regulatoryInformation 账户持有人或直系亲属控制人、上市公司雇员或注册经纪代表                                                                                 | Y                                      | Y                                      |   |   |   |   |
| accounts\* baseCurrency、margin                                                                                                       | Y                                      | Y                                      |   |   |   |   |
| tradingPermissions\*                                                                                                                  | Y                                      | Y                                      |   |   |   |   |
| investmentObjectives                                                                                                                  | Y                                      | Y                                      |   |   |   |   |
| advisorWrapFees\*                                                                                                                     | Y                                      | Y                                      |   |   |   |   |
| title code                                                                                                                            | Y                                      | Y                                      |   |   |   |   |

#### 示例申请

## JISA | GBR | 完全集成(Full Integration)

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "Junior",
              "last": "Contact"
            },
            "dateOfBirth": "2022-12-20",
            "countryOfBirth": "GBR",
            "residenceAddress": {
              "street1": "24 TESTER LANE",
              "city": "LONDON",
              "state": "GB-LND",
              "country": "GB",
              "postalCode": "BR2 9FR"
            },
            "identification": {
              "citizenship": "GBR",
              "nationalCard": "NB123456C",
              "issuingCountry": "GBR",
              "expire": false
            },
            "taxResidencies": [
              {
                "country": "GBR",
                "tin": "NB123456C",
                "tinType": "NonUS_NationalId"
              }
            ],
            "w8Ben": {
              "localTaxForms": [
                {
                  "taxAuthority": "CANADA_TA",
                  "qualified": true,
                  "treatyCountry": "GBR"
                },
                {
                  "taxAuthority": "AUSTRALIA_TA",
                  "qualified": true,
                  "treatyCountry": "GBR"
                }
              ],
              "name": "Junior Contact",
              "foreignTaxId": "NB400056C",
              "tinOrExplanationRequired": true,
              "part29ACountry": "GBR",
              "cert": true,
              "signatureType": "Electronic",
              "blankForm": true,
              "taxFormFile": "Form5001.pdf",
              "electronicFormat": true
            },
            "externalId": "tester123",
            "sameMailAddress": false,
            "titles": [
              {
                "code": "Account Holder"
              }
            ],
            "authorizedPerson": false
          }
        ],
        "associatedIndividual": {
          "name": {
            "first": "Registered",
            "last": "Contact"
          },
          "dateOfBirth": "1963-12-20",
          "countryOfBirth": "GBR",
          "residenceAddress": {
            "street1": "24 TESTER LANE",
            "city": "LONDON",
            "state": "GB-LND",
            "country": "GB",
            "postalCode": "BR2 9FR"
          },
          "phones": [
            {
              "type": "Mobile",
              "number": "447483849999",
              "country": "GBR",
              "verified": false
            }
          ],
          "email": "DAM41832012@aol.com",
          "identification": {
            "citizenship": "GBR",
            "nationalCard": "NB400056A",
            "issuingCountry": "GBR",
            "expire": false
          },
          "employmentType": "EMPLOYED",
          "employmentDetails": {
            "employer": "Crown Prosecution Service ",
            "occupation": "Other",
            "description": "CIVIL",
            "employerBusiness": "Community/Social Service",
            "employerAddress": {
              "country": "GBR"
            }
          },
          "externalId": "tester123_rc",
          "sameMailAddress": true,
          "titles": [
            {
              "code": "Registered Contact"
            }
          ],
          "authorizedPerson": false
        },
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "STK",
                "yearsTrading": 11,
                "tradesPerYear": 27,
                "knowledgeLevel": "Extensive"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Income",
                "percentage": 10,
                "usedForFunds": true
              },
              {
                "sourceType": "SOW-IND-Pension",
                "percentage": 90,
                "usedForFunds": true
              }
            ],
            "netWorth": 375000,
            "liquidNetWorth": 70000,
            "annualNetIncome": 41600,
            "translated": false
          }
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "EmployeePubTrade",
                "status": false
              },
              {
                "code": "ControlPubTraded",
                "status": false
              },
              {
                "code": "AFFILIATION",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "tester123",
      "type": "INDIVIDUAL",
      "prefix": "skm",
      "email": "DAM41832012@aol.com",
      "mdStatusNonPro": false
    },
    "accounts": [
      {
        "investmentObjectives": [
          "Growth"
        ],
        "tradingPermissions": [
          {
            "exchangeGroup": "US-SEC"
          },
          {
            "exchangeGroup": "EURONEXT-FUND"
          }
        ],
        "externalId": "tester123",
        "baseCurrency": "GBP",
        "multiCurrency": true,
        "margin": "Cash",
        "ira": true,
        "iraType": "JISA",
        "drip": false
      }
    ],
    "users": [
      {
        "externalUserId": "tester123",
        "externalIndividualId": "tester123",
        "prefix": "skm"
      }
    ],
    "documents": [
      {
        "signedBy": [
          "Registered Contact"
        ],
        "attachedFile": {
          "fileName": "Form5001.pdf",
          "fileLength": 67700,
          "sha1Checksum": "d8aa699678d12de6ac468a864d4fae7999aa904b"
        },
        "formNumber": 5001,
        "validAddress": false,
        "execLoginTimestamp": 20250511201657
      },
      {
        "signedBy": [
          "Registered Contact"
        ],
        "attachedFile": {
          "fileName": "Form3083.pdf",
          "fileLength": 557790,
          "sha1Checksum": "9C79DB3DF0925D126541817F2BBC7418BBD3EC4E"
        },
        "formNumber": 3083,
        "validAddress": false,
        "execLoginTimestamp": 20250511201657
      },
      {
        "signedBy": [
          "Registered Contact"
        ],
        "attachedFile": {
          "fileName": "Form4070.pdf",
          "fileLength": 27117,
          "sha1Checksum": "3BF982D0D81F0F6B1BBD37E9789EE6585F46F8DC"
        },
        "formNumber": 4070,
        "validAddress": false,
        "execLoginTimestamp": 20250511201657
      },
      {
        "signedBy": [
          "Registered Contact"
        ],
        "attachedFile": {
          "fileName": "Form9130.pdf",
          "fileLength": 252630,
          "sha1Checksum": "3F6E0751854D0BB7717AB4E954D97EDF31FEE6EA"
        },
        "formNumber": 9130,
        "validAddress": false,
        "execLoginTimestamp": 20250511201657
      }
    ],
    "translation": false
  }
}
```

## JISA | GBR | Hybrid - 全部信息

```
{
  "application": {
    "customer": {
      "accountHolder": {
        "accountHolderDetails": [
          {
            "name": {
              "first": "Junior",
              "last": "Contact"
            },
            "dateOfBirth": "2022-12-20",
            "countryOfBirth": "GBR",
            "residenceAddress": {
              "street1": "24 TESTER LANE",
              "city": "LONDON",
              "state": "GB-LND",
              "country": "GB",
              "postalCode": "BR2 9FR"
            },
            "identification": {
              "citizenship": "GBR",
              "nationalCard": "NB123456C",
              "issuingCountry": "GBR",
              "expire": false
            },
            "taxResidencies": [
              {
                "country": "GBR",
                "tin": "NB123456C",
                "tinType": "NonUS_NationalId"
              }
            ],
            "w8Ben": {
              "localTaxForms": [
                {
                  "taxAuthority": "CANADA_TA",
                  "qualified": true,
                  "treatyCountry": "GBR"
                },
                {
                  "taxAuthority": "AUSTRALIA_TA",
                  "qualified": true,
                  "treatyCountry": "GBR"
                }
              ],
              "name": "Junior Contact",
              "foreignTaxId": "NB400056C",
              "tinOrExplanationRequired": true,
              "part29ACountry": "GBR",
              "cert": true,
              "signatureType": "Electronic",
              "blankForm": true,
              "taxFormFile": "Form5001.pdf",
              "electronicFormat": true
            },
            "externalId": "tester123",
            "sameMailAddress": false,
            "titles": [
              {
                "code": "Account Holder"
              }
            ],
            "authorizedPerson": false
          }
        ],
        "associatedIndividual": {
          "name": {
            "first": "Registered",
            "last": "Contact"
          },
          "dateOfBirth": "1963-12-20",
          "countryOfBirth": "GBR",
          "residenceAddress": {
            "street1": "24 TESTER LANE",
            "city": "LONDON",
            "state": "GB-LND",
            "country": "GB",
            "postalCode": "BR2 9FR"
          },
          "phones": [
            {
              "type": "Mobile",
              "number": "447483849999",
              "country": "GBR",
              "verified": false
            }
          ],
          "email": "DAM41832012@aol.com",
          "identification": {
            "citizenship": "GBR",
            "nationalCard": "NB400056A",
            "issuingCountry": "GBR",
            "expire": false
          },
          "employmentType": "EMPLOYED",
          "employmentDetails": {
            "employer": "Crown Prosecution Service ",
            "occupation": "Other",
            "description": "CIVIL",
            "employerBusiness": "Community/Social Service",
            "employerAddress": {
              "country": "GBR"
            }
          },
          "externalId": "tester123_rc",
          "sameMailAddress": true,
          "titles": [
            {
              "code": "Registered Contact"
            }
          ],
          "authorizedPerson": false
        },
        "financialInformation": [
          {
            "investmentExperience": [
              {
                "assetClass": "STK",
                "yearsTrading": 11,
                "tradesPerYear": 27,
                "knowledgeLevel": "Extensive"
              }
            ],
            "sourcesOfWealth": [
              {
                "sourceType": "SOW-IND-Income",
                "percentage": 10,
                "usedForFunds": true
              },
              {
                "sourceType": "SOW-IND-Pension",
                "percentage": 90,
                "usedForFunds": true
              }
            ],
            "netWorth": 375000,
            "liquidNetWorth": 70000,
            "annualNetIncome": 41600,
            "translated": false
          }
        ],
        "regulatoryInformation": [
          {
            "regulatoryDetail": [
              {
                "code": "EmployeePubTrade",
                "status": false
              },
              {
                "code": "ControlPubTraded",
                "status": false
              },
              {
                "code": "AFFILIATION",
                "status": false
              }
            ],
            "translated": false
          }
        ]
      },
      "externalId": "tester123",
      "type": "INDIVIDUAL",
      "prefix": "skm",
      "email": "DAM41832012@aol.com",
      "mdStatusNonPro": false
    },
    "accounts": [
      {
        "investmentObjectives": [
          "Growth"
        ],
        "tradingPermissions": [
          {
            "exchangeGroup": "US-SEC"
          },
          {
            "exchangeGroup": "EURONEXT-FUND"
          }
        ],
        "externalId": "tester123",
        "baseCurrency": "GBP",
        "multiCurrency": true,
        "margin": "Cash",
        "ira": true,
        "iraType": "JISA",
        "drip": false
      }
    ],
    "users": [
      {
        "externalUserId": "tester123",
        "externalIndividualId": "tester123",
        "prefix": "skm"
      }
    ],
       "translation": false
  }
}
```
