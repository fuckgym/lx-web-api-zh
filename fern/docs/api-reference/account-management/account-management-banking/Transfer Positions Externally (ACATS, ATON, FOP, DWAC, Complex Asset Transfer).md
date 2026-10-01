# 外部持仓转移（ACATS、ATON、FOP、DWAC、复杂资产转移）

POST https://localhost:5000/gw/api/v1/external-asset-transfers
Content-Type: application/json

发起提交外部持仓转移的请求。方式包括：ACATS、ATON、Basic FOP、FOP、DWAC。有关转移方式的更多信息，可参见此处 - [https://www.interactivebrokers.com/campus/trading-lessons/cash-and-position-transfers/](https://www.interactivebrokers.com/campus/trading-lessons/cash-and-position-transfers/)**Scope**: `transfers.write`**Security Policy**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/create-external-asset-transfers

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 签名 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 路径参数

- `client-id` (string, required) — 客户端的 clientId

### 请求体 (application/json)

此端点预期接收一个对象。

- `instructionType` (enum, required)
  - Allowed values: `DWAC`, `FOP`, `COMPLEX_ASSET_TRANSFER`, `EXTERNAL_POSITION_TRANSFER`, `ISA_TRANSFER`
- `instruction` (GwApiV1ExternalAssetTransfersPostRequestBodyContentApplicationJsonSchemaInstruction, required)

## 响应

### 202

接受异步创建新指令的请求

- `status` (double, required) — 该请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对已提交指令进行分组的指令集标识符。
- `instructionResult` (InstructionResult, optional) — 已提交指令的结果。

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
- `title` (string, required) — 问题的简短、人类可读的摘要。
- `status` (long, required) — HTTP 状态码。
- `detail` (string, required) — 问题的通俗易懂的解释。
- `instructionSetId` (long, required) — 对已提交指令进行分组的指令集标识符。
- `instructionResult` (InstructionErrorResult, required) — 已提交指令的结果。

### 422 无法处理的实体错误

返回表示业务错误的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短、人类可读的摘要。
- `status` (long, required) — HTTP 状态码 (422)。
- `instructionSetId` (long, required) — 对已提交指令进行分组的指令集标识符。
- `instructionResult` (InstructionErrorResult, optional) — 已提交指令的结果。

### 500 内部服务器错误

返回表示内部服务器错误的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### GwApiV1ExternalAssetTransfersPostRequestBodyContentApplicationJsonSchemaInstruction

### InstructionResult

已提交指令的结果。

- `clientInstructionId` (double, required) — 由客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionId` (double, required) — 该指令的资金与银行标识符。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `description` (string, optional) — 关于结果的通俗易懂的说明（例如轮询指引）。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型时存在。
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型时存在。

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

### InstructionErrorResult

携带被拒绝指令错误详情的指令结果。

- `clientInstructionId` (double, required) — 由客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `error` (InstructionErrorResultError, required) — 指令被拒绝时返回的错误详情。
- `instructionId` (double, required) — 该指令的资金与银行标识符。
- `instructionStatus` (enum, required) — 指令的处理状态。
  - Allowed values: `PENDING`, `PROCESSED`, `REJECTED`, `PENDING_VERIFICATION`
- `instructionType` (enum, required) — 指令的类型。
  - Allowed values: `ACH_INSTRUCTION`, `CANCEL_INSTRUCTION`, `COMPLEX_ASSET_TRANSFER`, `DELETE_BANK_INSTRUCTION`, `DEPOSIT`, `DWAC`, `EXTERNAL_POSITION_TRANSFER`, `FOP`, `QUERY_RECENT_INSTRUCTIONS`, `QUERY_WITHDRAWABLE_FUNDS`, `INTERNAL_POSITION_TRANSFER`, `INTERNAL_CASH_TRANSFER`, `MICRO_AMOUNT`, `OPEN_BANKING_INSTRUCTION`, `PREDEFINED_DESTINATION_INSTRUCTION`, `TRADITIONAL_BANK_INSTRUCTION_VERIFICATION`, `WITHDRAWAL`, `WITHDRAWAL_INSTRUCTION`, `QUERY_IRA_CONTRIBUTIONS`, `EDDA_INSTRUCTION`, `QUERY_RECENT_RECURRING_EVENTS`, `QUERY_RECURRING_INSTRUCTIONS`, `QUERY_ACCOUNT_BALANCES`, `QUERY_BANK_INSTRUCTION`, `QUERY_WITHDRAWABLE_CASH_EQUITY`, `ISA_TRANSFER`
- `depositDetails` (DepositDetails, optional) — 仅在 DEPOSIT 指令类型时存在。
- `description` (string, optional) — 关于结果的通俗易懂的说明（例如轮询指引）。
- `details` (InstructionResultDetails, optional) — 仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型时存在。
- `ibReferenceId` (double, optional) — 该请求的 Interactive Brokers 全局标识符。
- `processedTimestamp` (datetime, optional) — 指令被处理时的时间戳。

### FopInstruction

以免付费划付（FOP）方式转移持仓的请求。

- `clientInstructionId` (double, required) — 由客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `direction` (enum, required) — 转移的方向（IN 或 OUT）。
  - Allowed values: `IN`, `OUT`
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `contraBrokerAccountId` (string, required) — 对手方券商处的账户标识符。
- `contraBrokerDtcCode` (string, required) — 对手方券商的 DTC 参与者代码。
- `quantity` (double, required) — 金融工具的数量。
- `tradingInstrument` (TradingInstrumentRef, required) — 通过合约 ID 或通过证券 ID 与资产类型来标识证券。

### DwacInstruction

通过 DWAC（Deposit/Withdrawal At Custodian）转移持仓的请求。

- `clientInstructionId` (double, required) — 由客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `direction` (enum, required) — 转移的方向（IN 或 OUT）。
  - Allowed values: `IN`
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `contraBrokerAccountId` (string, required) — 对手方券商处的账户标识符。
- `contraBrokerTaxId` (string, required) — 与对手方券商关联的 Tax ID。
- `quantity` (double, required) — 金融工具的数量。
- `tradingInstrument` (TradingInstrumentRef, required) — 通过合约 ID 或通过证券 ID 与资产类型来标识证券。
- `accountTitle` (string, optional) — IBKR 接收账户的账户名称。
- `referenceId` (string, optional) — 该指令的客户参考标识符。

### ComplexAssetTransferInstruction

向对手方券商转入或从其转出持仓的请求（Basic FOP / 复杂资产转移，v2）。Basic FOP（Free of Payment，免付费划付）用于从通常位于美国以外的金融机构转移资产（股票、固定收益、结构性产品、期权）；IBKR 与该机构协调结算指令。

- `clientInstructionId` (double, required) — 由客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `direction` (enum, required) — 转移的方向（IN 或 OUT）。
  - Allowed values: `IN`, `OUT`
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `quantity` (double, required) — 金融工具的数量。
- `tradingInstrument` (TradingInstrumentRef, required) — 通过合约 ID 或通过证券 ID 与资产类型来标识证券。
- `contraBrokerInfo` (ContraBrokerInfoRef, required) — 该转移的对手方（外部）券商的详细信息。
- `accountIdAtCurrentBroker` (string, optional) — 客户在当前（对手方）券商处的账户标识符。
- `nonDisclosedDetail` (NonDisclosedDetailRef, optional) — 该转移的非披露结算详情。

### ExternalPositionTransfer

通过 ACATS 或 ATON 从外部券商转移持仓的请求。

- `clientInstructionId` (double, required) — 由客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `type` (enum, required) — 转移类型（FULL）。
  - Allowed values: `FULL`
- `subType` (enum, required) — 资产转移协议（ACATS 或 ATON）。
  - Allowed values: `ACATS`, `ATON`
- `brokerId` (string, required) — 外部券商的标识符。
- `brokerName` (string, required) — 外部券商的名称；必须与 GET participating brokers API 返回的某个值完全一致。
- `accountAtBroker` (string, required) — 客户在外部券商处的账号。
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `signature` (string, required) — 授权该指令的客户签名。预期输入在 IBKR 的账户名称。
- `sourceIRAType` (enum, optional) — 源 IRA 类型代码。
  - Allowed values: `RO`, `RI`, `RT`, `SP`, `ED`, `TH`, `RH`, `SH`

### IsaTransferInstruction

将英国 ISA 从另一家 ISA 提供方转移到 Interactive Brokers 的请求。

- `clientInstructionId` (double, required) — 由客户端为此指令分配的标识符；必须为正数且在请求内唯一。
- `accountId` (string, required) — 该指令适用的 Interactive Brokers 账户标识符（例如 "U46377"）。
- `providerName` (string, required) — 当前 ISA 提供方的名称；必须与 GET ISA providers API 返回的某个提供方名称完全一致。
- `accountAtProvider` (string, required) — 客户在 ISA 提供方处的账户参考号。
- `totalAmountTransferredInGBP` (double, required)
- `authorizationType` (string, required) — ISA 转移应如何授权/处理。
- `signature` (string, required) — 授权该指令的客户签名。

### InstructionResultDetails

仅在 OPEN_BANKING_INSTRUCTION 和 WITHDRAWAL_INSTRUCTION 指令类型时存在。

### DepositDetails

- `amount` (double, optional)
- `currency` (string, optional)
- `whenAvailable` (date, optional)
- `openBanking` (DepositDetailsOpenBanking, optional) — 仅当 bankInstructionMethod 为 OPEN_BANKING 时存在。

### InstructionErrorResultError

指令被拒绝时返回的错误详情。

- `errorCode` (string, required) — 机器可读的错误代码。
- `errorMessage` (string, required) — 人类可读的错误消息。

### TradingInstrumentRef

通过合约 ID 或通过证券 ID 与资产类型来标识证券。

### ContraBrokerInfoRef

该转移的对手方（外部）券商的详细信息。

- `accountType` (string, required) — 对手方券商账户的类型。取值为：INDIVIDUAL, ORG, POOL, COMPANY 之一。
- `brokerName` (string, required) — 外部券商的名称；必须与 GET participating brokers API 返回的某个值完全一致。
- `brokerAccountId` (string, required) — 在对手方券商处持有的账户标识符。
- `country` (string, required) — 对手方券商所在的国家。
- `contactEmail` (string, required) — 对手方券商联系人的电子邮箱地址。
- `contactPhone` (string, required) — 对手方券商联系人的电话号码。
- `depositoryId` (string, optional) — 对手方券商的存管机构 / DTC 标识符。
- `contactName` (string, optional) — 对手方券商联系人的姓名。
- `accountTitle` (string, optional) — 账户的名称。

### NonDisclosedDetailRef

该转移的非披露结算详情。

- `tradeDate` (string, required) — 该转移的交易日期。
- `settleDate` (string, required) — 该转移的结算日期。
- `psetBic` (string, optional) — 结算地点的 BIC/SWIFT 代码。
- `reagDeagBic` (string, optional) — 收付/交付代理的 BIC/SWIFT 代码。
- `buyerSellBic` (string, optional) — 买方/卖方的 BIC/SWIFT 代码。
- `memberAccountId` (string, optional) — 结算地点的成员账户标识符。
- `safeKeepingAccountId` (string, optional) — 结算地点的保管账户标识符。

### OpenBankingInstructionResultDetails

- `bankInstructionName` (string, optional)
- `type` (string, optional)
- `currency` (string, optional)
- `bankRoutingNumber` (string, optional)
- `bankAccountNumber` (string, optional)
- `serviceProvider` (enum, optional)
  - Allowed values: `PLAID`
- `providerResponse` (OpenBankingInstructionResultDetailsProviderResponse, optional) — 提供方特定的数据。对于 PLAID，仅在账户关联待处理时填充 hostedlinkUrl/linkToken；账户完成关联后即不存在。

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
- `providerResponse` (DepositDetailsOpenBankingProviderResponse, optional) — Plaid 付款发起后返回的提供方特定数据。

### TradingInstrumentRef0

- `conid` (double, required) — 该金融工具的 Interactive Brokers 合约标识符。

### TradingInstrumentRef1

- `tradingInstrumentDescription` (TradingInstrumentRefOneOf1TradingInstrumentDescription, required) — 通过证券 ID 与资产类型标识的金融工具（在未提供合约 ID 时使用）。

### OpenBankingInstructionResultDetailsProviderResponse

提供方特定的数据。对于 PLAID，仅在账户关联待处理时填充 hostedlinkUrl/linkToken；账户完成关联后即不存在。

- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

### DepositDetailsOpenBankingProviderResponse

Plaid 付款发起后返回的提供方特定数据。

- `paymentId` (string, optional)
- `hostedlinkUrl` (string, optional)
- `linkToken` (string, optional)

### TradingInstrumentRefOneOf1TradingInstrumentDescription

通过证券 ID 与资产类型标识的金融工具（在未提供合约 ID 时使用）。

- `securityIdType` (enum, required) — 证券标识符的类型（CUSIP、ISIN 或 CASH）。
  - Allowed values: `CUSIP`, `ISIN`, `CASH`
- `securityId` (string, required) — 证券标识符的值。
- `assetType` (enum, required) — 金融工具的资产类别。
  - Allowed values: `STK`, `CASH`, `UNKNOWN`, `BILL`, `BOND`, `FUND`, `OPT`, `WAR`

## 示例

### FOP

**Response**

```json
{
  "status": 202,
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013031,
    "instructionType": "FOP",
    "instructionStatus": "PENDING",
    "instructionId": 43091814
  }
}
```

**SDK Code**

```python FOP
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript FOP
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

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
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java FOP
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php FOP
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp FOP
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift FOP
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### DWAC

