# 创建多笔外部资金划转（入金与出金）

POST https://localhost:5000/gw/api/v1/external-cash-transfers:bulk
Content-Type: application/json

**范围**: `transfers.write`**安全策略**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/bulk-external-cash-transfers

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway，默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒)

## 请求

### 路径参数

- `client-id` (string, required) — 客户端的 clientId

### 请求体 (application/json)

该端点期望接收一个对象。

- `instructionType` (enum, required)
  - Allowed values: `DEPOSIT`, `WITHDRAWAL`
- `instructions` (list of any, required)

## 响应

### 202

接受批量请求中的所有指令并异步创建它们

- `status` (long, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResults` (list of AsynchronousInstructionSetResponseInstructionResultsItems, optional) — 批量请求中每条指令的结果。

### 207

部分或全部指令被拒绝，部分指令（如有）被接受用于异步创建

- `status` (long, required) — 该批量请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResults` (list of any, optional) — 批量请求中每条指令的结果。

## 错误

### 400 错误请求错误

返回表示错误请求的 Problem detail 实例。即使批量上传中仅有一条指令存在语法错误，也会返回该响应。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 500 服务器内部错误

由于内部错误无法处理请求。请稍后重试。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### AsynchronousInstructionSetResponseInstructionResultsItems

- `status` (long, required) — 处理状态。
- `instructionSetId` (double, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionResult, required) — 所提交指令的结果。

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

### InstructionResult

所提交指令的结果。

- `clientInstructionId` (double, required) — 客户端为该指令分配的标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionId` (double, required) — 该指令的资金与银行（Funds and Banking）标识符。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的人类可读说明（例如轮询指引）。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下提供。
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下提供。

### InstructionResultDetails

仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下提供。

### DepositDetails

- `amount` (double, optional)
- `currency` (string, optional)
- `whenAvailable` (date, optional)
- `openBanking` (DepositDetailsOpenBanking, optional) — 仅当 bankInstructionMethod 为 OPEN_BANKING 时提供。

### OpenBankingInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)
- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (OpenBankingInstructionResultDetailsProviderResponse, optional) — 服务商特定数据。对于 PLAID，仅在账户关联处于等待状态时填充 hostedlinkUrl/linkToken；账户关联完成后不再提供。

### WithdrawalInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)

### DepositDetailsOpenBanking

仅当 bankInstructionMethod 为 OPEN_BANKING 时提供。

- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (DepositDetailsOpenBankingProviderResponse, optional) — Plaid 支付发起后返回的服务商特定数据。

### OpenBankingInstructionResultDetailsProviderResponse

服务商特定数据。对于 PLAID，仅在账户关联处于等待状态时填充 hostedlinkUrl/linkToken；账户关联完成后不再提供。

- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

### DepositDetailsOpenBankingProviderResponse

Plaid 支付发起后返回的服务商特定数据。

- `paymentId` (string, optional)
- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

## 示例

### 出金

**请求**

```json
{
  "instructionType": "WITHDRAWAL",
  "instructions": [
    "string",
    "string",
    "string"
  ]
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 9094,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 9094,
      "instructionResult": {
        "clientInstructionId": 7012999,
        "instructionType": "WITHDRAWAL",
        "instructionStatus": "PENDING",
        "instructionId": 43100910
      }
    },
    {
      "status": 202,
      "instructionSetId": 9094,
      "instructionResult": {
        "clientInstructionId": 7013000,
        "instructionType": "WITHDRAWAL",
        "instructionStatus": "PENDING",
        "instructionId": 43100911
      }
    },
    {
      "status": 202,
      "instructionSetId": 9094,
      "instructionResult": {
        "clientInstructionId": 7013001,
        "instructionType": "WITHDRAWAL",
        "instructionStatus": "PENDING",
        "instructionId": 43100912
      }
    }
  ]
}
```

**SDK 代码**

```python Withdraw Funds
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk"

