# 管理银行指令

POST https://localhost:5000/gw/api/v1/bank-instructions
Content-Type: application/json

通过 accountId 创建或删除银行指令。“创建”支持 ACH、开放银行、出金（针对已有的开放银行入金）、传统银行指令验证、预定义目标以及 eDDA。**权限范围**：`bank-instructions.write`**安全策略**：`Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/create-bank-instructions

## 认证

- `Authorization` 请求头 (bearer token, required) — RS256 签名的 JWT 访问令牌，使用您注册的私钥进行签名。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 路径参数

- `client-id` (string, required) — 客户端的 clientId

### 请求体 (application/json)

该端点需要传入一个对象。

- `instructionType` (enum, required)
  - Allowed values: `ACH_INSTRUCTION`, `OPEN_BANKING_INSTRUCTION`, `WITHDRAWAL_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `DELETE_BANK_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `EDDA_INSTRUCTION`
- `instruction` (GwApiV1BankInstructionsPostRequestBodyContentApplicationJsonSchemaInstruction, required)

## 响应

### 202

异步接受创建新指令的请求

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对已提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionResult, optional) — 已提交指令的结果。

## 错误

### 400 错误请求错误

返回表示错误请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 403 禁止访问错误

返回表示被禁止请求的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短、人类可读摘要。
- `status` (long, required) — HTTP 状态码。
- `detail` (string, required) — 对问题的人类可读解释。
- `instructionSetId` (long, required) — 对已提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionErrorResult, required) — 已提交指令的结果。

### 422 无法处理的实体错误

返回表示业务错误的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短、人类可读摘要。
- `status` (long, required) — HTTP 状态码 (422)。
- `instructionSetId` (long, required) — 对已提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionErrorResult, optional) — 已提交指令的结果。

### 500 内部服务器错误

返回表示内部服务器错误的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### GwApiV1BankInstructionsPostRequestBodyContentApplicationJsonSchemaInstruction

### InstructionResult

已提交指令的结果。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须是正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionId` (double, required) — 指令的资金与银行（Funds and Banking）标识符。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的人类可读说明（例如轮询指引）。
- `processedTimestamp` (datetime, optional) — 指令被处理的时间戳。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下出现。

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

### InstructionErrorResult

携带被拒绝指令错误详情的指令结果。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须是正数且在请求内唯一。
- `error` (InstructionErrorResultError, required) — 指令被拒绝时返回的错误详情。
- `instructionId` (double, required) — 指令的资金与银行（Funds and Banking）标识符。
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下出现。
- `description` (string, optional) — 关于结果的人类可读说明（例如轮询指引）。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `processedTimestamp` (datetime, optional) — 指令被处理的时间戳。

### TraditionalBankInstructionVerification

使用微额入金金额验证待处理银行指令的请求。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须是正数且在请求内唯一。
- `bankInstructionCode` (enum, required) — 标识银行指令类型的代码。
  - Allowed values: `USACH`, `CAACH`, `ACHUS`, `WIRE`
- `bankInstructionName` (string, required) — 标识已保存银行指令/目标的名称。
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `pendingInstructionId` (double, required) — 正在验证的待处理指令的资金与银行（Funds and Banking）标识符。
- `creditAmount1` (double, required) — 用于验证银行指令的第一笔微额入金金额；顺序不重要。
- `creditAmount2` (double, required) — 用于验证银行指令的第二笔微额入金金额；顺序不重要。

### AchInstruction

创建 ACH 银行指令以关联外部美国或加拿大银行账户的请求。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须是正数且在请求内唯一。
- `bankInstructionCode` (enum, required) — 标识银行指令类型的代码。
  - Allowed values: `CAACH`, `USACH`
- `achType` (enum, required) — ACH 授权类型（DEBIT、CREDIT 或 DEBIT_CREDIT）。
  - Allowed values: `DEBIT`, `CREDIT`, `DEBIT_CREDIT`
- `bankInstructionName` (string, required) — 标识已保存银行指令/目标的名称。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `clientAccountInfo` (AchInstructionClientAccountInfo, required) — ACH 指令的外部银行账户详情。

### OpenBankingInstruction

通过开放银行服务商关联银行账户的请求。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须是正数且在请求内唯一。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `serviceProvider` (enum, required) — 开放银行服务商。
  - Allowed values: `PLAID`
- `plaidOptions` (OpenBankingInstructionPlaidOptions, optional) — Plaid 专属选项。

### WithdrawalBankInstruction

基于已有入金关联创建出金银行指令的请求。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须是正数且在请求内唯一。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `sourceDepositInstruction` (WithdrawalBankInstructionSourceDepositInstruction, required) — 出金关联所基于的已有入金指令。

### DeleteBankInstruction

删除已保存银行指令的请求。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须是正数且在请求内唯一。
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `bankInstructionName` (string, required) — 标识已保存银行指令/目标的名称。
- `bankInstructionMethod` (enum, required) — 银行指令的入金方式/支付通道。
  - Allowed values: `WIRE`, `ACH`
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。

### PredefinedDestinationInstruction

创建预定义出金目标银行指令的请求。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须是正数且在请求内唯一。
- `bankInstructionName` (string, required) — 标识已保存银行指令/目标的名称。
- `bankInstructionMethod` (enum, required) — 银行指令的入金方式/支付通道。
  - Allowed values: `LVP`, `SEPA`, `WIRE`, `ACH`, `CPA`
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `financialInstitution` (PredefinedDestinationInstructionFinancialInstitution, required) — 目标金融机构详情。

### EddaInstruction

设置电子直接扣缴授权（eDDA）银行指令的请求。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须是正数且在请求内唯一。
- `bankInstructionName` (string, required) — 标识已保存银行指令/目标的名称。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `bankBranchCode` (string, required) — 银行分行代码。
- `bankAccountNumber` (string, required) — 银行账号。
- `bankClearingCode` (string, required) — 银行清算代码；可在 GET API 返回的参与银行列表中找到。
- `debtorIdentificationDocumentType` (enum, required) — 债务人身份证明文件的类型。
  - Allowed values: `hkId`, `passport`, `chinaId`, `hkMacaoEntryPermit`