**Response**

```json
{
  "status": 202,
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013031,
    "instructionType": "DWAC",
    "instructionStatus": "PENDING",
    "instructionId": 43091814
  }
}
```

**SDK Code**

```python DWAC
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript DWAC
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

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
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java DWAC
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php DWAC
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp DWAC
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift DWAC
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### 复杂资产转移

**响应**

```json
{
  "status": 202,
  "instructionSetId": 3549,
  "instructionResult": {
    "clientInstructionId": 80188,
    "instructionType": "COMPLEX_ASSET_TRANSFER",
    "instructionStatus": "PENDING",
    "instructionId": 43093833
  }
}
```

**SDK 代码**

```python Complex Asset Transfer
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Complex Asset Transfer
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

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
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Complex Asset Transfer
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Complex Asset Transfer
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Complex Asset Transfer
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Complex Asset Transfer
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### 外部持仓转移

**响应**

```json
{
  "status": 202,
  "instructionSetId": 3700,
  "instructionResult": {
    "clientInstructionId": 7008998,
    "instructionType": "EXTERNAL_POSITION_TRANSFER",
    "instructionStatus": "PENDING",
    "instructionId": 43094000
  }
}
```

**SDK 代码**

```python External Position Transfer
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript External Position Transfer
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

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
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java External Position Transfer
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php External Position Transfer
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp External Position Transfer
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift External Position Transfer
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### ISA 转移

**请求**

```json
{
  "instructionType": "ISA_TRANSFER",
  "instruction": {
    "accountAtProvider": "HL-ACC-9999",
    "accountId": "U1234567",
    "authorizationType": "SELL_INV_AND_TRANSFER_AS_CASH",
    "clientInstructionId": 7013070,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "providerName": "Hargreaves Lansdown",
    "quantity": 1000,
    "signature": "John Doe",
    "totalAmountTransferredInGBP": 5000,
    "tradingInstrument": {
      "conid": 459200101
    }
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 3701,
  "instructionResult": {
    "clientInstructionId": 7013070,
    "instructionType": "ISA_TRANSFER",
    "instructionStatus": "PENDING",
    "instructionId": 43094100
  }
}
```

**SDK 代码**

```python ISA Transfer
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

payload = {
    "instructionType": "ISA_TRANSFER",
    "instruction": {
        "accountAtProvider": "HL-ACC-9999",
        "accountId": "U1234567",
        "authorizationType": "SELL_INV_AND_TRANSFER_AS_CASH",
        "clientInstructionId": 7013070,
        "contraBrokerAccountId": "12345678A",
        "contraBrokerDtcCode": "534",
        "direction": "IN",
        "providerName": "Hargreaves Lansdown",
        "quantity": 1000,
        "signature": "John Doe",
        "totalAmountTransferredInGBP": 5000,
        "tradingInstrument": { "conid": 459200101 }
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript ISA Transfer
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"ISA_TRANSFER","instruction":{"accountAtProvider":"HL-ACC-9999","accountId":"U1234567","authorizationType":"SELL_INV_AND_TRANSFER_AS_CASH","clientInstructionId":7013070,"contraBrokerAccountId":"12345678A","contraBrokerDtcCode":"534","direction":"IN","providerName":"Hargreaves Lansdown","quantity":1000,"signature":"John Doe","totalAmountTransferredInGBP":5000,"tradingInstrument":{"conid":459200101}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go ISA Transfer
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"ISA_TRANSFER\",\n  \"instruction\": {\n    \"accountAtProvider\": \"HL-ACC-9999\",\n    \"accountId\": \"U1234567\",\n    \"authorizationType\": \"SELL_INV_AND_TRANSFER_AS_CASH\",\n    \"clientInstructionId\": 7013070,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"providerName\": \"Hargreaves Lansdown\",\n    \"quantity\": 1000,\n    \"signature\": \"John Doe\",\n    \"totalAmountTransferredInGBP\": 5000,\n    \"tradingInstrument\": {\n      \"conid\": 459200101\n    }\n  }\n}")

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

```ruby ISA Transfer
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"ISA_TRANSFER\",\n  \"instruction\": {\n    \"accountAtProvider\": \"HL-ACC-9999\",\n    \"accountId\": \"U1234567\",\n    \"authorizationType\": \"SELL_INV_AND_TRANSFER_AS_CASH\",\n    \"clientInstructionId\": 7013070,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"providerName\": \"Hargreaves Lansdown\",\n    \"quantity\": 1000,\n    \"signature\": \"John Doe\",\n    \"totalAmountTransferredInGBP\": 5000,\n    \"tradingInstrument\": {\n      \"conid\": 459200101\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java ISA Transfer
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"ISA_TRANSFER\",\n  \"instruction\": {\n    \"accountAtProvider\": \"HL-ACC-9999\",\n    \"accountId\": \"U1234567\",\n    \"authorizationType\": \"SELL_INV_AND_TRANSFER_AS_CASH\",\n    \"clientInstructionId\": 7013070,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"providerName\": \"Hargreaves Lansdown\",\n    \"quantity\": 1000,\n    \"signature\": \"John Doe\",\n    \"totalAmountTransferredInGBP\": 5000,\n    \"tradingInstrument\": {\n      \"conid\": 459200101\n    }\n  }\n}")
  .asString();
```

```php ISA Transfer
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'body' => '{
  "instructionType": "ISA_TRANSFER",
  "instruction": {
    "accountAtProvider": "HL-ACC-9999",
    "accountId": "U1234567",
    "authorizationType": "SELL_INV_AND_TRANSFER_AS_CASH",
    "clientInstructionId": 7013070,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "providerName": "Hargreaves Lansdown",
    "quantity": 1000,
    "signature": "John Doe",
    "totalAmountTransferredInGBP": 5000,
    "tradingInstrument": {
      "conid": 459200101
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

```csharp ISA Transfer
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"ISA_TRANSFER\",\n  \"instruction\": {\n    \"accountAtProvider\": \"HL-ACC-9999\",\n    \"accountId\": \"U1234567\",\n    \"authorizationType\": \"SELL_INV_AND_TRANSFER_AS_CASH\",\n    \"clientInstructionId\": 7013070,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"providerName\": \"Hargreaves Lansdown\",\n    \"quantity\": 1000,\n    \"signature\": \"John Doe\",\n    \"totalAmountTransferredInGBP\": 5000,\n    \"tradingInstrument\": {\n      \"conid\": 459200101\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift ISA Transfer
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "ISA_TRANSFER",
  "instruction": [
    "accountAtProvider": "HL-ACC-9999",
    "accountId": "U1234567",
    "authorizationType": "SELL_INV_AND_TRANSFER_AS_CASH",
    "clientInstructionId": 7013070,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "providerName": "Hargreaves Lansdown",
    "quantity": 1000,
    "signature": "John Doe",
    "totalAmountTransferredInGBP": 5000,
    "tradingInstrument": ["conid": 459200101]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### FOP - 使用 contractID (conid) 转移

**请求**

```json
{
  "instructionType": "FOP",
  "instruction": {
    "accountId": "U46377",
    "clientInstructionId": 7013038,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "quantity": 1000,
    "tradingInstrument": {
      "conid": 12123,
      "currency": "USD"
    }
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013031,
    "instructionType": "FOP",
    "instructionStatus": "PENDING",
    "instructionId": 43091814
  }
}
```

**SDK 代码**

```python FOP - transfer using contractID (conid)
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

payload = {
    "instructionType": "FOP",
    "instruction": {
        "accountId": "U46377",
        "clientInstructionId": 7013038,
        "contraBrokerAccountId": "12345678A",
        "contraBrokerDtcCode": "534",
        "direction": "IN",
        "quantity": 1000,
        "tradingInstrument": {
            "conid": 12123,
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

```javascript FOP - transfer using contractID (conid)
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"FOP","instruction":{"accountId":"U46377","clientInstructionId":7013038,"contraBrokerAccountId":"12345678A","contraBrokerDtcCode":"534","direction":"IN","quantity":1000,"tradingInstrument":{"conid":12123,"currency":"USD"}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go FOP - transfer using contractID (conid)
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"FOP\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"clientInstructionId\": 7013038,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"tradingInstrument\": {\n      \"conid\": 12123,\n      \"currency\": \"USD\"\n    }\n  }\n}")

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

```ruby FOP - transfer using contractID (conid)
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"FOP\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"clientInstructionId\": 7013038,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"tradingInstrument\": {\n      \"conid\": 12123,\n      \"currency\": \"USD\"\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java FOP - transfer using contractID (conid)
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"FOP\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"clientInstructionId\": 7013038,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"tradingInstrument\": {\n      \"conid\": 12123,\n      \"currency\": \"USD\"\n    }\n  }\n}")
  .asString();
```

```php FOP - transfer using contractID (conid)
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'body' => '{
  "instructionType": "FOP",
  "instruction": {
    "accountId": "U46377",
    "clientInstructionId": 7013038,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "quantity": 1000,
    "tradingInstrument": {
      "conid": 12123,
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

```csharp FOP - transfer using contractID (conid)
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"FOP\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"clientInstructionId\": 7013038,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"tradingInstrument\": {\n      \"conid\": 12123,\n      \"currency\": \"USD\"\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift FOP - transfer using contractID (conid)
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "FOP",
  "instruction": [
    "accountId": "U46377",
    "clientInstructionId": 7013038,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "quantity": 1000,
    "tradingInstrument": [
      "conid": 12123,
      "currency": "USD"
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### FOP - 使用 tradingInstrument.detail 转移

**请求**

```json
{
  "instructionType": "FOP",
  "instruction": {
    "accountId": "U46377",
    "clientInstructionId": 7013039,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "quantity": 1000,
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
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013031,
    "instructionType": "FOP",
    "instructionStatus": "PENDING",
    "instructionId": 43091814
  }
}
```

**SDK 代码**

```python FOP - transfer using tradingInstrument.detail
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

payload = {
    "instructionType": "FOP",
    "instruction": {
        "accountId": "U46377",
        "clientInstructionId": 7013039,
        "contraBrokerAccountId": "12345678A",
        "contraBrokerDtcCode": "534",
        "direction": "IN",
        "quantity": 1000,
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

```javascript FOP - transfer using tradingInstrument.detail
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"FOP","instruction":{"accountId":"U46377","clientInstructionId":7013039,"contraBrokerAccountId":"12345678A","contraBrokerDtcCode":"534","direction":"IN","quantity":1000,"tradingInstrument":{"conid":459200101,"currency":"USD","tradingInstrumentDescription":{"assetType":"STK","securityId":"459200101","securityIdType":"ISIN"}}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go FOP - transfer using tradingInstrument.detail
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"FOP\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"clientInstructionId\": 7013039,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}")

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

```ruby FOP - transfer using tradingInstrument.detail
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"FOP\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"clientInstructionId\": 7013039,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java FOP - transfer using tradingInstrument.detail
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"FOP\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"clientInstructionId\": 7013039,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}")
  .asString();
```

```php FOP - transfer using tradingInstrument.detail
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'body' => '{
  "instructionType": "FOP",
  "instruction": {
    "accountId": "U46377",
    "clientInstructionId": 7013039,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "quantity": 1000,
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

```csharp FOP - transfer using tradingInstrument.detail
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"FOP\",\n  \"instruction\": {\n    \"accountId\": \"U46377\",\n    \"clientInstructionId\": 7013039,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift FOP - transfer using tradingInstrument.detail
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "FOP",
  "instruction": [
    "accountId": "U46377",
    "clientInstructionId": 7013039,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "quantity": 1000,
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

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### DWAC - 使用 contractID (conid) 转移

**请求**

```json
{
  "instructionType": "DWAC",
  "instruction": {
    "accountId": "U1001095",
    "accountTitle": "Special Company Holding LLC",
    "clientInstructionId": 7013036,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerTaxId": "123456789",
    "direction": "IN",
    "quantity": 1000,
    "referenceId": "refId",
    "tradingInstrument": {
      "conid": 12123,
      "currency": "USD"
    }
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013031,
    "instructionType": "FOP",
    "instructionStatus": "PENDING",
    "instructionId": 43091814
  }
}
```

**SDK 代码**

```python DWAC - transfer using contractID (conid)
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

payload = {
    "instructionType": "DWAC",
    "instruction": {
        "accountId": "U1001095",
        "accountTitle": "Special Company Holding LLC",
        "clientInstructionId": 7013036,
        "contraBrokerAccountId": "12345678A",
        "contraBrokerDtcCode": "534",
        "contraBrokerTaxId": "123456789",
        "direction": "IN",
        "quantity": 1000,
        "referenceId": "refId",
        "tradingInstrument": {
            "conid": 12123,
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

```javascript DWAC - transfer using contractID (conid)
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DWAC","instruction":{"accountId":"U1001095","accountTitle":"Special Company Holding LLC","clientInstructionId":7013036,"contraBrokerAccountId":"12345678A","contraBrokerDtcCode":"534","contraBrokerTaxId":"123456789","direction":"IN","quantity":1000,"referenceId":"refId","tradingInstrument":{"conid":12123,"currency":"USD"}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go DWAC - transfer using contractID (conid)
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"DWAC\",\n  \"instruction\": {\n    \"accountId\": \"U1001095\",\n    \"accountTitle\": \"Special Company Holding LLC\",\n    \"clientInstructionId\": 7013036,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerTaxId\": \"123456789\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"referenceId\": \"refId\",\n    \"tradingInstrument\": {\n      \"conid\": 12123,\n      \"currency\": \"USD\"\n    }\n  }\n}")

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

```ruby DWAC - transfer using contractID (conid)
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DWAC\",\n  \"instruction\": {\n    \"accountId\": \"U1001095\",\n    \"accountTitle\": \"Special Company Holding LLC\",\n    \"clientInstructionId\": 7013036,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerTaxId\": \"123456789\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"referenceId\": \"refId\",\n    \"tradingInstrument\": {\n      \"conid\": 12123,\n      \"currency\": \"USD\"\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java DWAC - transfer using contractID (conid)
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DWAC\",\n  \"instruction\": {\n    \"accountId\": \"U1001095\",\n    \"accountTitle\": \"Special Company Holding LLC\",\n    \"clientInstructionId\": 7013036,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerTaxId\": \"123456789\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"referenceId\": \"refId\",\n    \"tradingInstrument\": {\n      \"conid\": 12123,\n      \"currency\": \"USD\"\n    }\n  }\n}")
  .asString();
```

```php DWAC - transfer using contractID (conid)
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'body' => '{
  "instructionType": "DWAC",
  "instruction": {
    "accountId": "U1001095",
    "accountTitle": "Special Company Holding LLC",
    "clientInstructionId": 7013036,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerTaxId": "123456789",
    "direction": "IN",
    "quantity": 1000,
    "referenceId": "refId",
    "tradingInstrument": {
      "conid": 12123,
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

```csharp DWAC - transfer using contractID (conid)
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DWAC\",\n  \"instruction\": {\n    \"accountId\": \"U1001095\",\n    \"accountTitle\": \"Special Company Holding LLC\",\n    \"clientInstructionId\": 7013036,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerTaxId\": \"123456789\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"referenceId\": \"refId\",\n    \"tradingInstrument\": {\n      \"conid\": 12123,\n      \"currency\": \"USD\"\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift DWAC - transfer using contractID (conid)
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "DWAC",
  "instruction": [
    "accountId": "U1001095",
    "accountTitle": "Special Company Holding LLC",
    "clientInstructionId": 7013036,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerTaxId": "123456789",
    "direction": "IN",
    "quantity": 1000,
    "referenceId": "refId",
    "tradingInstrument": [
      "conid": 12123,
      "currency": "USD"
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### DWAC - 使用 tradingInstrument.detail 转移

**请求**

```json
{
  "instructionType": "DWAC",
  "instruction": {
    "accountId": "U1001095",
    "accountTitle": "Special Company Holding LLC",
    "clientInstructionId": 7013037,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerTaxId": "123456789",
    "direction": "IN",
    "quantity": 1000,
    "referenceId": "refId",
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
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013031,
    "instructionType": "FOP",
    "instructionStatus": "PENDING",
    "instructionId": 43091814
  }
}
```

**SDK 代码**

```python DWAC - transfer using tradingInstrument.detail
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

payload = {
    "instructionType": "DWAC",
    "instruction": {
        "accountId": "U1001095",
        "accountTitle": "Special Company Holding LLC",
        "clientInstructionId": 7013037,
        "contraBrokerAccountId": "12345678A",
        "contraBrokerDtcCode": "534",
        "contraBrokerTaxId": "123456789",
        "direction": "IN",
        "quantity": 1000,
        "referenceId": "refId",
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

```javascript DWAC - transfer using tradingInstrument.detail
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"DWAC","instruction":{"accountId":"U1001095","accountTitle":"Special Company Holding LLC","clientInstructionId":7013037,"contraBrokerAccountId":"12345678A","contraBrokerDtcCode":"534","contraBrokerTaxId":"123456789","direction":"IN","quantity":1000,"referenceId":"refId","tradingInstrument":{"conid":459200101,"currency":"USD","tradingInstrumentDescription":{"assetType":"STK","securityId":"459200101","securityIdType":"ISIN"}}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go DWAC - transfer using tradingInstrument.detail
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"DWAC\",\n  \"instruction\": {\n    \"accountId\": \"U1001095\",\n    \"accountTitle\": \"Special Company Holding LLC\",\n    \"clientInstructionId\": 7013037,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerTaxId\": \"123456789\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"referenceId\": \"refId\",\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}")

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

```ruby DWAC - transfer using tradingInstrument.detail
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"DWAC\",\n  \"instruction\": {\n    \"accountId\": \"U1001095\",\n    \"accountTitle\": \"Special Company Holding LLC\",\n    \"clientInstructionId\": 7013037,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerTaxId\": \"123456789\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"referenceId\": \"refId\",\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java DWAC - transfer using tradingInstrument.detail
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"DWAC\",\n  \"instruction\": {\n    \"accountId\": \"U1001095\",\n    \"accountTitle\": \"Special Company Holding LLC\",\n    \"clientInstructionId\": 7013037,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerTaxId\": \"123456789\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"referenceId\": \"refId\",\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}")
  .asString();
```

```php DWAC - transfer using tradingInstrument.detail
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'body' => '{
  "instructionType": "DWAC",
  "instruction": {
    "accountId": "U1001095",
    "accountTitle": "Special Company Holding LLC",
    "clientInstructionId": 7013037,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerTaxId": "123456789",
    "direction": "IN",
    "quantity": 1000,
    "referenceId": "refId",
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

```csharp DWAC - transfer using tradingInstrument.detail
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"DWAC\",\n  \"instruction\": {\n    \"accountId\": \"U1001095\",\n    \"accountTitle\": \"Special Company Holding LLC\",\n    \"clientInstructionId\": 7013037,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerTaxId\": \"123456789\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"referenceId\": \"refId\",\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift DWAC - transfer using tradingInstrument.detail
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "DWAC",
  "instruction": [
    "accountId": "U1001095",
    "accountTitle": "Special Company Holding LLC",
    "clientInstructionId": 7013037,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerTaxId": "123456789",
    "direction": "IN",
    "quantity": 1000,
    "referenceId": "refId",
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

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### 复杂资产转移 - 使用 contractID (conid)

**请求**

```json
{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": {
    "accountId": "U399192",
    "clientInstructionId": 7013040,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerInfo": {
      "accountType": "ORG",
      "brokerAccountId": "as3456567678578N",
      "brokerName": "JP MORGAN",
      "contactEmail": "a@gmail.com",
      "contactName": "as",
      "contactPhone": "2039126155",
      "country": "United States",
      "depositoryId": "1234"
    },
    "direction": "IN",
    "quantity": 10,
    "tradingInstrument": {
      "conid": 12123,
      "currency": "USD"
    }
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013031,
    "instructionType": "FOP",
    "instructionStatus": "PENDING",
    "instructionId": 43091814
  }
}
```

**SDK 代码**

```python Complex Asset Transfer - using contractID (conid)
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

payload = {
    "instructionType": "COMPLEX_ASSET_TRANSFER",
    "instruction": {
        "accountId": "U399192",
        "clientInstructionId": 7013040,
        "contraBrokerAccountId": "12345678A",
        "contraBrokerDtcCode": "534",
        "contraBrokerInfo": {
            "accountType": "ORG",
            "brokerAccountId": "as3456567678578N",
            "brokerName": "JP MORGAN",
            "contactEmail": "a@gmail.com",
            "contactName": "as",
            "contactPhone": "2039126155",
            "country": "United States",
            "depositoryId": "1234"
        },
        "direction": "IN",
        "quantity": 10,
        "tradingInstrument": {
            "conid": 12123,
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

```javascript Complex Asset Transfer - using contractID (conid)
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"COMPLEX_ASSET_TRANSFER","instruction":{"accountId":"U399192","clientInstructionId":7013040,"contraBrokerAccountId":"12345678A","contraBrokerDtcCode":"534","contraBrokerInfo":{"accountType":"ORG","brokerAccountId":"as3456567678578N","brokerName":"JP MORGAN","contactEmail":"a@gmail.com","contactName":"as","contactPhone":"2039126155","country":"United States","depositoryId":"1234"},"direction":"IN","quantity":10,"tradingInstrument":{"conid":12123,"currency":"USD"}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Complex Asset Transfer - using contractID (conid)
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"clientInstructionId\": 7013040,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 12123,\n      \"currency\": \"USD\"\n    }\n  }\n}")

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

```ruby Complex Asset Transfer - using contractID (conid)
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"clientInstructionId\": 7013040,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 12123,\n      \"currency\": \"USD\"\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Complex Asset Transfer - using contractID (conid)
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"clientInstructionId\": 7013040,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 12123,\n      \"currency\": \"USD\"\n    }\n  }\n}")
  .asString();
```

```php Complex Asset Transfer - using contractID (conid)
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'body' => '{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": {
    "accountId": "U399192",
    "clientInstructionId": 7013040,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerInfo": {
      "accountType": "ORG",
      "brokerAccountId": "as3456567678578N",
      "brokerName": "JP MORGAN",
      "contactEmail": "a@gmail.com",
      "contactName": "as",
      "contactPhone": "2039126155",
      "country": "United States",
      "depositoryId": "1234"
    },
    "direction": "IN",
    "quantity": 10,
    "tradingInstrument": {
      "conid": 12123,
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

```csharp Complex Asset Transfer - using contractID (conid)
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"clientInstructionId\": 7013040,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 12123,\n      \"currency\": \"USD\"\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Complex Asset Transfer - using contractID (conid)
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": [
    "accountId": "U399192",
    "clientInstructionId": 7013040,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerInfo": [
      "accountType": "ORG",
      "brokerAccountId": "as3456567678578N",
      "brokerName": "JP MORGAN",
      "contactEmail": "a@gmail.com",
      "contactName": "as",
      "contactPhone": "2039126155",
      "country": "United States",
      "depositoryId": "1234"
    ],
    "direction": "IN",
    "quantity": 10,
    "tradingInstrument": [
      "conid": 12123,
      "currency": "USD"
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### 复杂资产转移 - 使用 tradingInstrument.detail

**请求**

```json
{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": {
    "accountId": "U399192",
    "clientInstructionId": 7013042,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerInfo": {
      "accountType": "ORG",
      "brokerAccountId": "as3456567678578N",
      "brokerName": "JP MORGAN",
      "contactEmail": "a@gmail.com",
      "contactName": "as",
      "contactPhone": "2039126155",
      "country": "United States",
      "depositoryId": "1234"
    },
    "direction": "IN",
    "quantity": 10,
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
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013031,
    "instructionType": "FOP",
    "instructionStatus": "PENDING",
    "instructionId": 43091814
  }
}
```

**SDK 代码**

```python Complex Asset Transfer - using tradingInstrument.detail
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

payload = {
    "instructionType": "COMPLEX_ASSET_TRANSFER",
    "instruction": {
        "accountId": "U399192",
        "clientInstructionId": 7013042,
        "contraBrokerAccountId": "12345678A",
        "contraBrokerDtcCode": "534",
        "contraBrokerInfo": {
            "accountType": "ORG",
            "brokerAccountId": "as3456567678578N",
            "brokerName": "JP MORGAN",
            "contactEmail": "a@gmail.com",
            "contactName": "as",
            "contactPhone": "2039126155",
            "country": "United States",
            "depositoryId": "1234"
        },
        "direction": "IN",
        "quantity": 10,
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

```javascript Complex Asset Transfer - using tradingInstrument.detail
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"COMPLEX_ASSET_TRANSFER","instruction":{"accountId":"U399192","clientInstructionId":7013042,"contraBrokerAccountId":"12345678A","contraBrokerDtcCode":"534","contraBrokerInfo":{"accountType":"ORG","brokerAccountId":"as3456567678578N","brokerName":"JP MORGAN","contactEmail":"a@gmail.com","contactName":"as","contactPhone":"2039126155","country":"United States","depositoryId":"1234"},"direction":"IN","quantity":10,"tradingInstrument":{"conid":459200101,"currency":"USD","tradingInstrumentDescription":{"assetType":"STK","securityId":"459200101","securityIdType":"ISIN"}}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Complex Asset Transfer - using tradingInstrument.detail
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"clientInstructionId\": 7013042,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}")

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

```ruby Complex Asset Transfer - using tradingInstrument.detail
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"clientInstructionId\": 7013042,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Complex Asset Transfer - using tradingInstrument.detail
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"clientInstructionId\": 7013042,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}")
  .asString();
```

```php Complex Asset Transfer - using tradingInstrument.detail
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'body' => '{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": {
    "accountId": "U399192",
    "clientInstructionId": 7013042,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerInfo": {
      "accountType": "ORG",
      "brokerAccountId": "as3456567678578N",
      "brokerName": "JP MORGAN",
      "contactEmail": "a@gmail.com",
      "contactName": "as",
      "contactPhone": "2039126155",
      "country": "United States",
      "depositoryId": "1234"
    },
    "direction": "IN",
    "quantity": 10,
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

```csharp Complex Asset Transfer - using tradingInstrument.detail
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"clientInstructionId\": 7013042,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Complex Asset Transfer - using tradingInstrument.detail
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": [
    "accountId": "U399192",
    "clientInstructionId": 7013042,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerInfo": [
      "accountType": "ORG",
      "brokerAccountId": "as3456567678578N",
      "brokerName": "JP MORGAN",
      "contactEmail": "a@gmail.com",
      "contactName": "as",
      "contactPhone": "2039126155",
      "country": "United States",
      "depositoryId": "1234"
    ],
    "direction": "IN",
    "quantity": 10,
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

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### 复杂资产转移 - 用户为 nonDisclosed 类型时

**请求**

```json
{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": {
    "accountId": "U399192",
    "clientInstructionId": 7013041,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerInfo": {
      "accountType": "ORG",
      "brokerAccountId": "as3456567678578N",
      "brokerName": "JP MORGAN",
      "contactEmail": "a@gmail.com",
      "contactName": "as",
      "contactPhone": "2039126155",
      "country": "United States",
      "depositoryId": "1234"
    },
    "direction": "IN",
    "nonDisclosedDetail": {
      "buyerSellBic": "",
      "memberAccountId": "",
      "psetBic": "",
      "reagDeagBic": "",
      "safeKeepingAccountId": "",
      "settleDate": "2018-03-20T09:12:13Z",
      "tradeDate": "2018-03-20T09:12:13Z"
    },
    "quantity": 10,
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
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013031,
    "instructionType": "FOP",
    "instructionStatus": "PENDING",
    "instructionId": 43091814
  }
}
```

**SDK 代码**

```python Complex Asset Transfer - where user is nonDisclosed type
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

payload = {
    "instructionType": "COMPLEX_ASSET_TRANSFER",
    "instruction": {
        "accountId": "U399192",
        "clientInstructionId": 7013041,
        "contraBrokerAccountId": "12345678A",
        "contraBrokerDtcCode": "534",
        "contraBrokerInfo": {
            "accountType": "ORG",
            "brokerAccountId": "as3456567678578N",
            "brokerName": "JP MORGAN",
            "contactEmail": "a@gmail.com",
            "contactName": "as",
            "contactPhone": "2039126155",
            "country": "United States",
            "depositoryId": "1234"
        },
        "direction": "IN",
        "nonDisclosedDetail": {
            "buyerSellBic": "",
            "memberAccountId": "",
            "psetBic": "",
            "reagDeagBic": "",
            "safeKeepingAccountId": "",
            "settleDate": "2018-03-20T09:12:13Z",
            "tradeDate": "2018-03-20T09:12:13Z"
        },
        "quantity": 10,
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

```javascript Complex Asset Transfer - where user is nonDisclosed type
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"COMPLEX_ASSET_TRANSFER","instruction":{"accountId":"U399192","clientInstructionId":7013041,"contraBrokerAccountId":"12345678A","contraBrokerDtcCode":"534","contraBrokerInfo":{"accountType":"ORG","brokerAccountId":"as3456567678578N","brokerName":"JP MORGAN","contactEmail":"a@gmail.com","contactName":"as","contactPhone":"2039126155","country":"United States","depositoryId":"1234"},"direction":"IN","nonDisclosedDetail":{"buyerSellBic":"","memberAccountId":"","psetBic":"","reagDeagBic":"","safeKeepingAccountId":"","settleDate":"2018-03-20T09:12:13Z","tradeDate":"2018-03-20T09:12:13Z"},"quantity":10,"tradingInstrument":{"conid":459200101,"currency":"USD","tradingInstrumentDescription":{"assetType":"STK","securityId":"459200101","securityIdType":"ISIN"}}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Complex Asset Transfer - where user is nonDisclosed type
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"clientInstructionId\": 7013041,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"nonDisclosedDetail\": {\n      \"buyerSellBic\": \"\",\n      \"memberAccountId\": \"\",\n      \"psetBic\": \"\",\n      \"reagDeagBic\": \"\",\n      \"safeKeepingAccountId\": \"\",\n      \"settleDate\": \"2018-03-20T09:12:13Z\",\n      \"tradeDate\": \"2018-03-20T09:12:13Z\"\n    },\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}")

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

```ruby Complex Asset Transfer - where user is nonDisclosed type
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"clientInstructionId\": 7013041,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"nonDisclosedDetail\": {\n      \"buyerSellBic\": \"\",\n      \"memberAccountId\": \"\",\n      \"psetBic\": \"\",\n      \"reagDeagBic\": \"\",\n      \"safeKeepingAccountId\": \"\",\n      \"settleDate\": \"2018-03-20T09:12:13Z\",\n      \"tradeDate\": \"2018-03-20T09:12:13Z\"\n    },\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Complex Asset Transfer - where user is nonDisclosed type
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"clientInstructionId\": 7013041,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"nonDisclosedDetail\": {\n      \"buyerSellBic\": \"\",\n      \"memberAccountId\": \"\",\n      \"psetBic\": \"\",\n      \"reagDeagBic\": \"\",\n      \"safeKeepingAccountId\": \"\",\n      \"settleDate\": \"2018-03-20T09:12:13Z\",\n      \"tradeDate\": \"2018-03-20T09:12:13Z\"\n    },\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}")
  .asString();
```

```php Complex Asset Transfer - where user is nonDisclosed type
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'body' => '{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": {
    "accountId": "U399192",
    "clientInstructionId": 7013041,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerInfo": {
      "accountType": "ORG",
      "brokerAccountId": "as3456567678578N",
      "brokerName": "JP MORGAN",
      "contactEmail": "a@gmail.com",
      "contactName": "as",
      "contactPhone": "2039126155",
      "country": "United States",
      "depositoryId": "1234"
    },
    "direction": "IN",
    "nonDisclosedDetail": {
      "buyerSellBic": "",
      "memberAccountId": "",
      "psetBic": "",
      "reagDeagBic": "",
      "safeKeepingAccountId": "",
      "settleDate": "2018-03-20T09:12:13Z",
      "tradeDate": "2018-03-20T09:12:13Z"
    },
    "quantity": 10,
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

```csharp Complex Asset Transfer - where user is nonDisclosed type
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"clientInstructionId\": 7013041,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"nonDisclosedDetail\": {\n      \"buyerSellBic\": \"\",\n      \"memberAccountId\": \"\",\n      \"psetBic\": \"\",\n      \"reagDeagBic\": \"\",\n      \"safeKeepingAccountId\": \"\",\n      \"settleDate\": \"2018-03-20T09:12:13Z\",\n      \"tradeDate\": \"2018-03-20T09:12:13Z\"\n    },\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Complex Asset Transfer - where user is nonDisclosed type
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": [
    "accountId": "U399192",
    "clientInstructionId": 7013041,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerInfo": [
      "accountType": "ORG",
      "brokerAccountId": "as3456567678578N",
      "brokerName": "JP MORGAN",
      "contactEmail": "a@gmail.com",
      "contactName": "as",
      "contactPhone": "2039126155",
      "country": "United States",
      "depositoryId": "1234"
    ],
    "direction": "IN",
    "nonDisclosedDetail": [
      "buyerSellBic": "",
      "memberAccountId": "",
      "psetBic": "",
      "reagDeagBic": "",
      "safeKeepingAccountId": "",
      "settleDate": "2018-03-20T09:12:13Z",
      "tradeDate": "2018-03-20T09:12:13Z"
    ],
    "quantity": 10,
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

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### 复杂资产转移（含内部券商详情）- accountIdAtCurrentBroker 与 accountTitle

**请求**

```json
{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": {
    "accountId": "U399192",
    "accountIdAtCurrentBroker": "8E90075",
    "clientInstructionId": 7013041,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerInfo": {
      "accountTitle": "test",
      "accountType": "ORG",
      "brokerAccountId": "as3456567678578N",
      "brokerName": "JP MORGAN",
      "contactEmail": "a@gmail.com",
      "contactName": "as",
      "contactPhone": "2039126155",
      "country": "United States",
      "depositoryId": "1234"
    },
    "direction": "IN",
    "nonDisclosedDetail": {
      "buyerSellBic": "",
      "memberAccountId": "",
      "psetBic": "",
      "reagDeagBic": "",
      "safeKeepingAccountId": "",
      "settleDate": "2018-03-20T09:12:13Z",
      "tradeDate": "2018-03-20T09:12:13Z"
    },
    "quantity": 10,
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
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013031,
    "instructionType": "FOP",
    "instructionStatus": "PENDING",
    "instructionId": 43091814
  }
}
```

**SDK 代码**

```python Complex Asset Transfer with internal broker details - accountIdAtCurrentBroker and accountTitle
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

payload = {
    "instructionType": "COMPLEX_ASSET_TRANSFER",
    "instruction": {
        "accountId": "U399192",
        "accountIdAtCurrentBroker": "8E90075",
        "clientInstructionId": 7013041,
        "contraBrokerAccountId": "12345678A",
        "contraBrokerDtcCode": "534",
        "contraBrokerInfo": {
            "accountTitle": "test",
            "accountType": "ORG",
            "brokerAccountId": "as3456567678578N",
            "brokerName": "JP MORGAN",
            "contactEmail": "a@gmail.com",
            "contactName": "as",
            "contactPhone": "2039126155",
            "country": "United States",
            "depositoryId": "1234"
        },
        "direction": "IN",
        "nonDisclosedDetail": {
            "buyerSellBic": "",
            "memberAccountId": "",
            "psetBic": "",
            "reagDeagBic": "",
            "safeKeepingAccountId": "",
            "settleDate": "2018-03-20T09:12:13Z",
            "tradeDate": "2018-03-20T09:12:13Z"
        },
        "quantity": 10,
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

```javascript Complex Asset Transfer with internal broker details - accountIdAtCurrentBroker and accountTitle
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"COMPLEX_ASSET_TRANSFER","instruction":{"accountId":"U399192","accountIdAtCurrentBroker":"8E90075","clientInstructionId":7013041,"contraBrokerAccountId":"12345678A","contraBrokerDtcCode":"534","contraBrokerInfo":{"accountTitle":"test","accountType":"ORG","brokerAccountId":"as3456567678578N","brokerName":"JP MORGAN","contactEmail":"a@gmail.com","contactName":"as","contactPhone":"2039126155","country":"United States","depositoryId":"1234"},"direction":"IN","nonDisclosedDetail":{"buyerSellBic":"","memberAccountId":"","psetBic":"","reagDeagBic":"","safeKeepingAccountId":"","settleDate":"2018-03-20T09:12:13Z","tradeDate":"2018-03-20T09:12:13Z"},"quantity":10,"tradingInstrument":{"conid":459200101,"currency":"USD","tradingInstrumentDescription":{"assetType":"STK","securityId":"459200101","securityIdType":"ISIN"}}}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Complex Asset Transfer with internal broker details - accountIdAtCurrentBroker and accountTitle
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"accountIdAtCurrentBroker\": \"8E90075\",\n    \"clientInstructionId\": 7013041,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountTitle\": \"test\",\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"nonDisclosedDetail\": {\n      \"buyerSellBic\": \"\",\n      \"memberAccountId\": \"\",\n      \"psetBic\": \"\",\n      \"reagDeagBic\": \"\",\n      \"safeKeepingAccountId\": \"\",\n      \"settleDate\": \"2018-03-20T09:12:13Z\",\n      \"tradeDate\": \"2018-03-20T09:12:13Z\"\n    },\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}")

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

```ruby Complex Asset Transfer with internal broker details - accountIdAtCurrentBroker and accountTitle
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"accountIdAtCurrentBroker\": \"8E90075\",\n    \"clientInstructionId\": 7013041,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountTitle\": \"test\",\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"nonDisclosedDetail\": {\n      \"buyerSellBic\": \"\",\n      \"memberAccountId\": \"\",\n      \"psetBic\": \"\",\n      \"reagDeagBic\": \"\",\n      \"safeKeepingAccountId\": \"\",\n      \"settleDate\": \"2018-03-20T09:12:13Z\",\n      \"tradeDate\": \"2018-03-20T09:12:13Z\"\n    },\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java Complex Asset Transfer with internal broker details - accountIdAtCurrentBroker and accountTitle
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"accountIdAtCurrentBroker\": \"8E90075\",\n    \"clientInstructionId\": 7013041,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountTitle\": \"test\",\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"nonDisclosedDetail\": {\n      \"buyerSellBic\": \"\",\n      \"memberAccountId\": \"\",\n      \"psetBic\": \"\",\n      \"reagDeagBic\": \"\",\n      \"safeKeepingAccountId\": \"\",\n      \"settleDate\": \"2018-03-20T09:12:13Z\",\n      \"tradeDate\": \"2018-03-20T09:12:13Z\"\n    },\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}")
  .asString();
```

```php Complex Asset Transfer with internal broker details - accountIdAtCurrentBroker and accountTitle
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'body' => '{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": {
    "accountId": "U399192",
    "accountIdAtCurrentBroker": "8E90075",
    "clientInstructionId": 7013041,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerInfo": {
      "accountTitle": "test",
      "accountType": "ORG",
      "brokerAccountId": "as3456567678578N",
      "brokerName": "JP MORGAN",
      "contactEmail": "a@gmail.com",
      "contactName": "as",
      "contactPhone": "2039126155",
      "country": "United States",
      "depositoryId": "1234"
    },
    "direction": "IN",
    "nonDisclosedDetail": {
      "buyerSellBic": "",
      "memberAccountId": "",
      "psetBic": "",
      "reagDeagBic": "",
      "safeKeepingAccountId": "",
      "settleDate": "2018-03-20T09:12:13Z",
      "tradeDate": "2018-03-20T09:12:13Z"
    },
    "quantity": 10,
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

```csharp Complex Asset Transfer with internal broker details - accountIdAtCurrentBroker and accountTitle
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"COMPLEX_ASSET_TRANSFER\",\n  \"instruction\": {\n    \"accountId\": \"U399192\",\n    \"accountIdAtCurrentBroker\": \"8E90075\",\n    \"clientInstructionId\": 7013041,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"contraBrokerInfo\": {\n      \"accountTitle\": \"test\",\n      \"accountType\": \"ORG\",\n      \"brokerAccountId\": \"as3456567678578N\",\n      \"brokerName\": \"JP MORGAN\",\n      \"contactEmail\": \"a@gmail.com\",\n      \"contactName\": \"as\",\n      \"contactPhone\": \"2039126155\",\n      \"country\": \"United States\",\n      \"depositoryId\": \"1234\"\n    },\n    \"direction\": \"IN\",\n    \"nonDisclosedDetail\": {\n      \"buyerSellBic\": \"\",\n      \"memberAccountId\": \"\",\n      \"psetBic\": \"\",\n      \"reagDeagBic\": \"\",\n      \"safeKeepingAccountId\": \"\",\n      \"settleDate\": \"2018-03-20T09:12:13Z\",\n      \"tradeDate\": \"2018-03-20T09:12:13Z\"\n    },\n    \"quantity\": 10,\n    \"tradingInstrument\": {\n      \"conid\": 459200101,\n      \"currency\": \"USD\",\n      \"tradingInstrumentDescription\": {\n        \"assetType\": \"STK\",\n        \"securityId\": \"459200101\",\n        \"securityIdType\": \"ISIN\"\n      }\n    }\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Complex Asset Transfer with internal broker details - accountIdAtCurrentBroker and accountTitle
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": [
    "accountId": "U399192",
    "accountIdAtCurrentBroker": "8E90075",
    "clientInstructionId": 7013041,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "contraBrokerInfo": [
      "accountTitle": "test",
      "accountType": "ORG",
      "brokerAccountId": "as3456567678578N",
      "brokerName": "JP MORGAN",
      "contactEmail": "a@gmail.com",
      "contactName": "as",
      "contactPhone": "2039126155",
      "country": "United States",
      "depositoryId": "1234"
    ],
    "direction": "IN",
    "nonDisclosedDetail": [
      "buyerSellBic": "",
      "memberAccountId": "",
      "psetBic": "",
      "reagDeagBic": "",
      "safeKeepingAccountId": "",
      "settleDate": "2018-03-20T09:12:13Z",
      "tradeDate": "2018-03-20T09:12:13Z"
    ],
    "quantity": 10,
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

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### 外部持仓转移 - ACATS

**请求**

```json
{
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
  "instruction": {
    "accountAtBroker": "SOL12345",
    "accountId": "U1225448",
    "brokerId": "0226",
    "brokerName": "Wall Street Financial Group",
    "clientInstructionId": 7013060,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "quantity": 1000,
    "signature": "John Doe",
    "sourceIRAType": "RO",
    "subType": "ACATS",
    "tradingInstrument": {
      "conid": 459200101
    },
    "type": "FULL"
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013031,
    "instructionType": "FOP",
    "instructionStatus": "PENDING",
    "instructionId": 43091814
  }
}
```

**SDK 代码**

```python External Position Transfer - ACATS
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

payload = {
    "instructionType": "EXTERNAL_POSITION_TRANSFER",
    "instruction": {
        "accountAtBroker": "SOL12345",
        "accountId": "U1225448",
        "brokerId": "0226",
        "brokerName": "Wall Street Financial Group",
        "clientInstructionId": 7013060,
        "contraBrokerAccountId": "12345678A",
        "contraBrokerDtcCode": "534",
        "direction": "IN",
        "quantity": 1000,
        "signature": "John Doe",
        "sourceIRAType": "RO",
        "subType": "ACATS",
        "tradingInstrument": { "conid": 459200101 },
        "type": "FULL"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript External Position Transfer - ACATS
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"EXTERNAL_POSITION_TRANSFER","instruction":{"accountAtBroker":"SOL12345","accountId":"U1225448","brokerId":"0226","brokerName":"Wall Street Financial Group","clientInstructionId":7013060,"contraBrokerAccountId":"12345678A","contraBrokerDtcCode":"534","direction":"IN","quantity":1000,"signature":"John Doe","sourceIRAType":"RO","subType":"ACATS","tradingInstrument":{"conid":459200101},"type":"FULL"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go External Position Transfer - ACATS
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"accountAtBroker\": \"SOL12345\",\n    \"accountId\": \"U1225448\",\n    \"brokerId\": \"0226\",\n    \"brokerName\": \"Wall Street Financial Group\",\n    \"clientInstructionId\": 7013060,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"signature\": \"John Doe\",\n    \"sourceIRAType\": \"RO\",\n    \"subType\": \"ACATS\",\n    \"tradingInstrument\": {\n      \"conid\": 459200101\n    },\n    \"type\": \"FULL\"\n  }\n}")

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

```ruby External Position Transfer - ACATS
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"accountAtBroker\": \"SOL12345\",\n    \"accountId\": \"U1225448\",\n    \"brokerId\": \"0226\",\n    \"brokerName\": \"Wall Street Financial Group\",\n    \"clientInstructionId\": 7013060,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"signature\": \"John Doe\",\n    \"sourceIRAType\": \"RO\",\n    \"subType\": \"ACATS\",\n    \"tradingInstrument\": {\n      \"conid\": 459200101\n    },\n    \"type\": \"FULL\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java External Position Transfer - ACATS
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"accountAtBroker\": \"SOL12345\",\n    \"accountId\": \"U1225448\",\n    \"brokerId\": \"0226\",\n    \"brokerName\": \"Wall Street Financial Group\",\n    \"clientInstructionId\": 7013060,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"signature\": \"John Doe\",\n    \"sourceIRAType\": \"RO\",\n    \"subType\": \"ACATS\",\n    \"tradingInstrument\": {\n      \"conid\": 459200101\n    },\n    \"type\": \"FULL\"\n  }\n}")
  .asString();
```

```php External Position Transfer - ACATS
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'body' => '{
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
  "instruction": {
    "accountAtBroker": "SOL12345",
    "accountId": "U1225448",
    "brokerId": "0226",
    "brokerName": "Wall Street Financial Group",
    "clientInstructionId": 7013060,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "quantity": 1000,
    "signature": "John Doe",
    "sourceIRAType": "RO",
    "subType": "ACATS",
    "tradingInstrument": {
      "conid": 459200101
    },
    "type": "FULL"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp External Position Transfer - ACATS
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"accountAtBroker\": \"SOL12345\",\n    \"accountId\": \"U1225448\",\n    \"brokerId\": \"0226\",\n    \"brokerName\": \"Wall Street Financial Group\",\n    \"clientInstructionId\": 7013060,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"signature\": \"John Doe\",\n    \"sourceIRAType\": \"RO\",\n    \"subType\": \"ACATS\",\n    \"tradingInstrument\": {\n      \"conid\": 459200101\n    },\n    \"type\": \"FULL\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift External Position Transfer - ACATS
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
  "instruction": [
    "accountAtBroker": "SOL12345",
    "accountId": "U1225448",
    "brokerId": "0226",
    "brokerName": "Wall Street Financial Group",
    "clientInstructionId": 7013060,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "quantity": 1000,
    "signature": "John Doe",
    "sourceIRAType": "RO",
    "subType": "ACATS",
    "tradingInstrument": ["conid": 459200101],
    "type": "FULL"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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

### 外部持仓转移 - ATON

**请求**

```json
{
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
  "instruction": {
    "accountAtBroker": "SOL12345",
    "accountId": "U1225448",
    "brokerId": "3265",
    "brokerName": "Wall Street Financial Group",
    "clientInstructionId": 7013060,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "quantity": 1000,
    "signature": "Marko Barr",
    "subType": "ATON",
    "tradingInstrument": {
      "conid": 459200101
    },
    "type": "FULL"
  }
}
```

**响应**

```json
{
  "status": 202,
  "instructionSetId": 1703,
  "instructionResult": {
    "clientInstructionId": 1013031,
    "instructionType": "FOP",
    "instructionStatus": "PENDING",
    "instructionId": 43091814
  }
}
```

**SDK 代码**

```python External Position Transfer - ATON
import requests

url = "https://localhost:5000/gw/api/v1/external-asset-transfers"

payload = {
    "instructionType": "EXTERNAL_POSITION_TRANSFER",
    "instruction": {
        "accountAtBroker": "SOL12345",
        "accountId": "U1225448",
        "brokerId": "3265",
        "brokerName": "Wall Street Financial Group",
        "clientInstructionId": 7013060,
        "contraBrokerAccountId": "12345678A",
        "contraBrokerDtcCode": "534",
        "direction": "IN",
        "quantity": 1000,
        "signature": "Marko Barr",
        "subType": "ATON",
        "tradingInstrument": { "conid": 459200101 },
        "type": "FULL"
    }
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript External Position Transfer - ATON
const url = 'https://localhost:5000/gw/api/v1/external-asset-transfers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instructionType":"EXTERNAL_POSITION_TRANSFER","instruction":{"accountAtBroker":"SOL12345","accountId":"U1225448","brokerId":"3265","brokerName":"Wall Street Financial Group","clientInstructionId":7013060,"contraBrokerAccountId":"12345678A","contraBrokerDtcCode":"534","direction":"IN","quantity":1000,"signature":"Marko Barr","subType":"ATON","tradingInstrument":{"conid":459200101},"type":"FULL"}}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go External Position Transfer - ATON
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/external-asset-transfers"

	payload := strings.NewReader("{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"accountAtBroker\": \"SOL12345\",\n    \"accountId\": \"U1225448\",\n    \"brokerId\": \"3265\",\n    \"brokerName\": \"Wall Street Financial Group\",\n    \"clientInstructionId\": 7013060,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"signature\": \"Marko Barr\",\n    \"subType\": \"ATON\",\n    \"tradingInstrument\": {\n      \"conid\": 459200101\n    },\n    \"type\": \"FULL\"\n  }\n}")

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

```ruby External Position Transfer - ATON
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/external-asset-transfers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"accountAtBroker\": \"SOL12345\",\n    \"accountId\": \"U1225448\",\n    \"brokerId\": \"3265\",\n    \"brokerName\": \"Wall Street Financial Group\",\n    \"clientInstructionId\": 7013060,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"signature\": \"Marko Barr\",\n    \"subType\": \"ATON\",\n    \"tradingInstrument\": {\n      \"conid\": 459200101\n    },\n    \"type\": \"FULL\"\n  }\n}"

response = http.request(request)
puts response.read_body
```

```java External Position Transfer - ATON
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/external-asset-transfers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"accountAtBroker\": \"SOL12345\",\n    \"accountId\": \"U1225448\",\n    \"brokerId\": \"3265\",\n    \"brokerName\": \"Wall Street Financial Group\",\n    \"clientInstructionId\": 7013060,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"signature\": \"Marko Barr\",\n    \"subType\": \"ATON\",\n    \"tradingInstrument\": {\n      \"conid\": 459200101\n    },\n    \"type\": \"FULL\"\n  }\n}")
  .asString();
```

```php External Position Transfer - ATON
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/external-asset-transfers', [
  'body' => '{
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
  "instruction": {
    "accountAtBroker": "SOL12345",
    "accountId": "U1225448",
    "brokerId": "3265",
    "brokerName": "Wall Street Financial Group",
    "clientInstructionId": 7013060,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "quantity": 1000,
    "signature": "Marko Barr",
    "subType": "ATON",
    "tradingInstrument": {
      "conid": 459200101
    },
    "type": "FULL"
  }
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp External Position Transfer - ATON
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/external-asset-transfers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instructionType\": \"EXTERNAL_POSITION_TRANSFER\",\n  \"instruction\": {\n    \"accountAtBroker\": \"SOL12345\",\n    \"accountId\": \"U1225448\",\n    \"brokerId\": \"3265\",\n    \"brokerName\": \"Wall Street Financial Group\",\n    \"clientInstructionId\": 7013060,\n    \"contraBrokerAccountId\": \"12345678A\",\n    \"contraBrokerDtcCode\": \"534\",\n    \"direction\": \"IN\",\n    \"quantity\": 1000,\n    \"signature\": \"Marko Barr\",\n    \"subType\": \"ATON\",\n    \"tradingInstrument\": {\n      \"conid\": 459200101\n    },\n    \"type\": \"FULL\"\n  }\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift External Position Transfer - ATON
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
  "instruction": [
    "accountAtBroker": "SOL12345",
    "accountId": "U1225448",
    "brokerId": "3265",
    "brokerName": "Wall Street Financial Group",
    "clientInstructionId": 7013060,
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "direction": "IN",
    "quantity": 1000,
    "signature": "Marko Barr",
    "subType": "ATON",
    "tradingInstrument": ["conid": 459200101],
    "type": "FULL"
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/external-asset-transfers")! as URL,
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