payload = {
    "instructionType": "WITHDRAWAL",
    "instructions": ["string", "string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Withdraw Funds
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"WITHDRAWAL","instructions":["string","string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Withdraw Funds
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Withdraw Funds
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers:bulk', [
  'body' => '{
  "instructionType": "WITHDRAWAL",
  "instructions": [
    "string",
    "string",
    "string"
  ]
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

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")! as URL,
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

### 入金

**请求**

```json
{
  "instructionType": "DEPOSIT",
  "instructions": [
    "string",
    "string",
    "string"
  ]
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 9095,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 9095,
      "instructionResult": {
        "clientInstructionId": 7013002,
        "instructionType": "DEPOSIT",
        "instructionStatus": "PENDING",
        "instructionId": 43100913
      }
    },
    {
      "status": 202,
      "instructionSetId": 9095,
      "instructionResult": {
        "clientInstructionId": 7013003,
        "instructionType": "DEPOSIT",
        "instructionStatus": "PENDING",
        "instructionId": 43100914
      }
    },
    {
      "status": 202,
      "instructionSetId": 9095,
      "instructionResult": {
        "clientInstructionId": 7013004,
        "instructionType": "DEPOSIT",
        "instructionStatus": "PENDING",
        "instructionId": 43100915
      }
    }
  ]
}
```

**SDK 代码**

```python Deposit Funds
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk"

payload = {
    "instructionType": "DEPOSIT",
    "instructions": ["string", "string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Deposit Funds
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DEPOSIT","instructions":["string","string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Deposit Funds
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Deposit Funds
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers:bulk', [
  'body' => '{
  "instructionType": "DEPOSIT",
  "instructions": [
    "string",
    "string",
    "string"
  ]
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

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")! as URL,
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
  "instructions": [
    "string",
    "string"
  ]
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 9096,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 9096,
      "instructionResult": {
        "clientInstructionId": 7013051,
        "instructionType": "DEPOSIT",
        "instructionStatus": "PROCESSED",
        "instructionId": 43100916,
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
    },
    {
      "status": 202,
      "instructionSetId": 9096,
      "instructionResult": {
        "clientInstructionId": 7013052,
        "instructionType": "DEPOSIT",
        "instructionStatus": "PROCESSED",
        "instructionId": 43100917,
        "depositDetails": {
          "amount": 50,
          "currency": "GBP",
          "openBanking": {
            "serviceProvider": "PLAID",
            "providerResponse": {
              "paymentId": "payment-sandbox-56d7c09c-58cc-5829-bdff-c07bbe6f69gg",
              "hostedlinkUrl": "https://secure.plaid.com/hl/ns91q2p54p03pp0374osqp52orqq2s14tt",
              "linkToken": "link-sandbox-56d7c09c-58cc-5829-bdff-c07bbe6f69gg"
            }
          }
        }
      }
    }
  ]
}
```

**SDK 代码**

```python Deposit Funds - Open Banking
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk"

payload = {
    "instructionType": "DEPOSIT",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Deposit Funds - Open Banking
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DEPOSIT","instructions":["string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Deposit Funds - Open Banking
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Deposit Funds - Open Banking
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers:bulk', [
  'body' => '{
  "instructionType": "DEPOSIT",
  "instructions": [
    "string",
    "string"
  ]
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

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")! as URL,
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
  "instructions": [
    "string",
    "string",
    "string"
  ]
}
```

**响应**

```json
{
  "status": 207,
  "instructionSetId": 4433,
  "instructionResults": [
    "string",
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python Withdraw Funds
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk"

payload = {
    "instructionType": "WITHDRAWAL",
    "instructions": ["string", "string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Withdraw Funds
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"WITHDRAWAL","instructions":["string","string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Withdraw Funds
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Withdraw Funds
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers:bulk', [
  'body' => '{
  "instructionType": "WITHDRAWAL",
  "instructions": [
    "string",
    "string",
    "string"
  ]
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

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"WITHDRAWAL\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")! as URL,
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

### 入金

**请求**

```json
{
  "instructionType": "DEPOSIT",
  "instructions": [
    "string",
    "string",
    "string"
  ]
}
```

**响应**

```json
{
  "status": 207,
  "instructionSetId": 4493,
  "instructionResults": [
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python Deposit Funds
import requests

url = "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk"

payload = {
    "instructionType": "DEPOSIT",
    "instructions": ["string", "string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Deposit Funds
const url = 'https://localhost:5000/gw/api/v1/external-cash-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DEPOSIT","instructions":["string","string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Deposit Funds
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DEPOSIT\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Deposit Funds
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-cash-transfers:bulk', [
  'body' => '{
  "instructionType": "DEPOSIT",
  "instructions": [
    "string",
    "string",
    "string"
  ]
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

var client = new RestClient("https://localhost:5000/gw/api/v1/external-cash-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DEPOSIT\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-cash-transfers:bulk")! as URL,
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