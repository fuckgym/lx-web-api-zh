# 创建多个银行指令(ach, Open-banking, Withdrawal, Delete, Traditional-bank-instruction-verification, Predefined-destination-instruction, Edda)

POST https://localhost:5000/gw/api/v1/bank-instructions:bulk
Content-Type: application/json

**范围**: `bank-instructions.write`**安全策略**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/bulk-bank-instructions

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 路径参数

- `client-id` (string, required) — 客户端的 clientId

### 请求体 (application/json)

此端点期望接收一个对象。

- `instructionType` (enum, required)
  - Allowed values: `ACH_INSTRUCTION`, `OPEN_BANKING_INSTRUCTION`, `WITHDRAWAL_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `DELETE_BANK_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `EDDA_INSTRUCTION`
- `instructions` (list of any, required)

## 响应

### 202

接受批量请求中的所有指令，以异步方式创建它们

- `status` (long, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResults` (list of AsynchronousInstructionSetResponseInstructionResultsItems, optional) — 批量请求中每条指令的结果。

### 207

部分或全部指令被拒绝，部分指令（如有）被接受以进行异步创建

- `status` (long, required) — 批量请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResults` (list of any, optional) — 批量请求中每条指令的结果。

## 错误

### 400 错误请求错误

返回一个表示错误请求的 Problem detail 实例。即使批量上传中仅有一条指令存在语法错误，也会返回该响应。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 500 内部服务器错误

由于内部错误，无法处理请求。请稍后重试。

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

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionId` (double, required) — 该指令的资金与银行（Funds and Banking）标识符。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的人类可读说明（例如轮询指引）。
- `processedTimestamp` (datetime, optional) — 指令被处理的时间戳。
- `details` (InstructionResultDetails, optional) — 仅在指令类型为 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 时存在。
- `depositDetails` (DepositDetails, optional) — 仅在指令类型为 DEPOSIT 时存在。

### InstructionResultDetails

仅在指令类型为 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 时存在。

### DepositDetails

- `amount` (double, optional)
- `currency` (string, optional)
- `whenAvailable` (date, optional)
- `openBanking` (DepositDetailsOpenBanking, optional) — 仅当 bankInstructionMethod 为 OPEN_BANKING 时存在。

### OpenBankingInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)
- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (OpenBankingInstructionResultDetailsProviderResponse, optional) — 服务商特定数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户关联完成后则不再提供。

### WithdrawalInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)

### DepositDetailsOpenBanking

仅当 bankInstructionMethod 为 OPEN_BANKING 时存在。

- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (DepositDetailsOpenBankingProviderResponse, optional) — 在 Plaid 支付发起后返回的服务商特定数据。

### OpenBankingInstructionResultDetailsProviderResponse

服务商特定数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户关联完成后则不再提供。

- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

### DepositDetailsOpenBankingProviderResponse

在 Plaid 支付发起后返回的服务商特定数据。

- `paymentId` (string, optional)
- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

## 示例

### 删除指令

**请求**

```json
{
  "instructionType": "DELETE_BANK_INSTRUCTION",
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
  "instructionSetId": 1522,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 1522,
      "instructionResult": {
        "clientInstructionId": 12003410,
        "instructionType": "DELETE_BANK_INSTRUCTION",
        "instructionStatus": "PENDING",
        "instructionId": 11132283
      }
    },
    {
      "status": 202,
      "instructionSetId": 1522,
      "instructionResult": {
        "clientInstructionId": 12003411,
        "instructionType": "DELETE_BANK_INSTRUCTION",
        "instructionStatus": "PENDING",
        "instructionId": 11132284
      }
    },
    {
      "status": 202,
      "instructionSetId": 1522,
      "instructionResult": {
        "clientInstructionId": 12003412,
        "instructionType": "DELETE_BANK_INSTRUCTION",
        "instructionStatus": "PENDING",
        "instructionId": 11132285
      }
    }
  ]
}
```

**SDK 代码**

```python Delete Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

