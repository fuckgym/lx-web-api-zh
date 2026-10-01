# 查看银行指令

POST https://localhost:5000/gw/api/v1/bank-instructions/query
Content-Type: application/json

查看某个 accountId 的有效银行指令。**范围**: `bank-instructions.read`**安全策略**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/create-bank-instructions-query

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 路径参数

- `client-id` (string, required) — 客户端的 clientId

### 请求体（application/json）

该端点预期接收一个对象。

- `instructionType` (enum, required)
  - Allowed values: `QUERY_BANK_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`
- `instruction` (GwApiV1BankInstructionsQueryPostRequestBodyContentApplicationJsonSchemaInstruction, required)

## 响应

### 201

指令已成功创建并被同步处理

- `Account Management Banking_createBankInstructionsQuery_Response_201`

## 错误

### 400 错误请求错误

返回一个表示错误请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 403 禁止访问错误

返回一个表示禁止访问请求的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 对问题的简短人类可读摘要。
- `status` (long, required) — HTTP 状态码。
- `detail` (string, required) — 对问题的人类可读解释。
- `instructionSetId` (long, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionErrorResult, required) — 所提交指令的结果。

### 422 无法处理的实体错误

返回一个表示业务错误的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 对问题的简短人类可读摘要。
- `status` (long, required) — HTTP 状态码（422）。
- `instructionSetId` (long, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionErrorResult, optional) — 所提交指令的结果。

### 500 内部服务器错误

返回一个表示内部服务器错误的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### GwApiV1BankInstructionsQueryPostRequestBodyContentApplicationJsonSchemaInstruction

### QueryRecentRecurringEventResponse

包含某个周期性指令近期执行记录的响应。

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (QueryRecentRecurringEventResult, optional) — 所提交指令的结果。

### QueryBankInstructionResponse

包含某个账户已保存银行指令的响应。

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (QueryBankInstructionResult, optional) — 所提交指令的结果。

### QueryRecurringInstructionsResponse

包含某个账户周期性指令的响应。

- `instructionResult` (QueryRecurringInstructionsResult, optional) — 某个账户的周期性指令。

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

### InstructionErrorResult

针对被拒绝指令、携带错误详情的指令结果。

- `clientInstructionId` (double, required) — 客户端为该指令分配的标识符；必须为正数且在请求内唯一。
- `error` (InstructionErrorResultError, required) — 指令被拒绝时返回的错误详情。
- `instructionId` (double, required) — 该指令在 Funds and Banking 中的标识符。
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下出现。
- `description` (string, optional) — 关于结果的人类可读说明（例如轮询指引）。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### QueryBankInstruction

查询某个账户已保存银行指令的请求。

- `clientInstructionId` (double, required) — 客户端为该指令分配的标识符；必须为正数且在请求内唯一。
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `bankInstructionMethod` (enum, required) — 该银行指令的注资方式 / 支付通道。
  - Allowed values: `ACH`, `WIRE`, `USACH`, `CAACH`, `SEPA`, `eDDA`, `eGIRO`, `OPEN_BANKING`

### QueryRecentRecurringEvents

查询某个周期性指令近期执行记录的请求。

- `clientInstructionId` (double, required) — 客户端为该指令分配的标识符；必须为正数且在请求内唯一。
- `ibReferenceId` (double, required) — 该周期性指令请求的 Interactive Brokers 全局标识符。
- `numberOfTransactions` (double, optional) — 要返回的近期交易数量。

### QueryRecurringInstructions

查询某个账户周期性指令的请求。

- `clientInstructionId` (double, required) — 客户端为该指令分配的标识符；必须为正数且在请求内唯一。
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。

### QueryRecentRecurringEventResult

某个周期性指令的近期执行记录。

