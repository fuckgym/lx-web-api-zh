# 内部资金划转

POST https://localhost:5000/gw/api/v1/internal-cash-transfers
Content-Type: application/json

在 Interactive Brokers 的两个账户之间进行内部资金划转。**Scope**: `transfers.write`**Security Policy**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/create-internal-cash-transfers

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
  - Allowed values: `INTERNAL_CASH_TRANSFER`
- `instruction` (InternalCashTransferInstruction, required) — 在两个 Interactive Brokers 账户之间划转资金的请求。

## 响应

### 201

同步创建一个新指令，例如不含 dateTimeToOccur 的内部资金划转

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (InstructionResult, optional) — 所提交指令的结果。

### 202

已接受异步创建新指令的请求

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (InstructionResult, optional) — 所提交指令的结果。

## 错误

### 400 无效请求错误

返回表示无效请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 403 禁止访问错误

返回表示被禁止请求的 Problem detail 实例

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

### InternalCashTransferInstruction

在两个 Interactive Brokers 账户之间划转资金的请求。

- `clientInstructionId` (double, required) — 客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `sourceAccountId` (string, required) — 资金转出的 Interactive Brokers 账户。
- `targetAccountId` (string, required) — 资金转入的 Interactive Brokers 账户。
- `amount` (double, required) — 交易的货币金额。
- `currency` (string, required) — ISO 4217 货币代码（例如 "USD"）。
- `clientNote` (string, optional) — 附加到划转的可选自由文本备注。
- `dateTimeToOccur` (datetime, optional) — 请求执行指令的日期时间，采用 ISO 8601 格式。请注意，目前我们仅考虑 DATE 部分，不考虑时间

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

### InstructionResultDetails

仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型显示。

### DepositDetails

- `amount` (double, optional)
- `currency` (string, optional)
- `whenAvailable` (date, optional)
- `openBanking` (DepositDetailsOpenBanking, optional) — 仅当 bankInstructionMethod 为 OPEN_BANKING 时显示。

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

### 响应

**响应**

```json
{
  "status": 201,
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013032,
    "instructionType": "INTERNAL_CASH_TRANSFER",
    "instructionStatus": "PROCESSED",
    "instructionId": 43091814,
    "ibReferenceId": 132123
  }
}
```

**SDK 代码**

```python Response
import requests

url = "https://localhost:5000/gw/api/v1/internal-cash-transfers"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Response
const url = 'https://localhost:5000/gw/api/v1/internal-cash-transfers';
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

	url := "https://localhost:5000/gw/api/v1/internal-cash-transfers"

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

url = URI("https://localhost:5000/gw/api/v1/internal-cash-transfers")

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

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/internal-cash-transfers")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Response
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/internal-cash-transfers', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Response
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/internal-cash-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Response
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/internal-cash-transfers")! as URL,
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
  "status": 202,
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013031,
    "instructionType": "INTERNAL_CASH_TRANSFER",
    "instructionStatus": "PENDING",
    "instructionId": 43091814
  }
}
```

**SDK 代码**

```python Response
import requests

url = "https://localhost:5000/gw/api/v1/internal-cash-transfers"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Response
const url = 'https://localhost:5000/gw/api/v1/internal-cash-transfers';
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

	url := "https://localhost:5000/gw/api/v1/internal-cash-transfers"

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

url = URI("https://localhost:5000/gw/api/v1/internal-cash-transfers")

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

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/internal-cash-transfers")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Response
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/internal-cash-transfers', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Response
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/internal-cash-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Response
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/internal-cash-transfers")! as URL,
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

### 内部资金划转

**请求**

```json
{
  "instructionType": "INTERNAL_CASH_TRANSFER",
  "instruction": {
    "clientInstructionId": 1012983,
    "sourceAccountId": "U46377",
    "targetAccountId": "U15667",
    "amount": 123.45,
    "currency": "GBP",
    "dateTimeToOccur": "2018-03-20T09:12:13Z"
  }
}
```

**响应**

```json
{
  "status": 201,
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013032,
    "instructionType": "INTERNAL_CASH_TRANSFER",
    "instructionStatus": "PROCESSED",
    "instructionId": 43091814,
    "ibReferenceId": 132123
  }
}
```

**SDK 代码**

```python Internal Cash Transfer
import requests

url = "https://localhost:5000/gw/api/v1/internal-cash-transfers"

