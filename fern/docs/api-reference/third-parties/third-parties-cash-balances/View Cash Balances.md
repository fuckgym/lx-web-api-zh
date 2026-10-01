# 查看现金余额

POST https://localhost:5000/gw/api/v1/balances/query
Content-Type: application/json

按 accountId 查看可用于出金的现金及账户权益价值**范围**: `balances.read`**安全策略**: `Signed JWT`

参考： https://ibkrcampus.com/docs/web-api/api-reference/third-parties/third-parties-cash-balances/create-balances-query

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway，默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 路径参数

- `client-id` (string, required) — 客户端的 clientId

### 请求体 (application/json)

此端点期望接收一个对象。

- `instructionType` (enum, required)
  - Allowed values: `QUERY_WITHDRAWABLE_CASH_EQUITY`
- `instruction` (GwApiV1BalancesQueryPostRequestBodyContentApplicationJsonSchemaInstruction, required)

## 响应

### 201

指令已成功创建并同步处理

- `Third Parties Cash Balances_createBalancesQuery_Response_201`

## 错误

### 400 错误请求错误

返回表示错误请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 403 禁止访问错误

返回表示禁止访问请求的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短、易读摘要。
- `status` (long, required) — HTTP 状态码。
- `detail` (string, required) — 问题的人类可读解释。
- `instructionSetId` (long, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (InstructionErrorResult, required) — 提交的指令的结果。

### 422 无法处理的实体错误

返回表示业务错误的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短、易读摘要。
- `status` (long, required) — HTTP 状态码 (422)。
- `instructionSetId` (long, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (InstructionErrorResult, optional) — 提交的指令的结果。

### 500 服务器内部错误

返回表示服务器内部错误的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### GwApiV1BalancesQueryPostRequestBodyContentApplicationJsonSchemaInstruction

### QueryWithdrawableCashEquityResponse

包含账户可出金现金和权益的响应。

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (QueryWithdrawableCashEquityResult, optional) — 提交的指令的结果。

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

### InstructionErrorResult

包含被拒绝指令错误详情的指令结果。

- `clientInstructionId` (double, required) — 由客户端分配的该指令标识符；必须为正数且在请求内唯一。
- `error` (InstructionErrorResultError, required) — 指令被拒绝时返回的错误详情。
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `depositDetails` (DepositDetails, optional) — 仅对 DEPOSIT 指令类型出现。
- `description` (string, optional) — 关于结果的易读说明（例如轮询指引）。
- `details` (InstructionResultDetails, optional) — 仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型出现。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### QueryWithdrawableCashEquity

查询账户可出金现金和权益的请求。

- `clientInstructionId` (double, required) — 由客户端分配的该指令标识符；必须为正数且在请求内唯一。
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。

### QueryWithdrawableCashEquityResult

账户的可出金现金和权益。

- `clientInstructionId` (double, required) — 由客户端分配的该指令标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `REJECTED`, `PROCESSED`
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `withdrawableCashAmount` (double, required) — 可出金的现金金额。
- `availableEquityValue` (double, required) — 账户的可用权益价值。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的易读说明。
- `details` (QueryWithdrawableCashEquityResultDetails, optional) — 仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型出现。
- `depositDetails` (DepositDetails, optional) — 仅对 DEPOSIT 指令类型出现。
- `error` (QueryWithdrawableCashEquityResultError, optional) — 指令被拒绝时返回的错误详情。
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

仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型出现。

### QueryWithdrawableCashEquityResultDetails

仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型出现。

### QueryWithdrawableCashEquityResultError

指令被拒绝时返回的错误详情。

- `errorCode` (string, required) — 机器可读的错误代码。
- `errorMessage` (string, required) — 人类可读的错误消息。

### DepositDetailsOpenBanking

仅当 bankInstructionMethod 为 OPEN_BANKING 时出现。

- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (DepositDetailsOpenBankingProviderResponse, optional) — Plaid 付款发起后返回的提供商特定数据。

### OpenBankingInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)
- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (OpenBankingInstructionResultDetailsProviderResponse, optional) — 提供商特定数据。对于 PLAID，仅在账户关联待处理时填充 hostedlinkUrl/linkToken；账户关联完成后不再出现。

### WithdrawalInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)

### DepositDetailsOpenBankingProviderResponse

Plaid 付款发起后返回的提供商特定数据。

- `paymentId` (string, optional)
- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

### OpenBankingInstructionResultDetailsProviderResponse

提供商特定数据。对于 PLAID，仅在账户关联待处理时填充 hostedlinkUrl/linkToken；账户关联完成后不再出现。

- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

## 示例

### Query Withdrawable Cash Equity Response

**响应**

```json
{
  "instructionResult": {
    "accountId": "U46377",
    "availableEquityValue": 121538.65,
    "clientInstructionId": 7013230,
    "currency": "USD",
    "ibReferenceId": 0,
    "instructionId": 43133309,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_WITHDRAWABLE_CASH_EQUITY",
    "withdrawableCashAmount": 250000
  },
  "instructionSetId": 17791,
  "status": 201
}
```

**SDK 代码**

```python Query Withdrawable Cash Equity Response
import requests

url = "https://localhost:5000/gw/api/v1/balances/query"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Query Withdrawable Cash Equity Response
const url = 'https://localhost:5000/gw/api/v1/balances/query';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query Withdrawable Cash Equity Response
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/balances/query"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Query Withdrawable Cash Equity Response
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/balances/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Query Withdrawable Cash Equity Response
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/balances/query")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Query Withdrawable Cash Equity Response
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/balances/query', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Query Withdrawable Cash Equity Response
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/balances/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Query Withdrawable Cash Equity Response
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/balances/query")! as URL,
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

### Query Withdrawable Cash amd Equity

**请求**

```json
{
  "instructionType": "QUERY_WITHDRAWABLE_CASH_EQUITY",
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
    "availableEquityValue": 121538.65,
    "clientInstructionId": 7013230,
    "currency": "USD",
    "ibReferenceId": 0,
    "instructionId": 43133309,
    "instructionStatus": "PROCESSED",
    "instructionType": "QUERY_WITHDRAWABLE_CASH_EQUITY",
    "withdrawableCashAmount": 250000
  },
  "instructionSetId": 17791,
  "status": 201
}
```

**SDK 代码**

```python Query Withdrawable Cash amd Equity
import requests

url = "https://localhost:5000/gw/api/v1/balances/query"

payload = {
    "instructionType": "QUERY_WITHDRAWABLE_CASH_EQUITY",
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

```javascript Query Withdrawable Cash amd Equity
const url = 'https://localhost:5000/gw/api/v1/balances/query';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"QUERY_WITHDRAWABLE_CASH_EQUITY","instruction":{"accountId":"U87440","clientInstructionId":7009005,"currency":"USD"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query Withdrawable Cash amd Equity
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/balances/query"

	payload := strings.NewReader("{\n  \"instructionType\": \"QUERY_WITHDRAWABLE_CASH_EQUITY\",\n  \"instruction\": {\n    \"accountId\": \"U87440\",\n    \"clientInstructionId\": 7009005,\n    \"currency\": \"USD\"\n  }\n}")

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

```ruby Query Withdrawable Cash amd Equity
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/balances/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"QUERY_WITHDRAWABLE_CASH_EQUITY\",\n  \"instruction\": {\n    \"accountId\": \"U87440\",\n    \"clientInstructionId\": 7009005,\n    \"currency\": \"USD\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Query Withdrawable Cash amd Equity
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/balances/query")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"QUERY_WITHDRAWABLE_CASH_EQUITY\",\n  \"instruction\": {\n    \"accountId\": \"U87440\",\n    \"clientInstructionId\": 7009005,\n    \"currency\": \"USD\"\n  }\n}")
  .asString();
```

```php Query Withdrawable Cash amd Equity
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/balances/query', [
  'body' => '{
  "instructionType": "QUERY_WITHDRAWABLE_CASH_EQUITY",
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

```csharp Query Withdrawable Cash amd Equity
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/balances/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"QUERY_WITHDRAWABLE_CASH_EQUITY\",\n  \"instruction\": {\n    \"accountId\": \"U87440\",\n    \"clientInstructionId\": 7009005,\n    \"currency\": \"USD\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Query Withdrawable Cash amd Equity
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "QUERY_WITHDRAWABLE_CASH_EQUITY",
  "instruction": [
    "accountId": "U87440",
    "clientInstructionId": 7009005,
    "currency": "USD"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/balances/query")! as URL,
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