payload = {
    "instructionType": "DELETE_BANK_INSTRUCTION",
    "instructions": ["string", "string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Delete Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DELETE_BANK_INSTRUCTION","instructions":["string","string","string"]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Delete Instruction
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"DELETE_BANK_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")

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

```ruby Delete Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DELETE_BANK_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Delete Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DELETE_BANK_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Delete Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions:bulk', [
  'body' => '{
  "instructionType": "DELETE_BANK_INSTRUCTION",
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

```csharp Delete Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DELETE_BANK_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Delete Instruction
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "DELETE_BANK_INSTRUCTION",
  "instructions": ["string", "string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions:bulk")! as URL,
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

### ACH 指令

**请求**

```json
{
  "instructionType": "ACH_INSTRUCTION",
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
  "instructionSetId": 4505,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 4505,
      "instructionResult": {
        "clientInstructionId": 7011149,
        "instructionType": "ACH_INSTRUCTION",
        "instructionStatus": "PENDING",
        "instructionId": 43096799
      }
    },
    {
      "status": 202,
      "instructionSetId": 4505,
      "instructionResult": {
        "clientInstructionId": 7011150,
        "instructionType": "ACH_INSTRUCTION",
        "instructionStatus": "PENDING",
        "instructionId": 43096800
      }
    }
  ]
}
```

**SDK 代码**

```python ACH Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

payload = {
    "instructionType": "ACH_INSTRUCTION",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript ACH Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"ACH_INSTRUCTION","instructions":["string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"ACH_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/bank-instructions:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"ACH_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java ACH Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"ACH_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php ACH Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions:bulk', [
  'body' => '{
  "instructionType": "ACH_INSTRUCTION",
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

```csharp ACH Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"ACH_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions:bulk")! as URL,
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
  "instructionSetId": 4505,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 4505,
      "instructionResult": {
        "clientInstructionId": 7011149,
        "instructionType": "TRADITIONAL_BANK_INSTRUCTION_VERIFICATION",
        "instructionStatus": "PENDING",
        "instructionId": 43096799
      }
    },
    {
      "status": 202,
      "instructionSetId": 4505,
      "instructionResult": {
        "clientInstructionId": 7011150,
        "instructionType": "TRADITIONAL_BANK_INSTRUCTION_VERIFICATION",
        "instructionStatus": "PENDING",
        "instructionId": 43096800
      }
    }
  ]
}
```

**SDK 代码**

```python Traditional Bank Instruction Verification
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

payload = {
    "instructionType": "TRADITIONAL_BANK_INSTRUCTION_VERIFICATION",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Traditional Bank Instruction Verification
const url = 'https://localhost:5000/gw/api/v1/bank-instructions:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION","instructions":["string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/bank-instructions:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Traditional Bank Instruction Verification
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Traditional Bank Instruction Verification
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions:bulk', [
  'body' => '{
  "instructionType": "TRADITIONAL_BANK_INSTRUCTION_VERIFICATION",
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

```csharp Traditional Bank Instruction Verification
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions:bulk")! as URL,
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
  "instructionSetId": 4512,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 4512,
      "instructionResult": {
        "clientInstructionId": 7011169,
        "instructionType": "PREDEFINED_DESTINATION_INSTRUCTION",
        "instructionStatus": "PENDING",
        "instructionId": 43096811
      }
    },
    {
      "status": 202,
      "instructionSetId": 4512,
      "instructionResult": {
        "clientInstructionId": 7011170,
        "instructionType": "PREDEFINED_DESTINATION_INSTRUCTION",
        "instructionStatus": "PENDING",
        "instructionId": 43096812
      }
    }
  ]
}
```

**SDK 代码**

```python Predefined Destination Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

payload = {
    "instructionType": "PREDEFINED_DESTINATION_INSTRUCTION",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Predefined Destination Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"PREDEFINED_DESTINATION_INSTRUCTION","instructions":["string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"PREDEFINED_DESTINATION_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/bank-instructions:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"PREDEFINED_DESTINATION_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Predefined Destination Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"PREDEFINED_DESTINATION_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Predefined Destination Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions:bulk', [
  'body' => '{
  "instructionType": "PREDEFINED_DESTINATION_INSTRUCTION",
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

```csharp Predefined Destination Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"PREDEFINED_DESTINATION_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions:bulk")! as URL,
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
  "instructionSetId": 4512,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 4512,
      "instructionResult": {
        "clientInstructionId": 7011169,
        "instructionType": "EDDA_INSTRUCTION",
        "instructionStatus": "PENDING",
        "instructionId": 43096811
      }
    },
    {
      "status": 202,
      "instructionSetId": 4512,
      "instructionResult": {
        "clientInstructionId": 7011170,
        "instructionType": "EDDA_INSTRUCTION",
        "instructionStatus": "PENDING",
        "instructionId": 43096812
      }
    }
  ]
}
```

**SDK 代码**

```python eDDA Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

