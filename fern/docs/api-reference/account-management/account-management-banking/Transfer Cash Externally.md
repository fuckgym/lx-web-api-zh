# 对外资金划转

POST https://localhost:5000/gw/api/v1/external-cash-transfers
Content-Type: application/json

发起在 IBKR 账户与银行账户之间进行入金或出金的请求。有关划转方式的更多信息，可在此处查看 - [https://www.interactivebrokers.com/campus/trading-lessons/cash-and-position-transfers](https://www.interactivebrokers.com/campus/trading-lessons/cash-and-position-transfers)**范围**：`transfers.write`**安全策略**：`Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/create-external-cash-transfers

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥进行签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒)

## 请求

### 路径参数

- `client-id` (string, required) — 客户端的 clientId

### 请求体 (application/json)

此端点预期接收一个对象。

- `instructionType` (enum, required)
  - Allowed values: `DEPOSIT`, `WITHDRAWAL`
- `instruction` (GwApiV1ExternalCashTransfersPostRequestBodyContentApplicationJsonSchemaInstruction, required)

## 响应

### 202

接受异步创建新指令的请求

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionResult, optional) — 所提交指令的结果。

## 错误

### 400 请求错误

返回表示错误请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 403 禁止访问错误

返回表示被禁止请求的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短、易于理解的摘要。
- `status` (long, required) — HTTP 状态码。
- `detail` (string, required) — 对问题的易于理解的说明。
- `instructionSetId` (long, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionErrorResult, required) — 所提交指令的结果。

### 422 无法处理的实体错误

返回表示业务错误的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短、易于理解的摘要。
- `status` (long, required) — HTTP 状态码 (422)。
- `instructionSetId` (long, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionErrorResult, optional) — 所提交指令的结果。

### 500 服务器内部错误

返回表示服务器内部错误的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### GwApiV1ExternalCashTransfersPostRequestBodyContentApplicationJsonSchemaInstruction

### InstructionResult

所提交指令的结果。

- `clientInstructionId` (double, required) — 由客户端分配的该指令的标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的易于理解的说明（例如轮询指引）。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下出现。

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

### InstructionErrorResult

携带被拒绝指令错误详情的指令结果。

- `clientInstructionId` (double, required) — 由客户端分配的该指令的标识符；必须为正数且在请求内唯一。
- `error` (InstructionErrorResultError, required) — 指令被拒绝时返回的错误详情。
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下出现。
- `description` (string, optional) — 关于结果的易于理解的说明（例如轮询指引）。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### DepositFundsInstruction

通过 ACH、Wire、eDDA 或 Open Banking 向 Interactive Brokers 账户入金的请求。

- `clientInstructionId` (double, required) — 由客户端分配的该指令的标识符；必须为正数且在请求内唯一。
- `accountId` (string, required) — 该指令所适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `amount` (double, required) — 该交易的金额。
- `bankInstructionMethod` (enum, required) — 银行指令的入金方式 / 支付通道。
  - Allowed values: `ACH`, `WIRE`, `eDDA`, `OPEN_BANKING`
- `openBanking` (DepositFundsInstructionOpenBanking, optional) — 该入金的 Open Banking 配置。
- `sendingInstitution` (string, optional) — 发送资金的机构名称。
- `identifier` (string, optional) — 表示汇款人的银行账号。对于使用以下货币的 WIRE 入金，此字段为必填：ILS、AED、AUD 和 INR。
- `specialInstruction` (string, optional) — 自由文本的特殊处理说明。
- `bankInstructionName` (string, optional) — 标识已保存的银行指令 / 目的地的名称。
- `senderInstitutionName` (string, optional) — 发送方机构的名称。
- `iraDepositDetail` (DepositFundsInstructionIraDepositDetail, optional) — IRA（美国个人退休账户）入金详情。
- `recurringInstructionDetail` (RecurringInstructionDetailRef, optional) — 该指令的周期性计划配置。

### WithdrawFundsInstruction

从 Interactive Brokers 账户出金的请求。

- `clientInstructionId` (double, required) — 由客户端分配的该指令的标识符；必须为正数且在请求内唯一。
- `accountId` (string, required) — 该指令所适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `amount` (double, required) — 该交易的金额。
- `bankInstructionName` (string, required) — 标识已保存的银行指令 / 目的地的名称。
- `bankInstructionMethod` (enum, required) — 银行指令的入金方式 / 支付通道。
  - Allowed values: `ACH`, `WIRE`, `SEPA`
- `dateTimeToOccur` (datetime, optional) — 请求执行该指令的日期时间，采用 ISO 8601 格式。请注意，目前我们仅考虑日期部分，不考虑时间
- `iraWithdrawalDetail` (WithdrawFundsInstructionIraWithdrawalDetail, optional) — IRA（美国个人退休账户）出金的税款/预扣详情。
- `recurringInstructionDetail` (RecurringInstructionDetailRef, optional) — 该指令的周期性计划配置。

### InstructionResultDetails

仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。

### DepositDetails

- `amount` (double, optional)
- `currency` (string, optional)
- `whenAvailable` (date, optional)
- `openBanking` (DepositDetailsOpenBanking, optional) — 仅在 bankInstructionMethod 为 OPEN_BANKING 时出现。

### InstructionErrorResultError

指令被拒绝时返回的错误详情。

- `errorCode` (string, required) — 机器可读的错误代码。
- `errorMessage` (string, required) — 易于理解的错误消息。

### DepositFundsInstructionOpenBanking

该入金的 Open Banking 配置。

- `serviceProvider` (enum, required) — Open Banking 服务提供商。
  - Allowed values: `PLAID`
- `plaidOptions` (DepositFundsInstructionOpenBankingPlaidOptions, optional) — Plaid 特定的选项。

