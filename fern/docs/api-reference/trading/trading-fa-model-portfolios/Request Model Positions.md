# 请求模型投资组合持仓

POST https://localhost:5000/v1/api/fa/model/positions
Content-Type: application/json

请求模型中持有的所有持仓。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/get-all-model-positions

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 请求

### 请求体 (application/json)

此端点期望接收一个对象。

- `reqID` (long, optional) — 用于唯一跟踪请求的请求标识符。
- `model` (string, optional) — 您的模型名称。
- `sortField` (enum, optional) — 用于对响应进行排序的字段。* `actual` - 金融工具当前的实际模型分配。* `actualRangeMax` - 金融工具允许的最大实际模型分配。* `actualRangeMin` - 金融工具允许的最小实际模型分配。* `ccy` - 金融工具的货币。* `conid` - 合约标识符，即 conid。* `dlv` - 市值。* `instrumentImbalance` - 金融工具的实际分配与其模型的偏差程度。* `instrument` - 证券的代码。* `mv` - 模型持仓的市值。* `position` - 模型持有的股数。* `target` - 模型中持有的金融工具的目标百分比。
  - Allowed values: `actual`, `actualRangeMax`, `actualRangeMin`, `ccy`, `conid`, `dlv`, `instrumentImbalance`, `instrument`, `mismatchType`, `mv`, `position`, `target`
- `sortDirection` (enum, optional) — 请求的排序方向。* `ASC` - 按从最大到最小排序。* `DESC` - 按从最小到最大排序。
  - Allowed values: `ASC`, `DESC`
- `limit` (long, optional) — 返回的持仓数量上限。

## 响应

### 200

成功获取持仓详情

- `cash` (list of ModelPositionResponseCashItems, optional) — 表示模型中持有的每种货币的对象。
- `mismatched` (boolean, optional) — 说明实际分配（Actual）是否已与目标分配（Target）不一致。
- `model` (string, optional) — 模型名称。
- `nlv` (double, optional) — 模型的市值。
- `positionList` (list of ModelPositionResponsePositionListItems, optional) — 包含模型中每只股票的对象列表。
- `positionTs` (long, optional) — 获取持仓时的 Unix 时间戳。
- `reqID` (long, optional) — 用于唯一跟踪请求的请求标识符。
- `stkOnly` (boolean, optional) — 说明模型是否仅包含股票。
- `subscriptionStatus` (long, optional) — 说明模型是否处于轮询模式。
- `totalDlv` (double, optional) — 显示的模型总清算价值。
- `totalMv` (double, optional) — 整个持仓的市值。

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

服务器内部错误，在传入请求无法被处理时返回。有时可能包含部分属于错误请求的情况。例如传入了错误的 accountId，只能在处理请求的过程中才能检测出来。错误信息包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### ModelPositionResponseCashItems

- `actual` (double, optional) — 模型在该持仓中占的实际百分比。
- `ccy` (string, optional) — 货币符号。
- `exchangeRate` (double, optional) — 账户基础货币兑换模型基础货币的汇率。
- `instrumentImbalance` (double, optional) — 描述实际分配相对于模型的失衡百分比。
- `mv` (double, optional) — 持仓的市值。
- `target` (double, optional) — 模型在该持仓中持有的目标百分比。

### ModelPositionResponsePositionListItems

- `actual` (double, optional) — 模型在该持仓中占的实际百分比。
- `actualRangeMax` (double, optional) — 目标之上可接受的最大容差。
- `actualRangeMin` (double, optional) — 目标之下可接受的最小容差。
- `ccy` (string, optional) — 货币符号。
- `conid` (long, optional) — 该金融工具的合约标识符。
- `dlv` (double, optional) — 显示的清算价值。
- `exchangeRate` (long, optional) — 供 Client Portal 内部使用。应忽略。
- `flags` (long, optional) — 供 Client Portal 内部使用。应忽略。
- `instrumentImbalance` (double, optional) — 描述实际分配相对于模型的失衡百分比。
- `instrument` (string, optional) — 持仓的代码。
- `mismatchType` (double, optional) — 供 Client Portal 内部使用。应忽略。
- `mv` (double, optional) — 市值。
- `position` (double, optional) — 模型中持有的持仓总规模。
- `target` (double, optional) — 该持仓在模型中的期望分配百分比。

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "cash": [
    {
      "actual": 0,
      "ccy": "USD",
      "exchangeRate": 1,
      "instrumentImbalance": 0,
      "mv": 0,
      "target": 0.096
    }
  ],
  "mismatched": false,
  "model": "MCPAPI01",
  "nlv": 0,
  "positionList": [
    {
      "actual": 0,
      "actualRangeMax": 1.1,
      "actualRangeMin": 1.1,
      "ccy": "USD",
      "conid": 268084,
      "dlv": 0,
      "exchangeRate": 1,
      "flags": 0,
      "instrumentImbalance": 0,
      "instrument": "CSCO",
      "mismatchType": 0,
      "mv": 0,
      "position": 0,
      "target": 0.432
    },
    {
      "actual": 0,
      "actualRangeMax": 1.1,
      "actualRangeMin": 1.1,
      "ccy": "USD",
      "conid": 270639,
      "dlv": 0,
      "exchangeRate": 1,
      "flags": 0,
      "instrumentImbalance": 0,
      "instrument": "INTC",
      "mismatchType": 0,
      "mv": 0,
      "position": 0,
      "target": 0.4721
    }
  ],
  "positionTs": 1769614805464,
  "reqID": 540607,
  "stkOnly": true,
  "subscriptionStatus": 1,
  "totalDlv": 0,
  "totalMv": 0
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/fa/model/positions"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/fa/model/positions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{}'
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

	url := "https://localhost:5000/v1/api/fa/model/positions"

	payload := strings.NewReader("{}")

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

url = URI("https://localhost:5000/v1/api/fa/model/positions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fa/model/positions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fa/model/positions', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/fa/model/positions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fa/model/positions")! as URL,
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