payload = {
    "instructionType": "EDDA_INSTRUCTION",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript eDDA Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"EDDA_INSTRUCTION","instructions":["string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"EDDA_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/bank-instructions:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"EDDA_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java eDDA Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"EDDA_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php eDDA Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions:bulk', [
  'body' => '{
  "instructionType": "EDDA_INSTRUCTION",
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

```csharp eDDA Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"EDDA_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions:bulk")! as URL,
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
  "instructionSetId": 924413,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 924413,
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
    },
    {
      "status": 202,
      "instructionSetId": 924413,
      "instructionResult": {
        "clientInstructionId": 11111319,
        "instructionType": "OPEN_BANKING_INSTRUCTION",
        "instructionStatus": "PENDING",
        "instructionId": 703854683,
        "details": {
          "providerResponse": {
            "hostedlinkUrl": "https://secure.plaid.com/hl/ns91q2p54p03pp0374osqp52orqq2s14tt",
            "linkToken": "link-sandbox-56d7c09c-58cc-5829-bdff-c07bbe6f69gg"
          },
          "serviceProvider": "PLAID"
        }
      }
    }
  ]
}
```

**SDK 代码**

```python Open Banking Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

payload = {
    "instructionType": "OPEN_BANKING_INSTRUCTION",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Open Banking Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"OPEN_BANKING_INSTRUCTION","instructions":["string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"OPEN_BANKING_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/bank-instructions:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"OPEN_BANKING_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Open Banking Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"OPEN_BANKING_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Open Banking Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions:bulk', [
  'body' => '{
  "instructionType": "OPEN_BANKING_INSTRUCTION",
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

```csharp Open Banking Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"OPEN_BANKING_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions:bulk")! as URL,
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

**请求**

```json
{
  "instructionType": "WITHDRAWAL_INSTRUCTION",
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
  "instructionSetId": 929604,
  "instructionResults": [
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
    },
    {
      "status": 202,
      "instructionSetId": 929604,
      "instructionResult": {
        "clientInstructionId": 11111446,
        "instructionType": "WITHDRAWAL_INSTRUCTION",
        "instructionStatus": "PENDING",
        "instructionId": 704094344,
        "details": {
          "bankAccountNumber": "*****1111",
          "bankInstructionName": "BBVA - Banca Perso(1111) - SEPA",
          "bankRoutingNumber": "BBVAESMMXXX",
          "currency": "EUR",
          "type": "CREDIT"
        }
      }
    }
  ]
}
```

**SDK 代码**

```python Withdrawal Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

payload = {
    "instructionType": "WITHDRAWAL_INSTRUCTION",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Withdrawal Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"WITHDRAWAL_INSTRUCTION","instructions":["string","string"]}'
};

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
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"WITHDRAWAL_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

```ruby Withdrawal Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"WITHDRAWAL_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Withdrawal Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"WITHDRAWAL_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Withdrawal Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions:bulk', [
  'body' => '{
  "instructionType": "WITHDRAWAL_INSTRUCTION",
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

```csharp Withdrawal Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"WITHDRAWAL_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Withdrawal Instruction
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "WITHDRAWAL_INSTRUCTION",
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions:bulk")! as URL,
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

### 删除指令

**请求**

```json
{
  "instructionType": "DELETE_BANK_INSTRUCTION",
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
  "instructionSetId": 1523,
  "instructionResults": [
    "string",
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python Delete Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

payload = {
    "instructionType": "DELETE_BANK_INSTRUCTION",
    "instructions": ["string", "string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Delete Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DELETE_BANK_INSTRUCTION","instructions":["string","string","string"]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Delete Instruction
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"DELETE_BANK_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")

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

```ruby Delete Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/bank-instructions:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DELETE_BANK_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Delete Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DELETE_BANK_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Delete Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions:bulk', [
  'body' => '{
  "instructionType": "DELETE_BANK_INSTRUCTION",
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

```csharp Delete Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DELETE_BANK_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Delete Instruction
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "DELETE_BANK_INSTRUCTION",
  "instructions": ["string", "string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions:bulk")! as URL,
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

### ACH 指令

**请求**

```json
{
  "instructionType": "ACH_INSTRUCTION",
  "instructions": [
    "string",
    "string"
  ]
}
```

**响应**

```json
{
  "status": 207,
  "instructionSetId": 4506,
  "instructionResults": [
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python ACH Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

payload = {
    "instructionType": "ACH_INSTRUCTION",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript ACH Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"ACH_INSTRUCTION","instructions":["string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"ACH_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/bank-instructions:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"ACH_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java ACH Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"ACH_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php ACH Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions:bulk', [
  'body' => '{
  "instructionType": "ACH_INSTRUCTION",
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

```csharp ACH Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"ACH_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions:bulk")! as URL,
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
  "instructions": [
    "string",
    "string"
  ]
}
```

**响应**

```json
{
  "status": 207,
  "instructionSetId": 4511,
  "instructionResults": [
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python Traditional Bank Instruction Verification
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

payload = {
    "instructionType": "TRADITIONAL_BANK_INSTRUCTION_VERIFICATION",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Traditional Bank Instruction Verification
const url = 'https://localhost:5000/gw/api/v1/bank-instructions:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION","instructions":["string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/bank-instructions:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Traditional Bank Instruction Verification
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Traditional Bank Instruction Verification
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions:bulk', [
  'body' => '{
  "instructionType": "TRADITIONAL_BANK_INSTRUCTION_VERIFICATION",
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

```csharp Traditional Bank Instruction Verification
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"TRADITIONAL_BANK_INSTRUCTION_VERIFICATION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions:bulk")! as URL,
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
  "instructions": [
    "string",
    "string"
  ]
}
```

**响应**

```json
{
  "status": 207,
  "instructionSetId": 4513,
  "instructionResults": [
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python Predefined Destination Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

payload = {
    "instructionType": "PREDEFINED_DESTINATION_INSTRUCTION",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Predefined Destination Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"PREDEFINED_DESTINATION_INSTRUCTION","instructions":["string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"PREDEFINED_DESTINATION_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/bank-instructions:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"PREDEFINED_DESTINATION_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Predefined Destination Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"PREDEFINED_DESTINATION_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Predefined Destination Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions:bulk', [
  'body' => '{
  "instructionType": "PREDEFINED_DESTINATION_INSTRUCTION",
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

```csharp Predefined Destination Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"PREDEFINED_DESTINATION_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions:bulk")! as URL,
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
  "instructions": [
    "string",
    "string"
  ]
}
```

**响应**

```json
{
  "status": 207,
  "instructionSetId": 4513,
  "instructionResults": [
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python eDDA Instruction
import requests

url = "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

payload = {
    "instructionType": "EDDA_INSTRUCTION",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript eDDA Instruction
const url = 'https://localhost:5000/gw/api/v1/bank-instructions:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"EDDA_INSTRUCTION","instructions":["string","string"]}'
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

	url := "https://localhost:5000/gw/api/v1/bank-instructions:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"EDDA_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

url = URI("https://localhost:5000/gw/api/v1/bank-instructions:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"EDDA_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java eDDA Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/bank-instructions:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"EDDA_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php eDDA Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/bank-instructions:bulk', [
  'body' => '{
  "instructionType": "EDDA_INSTRUCTION",
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

```csharp eDDA Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/bank-instructions:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"EDDA_INSTRUCTION\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
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
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/bank-instructions:bulk")! as URL,
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