### DepositFundsInstructionIraDepositDetail

IRA（美国个人退休账户）入金详情。

- `iraContributionType` (enum, required) — IRA 缴款的类型。
  - Allowed values: `ROLLOVER`, `LATE_ROLLOVER`, `DIRECT_ROLLOVER`, `CONTRIBUTION`, `SPOUSAL_CONTRIBUTION`, `EMPLOYER_SEP_CONTRIBUTION`
- `iraTaxYearType` (enum, required) — IRA 缴款适用的税务年度（CURRENT 或 PRIOR）。
  - Allowed values: `CURRENT`, `PRIOR`
- `fromIraType` (enum, required) — 资金来源的 IRA 类型。
  - Allowed values: `NONE`, `TRADITIONAL`, `ROLLOVER`, `ROTH`, `SEP`, `EDUCATION`, `TRADITIONAL_INHERITED`, `ROTH_INHERITED`, `SEP_INHERITED`, `RETIREMENT_SAVING_PLAN`, `SPOUSAL_RETIREMENT_SAVING_PLAN`, `TAX_FREE_SAVING_ACCOUNT`

### RecurringInstructionDetailRef

该指令的周期性计划配置。

- `instructionName` (string, required) — 周期性指令的名称。
- `frequency` (enum, required) — 周期性指令执行的频率。
  - Allowed values: `MONTHLY`, `QUARTERLY`, `YEARLY`
- `startDate` (string, required) — 周期性计划的开始日期。
- `endDate` (string, optional) — 周期性计划的结束日期。

### WithdrawFundsInstructionIraWithdrawalDetail

IRA（美国个人退休账户）出金的税款/预扣详情。

- `fedIncomeTaxPercentage` (double, required) — 联邦所得税预扣百分比。
- `stateIncomeTaxPercentage` (double, required) — 州所得税预扣百分比。
- `stateCd` (string, required) — 用于税款预扣的美国州代码（两个字母）。
- `iraWithholdType` (enum, required) — IRA 预扣/分配类型。
  - Allowed values: `DIRECT_ROLLOVER`, `ROTH_DISTRIBUTION`, `NORMAL`, `EARLY`, `DEATH`, `EXCESS_CY`, `EXCESS_PY`, `EXCESS_SC`

### OpenBankingInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)
- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (OpenBankingInstructionResultDetailsProviderResponse, optional) — 服务商特定的数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户完成关联后该字段即不存在。

### WithdrawalInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)

### DepositDetailsOpenBanking

仅在 bankInstructionMethod 为 OPEN_BANKING 时出现。

- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (DepositDetailsOpenBankingProviderResponse, optional) — 在 Plaid 付款发起后返回的服务商特定数据。

### DepositFundsInstructionOpenBankingPlaidOptions

Plaid 特定的选项。

- `completionRedirectUri` (string, optional) — 此处应为一个采用自定义 scheme 的 URI，其值可以是您想要的任意值，只要不是 http 或 tel 之类的保留值即可。按照惯例，它通常是与您的应用程序名称相关联的值。
- `linkDisplayName` (string, optional) — 在 Plaid Link 界面上显示的客户名称
- `isMobileApp` (boolean, optional) — Plaid Link 会话是否在移动应用内运行。

### OpenBankingInstructionResultDetailsProviderResponse

服务商特定的数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户完成关联后该字段即不存在。

- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

### DepositDetailsOpenBankingProviderResponse

在 Plaid 付款发起后返回的服务商特定数据。

- `paymentId` (string, optional)
- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

## 示例

### 入金

**请求**

```json
{
  "instructionType": "DEPOSIT",
  "instruction": {
    "accountId": "U46377",
    "amount": 100,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Instruction",
    "clientInstructionId": 7013045,
    "currency": "USD",
    "fromAccountNumber": "U46377",
    "identifier": "indentifier",
    "senderInstitutionName": "Senders Institution name",
    "sendingInstitution": "Sending Institution name",
    "specialInstruction": "U46377"
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2480,
  "instructionResult": {
    "clientInstructionId": 7008143,
    "instructionType": "DEPOSIT",
    "instructionStatus": "PENDING",
    "instructionId": 43092468
  }
}
```

**SDK 代码**

```python Deposit Funds
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers"

payload = {
    "instructionType": "DEPOSIT",
    "instruction": {
        "accountId": "U46377",
        "amount": 100,
        "bankInstructionMethod": "WIRE",
        "bankInstructionName": "Instruction",
        "clientInstructionId": 7013045,
        "currency": "USD",
        "fromAccountNumber": "U46377",
        "identifier": "indentifier",
        "senderInstitutionName": "Senders Institution name",
        "sendingInstitution": "Sending Institution name",
        "specialInstruction": "U46377"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Deposit Funds
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DEPOSIT","instruction":{"accountId":"U46377","amount":100,"bankInstructionMethod":"WIRE","bankInstructionName":"Instruction","clientInstructionId":7013045,"currency":"USD","fromAccountNumber":"U46377","identifier":"indentifier","senderInstitutionName":"Senders Institution name","sendingInstitution":"Sending Institution name","specialInstruction":"U46377"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Deposit Funds
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 100,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Instruction\",\n    \"clientInstructionId\": 7013045,\n    \"currency\": \"USD\",\n    \"fromAccountNumber\": \"U46377\",\n    \"identifier\": \"indentifier\",\n    \"senderInstitutionName\": \"Senders Institution name\",\n    \"sendingInstitution\": \"Sending Institution name\",\n    \"specialInstruction\": \"U46377\"\n  }\n}")

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

```ruby Deposit Funds
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 100,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Instruction\",\n    \"clientInstructionId\": 7013045,\n    \"currency\": \"USD\",\n    \"fromAccountNumber\": \"U46377\",\n    \"identifier\": \"indentifier\",\n    \"senderInstitutionName\": \"Senders Institution name\",\n    \"sendingInstitution\": \"Sending Institution name\",\n    \"specialInstruction\": \"U46377\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Deposit Funds
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 100,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Instruction\",\n    \"clientInstructionId\": 7013045,\n    \"currency\": \"USD\",\n    \"fromAccountNumber\": \"U46377\",\n    \"identifier\": \"indentifier\",\n    \"senderInstitutionName\": \"Senders Institution name\",\n    \"sendingInstitution\": \"Sending Institution name\",\n    \"specialInstruction\": \"U46377\"\n  }\n}")
  .asString();
