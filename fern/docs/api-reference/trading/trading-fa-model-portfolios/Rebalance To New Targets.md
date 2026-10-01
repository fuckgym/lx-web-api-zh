# 再平衡至新目标

POST https://localhost:5000/v1/api/fa/model/rebalance/to-new-targets
Content-Type: application/json

将指定模型再平衡到请求中提供的一整套全新的目标持仓与现金分配。提交的是完整替换的目标集合；响应会返回一个订阅密钥（subscription key），用于轮询生成的分配预览。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/rebalance-to-new-targets

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 请求体 (application/json)

该端点期望接收一个对象。

- `reqID` (long, required) — 用于唯一跟踪请求的请求标识符。
- `model` (string, required) — 要再平衡的模型名称。
- `positionTargets` (list of V1ApiFaModelRebalanceToNewTargetsPostRequestBodyContentApplicationJsonSchemaPositionTargetsItems, required) — 该模型目标持仓的完整替换列表。
- `cashTargets` (list of V1ApiFaModelRebalanceToNewTargetsPostRequestBodyContentApplicationJsonSchemaCashTargetsItems, required) — 该模型各货币现金目标的完整替换列表。
- `subscriptionKey` (string, optional) — 由先前轮询响应返回的订阅密钥。首次请求时发送空字符串；后续轮询请求中提供返回的密钥。

## 响应

### 200

再平衡至新目标请求已成功提交。

- `reqID` (string, optional) — 从原始请求回显的请求标识符。
- `subscriptionKey` (string, optional) — 后续轮询请求中需包含的订阅密钥。
- `subscriptionStatus` (long, optional) — 轮询状态指示器。* `0` - 结果仍在计算中；请继续轮询。* `1` - 结果已就绪。

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，当传入的请求无法被处理时返回。它有时可能包含错误请求（bad request）的子集。例如，传入的 accountId 有误，而只能在处理请求的后续阶段才被检测出来。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### V1ApiFaModelRebalanceToNewTargetsPostRequestBodyContentApplicationJsonSchemaPositionTargetsItems

- `conid` (long, optional) — 要作为目标的金融工具的合约标识符。
- `target` (double, optional) — 该金融工具的目标分配比例，以模型的比例表示（例如 `0.3` = 30%）。
- `locked` (boolean, optional) — 该目标是否已锁定，从而不应被再平衡程序调整。

### V1ApiFaModelRebalanceToNewTargetsPostRequestBodyContentApplicationJsonSchemaCashTargetsItems

- `ccy` (string, optional) — 现金目标的货币代码（ISO 4217）。
- `target` (double, optional) — 该货币的目标分配比例，以模型的比例表示。
- `locked` (boolean, optional) — 该现金目标是否已锁定，从而不应被再平衡程序调整。

## 示例

**请求**

```json
{
  "reqID": 398896,
  "model": "Sample-Model",
  "positionTargets": [
    {}
  ],
  "cashTargets": [
    {}
  ]
}
```

**响应**

```json
{
  "reqID": "398896",
  "subscriptionKey": "2",
  "subscriptionStatus": 0
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/fa/model/rebalance/to-new-targets"

payload = {
    "reqID": 398896,
    "model": "Sample-Model",
    "positionTargets": [{}],
    "cashTargets": [{}]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/fa/model/rebalance/to-new-targets';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"reqID":398896,"model":"Sample-Model","positionTargets":[{}],"cashTargets":[{}]}'
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

	url := "https://localhost:5000/v1/api/fa/model/rebalance/to-new-targets"

	payload := strings.NewReader("{\n  \"reqID\": 398896,\n  \"model\": \"Sample-Model\",\n  \"positionTargets\": [\n    {}\n  ],\n  \"cashTargets\": [\n    {}\n  ]\n}")

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

url = URI("https://localhost:5000/v1/api/fa/model/rebalance/to-new-targets")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"reqID\": 398896,\n  \"model\": \"Sample-Model\",\n  \"positionTargets\": [\n    {}\n  ],\n  \"cashTargets\": [\n    {}\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fa/model/rebalance/to-new-targets")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"reqID\": 398896,\n  \"model\": \"Sample-Model\",\n  \"positionTargets\": [\n    {}\n  ],\n  \"cashTargets\": [\n    {}\n  ]\n}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fa/model/rebalance/to-new-targets', [
  'body' => '{
  "reqID": 398896,
  "model": "Sample-Model",
  "positionTargets": [
    {}
  ],
  "cashTargets": [
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

var client = new RestClient("https://localhost:5000/v1/api/fa/model/rebalance/to-new-targets");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"reqID\": 398896,\n  \"model\": \"Sample-Model\",\n  \"positionTargets\": [\n    {}\n  ],\n  \"cashTargets\": [\n    {}\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "reqID": 398896,
  "model": "Sample-Model",
  "positionTargets": [[]],
  "cashTargets": [[]]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fa/model/rebalance/to-new-targets")! as URL,
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