- `amount` (double, required) — 该交易的金额。
- `clientInstructionId` (double, required) — 客户端为该指令分配的标识符；必须为正数且在请求内唯一。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `instructionId` (double, required) — 该指令在 Funds and Banking 中的标识符。
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `method` (string, required) — 该周期性交易的注资方式。
- `recurringInstructionName` (string, required) — 周期性指令的名称。
- `recurringTransactionStatus` (string, required) — 周期性指令的状态。
- `recurringTransactionType` (string, required) — 周期性交易的类型。
- `transactionHistory` (QueryRecentRecurringEventResultTransactionHistory, required) — 交易历史的筛选/摘要。
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下出现。
- `description` (string, optional) — 关于结果的人类可读说明（例如轮询指引）。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### QueryBankInstructionResult

某个账户已保存的银行指令。

- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `bankInstructionDetails` (list of QueryBankInstructionResultBankInstructionDetailsItems, required) — 为该账户配置的银行指令列表。
- `bankInstructionMethod` (enum, required) — 该银行指令的注资方式 / 支付通道。
  - Allowed values: `WIRE`, `ACH`, `USACH`, `CAACH`, `SEPA`, `eDDA`, `eGIRO`, `OPEN_BANKING`
- `clientInstructionId` (double, required) — 客户端为该指令分配的标识符；必须为正数且在请求内唯一。
- `instructionId` (double, required) — 该指令在 Funds and Banking 中的标识符。
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下出现。
- `description` (string, optional) — 关于结果的人类可读说明（例如轮询指引）。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### QueryRecurringInstructionsResult

某个账户的周期性指令。

- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `clientInstructionId` (double, required) — 客户端为该指令分配的标识符；必须为正数且在请求内唯一。
- `instructionId` (double, required) — 该指令在 Funds and Banking 中的标识符。
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `recurringInstructions` (list of QueryRecurringInstructionsResultRecurringInstructionsItems, required) — 该账户的周期性指令列表。
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下出现。
- `description` (string, optional) — 关于结果的人类可读说明（例如轮询指引）。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### InstructionErrorResultError

指令被拒绝时返回的错误详情。

- `errorCode` (string, required) — 机器可读的错误代码。
- `errorMessage` (string, required) — 人类可读的错误消息。

### DepositDetails

- `amount` (double, optional)
- `currency` (string, optional)
- `whenAvailable` (date, optional)
- `openBanking` (DepositDetailsOpenBanking, optional) — 仅当 bankInstructionMethod 为 OPEN_BANKING 时出现。

### InstructionResultDetails

仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。

### QueryRecentRecurringEventResultTransactionHistory

交易历史的筛选/摘要。

- `maxNumberOfTransactions` (long, optional) — 返回的最大交易数量。
- `result` (list of QueryRecentRecurringEventResultTransactionHistoryResultItems, optional) — 匹配记录的列表。

### QueryBankInstructionResultBankInstructionDetailsItems

- `instructionName` (string, required) — 周期性指令的名称。
- `type` (string, required) — 银行指令的类型。取值为：CREDIT、DEBIT、DEBIT_CREDIT 之一。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `instructionStatus` (string, required) — 指令的处理状态。
- `bankRoutingNumber` (string, required) — 银行路由号。
- `bankAccountNumber` (string, required) — 银行账号。

### QueryRecurringInstructionsResultRecurringInstructionsItems

- `requestId` (long, optional) — 该周期性指令请求的零售请求 id。
- `bankInstructionName` (string, optional) — 标识已保存银行指令 / 目的地的名称。
- `transactionType` (string, optional) — 交易的类型。
- `bankInstructionMethod` (string, optional) — 该银行指令的注资方式 / 支付通道。
- `amount` (double, optional) — 该交易的金额。
- `currency` (string, optional) — ISO 4217 货币代码（例如 "USD"）。
- `frequency` (string, optional) — 周期性指令的执行频率。
- `startDate` (date, optional) — 周期性计划的开始日期。
- `endDate` (date, optional) — 周期性计划的结束日期。

### DepositDetailsOpenBanking

仅当 bankInstructionMethod 为 OPEN_BANKING 时出现。

- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (DepositDetailsOpenBankingProviderResponse, optional) — Plaid 支付发起后返回的提供商特定数据。

### OpenBankingInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)
- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (OpenBankingInstructionResultDetailsProviderResponse, optional) — 提供商特定数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户关联完成后不再提供。

### WithdrawalInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)

### QueryRecentRecurringEventResultTransactionHistoryResultItems

- `ibRequestId` (long, optional) — 该请求的 Interactive Brokers 全局标识符。
- `status` (string, optional) — 处理状态。

### DepositDetailsOpenBankingProviderResponse

Plaid 支付发起后返回的提供商特定数据。

- `paymentId` (string, optional)
- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

### OpenBankingInstructionResultDetailsProviderResponse

提供商特定数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户关联完成后不再提供。

- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

## 示例

### 查询银行指令 - WIRE

**响应**

```json
{
  "instructionResult": {
    "accountId": "U46377",
    "bankInstructionDetails": [
      {
        "bankAccountNumber": "*****7042",
        "bankRoutingNumber": "000127591",
        "currency": "USD",
        "instructionName": "testCitadele",
        "instructionStatus": "REJECTED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****9869",
        "bankRoutingNumber": "021100361",
        "currency": "USD",
        "instructionName": "testChase1",
        "instructionStatus": "PROCESSED",
        "type": "LOCAL_BANK"
      },
      {
        "bankAccountNumber": "*****9889",
        "bankRoutingNumber": "021112361",
        "currency": "USD",
        "instructionName": "testee",
        "instructionStatus": "PROCESSED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****2531",
        "bankRoutingNumber": "021100361",
        "currency": "CHF",
        "instructionName": "test multiple",
        "instructionStatus": "PROCESSED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****1234",
        "bankRoutingNumber": "021100361",
        "currency": "CHF",
        "instructionName": "farawayBroker",
        "instructionStatus": "REJECTED",
        "type": "FOREIGN_BROKER"
      }
    ],
    "bankInstructionMethod": "WIRE",
    "clientInstructionId": 12001819,
    "ibReferenceId": 0,
    "instructionId": 43094187,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_BANK_INSTRUCTION"
  },
  "instructionSetId": 3771,
  "status": 201
}
```

**SDK 代码**

```python Query Bank Instruction - WIRE
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions/query"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Query Bank Instruction - WIRE
const url = 'https://localhost:5000/gw/api/v1/bank-instructions/query';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query Bank Instruction - WIRE
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions/query"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Query Bank Instruction - WIRE
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Query Bank Instruction - WIRE
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions/query")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Query Bank Instruction - WIRE
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions/query', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Query Bank Instruction - WIRE
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Query Bank Instruction - WIRE
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions/query")! as URL,
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

### 查询银行指令 - ACH

**响应**

```json
{
  "instructionResult": {
    "accountId": "U46377",
    "bankInstructionDetails": [
      {
        "bankAccountNumber": "*****7042",
        "bankRoutingNumber": "000127591",
        "currency": "USD",
        "instructionName": "testCitadele",
        "instructionStatus": "REJECTED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****9869",
        "bankRoutingNumber": "021100361",
        "currency": "USD",
        "instructionName": "testChase1",
        "instructionStatus": "PROCESSED",
        "type": "LOCAL_BANK"
      },
      {
        "bankAccountNumber": "*****9889",
        "bankRoutingNumber": "021112361",
        "currency": "USD",
        "instructionName": "testee",
        "instructionStatus": "PROCESSED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****2531",
        "bankRoutingNumber": "021100361",
        "currency": "CHF",
        "instructionName": "test multiple",
        "instructionStatus": "PROCESSED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****1234",
        "bankRoutingNumber": "021100361",
        "currency": "CHF",
        "instructionName": "farawayBroker",
        "instructionStatus": "REJECTED",
        "type": "FOREIGN_BROKER"
      }
    ],
    "bankInstructionMethod": "ACH",
    "clientInstructionId": 12001819,
    "ibReferenceId": 0,
    "instructionId": 43094187,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_BANK_INSTRUCTION"
  },
  "instructionSetId": 3771,
  "status": 201
}
```

**SDK 代码**

```python Query Bank Instruction - ACH
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions/query"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Query Bank Instruction - ACH
const url = 'https://localhost:5000/gw/api/v1/bank-instructions/query';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query Bank Instruction - ACH
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions/query"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Query Bank Instruction - ACH
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Query Bank Instruction - ACH
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions/query")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Query Bank Instruction - ACH
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions/query', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Query Bank Instruction - ACH
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Query Bank Instruction - ACH
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions/query")! as URL,
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

