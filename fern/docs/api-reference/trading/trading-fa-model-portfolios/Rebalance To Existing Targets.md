# 再平衡至现有目标

POST https://localhost:5000/v1/api/fa/model/rebalance/to-existing-targets
Content-Type: application/json

将指定模型再平衡回其当前保存的目标分配。响应会返回一个订阅密钥（subscription key），用于通过标准订阅工作流轮询生成的分配预览。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/rebalance-to-existing-targets

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
- `subscriptionKey` (string, optional) — 由先前的轮询响应返回的订阅密钥。首次请求时发送空字符串；后续轮询请求中提供返回的密钥。

## 响应

### 200

再平衡至现有目标请求已成功提交。

- `reqID` (string, optional) — 从原始请求回显的请求标识符。
- `subscriptionKey` (string, optional) — 后续轮询请求中需包含的订阅密钥。
- `subscriptionStatus` (long, optional) — 轮询状态指示器。 * `0` - 结果仍在计算中；请继续轮询。 * `1` - 结果已就绪。

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
  "reqID": 398899,
  "model": "Sample-Model"
}
```

**响应**

```json
{
  "reqID": "398899",
  "subscriptionKey": "1",
  "subscriptionStatus": 0
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/fa/model/rebalance/to-existing-targets"

payload = {
    "reqID": 398899,
    "model": "Sample-Model"
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/fa/model/rebalance/to-existing-targets';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"reqID":398899,"model":"Sample-Model"}'
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

	url := "https://localhost:5000/v1/api/fa/model/rebalance/to-existing-targets"

	payload := strings.NewReader("{\n  \"reqID\": 398899,\n  \"model\": \"Sample-Model\"\n}")

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

url = URI("https://localhost:5000/v1/api/fa/model/rebalance/to-existing-targets")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"reqID\": 398899,\n  \"model\": \"Sample-Model\"\n}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fa/model/rebalance/to-existing-targets")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"reqID\": 398899,\n  \"model\": \"Sample-Model\"\n}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fa/model/rebalance/to-existing-targets', [
  'body' => '{
  "reqID": 398899,
  "model": "Sample-Model"
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

var client = new RestClient("https://localhost:5000/v1/api/fa/model/rebalance/to-existing-targets");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"reqID\": 398899,\n  \"model\": \"Sample-Model\"\n}", ParameterType.RequestBody);
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
  "model": "Sample-Model"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fa/model/rebalance/to-existing-targets")! as URL,
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