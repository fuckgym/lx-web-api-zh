# 创建多个外部资产转移 (Fop、DWAC 和复杂资产转移)

POST https://localhost:5000/gw/api/v1/external-asset-transfers:bulk
Content-Type: application/json

**范围**: `transfers.write`**安全策略**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/bulk-external-asset-transfers

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
  - Allowed values: `DWAC`, `FOP`, `COMPLEX_ASSET_TRANSFER`, `EXTERNAL_POSITION_TRANSFER`
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

### FOP

**请求**

```json
{
  "instructionType": "FOP",
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
  "instructionSetId": 1526,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 1526,
      "instructionResult": {
        "clientInstructionId": 12003434,
        "instructionType": "FOP",
        "instructionStatus": "PENDING",
        "instructionId": 11132295
      }
    },
    {
      "status": 202,
      "instructionSetId": 1526,
      "instructionResult": {
        "clientInstructionId": 12003435,
        "instructionType": "FOP",
        "instructionStatus": "PENDING",
        "instructionId": 11132296
      }
    },
    {
      "status": 202,
      "instructionSetId": 1526,
      "instructionResult": {
        "clientInstructionId": 12003436,
        "instructionType": "FOP",
        "instructionStatus": "PENDING",
        "instructionId": 11132297
      }
    }
  ]
}
```

**SDK 代码**

```python FOP
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

payload = {
    "instructionType": "FOP",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript FOP
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"FOP","instructions":["string","string"]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go FOP
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"FOP\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

```ruby FOP
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"FOP\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java FOP
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"FOP\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php FOP
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk', [
  'body' => '{
  "instructionType": "FOP",
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

```csharp FOP
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"FOP\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift FOP
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "FOP",
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")! as URL,
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

### DWAC

**请求**

```json
{
  "instructionType": "DWAC",
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
  "instructionSetId": 4498,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 4498,
      "instructionResult": {
        "clientInstructionId": 7011115,
        "instructionType": "DWAC",
        "instructionStatus": "PENDING",
        "instructionId": 43096780
      }
    },
    {
      "status": 202,
      "instructionSetId": 4498,
      "instructionResult": {
        "clientInstructionId": 7011116,
        "instructionType": "DWAC",
        "instructionStatus": "PENDING",
        "instructionId": 43096781
      }
    }
  ]
}
```

**SDK 代码**

```python DWAC
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

