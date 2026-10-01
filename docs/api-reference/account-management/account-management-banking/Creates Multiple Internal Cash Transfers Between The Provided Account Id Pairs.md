# 在提供的账户 ID 对之间创建多笔内部资金划转

POST https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk
Content-Type: application/json

**范围**: `transfers.write`**安全策略**: `Signed JWT`

参考： https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/bulk-internal-cash-transfers

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
  - Allowed values: `INTERNAL_CASH_TRANSFER`
- `instructions` (list of any, required)

## 响应

### 202

接受批量请求中的所有指令并异步创建

- `status` (long, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResults` (list of AsynchronousInstructionSetResponseInstructionResultsItems, optional) — 批量请求中每条指令的结果。

### 207

部分或全部指令被拒绝，部分指令（如有）被接受以进行异步创建

- `status` (long, required) — 该批量请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
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
- `instructionSetId` (double, required) — 对提交的指令进行分组的指令集标识符。
- `instructionResult` (InstructionResult, required) — 提交的指令的结果。

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

### InstructionResult

提交的指令的结果。

- `clientInstructionId` (double, required) — 由客户端分配的该指令标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的易读说明（例如轮询指引）。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。
- `details` (InstructionResultDetails, optional) — 仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型出现。
- `depositDetails` (DepositDetails, optional) — 仅对 DEPOSIT 指令类型出现。

### InstructionResultDetails

仅对 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型出现。

### DepositDetails

- `amount` (double, optional)
- `currency` (string, optional)
- `whenAvailable` (date, optional)
- `openBanking` (DepositDetailsOpenBanking, optional) — 仅当 bankInstructionMethod 为 OPEN_BANKING 时出现。

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

### DepositDetailsOpenBanking

仅当 bankInstructionMethod 为 OPEN_BANKING 时出现。

- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (DepositDetailsOpenBankingProviderResponse, optional) — Plaid 付款发起后返回的提供商特定数据。

### OpenBankingInstructionResultDetailsProviderResponse

提供商特定数据。对于 PLAID，仅在账户关联待处理时填充 hostedlinkUrl/linkToken；账户关联完成后不再出现。

- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

### DepositDetailsOpenBankingProviderResponse

Plaid 付款发起后返回的提供商特定数据。

- `paymentId` (string, optional)
- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

## 示例

### Internal Cash Transfer Bulk - All Accepted

**响应**

```json
{
  "status": 202,
  "instructionSetId": 912839128309,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 912839128309,
      "instructionResult": {
        "clientInstructionId": 1012983,
        "instructionType": "INTERNAL_CASH_TRANSFER",
        "instructionStatus": "PENDING",
        "instructionId": 45123654
      }
    },
    {
      "status": 202,
      "instructionSetId": 912839128309,
      "instructionResult": {
        "clientInstructionId": 1012983,
        "instructionType": "INTERNAL_CASH_TRANSFER",
        "instructionStatus": "PENDING",
        "instructionId": 45123655
      }
    }
  ]
}
```

**SDK 代码**

```python Internal Cash Transfer Bulk - All Accepted
import requests

url = "https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Internal Cash Transfer Bulk - All Accepted
const url = 'https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Internal Cash Transfer Bulk - All Accepted
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Internal Cash Transfer Bulk - All Accepted
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Internal Cash Transfer Bulk - All Accepted
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Internal Cash Transfer Bulk - All Accepted
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Internal Cash Transfer Bulk - All Accepted
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Internal Cash Transfer Bulk - All Accepted
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk")! as URL,
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

### Internal Cash Transfer Bulk - Mixed Status

**响应**

```json
{
  "status": 207,
  "instructionSetId": 912839128309,
  "instructionResults": [
    "string",
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python Internal Cash Transfer Bulk - Mixed Status
import requests

url = "https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Internal Cash Transfer Bulk - Mixed Status
const url = 'https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Internal Cash Transfer Bulk - Mixed Status
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Internal Cash Transfer Bulk - Mixed Status
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Internal Cash Transfer Bulk - Mixed Status
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Internal Cash Transfer Bulk - Mixed Status
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Internal Cash Transfer Bulk - Mixed Status
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Internal Cash Transfer Bulk - Mixed Status
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk")! as URL,
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

### Internal Cash Transfer Bulk

**请求**

```json
{
  "instructionType": "INTERNAL_CASH_TRANSFER",
  "instructions": [
    "string",
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
  "instructionSetId": 912839128309,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 912839128309,
      "instructionResult": {
        "clientInstructionId": 1012983,
        "instructionType": "INTERNAL_CASH_TRANSFER",
        "instructionStatus": "PENDING",
        "instructionId": 45123654
      }
    },
    {
      "status": 202,
      "instructionSetId": 912839128309,
      "instructionResult": {
        "clientInstructionId": 1012983,
        "instructionType": "INTERNAL_CASH_TRANSFER",
        "instructionStatus": "PENDING",
        "instructionId": 45123655
      }
    }
  ]
}
```

**SDK 代码**

```python Internal Cash Transfer Bulk
import requests

url = "https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk"

payload = {
    "instructionType": "INTERNAL_CASH_TRANSFER",
    "instructions": ["string", "string", "string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Internal Cash Transfer Bulk
const url = 'https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"INTERNAL_CASH_TRANSFER","instructions":["string","string","string","string"]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Internal Cash Transfer Bulk
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"INTERNAL_CASH_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")

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

```ruby Internal Cash Transfer Bulk
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"INTERNAL_CASH_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Internal Cash Transfer Bulk
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"INTERNAL_CASH_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Internal Cash Transfer Bulk
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk', [
  'body' => '{
  "instructionType": "INTERNAL_CASH_TRANSFER",
  "instructions": [
    "string",
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

```csharp Internal Cash Transfer Bulk
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"INTERNAL_CASH_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Internal Cash Transfer Bulk
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "INTERNAL_CASH_TRANSFER",
  "instructions": ["string", "string", "string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/internal-cash-transfers:bulk")! as URL,
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