payload = {
    "instructionType": "INTERNAL_CASH_TRANSFER",
    "instruction": {
        "clientInstructionId": 1012983,
        "sourceAccountId": "U46377",
        "targetAccountId": "U15667",
        "amount": 123.45,
        "currency": "GBP",
        "dateTimeToOccur": "2018-03-20T09:12:13Z"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Internal Cash Transfer
const url = 'https://localhost:5000/gw/api/v1/internal-cash-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"INTERNAL_CASH_TRANSFER","instruction":{"clientInstructionId":1012983,"sourceAccountId":"U46377","targetAccountId":"U15667","amount":123.45,"currency":"GBP","dateTimeToOccur":"2018-03-20T09:12:13Z"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Internal Cash Transfer
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/internal-cash-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"INTERNAL_CASH_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 1012983,\n    \"sourceAccountId\": \"U46377\",\n    \"targetAccountId\": \"U15667\",\n    \"amount\": 123.45,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2018-03-20T09:12:13Z\"\n  }\n}")

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

```ruby Internal Cash Transfer
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/internal-cash-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"INTERNAL_CASH_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 1012983,\n    \"sourceAccountId\": \"U46377\",\n    \"targetAccountId\": \"U15667\",\n    \"amount\": 123.45,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2018-03-20T09:12:13Z\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Internal Cash Transfer
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/internal-cash-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"INTERNAL_CASH_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 1012983,\n    \"sourceAccountId\": \"U46377\",\n    \"targetAccountId\": \"U15667\",\n    \"amount\": 123.45,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2018-03-20T09:12:13Z\"\n  }\n}")
  .asString();
```

```php Internal Cash Transfer
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/internal-cash-transfers', [
  'body' => '{
  "instructionType": "INTERNAL_CASH_TRANSFER",
  "instruction": {
    "clientInstructionId": 1012983,
    "sourceAccountId": "U46377",
    "targetAccountId": "U15667",
    "amount": 123.45,
    "currency": "GBP",
    "dateTimeToOccur": "2018-03-20T09:12:13Z"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Internal Cash Transfer
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/internal-cash-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"INTERNAL_CASH_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 1012983,\n    \"sourceAccountId\": \"U46377\",\n    \"targetAccountId\": \"U15667\",\n    \"amount\": 123.45,\n    \"currency\": \"GBP\",\n    \"dateTimeToOccur\": \"2018-03-20T09:12:13Z\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Internal Cash Transfer
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "INTERNAL_CASH_TRANSFER",
  "instruction": [
    "clientInstructionId": 1012983,
    "sourceAccountId": "U46377",
    "targetAccountId": "U15667",
    "amount": 123.45,
    "currency": "GBP",
    "dateTimeToOccur": "2018-03-20T09:12:13Z"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/internal-cash-transfers")! as URL,
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

### 内部资金划转 (2)

**请求**

```json
{
  "instructionType": "INTERNAL_CASH_TRANSFER",
  "instruction": {
    "clientInstructionId": 1012983,
    "sourceAccountId": "U46377",
    "targetAccountId": "U15667",
    "amount": 123.45,
    "currency": "GBP"
  }
}
```

**响应**

```json
{
  "status": 201,
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013032,
    "instructionType": "INTERNAL_CASH_TRANSFER",
    "instructionStatus": "PROCESSED",
    "instructionId": 43091814,
    "ibReferenceId": 132123
  }
}
```

**SDK 代码**

```python Internal Cash Transfer (2)
import requests

url = "https://localhost:5000/gw/api/v1/internal-cash-transfers"

payload = {
    "instructionType": "INTERNAL_CASH_TRANSFER",
    "instruction": {
        "clientInstructionId": 1012983,
        "sourceAccountId": "U46377",
        "targetAccountId": "U15667",
        "amount": 123.45,
        "currency": "GBP"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Internal Cash Transfer (2)
const url = 'https://localhost:5000/gw/api/v1/internal-cash-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"INTERNAL_CASH_TRANSFER","instruction":{"clientInstructionId":1012983,"sourceAccountId":"U46377","targetAccountId":"U15667","amount":123.45,"currency":"GBP"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Internal Cash Transfer (2)
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/internal-cash-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"INTERNAL_CASH_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 1012983,\n    \"sourceAccountId\": \"U46377\",\n    \"targetAccountId\": \"U15667\",\n    \"amount\": 123.45,\n    \"currency\": \"GBP\"\n  }\n}")

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

```ruby Internal Cash Transfer (2)
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/internal-cash-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"INTERNAL_CASH_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 1012983,\n    \"sourceAccountId\": \"U46377\",\n    \"targetAccountId\": \"U15667\",\n    \"amount\": 123.45,\n    \"currency\": \"GBP\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Internal Cash Transfer (2)
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/internal-cash-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"INTERNAL_CASH_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 1012983,\n    \"sourceAccountId\": \"U46377\",\n    \"targetAccountId\": \"U15667\",\n    \"amount\": 123.45,\n    \"currency\": \"GBP\"\n  }\n}")
  .asString();
```

```php Internal Cash Transfer (2)
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/internal-cash-transfers', [
  'body' => '{
  "instructionType": "INTERNAL_CASH_TRANSFER",
  "instruction": {
    "clientInstructionId": 1012983,
    "sourceAccountId": "U46377",
    "targetAccountId": "U15667",
    "amount": 123.45,
    "currency": "GBP"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Internal Cash Transfer (2)
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/internal-cash-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"INTERNAL_CASH_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 1012983,\n    \"sourceAccountId\": \"U46377\",\n    \"targetAccountId\": \"U15667\",\n    \"amount\": 123.45,\n    \"currency\": \"GBP\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Internal Cash Transfer (2)
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "INTERNAL_CASH_TRANSFER",
  "instruction": [
    "clientInstructionId": 1012983,
    "sourceAccountId": "U46377",
    "targetAccountId": "U15667",
    "amount": 123.45,
    "currency": "GBP"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/internal-cash-transfers")! as URL,
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