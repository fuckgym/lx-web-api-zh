# 内部持仓划转

POST https://localhost:5000/gw/api/v1/internal-asset-transfers
Content-Type: application/json

在 Interactive Brokers 的两个账户之间进行内部持仓划转**范围**：`transfers.write`**安全策略**：`Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/create-internal-asset-transfers

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥进行签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒)

## 请求

### 路径参数

- `client-id` (string, required) — 客户端的 clientId

### 请求体 (application/json)

此端点预期接收一个对象。

- `instructionType` (enum, required)
  - Allowed values: `INTERNAL_POSITION_TRANSFER`
- `instruction` (InternalPositionTransferInstruction, required) — 在两个 Interactive Brokers 账户之间划转账位的请求。

## 响应

### 202

接受异步创建新指令的请求

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionResult, optional) — 所提交指令的结果。

## 错误

### 400 请求错误

返回表示错误请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 403 禁止访问错误

返回表示被禁止请求的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短、易于理解的摘要。
- `status` (long, required) — HTTP 状态码。
- `detail` (string, required) — 对问题的易于理解的说明。
- `instructionSetId` (long, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionErrorResult, required) — 所提交指令的结果。

### 422 无法处理的实体错误

返回表示业务错误的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短、易于理解的摘要。
- `status` (long, required) — HTTP 状态码 (422)。
- `instructionSetId` (long, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResult` (InstructionErrorResult, optional) — 所提交指令的结果。

### 500 服务器内部错误

返回表示服务器内部错误的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### InternalPositionTransferInstruction

在两个 Interactive Brokers 账户之间划转账位的请求。

- `clientInstructionId` (double, required) — 由客户端分配的该指令的标识符；必须为正数且在请求内唯一。
- `sourceAccountId` (string, required) — 资产转出方的 Interactive Brokers 账户。
- `targetAccountId` (string, required) — 资产转入方的 Interactive Brokers 账户。
- `transferQuantity` (double, required) — 要划转的金融工具数量。
- `tradingInstrument` (TradingInstrumentRef, required) — 通过合约 ID 或通过证券 ID 与资产类型来标识证券。
- `transferPrice` (double, optional) — 如果提供 transferPrice，则还需要提供 tradeDate 和 settleDate
- `tradeDate` (string, optional) — 如果提供 tradeDate，则还需要提供 settleDate
- `settleDate` (string, optional) — 如果提供 settleDate，则还需要提供 tradeDate

### InstructionResult

所提交指令的结果。

- `clientInstructionId` (double, required) — 由客户端分配的该指令的标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的易于理解的说明（例如轮询指引）。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下出现。

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

### InstructionErrorResult

携带被拒绝指令错误详情的指令结果。

- `clientInstructionId` (double, required) — 由客户端分配的该指令的标识符；必须为正数且在请求内唯一。
- `error` (InstructionErrorResultError, required) — 指令被拒绝时返回的错误详情。
- `instructionId` (double, required) — 该指令的 Funds and Banking 标识符。
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型下出现。
- `description` (string, optional) — 关于结果的易于理解的说明（例如轮询指引）。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### TradingInstrumentRef

通过合约 ID 或通过证券 ID 与资产类型来标识证券。

### InstructionResultDetails

仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型下出现。

### DepositDetails

- `amount` (double, optional)
- `currency` (string, optional)
- `whenAvailable` (date, optional)
- `openBanking` (DepositDetailsOpenBanking, optional) — 仅在 bankInstructionMethod 为 OPEN_BANKING 时出现。

### InstructionErrorResultError

指令被拒绝时返回的错误详情。

- `errorCode` (string, required) — 机器可读的错误代码。
- `errorMessage` (string, required) — 易于理解的错误消息。

### TradingInstrumentRef0

- `conid` (double, required) — 该金融工具的 Interactive Brokers 合约标识符。

### TradingInstrumentRef1

- `tradingInstrumentDescription` (TradingInstrumentRefOneOf1TradingInstrumentDescription, required) — 通过证券 ID 与资产类型标识的金融工具（在未提供合约 ID 时使用）。

### OpenBankingInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)
- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (OpenBankingInstructionResultDetailsProviderResponse, optional) — 服务商特定的数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户完成关联后该字段即不存在。

### WithdrawalInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)

### DepositDetailsOpenBanking

仅在 bankInstructionMethod 为 OPEN_BANKING 时出现。

- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (DepositDetailsOpenBankingProviderResponse, optional) — 在 Plaid 付款发起后返回的服务商特定数据。

### TradingInstrumentRefOneOf1TradingInstrumentDescription

通过证券 ID 与资产类型标识的金融工具（在未提供合约 ID 时使用）。

- `securityIdType` (enum, required) — 证券标识符的类型（CUSIP、ISIN 或 CASH）。
  - Allowed values: `CUSIP`, `ISIN`, `CASH`