payload = {
    "instructionType": "DWAC",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript DWAC
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DWAC","instructions":["string","string"]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go DWAC
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"DWAC\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

```ruby DWAC
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DWAC\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java DWAC
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DWAC\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php DWAC
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk', [
  'body' => '{
  "instructionType": "DWAC",
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

```csharp DWAC
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DWAC\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift DWAC
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "DWAC",
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")! as URL,
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

### 外部持仓转移

**请求**

```json
{
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
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
  "instructionSetId": 4500,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 4500,
      "instructionResult": {
        "clientInstructionId": 7011122,
        "instructionType": "EXTERNAL_POSITION_TRANSFER",
        "instructionStatus": "PENDING",
        "instructionId": 43096785
      }
    },
    {
      "status": 202,
      "instructionSetId": 4500,
      "instructionResult": {
        "clientInstructionId": 7011123,
        "instructionType": "EXTERNAL_POSITION_TRANSFER",
        "instructionStatus": "PENDING",
        "instructionId": 43096786
      }
    },
    {
      "status": 202,
      "instructionSetId": 4500,
      "instructionResult": {
        "clientInstructionId": 7011124,
        "instructionType": "EXTERNAL_POSITION_TRANSFER",
        "instructionStatus": "PENDING",
        "instructionId": 43096787
      }
    }
  ]
}
```

**SDK 代码**

```python External Position Transfer
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

payload = {
    "instructionType": "EXTERNAL_POSITION_TRANSFER",
    "instructions": ["string", "string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript External Position Transfer
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"EXTERNAL_POSITION_TRANSFER","instructions":["string","string","string"]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go External Position Transfer
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")

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

```ruby External Position Transfer
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java External Position Transfer
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php External Position Transfer
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk', [
  'body' => '{
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
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

```csharp External Position Transfer
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift External Position Transfer
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
  "instructions": ["string", "string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")! as URL,
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

### 复杂资产转移

**请求**

```json
{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
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
  "instructionSetId": 4502,
  "instructionResults": [
    {
      "status": 202,
      "instructionSetId": 4502,
      "instructionResult": {
        "clientInstructionId": 7011138,
        "instructionType": "COMPLEX_ASSET_TRANSFER",
        "instructionStatus": "PENDING",
        "instructionId": 43096791
      }
    },
    {
      "status": 202,
      "instructionSetId": 4502,
      "instructionResult": {
        "clientInstructionId": 7011139,
        "instructionType": "COMPLEX_ASSET_TRANSFER",
        "instructionStatus": "PENDING",
        "instructionId": 43096792
      }
    },
    {
      "status": 202,
      "instructionSetId": 4502,
      "instructionResult": {
        "clientInstructionId": 7011140,
        "instructionType": "COMPLEX_ASSET_TRANSFER",
        "instructionStatus": "PENDING",
        "instructionId": 43096793
      }
    }
  ]
}
```

**SDK 代码**

```python Complex Asset Transfer
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

payload = {
    "instructionType": "COMPLEX_ASSET_TRANSFER",
    "instructions": ["string", "string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Complex Asset Transfer
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"COMPLEX_ASSET_TRANSFER","instructions":["string","string","string"]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Complex Asset Transfer
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")

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

```ruby Complex Asset Transfer
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Complex Asset Transfer
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Complex Asset Transfer
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk', [
  'body' => '{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
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

```csharp Complex Asset Transfer
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Complex Asset Transfer
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instructions": ["string", "string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")! as URL,
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

### FOP

**请求**

```json
{
  "instructionType": "FOP",
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
  "instructionSetId": 1527,
  "instructionResults": [
    "string",
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python FOP
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

payload = {
    "instructionType": "FOP",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript FOP
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"FOP","instructions":["string","string"]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go FOP
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"FOP\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

```ruby FOP
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"FOP\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java FOP
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"FOP\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php FOP
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk', [
  'body' => '{
  "instructionType": "FOP",
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

```csharp FOP
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"FOP\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift FOP
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "FOP",
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")! as URL,
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

### DWAC

**请求**

```json
{
  "instructionType": "DWAC",
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
  "instructionSetId": 4499,
  "instructionResults": [
    "string",
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python DWAC
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

payload = {
    "instructionType": "DWAC",
    "instructions": ["string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript DWAC
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DWAC","instructions":["string","string"]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go DWAC
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"DWAC\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")

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

```ruby DWAC
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DWAC\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java DWAC
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DWAC\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php DWAC
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk', [
  'body' => '{
  "instructionType": "DWAC",
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

```csharp DWAC
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DWAC\",\n  \"instructions\": [\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift DWAC
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "DWAC",
  "instructions": ["string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")! as URL,
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

### 外部持仓转移

**请求**

```json
{
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
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
  "instructionSetId": 4501,
  "instructionResults": [
    "string",
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python External Position Transfer
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

payload = {
    "instructionType": "EXTERNAL_POSITION_TRANSFER",
    "instructions": ["string", "string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript External Position Transfer
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"EXTERNAL_POSITION_TRANSFER","instructions":["string","string","string"]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go External Position Transfer
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")

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

```ruby External Position Transfer
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java External Position Transfer
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php External Position Transfer
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk', [
  'body' => '{
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
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

```csharp External Position Transfer
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift External Position Transfer
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
  "instructions": ["string", "string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")! as URL,
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

### 复杂资产转移

**请求**

```json
{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
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
  "instructionSetId": 4503,
  "instructionResults": [
    "string",
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python Complex Asset Transfer
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

payload = {
    "instructionType": "COMPLEX_ASSET_TRANSFER",
    "instructions": ["string", "string", "string"]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Complex Asset Transfer
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"COMPLEX_ASSET_TRANSFER","instructions":["string","string","string"]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Complex Asset Transfer
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk"

	payload := strings.NewReader("{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")

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

```ruby Complex Asset Transfer
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Complex Asset Transfer
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}")
  .asString();
```

```php Complex Asset Transfer
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers:bulk', [
  'body' => '{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
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

```csharp Complex Asset Transfer
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers:bulk");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instructions\": [\n    \"string\",\n    \"string\",\n    \"string\"\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Complex Asset Transfer
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instructions": ["string", "string", "string"]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers:bulk")! as URL,
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