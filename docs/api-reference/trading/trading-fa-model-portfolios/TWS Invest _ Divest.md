# TWS 投资/撤资

POST https://localhost:5000/v1/api/fa/model/tws-invest-divest
Content-Type: application/json

针对一组账户，向**一个或多个目标模型**提交 TWS 风格的投资或撤资指令。正的 `amtToInvest` 值表示向目标模型投入现金；负值表示撤资。响应将返回生成的分配计划，以及源现金池与每个目标模型之间的资金划转。

可通过以下三种**互斥**方式之一指定要投资的账户集合：
 * `account` - 单个 U-account 标识符
   （例如 `"account": "DU12349"`）。
 * `accountList` - U-account 标识符的显式列表
   （例如 `"accountList": ["DU12349", "DU12350", "DU12351"]`）。
 * `group` - FA 盘前分配组的名称
   （例如 `"group": "Group1"`），或使用 `"All"` 以包含财务顾问
   下的每个账户。使用 `accountList` 或 `group` 时，每个 `amtToInvest` 值会被
   **平均分摊**到解析出的所有账户。


与 `/fa/model/invest-divest` 的功能对比：
 * `tws-invest-divest` 支持以**多种货币**计价的模型；
   `invest-divest` 仅支持单一货币的模型。
 * `tws-invest-divest` 每次请求可接受**多个目标模型**
   （通过 `modelList`）；`invest-divest` 每次请求仅针对单个模型。
 * `invest-divest` 允许**每个账户具有不同的投资金额**，
   因为每个账户都单独列出并带有各自的 `amtToInvest`。
   `invest-divest` 不支持 FA 盘前分配组。
 * 当 `tws-invest-divest` 使用 `group` 或 `accountList` 时，单个
   `amtToInvest` 会被**平均**分摊到所有解析出的账户。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/tws-invest-divest

## 认证

- `Authorization` 请求头（bearer token，required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 请求体 (application/json)

该端点期望接收一个对象。

- `reqID` (long, required) — 用于唯一跟踪请求的请求标识符。
- `modelList` (list of V1ApiFaModelTwsInvestDivestPostRequestBodyContentApplicationJsonSchemaModelListItems, required) — 投资/撤资指令列表，每个目标模型一条。
- `account` (string, optional) — 提交投资/撤资指令的单个 U-account 标识符。与 `accountList` 和 `group` 互斥。
- `accountList` (list of string, optional) — 用于投资/撤资的 U-account 标识符显式列表。`modelList` 中的每个 `amtToInvest` 值会被平均分配到所列账户。与 `account` 和 `group` 互斥。
- `group` (string, optional) — FA 盘前分配组的名称，其成员账户将接收投资/撤资指令。使用 `"All"` 可定向到财务顾问下的每个账户。提供该参数时，`modelList` 中的每个 `amtToInvest` 值会被平均分配到解析出的组成员。与 `account` 和 `accountList` 互斥。
- `subscriptionKey` (string, optional) — 订阅密钥。首次请求时发送空字符串。

## 响应

### 200

已成功计算投资/撤资分配计划。

- `allocations` (list of twsInvestDivestAllocation, optional) — 由投资/撤资规划器生成的按金融工具的分配指令。
- `cashTransfers` (list of twsInvestDivestCashTransfer, optional) — 为执行该计划所需的源模型与目标模型之间的资金流动。
- `errors` (list of string, optional, nullable) — 规划器产生的错误。计划成功时为 `null`。
- `positionTransfers` (list of TwsInvestDivestResponsePositionTransfersItems, optional) — 计划在源模型与目标模型之间进行的持仓转移。
- `reqID` (long, optional) — 从原始请求回显的请求标识符。
- `subscriptionStatus` (long, optional) — 描述该模型是否处于轮询模式。
- `transfersInstructionId` (long, optional) — 对生成的转移进行分组的标识符；提供给下游提交端点使用。

## 错误

### 401 未授权错误

授权令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

服务器内部错误，在无法处理传入请求时返回。有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，且只能在处理请求的后续阶段才能检测出来。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 类型

### V1ApiFaModelTwsInvestDivestPostRequestBodyContentApplicationJsonSchemaModelListItems

