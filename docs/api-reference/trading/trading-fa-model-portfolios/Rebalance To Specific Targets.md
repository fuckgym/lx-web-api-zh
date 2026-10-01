# 再平衡至指定目标

POST https://localhost:5000/v1/api/fa/model/rebalance/to-specific-targets
Content-Type: application/json

通过仅覆盖所提供的持仓目标来对指定模型进行再平衡，其余所有模型目标保持不变。与 `to-new-targets` 不同，该端点直接内联返回完整计算的分配预览（分配、分配汇总、转移计划以及警告/错误），而不是订阅密钥。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/rebalance-to-specific-targets

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
- `model` (string, required) — 要再平衡的模型名称。
- `positionTargets` (list of V1ApiFaModelRebalanceToSpecificTargetsPostRequestBodyContentApplicationJsonSchemaPositionTargetsItems, required) — 要为该模型覆盖的持仓目标。仅调整这些金融工具；模型其余部分保持不变。
- `subscriptionKey` (string, optional) — 订阅密钥。首次请求时发送空字符串。

## 响应

### 200

已成功获取再平衡分配预览。

- `accountsCanTradeFractions` (list of string, optional) — 有资格交易零碎股份（碎股）的账户。
- `allocationTotals` (list of rebalanceAllocationTotal, optional) — 每个金融工具的买入/卖出汇总总额。
- `allocations` (list of rebalanceAllocation, optional) — 由再平衡器生成的单条分配指令。
- `baseCcy` (string, optional) — 模型的基础货币。
- `contractsAllocEnabled` (list of long, optional) — 启用分配的合约标识符。
- `contractsCashQtyEnabled` (list of long, optional) — 启用现金数量分配的合约标识符。
- `contractsFracEligible` (list of long, optional) — 有资格进行碎股分配的合约标识符。
- `errors` (list of string, optional) — 再平衡器产生的错误列表。预览成功时为空。
- `miPositionTransfers` (list of RebalanceAllocationPreviewMiPositionTransfersItems, optional) — 计划在 managed-independent（独立管理）账户之间进行的持仓转移。
- `model` (string, optional) — 已再平衡的模型名称。
- `positionTransfers` (list of RebalanceAllocationPreviewPositionTransfersItems, optional) — 计划在该模型与其账户之间进行的持仓转移。
- `reqID` (long, optional) — 从原始请求回显的请求标识符。
- `subscriptionStatus` (long, optional) — 描述该模型是否处于轮询模式。
- `transfersInstructionId` (string, optional) — 对生成的转移进行分组的标识符；提供给下游提交端点使用。
- `warnings` (list of string, optional) — 再平衡器产生的非致命警告。

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

### V1ApiFaModelRebalanceToSpecificTargetsPostRequestBodyContentApplicationJsonSchemaPositionTargetsItems

- `conid` (long, optional) — 要定向的金融工具的合约标识符。
- `target` (double, optional) — 该金融工具的目标分配，以占模型的比例表示。
- `locked` (boolean, optional) — 该目标是否被锁定，从而不应被再平衡器调整。

### rebalanceAllocationTotal

再平衡预览中单个金融工具的买入/卖出汇总总额。

- `conid` (long, optional) — 该金融工具的合约标识符。
- `secType` (string, optional) — 证券类型（例如 `STK`）。
- `totalBuy` (string, optional, nullable) — 所有账户的买入总股数。
- `totalCashQtyBuy` (string, optional, nullable) — 所有账户以现金计的买入总量。
- `totalCashQtySell` (string, optional, nullable) — 所有账户以现金计的卖出总量。
- `totalSell` (string, optional, nullable) — 所有账户的卖出总股数。

### rebalanceAllocation

由再平衡器生成的单条分配指令。

- `account` (string, optional) — 该分配适用的账户标识符（可能带有模型名称前缀）。
- `batchNumber` (long, optional) — 用于排列所提交转移顺序的批次分组。
- `cashQty` (string, optional) — 该分配以现金计的数量。
- `closePosition` (boolean, optional) — 如果该分配完全平掉持仓，则为 true。
- `conid` (long, optional) — 被分配金融工具的合约标识符。
- `fxHedgeConid` (long, optional, nullable) — 外汇对冲的合约标识符（如适用）。
- `fxHedgeQuantity` (string, optional, nullable) — 外汇对冲的数量（如适用）。
- `isCashQty` (boolean, optional) — 如果该分配以现金金额而非股数表示，则为 true。
- `quantity` (string, optional) — 该分配的股数。
- `secType` (string, optional) — 证券类型（例如 `STK`）。

### RebalanceAllocationPreviewMiPositionTransfersItems

### RebalanceAllocationPreviewPositionTransfersItems

## 示例

**请求**

```json
{
  "reqID": 398899,
  "model": "MODEL-API-DEMO",
  "positionTargets": [
    {}
  ]
}
```

**响应**

```json
{
  "accountsCanTradeFractions": [
    "DU12345"
  ],
  "allocationTotals": [
    {
      "conid": 268084,
      "secType": "STK",
      "totalBuy": "34.3981",
      "totalCashQtyBuy": "3809.72",
      "totalCashQtySell": "None",
      "totalSell": "None"
    }
  ],
  "allocations": [
    {
      "account": "DU12345.MODEL-API-DEMO",
      "batchNumber": 4,
      "cashQty": "3809.72",
      "closePosition": false,
      "conid": 268084,
      "fxHedgeConid": 1,
      "fxHedgeQuantity": "None",
      "isCashQty": true,
      "quantity": "34.3981",
      "secType": "STK"
    }
  ],
  "baseCcy": "USD",
  "contractsAllocEnabled": [
    268084
  ],
  "contractsCashQtyEnabled": [
    268084
  ],
  "contractsFracEligible": [
    268084
  ],
  "errors": [],
  "miPositionTransfers": [],
  "model": "MODEL-API-DEMO",
  "positionTransfers": [],
  "reqID": 398899,
  "subscriptionStatus": 1,
  "transfersInstructionId": "1",
  "warnings": []
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/fa/model/rebalance/to-specific-targets"

payload = {
    "reqID": 398899,
    "model": "MODEL-API-DEMO",
    "positionTargets": [{}]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/fa/model/rebalance/to-specific-targets';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"reqID":398899,"model":"MODEL-API-DEMO","positionTargets":[{}]}'
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

	url := "https://localhost:5000/v1/api/fa/model/rebalance/to-specific-targets"

	payload := strings.NewReader("{\n  \"reqID\": 398899,\n  \"model\": \"MODEL-API-DEMO\",\n  \"positionTargets\": [\n    {}\n  ]\n}")

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

url = URI("https://localhost:5000/v1/api/fa/model/rebalance/to-specific-targets")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"reqID\": 398899,\n  \"model\": \"MODEL-API-DEMO\",\n  \"positionTargets\": [\n    {}\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fa/model/rebalance/to-specific-targets")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"reqID\": 398899,\n  \"model\": \"MODEL-API-DEMO\",\n  \"positionTargets\": [\n    {}\n  ]\n}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fa/model/rebalance/to-specific-targets', [
  'body' => '{
  "reqID": 398899,
  "model": "MODEL-API-DEMO",
  "positionTargets": [
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

var client = new RestClient("https://localhost:5000/v1/api/fa/model/rebalance/to-specific-targets");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"reqID\": 398899,\n  \"model\": \"MODEL-API-DEMO\",\n  \"positionTargets\": [\n    {}\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "reqID": 398899,
  "model": "MODEL-API-DEMO",
  "positionTargets": [[]]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fa/model/rebalance/to-specific-targets")! as URL,
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