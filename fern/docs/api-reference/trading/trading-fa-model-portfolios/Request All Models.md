# 请求所有模型

POST https://localhost:5000/v1/api/fa/model/list
Content-Type: application/json

检索顾问账户下所有模型的摘要。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/get-allmodels

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

成功获取模型列表

- `baseCcy` (string, optional) — 已建立模型的基础货币。
- `masterAccount` (string, optional) — 负责该模型的顾问账户。
- `models` (list of ModelListResponseModelsItems, optional) — masterAccount 下持有的所有模型的列表。
- `reqID` (long, optional) — 用于唯一跟踪请求的请求标识符。
- `subscriptionStatus` (long, optional) — 描述模型是否处于轮询模式。

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

## 类型

### ModelListResponseModelsItems

- `bootstrapped` (boolean, optional) — 供客户端门户在内部用作标识。应忽略。
- `customIndex` (boolean, optional) — 供客户端门户在内部使用。应忽略。
- `desc` (string, optional) — 模型的个人描述，用于在 IBKR GUI 元素中显示。
- `isStatic` (boolean, optional) — 确定投资和再平衡应以静态还是动态方式处理。 * `true` - 静态模型将始终使用原始目标。 * `false` - 动态模型会根据市场变动调整分配。
- `mismatch` (boolean, optional) — 标注实际分配是否已与目标不一致。
- `model` (string, optional) — 模型名称。
- `nlv` (double, optional) — 模型的市值。
- `numAccounts` (long, optional) — 列出该模型内持有的账户数量。

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
  "baseCcy": "USD",
  "masterAccount": "DF123456",
  "models": [
    {
      "bootstrapped": true,
      "customIndex": false,
      "desc": "Model formed around TSEJ contracts",
      "isStatic": false,
      "mismatch": false,
      "model": "JPModel",
      "nlv": 30567.89,
      "numAccounts": 2
    },
    {
      "bootstrapped": true,
      "customIndex": false,
      "desc": "USModel",
      "isStatic": false,
      "mismatch": false,
      "model": "USModel",
      "nlv": 79.63,
      "numAccounts": 2
    }
  ],
  "reqID": 540608,
  "subscriptionStatus": 1
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/fa/model/list"

payload = { "reqID": 540608 }
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/fa/model/list';
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

	url := "https://localhost:5000/v1/api/fa/model/list"

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

url = URI("https://localhost:5000/v1/api/fa/model/list")

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

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fa/model/list")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"reqID\": 540608\n}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fa/model/list', [
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

var client = new RestClient("https://localhost:5000/v1/api/fa/model/list");
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

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fa/model/list")! as URL,
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