- `investCurrency` (string, optional) — 投资/撤资金额的币种（ISO 4217）。
- `amtToInvest` (double, optional) — 投入该模型的现金额。使用负值表示撤资。
- `model` (string, optional) — 投资/撤资指令的目标模型。

### twsInvestDivestAllocation

由 TWS 投资/撤资规划器生成的分配指令。

- `account` (string, optional) — 该分配适用的账户。
- `batchNumber` (long, optional) — 用于排列所提交转移顺序的批次分组。
- `cashQty` (string, optional) — 该分配以现金计的数量。
- `closePosition` (boolean, optional) — 如果该分配完全平掉持仓，则为 true。
- `conid` (long, optional) — 被分配金融工具的合约标识符。
- `isCashQty` (boolean, optional) — 如果该分配以现金金额而非股数表示，则为 true。
- `model` (string, optional) — 该分配的目标模型。
- `price` (string, optional) — 用于计算该分配的价格。
- `quantity` (string, optional) — 该分配的股数。
- `relatedRequestAccount` (string, optional) — 与相关上游请求关联的账户。
- `relatedRequestID` (string, optional) — 产生该分配的相关上游请求的标识符。
- `secType` (string, optional) — 证券类型（例如 `STK`）。

### twsInvestDivestCashTransfer

由 TWS 投资/撤资规划器生成的源模型与目标模型之间的资金划转。

- `account` (string, optional) — 该资金划转适用的账户。
- `amt` (string, optional) — 要划转的现金额，以 `ccy` 表示。
- `batchNumber` (long, optional) — 用于排列所提交转移顺序的批次分组。
- `ccy` (string, optional) — 资金划转的币种（ISO 4217）。
- `destinationModel` (string, optional) — 接收现金的模型。
- `sourceModel` (string, optional) — 提供现金的模型（例如独立现金池为 `Core`）。

### TwsInvestDivestResponsePositionTransfersItems

## 示例

**请求**

```json
{
  "reqID": 398889,
  "modelList": [
    {}
  ]
}
```

**响应**

```json
{
  "allocations": [
    {
      "account": "DU12345",
      "batchNumber": 4,
      "cashQty": "15.73",
      "closePosition": false,
      "conid": 270639,
      "isCashQty": false,
      "model": "MODEL-API-DEMO",
      "price": "103.256",
      "quantity": "0.1523",
      "relatedRequestAccount": "DU12345",
      "relatedRequestID": "21449",
      "secType": "STK"
    },
    {
      "account": "DU12345",
      "batchNumber": 4,
      "cashQty": "206.92",
      "closePosition": false,
      "conid": 76792991,
      "isCashQty": false,
      "model": "MODEL-API-DEMO",
      "price": "339.489",
      "quantity": "0.6095",
      "relatedRequestAccount": "DU12345",
      "relatedRequestID": "21449",
      "secType": "STK"
    }
  ],
  "cashTransfers": [
    {
      "account": "DU12345",
      "amt": "3000",
      "batchNumber": 1,
      "ccy": "USD",
      "destinationModel": "MODEL-API-DEMO",
      "sourceModel": "Core"
    }
  ],
  "errors": [
    "None"
  ],
  "positionTransfers": [],
  "reqID": 398889,
  "subscriptionStatus": 1,
  "transfersInstructionId": 2
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/fa/model/tws-invest-divest"

payload = {
    "reqID": 398889,
    "modelList": [{}]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/fa/model/tws-invest-divest';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"reqID":398889,"modelList":[{}]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go success
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/fa/model/tws-invest-divest"

	payload := strings.NewReader("{\n  \"reqID\": 398889,\n  \"modelList\": [\n    {}\n  ]\n}")

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

```ruby success
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/fa/model/tws-invest-divest")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"reqID\": 398889,\n  \"modelList\": [\n    {}\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fa/model/tws-invest-divest")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"reqID\": 398889,\n  \"modelList\": [\n    {}\n  ]\n}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fa/model/tws-invest-divest', [
  'body' => '{
  "reqID": 398889,
  "modelList": [
    {}
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/fa/model/tws-invest-divest");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"reqID\": 398889,\n  \"modelList\": [\n    {}\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "reqID": 398889,
  "modelList": [[]]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fa/model/tws-invest-divest")! as URL,
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