### 查询近期周期性事件

**响应**

```json
{
  "instructionResult": {
    "amount": 1,
    "clientInstructionId": 12007909,
    "currency": "CNH",
    "ibReferenceId": 0,
    "instructionId": 43104464,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_RECENT_RECURRING_EVENTS",
    "method": "206603051",
    "recurringInstructionName": "test",
    "recurringTransactionStatus": "NOTACTIVATED",
    "recurringTransactionType": "DEPOSIT",
    "transactionHistory": {
      "maxNumberOfTransactions": 100,
      "result": [
        {
          "ibRequestId": 206586288,
          "status": "ACKNOWLEDGED"
        },
        {
          "ibRequestId": 206582418,
          "status": "CANCELED"
        }
      ]
    }
  },
  "instructionSetId": 14132,
  "status": 201
}
```

**SDK 代码**

```python Query Recent Recurring Events
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions/query"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Query Recent Recurring Events
const url = 'https://localhost:5000/gw/api/v1/bank-instructions/query';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query Recent Recurring Events
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions/query"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Query Recent Recurring Events
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Query Recent Recurring Events
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions/query")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Query Recent Recurring Events
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions/query', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Query Recent Recurring Events
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Query Recent Recurring Events
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions/query")! as URL,
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

### 查询周期性指令 - 使用账户 ID

**请求**

```json
{
  "instructionType": "QUERY_RECURRING_INSTRUCTIONS",
  "instruction": {
    "accountId": "U399192",
    "bankInstructionMethod": "WIRE",
    "clientInstructionId": 1012983
  }
}
```

**响应**

```json
{
  "instructionResult": {
    "accountId": "U399192",
    "clientInstructionId": 12008027,
    "ibReferenceId": 0,
    "instructionId": 43104628,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_RECENT_INSTRUCTIONS",
    "recurringInstructions": [
      {
        "amount": 1,
        "bankInstructionMethod": "ACH",
        "bankInstructionName": "Recurring Test- cpereira",
        "currency": "USD",
        "endDate": "2024-12-12",
        "frequency": "MONTHLY",
        "requestId": 206611807,
        "startDate": "2024-06-12",
        "transactionType": "DEPOSIT"
      }
    ]
  },
  "instructionSetId": 14258,
  "status": 201
}
```

**SDK 代码**

```python Query Recurring Instructions - using Account ID
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions/query"

