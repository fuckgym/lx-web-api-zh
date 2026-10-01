# 根据 InstructionId 获取状态

GET https://localhost:5000/gw/api/v1/instructions/{instructionId}

通过 instructionId 检索请求的状态**Scope**: `instructions.read`**Security Policy**: `HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/get-instructions

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 请求

### 路径参数

- `client-id` (string, required) — 客户端的 clientId
- `instructionId` (long, required) — 目标指令 ID。

## 响应

### 200

返回指令的状态。

- `Account Management Banking_getInstructions_Response_200`

### 208

客户端尝试将同一个 instructionId 用于多笔交易。返回在给定 instructionId 下注册的首笔交易的状态（当尚无重复时）。请基于 instructionSetId 进行对账

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (InstructionResult, optional) — 所提交指令的结果。

## 错误

### 404 未找到错误

返回表示未找到请求的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短、人类可读的摘要。
- `status` (long, required) — HTTP 状态码 (404)。
- `detail` (string, optional) — 对问题的人类可读的解释。

### 500 内部服务器错误

由于内部错误无法处理请求。请稍后重试。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### InstructionPollingResponse

对已提交指令的轮询响应。

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (PollingInstructionResult, optional) — 所提交指令的结果。

### InstructionResponse

对已提交指令的确认响应。

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (InstructionResult, optional) — 所提交指令的结果。

### QueryRecentInstructionResponse

包含账户近期指令的响应。

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (QueryRecentInstructionResult, optional) — 所提交指令的结果。

### DepositFundsPollingResponse

入金指令的轮询响应。

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (DepositFundsPollingResult, optional) — 所提交指令的结果。

### QueryIRAContributionsResponse

包含账户 IRA 缴款信息的响应。

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (QueryIRAContributionsResult, optional) — 所提交指令的结果。

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

### PollingInstructionResult

轮询已提交指令得到的结果。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `REJECTED`, `PROCESSED`
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的人类可读备注。
- `details` (PollingInstructionResultDetails, optional) — 仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。
- `depositDetails` (DepositDetails, optional) — 仅对 DEPOSIT 指令类型显示。
- `error` (PollingInstructionResultError, optional) — 指令被拒绝时返回的错误详情。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### QueryRecentInstructionResult

账户的近期指令。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `REJECTED`, `PROCESSED`
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `instructionHistory` (QueryRecentInstructionResultInstructionHistory, required) — 近期指令历史记录。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的人类可读备注。
- `details` (QueryRecentInstructionResultDetails, optional) — 仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。
- `depositDetails` (DepositDetails, optional) — 仅对 DEPOSIT 指令类型显示。
- `error` (QueryRecentInstructionResultError, optional) — 指令被拒绝时返回的错误详情。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### DepositFundsPollingResult

轮询入金指令得到的结果。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `REJECTED`, `PROCESSED`
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的人类可读备注。
- `details` (DepositFundsPollingResultDetails, optional) — 仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。
- `depositDetails` (DepositDetails, optional) — 仅对 DEPOSIT 指令类型显示。
- `error` (DepositFundsPollingResultError, optional) — 指令被拒绝时返回的错误详情。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### QueryIRAContributionsResult

账户的 IRA 缴款限额与使用情况。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `REJECTED`, `PROCESSED`
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `accountId` (string, required) — 该指令所适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `year` (string, required) — 缴款所属税务年度。
- `iraType` (string, required) — IRA 类型。
- `contributions` (list of QueryIraContributionsResultContributionsItems, required) — 缴款限额记录的列表。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的人类可读备注。
- `details` (QueryIraContributionsResultDetails, optional) — 仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。
- `depositDetails` (DepositDetails, optional) — 仅对 DEPOSIT 指令类型显示。
- `error` (QueryIraContributionsResultError, optional) — 指令被拒绝时返回的错误详情。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### InstructionResultDetails

仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。

### DepositDetails

- `amount` (double, optional)
- `currency` (string, optional)
- `whenAvailable` (date, optional)
- `openBanking` (DepositDetailsOpenBanking, optional) — 仅当 bankInstructionMethod 为 OPEN_BANKING 时显示。

### PollingInstructionResultDetails

仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。

### PollingInstructionResultError

指令被拒绝时返回的错误详情。

- `errorCode` (string, required) — 机器可读的错误代码。
- `errorMessage` (string, required) — 人类可读的错误消息。

### QueryRecentInstructionResultInstructionHistory

近期指令历史记录。

- `historyMaxDepthNumberOfDays` (long, required) — 最大回溯时间窗口，单位为天。
- `historyMaxDepthNumberOfInstruction` (long, required) — 返回的指令数量上限。
- `result` (list of string, required) — 匹配记录的列表。

### QueryRecentInstructionResultDetails

仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。

### QueryRecentInstructionResultError

指令被拒绝时返回的错误详情。

- `errorCode` (string, required) — 机器可读的错误代码。
- `errorMessage` (string, required) — 人类可读的错误消息。

### DepositFundsPollingResultDetails

仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。

### DepositFundsPollingResultError

指令被拒绝时返回的错误详情。

- `errorCode` (string, required) — 机器可读的错误代码。
- `errorMessage` (string, required) — 人类可读的错误消息。

### QueryIraContributionsResultContributionsItems

- `maximumContributionLimit` (double, required) — 该年度允许的最大缴款额。
- `yearToDateContribution` (double, required) — 年初至今已缴款的金额。
- `allowedContributionLimit` (double, required) — 剩余允许的缴款额。

### QueryIraContributionsResultDetails

仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。

### QueryIraContributionsResultError

指令被拒绝时返回的错误详情。

- `errorCode` (string, required) — 机器可读的错误代码。
- `errorMessage` (string, required) — 人类可读的错误消息。

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

### DepositDetailsOpenBanking

仅当 bankInstructionMethod 为 OPEN_BANKING 时显示。

- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (DepositDetailsOpenBankingProviderResponse, optional) — Plaid 付款发起后返回的特定于服务提供商的数据。

### OpenBankingInstructionResultDetailsProviderResponse

特定于服务提供商的数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户关联完成后即不存在。

- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

### DepositDetailsOpenBankingProviderResponse

Plaid 付款发起后返回的特定于服务提供商的数据。

- `paymentId` (string, optional)
- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

## 示例

### 轮询状态 Pending

**响应**

```json
{
  "instructionResult": {
    "clientInstructionId": 7008156,
    "instructionId": 43092595,
    "instructionStatus": "PENDING",
    "instructionType": "INTERNAL_CASH_TRANSFER"
  },
  "instructionSetId": 2650,
  "status": 200
}
```

**SDK 代码**

```python Polling Status Pending
import requests

