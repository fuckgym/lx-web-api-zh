# 获取模型预设

POST https://localhost:5000/v1/api/fa/fa-preset/get
Content-Type: application/json

获取模型再平衡的预设行为。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/get-model-presets

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

## 响应

### 200

成功获取预设详细信息

- `avoidNegativeCashInIndependent` (boolean, optional) — 避免 Independent 中出现负的对冲现金。
- `closeDivestIndependentPosition` (boolean, optional) — 撤资时平掉全部持仓。
- `fullyInvestExistingLongPositions` (boolean, optional) — 使用最大可用资金增加多头持仓。
- `keepModelOpen` (boolean, optional) — 为已完全撤资的账户保持模型开启。
- `preferCrossWithIndependent` (boolean, optional) — 将持仓转移到 Independent 而不是清算。
- `preferTransferFromIndependent` (boolean, optional) — 尽可能从 Independent 结构转移持仓。
- `reqID` (long, optional) — 用于唯一跟踪请求的请求标识符。
- `roundAllocationQuantityToExchangeBoardLot` (boolean, optional) — 确定分配数量是否应按每手数量（lot size）处理。
- `subscriptionStatus` (long, optional) — 描述模型是否处于轮询模式。
- `useNonBaseCcy` (boolean, optional) — 在可用时使用非基础货币余额。
- `useToleranceRange` (boolean, optional) — 指定再平衡是否应使用容差范围。

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，当传入请求无法被处理时返回。有时可能包含部分错误请求的情况。例如，传入的 accountId 有误，而只有在处理请求的过程中才能检测到。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 示例

**请求**

```json
{
  "reqID": 540608
}
```

**响应**

```json
{
  "avoidNegativeCashInIndependent": false,
  "closeDivestIndependentPosition": true,
  "fullyInvestExistingLongPositions": false,
  "keepModelOpen": false,
  "preferCrossWithIndependent": false,
  "preferTransferFromIndependent": true,
  "reqID": 127,
  "roundAllocationQuantityToExchangeBoardLot": false,
  "subscriptionStatus": 1,
  "useNonBaseCcy": false,
  "useToleranceRange": false
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/fa/fa-preset/get"

payload = { "reqID": 540608 }
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/fa/fa-preset/get';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"reqID":540608}'
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

	url := "https://localhost:5000/v1/api/fa/fa-preset/get"

	payload := strings.NewReader("{\n  \"reqID\": 540608\n}")

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

url = URI("https://localhost:5000/v1/api/fa/fa-preset/get")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"reqID\": 540608\n}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fa/fa-preset/get")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"reqID\": 540608\n}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fa/fa-preset/get', [
  'body' => '{
  "reqID": 540608
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

var client = new RestClient("https://localhost:5000/v1/api/fa/fa-preset/get");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"reqID\": 540608\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["reqID": 540608] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fa/fa-preset/get")! as URL,
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