# 银行指令(Bank Instructions)

本节将介绍如何使用 Web API 创建、查看和删除银行指令。请注意,与使用 IBKR Hosted Application 所支持的方法相比,通过 API 可用的选项较为有限。

### 添加银行指令

`/gw/api/v1/bank-instructions` 端点可用于向现有 IBKR 经纪账户添加银行指令。这些银行指令可用于便利日后的资金划转。

## ACH\_INSTRUCTION

为由 IBKR 发起的自动清算所(ACH)转账创建银行指令。

1. 交易对手方将向 IBKR 提供银行账户信息(ach\_instruction)。
2. IBKR 将提供实时响应,包括唯一的 IBKR **id** 和 PENDING 状态。
3. IBKR 使用 JPM 的账户验证服务(Account Validation Service,AVS)验证 ACH 指令,该服务以 EWS 的 PaymentChek 和账户所有权验证(Account Ownership Authentication)服务作为数据源。
   * 验证可能需要 7-15 分钟。
   * 验证完成后,将通过 [/callback](https://www.interactivebrokers.com/campus/ibkr-api-page/webapi-ref-staging/#tag/Account-Management-Accounts/paths/~1gw~1api~1v1~1accounts~1%7BaccountId%7D~1login-messages/get) 发送通知。或者,也可以使用 [/gw/api/v1/client-instructions/\{clientInstructionId}](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/get-client-instructions) 端点轮询状态。
4. 验证完成后,状态将更新为以下之一:
   * **PROCESSED:** ACH 指令已处理。ACH 指令可用于通过 Web API 或 IBKR Portal(Transfer & Pay)进行[存款](/account-management/funds-and-banking/cash-transfer/introduction)和[取款](/account-management/funds-and-banking/cash-transfer/introduction)。
   * **PENDING**:EWS 验证正在进行中。
   * **PENDING\_VERIFICATION:** IBKR 会自动向所提供的银行账户发送微量金额。交易对手方需要使用 `"instructionType":"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION"` 向 IBKR 提交微量金额。
   * 此步骤完成后,状态将更新为 PROCESSED。这些银行指令可用于通过 Web API 或 IBKR Portal(Transfer & Pay)提交[存款](/account-management/funds-and-banking/cash-transfer/introduction)和[取款](/account-management/funds-and-banking/cash-transfer/introduction)。
   * **REJECTED :** 无法使用 EWS 验证该指令。要继续使用 ACH,客户需要登录 IBKR Portal,通过 IBKR 托管的 Portal 添加指令。或者,用户需要改用其他入金方式。

### Schema

| 名称                | 类型                             | 描述                                                                                                                                                                                                                                              |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientInstructionId | Number;最多 20 个字符。          | 与请求关联的唯一标识符。——**clientInstructionId** 不能重复使用。——IBKR 希望按顺序设定 **clientInstructionId**,例如 1、2、3、4 或 100、101、102、103,而不是 777、589、123。                                                               |
| bankInstructionCode | USACH                            | 静态值,始终为 USACH                                                                                                                                                                                                                              |
| achType             | DEBIT\_CREDIT DEBIT CREDIT       | DEBIT\_CREDIT:用于存款和取款的 ACH 指令。DEBIT:仅用于存款的 ACH 指令。CREDIT:仅用于取款的 ACH 指令。                                                                                                                                              |
| bankInstructionName | String;最多 32 个字符           | 指令的名称。由交易对手方定义。                                                                                                                                                                                                                    |
| bankName            | String                           | 银行名称。                                                                                                                                                                                                                                        |
| bankRoutingNumber   | 数值;最多 9 个字符。             | 与银行关联的路由号。                                                                                                                                                                                                                              |
| bankAccountNumber   | String;最多 32 个字符           | 银行账号。                                                                                                                                                                                                                                        |
| bankAccountTypeCode | 1 2                              | 1:支票账户 2:储蓄账户  如果未指定,默认为支票账户。                                                                                                                                                                                              |
| currency            | USD                              | 所划转资产的货币。目前仅支持 USD。                                                                                                                                                                                                                |
| accountId           | String;最多 32 个字符           | 与客户账户关联的 IBKR 账户 ID。                                                                                                                                                                                                                   |

### 示例

```
POST /gw/api/v1/bank-instructions

{"instructionType": "ACH_INSTRUCTION",
"instruction": 

{
"clientInstructionId": "1012983",
"bankInstructionCode": "USACH",
"achType": "DEBIT_CREDIT",
"bankInstructionName": "TestInstr",
"currency": "USD",
"accountId": "U223454",
"clientAccountInfo": {
"bankRoutingNumber": "202012983",
"bankAccountNumber": "101267576983",
"bankName": "JPM Chase",
"bankAccountTypeCode": 1
}
}
}
```

## TRADITIONAL\_BANK\_INSTRUCTION\_VERIFICATION

验证通过 Web API 发起的 ACH 指令的微量存款。

1. 我们使用 EWS(Early Warning System,早期预警系统)来验证 ACH 指令。
2. 在 1-3 个工作日内,客户的银行账户将收到两笔随机的、各少于 1 美元的贷记(存款)以及相应的借记(取款)。
3. 客户需要留意其银行账户中的这些交易,因为确认该入金指令时需要用到它们。请注意,这些交易可能发生在不同的日期。
4. 客户获得这些金额后,提交 `traditional_bank_instruction_verification` 请求以验证这些金额。验证通过后,客户即可使用 ACH 指令进行存款和取款请求。

### Schema

| 名称                 | 类型                       | 描述                                                                                                                                                                                                                                              |
| -------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientInstructionId  | Number;最多 20 个字符。   | 与请求关联的唯一标识符。——**clientInstructionId** 不能重复使用。——IBKR 希望按顺序设定 **clientInstructionId**,例如 1、2、3、4 或 100、101、102、103,而不是 777、589、123。                                                               |
| pendingInstructionId | number                     | 待处理交易的指令 ID。                                                                                                                                                                                                                             |
| bankInstructionName  | String;最多 32 个字符     | 在 IBKR 处的银行指令名称。应与 `achInstruction` 请求中提供的 `bankInstructionName` 一致。                                                                                                                                                         |
| accountId            | String;最多 32 个字符     | 客户在 IBKR 的账号。                                                                                                                                                                                                                              |
| bankInstructionCode  | ACHUS                      | 静态值,始终为 ACHUS                                                                                                                                                                                                                              |
| creditAmount1        | number                     | IBKR 贷记/借记到银行账户的现金金额。金额发送的顺序无关紧要。确认这些贷记金额允许尝试 3 次。                                                                                                                                                       |
| creditAmount2        | number                     | IBKR 贷记/借记到银行账户的现金金额。金额发送的顺序无关紧要。确认这些贷记金额允许尝试 3 次。                                                                                                                                                       |

### 示例

```
POST /gw/api/v1/bank-instructions

{
"instructionType": "TRADITIONAL_BANK_INSTRUCTION_VERIFICATION",
"instruction": {
"clientInstructionId": 7013057,
"bankInstructionCode": "USACH",
"bankInstructionName": "ACH-Tst1Random172",
"accountId": "U117717",
"pendingInstructionId": 43086786,
"creditAmount1": 0.32,
"creditAmount2": 0.46
}
}
```

## EDDA\_INSTRUCTION

为电子直接扣账授权(Electronic Direct Debit Authorization,EDDA)创建银行指令。EDDA 可用于在香港银行账户与 IBKR 经纪账户之间划转 HKD 和 CNY。

电子直接扣账授权,适用于持有香港银行账户的个人。

`/gw/api/v1/participating-banks` 端点可用于查看支持与 Interactive Brokers 建立 **`eDDA`** 转账连接的参与银行列表,其中包含 bankClearingCode、BIC 和银行名称。

### Schema

| 名称                             | 类型                                     | 描述                                                                                                                                                                                                                                              |
| -------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientInstructionId              | Number;最多 20 个字符。                 | 与请求关联的唯一标识符。——**clientInstructionId** 不能重复使用。——IBKR 希望按顺序设定 **clientInstructionId**,例如 1、2、3、4 或 100、101、102、103,而不是 777、589、123。                                                               |
| bankInstructionName              | String;最多 100 个字符                  | 指令的名称。由交易对手方定义。                                                                                                                                                                                                                    |
| accountId                        | String;最多 32 个字符                   | 客户在 IBKR 的账号。                                                                                                                                                                                                                              |
| bankBranchCode                   | String;最多 3 个字符                    | 与银行关联的分行代码。                                                                                                                                                                                                                            |
| bankAccountNumber                | String;最多 32 个字符                   | 银行账号。                                                                                                                                                                                                                                        |
| bankClearingCode                 | String;最多 3 个字符                    | 可使用 `/gw/api/v1/participating-banks` 端点获取 bankClearingCode。                                                                                                                                                                               |
| debtorIdentificationDocumentType | hkid passport chinaId hkMacaoEntryPermit | 身份证件类型                                                                                                                                                                                                                                      |

### 示例

```
POST /gw/api/v1/bank-instructions

{
"instructionType": "EDDA_INSTRUCTION",
"instruction": {
"clientInstructionId": 7012743,
"bankInstructionName": "My EDDA Instructions",
"currency": "CNH",
"accountId": "U8072517",
"bankBranchCode": "003",
"bankAccountNumber": "132456",
"bankClearingCode": "003",
"debtorIdentificationDocumentType": "hkId"
}
```

## PREDEFINED\_DESTINATION\_INSTRUCTION

该服务可用于为取款创建固定的银行指令。仅在与 clientID 关联的所有账户都在同一家银行持有银行账户时可用。

1. 创建固定的电汇指令。
2. 如果所有客户都在同一家银行开户,IB 将在后端对该银行进行硬编码,并且仅将客户的账号提交给 IB。

### Schema

| 名称                  | 类型                                                                                                                                   | 描述                                                                                                                                                                                                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientInstructionId   | Number;最多 20 个字符。                                                                                                               | 与请求关联的唯一标识符。——**clientInstructionId** 不能重复使用。——IBKR 希望按顺序设定 **clientInstructionId**,例如 1、2、3、4 或 100、101、102、103,而不是 777、589、123。                                                                                                                                         |
| bankInstructionName   | String;最多 100 个字符                                                                                                                | 指令的名称。由交易对手方定义。                                                                                                                                                                                                                                                                                              |
| accountId             | String                                                                                                                                 | 客户在 IBKR 的账号。                                                                                                                                                                                                                                                                                                        |
| bankInstructionMethod | ACH WIRE SEPA CPA                                                                                                                      | 静态值,始终为 ACHUS                                                                                                                                                                                                                                                                                                        |
| currency              | 货币代码(3 位)。可用货币见[此处](https://www.interactivebrokers.com/en/support/fund-my-account.php)。                                | 银行指令所用的货币。                                                                                                                                                                                                                                                                                                        |
| name                  | String;最多 100 个字符                                                                                                                | 金融机构的名称。                                                                                                                                                                                                                                                                                                            |
| branchCode            | String;最多 32 个字符                                                                                                                 |                                                                                                                                                                                                                                                                                                                             |
| branchCodeType        | BSB\_AUD BANK\_CODE\_CAD NONE                                                                                                          | 银行州分行代码。                                                                                                                                                                                                                                                                                                            |
| identifier            | String;最多 16 个字符                                                                                                                 |                                                                                                                                                                                                                                                                                                                             |
| identifierType        | IFSC BIC                                                                                                                               | **IFSC**:印度金融系统代码(Indian Financial System Code,IFSC)是一个 11 位的字母数字代码,用于标识印度的银行分行。**BIC**:银行识别码(Bank Identifier Code),是标识金融机构的唯一代码,用于国际汇款。BIC 也被称为 SWIFT 代码或 SWIFT 地址。                                                                      |
| clientAccountId       | String;最多 32 个字符                                                                                                                 | 在金融机构的账号                                                                                                                                                                                                                                                                                                            |

### 示例

```
POST /gw/api/v1/bank-instructions

{
"instructionType": "PREDEFINED_DESTINATION_INSTRUCTION",
"instruction": {
"clientInstructionId": 7013053,
"bankInstructionName": "Test Wire Instructions",
"bankInstructionMethod": "WIRE",
"accountId": "U123456",
"currency": "USD",
"financialInstitution": {
"name": "Test Bank",
"branchCode": "0",
"branchCodetype": "BSB_AUD",
"identifier": "SBIN001000",
"identifierType": "BIC",
"clientAccountId": "132456789"
}
}
}
```

### 查看已保存的银行指令

在发起存款或取款时,用户可以保存银行信息,也称为 `bankInstructionName`。如果保存了银行信息,用户在以后的入金请求中可以直接引用该银行信息,而无需重新输入。`/gw/api/v1/bank-instructions/query` 端点可按 `accountId` 和 `bankInstructionMethod` 查看已存档的银行指令列表。响应将返回对应的 `bankInstructionName`、`bankRoutingNumber`、`currency` 以及 `bankAccountNumber` 的最后 4 位(如适用)。

## 示例

```
POST /gw/api/v1/bank-instructions/query

{
  "instructionType": "QUERY_BANK_INSTRUCTION",
    "instruction": {
    "clientInstructionId": "1012983",
    "accountId": "U46377",
    "bankInstructionMethod": "ACH"
  }
}
```

### 删除银行指令

`/gw/api/v1/bank-instructions` 可用于按 `bankInstructionName`、`currency` 和 `bankInstructionMethod` 删除现有账户的银行指令(`bankInstructionName`)。用户同时最多只能拥有 6 个生效的银行指令。

## 示例

```
POST /gw/api/v1/bank-instructions

{
  "instructionType": "DELETE_BANK_INSTRUCTION",
  "instruction": {
    "clientInstructionId": 7013055,
    "accountId": "U46377",
    "bankInstructionName": "Test Delete",
    "bankInstructionMethod": "WIRE",
    "currency": "USD"
  }
}
```