### InstructionResultDetails

仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。

### DepositDetails

- `amount` (double, optional)
- `currency` (string, optional)
- `whenAvailable` (date, optional)
- `openBanking` (DepositDetailsOpenBanking, optional) — 仅当 bankInstructionMethod 为 OPEN_BANKING 时出现。

### InstructionErrorResultError

指令被拒绝时返回的错误详情。

- `errorCode` (string, required) — 机器可读的错误代码。
- `errorMessage` (string, required) — 人类可读的错误消息。

### AchInstructionClientAccountInfo

ACH 指令的外部银行账户详情。

- `bankRoutingNumber` (string, required) — 银行路由号码。
- `bankAccountNumber` (string, required) — 银行账号。
- `bankName` (string, required) — 银行名称。
- `bankAccountTypeCode` (enum, required) — 银行账户类型：1 = Checking，2 = Savings。如果未指定，默认为 Checking。
  - Allowed values: `0`, `1`, `2`

### OpenBankingInstructionPlaidOptions

Plaid 专属选项。

- `completionRedirectUri` (string, optional) — 这应当是一个带有自定义 scheme 的 URI，其值可以是您想要的任何值，只要不是 http 或 tel 等保留值即可。按照惯例，通常使用与应用程序名称相关联的值。
- `linkDisplayName` (string, optional) — 在 Plaid Link 界面上显示的客户名称
- `isMobileApp` (boolean, optional) — Plaid Link 会话是否在移动应用内运行。

### WithdrawalBankInstructionSourceDepositInstruction

出金关联所基于的已有入金指令。

- `type` (enum, required) — 出金所基于的源入金指令的类型（当前仅支持 OPEN_BANKING）。
  - Allowed values: `OPEN_BANKING`
- `name` (string, optional) — 源入金指令的名称。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。

### PredefinedDestinationInstructionFinancialInstitution

目标金融机构详情。

- `name` (string, required) — 金融机构的名称。
- `identifier` (string, required) — 金融机构的标识符（例如 SWIFT/BIC 或 IFSC 值）。
- `identifierType` (enum, required) — 机构标识符的类型（BIC 或 IFSC）。
  - Allowed values: `BIC`, `IFSC`
- `clientAccountId` (string, required) — 客户在该金融机构的账户标识符。
- `branchCode` (string, optional) — 金融机构的分行代码。
- `branchCodeType` (enum, optional) — 分行代码的类型。
  - Allowed values: `BSB_AUD`, `BANK_CODE_CAD`, `NONE`

### OpenBankingInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)
- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (OpenBankingInstructionResultDetailsProviderResponse, optional) — 服务商专属数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户完成关联后即不存在。

### WithdrawalInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)

### DepositDetailsOpenBanking

仅当 bankInstructionMethod 为 OPEN_BANKING 时出现。

- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (DepositDetailsOpenBankingProviderResponse, optional) — Plaid 付款发起后返回的服务商专属数据。

### OpenBankingInstructionResultDetailsProviderResponse

服务商专属数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户完成关联后即不存在。

- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

### DepositDetailsOpenBankingProviderResponse

Plaid 付款发起后返回的服务商专属数据。

- `paymentId` (string, optional)
- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

## 示例

### ACH 指令

**请求**

```json
{
  "instructionType": "ACH_INSTRUCTION",
  "instruction": {
    "accountId": "U223454",
    "achType": "DEBIT_CREDIT",
    "bankInstructionCode": "USACH",
    "bankInstructionName": "TestInstr",
    "clientAccountInfo": {
      "bankAccountNumber": "101267576983",
      "bankAccountTypeCode": 0,
      "bankName": "JPM Chase",
      "bankRoutingNumber": "202012983"
    },
    "clientInstructionId": 1012983,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "USD",
    "pendingInstructionId": 35354345
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2487,
  "instructionResult": {
    "clientInstructionId": 80009,
    "instructionType": "ACH_INSTRUCTION",
    "instructionStatus": "PENDING",
    "instructionId": 43092478
  }
}
```

**SDK 代码**

```python ACH Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions"

payload = {
    "instructionType": "ACH_INSTRUCTION",
    "instruction": {
        "accountId": "U223454",
        "achType": "DEBIT_CREDIT",
        "bankInstructionCode": "USACH",
        "bankInstructionName": "TestInstr",
        "clientAccountInfo": {
            "bankAccountNumber": "101267576983",
            "bankAccountTypeCode": 0,
            "bankName": "JPM Chase",
            "bankRoutingNumber": "202012983"
        },
        "clientInstructionId": 1012983,
        "creditAmount1": 1,
        "creditAmount2": 2,
        "currency": "USD",
        "pendingInstructionId": 35354345
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript ACH Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"ACH_INSTRUCTION","instruction":{"accountId":"U223454","achType":"DEBIT_CREDIT","bankInstructionCode":"USACH","bankInstructionName":"TestInstr","clientAccountInfo":{"bankAccountNumber":"101267576983","bankAccountTypeCode":0,"bankName":"JPM Chase","bankRoutingNumber":"202012983"},"clientInstructionId":1012983,"creditAmount1":1,"creditAmount2":2,"currency":"USD","pendingInstructionId":35354345}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go ACH Instruction
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions"

	payload := strings.NewReader("{\n  \"instructionType\": \"ACH_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U223454\",\n    \"achType\": \"DEBIT_CREDIT\",\n    \"bankInstructionCode\": \"USACH\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientAccountInfo\": {\n      \"bankAccountNumber\": \"101267576983\",\n      \"bankAccountTypeCode\": 0,\n      \"bankName\": \"JPM Chase\",\n      \"bankRoutingNumber\": \"202012983\"\n    },\n    \"clientInstructionId\": 1012983,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"USD\",\n    \"pendingInstructionId\": 35354345\n  }\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby ACH Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"ACH_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U223454\",\n    \"achType\": \"DEBIT_CREDIT\",\n    \"bankInstructionCode\": \"USACH\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientAccountInfo\": {\n      \"bankAccountNumber\": \"101267576983\",\n      \"bankAccountTypeCode\": 0,\n      \"bankName\": \"JPM Chase\",\n      \"bankRoutingNumber\": \"202012983\"\n    },\n    \"clientInstructionId\": 1012983,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"USD\",\n    \"pendingInstructionId\": 35354345\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java ACH Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"ACH_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U223454\",\n    \"achType\": \"DEBIT_CREDIT\",\n    \"bankInstructionCode\": \"USACH\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientAccountInfo\": {\n      \"bankAccountNumber\": \"101267576983\",\n      \"bankAccountTypeCode\": 0,\n      \"bankName\": \"JPM Chase\",\n      \"bankRoutingNumber\": \"202012983\"\n    },\n    \"clientInstructionId\": 1012983,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"USD\",\n    \"pendingInstructionId\": 35354345\n  }\n}")
  .asString();
```

