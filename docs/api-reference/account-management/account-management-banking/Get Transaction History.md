# 获取交易历史

POST https://localhost:5000/gw/api/v1/instructions/query
Content-Type: application/json

基于 accountId 查询近期交易列表（最多 30 天）。**作用域**：`instructions.read`**安全策略**：`Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/create-instructions-query

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 签名 JWT 访问令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 路径参数

- `client-id` (string, required) — 客户端的 clientId

### 请求体（application/json）

该端点接受一个对象。

- `instructionType` (enum, required)
  - Allowed values: `QUERY_RECENT_INSTRUCTIONS`
- `instruction` (QueryRecentInstructions, required) — 查询账户近期指令的请求。

## 响应

### 202

接受以异步方式创建新指令的请求

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对所提交指令进行分组的指令集标识符。
- `instructionResult` (InstructionResult, optional) — 所提交指令的结果。

## 错误

### 400 错误请求

返回表示错误请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 403 禁止访问错误

返回表示禁止访问请求的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的人类可读简短摘要。
- `status` (long, required) — HTTP 状态码。
- `detail` (string, required) — 问题的人类可读解释。
- `instructionSetId` (long, required) — 对所提交指令进行分组的指令集标识符。
- `instructionResult` (InstructionErrorResult, required) — 所提交指令的结果。

### 422 无法处理的实体错误

返回表示业务错误的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的人类可读简短摘要。
- `status` (long, required) — HTTP 状态码（422）。
- `instructionSetId` (long, required) — 对所提交指令进行分组的指令集标识符。
- `instructionResult` (InstructionErrorResult, optional) — 所提交指令的结果。

### 500 内部服务器错误

返回表示内部服务器错误的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### QueryRecentInstructions

查询账户近期指令的请求。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `transactionHistory` (QueryRecentInstructionsTransactionHistory, required) — 交易历史的筛选/摘要。

### InstructionResult

所提交指令的结果。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionId` (double, required) — 指令的资金与银行业务标识符。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的人类可读说明（例如轮询指引）。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下存在。
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下存在。

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

### InstructionErrorResult

携带被拒绝指令错误详情的指令结果。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `error` (InstructionErrorResultError, required) — 指令被拒绝时返回的错误详情。
- `instructionId` (double, required) — 指令的资金与银行业务标识符。
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下存在。
- `description` (string, optional) — 关于结果的人类可读说明（例如轮询指引）。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下存在。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### QueryRecentInstructionsTransactionHistory

交易历史的筛选/摘要。

