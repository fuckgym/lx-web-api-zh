# 按 InstructionSetId 获取状态

GET https://localhost:5000/gw/api/v1/instruction-sets/{instructionSetId}

检索与 instructionSetId 关联的所有请求的状态。**Scope**: `instructions.read`**Security Policy**: `HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/get-instruction-sets

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 路径参数

- `client-id` (string, required) — 该客户的 clientId
- `instructionSetId` (long, required) — 目标指令集 ID。

## 响应

### 200

返回多条指令的状态。

- `status` (long, required) — 批量请求的 HTTP 状态码。
- `instructionSetId` (double, required) — 对所提交指令进行分组的指令集的标识符。
- `instructionResults` (list of any, optional) — 批量请求中每条指令的结果。

## 错误

### 404 未找到错误

返回表示未找到请求的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短人类可读摘要。
- `status` (long, required) — HTTP 状态码 (404)。
- `instructionSetId` (long, required) — 对所提交指令进行分组的指令集的标识符。
- `detail` (string, optional) — 问题的人类可读解释。

### 500 内部服务器错误

由于内部错误无法处理请求。请稍后重试。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 示例

**响应**

```json
{
  "status": 200,
  "instructionSetId": 9094,
  "instructionResults": [
    "string",
    "string",
    "string"
  ]
}
```

**SDK 代码**

```python Response
import requests

url = "https://localhost:5000/gw/api/v1/instruction-sets/-1988905739"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Response
const url = 'https://localhost:5000/gw/api/v1/instruction-sets/-1988905739';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

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

	url := "https://localhost:5000/gw/api/v1/instruction-sets/-1988905739"

	req, _ := http.NewRequest("GET", url, nil)

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

url = URI("https://localhost:5000/gw/api/v1/instruction-sets/-1988905739")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Response
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/instruction-sets/-1988905739")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Response
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/instruction-sets/-1988905739', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Response
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/instruction-sets/-1988905739");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Response
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/instruction-sets/-1988905739")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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