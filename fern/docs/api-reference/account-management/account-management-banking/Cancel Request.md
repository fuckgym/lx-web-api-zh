# 撤销请求

POST https://localhost:5000/gw/api/v1/instructions/cancel
Content-Type: application/json

通过 instructionId 撤销请求。**范围**: `instructions.write`**安全策略**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/create-instructions-cancel

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
- `instruction` (CancelInstruction, required) — 撤销先前提交的指令的请求。

## 响应

### 201

指令已成功创建并被同步处理

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionResult, optional) — 所提交指令的结果。

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
- `title` (string, required) — 问题的简短人类可读摘要。
- `status` (long, required) — HTTP 状态码。
- `detail` (string, required) — 对问题的人类可读解释。
- `instructionSetId` (long, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionErrorResult, required) — 所提交指令的结果。

### 422 无法处理的实体错误

返回表示业务错误的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短人类可读摘要。
- `status` (long, required) — HTTP 状态码 (422)。
- `instructionSetId` (long, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionErrorResult, optional) — 所提交指令的结果。

### 500 服务器内部错误

返回表示内部服务器错误的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### CancelInstruction

撤销先前提交的指令的请求。

- `clientInstructionId` (double, required) — 客户端为该指令分配的标识符；必须为正数且在请求内唯一。
- `instructionId` (double, required) — 要撤销的指令的资金与银行（Funds and Banking）标识符。
- `reason` (string, required) — 该请求的自由文本原因。

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

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

### InstructionErrorResult

携带被拒绝指令的错误详情的指令结果。

- `clientInstructionId` (double, required) — 客户端为该指令分配的标识符；必须为正数且在请求内唯一。
- `error` (InstructionErrorResultError, required) — 指令被拒绝时返回的错误详情。
- `instructionId` (double, required) — 该指令的资金与银行（Funds and Banking）标识符。
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下提供。
- `description` (string, optional) — 关于结果的人类可读说明（例如轮询指引）。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下提供。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### InstructionResultDetails

仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下提供。

### DepositDetails

- `amount` (double, optional)
- `currency` (string, optional)
- `whenAvailable` (date, optional)
- `openBanking` (DepositDetailsOpenBanking, optional) — 仅当 bankInstructionMethod 为 OPEN_BANKING 时提供。

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
  "status": 201,
  "instructionSetId": 3763,
  "instructionResult": {
    "clientInstructionId": 12001810,
    "instructionType": "CANCEL_INSTRUCTION",
    "instructionStatus": "PROCESSED",
    "instructionId": 43094179
  }
}
```

**SDK 代码**

```python Response
import requests

url = "https://localhost:5000/gw/api/v1/instructions/cancel"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Response
const url = 'https://localhost:5000/gw/api/v1/instructions/cancel';
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

	url := "https://localhost:5000/gw/api/v1/instructions/cancel"

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

url = URI("https://localhost:5000/gw/api/v1/instructions/cancel")

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

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/instructions/cancel")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Response
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/instructions/cancel', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Response
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/cancel");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Response
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/cancel")! as URL,
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

### 撤销指令

**请求**

```json
{
  "instructionType": "CANCEL_INSTRUCTION",
  "instruction": {
    "clientInstructionId": 12001810,
    "instructionId": 43085477,
    "reason": "Testing"
  }
}
```

**响应**

```json
{
  "status": 201,
  "instructionSetId": 3763,
  "instructionResult": {
    "clientInstructionId": 12001810,
    "instructionType": "CANCEL_INSTRUCTION",
    "instructionStatus": "PROCESSED",
    "instructionId": 43094179
  }
}
```

**SDK 代码**

```python Cancel Instruction
import requests

url = "https://localhost:5000/gw/api/v1/instructions/cancel"

payload = {
    "instructionType": "CANCEL_INSTRUCTION",
    "instruction": {
        "clientInstructionId": 12001810,
        "instructionId": 43085477,
        "reason": "Testing"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Cancel Instruction
const url = 'https://localhost:5000/gw/api/v1/instructions/cancel';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"CANCEL_INSTRUCTION","instruction":{"clientInstructionId":12001810,"instructionId":43085477,"reason":"Testing"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Cancel Instruction
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/instructions/cancel"

	payload := strings.NewReader("{\n  \"instructionType\": \"CANCEL_INSTRUCTION\",\n  \"instruction\": {\n    \"clientInstructionId\": 12001810,\n    \"instructionId\": 43085477,\n    \"reason\": \"Testing\"\n  }\n}")

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

```ruby Cancel Instruction
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/instructions/cancel")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"CANCEL_INSTRUCTION\",\n  \"instruction\": {\n    \"clientInstructionId\": 12001810,\n    \"instructionId\": 43085477,\n    \"reason\": \"Testing\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Cancel Instruction
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/instructions/cancel")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"CANCEL_INSTRUCTION\",\n  \"instruction\": {\n    \"clientInstructionId\": 12001810,\n    \"instructionId\": 43085477,\n    \"reason\": \"Testing\"\n  }\n}")
  .asString();
```

```php Cancel Instruction
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/instructions/cancel', [
  'body' => '{
  "instructionType": "CANCEL_INSTRUCTION",
  "instruction": {
    "clientInstructionId": 12001810,
    "instructionId": 43085477,
    "reason": "Testing"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Cancel Instruction
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instructions/cancel");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"CANCEL_INSTRUCTION\",\n  \"instruction\": {\n    \"clientInstructionId\": 12001810,\n    \"instructionId\": 43085477,\n    \"reason\": \"Testing\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Cancel Instruction
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "CANCEL_INSTRUCTION",
  "instruction": [
    "clientInstructionId": 12001810,
    "instructionId": 43085477,
    "reason": "Testing"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instructions/cancel")! as URL,
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