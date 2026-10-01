# 是否为完整主账户

POST https://localhost:5000/v1/api/fa/is-full-master
Content-Type: application/json

确定经过身份验证的财务顾问账户是否为完整主账户（即拥有创建和管理模型、投资子账户以及提交划转的完整权限）。
注意 - 该端点不接受 `model` 参数。已观察到在实际流量中提供该参数会返回 `400 Bad Request`。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/is-full-master

## 认证

- `Authorization` 请求头（bearer token, required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 请求

### 请求体 (application/json)

该端点预期接收一个对象。

- `reqID` (long, required) — 用于唯一跟踪请求的请求标识符。
- `subscriptionKey` (string, optional) — 订阅密钥。在初始请求时发送空字符串。

## 响应

### 200

成功获取该账户的完整主账户状态。

- `isFullMaster` (boolean, optional) — 如果经过身份验证的财务顾问为完整主账户，则为 True。
- `reqID` (long, optional) — 用于唯一跟踪请求的请求标识符。
- `subscriptionStatus` (long, optional) — 描述模型是否处于轮询模式。

## 错误

### 400 错误请求

错误请求。当请求体中包含不受支持的字段（例如 `model`）时会出现。

- `any`

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，在传入请求无法处理时返回。有时可能包含部分错误请求。例如，传入的 accountId 有误，而只能在处理请求的后期才被检测到。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，若因某个内部服务不可用导致请求耗时超过 10 秒，请求将被中止并返回此状态

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 示例

**请求**

```json
{
  "reqID": 398899
}
```

**响应**

```json
{
  "isFullMaster": true,
  "reqID": 398899,
  "subscriptionStatus": 1
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/fa/is-full-master"

payload = { "reqID": 398899 }
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/fa/is-full-master';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"reqID":398899}'
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

	url := "https://localhost:5000/v1/api/fa/is-full-master"

	payload := strings.NewReader("{\n  \"reqID\": 398899\n}")

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

url = URI("https://localhost:5000/v1/api/fa/is-full-master")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"reqID\": 398899\n}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fa/is-full-master")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"reqID\": 398899\n}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fa/is-full-master', [
  'body' => '{
  "reqID": 398899
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

var client = new RestClient("https://localhost:5000/v1/api/fa/is-full-master");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"reqID\": 398899\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["reqID": 398899] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fa/is-full-master")! as URL,
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