url = "https://localhost:5000/gw/api/v1/instructions/-1988905739"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Polling Status Pending
const url = 'https://localhost:5000/gw/api/v1/instructions/-1988905739';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Polling Status Pending
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/-1988905739"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Polling Status Pending
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/-1988905739")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Polling Status Pending
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/instructions/-1988905739")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Polling Status Pending
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/instructions/-1988905739', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Polling Status Pending
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/-1988905739");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Polling Status Pending
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/-1988905739")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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

### 轮询状态 Processed

**响应**

```json
{
  "instructionResult": {
    "clientInstructionId": 7008157,
    "instructionId": 43092596,
    "instructionStatus": "PROCESSED",
    "instructionType": "INTERNAL_CASH_TRANSFER"
  },
  "instructionSetId": 2651,
  "status": 200
}
```

**SDK 代码**

```python Polling Status Processed
import requests

url = "https://localhost:5000/gw/api/v1/instructions/-1988905739"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Polling Status Processed
const url = 'https://localhost:5000/gw/api/v1/instructions/-1988905739';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Polling Status Processed
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/-1988905739"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Polling Status Processed
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/-1988905739")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Polling Status Processed
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/instructions/-1988905739")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Polling Status Processed
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/instructions/-1988905739', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Polling Status Processed
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/-1988905739");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Polling Status Processed
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/-1988905739")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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

### 轮询状态 - Open Banking 指令

**响应**

```json
{
  "instructionResult": {
    "clientInstructionId": 11111346,
    "details": {
      "bankAccountNumber": "*****1111",
      "bankInstructionName": "Starling(1111)",
      "bankRoutingNumber": "MONGBFDFXXX",
      "currency": "EUR",
      "serviceProvider": "PLAID",
      "type": "DEBIT"
    },
    "ibReferenceId": 322257437,
    "instructionId": 703893229,
    "instructionStatus": "PROCESSED",
    "instructionType": "OPEN_BANKING_INSTRUCTION"
  },
  "instructionSetId": 924413,
  "status": 200
}
```

**SDK 代码**

```python Polling Status - Open Banking Instruction
import requests

url = "https://localhost:5000/gw/api/v1/instructions/-1988905739"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Polling Status - Open Banking Instruction
const url = 'https://localhost:5000/gw/api/v1/instructions/-1988905739';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Polling Status - Open Banking Instruction
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/-1988905739"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Polling Status - Open Banking Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/-1988905739")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Polling Status - Open Banking Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/instructions/-1988905739")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Polling Status - Open Banking Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/instructions/-1988905739', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Polling Status - Open Banking Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/-1988905739");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Polling Status - Open Banking Instruction
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/-1988905739")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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

### 轮询状态 - 出金指令

**响应**