payload = {
    "instructionType": "QUERY_RECURRING_INSTRUCTIONS",
    "instruction": {
        "accountId": "U399192",
        "bankInstructionMethod": "WIRE",
        "clientInstructionId": 1012983
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Query Recurring Instructions - using Account ID
const url = 'https://localhost:5000/gw/api/v1/bank-instructions/query';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"QUERY_RECURRING_INSTRUCTIONS","instruction":{"accountId":"U399192","bankInstructionMethod":"WIRE","clientInstructionId":1012983}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query Recurring Instructions - using Account ID
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions/query"

	payload := strings.NewReader("{\n  \"instructionType\": \"QUERY_RECURRING_INSTRUCTIONS\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"clientInstructionId\": 1012983\n  }\n}")

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

```ruby Query Recurring Instructions - using Account ID
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"QUERY_RECURRING_INSTRUCTIONS\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"clientInstructionId\": 1012983\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Query Recurring Instructions - using Account ID
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions/query")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"QUERY_RECURRING_INSTRUCTIONS\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"clientInstructionId\": 1012983\n  }\n}")
  .asString();
```

```php Query Recurring Instructions - using Account ID
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions/query', [
  'body' => '{
  "instructionType": "QUERY_RECURRING_INSTRUCTIONS",
  "instruction": {
    "accountId": "U399192",
    "bankInstructionMethod": "WIRE",
    "clientInstructionId": 1012983
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Query Recurring Instructions - using Account ID
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"QUERY_RECURRING_INSTRUCTIONS\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"clientInstructionId\": 1012983\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Query Recurring Instructions - using Account ID
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "QUERY_RECURRING_INSTRUCTIONS",
  "instruction": [
    "accountId": "U399192",
    "bankInstructionMethod": "WIRE",
    "clientInstructionId": 1012983
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions/query")! as URL,
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

### 查询银行指令 - Wire

**请求**

```json
{
  "instructionType": "QUERY_BANK_INSTRUCTION",
  "instruction": {
    "accountId": "U46377",
    "bankInstructionMethod": "WIRE",
    "clientInstructionId": 1012983
  }
}
```

**响应**

```json
{
  "instructionResult": {
    "accountId": "U46377",
    "bankInstructionDetails": [
      {
        "bankAccountNumber": "*****7042",
        "bankRoutingNumber": "000127591",
        "currency": "USD",
        "instructionName": "testCitadele",
        "instructionStatus": "REJECTED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****9869",
        "bankRoutingNumber": "021100361",
        "currency": "USD",
        "instructionName": "testChase1",
        "instructionStatus": "PROCESSED",
        "type": "LOCAL_BANK"
      },
      {
        "bankAccountNumber": "*****9889",
        "bankRoutingNumber": "021112361",
        "currency": "USD",
        "instructionName": "testee",
        "instructionStatus": "PROCESSED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****2531",
        "bankRoutingNumber": "021100361",
        "currency": "CHF",
        "instructionName": "test multiple",
        "instructionStatus": "PROCESSED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****1234",
        "bankRoutingNumber": "021100361",
        "currency": "CHF",
        "instructionName": "farawayBroker",
        "instructionStatus": "REJECTED",
        "type": "FOREIGN_BROKER"
      }
    ],
    "bankInstructionMethod": "WIRE",
    "clientInstructionId": 12001819,
    "ibReferenceId": 0,
    "instructionId": 43094187,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_BANK_INSTRUCTION"
  },
  "instructionSetId": 3771,
  "status": 201
}
```

**SDK 代码**

```python Query Bank Instruction - Wire
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions/query"

payload = {
    "instructionType": "QUERY_BANK_INSTRUCTION",
    "instruction": {
        "accountId": "U46377",
        "bankInstructionMethod": "WIRE",
        "clientInstructionId": 1012983
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Query Bank Instruction - Wire
const url = 'https://localhost:5000/gw/api/v1/bank-instructions/query';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"QUERY_BANK_INSTRUCTION","instruction":{"accountId":"U46377","bankInstructionMethod":"WIRE","clientInstructionId":1012983}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query Bank Instruction - Wire
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions/query"

	payload := strings.NewReader("{\n  \"instructionType\": \"QUERY_BANK_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"clientInstructionId\": 1012983\n  }\n}")

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

```ruby Query Bank Instruction - Wire
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"QUERY_BANK_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"clientInstructionId\": 1012983\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Query Bank Instruction - Wire
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions/query")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"QUERY_BANK_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"clientInstructionId\": 1012983\n  }\n}")
  .asString();
```

```php Query Bank Instruction - Wire
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions/query', [
  'body' => '{
  "instructionType": "QUERY_BANK_INSTRUCTION",
  "instruction": {
    "accountId": "U46377",
    "bankInstructionMethod": "WIRE",
    "clientInstructionId": 1012983
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Query Bank Instruction - Wire
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"QUERY_BANK_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"clientInstructionId\": 1012983\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Query Bank Instruction - Wire
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "QUERY_BANK_INSTRUCTION",
  "instruction": [
    "accountId": "U46377",
    "bankInstructionMethod": "WIRE",
    "clientInstructionId": 1012983
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions/query")! as URL,
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

### 查询银行指令 - ACH 指令

**请求**

```json
{
  "instructionType": "QUERY_BANK_INSTRUCTION",
  "instruction": {
    "accountId": "U46377",
    "bankInstructionMethod": "ACH",
    "clientInstructionId": 1012983
  }
}
```

**响应**

```json
{
  "instructionResult": {
    "accountId": "U46377",
    "bankInstructionDetails": [
      {
        "bankAccountNumber": "*****7042",
        "bankRoutingNumber": "000127591",
        "currency": "USD",
        "instructionName": "testCitadele",
        "instructionStatus": "REJECTED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****9869",
        "bankRoutingNumber": "021100361",
        "currency": "USD",
        "instructionName": "testChase1",
        "instructionStatus": "PROCESSED",
        "type": "LOCAL_BANK"
      },
      {
        "bankAccountNumber": "*****9889",
        "bankRoutingNumber": "021112361",
        "currency": "USD",
        "instructionName": "testee",
        "instructionStatus": "PROCESSED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****2531",
        "bankRoutingNumber": "021100361",
        "currency": "CHF",
        "instructionName": "test multiple",
        "instructionStatus": "PROCESSED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****1234",
        "bankRoutingNumber": "021100361",
        "currency": "CHF",
        "instructionName": "farawayBroker",
        "instructionStatus": "REJECTED",
        "type": "FOREIGN_BROKER"
      }
    ],
    "bankInstructionMethod": "WIRE",
    "clientInstructionId": 12001819,
    "ibReferenceId": 0,
    "instructionId": 43094187,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_BANK_INSTRUCTION"
  },
  "instructionSetId": 3771,
  "status": 201
}
```

**SDK 代码**

```python Query Bank Instruction - ACH Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions/query"

payload = {
    "instructionType": "QUERY_BANK_INSTRUCTION",
    "instruction": {
        "accountId": "U46377",
        "bankInstructionMethod": "ACH",
        "clientInstructionId": 1012983
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Query Bank Instruction - ACH Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions/query';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"QUERY_BANK_INSTRUCTION","instruction":{"accountId":"U46377","bankInstructionMethod":"ACH","clientInstructionId":1012983}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query Bank Instruction - ACH Instruction
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions/query"

	payload := strings.NewReader("{\n  \"instructionType\": \"QUERY_BANK_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionMethod\": \"ACH\",\n    \"clientInstructionId\": 1012983\n  }\n}")

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

```ruby Query Bank Instruction - ACH Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"QUERY_BANK_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionMethod\": \"ACH\",\n    \"clientInstructionId\": 1012983\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Query Bank Instruction - ACH Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions/query")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"QUERY_BANK_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionMethod\": \"ACH\",\n    \"clientInstructionId\": 1012983\n  }\n}")
  .asString();
```

```php Query Bank Instruction - ACH Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions/query', [
  'body' => '{
  "instructionType": "QUERY_BANK_INSTRUCTION",
  "instruction": {
    "accountId": "U46377",
    "bankInstructionMethod": "ACH",
    "clientInstructionId": 1012983
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Query Bank Instruction - ACH Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"QUERY_BANK_INSTRUCTION\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"bankInstructionMethod\": \"ACH\",\n    \"clientInstructionId\": 1012983\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Query Bank Instruction - ACH Instruction
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "QUERY_BANK_INSTRUCTION",
  "instruction": [
    "accountId": "U46377",
    "bankInstructionMethod": "ACH",
    "clientInstructionId": 1012983
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions/query")! as URL,
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

### 查询近期周期性事件

**请求**

```json
{
  "instructionType": "QUERY_RECENT_RECURRING_EVENTS",
  "instruction": {
    "accountId": "U399192",
    "bankInstructionMethod": "WIRE",
    "clientInstructionId": 1012983,
    "ibReferenceId": 206603050,
    "numberOfTransactions": 100
  }
}
```

**响应**

```json
{
  "instructionResult": {
    "accountId": "U46377",
    "bankInstructionDetails": [
      {
        "bankAccountNumber": "*****7042",
        "bankRoutingNumber": "000127591",
        "currency": "USD",
        "instructionName": "testCitadele",
        "instructionStatus": "REJECTED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****9869",
        "bankRoutingNumber": "021100361",
        "currency": "USD",
        "instructionName": "testChase1",
        "instructionStatus": "PROCESSED",
        "type": "LOCAL_BANK"
      },
      {
        "bankAccountNumber": "*****9889",
        "bankRoutingNumber": "021112361",
        "currency": "USD",
        "instructionName": "testee",
        "instructionStatus": "PROCESSED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****2531",
        "bankRoutingNumber": "021100361",
        "currency": "CHF",
        "instructionName": "test multiple",
        "instructionStatus": "PROCESSED",
        "type": "FOREIGN_BANK"
      },
      {
        "bankAccountNumber": "*****1234",
        "bankRoutingNumber": "021100361",
        "currency": "CHF",
        "instructionName": "farawayBroker",
        "instructionStatus": "REJECTED",
        "type": "FOREIGN_BROKER"
      }
    ],
    "bankInstructionMethod": "WIRE",
    "clientInstructionId": 12001819,
    "ibReferenceId": 0,
    "instructionId": 43094187,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_BANK_INSTRUCTION"
  },
  "instructionSetId": 3771,
  "status": 201
}
```

**SDK 代码**

```python Query Recent Recurring Event
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions/query"

payload = {
    "instructionType": "QUERY_RECENT_RECURRING_EVENTS",
    "instruction": {
        "accountId": "U399192",
        "bankInstructionMethod": "WIRE",
        "clientInstructionId": 1012983,
        "ibReferenceId": 206603050,
        "numberOfTransactions": 100
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Query Recent Recurring Event
const url = 'https://localhost:5000/gw/api/v1/bank-instructions/query';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"QUERY_RECENT_RECURRING_EVENTS","instruction":{"accountId":"U399192","bankInstructionMethod":"WIRE","clientInstructionId":1012983,"ibReferenceId":206603050,"numberOfTransactions":100}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query Recent Recurring Event
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions/query"

	payload := strings.NewReader("{\n  \"instructionType\": \"QUERY_RECENT_RECURRING_EVENTS\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"clientInstructionId\": 1012983,\n    \"ibReferenceId\": 206603050,\n    \"numberOfTransactions\": 100\n  }\n}")

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

```ruby Query Recent Recurring Event
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"QUERY_RECENT_RECURRING_EVENTS\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"clientInstructionId\": 1012983,\n    \"ibReferenceId\": 206603050,\n    \"numberOfTransactions\": 100\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Query Recent Recurring Event
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions/query")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"QUERY_RECENT_RECURRING_EVENTS\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"clientInstructionId\": 1012983,\n    \"ibReferenceId\": 206603050,\n    \"numberOfTransactions\": 100\n  }\n}")
  .asString();
```

```php Query Recent Recurring Event
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions/query', [
  'body' => '{
  "instructionType": "QUERY_RECENT_RECURRING_EVENTS",
  "instruction": {
    "accountId": "U399192",
    "bankInstructionMethod": "WIRE",
    "clientInstructionId": 1012983,
    "ibReferenceId": 206603050,
    "numberOfTransactions": 100
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Query Recent Recurring Event
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"QUERY_RECENT_RECURRING_EVENTS\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"bankInstructionMethod\": \"WIRE\",\n    \"clientInstructionId\": 1012983,\n    \"ibReferenceId\": 206603050,\n    \"numberOfTransactions\": 100\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Query Recent Recurring Event
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "QUERY_RECENT_RECURRING_EVENTS",
  "instruction": [
    "accountId": "U399192",
    "bankInstructionMethod": "WIRE",
    "clientInstructionId": 1012983,
    "ibReferenceId": 206603050,
    "numberOfTransactions": 100
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions/query")! as URL,
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