```php ACH Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions', [
  'body' => '{
  "instructionType": "ACH_INSTRUCTION",
  "instruction": {
    "accountId": "U223454",
    "achType": "DEBIT_CREDIT",
    "bankInstructionCode": "USACH",
    "bankInstructionName": "TestInstr",
    "clientAccountInfo": {
      "bankAccountNumber": "101267576983",
      "bankAccountTypeCode": 0,
      "bankName": "JPM Chase",
      "bankRoutingNumber": "202012983"
    },
    "clientInstructionId": 1012983,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "USD",
    "pendingInstructionId": 35354345
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp ACH Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"ACH_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U223454\",\n    \"achType\": \"DEBIT_CREDIT\",\n    \"bankInstructionCode\": \"USACH\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientAccountInfo\": {\n      \"bankAccountNumber\": \"101267576983\",\n      \"bankAccountTypeCode\": 0,\n      \"bankName\": \"JPM Chase\",\n      \"bankRoutingNumber\": \"202012983\"\n    },\n    \"clientInstructionId\": 1012983,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"USD\",\n    \"pendingInstructionId\": 35354345\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift ACH Instruction
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "ACH_INSTRUCTION",
  "instruction": [
    "accountId": "U223454",
    "achType": "DEBIT_CREDIT",
    "bankInstructionCode": "USACH",
    "bankInstructionName": "TestInstr",
    "clientAccountInfo": [
      "bankAccountNumber": "101267576983",
      "bankAccountTypeCode": 0,
      "bankName": "JPM Chase",
      "bankRoutingNumber": "202012983"
    ],
    "clientInstructionId": 1012983,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "USD",
    "pendingInstructionId": 35354345
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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

### 传统银行指令验证

**请求**

```json
{
  "instructionType": "TRADITIONAL_BANK_INSTRUCTION_VERIFICATION",
  "instruction": {
    "accountId": "U117717",
    "bankInstructionCode": "USACH",
    "bankInstructionName": "ACH-Tst1Random172",
    "clientInstructionId": 7013057,
    "creditAmount1": 0.32,
    "creditAmount2": 0.46,
    "pendingInstructionId": 43086786
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2614,
  "instructionResult": {
    "clientInstructionId": 7008152,
    "instructionType": "TRADITIONAL_BANK_INSTRUCTION_VERIFICATION",
    "instructionStatus": "PENDING",
    "instructionId": 43092590
  }
}
```

**SDK 代码**

```python Traditional Bank Instruction Verification
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions"

payload = {
    "instructionType": "TRADITIONAL_BANK_INSTRUCTION_VERIFICATION",
    "instruction": {
        "accountId": "U117717",
        "bankInstructionCode": "USACH",
        "bankInstructionName": "ACH-Tst1Random172",
        "clientInstructionId": 7013057,
        "creditAmount1": 0.32,
        "creditAmount2": 0.46,
        "pendingInstructionId": 43086786
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Traditional Bank Instruction Verification
const url = 'https://localhost:5000/gw/api/v1/bank-instructions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION","instruction":{"accountId":"U117717","bankInstructionCode":"USACH","bankInstructionName":"ACH-Tst1Random172","clientInstructionId":7013057,"creditAmount1":0.32,"creditAmount2":0.46,"pendingInstructionId":43086786}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Traditional Bank Instruction Verification
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions"

	payload := strings.NewReader("{\n  \"instructionType\": \"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION\",\n  \"instruction\": {\n    \"accountId\": \"U117717\",\n    \"bankInstructionCode\": \"USACH\",\n    \"bankInstructionName\": \"ACH-Tst1Random172\",\n    \"clientInstructionId\": 7013057,\n    \"creditAmount1\": 0.32,\n    \"creditAmount2\": 0.46,\n    \"pendingInstructionId\": 43086786\n  }\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Traditional Bank Instruction Verification
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION\",\n  \"instruction\": {\n    \"accountId\": \"U117717\",\n    \"bankInstructionCode\": \"USACH\",\n    \"bankInstructionName\": \"ACH-Tst1Random172\",\n    \"clientInstructionId\": 7013057,\n    \"creditAmount1\": 0.32,\n    \"creditAmount2\": 0.46,\n    \"pendingInstructionId\": 43086786\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Traditional Bank Instruction Verification
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION\",\n  \"instruction\": {\n    \"accountId\": \"U117717\",\n    \"bankInstructionCode\": \"USACH\",\n    \"bankInstructionName\": \"ACH-Tst1Random172\",\n    \"clientInstructionId\": 7013057,\n    \"creditAmount1\": 0.32,\n    \"creditAmount2\": 0.46,\n    \"pendingInstructionId\": 43086786\n  }\n}")
  .asString();
```

```php Traditional Bank Instruction Verification
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions', [
  'body' => '{
  "instructionType": "TRADITIONAL_BANK_INSTRUCTION_VERIFICATION",
  "instruction": {
    "accountId": "U117717",
    "bankInstructionCode": "USACH",
    "bankInstructionName": "ACH-Tst1Random172",
    "clientInstructionId": 7013057,
    "creditAmount1": 0.32,
    "creditAmount2": 0.46,
    "pendingInstructionId": 43086786
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Traditional Bank Instruction Verification
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION\",\n  \"instruction\": {\n    \"accountId\": \"U117717\",\n    \"bankInstructionCode\": \"USACH\",\n    \"bankInstructionName\": \"ACH-Tst1Random172\",\n    \"clientInstructionId\": 7013057,\n    \"creditAmount1\": 0.32,\n    \"creditAmount2\": 0.46,\n    \"pendingInstructionId\": 43086786\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Traditional Bank Instruction Verification
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "TRADITIONAL_BANK_INSTRUCTION_VERIFICATION",
  "instruction": [
    "accountId": "U117717",
    "bankInstructionCode": "USACH",
    "bankInstructionName": "ACH-Tst1Random172",
    "clientInstructionId": 7013057,
    "creditAmount1": 0.32,
    "creditAmount2": 0.46,
    "pendingInstructionId": 43086786
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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

### 删除银行指令

**请求**

```json
{
  "instructionType": "DELETE_BANK_INSTRUCTION",
  "instruction": {
    "accountId": "U46377",
    "bankInstructionCode": "ACHUS",
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Test Delete",
    "clientInstructionId": 7013055,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "USD",
    "pendingInstructionId": 35354345
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2487,
  "instructionResult": {
    "clientInstructionId": 80009,
    "instructionType": "DELETE_BANK_INSTRUCTION",
    "instructionStatus": "PENDING",
    "instructionId": 43092478
  }
}
```

**SDK 代码**

```python Delete Bank Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions"

payload = {
    "instructionType": "DELETE_BANK_INSTRUCTION",
    "instruction": {
        "accountId": "U46377",
        "bankInstructionCode": "ACHUS",
        "bankInstructionMethod": "WIRE",
        "bankInstructionName": "Test Delete",
        "clientInstructionId": 7013055,
        "creditAmount1": 1,
        "creditAmount2": 2,
        "currency": "USD",
        "pendingInstructionId": 35354345
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Delete Bank Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DELETE_BANK_INSTRUCTION","instruction":{"accountId":"U46377","bankInstructionCode":"ACHUS","bankInstructionMethod":"WIRE","bankInstructionName":"Test Delete","clientInstructionId":7013055,"creditAmount1":1,"creditAmount2":2,"currency":"USD","pendingInstructionId":35354345}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Delete Bank Instruction
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions"

	payload := strings.NewReader("{\n  \"instructionType\": \"DELETE_BANK_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Delete\",\n    \"clientInstructionId\": 7013055,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"USD\",\n    \"pendingInstructionId\": 35354345\n  }\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Delete Bank Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DELETE_BANK_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Delete\",\n    \"clientInstructionId\": 7013055,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"USD\",\n    \"pendingInstructionId\": 35354345\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Delete Bank Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DELETE_BANK_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Delete\",\n    \"clientInstructionId\": 7013055,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"USD\",\n    \"pendingInstructionId\": 35354345\n  }\n}")
  .asString();
```

```php Delete Bank Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions', [
  'body' => '{
  "instructionType": "DELETE_BANK_INSTRUCTION",
  "instruction": {
    "accountId": "U46377",
    "bankInstructionCode": "ACHUS",
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Test Delete",
    "clientInstructionId": 7013055,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "USD",
    "pendingInstructionId": 35354345
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Delete Bank Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DELETE_BANK_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Delete\",\n    \"clientInstructionId\": 7013055,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"USD\",\n    \"pendingInstructionId\": 35354345\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Delete Bank Instruction
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "DELETE_BANK_INSTRUCTION",
  "instruction": [
    "accountId": "U46377",
    "bankInstructionCode": "ACHUS",
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Test Delete",
    "clientInstructionId": 7013055,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "USD",
    "pendingInstructionId": 35354345
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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

### 预定义目标指令

**请求**

```json
{
  "instructionType": "PREDEFINED_DESTINATION_INSTRUCTION",
  "instruction": {
    "accountId": "U399192",
    "bankInstructionCode": "ACHUS",
    "bankInstructionMethod": "ACH",
    "bankInstructionName": "Test-ACH-Instr",
    "clientInstructionId": 7013053,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "USD",
    "financialInstitution": {
      "branchCode": "",
      "branchCodeType": "BSB_AUD",
      "clientAccountId": "132456789",
      "identifier": "SBIN001000",
      "identifierType": "IFSC",
      "name": "SBI Bank"
    },
    "pendingInstructionId": 35354345
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2614,
  "instructionResult": {
    "clientInstructionId": 7008152,
    "instructionType": "PREDEFINED_DESTINATION_INSTRUCTION",
    "instructionStatus": "PENDING",
    "instructionId": 43092590
  }
}
```

**SDK 代码**

```python Predefined Destination Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions"

payload = {
    "instructionType": "PREDEFINED_DESTINATION_INSTRUCTION",
    "instruction": {
        "accountId": "U399192",
        "bankInstructionCode": "ACHUS",
        "bankInstructionMethod": "ACH",
        "bankInstructionName": "Test-ACH-Instr",
        "clientInstructionId": 7013053,
        "creditAmount1": 1,
        "creditAmount2": 2,
        "currency": "USD",
        "financialInstitution": {
            "branchCode": "",
            "branchCodeType": "BSB_AUD",
            "clientAccountId": "132456789",
            "identifier": "SBIN001000",
            "identifierType": "IFSC",
            "name": "SBI Bank"
        },
        "pendingInstructionId": 35354345
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Predefined Destination Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"PREDEFINED_DESTINATION_INSTRUCTION","instruction":{"accountId":"U399192","bankInstructionCode":"ACHUS","bankInstructionMethod":"ACH","bankInstructionName":"Test-ACH-Instr","clientInstructionId":7013053,"creditAmount1":1,"creditAmount2":2,"currency":"USD","financialInstitution":{"branchCode":"","branchCodeType":"BSB_AUD","clientAccountId":"132456789","identifier":"SBIN001000","identifierType":"IFSC","name":"SBI Bank"},"pendingInstructionId":35354345}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Predefined Destination Instruction
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions"

	payload := strings.NewReader("{\n  \"instructionType\": \"PREDEFINED_DESTINATION_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionMethod\": \"ACH\",\n    \"bankInstructionName\": \"Test-ACH-Instr\",\n    \"clientInstructionId\": 7013053,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"USD\",\n    \"financialInstitution\": {\n      \"branchCode\": \"\",\n      \"branchCodeType\": \"BSB_AUD\",\n      \"clientAccountId\": \"132456789\",\n      \"identifier\": \"SBIN001000\",\n      \"identifierType\": \"IFSC\",\n      \"name\": \"SBI Bank\"\n    },\n    \"pendingInstructionId\": 35354345\n  }\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Predefined Destination Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"PREDEFINED_DESTINATION_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionMethod\": \"ACH\",\n    \"bankInstructionName\": \"Test-ACH-Instr\",\n    \"clientInstructionId\": 7013053,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"USD\",\n    \"financialInstitution\": {\n      \"branchCode\": \"\",\n      \"branchCodeType\": \"BSB_AUD\",\n      \"clientAccountId\": \"132456789\",\n      \"identifier\": \"SBIN001000\",\n      \"identifierType\": \"IFSC\",\n      \"name\": \"SBI Bank\"\n    },\n    \"pendingInstructionId\": 35354345\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Predefined Destination Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"PREDEFINED_DESTINATION_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionMethod\": \"ACH\",\n    \"bankInstructionName\": \"Test-ACH-Instr\",\n    \"clientInstructionId\": 7013053,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"USD\",\n    \"financialInstitution\": {\n      \"branchCode\": \"\",\n      \"branchCodeType\": \"BSB_AUD\",\n      \"clientAccountId\": \"132456789\",\n      \"identifier\": \"SBIN001000\",\n      \"identifierType\": \"IFSC\",\n      \"name\": \"SBI Bank\"\n    },\n    \"pendingInstructionId\": 35354345\n  }\n}")
  .asString();
```

```php Predefined Destination Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions', [
  'body' => '{
  "instructionType": "PREDEFINED_DESTINATION_INSTRUCTION",
  "instruction": {
    "accountId": "U399192",
    "bankInstructionCode": "ACHUS",
    "bankInstructionMethod": "ACH",
    "bankInstructionName": "Test-ACH-Instr",
    "clientInstructionId": 7013053,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "USD",
    "financialInstitution": {
      "branchCode": "",
      "branchCodeType": "BSB_AUD",
      "clientAccountId": "132456789",
      "identifier": "SBIN001000",
      "identifierType": "IFSC",
      "name": "SBI Bank"
    },
    "pendingInstructionId": 35354345
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Predefined Destination Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"PREDEFINED_DESTINATION_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionMethod\": \"ACH\",\n    \"bankInstructionName\": \"Test-ACH-Instr\",\n    \"clientInstructionId\": 7013053,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"USD\",\n    \"financialInstitution\": {\n      \"branchCode\": \"\",\n      \"branchCodeType\": \"BSB_AUD\",\n      \"clientAccountId\": \"132456789\",\n      \"identifier\": \"SBIN001000\",\n      \"identifierType\": \"IFSC\",\n      \"name\": \"SBI Bank\"\n    },\n    \"pendingInstructionId\": 35354345\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Predefined Destination Instruction
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "PREDEFINED_DESTINATION_INSTRUCTION",
  "instruction": [
    "accountId": "U399192",
    "bankInstructionCode": "ACHUS",
    "bankInstructionMethod": "ACH",
    "bankInstructionName": "Test-ACH-Instr",
    "clientInstructionId": 7013053,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "USD",
    "financialInstitution": [
      "branchCode": "",
      "branchCodeType": "BSB_AUD",
      "clientAccountId": "132456789",
      "identifier": "SBIN001000",
      "identifierType": "IFSC",
      "name": "SBI Bank"
    ],
    "pendingInstructionId": 35354345
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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

### eDDA 指令

**请求**

```json
{
  "instructionType": "EDDA_INSTRUCTION",
  "instruction": {
    "accountId": "U8072517",
    "bankAccountNumber": "132456",
    "bankBranchCode": "003",
    "bankClearingCode": "003",
    "bankInstructionCode": "ACHUS",
    "bankInstructionName": "{instrution-name}",
    "clientInstructionId": 7012743,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "CNH",
    "debtorIdentificationDocumentType": "hkId",
    "pendingInstructionId": 35354345
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 6401,
  "instructionResult": {
    "clientInstructionId": 7012743,
    "instructionType": "EDDA_INSTRUCTION",
    "instructionStatus": "PENDING",
    "instructionId": 43098698
  }
}
```

**SDK 代码**

```python eDDA Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions"

payload = {
    "instructionType": "EDDA_INSTRUCTION",
    "instruction": {
        "accountId": "U8072517",
        "bankAccountNumber": "132456",
        "bankBranchCode": "003",
        "bankClearingCode": "003",
        "bankInstructionCode": "ACHUS",
        "bankInstructionName": "{instrution-name}",
        "clientInstructionId": 7012743,
        "creditAmount1": 1,
        "creditAmount2": 2,
        "currency": "CNH",
        "debtorIdentificationDocumentType": "hkId",
        "pendingInstructionId": 35354345
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript eDDA Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"EDDA_INSTRUCTION","instruction":{"accountId":"U8072517","bankAccountNumber":"132456","bankBranchCode":"003","bankClearingCode":"003","bankInstructionCode":"ACHUS","bankInstructionName":"{instrution-name}","clientInstructionId":7012743,"creditAmount1":1,"creditAmount2":2,"currency":"CNH","debtorIdentificationDocumentType":"hkId","pendingInstructionId":35354345}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go eDDA Instruction
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions"

	payload := strings.NewReader("{\n  \"instructionType\": \"EDDA_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U8072517\",\n    \"bankAccountNumber\": \"132456\",\n    \"bankBranchCode\": \"003\",\n    \"bankClearingCode\": \"003\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"{instrution-name}\",\n    \"clientInstructionId\": 7012743,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"CNH\",\n    \"debtorIdentificationDocumentType\": \"hkId\",\n    \"pendingInstructionId\": 35354345\n  }\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby eDDA Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"EDDA_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U8072517\",\n    \"bankAccountNumber\": \"132456\",\n    \"bankBranchCode\": \"003\",\n    \"bankClearingCode\": \"003\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"{instrution-name}\",\n    \"clientInstructionId\": 7012743,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"CNH\",\n    \"debtorIdentificationDocumentType\": \"hkId\",\n    \"pendingInstructionId\": 35354345\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java eDDA Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"EDDA_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U8072517\",\n    \"bankAccountNumber\": \"132456\",\n    \"bankBranchCode\": \"003\",\n    \"bankClearingCode\": \"003\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"{instrution-name}\",\n    \"clientInstructionId\": 7012743,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"CNH\",\n    \"debtorIdentificationDocumentType\": \"hkId\",\n    \"pendingInstructionId\": 35354345\n  }\n}")
  .asString();
```

```php eDDA Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions', [
  'body' => '{
  "instructionType": "EDDA_INSTRUCTION",
  "instruction": {
    "accountId": "U8072517",
    "bankAccountNumber": "132456",
    "bankBranchCode": "003",
    "bankClearingCode": "003",
    "bankInstructionCode": "ACHUS",
    "bankInstructionName": "{instrution-name}",
    "clientInstructionId": 7012743,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "CNH",
    "debtorIdentificationDocumentType": "hkId",
    "pendingInstructionId": 35354345
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp eDDA Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"EDDA_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U8072517\",\n    \"bankAccountNumber\": \"132456\",\n    \"bankBranchCode\": \"003\",\n    \"bankClearingCode\": \"003\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"{instrution-name}\",\n    \"clientInstructionId\": 7012743,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"CNH\",\n    \"debtorIdentificationDocumentType\": \"hkId\",\n    \"pendingInstructionId\": 35354345\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift eDDA Instruction
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "EDDA_INSTRUCTION",
  "instruction": [
    "accountId": "U8072517",
    "bankAccountNumber": "132456",
    "bankBranchCode": "003",
    "bankClearingCode": "003",
    "bankInstructionCode": "ACHUS",
    "bankInstructionName": "{instrution-name}",
    "clientInstructionId": 7012743,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "CNH",
    "debtorIdentificationDocumentType": "hkId",
    "pendingInstructionId": 35354345
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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

### 开放银行指令

**请求**

```json
{
  "instructionType": "OPEN_BANKING_INSTRUCTION",
  "instruction": {
    "accountId": "U46377",
    "bankInstructionCode": "ACHUS",
    "bankInstructionName": "TestInstr",
    "clientInstructionId": 11111318,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "EUR",
    "pendingInstructionId": 35354345,
    "plaidOptions": {
      "completionRedirectUri": "wonderwallet://hosted-link-complete",
      "isMobileApp": true,
      "linkDisplayName": "Test displayname"
    },
    "serviceProvider": "PLAID"
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 910137,
  "instructionResult": {
    "clientInstructionId": 11111318,
    "instructionType": "OPEN_BANKING_INSTRUCTION",
    "instructionStatus": "PENDING",
    "instructionId": 703854682,
    "details": {
      "providerResponse": {
        "hostedlinkUrl": "https://secure.plaid.com/hl/ls90p1o43o92oo9263nprro41nqq1r03ss",
        "linkToken": "link-sandbox-45c6b98b-47bb-4718-acee-b96add6e58ff"
      },
      "serviceProvider": "PLAID"
    }
  }
}
```

**SDK 代码**

```python Open Banking Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions"

payload = {
    "instructionType": "OPEN_BANKING_INSTRUCTION",
    "instruction": {
        "accountId": "U46377",
        "bankInstructionCode": "ACHUS",
        "bankInstructionName": "TestInstr",
        "clientInstructionId": 11111318,
        "creditAmount1": 1,
        "creditAmount2": 2,
        "currency": "EUR",
        "pendingInstructionId": 35354345,
        "plaidOptions": {
            "completionRedirectUri": "wonderwallet://hosted-link-complete",
            "isMobileApp": True,
            "linkDisplayName": "Test displayname"
        },
        "serviceProvider": "PLAID"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Open Banking Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"OPEN_BANKING_INSTRUCTION","instruction":{"accountId":"U46377","bankInstructionCode":"ACHUS","bankInstructionName":"TestInstr","clientInstructionId":11111318,"creditAmount1":1,"creditAmount2":2,"currency":"EUR","pendingInstructionId":35354345,"plaidOptions":{"completionRedirectUri":"wonderwallet://hosted-link-complete","isMobileApp":true,"linkDisplayName":"Test displayname"},"serviceProvider":"PLAID"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Open Banking Instruction
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions"

	payload := strings.NewReader("{\n  \"instructionType\": \"OPEN_BANKING_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientInstructionId\": 11111318,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"EUR\",\n    \"pendingInstructionId\": 35354345,\n    \"plaidOptions\": {\n      \"completionRedirectUri\": \"wonderwallet://hosted-link-complete\",\n      \"isMobileApp\": true,\n      \"linkDisplayName\": \"Test displayname\"\n    },\n    \"serviceProvider\": \"PLAID\"\n  }\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Open Banking Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"OPEN_BANKING_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientInstructionId\": 11111318,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"EUR\",\n    \"pendingInstructionId\": 35354345,\n    \"plaidOptions\": {\n      \"completionRedirectUri\": \"wonderwallet://hosted-link-complete\",\n      \"isMobileApp\": true,\n      \"linkDisplayName\": \"Test displayname\"\n    },\n    \"serviceProvider\": \"PLAID\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Open Banking Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"OPEN_BANKING_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientInstructionId\": 11111318,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"EUR\",\n    \"pendingInstructionId\": 35354345,\n    \"plaidOptions\": {\n      \"completionRedirectUri\": \"wonderwallet://hosted-link-complete\",\n      \"isMobileApp\": true,\n      \"linkDisplayName\": \"Test displayname\"\n    },\n    \"serviceProvider\": \"PLAID\"\n  }\n}")
  .asString();
```

```php Open Banking Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions', [
  'body' => '{
  "instructionType": "OPEN_BANKING_INSTRUCTION",
  "instruction": {
    "accountId": "U46377",
    "bankInstructionCode": "ACHUS",
    "bankInstructionName": "TestInstr",
    "clientInstructionId": 11111318,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "EUR",
    "pendingInstructionId": 35354345,
    "plaidOptions": {
      "completionRedirectUri": "wonderwallet://hosted-link-complete",
      "isMobileApp": true,
      "linkDisplayName": "Test displayname"
    },
    "serviceProvider": "PLAID"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Open Banking Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"OPEN_BANKING_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientInstructionId\": 11111318,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"EUR\",\n    \"pendingInstructionId\": 35354345,\n    \"plaidOptions\": {\n      \"completionRedirectUri\": \"wonderwallet://hosted-link-complete\",\n      \"isMobileApp\": true,\n      \"linkDisplayName\": \"Test displayname\"\n    },\n    \"serviceProvider\": \"PLAID\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Open Banking Instruction
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "OPEN_BANKING_INSTRUCTION",
  "instruction": [
    "accountId": "U46377",
    "bankInstructionCode": "ACHUS",
    "bankInstructionName": "TestInstr",
    "clientInstructionId": 11111318,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "EUR",
    "pendingInstructionId": 35354345,
    "plaidOptions": [
      "completionRedirectUri": "wonderwallet://hosted-link-complete",
      "isMobileApp": true,
      "linkDisplayName": "Test displayname"
    ],
    "serviceProvider": "PLAID"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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

### 出金指令

**响应**

```json
{
  "status": 202,
  "instructionSetId": 929604,
  "instructionResult": {
    "clientInstructionId": 11111445,
    "instructionType": "WITHDRAWAL_INSTRUCTION",
    "instructionStatus": "PENDING",
    "instructionId": 704094343,
    "details": {
      "bankAccountNumber": "*****1111",
      "bankInstructionName": "Starling - LVP",
      "bankRoutingNumber": "MONZGB2LXXX",
      "currency": "GBP",
      "type": "CREDIT"
    }
  }
}
```

**SDK 代码**

```python Withdrawal Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Withdrawal Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Withdrawal Instruction
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Withdrawal Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Withdrawal Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Withdrawal Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Withdrawal Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Withdrawal Instruction
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers

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

### 出金指令（按名称）

**请求**

```json
{
  "instructionType": "WITHDRAWAL_INSTRUCTION",
  "instruction": {
    "accountId": "U46377",
    "bankInstructionCode": "ACHUS",
    "bankInstructionName": "TestInstr",
    "clientInstructionId": 11111377,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "EUR",
    "pendingInstructionId": 35354345,
    "sourceDepositInstruction": {
      "name": "BBVA - Banca Perso(1111)",
      "type": "OPEN_BANKING"
    }
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2487,
  "instructionResult": {
    "clientInstructionId": 80009,
    "instructionType": "ACH_INSTRUCTION",
    "instructionStatus": "PENDING",
    "instructionId": 43092478
  }
}
```

**SDK 代码**

```python Withdrawal Instruction (by name)
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions"

payload = {
    "instructionType": "WITHDRAWAL_INSTRUCTION",
    "instruction": {
        "accountId": "U46377",
        "bankInstructionCode": "ACHUS",
        "bankInstructionName": "TestInstr",
        "clientInstructionId": 11111377,
        "creditAmount1": 1,
        "creditAmount2": 2,
        "currency": "EUR",
        "pendingInstructionId": 35354345,
        "sourceDepositInstruction": {
            "name": "BBVA - Banca Perso(1111)",
            "type": "OPEN_BANKING"
        }
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Withdrawal Instruction (by name)
const url = 'https://localhost:5000/gw/api/v1/bank-instructions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"WITHDRAWAL_INSTRUCTION","instruction":{"accountId":"U46377","bankInstructionCode":"ACHUS","bankInstructionName":"TestInstr","clientInstructionId":11111377,"creditAmount1":1,"creditAmount2":2,"currency":"EUR","pendingInstructionId":35354345,"sourceDepositInstruction":{"name":"BBVA - Banca Perso(1111)","type":"OPEN_BANKING"}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Withdrawal Instruction (by name)
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions"

	payload := strings.NewReader("{\n  \"instructionType\": \"WITHDRAWAL_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientInstructionId\": 11111377,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"EUR\",\n    \"pendingInstructionId\": 35354345,\n    \"sourceDepositInstruction\": {\n      \"name\": \"BBVA - Banca Perso(1111)\",\n      \"type\": \"OPEN_BANKING\"\n    }\n  }\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Withdrawal Instruction (by name)
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"WITHDRAWAL_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientInstructionId\": 11111377,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"EUR\",\n    \"pendingInstructionId\": 35354345,\n    \"sourceDepositInstruction\": {\n      \"name\": \"BBVA - Banca Perso(1111)\",\n      \"type\": \"OPEN_BANKING\"\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Withdrawal Instruction (by name)
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"WITHDRAWAL_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientInstructionId\": 11111377,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"EUR\",\n    \"pendingInstructionId\": 35354345,\n    \"sourceDepositInstruction\": {\n      \"name\": \"BBVA - Banca Perso(1111)\",\n      \"type\": \"OPEN_BANKING\"\n    }\n  }\n}")
  .asString();
```

```php Withdrawal Instruction (by name)
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions', [
  'body' => '{
  "instructionType": "WITHDRAWAL_INSTRUCTION",
  "instruction": {
    "accountId": "U46377",
    "bankInstructionCode": "ACHUS",
    "bankInstructionName": "TestInstr",
    "clientInstructionId": 11111377,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "EUR",
    "pendingInstructionId": 35354345,
    "sourceDepositInstruction": {
      "name": "BBVA - Banca Perso(1111)",
      "type": "OPEN_BANKING"
    }
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Withdrawal Instruction (by name)
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"WITHDRAWAL_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientInstructionId\": 11111377,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"EUR\",\n    \"pendingInstructionId\": 35354345,\n    \"sourceDepositInstruction\": {\n      \"name\": \"BBVA - Banca Perso(1111)\",\n      \"type\": \"OPEN_BANKING\"\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Withdrawal Instruction (by name)
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "WITHDRAWAL_INSTRUCTION",
  "instruction": [
    "accountId": "U46377",
    "bankInstructionCode": "ACHUS",
    "bankInstructionName": "TestInstr",
    "clientInstructionId": 11111377,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "EUR",
    "pendingInstructionId": 35354345,
    "sourceDepositInstruction": [
      "name": "BBVA - Banca Perso(1111)",
      "type": "OPEN_BANKING"
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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

### 出金指令（按 ibReferenceId）

**请求**

```json
{
  "instructionType": "WITHDRAWAL_INSTRUCTION",
  "instruction": {
    "accountId": "U46377",
    "bankInstructionCode": "ACHUS",
    "bankInstructionName": "TestInstr",
    "clientInstructionId": 11111377,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "GBP",
    "pendingInstructionId": 35354345,
    "sourceDepositInstruction": {
      "ibReferenceId": 322386848,
      "type": "OPEN_BANKING"
    }
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2487,
  "instructionResult": {
    "clientInstructionId": 80009,
    "instructionType": "ACH_INSTRUCTION",
    "instructionStatus": "PENDING",
    "instructionId": 43092478
  }
}
```

**SDK 代码**

```python Withdrawal Instruction (by ibReferenceId)
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions"

payload = {
    "instructionType": "WITHDRAWAL_INSTRUCTION",
    "instruction": {
        "accountId": "U46377",
        "bankInstructionCode": "ACHUS",
        "bankInstructionName": "TestInstr",
        "clientInstructionId": 11111377,
        "creditAmount1": 1,
        "creditAmount2": 2,
        "currency": "GBP",
        "pendingInstructionId": 35354345,
        "sourceDepositInstruction": {
            "ibReferenceId": 322386848,
            "type": "OPEN_BANKING"
        }
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Withdrawal Instruction (by ibReferenceId)
const url = 'https://localhost:5000/gw/api/v1/bank-instructions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"WITHDRAWAL_INSTRUCTION","instruction":{"accountId":"U46377","bankInstructionCode":"ACHUS","bankInstructionName":"TestInstr","clientInstructionId":11111377,"creditAmount1":1,"creditAmount2":2,"currency":"GBP","pendingInstructionId":35354345,"sourceDepositInstruction":{"ibReferenceId":322386848,"type":"OPEN_BANKING"}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Withdrawal Instruction (by ibReferenceId)
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions"

	payload := strings.NewReader("{\n  \"instructionType\": \"WITHDRAWAL_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientInstructionId\": 11111377,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"GBP\",\n    \"pendingInstructionId\": 35354345,\n    \"sourceDepositInstruction\": {\n      \"ibReferenceId\": 322386848,\n      \"type\": \"OPEN_BANKING\"\n    }\n  }\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Withdrawal Instruction (by ibReferenceId)
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"WITHDRAWAL_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientInstructionId\": 11111377,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"GBP\",\n    \"pendingInstructionId\": 35354345,\n    \"sourceDepositInstruction\": {\n      \"ibReferenceId\": 322386848,\n      \"type\": \"OPEN_BANKING\"\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Withdrawal Instruction (by ibReferenceId)
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"WITHDRAWAL_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientInstructionId\": 11111377,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"GBP\",\n    \"pendingInstructionId\": 35354345,\n    \"sourceDepositInstruction\": {\n      \"ibReferenceId\": 322386848,\n      \"type\": \"OPEN_BANKING\"\n    }\n  }\n}")
  .asString();
```

```php Withdrawal Instruction (by ibReferenceId)
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions', [
  'body' => '{
  "instructionType": "WITHDRAWAL_INSTRUCTION",
  "instruction": {
    "accountId": "U46377",
    "bankInstructionCode": "ACHUS",
    "bankInstructionName": "TestInstr",
    "clientInstructionId": 11111377,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "GBP",
    "pendingInstructionId": 35354345,
    "sourceDepositInstruction": {
      "ibReferenceId": 322386848,
      "type": "OPEN_BANKING"
    }
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Withdrawal Instruction (by ibReferenceId)
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"WITHDRAWAL_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionCode\": \"ACHUS\",\n    \"bankInstructionName\": \"TestInstr\",\n    \"clientInstructionId\": 11111377,\n    \"creditAmount1\": 1,\n    \"creditAmount2\": 2,\n    \"currency\": \"GBP\",\n    \"pendingInstructionId\": 35354345,\n    \"sourceDepositInstruction\": {\n      \"ibReferenceId\": 322386848,\n      \"type\": \"OPEN_BANKING\"\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Withdrawal Instruction (by ibReferenceId)
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "WITHDRAWAL_INSTRUCTION",
  "instruction": [
    "accountId": "U46377",
    "bankInstructionCode": "ACHUS",
    "bankInstructionName": "TestInstr",
    "clientInstructionId": 11111377,
    "creditAmount1": 1,
    "creditAmount2": 2,
    "currency": "GBP",
    "pendingInstructionId": 35354345,
    "sourceDepositInstruction": [
      "ibReferenceId": 322386848,
      "type": "OPEN_BANKING"
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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