- `securityId` (string, required) — 证券标识符的值。
- `assetType` (enum, required) — 金融工具的资产类别。
  - Allowed values: `STK`, `CASH`, `UNKNOWN`, `BILL`, `BOND`, `FUND`, `OPT`, `WAR`

### OpenBankingInstructionResultDetailsProviderResponse

服务商特定的数据。对于 PLAID，仅在账户关联处于待处理状态时填充 hostedlinkUrl/linkToken；账户完成关联后该字段即不存在。

- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

### DepositDetailsOpenBankingProviderResponse

在 Plaid 付款发起后返回的服务商特定数据。

- `paymentId` (string, optional)
- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

## 示例

### 响应

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2614,
  "instructionResult": {
    "clientInstructionId": 7008152,
    "instructionType": "INTERNAL_POSITION_TRANSFER",
    "instructionStatus": "PENDING",
    "instructionId": 43092590
  }
}
```

**SDK 代码**

```python Response
import requests

url = "https://localhost:5000/gw/api/v1/internal-asset-transfers"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Response
const url = 'https://localhost:5000/gw/api/v1/internal-asset-transfers';
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

	url := "https://localhost:5000/gw/api/v1/internal-asset-transfers"

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

url = URI("https://localhost:5000/gw/api/v1/internal-asset-transfers")

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

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/internal-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Response
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/internal-asset-transfers', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Response
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/internal-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Response
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/internal-asset-transfers")! as URL,
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

### 内部持仓划转 - 使用 tradingInstrument

**请求**

```json
{
  "instructionType": "INTERNAL_POSITION_TRANSFER",
  "instruction": {
    "clientInstructionId": 7013044,
    "sourceAccountId": "U399192",
    "targetAccountId": "U87440",
    "transferQuantity": 6,
    "tradingInstrument": {
      "conid": 459200101,
      "currency": "USD",
      "tradingInstrumentDescription": {
        "assetType": "STK",
        "securityId": "459200101",
        "securityIdType": "ISIN"
      }
    }
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2614,
  "instructionResult": {
    "clientInstructionId": 7008152,
    "instructionType": "INTERNAL_POSITION_TRANSFER",
    "instructionStatus": "PENDING",
    "instructionId": 43092590
  }
}
```

**SDK 代码**

```python Internal Position Transfer - using Trading Instrument
import requests

url = "https://localhost:5000/gw/api/v1/internal-asset-transfers"

payload = {
    "instructionType": "INTERNAL_POSITION_TRANSFER",
    "instruction": {
        "clientInstructionId": 7013044,
        "sourceAccountId": "U399192",
        "targetAccountId": "U87440",
        "transferQuantity": 6,
        "tradingInstrument": {
            "conid": 459200101,
            "currency": "USD",
            "tradingInstrumentDescription": {
                "assetType": "STK",
                "securityId": "459200101",
                "securityIdType": "ISIN"
            }
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

```javascript Internal Position Transfer - using Trading Instrument
const url = 'https://localhost:5000/gw/api/v1/internal-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"INTERNAL_POSITION_TRANSFER","instruction":{"clientInstructionId":7013044,"sourceAccountId":"U399192","targetAccountId":"U87440","transferQuantity":6,"tradingInstrument":{"conid":459200101,"currency":"USD","tradingInstrumentDescription":{"assetType":"STK","securityId":"459200101","securityIdType":"ISIN"}}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Internal Position Transfer - using Trading Instrument
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/internal-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"INTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 7013044,\n    \"sourceAccountId\": \"U399192\",\n    \"targetAccountId\": \"U87440\",\n    \"transferQuantity\": 6,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}")

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

```ruby Internal Position Transfer - using Trading Instrument
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/internal-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"INTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 7013044,\n    \"sourceAccountId\": \"U399192\",\n    \"targetAccountId\": \"U87440\",\n    \"transferQuantity\": 6,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Internal Position Transfer - using Trading Instrument
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/internal-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"INTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 7013044,\n    \"sourceAccountId\": \"U399192\",\n    \"targetAccountId\": \"U87440\",\n    \"transferQuantity\": 6,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}")
  .asString();
```

