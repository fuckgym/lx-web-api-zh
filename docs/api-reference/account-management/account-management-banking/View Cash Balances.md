# 查看现金余额

POST https://localhost:5000/gw/api/v1/external-cash-transfers/query
Content-Type: application/json

按 accountId 查看可用于出金的现金（含及不含保证金借款）**Scope**: `transfers.read`**Security Policy**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/create-external-cash-transfers-query

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 请求

### 路径参数

- `client-id` (string, required) — 客户端的 clientId

### 请求体 (application/json)

该端点期望接收一个对象。

- `instructionType` (enum, required)
  - Allowed values: `QUERY_WITHDRAWABLE_FUNDS`, `QUERY_IRA_CONTRIBUTIONS`
- `instruction` (GwApiV1ExternalCashTransfersQueryPostRequestBodyContentApplicationJsonSchemaInstruction, required)

## 响应

### 201

指令已成功创建并被同步处理

- `Account Management Banking_createExternalCashTransfersQuery_Response_201`

### 202

已接受异步创建新指令的请求

- `Account Management Banking_createExternalCashTransfersQuery_Response_202`

## 错误

### 400 无效请求错误

返回表示无效请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 403 禁止访问错误

返回表示被禁止请求的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短、人类可读的摘要。
- `status` (long, required) — HTTP 状态码。
- `detail` (string, required) — 对问题的人类可读的解释。
- `instructionSetId` (long, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (InstructionErrorResult, required) — 所提交指令的结果。

### 422 无法处理的实体错误

返回表示业务错误的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短、人类可读的摘要。
- `status` (long, required) — HTTP 状态码 (422)。
- `instructionSetId` (long, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (InstructionErrorResult, optional) — 所提交指令的结果。

### 500 内部服务器错误

返回表示内部服务器错误的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### GwApiV1ExternalCashTransfersQueryPostRequestBodyContentApplicationJsonSchemaInstruction

### QueryWithdrawableAmountsResponse

包含账户可出金金额的响应。

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (QueryWithdrawableAmountsInstructionResult, optional) — 所提交指令的结果。

### QueryWithdrawableAmountsWithoutOriginHoldResponse

包含不含源头冻结时可出金金额的响应。

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (QueryWithdrawableAmountsWithoutOriginHoldResult, optional) — 所提交指令的结果。

### AsynchronousInstructionResponse

对异步处理的指令进行确认的响应。

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (InstructionResult, optional) — 所提交指令的结果。

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

### InstructionErrorResult

携带被拒绝指令错误详情的指令结果。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `error` (InstructionErrorResultError, required) — 指令被拒绝时返回的错误详情。
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `depositDetails` (DepositDetails, optional) — 仅对 DEPOSIT 指令类型显示。
- `description` (string, optional) — 关于结果的人类可读备注（例如轮询指引）。
- `details` (InstructionResultDetails, optional) — 仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### QueryWithdrawableFunds

查询账户可出金资金的请求。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `accountId` (string, required) — 该指令所适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `bankRoutingNumber` (string, optional) — 如果提供了 bankRoutingNumber，则也必须提供 bankAccountNumber；不能与 bankInstructionName 同时传入
- `bankAccountNumber` (string, optional) — 如果提供了 bankAccountNumber，则也必须提供 bankRoutingNumber；不能与 bankInstructionName 同时传入
- `bankInstructionName` (string, optional) — bankInstructionName 不能与（bankAccountNumber 或 bankRoutingNumber）同时传入

### QueryIRAContributions

查询账户 IRA 缴款限额与使用情况的请求。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `accountId` (string, required) — 该指令所适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `year` (string, required) — 缴款所属税务年度。

### QueryWithdrawableAmountsInstructionResult

账户的可出金金额。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `REJECTED`, `PROCESSED`
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `accountId` (string, required) — 该指令所适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `withdrawableAmount` (double, required) — 可出金的金额。
- `withdrawableAmountNoBorrow` (double, required) — 可出金的金额，不含借款。
- `allowedTransferAmountToMaster` (double, required) — 允许划转到主账户的金额。
- `allowedTransferAmountToMasterNoBorrow` (double, required) — 允许划转到主账户的金额，不含借款。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的人类可读备注。
- `details` (QueryWithdrawableAmountsInstructionResultDetails, optional) — 仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。
- `depositDetails` (DepositDetails, optional) — 仅对 DEPOSIT 指令类型显示。
- `error` (QueryWithdrawableAmountsInstructionResultError, optional) — 指令被拒绝时返回的错误详情。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### QueryWithdrawableAmountsWithoutOriginHoldResult

不含源头冻结的可出金金额。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `REJECTED`, `PROCESSED`
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `accountId` (string, required) — 该指令所适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `withdrawableAmountWithoutOriginationHold` (double, required) — 可出金的金额，不含处于源头冻结状态的资金。
- `withdrawableAmountWithoutOriginationHoldNoBorrow` (double, required) — 可出金的金额，不含源头冻结和借款。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的人类可读备注。
- `details` (QueryWithdrawableAmountsWithoutOriginHoldResultDetails, optional) — 仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。
- `depositDetails` (DepositDetails, optional) — 仅对 DEPOSIT 指令类型显示。
- `error` (QueryWithdrawableAmountsWithoutOriginHoldResultError, optional) — 指令被拒绝时返回的错误详情。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### InstructionResult

所提交指令的结果。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的人类可读备注（例如轮询指引）。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。
- `details` (InstructionResultDetails, optional) — 仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。
- `depositDetails` (DepositDetails, optional) — 仅对 DEPOSIT 指令类型显示。

### InstructionErrorResultError

指令被拒绝时返回的错误详情。

- `errorCode` (string, required) — 机器可读的错误代码。
- `errorMessage` (string, required) — 人类可读的错误消息。

### DepositDetails

- `amount` (double, optional)
- `currency` (string, optional)
- `whenAvailable` (date, optional)
- `openBanking` (DepositDetailsOpenBanking, optional) — 仅当 bankInstructionMethod 为 OPEN_BANKING 时显示。

### InstructionResultDetails

仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。

### QueryWithdrawableAmountsInstructionResultDetails

仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。

### QueryWithdrawableAmountsInstructionResultError

指令被拒绝时返回的错误详情。

- `errorCode` (string, required) — 机器可读的错误代码。
- `errorMessage` (string, required) — 人类可读的错误消息。

### QueryWithdrawableAmountsWithoutOriginHoldResultDetails

仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。

### QueryWithdrawableAmountsWithoutOriginHoldResultError

指令被拒绝时返回的错误详情。

- `errorCode` (string, required) — 机器可读的错误代码。
- `errorMessage` (string, required) — 人类可读的错误消息。

### DepositDetailsOpenBanking

仅当 bankInstructionMethod 为 OPEN_BANKING 时显示。

- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (DepositDetailsOpenBankingProviderResponse, optional) — Plaid 付款发起后返回的特定于服务提供商的数据。

### OpenBankingInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)
- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (OpenBankingInstructionResultDetailsProviderResponse, optional) — 特定于服务提供商的数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户关联完成后即不存在。

### WithdrawalInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)

### DepositDetailsOpenBankingProviderResponse

Plaid 付款发起后返回的特定于服务提供商的数据。

- `paymentId` (string, optional)
- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

### OpenBankingInstructionResultDetailsProviderResponse

特定于服务提供商的数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户关联完成后即不存在。

- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

## 示例

### 查询可出金资金

**请求**

```json
{
  "instructionType": "QUERY_WITHDRAWABLE_FUNDS",
  "instruction": {
    "accountId": "U87440",
    "clientInstructionId": 7009005,
    "currency": "USD"
  }
}
```

**响应**

```json
{
  "instructionResult": {
    "accountId": "U46377",
    "allowedTransferAmountToMaster": 0,
    "allowedTransferAmountToMasterNoBorrow": 0,
    "clientInstructionId": 7013230,
    "currency": "EUR",
    "ibReferenceId": 0,
    "instructionId": 43133309,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_WITHDRAWABLE_FUNDS",
    "withdrawableAmount": 0,
    "withdrawableAmountNoBorrow": 0
  },
  "instructionSetId": 17791,
  "status": 201
}
```

**SDK 代码**

```python Query Withdrawable Funds
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers/query"

payload = {
    "instructionType": "QUERY_WITHDRAWABLE_FUNDS",
    "instruction": {
        "accountId": "U87440",
        "clientInstructionId": 7009005,
        "currency": "USD"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Query Withdrawable Funds
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers/query';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"QUERY_WITHDRAWABLE_FUNDS","instruction":{"accountId":"U87440","clientInstructionId":7009005,"currency":"USD"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query Withdrawable Funds
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers/query"

	payload := strings.NewReader("{\n  \"instructionType\": \"QUERY_WITHDRAWABLE_FUNDS\",\n  \"instruction\": {\n    \"accountId\": \"U87440\",\n    \"clientInstructionId\": 7009005,\n    \"currency\": \"USD\"\n  }\n}")

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

```ruby Query Withdrawable Funds
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"QUERY_WITHDRAWABLE_FUNDS\",\n  \"instruction\": {\n    \"accountId\": \"U87440\",\n    \"clientInstructionId\": 7009005,\n    \"currency\": \"USD\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Query Withdrawable Funds
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers/query")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"QUERY_WITHDRAWABLE_FUNDS\",\n  \"instruction\": {\n    \"accountId\": \"U87440\",\n    \"clientInstructionId\": 7009005,\n    \"currency\": \"USD\"\n  }\n}")
  .asString();
```

```php Query Withdrawable Funds
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers/query', [
  'body' => '{
  "instructionType": "QUERY_WITHDRAWABLE_FUNDS",
  "instruction": {
    "accountId": "U87440",
    "clientInstructionId": 7009005,
    "currency": "USD"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Query Withdrawable Funds
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"QUERY_WITHDRAWABLE_FUNDS\",\n  \"instruction\": {\n    \"accountId\": \"U87440\",\n    \"clientInstructionId\": 7009005,\n    \"currency\": \"USD\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Query Withdrawable Funds
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "QUERY_WITHDRAWABLE_FUNDS",
  "instruction": [
    "accountId": "U87440",
    "clientInstructionId": 7009005,
    "currency": "USD"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers/query")! as URL,
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

### 查询不含源头冻结的可出金资金

**请求**

```json
{
  "instructionType": "QUERY_WITHDRAWABLE_FUNDS",
  "instruction": {
    "accountId": "U139838",
    "bankAccountNumber": "9876543210",
    "bankRoutingNumber": "122199983",
    "clientInstructionId": 7009006,
    "currency": "USD"
  }
}
```

**响应**

```json
{
  "instructionResult": {
    "accountId": "U46377",
    "clientInstructionId": 7013230,
    "currency": "EUR",
    "ibReferenceId": 0,
    "instructionId": 43133309,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_WITHDRAWABLE_FUNDS",
    "withdrawableAmountWithoutOriginationHold": 0,
    "withdrawableAmountWithoutOriginationHoldNoBorrow": 0
  },
  "instructionSetId": 17791,
  "status": 201
}
```

**SDK 代码**

```python Query Withdrawable Funds Without Origination Hold
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers/query"

payload = {
    "instructionType": "QUERY_WITHDRAWABLE_FUNDS",
    "instruction": {
        "accountId": "U139838",
        "bankAccountNumber": "9876543210",
        "bankRoutingNumber": "122199983",
        "clientInstructionId": 7009006,
        "currency": "USD"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Query Withdrawable Funds Without Origination Hold
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers/query';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"QUERY_WITHDRAWABLE_FUNDS","instruction":{"accountId":"U139838","bankAccountNumber":"9876543210","bankRoutingNumber":"122199983","clientInstructionId":7009006,"currency":"USD"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query Withdrawable Funds Without Origination Hold
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers/query"

	payload := strings.NewReader("{\n  \"instructionType\": \"QUERY_WITHDRAWABLE_FUNDS\",\n  \"instruction\": {\n    \"accountId\": \"U139838\",\n    \"bankAccountNumber\": \"9876543210\",\n    \"bankRoutingNumber\": \"122199983\",\n    \"clientInstructionId\": 7009006,\n    \"currency\": \"USD\"\n  }\n}")

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

```ruby Query Withdrawable Funds Without Origination Hold
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"QUERY_WITHDRAWABLE_FUNDS\",\n  \"instruction\": {\n    \"accountId\": \"U139838\",\n    \"bankAccountNumber\": \"9876543210\",\n    \"bankRoutingNumber\": \"122199983\",\n    \"clientInstructionId\": 7009006,\n    \"currency\": \"USD\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Query Withdrawable Funds Without Origination Hold
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers/query")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"QUERY_WITHDRAWABLE_FUNDS\",\n  \"instruction\": {\n    \"accountId\": \"U139838\",\n    \"bankAccountNumber\": \"9876543210\",\n    \"bankRoutingNumber\": \"122199983\",\n    \"clientInstructionId\": 7009006,\n    \"currency\": \"USD\"\n  }\n}")
  .asString();
```

```php Query Withdrawable Funds Without Origination Hold
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers/query', [
  'body' => '{
  "instructionType": "QUERY_WITHDRAWABLE_FUNDS",
  "instruction": {
    "accountId": "U139838",
    "bankAccountNumber": "9876543210",
    "bankRoutingNumber": "122199983",
    "clientInstructionId": 7009006,
    "currency": "USD"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Query Withdrawable Funds Without Origination Hold
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"QUERY_WITHDRAWABLE_FUNDS\",\n  \"instruction\": {\n    \"accountId\": \"U139838\",\n    \"bankAccountNumber\": \"9876543210\",\n    \"bankRoutingNumber\": \"122199983\",\n    \"clientInstructionId\": 7009006,\n    \"currency\": \"USD\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Query Withdrawable Funds Without Origination Hold
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "QUERY_WITHDRAWABLE_FUNDS",
  "instruction": [
    "accountId": "U139838",
    "bankAccountNumber": "9876543210",
    "bankRoutingNumber": "122199983",
    "clientInstructionId": 7009006,
    "currency": "USD"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers/query")! as URL,
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

### 查询 IRA 缴款

**请求**

```json
{
  "instructionType": "QUERY_IRA_CONTRIBUTIONS",
  "instruction": {
    "accountId": "U68903",
    "clientInstructionId": 7009007,
    "currency": "USD",
    "year": "2003"
  }
}
```

**响应**

```json
{
  "instructionResult": {
    "accountId": "U1032333",
    "clientInstructionId": 7013306,
    "description": "Query is being processed. Please poll for status 1 minutes later using FB status endpoint. No new queries will be allowed before this one is processed ",
    "ibReferenceId": 0,
    "instructionId": 43134474,
    "instructionStatus": "PENDING",
    "instructionType": "QUERY_IRA_CONTRIBUTIONS",
    "year": "2022"
  },
  "instructionSetId": 18640,
  "status": 202
}
```

**SDK 代码**

```python Query IRA Contributions
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers/query"

payload = {
    "instructionType": "QUERY_IRA_CONTRIBUTIONS",
    "instruction": {
        "accountId": "U68903",
        "clientInstructionId": 7009007,
        "currency": "USD",
        "year": "2003"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Query IRA Contributions
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers/query';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"QUERY_IRA_CONTRIBUTIONS","instruction":{"accountId":"U68903","clientInstructionId":7009007,"currency":"USD","year":"2003"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query IRA Contributions
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers/query"

	payload := strings.NewReader("{\n  \"instructionType\": \"QUERY_IRA_CONTRIBUTIONS\",\n  \"instruction\": {\n    \"accountId\": \"U68903\",\n    \"clientInstructionId\": 7009007,\n    \"currency\": \"USD\",\n    \"year\": \"2003\"\n  }\n}")

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

```ruby Query IRA Contributions
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"QUERY_IRA_CONTRIBUTIONS\",\n  \"instruction\": {\n    \"accountId\": \"U68903\",\n    \"clientInstructionId\": 7009007,\n    \"currency\": \"USD\",\n    \"year\": \"2003\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Query IRA Contributions
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers/query")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"QUERY_IRA_CONTRIBUTIONS\",\n  \"instruction\": {\n    \"accountId\": \"U68903\",\n    \"clientInstructionId\": 7009007,\n    \"currency\": \"USD\",\n    \"year\": \"2003\"\n  }\n}")
  .asString();
```

```php Query IRA Contributions
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers/query', [
  'body' => '{
  "instructionType": "QUERY_IRA_CONTRIBUTIONS",
  "instruction": {
    "accountId": "U68903",
    "clientInstructionId": 7009007,
    "currency": "USD",
    "year": "2003"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Query IRA Contributions
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"QUERY_IRA_CONTRIBUTIONS\",\n  \"instruction\": {\n    \"accountId\": \"U68903\",\n    \"clientInstructionId\": 7009007,\n    \"currency\": \"USD\",\n    \"year\": \"2003\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Query IRA Contributions
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "QUERY_IRA_CONTRIBUTIONS",
  "instruction": [
    "accountId": "U68903",
    "clientInstructionId": 7009007,
    "currency": "USD",
    "year": "2003"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers/query")! as URL,
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