```json
{
  "instructionResult": {
    "clientInstructionId": 11111445,
    "details": {
      "bankAccountNumber": "*****1111",
      "bankInstructionName": "Starling - LVP",
      "bankRoutingNumber": "MONZGB2LXXX",
      "currency": "GBP",
      "type": "CREDIT"
    },
    "ibReferenceId": 322374720,
    "instructionId": 704094343,
    "instructionStatus": "PROCESSED",
    "instructionType": "WITHDRAWAL_INSTRUCTION"
  },
  "instructionSetId": 929604,
  "status": 200
}
```

**SDK 代码**

```python Polling Status - Withdrawal Instruction
import requests

url = "https://localhost:5000/gw/api/v1/instructions/-1988905739"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Polling Status - Withdrawal Instruction
const url = 'https://localhost:5000/gw/api/v1/instructions/-1988905739';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Polling Status - Withdrawal Instruction
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/-1988905739"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Polling Status - Withdrawal Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/-1988905739")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Polling Status - Withdrawal Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/instructions/-1988905739")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Polling Status - Withdrawal Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/instructions/-1988905739', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Polling Status - Withdrawal Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/-1988905739");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Polling Status - Withdrawal Instruction
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/-1988905739")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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

### 轮询状态 查询近期指令

**响应**

```json
{
  "instructionResult": {
    "clientInstructionId": 13050607,
    "ibReferenceId": 0,
    "instructionHistory": {
      "historyMaxDepthNumberOfDays": 30,
      "historyMaxDepthNumberOfInstruction": 100000,
      "result": [
        {
          "clientInstructionId": 13050537,
          "ibInstructionId": 703818364,
          "instructionSetId": 880975,
          "instructionType": "COMPLEX_ASSET_TRANSFER",
          "requestDate": "2025-11-04T02:24:34-05",
          "status": "PENDING"
        },
        {
          "clientInstructionId": 13050538,
          "ibInstructionId": 703818365,
          "instructionSetId": 880975,
          "instructionType": "COMPLEX_ASSET_TRANSFER",
          "requestDate": "2025-11-04T02:24:34-05",
          "status": "PENDING"
        },
        {
          "clientInstructionId": 13050345,
          "ibInstructionId": 703817905,
          "instructionSetId": 880743,
          "instructionType": "COMPLEX_ASSET_TRANSFER",
          "requestDate": "2025-11-03T05:49:59-05",
          "status": "PENDING"
        }
      ]
    },
    "instructionId": 703818683,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_RECENT_INSTRUCTIONS"
  },
  "instructionSetId": 881283,
  "status": 200
}
```

**SDK 代码**

```python Polling Status Query Recent Instruction
import requests

url = "https://localhost:5000/gw/api/v1/instructions/-1988905739"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Polling Status Query Recent Instruction
const url = 'https://localhost:5000/gw/api/v1/instructions/-1988905739';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Polling Status Query Recent Instruction
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/-1988905739"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Polling Status Query Recent Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/-1988905739")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Polling Status Query Recent Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/instructions/-1988905739")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Polling Status Query Recent Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/instructions/-1988905739', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Polling Status Query Recent Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/-1988905739");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Polling Status Query Recent Instruction
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/-1988905739")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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

### 轮询状态 - 入金指令

**响应**

```json
{
  "instructionResult": {
    "clientInstructionId": 1091115677,
    "ibReferenceId": 166903389,
    "instructionId": 11177823,
    "instructionStatus": "PROCESSED",
    "instructionType": "DEPOSIT"
  },
  "instructionSetId": 3673,
  "status": 200
}
```

**SDK 代码**

```python Polling Status - Deposit Instruction
import requests

url = "https://localhost:5000/gw/api/v1/instructions/-1988905739"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Polling Status - Deposit Instruction
const url = 'https://localhost:5000/gw/api/v1/instructions/-1988905739';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Polling Status - Deposit Instruction
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/-1988905739"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Polling Status - Deposit Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/-1988905739")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Polling Status - Deposit Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/instructions/-1988905739")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Polling Status - Deposit Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/instructions/-1988905739', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Polling Status - Deposit Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/-1988905739");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Polling Status - Deposit Instruction
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/-1988905739")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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

### 轮询状态 - 入金指令（Open Banking）

**响应**

```json
{
  "instructionResult": {
    "clientInstructionId": 7013051,
    "depositDetails": {
      "amount": 100,
      "currency": "EUR",
      "openBanking": {
        "providerResponse": {
          "hostedlinkUrl": "https://secure.plaid.com/hl/ls90p1o43o92oo9263nprro41nqq1r03ss",
          "linkToken": "link-sandbox-45c6b98b-47bb-4718-acee-b96add6e58ff",
          "paymentId": "payment-sandbox-3c4c4c1c-9c1a-4d4d-8c1a-9c1a4d4d8c1a"
        },
        "serviceProvider": "PLAID"
      }
    },
    "ibReferenceId": 322257437,
    "instructionId": 43092469,
    "instructionStatus": "PROCESSED",
    "instructionType": "DEPOSIT"
  },
  "instructionSetId": 2481,
  "status": 200
}
```

**SDK 代码**

```python Polling Status - Deposit Instruction (Open Banking)
import requests

