# 初始化经纪会话

POST https://localhost:5000/v1/api/iserver/auth/ssodh/init
Content-Type: application/json

在获取访问令牌以及随后的实时会话令牌（Live Session Token）之后，客户可以通过 ssodh/init 端点初始化其经纪会话。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-session/initialize-session

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 请求体 (application/json)

该端点期望接收一个 brokerageSessionInitRequest。

- `publish` (boolean, optional) — 在初始化经纪会话的同时发布经纪会话令牌。如果设置为 false，则应在调用 init 之前先发布会话令牌。建议设置为 true。
- `compete` (boolean, optional) — 确定是否应断开其他经纪会话以优先保障此连接。

## 响应

### 200

一个由详细描述合约信息的对象组成的数组。

- `authenticated` (boolean, optional) — 返回你的经纪会话是否已通过认证。
- `established` (boolean, optional) — 返回你的经纪会话是否已完全建立并可以处理请求。当从底层经纪基础设施收到登录消息时设置为 true，表示认证已完成且账户信息已加载。
- `competing` (boolean, optional) — 返回你是否在另一个连接上存在竞争的经纪会话。
- `connected` (boolean, optional) — 返回你是否已连接到网关。
- `message` (string, optional) — 关于你认证状态的消息（如有）。
- `MAC` (string, optional) — 设备 MAC 信息。
- `serverInfo` (BrokerageSessionStatusServerInfo, optional)
- `hardware_info` (string, optional) — 仅供 Client Portal 使用。
- `fail` (string, optional) — 返回未能获取认证状态的原因。

## 错误

### 401 未授权错误

缺少、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，在无法处理传入请求时返回。有时可能包含部分属于错误请求的情况。例如，传入的 accountId 有误，而只能在处理请求的后续阶段才检测出来。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，若因某些内部服务不可用导致请求耗时超过 10 秒，则请求会被中止并返回此状态码。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### BrokerageSessionStatusServerInfo

- `serverName` (string, optional) — IBKR 服务器信息。仅供内部使用。
- `serverVersion` (string, optional) — IBKR 版本信息。仅供内部使用。

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "success": {
    "value": {
      "MAC": "98:F2:B3:23:BF:A0",
      "authenticated": true,
      "competing": false,
      "connected": true,
      "established": true,
      "message": "",
      "serverInfo": {
        "serverName": "JifN19053",
        "serverVersion": "Build 10.25.0p, Dec 5, 2023 5:48:12 PM"
      }
    }
  }
}
```

**SDK 代码**

```python Trading Session_initializeSession_example
import requests

url = "https://localhost:5000/v1/api/iserver/auth/ssodh/init"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Trading Session_initializeSession_example
const url = 'https://localhost:5000/v1/api/iserver/auth/ssodh/init';
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

```go Trading Session_initializeSession_example
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/auth/ssodh/init"

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

```ruby Trading Session_initializeSession_example
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/auth/ssodh/init")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java Trading Session_initializeSession_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/auth/ssodh/init")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php Trading Session_initializeSession_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/auth/ssodh/init', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Trading Session_initializeSession_example
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/auth/ssodh/init");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Trading Session_initializeSession_example
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/auth/ssodh/init")! as URL,
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