- `daysToGoBack` (double, required) — 回溯查找匹配指令的天数。
- `transactionType` (enum, optional) — 交易的类型。
  - Allowed values: `ALL`, `ACH_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `WITHDRAWAL`, `DEPOSIT`, `DWAC`, `FOP`, `EDDA_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `CANCEL_INSTRUCTION`, `DELETE_BANK_INSTRUCTION`, `EXTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `INTERNAL_POSITION_TRANSFER`, `COMPLEX_ASSET_TRANSFER`

### InstructionResultDetails

仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下存在。

### DepositDetails

- `amount` (double, optional)
- `currency` (string, optional)
- `whenAvailable` (date, optional)
- `openBanking` (DepositDetailsOpenBanking, optional) — 仅在 bankInstructionMethod 为 OPEN_BANKING 时存在。

### InstructionErrorResultError

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
- `providerResponse` (OpenBankingInstructionResultDetailsProviderResponse, optional) — 提供商特定的数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户关联完成后即不存在。

### WithdrawalInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)

### DepositDetailsOpenBanking

仅在 bankInstructionMethod 为 OPEN_BANKING 时存在。

- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (DepositDetailsOpenBankingProviderResponse, optional) — Plaid 支付发起后返回的提供商特定数据。

### OpenBankingInstructionResultDetailsProviderResponse

提供商特定的数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户关联完成后即不存在。

- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

### DepositDetailsOpenBankingProviderResponse

Plaid 支付发起后返回的提供商特定数据。

- `paymentId` (string, optional)
- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

## 示例

### 查询近期指令

**请求**

```json
{
  "instructionType": "QUERY_RECENT_INSTRUCTIONS",
  "instruction": {
    "clientInstructionId": 7009001,
    "accountId": "U139838",
    "transactionHistory": {
      "daysToGoBack": 3,
      "transactionType": "ACH_INSTRUCTION"
    }
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 3702,
  "instructionResult": {
    "clientInstructionId": 7009001,
    "instructionType": "QUERY_RECENT_INSTRUCTIONS",
    "instructionStatus": "PENDING",
    "instructionId": 43094002,
    "ibReferenceId": 0,
    "description": "Query is being processed. Please poll for status 1 minutes later using FB status endpoint. No new queries will be allowed before this one is processed",
    "code": "PENDING"
  }
}
```

**SDK 代码**

```python Query Recent Instructions
import requests

url = "https://localhost:5000/gw/api/v1/instructions/query"

payload = {
    "instructionType": "QUERY_RECENT_INSTRUCTIONS",
    "instruction": {
        "clientInstructionId": 7009001,
        "accountId": "U139838",
        "transactionHistory": {
            "daysToGoBack": 3,
            "transactionType": "ACH_INSTRUCTION"
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

```javascript Query Recent Instructions
const url = 'https://localhost:5000/gw/api/v1/instructions/query';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"QUERY_RECENT_INSTRUCTIONS","instruction":{"clientInstructionId":7009001,"accountId":"U139838","transactionHistory":{"daysToGoBack":3,"transactionType":"ACH_INSTRUCTION"}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query Recent Instructions
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/query"

	payload := strings.NewReader("{\n  \"instructionType\": \"QUERY_RECENT_INSTRUCTIONS\",\n  \"instruction\": {\n    \"clientInstructionId\": 7009001,\n    \"accountId\": \"U139838\",\n    \"transactionHistory\": {\n      \"daysToGoBack\": 3,\n      \"transactionType\": \"ACH_INSTRUCTION\"\n    }\n  }\n}")

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

```ruby Query Recent Instructions
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"QUERY_RECENT_INSTRUCTIONS\",\n  \"instruction\": {\n    \"clientInstructionId\": 7009001,\n    \"accountId\": \"U139838\",\n    \"transactionHistory\": {\n      \"daysToGoBack\": 3,\n      \"transactionType\": \"ACH_INSTRUCTION\"\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Query Recent Instructions
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/instructions/query")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"QUERY_RECENT_INSTRUCTIONS\",\n  \"instruction\": {\n    \"clientInstructionId\": 7009001,\n    \"accountId\": \"U139838\",\n    \"transactionHistory\": {\n      \"daysToGoBack\": 3,\n      \"transactionType\": \"ACH_INSTRUCTION\"\n    }\n  }\n}")
  .asString();
```

```php Query Recent Instructions
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/instructions/query', [
  'body' => '{
  "instructionType": "QUERY_RECENT_INSTRUCTIONS",
  "instruction": {
    "clientInstructionId": 7009001,
    "accountId": "U139838",
    "transactionHistory": {
      "daysToGoBack": 3,
      "transactionType": "ACH_INSTRUCTION"
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

```csharp Query Recent Instructions
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"QUERY_RECENT_INSTRUCTIONS\",\n  \"instruction\": {\n    \"clientInstructionId\": 7009001,\n    \"accountId\": \"U139838\",\n    \"transactionHistory\": {\n      \"daysToGoBack\": 3,\n      \"transactionType\": \"ACH_INSTRUCTION\"\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Query Recent Instructions
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "QUERY_RECENT_INSTRUCTIONS",
  "instruction": [
    "clientInstructionId": 7009001,
    "accountId": "U139838",
    "transactionHistory": [
      "daysToGoBack": 3,
      "transactionType": "ACH_INSTRUCTION"
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/query")! as URL,
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

### 查询近期指令 - 未指定交易类型

**请求**

```json
{
  "instructionType": "QUERY_RECENT_INSTRUCTIONS",
  "instruction": {
    "clientInstructionId": 7009001,
    "accountId": "U139838",
    "transactionHistory": {
      "daysToGoBack": 3
    }
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 3702,
  "instructionResult": {
    "clientInstructionId": 7009001,
    "instructionType": "QUERY_RECENT_INSTRUCTIONS",
    "instructionStatus": "PENDING",
    "instructionId": 43094002,
    "ibReferenceId": 0,
    "description": "Query is being processed. Please poll for status 1 minutes later using FB status endpoint. No new queries will be allowed before this one is processed",
    "code": "PENDING"
  }
}
```

**SDK 代码**

```python Query Recent Instructions - Transaction Type not specified
import requests

url = "https://localhost:5000/gw/api/v1/instructions/query"

payload = {
    "instructionType": "QUERY_RECENT_INSTRUCTIONS",
    "instruction": {
        "clientInstructionId": 7009001,
        "accountId": "U139838",
        "transactionHistory": { "daysToGoBack": 3 }
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Query Recent Instructions - Transaction Type not specified
const url = 'https://localhost:5000/gw/api/v1/instructions/query';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"QUERY_RECENT_INSTRUCTIONS","instruction":{"clientInstructionId":7009001,"accountId":"U139838","transactionHistory":{"daysToGoBack":3}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Query Recent Instructions - Transaction Type not specified
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/query"

	payload := strings.NewReader("{\n  \"instructionType\": \"QUERY_RECENT_INSTRUCTIONS\",\n  \"instruction\": {\n    \"clientInstructionId\": 7009001,\n    \"accountId\": \"U139838\",\n    \"transactionHistory\": {\n      \"daysToGoBack\": 3\n    }\n  }\n}")

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

```ruby Query Recent Instructions - Transaction Type not specified
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/query")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"QUERY_RECENT_INSTRUCTIONS\",\n  \"instruction\": {\n    \"clientInstructionId\": 7009001,\n    \"accountId\": \"U139838\",\n    \"transactionHistory\": {\n      \"daysToGoBack\": 3\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Query Recent Instructions - Transaction Type not specified
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/instructions/query")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"QUERY_RECENT_INSTRUCTIONS\",\n  \"instruction\": {\n    \"clientInstructionId\": 7009001,\n    \"accountId\": \"U139838\",\n    \"transactionHistory\": {\n      \"daysToGoBack\": 3\n    }\n  }\n}")
  .asString();
```

```php Query Recent Instructions - Transaction Type not specified
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/instructions/query', [
  'body' => '{
  "instructionType": "QUERY_RECENT_INSTRUCTIONS",
  "instruction": {
    "clientInstructionId": 7009001,
    "accountId": "U139838",
    "transactionHistory": {
      "daysToGoBack": 3
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

```csharp Query Recent Instructions - Transaction Type not specified
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/query");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"QUERY_RECENT_INSTRUCTIONS\",\n  \"instruction\": {\n    \"clientInstructionId\": 7009001,\n    \"accountId\": \"U139838\",\n    \"transactionHistory\": {\n      \"daysToGoBack\": 3\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Query Recent Instructions - Transaction Type not specified
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "QUERY_RECENT_INSTRUCTIONS",
  "instruction": [
    "clientInstructionId": 7009001,
    "accountId": "U139838",
    "transactionHistory": ["daysToGoBack": 3]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/query")! as URL,
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