```php Internal Position Transfer - using Trading Instrument
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/internal-asset-transfers', [
  'body' => '{
  "instructionType": "INTERNAL_POSITION_TRANSFER",
  "instruction": {
    "clientInstructionId": 7013044,
    "sourceAccountId": "U399192",
    "targetAccountId": "U87440",
    "transferQuantity": 6,
    "tradingInstrument": {
      "conid": 459200101,
      "currency": "USD",
      "tradingInstrumentDescription": {
        "assetType": "STK",
        "securityId": "459200101",
        "securityIdType": "ISIN"
      }
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

```csharp Internal Position Transfer - using Trading Instrument
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/internal-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"INTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 7013044,\n    \"sourceAccountId\": \"U399192\",\n    \"targetAccountId\": \"U87440\",\n    \"transferQuantity\": 6,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Internal Position Transfer - using Trading Instrument
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "INTERNAL_POSITION_TRANSFER",
  "instruction": [
    "clientInstructionId": 7013044,
    "sourceAccountId": "U399192",
    "targetAccountId": "U87440",
    "transferQuantity": 6,
    "tradingInstrument": [
      "conid": 459200101,
      "currency": "USD",
      "tradingInstrumentDescription": [
        "assetType": "STK",
        "securityId": "459200101",
        "securityIdType": "ISIN"
      ]
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/internal-asset-transfers")! as URL,
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

### 内部持仓划转 - 使用 contractID (conid)

**请求**

```json
{
  "instructionType": "INTERNAL_POSITION_TRANSFER",
  "instruction": {
    "clientInstructionId": 7013043,
    "sourceAccountId": "U399192",
    "targetAccountId": "U87440",
    "transferQuantity": 6,
    "tradingInstrument": {
      "conid": 21323,
      "currency": "USD"
    }
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2614,
  "instructionResult": {
    "clientInstructionId": 7008152,
    "instructionType": "INTERNAL_POSITION_TRANSFER",
    "instructionStatus": "PENDING",
    "instructionId": 43092590
  }
}
```

**SDK 代码**

```python Internal Position Transfer - using contractID (conid)
import requests

url = "https://localhost:5000/gw/api/v1/internal-asset-transfers"

payload = {
    "instructionType": "INTERNAL_POSITION_TRANSFER",
    "instruction": {
        "clientInstructionId": 7013043,
        "sourceAccountId": "U399192",
        "targetAccountId": "U87440",
        "transferQuantity": 6,
        "tradingInstrument": {
            "conid": 21323,
            "currency": "USD"
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

```javascript Internal Position Transfer - using contractID (conid)
const url = 'https://localhost:5000/gw/api/v1/internal-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"INTERNAL_POSITION_TRANSFER","instruction":{"clientInstructionId":7013043,"sourceAccountId":"U399192","targetAccountId":"U87440","transferQuantity":6,"tradingInstrument":{"conid":21323,"currency":"USD"}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Internal Position Transfer - using contractID (conid)
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/internal-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"INTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 7013043,\n    \"sourceAccountId\": \"U399192\",\n    \"targetAccountId\": \"U87440\",\n    \"transferQuantity\": 6,\n    \"tradingInstrument\": {\n      \"conid\": 21323,\n      \"currency\": \"USD\"\n    }\n  }\n}")

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

```ruby Internal Position Transfer - using contractID (conid)
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/internal-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"INTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 7013043,\n    \"sourceAccountId\": \"U399192\",\n    \"targetAccountId\": \"U87440\",\n    \"transferQuantity\": 6,\n    \"tradingInstrument\": {\n      \"conid\": 21323,\n      \"currency\": \"USD\"\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Internal Position Transfer - using contractID (conid)
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/internal-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"INTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 7013043,\n    \"sourceAccountId\": \"U399192\",\n    \"targetAccountId\": \"U87440\",\n    \"transferQuantity\": 6,\n    \"tradingInstrument\": {\n      \"conid\": 21323,\n      \"currency\": \"USD\"\n    }\n  }\n}")
  .asString();
```

```php Internal Position Transfer - using contractID (conid)
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/internal-asset-transfers', [
  'body' => '{
  "instructionType": "INTERNAL_POSITION_TRANSFER",
  "instruction": {
    "clientInstructionId": 7013043,
    "sourceAccountId": "U399192",
    "targetAccountId": "U87440",
    "transferQuantity": 6,
    "tradingInstrument": {
      "conid": 21323,
      "currency": "USD"
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

```csharp Internal Position Transfer - using contractID (conid)
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/internal-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"INTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 7013043,\n    \"sourceAccountId\": \"U399192\",\n    \"targetAccountId\": \"U87440\",\n    \"transferQuantity\": 6,\n    \"tradingInstrument\": {\n      \"conid\": 21323,\n      \"currency\": \"USD\"\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Internal Position Transfer - using contractID (conid)
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "INTERNAL_POSITION_TRANSFER",
  "instruction": [
    "clientInstructionId": 7013043,
    "sourceAccountId": "U399192",
    "targetAccountId": "U87440",
    "transferQuantity": 6,
    "tradingInstrument": [
      "conid": 21323,
      "currency": "USD"
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/internal-asset-transfers")! as URL,
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

### 内部持仓划转 - 包含可选字段

**请求**

```json
{
  "instructionType": "INTERNAL_POSITION_TRANSFER",
  "instruction": {
    "clientInstructionId": 7013043,
    "sourceAccountId": "U399192",
    "targetAccountId": "U87440",
    "transferQuantity": 6,
    "tradingInstrument": {
      "conid": 21323,
      "currency": "USD"
    },
    "transferPrice": 100.3456789,
    "tradeDate": "2025-02-17",
    "settleDate": "2025-02-25"
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 2614,
  "instructionResult": {
    "clientInstructionId": 7008152,
    "instructionType": "INTERNAL_POSITION_TRANSFER",
    "instructionStatus": "PENDING",
    "instructionId": 43092590
  }
}
```

**SDK 代码**

```python Internal Position Transfer - with Optional fields
import requests

url = "https://localhost:5000/gw/api/v1/internal-asset-transfers"

payload = {
    "instructionType": "INTERNAL_POSITION_TRANSFER",
    "instruction": {
        "clientInstructionId": 7013043,
        "sourceAccountId": "U399192",
        "targetAccountId": "U87440",
        "transferQuantity": 6,
        "tradingInstrument": {
            "conid": 21323,
            "currency": "USD"
        },
        "transferPrice": 100.3456789,
        "tradeDate": "2025-02-17",
        "settleDate": "2025-02-25"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Internal Position Transfer - with Optional fields
const url = 'https://localhost:5000/gw/api/v1/internal-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"INTERNAL_POSITION_TRANSFER","instruction":{"clientInstructionId":7013043,"sourceAccountId":"U399192","targetAccountId":"U87440","transferQuantity":6,"tradingInstrument":{"conid":21323,"currency":"USD"},"transferPrice":100.3456789,"tradeDate":"2025-02-17","settleDate":"2025-02-25"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Internal Position Transfer - with Optional fields
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/internal-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"INTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 7013043,\n    \"sourceAccountId\": \"U399192\",\n    \"targetAccountId\": \"U87440\",\n    \"transferQuantity\": 6,\n    \"tradingInstrument\": {\n      \"conid\": 21323,\n      \"currency\": \"USD\"\n    },\n    \"transferPrice\": 100.3456789,\n    \"tradeDate\": \"2025-02-17\",\n    \"settleDate\": \"2025-02-25\"\n  }\n}")

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

```ruby Internal Position Transfer - with Optional fields
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/internal-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"INTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 7013043,\n    \"sourceAccountId\": \"U399192\",\n    \"targetAccountId\": \"U87440\",\n    \"transferQuantity\": 6,\n    \"tradingInstrument\": {\n      \"conid\": 21323,\n      \"currency\": \"USD\"\n    },\n    \"transferPrice\": 100.3456789,\n    \"tradeDate\": \"2025-02-17\",\n    \"settleDate\": \"2025-02-25\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Internal Position Transfer - with Optional fields
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/internal-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"INTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 7013043,\n    \"sourceAccountId\": \"U399192\",\n    \"targetAccountId\": \"U87440\",\n    \"transferQuantity\": 6,\n    \"tradingInstrument\": {\n      \"conid\": 21323,\n      \"currency\": \"USD\"\n    },\n    \"transferPrice\": 100.3456789,\n    \"tradeDate\": \"2025-02-17\",\n    \"settleDate\": \"2025-02-25\"\n  }\n}")
  .asString();
```

```php Internal Position Transfer - with Optional fields
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/internal-asset-transfers', [
  'body' => '{
  "instructionType": "INTERNAL_POSITION_TRANSFER",
  "instruction": {
    "clientInstructionId": 7013043,
    "sourceAccountId": "U399192",
    "targetAccountId": "U87440",
    "transferQuantity": 6,
    "tradingInstrument": {
      "conid": 21323,
      "currency": "USD"
    },
    "transferPrice": 100.3456789,
    "tradeDate": "2025-02-17",
    "settleDate": "2025-02-25"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Internal Position Transfer - with Optional fields
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/internal-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"INTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"clientInstructionId\": 7013043,\n    \"sourceAccountId\": \"U399192\",\n    \"targetAccountId\": \"U87440\",\n    \"transferQuantity\": 6,\n    \"tradingInstrument\": {\n      \"conid\": 21323,\n      \"currency\": \"USD\"\n    },\n    \"transferPrice\": 100.3456789,\n    \"tradeDate\": \"2025-02-17\",\n    \"settleDate\": \"2025-02-25\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Internal Position Transfer - with Optional fields
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "INTERNAL_POSITION_TRANSFER",
  "instruction": [
    "clientInstructionId": 7013043,
    "sourceAccountId": "U399192",
    "targetAccountId": "U87440",
    "transferQuantity": 6,
    "tradingInstrument": [
      "conid": 21323,
      "currency": "USD"
    ],
    "transferPrice": 100.3456789,
    "tradeDate": "2025-02-17",
    "settleDate": "2025-02-25"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/internal-asset-transfers")! as URL,
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