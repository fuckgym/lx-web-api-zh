# 创建多笔撤销指令

POST https://localhost:5000/gw/api/v1/instructions/cancel:bulk
Content-Type: application/json

**范围**: `instructions.write`**安全策略**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/bulk-instructions-cancel

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
  - Allowed values: `CANCEL_INSTRUCTION`
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

### 响应

**响应**

```json
{
  "status": 202,
  "instructionSetId": 3855,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 3855,
      "instructionResult": {
        "clientInstructionId": 12001861,
        "instructionType": "CANCEL_INSTRUCTION",
        "instructionStatus": "PROCESSED",
        "instructionId": 43094281
      }
    },
    {
      "status": 202,
      "instructionSetId": 3855,
      "instructionResult": {
        "clientInstructionId": 12001862,
        "instructionType": "CANCEL_INSTRUCTION",
        "instructionStatus": "PROCESSED",
        "instructionId": 43094282
      }
    },
    {
      "status": 202,
      "instructionSetId": 3855,
      "instructionResult": {
        "clientInstructionId": 12001863,
        "instructionType": "CANCEL_INSTRUCTION",
        "instructionStatus": "PROCESSED",
        "instructionId": 43094283
      }
    }
  ]
}
```

**SDK 代码**

```python Response
import requests

url = "https://localhost:5000/gw/api/v1/instructions/cancel:bulk"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Response
const url = 'https://localhost:5000/gw/api/v1/instructions/cancel:bulk';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

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

	url := "https://localhost:5000/gw/api/v1/instructions/cancel:bulk"

	req, _ := http.NewRequest("POST", url, nil)

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

url = URI("https://localhost:5000/gw/api/v1/instructions/cancel:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Response
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/instructions/cancel:bulk")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Response
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/instructions/cancel:bulk', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Response
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/cancel:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Response
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/cancel:bulk")! as URL,
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

### 响应

**响应**

```json
{
  "status": 207,
  "instructionSetId": 4437,
  "instructionResults": [
    "string",
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python Response
import requests

url = "https://localhost:5000/gw/api/v1/instructions/cancel:bulk"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Response
const url = 'https://localhost:5000/gw/api/v1/instructions/cancel:bulk';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

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

	url := "https://localhost:5000/gw/api/v1/instructions/cancel:bulk"

	req, _ := http.NewRequest("POST", url, nil)

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

url = URI("https://localhost:5000/gw/api/v1/instructions/cancel:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Response
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/instructions/cancel:bulk")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Response
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/instructions/cancel:bulk', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Response
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/cancel:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Response
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/cancel:bulk")! as URL,
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

### 批量撤销指令

**请求**

```json
{
  "instructionType": "CANCEL_INSTRUCTION",
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
  "instructionSetId": 3855,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 3855,
      "instructionResult": {
        "clientInstructionId": 12001861,
        "instructionType": "CANCEL_INSTRUCTION",
        "instructionStatus": "PROCESSED",
        "instructionId": 43094281
      }
    },
    {
      "status": 202,
      "instructionSetId": 3855,
      "instructionResult": {
        "clientInstructionId": 12001862,
        "instructionType": "CANCEL_INSTRUCTION",
        "instructionStatus": "PROCESSED",
        "instructionId": 43094282
      }
    },
    {
      "status": 202,
      "instructionSetId": 3855,
      "instructionResult": {
        "clientInstructionId": 12001863,
        "instructionType": "CANCEL_INSTRUCTION",
        "instructionStatus": "PROCESSED",
        "instructionId": 43094283
      }
    }
  ]
}
```

**SDK 代码**

```python Cancel Instruction Bulk
import requests

url = "https://localhost:5000/gw/api/v1/instructions/cancel:bulk"

payload = {
    "instructionType": "CANCEL_INSTRUCTION",
    "instructions": ["string", "string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Cancel Instruction Bulk
const url = 'https://localhost:5000/gw/api/v1/instructions/cancel:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"CANCEL_INSTRUCTION","instructions":["string","string","string"]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Cancel Instruction Bulk
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/cancel:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"CANCEL_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")

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

```ruby Cancel Instruction Bulk
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/cancel:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"CANCEL_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Cancel Instruction Bulk
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/instructions/cancel:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"CANCEL_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Cancel Instruction Bulk
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/instructions/cancel:bulk', [
  'body' => '{
  "instructionType": "CANCEL_INSTRUCTION",
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

```csharp Cancel Instruction Bulk
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/cancel:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"CANCEL_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Cancel Instruction Bulk
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "CANCEL_INSTRUCTION",
  "instructions": ["string", "string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/cancel:bulk")! as URL,
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