```

```php Deposit Funds
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers', [
  'body' => '{
  "instructionType": "DEPOSIT",
  "instruction": {
    "accountId": "U46377",
    "amount": 100,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Instruction",
    "clientInstructionId": 7013045,
    "currency": "USD",
    "fromAccountNumber": "U46377",
    "identifier": "indentifier",
    "senderInstitutionName": "Senders Institution name",
    "sendingInstitution": "Sending Institution name",
    "specialInstruction": "U46377"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Deposit Funds
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 100,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Instruction\",\n    \"clientInstructionId\": 7013045,\n    \"currency\": \"USD\",\n    \"fromAccountNumber\": \"U46377\",\n    \"identifier\": \"indentifier\",\n    \"senderInstitutionName\": \"Senders Institution name\",\n    \"sendingInstitution\": \"Sending Institution name\",\n    \"specialInstruction\": \"U46377\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Deposit Funds
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "DEPOSIT",
  "instruction": [
    "accountId": "U46377",
    "amount": 100,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Instruction",
    "clientInstructionId": 7013045,
    "currency": "USD",
    "fromAccountNumber": "U46377",
    "identifier": "indentifier",
    "senderInstitutionName": "Senders Institution name",
    "sendingInstitution": "Sending Institution name",
    "specialInstruction": "U46377"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers")! as URL,
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

### 入金 - Open Banking

**请求**

```json
{
  "instructionType": "DEPOSIT",
  "instruction": {
    "accountId": "U46377",
    "amount": 100,
    "bankInstructionMethod": "OPEN_BANKING",
    "bankInstructionName": "Starling(1111)",
    "clientInstructionId": 7013051,
    "currency": "EUR",
    "openBanking": {
      "plaidOptions": {
        "completionRedirectUri": "wonderwallet://hosted-link-complete",
        "isMobileApp": true,
        "linkDisplayName": "WonderWallet"
      },
      "serviceProvider": "PLAID"
    }
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2481,
  "instructionResult": {
    "clientInstructionId": 7013051,
    "instructionType": "DEPOSIT",
    "instructionStatus": "PROCESSED",
    "instructionId": 43092469,
    "depositDetails": {
      "amount": 100,
      "currency": "EUR",
      "openBanking": {
        "serviceProvider": "PLAID",
        "providerResponse": {
          "paymentId": "payment-sandbox-3c4c4c1c-9c1a-4d4d-8c1a-9c1a4d4d8c1a",
          "hostedlinkUrl": "https://secure.plaid.com/hl/ls90p1o43o92oo9263nprro41nqq1r03ss",
          "linkToken": "link-sandbox-45c6b98b-47bb-4718-acee-b96add6e58ff"
        }
      }
    }
  }
}
```

**SDK 代码**

```python Deposit Funds - Open Banking
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers"

payload = {
    "instructionType": "DEPOSIT",
    "instruction": {
        "accountId": "U46377",
        "amount": 100,
        "bankInstructionMethod": "OPEN_BANKING",
        "bankInstructionName": "Starling(1111)",
        "clientInstructionId": 7013051,
        "currency": "EUR",
        "openBanking": {
            "plaidOptions": {
                "completionRedirectUri": "wonderwallet://hosted-link-complete",
                "isMobileApp": True,
                "linkDisplayName": "WonderWallet"
            },
            "serviceProvider": "PLAID"
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

```javascript Deposit Funds - Open Banking
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DEPOSIT","instruction":{"accountId":"U46377","amount":100,"bankInstructionMethod":"OPEN_BANKING","bankInstructionName":"Starling(1111)","clientInstructionId":7013051,"currency":"EUR","openBanking":{"plaidOptions":{"completionRedirectUri":"wonderwallet://hosted-link-complete","isMobileApp":true,"linkDisplayName":"WonderWallet"},"serviceProvider":"PLAID"}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Deposit Funds - Open Banking
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 100,\n    \"bankInstructionMethod\": \"OPEN_BANKING\",\n    \"bankInstructionName\": \"Starling(1111)\",\n    \"clientInstructionId\": 7013051,\n    \"currency\": \"EUR\",\n    \"openBanking\": {\n      \"plaidOptions\": {\n        \"completionRedirectUri\": \"wonderwallet://hosted-link-complete\",\n        \"isMobileApp\": true,\n        \"linkDisplayName\": \"WonderWallet\"\n      },\n      \"serviceProvider\": \"PLAID\"\n    }\n  }\n}")

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

```ruby Deposit Funds - Open Banking
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 100,\n    \"bankInstructionMethod\": \"OPEN_BANKING\",\n    \"bankInstructionName\": \"Starling(1111)\",\n    \"clientInstructionId\": 7013051,\n    \"currency\": \"EUR\",\n    \"openBanking\": {\n      \"plaidOptions\": {\n        \"completionRedirectUri\": \"wonderwallet://hosted-link-complete\",\n        \"isMobileApp\": true,\n        \"linkDisplayName\": \"WonderWallet\"\n      },\n      \"serviceProvider\": \"PLAID\"\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Deposit Funds - Open Banking
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 100,\n    \"bankInstructionMethod\": \"OPEN_BANKING\",\n    \"bankInstructionName\": \"Starling(1111)\",\n    \"clientInstructionId\": 7013051,\n    \"currency\": \"EUR\",\n    \"openBanking\": {\n      \"plaidOptions\": {\n        \"completionRedirectUri\": \"wonderwallet://hosted-link-complete\",\n        \"isMobileApp\": true,\n        \"linkDisplayName\": \"WonderWallet\"\n      },\n      \"serviceProvider\": \"PLAID\"\n    }\n  }\n}")
  .asString();
```

```php Deposit Funds - Open Banking
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers', [
  'body' => '{
  "instructionType": "DEPOSIT",
  "instruction": {
    "accountId": "U46377",
    "amount": 100,
    "bankInstructionMethod": "OPEN_BANKING",
    "bankInstructionName": "Starling(1111)",
    "clientInstructionId": 7013051,
    "currency": "EUR",
    "openBanking": {
      "plaidOptions": {
        "completionRedirectUri": "wonderwallet://hosted-link-complete",
        "isMobileApp": true,
        "linkDisplayName": "WonderWallet"
      },
      "serviceProvider": "PLAID"
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

```csharp Deposit Funds - Open Banking
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 100,\n    \"bankInstructionMethod\": \"OPEN_BANKING\",\n    \"bankInstructionName\": \"Starling(1111)\",\n    \"clientInstructionId\": 7013051,\n    \"currency\": \"EUR\",\n    \"openBanking\": {\n      \"plaidOptions\": {\n        \"completionRedirectUri\": \"wonderwallet://hosted-link-complete\",\n        \"isMobileApp\": true,\n        \"linkDisplayName\": \"WonderWallet\"\n      },\n      \"serviceProvider\": \"PLAID\"\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Deposit Funds - Open Banking
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "DEPOSIT",
  "instruction": [
    "accountId": "U46377",
    "amount": 100,
    "bankInstructionMethod": "OPEN_BANKING",
    "bankInstructionName": "Starling(1111)",
    "clientInstructionId": 7013051,
    "currency": "EUR",
    "openBanking": [
      "plaidOptions": [
        "completionRedirectUri": "wonderwallet://hosted-link-complete",
        "isMobileApp": true,
        "linkDisplayName": "WonderWallet"
      ],
      "serviceProvider": "PLAID"
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers")! as URL,
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

### 出金

**请求**

```json
{
  "instructionType": "WITHDRAWAL",
  "instruction": {
    "accountId": "U46377",
    "amount": 123.45,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Test Withdrawal",
    "clientInstructionId": 7013048,
    "currency": "GBP",
    "dateTimeToOccur": "2023-11-20T09:12:13Z"
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2719,
  "instructionResult": {
    "clientInstructionId": 12000862,
    "instructionType": "WITHDRAWAL",
    "instructionStatus": "PROCESSED",
    "instructionId": 43092641,
    "ibReferenceId": 132123
  }
}
```

**SDK 代码**

```python Withdraw Funds
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers"

payload = {
    "instructionType": "WITHDRAWAL",
    "instruction": {
        "accountId": "U46377",
        "amount": 123.45,
        "bankInstructionMethod": "WIRE",
        "bankInstructionName": "Test Withdrawal",
        "clientInstructionId": 7013048,
        "currency": "GBP",
        "dateTimeToOccur": "2023-11-20T09:12:13Z"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Withdraw Funds
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"WITHDRAWAL","instruction":{"accountId":"U46377","amount":123.45,"bankInstructionMethod":"WIRE","bankInstructionName":"Test Withdrawal","clientInstructionId":7013048,"currency":"GBP","dateTimeToOccur":"2023-11-20T09:12:13Z"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Withdraw Funds
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 123.45,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Withdrawal\",\n    \"clientInstructionId\": 7013048,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2023-11-20T09:12:13Z\"\n  }\n}")

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

```ruby Withdraw Funds
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 123.45,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Withdrawal\",\n    \"clientInstructionId\": 7013048,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2023-11-20T09:12:13Z\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Withdraw Funds
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 123.45,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Withdrawal\",\n    \"clientInstructionId\": 7013048,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2023-11-20T09:12:13Z\"\n  }\n}")
  .asString();
```

```php Withdraw Funds
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers', [
  'body' => '{
  "instructionType": "WITHDRAWAL",
  "instruction": {
    "accountId": "U46377",
    "amount": 123.45,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Test Withdrawal",
    "clientInstructionId": 7013048,
    "currency": "GBP",
    "dateTimeToOccur": "2023-11-20T09:12:13Z"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Withdraw Funds
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 123.45,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Withdrawal\",\n    \"clientInstructionId\": 7013048,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2023-11-20T09:12:13Z\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Withdraw Funds
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "WITHDRAWAL",
  "instruction": [
    "accountId": "U46377",
    "amount": 123.45,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Test Withdrawal",
    "clientInstructionId": 7013048,
    "currency": "GBP",
    "dateTimeToOccur": "2023-11-20T09:12:13Z"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers")! as URL,
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

### 入金 - IRA

**请求**

```json
{
  "instructionType": "DEPOSIT",
  "instruction": {
    "accountId": "U399192",
    "amount": 1,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Instruction",
    "clientInstructionId": 7013046,
    "currency": "USD",
    "fromAccountNumber": "U399192",
    "identifier": "indentifier",
    "iraDepositDetail": {
      "fromIraType": "TRADITIONAL",
      "iraContributionType": "ROLLOVER",
      "iraTaxYearType": "CURRENT"
    },
    "senderInstitutionName": "Senders Institution name",
    "sendingInstitution": "Sending Institution name",
    "specialInstruction": "U399192"
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2480,
  "instructionResult": {
    "clientInstructionId": 7008143,
    "instructionType": "DEPOSIT",
    "instructionStatus": "PENDING",
    "instructionId": 43092468
  }
}
```

**SDK 代码**

```python Deposit Funds - IRA
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers"

payload = {
    "instructionType": "DEPOSIT",
    "instruction": {
        "accountId": "U399192",
        "amount": 1,
        "bankInstructionMethod": "WIRE",
        "bankInstructionName": "Instruction",
        "clientInstructionId": 7013046,
        "currency": "USD",
        "fromAccountNumber": "U399192",
        "identifier": "indentifier",
        "iraDepositDetail": {
            "fromIraType": "TRADITIONAL",
            "iraContributionType": "ROLLOVER",
            "iraTaxYearType": "CURRENT"
        },
        "senderInstitutionName": "Senders Institution name",
        "sendingInstitution": "Sending Institution name",
        "specialInstruction": "U399192"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Deposit Funds - IRA
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DEPOSIT","instruction":{"accountId":"U399192","amount":1,"bankInstructionMethod":"WIRE","bankInstructionName":"Instruction","clientInstructionId":7013046,"currency":"USD","fromAccountNumber":"U399192","identifier":"indentifier","iraDepositDetail":{"fromIraType":"TRADITIONAL","iraContributionType":"ROLLOVER","iraTaxYearType":"CURRENT"},"senderInstitutionName":"Senders Institution name","sendingInstitution":"Sending Institution name","specialInstruction":"U399192"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Deposit Funds - IRA
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"amount\": 1,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Instruction\",\n    \"clientInstructionId\": 7013046,\n    \"currency\": \"USD\",\n    \"fromAccountNumber\": \"U399192\",\n    \"identifier\": \"indentifier\",\n    \"iraDepositDetail\": {\n      \"fromIraType\": \"TRADITIONAL\",\n      \"iraContributionType\": \"ROLLOVER\",\n      \"iraTaxYearType\": \"CURRENT\"\n    },\n    \"senderInstitutionName\": \"Senders Institution name\",\n    \"sendingInstitution\": \"Sending Institution name\",\n    \"specialInstruction\": \"U399192\"\n  }\n}")

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

```ruby Deposit Funds - IRA
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"amount\": 1,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Instruction\",\n    \"clientInstructionId\": 7013046,\n    \"currency\": \"USD\",\n    \"fromAccountNumber\": \"U399192\",\n    \"identifier\": \"indentifier\",\n    \"iraDepositDetail\": {\n      \"fromIraType\": \"TRADITIONAL\",\n      \"iraContributionType\": \"ROLLOVER\",\n      \"iraTaxYearType\": \"CURRENT\"\n    },\n    \"senderInstitutionName\": \"Senders Institution name\",\n    \"sendingInstitution\": \"Sending Institution name\",\n    \"specialInstruction\": \"U399192\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Deposit Funds - IRA
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"amount\": 1,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Instruction\",\n    \"clientInstructionId\": 7013046,\n    \"currency\": \"USD\",\n    \"fromAccountNumber\": \"U399192\",\n    \"identifier\": \"indentifier\",\n    \"iraDepositDetail\": {\n      \"fromIraType\": \"TRADITIONAL\",\n      \"iraContributionType\": \"ROLLOVER\",\n      \"iraTaxYearType\": \"CURRENT\"\n    },\n    \"senderInstitutionName\": \"Senders Institution name\",\n    \"sendingInstitution\": \"Sending Institution name\",\n    \"specialInstruction\": \"U399192\"\n  }\n}")
  .asString();
```

```php Deposit Funds - IRA
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers', [
  'body' => '{
  "instructionType": "DEPOSIT",
  "instruction": {
    "accountId": "U399192",
    "amount": 1,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Instruction",
    "clientInstructionId": 7013046,
    "currency": "USD",
    "fromAccountNumber": "U399192",
    "identifier": "indentifier",
    "iraDepositDetail": {
      "fromIraType": "TRADITIONAL",
      "iraContributionType": "ROLLOVER",
      "iraTaxYearType": "CURRENT"
    },
    "senderInstitutionName": "Senders Institution name",
    "sendingInstitution": "Sending Institution name",
    "specialInstruction": "U399192"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Deposit Funds - IRA
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"amount\": 1,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Instruction\",\n    \"clientInstructionId\": 7013046,\n    \"currency\": \"USD\",\n    \"fromAccountNumber\": \"U399192\",\n    \"identifier\": \"indentifier\",\n    \"iraDepositDetail\": {\n      \"fromIraType\": \"TRADITIONAL\",\n      \"iraContributionType\": \"ROLLOVER\",\n      \"iraTaxYearType\": \"CURRENT\"\n    },\n    \"senderInstitutionName\": \"Senders Institution name\",\n    \"sendingInstitution\": \"Sending Institution name\",\n    \"specialInstruction\": \"U399192\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Deposit Funds - IRA
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "DEPOSIT",
  "instruction": [
    "accountId": "U399192",
    "amount": 1,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Instruction",
    "clientInstructionId": 7013046,
    "currency": "USD",
    "fromAccountNumber": "U399192",
    "identifier": "indentifier",
    "iraDepositDetail": [
      "fromIraType": "TRADITIONAL",
      "iraContributionType": "ROLLOVER",
      "iraTaxYearType": "CURRENT"
    ],
    "senderInstitutionName": "Senders Institution name",
    "sendingInstitution": "Sending Institution name",
    "specialInstruction": "U399192"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers")! as URL,
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

### 入金 - 周期性

**请求**

```json
{
  "instructionType": "DEPOSIT",
  "instruction": {
    "accountId": "U46377",
    "amount": 100,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Instruction",
    "clientInstructionId": 7013047,
    "currency": "USD",
    "identifier": "indentifier",
    "recurringInstructionDetail": {
      "frequency": "MONTHLY",
      "instructionName": "Arkansas-Test-Instr",
      "startDate": "2023-10-16"
    },
    "senderInstitutionName": "Senders Institution name",
    "sendingInstitution": "Sending Institution name",
    "specialInstruction": "U46377"
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2480,
  "instructionResult": {
    "clientInstructionId": 7008143,
    "instructionType": "DEPOSIT",
    "instructionStatus": "PENDING",
    "instructionId": 43092468
  }
}
```

**SDK 代码**

```python Deposit Funds - Recurring
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers"

payload = {
    "instructionType": "DEPOSIT",
    "instruction": {
        "accountId": "U46377",
        "amount": 100,
        "bankInstructionMethod": "WIRE",
        "bankInstructionName": "Instruction",
        "clientInstructionId": 7013047,
        "currency": "USD",
        "identifier": "indentifier",
        "recurringInstructionDetail": {
            "frequency": "MONTHLY",
            "instructionName": "Arkansas-Test-Instr",
            "startDate": "2023-10-16"
        },
        "senderInstitutionName": "Senders Institution name",
        "sendingInstitution": "Sending Institution name",
        "specialInstruction": "U46377"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Deposit Funds - Recurring
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DEPOSIT","instruction":{"accountId":"U46377","amount":100,"bankInstructionMethod":"WIRE","bankInstructionName":"Instruction","clientInstructionId":7013047,"currency":"USD","identifier":"indentifier","recurringInstructionDetail":{"frequency":"MONTHLY","instructionName":"Arkansas-Test-Instr","startDate":"2023-10-16"},"senderInstitutionName":"Senders Institution name","sendingInstitution":"Sending Institution name","specialInstruction":"U46377"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Deposit Funds - Recurring
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 100,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Instruction\",\n    \"clientInstructionId\": 7013047,\n    \"currency\": \"USD\",\n    \"identifier\": \"indentifier\",\n    \"recurringInstructionDetail\": {\n      \"frequency\": \"MONTHLY\",\n      \"instructionName\": \"Arkansas-Test-Instr\",\n      \"startDate\": \"2023-10-16\"\n    },\n    \"senderInstitutionName\": \"Senders Institution name\",\n    \"sendingInstitution\": \"Sending Institution name\",\n    \"specialInstruction\": \"U46377\"\n  }\n}")

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

```ruby Deposit Funds - Recurring
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 100,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Instruction\",\n    \"clientInstructionId\": 7013047,\n    \"currency\": \"USD\",\n    \"identifier\": \"indentifier\",\n    \"recurringInstructionDetail\": {\n      \"frequency\": \"MONTHLY\",\n      \"instructionName\": \"Arkansas-Test-Instr\",\n      \"startDate\": \"2023-10-16\"\n    },\n    \"senderInstitutionName\": \"Senders Institution name\",\n    \"sendingInstitution\": \"Sending Institution name\",\n    \"specialInstruction\": \"U46377\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Deposit Funds - Recurring
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 100,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Instruction\",\n    \"clientInstructionId\": 7013047,\n    \"currency\": \"USD\",\n    \"identifier\": \"indentifier\",\n    \"recurringInstructionDetail\": {\n      \"frequency\": \"MONTHLY\",\n      \"instructionName\": \"Arkansas-Test-Instr\",\n      \"startDate\": \"2023-10-16\"\n    },\n    \"senderInstitutionName\": \"Senders Institution name\",\n    \"sendingInstitution\": \"Sending Institution name\",\n    \"specialInstruction\": \"U46377\"\n  }\n}")
  .asString();
```

```php Deposit Funds - Recurring
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers', [
  'body' => '{
  "instructionType": "DEPOSIT",
  "instruction": {
    "accountId": "U46377",
    "amount": 100,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Instruction",
    "clientInstructionId": 7013047,
    "currency": "USD",
    "identifier": "indentifier",
    "recurringInstructionDetail": {
      "frequency": "MONTHLY",
      "instructionName": "Arkansas-Test-Instr",
      "startDate": "2023-10-16"
    },
    "senderInstitutionName": "Senders Institution name",
    "sendingInstitution": "Sending Institution name",
    "specialInstruction": "U46377"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Deposit Funds - Recurring
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 100,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Instruction\",\n    \"clientInstructionId\": 7013047,\n    \"currency\": \"USD\",\n    \"identifier\": \"indentifier\",\n    \"recurringInstructionDetail\": {\n      \"frequency\": \"MONTHLY\",\n      \"instructionName\": \"Arkansas-Test-Instr\",\n      \"startDate\": \"2023-10-16\"\n    },\n    \"senderInstitutionName\": \"Senders Institution name\",\n    \"sendingInstitution\": \"Sending Institution name\",\n    \"specialInstruction\": \"U46377\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Deposit Funds - Recurring
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "DEPOSIT",
  "instruction": [
    "accountId": "U46377",
    "amount": 100,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Instruction",
    "clientInstructionId": 7013047,
    "currency": "USD",
    "identifier": "indentifier",
    "recurringInstructionDetail": [
      "frequency": "MONTHLY",
      "instructionName": "Arkansas-Test-Instr",
      "startDate": "2023-10-16"
    ],
    "senderInstitutionName": "Senders Institution name",
    "sendingInstitution": "Sending Institution name",
    "specialInstruction": "U46377"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers")! as URL,
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

### 出金 - IRA

**请求**

```json
{
  "instructionType": "WITHDRAWAL",
  "instruction": {
    "accountId": "U399192",
    "amount": 123.45,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Test Withdrawal",
    "clientInstructionId": 7013049,
    "currency": "GBP",
    "dateTimeToOccur": "2023-11-20T09:12:13Z",
    "iraWithdrawalDetail": {
      "fedIncomeTaxPercentage": 10,
      "iraWithholdType": "NORMAL",
      "stateCd": "TE",
      "stateIncomeTaxPercentage": 12
    }
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2480,
  "instructionResult": {
    "clientInstructionId": 7008143,
    "instructionType": "DEPOSIT",
    "instructionStatus": "PENDING",
    "instructionId": 43092468
  }
}
```

**SDK 代码**

```python Withdraw Funds - IRA
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers"

payload = {
    "instructionType": "WITHDRAWAL",
    "instruction": {
        "accountId": "U399192",
        "amount": 123.45,
        "bankInstructionMethod": "WIRE",
        "bankInstructionName": "Test Withdrawal",
        "clientInstructionId": 7013049,
        "currency": "GBP",
        "dateTimeToOccur": "2023-11-20T09:12:13Z",
        "iraWithdrawalDetail": {
            "fedIncomeTaxPercentage": 10,
            "iraWithholdType": "NORMAL",
            "stateCd": "TE",
            "stateIncomeTaxPercentage": 12
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

```javascript Withdraw Funds - IRA
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"WITHDRAWAL","instruction":{"accountId":"U399192","amount":123.45,"bankInstructionMethod":"WIRE","bankInstructionName":"Test Withdrawal","clientInstructionId":7013049,"currency":"GBP","dateTimeToOccur":"2023-11-20T09:12:13Z","iraWithdrawalDetail":{"fedIncomeTaxPercentage":10,"iraWithholdType":"NORMAL","stateCd":"TE","stateIncomeTaxPercentage":12}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Withdraw Funds - IRA
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"amount\": 123.45,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Withdrawal\",\n    \"clientInstructionId\": 7013049,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2023-11-20T09:12:13Z\",\n    \"iraWithdrawalDetail\": {\n      \"fedIncomeTaxPercentage\": 10,\n      \"iraWithholdType\": \"NORMAL\",\n      \"stateCd\": \"TE\",\n      \"stateIncomeTaxPercentage\": 12\n    }\n  }\n}")

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

```ruby Withdraw Funds - IRA
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"amount\": 123.45,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Withdrawal\",\n    \"clientInstructionId\": 7013049,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2023-11-20T09:12:13Z\",\n    \"iraWithdrawalDetail\": {\n      \"fedIncomeTaxPercentage\": 10,\n      \"iraWithholdType\": \"NORMAL\",\n      \"stateCd\": \"TE\",\n      \"stateIncomeTaxPercentage\": 12\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Withdraw Funds - IRA
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"amount\": 123.45,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Withdrawal\",\n    \"clientInstructionId\": 7013049,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2023-11-20T09:12:13Z\",\n    \"iraWithdrawalDetail\": {\n      \"fedIncomeTaxPercentage\": 10,\n      \"iraWithholdType\": \"NORMAL\",\n      \"stateCd\": \"TE\",\n      \"stateIncomeTaxPercentage\": 12\n    }\n  }\n}")
  .asString();
```

```php Withdraw Funds - IRA
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers', [
  'body' => '{
  "instructionType": "WITHDRAWAL",
  "instruction": {
    "accountId": "U399192",
    "amount": 123.45,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Test Withdrawal",
    "clientInstructionId": 7013049,
    "currency": "GBP",
    "dateTimeToOccur": "2023-11-20T09:12:13Z",
    "iraWithdrawalDetail": {
      "fedIncomeTaxPercentage": 10,
      "iraWithholdType": "NORMAL",
      "stateCd": "TE",
      "stateIncomeTaxPercentage": 12
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

```csharp Withdraw Funds - IRA
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"amount\": 123.45,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Withdrawal\",\n    \"clientInstructionId\": 7013049,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2023-11-20T09:12:13Z\",\n    \"iraWithdrawalDetail\": {\n      \"fedIncomeTaxPercentage\": 10,\n      \"iraWithholdType\": \"NORMAL\",\n      \"stateCd\": \"TE\",\n      \"stateIncomeTaxPercentage\": 12\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Withdraw Funds - IRA
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "WITHDRAWAL",
  "instruction": [
    "accountId": "U399192",
    "amount": 123.45,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Test Withdrawal",
    "clientInstructionId": 7013049,
    "currency": "GBP",
    "dateTimeToOccur": "2023-11-20T09:12:13Z",
    "iraWithdrawalDetail": [
      "fedIncomeTaxPercentage": 10,
      "iraWithholdType": "NORMAL",
      "stateCd": "TE",
      "stateIncomeTaxPercentage": 12
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers")! as URL,
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

### 出金 - 周期性

**请求**

```json
{
  "instructionType": "WITHDRAWAL",
  "instruction": {
    "accountId": "U46377",
    "amount": 123.45,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Test Withdrawal",
    "clientInstructionId": 7013050,
    "currency": "GBP",
    "dateTimeToOccur": "2023-11-20T09:12:13Z",
    "iraWithdrawalDetail": {
      "fedIncomeTaxPercentage": 10,
      "iraWithholdType": "NORMAL",
      "stateCd": "TE",
      "stateIncomeTaxPercentage": 12
    },
    "recurringInstructionDetail": {
      "frequency": "MONTHLY",
      "instructionName": "Arkansas-Test-Instr",
      "startDate": "2023-10-16"
    }
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2480,
  "instructionResult": {
    "clientInstructionId": 7008143,
    "instructionType": "DEPOSIT",
    "instructionStatus": "PENDING",
    "instructionId": 43092468
  }
}
```

**SDK 代码**

```python Withdraw Funds - Recurring
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers"

payload = {
    "instructionType": "WITHDRAWAL",
    "instruction": {
        "accountId": "U46377",
        "amount": 123.45,
        "bankInstructionMethod": "WIRE",
        "bankInstructionName": "Test Withdrawal",
        "clientInstructionId": 7013050,
        "currency": "GBP",
        "dateTimeToOccur": "2023-11-20T09:12:13Z",
        "iraWithdrawalDetail": {
            "fedIncomeTaxPercentage": 10,
            "iraWithholdType": "NORMAL",
            "stateCd": "TE",
            "stateIncomeTaxPercentage": 12
        },
        "recurringInstructionDetail": {
            "frequency": "MONTHLY",
            "instructionName": "Arkansas-Test-Instr",
            "startDate": "2023-10-16"
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

```javascript Withdraw Funds - Recurring
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"WITHDRAWAL","instruction":{"accountId":"U46377","amount":123.45,"bankInstructionMethod":"WIRE","bankInstructionName":"Test Withdrawal","clientInstructionId":7013050,"currency":"GBP","dateTimeToOccur":"2023-11-20T09:12:13Z","iraWithdrawalDetail":{"fedIncomeTaxPercentage":10,"iraWithholdType":"NORMAL","stateCd":"TE","stateIncomeTaxPercentage":12},"recurringInstructionDetail":{"frequency":"MONTHLY","instructionName":"Arkansas-Test-Instr","startDate":"2023-10-16"}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Withdraw Funds - Recurring
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 123.45,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Withdrawal\",\n    \"clientInstructionId\": 7013050,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2023-11-20T09:12:13Z\",\n    \"iraWithdrawalDetail\": {\n      \"fedIncomeTaxPercentage\": 10,\n      \"iraWithholdType\": \"NORMAL\",\n      \"stateCd\": \"TE\",\n      \"stateIncomeTaxPercentage\": 12\n    },\n    \"recurringInstructionDetail\": {\n      \"frequency\": \"MONTHLY\",\n      \"instructionName\": \"Arkansas-Test-Instr\",\n      \"startDate\": \"2023-10-16\"\n    }\n  }\n}")

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

```ruby Withdraw Funds - Recurring
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 123.45,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Withdrawal\",\n    \"clientInstructionId\": 7013050,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2023-11-20T09:12:13Z\",\n    \"iraWithdrawalDetail\": {\n      \"fedIncomeTaxPercentage\": 10,\n      \"iraWithholdType\": \"NORMAL\",\n      \"stateCd\": \"TE\",\n      \"stateIncomeTaxPercentage\": 12\n    },\n    \"recurringInstructionDetail\": {\n      \"frequency\": \"MONTHLY\",\n      \"instructionName\": \"Arkansas-Test-Instr\",\n      \"startDate\": \"2023-10-16\"\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Withdraw Funds - Recurring
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 123.45,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Withdrawal\",\n    \"clientInstructionId\": 7013050,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2023-11-20T09:12:13Z\",\n    \"iraWithdrawalDetail\": {\n      \"fedIncomeTaxPercentage\": 10,\n      \"iraWithholdType\": \"NORMAL\",\n      \"stateCd\": \"TE\",\n      \"stateIncomeTaxPercentage\": 12\n    },\n    \"recurringInstructionDetail\": {\n      \"frequency\": \"MONTHLY\",\n      \"instructionName\": \"Arkansas-Test-Instr\",\n      \"startDate\": \"2023-10-16\"\n    }\n  }\n}")
  .asString();
```

```php Withdraw Funds - Recurring
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers', [
  'body' => '{
  "instructionType": "WITHDRAWAL",
  "instruction": {
    "accountId": "U46377",
    "amount": 123.45,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Test Withdrawal",
    "clientInstructionId": 7013050,
    "currency": "GBP",
    "dateTimeToOccur": "2023-11-20T09:12:13Z",
    "iraWithdrawalDetail": {
      "fedIncomeTaxPercentage": 10,
      "iraWithholdType": "NORMAL",
      "stateCd": "TE",
      "stateIncomeTaxPercentage": 12
    },
    "recurringInstructionDetail": {
      "frequency": "MONTHLY",
      "instructionName": "Arkansas-Test-Instr",
      "startDate": "2023-10-16"
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

```csharp Withdraw Funds - Recurring
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"amount\": 123.45,\n    \"bankInstructionMethod\": \"WIRE\",\n    \"bankInstructionName\": \"Test Withdrawal\",\n    \"clientInstructionId\": 7013050,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2023-11-20T09:12:13Z\",\n    \"iraWithdrawalDetail\": {\n      \"fedIncomeTaxPercentage\": 10,\n      \"iraWithholdType\": \"NORMAL\",\n      \"stateCd\": \"TE\",\n      \"stateIncomeTaxPercentage\": 12\n    },\n    \"recurringInstructionDetail\": {\n      \"frequency\": \"MONTHLY\",\n      \"instructionName\": \"Arkansas-Test-Instr\",\n      \"startDate\": \"2023-10-16\"\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Withdraw Funds - Recurring
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "WITHDRAWAL",
  "instruction": [
    "accountId": "U46377",
    "amount": 123.45,
    "bankInstructionMethod": "WIRE",
    "bankInstructionName": "Test Withdrawal",
    "clientInstructionId": 7013050,
    "currency": "GBP",
    "dateTimeToOccur": "2023-11-20T09:12:13Z",
    "iraWithdrawalDetail": [
      "fedIncomeTaxPercentage": 10,
      "iraWithholdType": "NORMAL",
      "stateCd": "TE",
      "stateIncomeTaxPercentage": 12
    ],
    "recurringInstructionDetail": [
      "frequency": "MONTHLY",
      "instructionName": "Arkansas-Test-Instr",
      "startDate": "2023-10-16"
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers")! as URL,
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