url = "https://localhost:5000/gw/api/v1/instructions/-1988905739"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Polling Status - Deposit Instruction (Open Banking)
const url = 'https://localhost:5000/gw/api/v1/instructions/-1988905739';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Polling Status - Deposit Instruction (Open Banking)
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/-1988905739"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Polling Status - Deposit Instruction (Open Banking)
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/-1988905739")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Polling Status - Deposit Instruction (Open Banking)
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/instructions/-1988905739")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Polling Status - Deposit Instruction (Open Banking)
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/instructions/-1988905739', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Polling Status - Deposit Instruction (Open Banking)
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/-1988905739");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Polling Status - Deposit Instruction (Open Banking)
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/-1988905739")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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

### 轮询状态 - 查询 IRA 缴款

**响应**

```json
{
  "instructionResult": {
    "accountId": "U68903",
    "clientInstructionId": 7013308,
    "contributions": [
      {
        "allowedContributionLimit": 500,
        "maximumContributionLimit": 4000,
        "yearToDateContribution": 3500
      }
    ],
    "ibReferenceId": 0,
    "instructionId": 43134476,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_IRA_CONTRIBUTIONS",
    "iraType": "ROTH NEW",
    "year": "2003"
  },
  "instructionSetId": 18642,
  "status": 200
}
```

**SDK 代码**

```python Polling Status - Query IRA Contributions
import requests

url = "https://localhost:5000/gw/api/v1/instructions/-1988905739"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Polling Status - Query IRA Contributions
const url = 'https://localhost:5000/gw/api/v1/instructions/-1988905739';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Polling Status - Query IRA Contributions
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/-1988905739"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Polling Status - Query IRA Contributions
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/-1988905739")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Polling Status - Query IRA Contributions
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/instructions/-1988905739")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Polling Status - Query IRA Contributions
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/instructions/-1988905739', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Polling Status - Query IRA Contributions
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/-1988905739");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Polling Status - Query IRA Contributions
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/-1988905739")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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

### 轮询状态 - 查询 IRA 缴款（SEP 账户）

**响应**

```json
{
  "instructionResult": {
    "accountId": "U1032333",
    "clientInstructionId": 7013306,
    "contributions": [
      {
        "maximumContributionLimit": 7000,
        "type": "EMPLOYEE",
        "yearToDateContribution": 0
      },
      {
        "maximumContributionLimit": 58000,
        "type": "EMPLOYER",
        "yearToDateContribution": 0
      }
    ],
    "ibReferenceId": 0,
    "instructionId": 43134474,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_IRA_CONTRIBUTIONS",
    "iraType": "SEP",
    "year": "2022"
  },
  "instructionSetId": 18640,
  "status": 200
}
```

**SDK 代码**

```python Polling Status - Query IRA Contributions (SEP Accounts)
import requests

url = "https://localhost:5000/gw/api/v1/instructions/-1988905739"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Polling Status - Query IRA Contributions (SEP Accounts)
const url = 'https://localhost:5000/gw/api/v1/instructions/-1988905739';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Polling Status - Query IRA Contributions (SEP Accounts)
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/-1988905739"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Polling Status - Query IRA Contributions (SEP Accounts)
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/-1988905739")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Polling Status - Query IRA Contributions (SEP Accounts)
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/instructions/-1988905739")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Polling Status - Query IRA Contributions (SEP Accounts)
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/instructions/-1988905739', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Polling Status - Query IRA Contributions (SEP Accounts)
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/-1988905739");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Polling Status - Query IRA Contributions (SEP Accounts)
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/-1988905739")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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

### 响应

**响应**

```json
{
  "instructionResult": {
    "clientInstructionId": 1013025,
    "error": {
      "errorCode": "CORRUPT_DATA_INVALID_ACCT",
      "errorMessage": "Account U1 does not exist"
    },
    "instructionId": 43091799,
    "instructionStatus": "REJECTED",
    "instructionType": "INTERNAL_CASH_TRANSFER"
  },
  "instructionSetId": 1686,
  "status": 208
}
```

**SDK 代码**

```python Response
import requests

url = "https://localhost:5000/gw/api/v1/instructions/-1988905739"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Response
const url = 'https://localhost:5000/gw/api/v1/instructions/-1988905739';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Response
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/-1988905739"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Response
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/-1988905739")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Response
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/instructions/-1988905739")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Response
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/instructions/-1988905739', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Response
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/-1988905739");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Response
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/-1988905739")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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