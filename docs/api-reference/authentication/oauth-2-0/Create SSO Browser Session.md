# 创建 SSO 浏览器会话。

POST https://localhost:5000/gw/api/v1/sso-browser-sessions
Content-Type: application/json

**Scope**: `sso-browser-sessions.write`**Security Policy**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/authentication/oauth-2-0/create-sso-browser-sessions

## 认证

- `Authorization` 请求头 (bearer token, required) — RS256 签名 JWT 访问令牌，使用您注册的私钥签名。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 请求头

- `authorization` (string, required) — 指定 authorization 请求头的值（例如 Bearer eyJ0eXAiOiJKV1...）。

### 请求体 (application/json)

该端点期望接收一个 CreateBrowserSessionRequest。

- `credential` (string, required)
- `ip` (string, required)

## 响应

### 200

创建单一登录（SSO）以访问由 IBKR 托管的门户（白标，White Branded）。

- `active` (boolean, optional)
- `url` (string, optional)

## 错误

### 400 错误请求错误

返回一个表示错误请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 401 未授权错误

返回一个表示未授权请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `detail` (string, optional)

### 403 禁止访问错误

返回一个表示禁止访问请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `detail` (string, optional)

### 500 内部服务器错误

返回一个表示内部服务器错误的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

## 示例

**请求**

```json
{
  "credential": "ddowney2",
  "ip": "10.10.10.10"
}
```

**响应**

```json
{
  "active": true,
  "url": "https://www.interactivebrokers.com/sso/..."
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/sso-browser-sessions"

payload = {
    "credential": "ddowney2",
    "ip": "10.10.10.10"
}
headers = {
    "authorization": "Bearer eyJ0eXAiOiJKV1...",
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/sso-browser-sessions';
const options = {
  method: 'POST',
  headers: {
    authorization: 'Bearer eyJ0eXAiOiJKV1...',
    Authorization: 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: '{"credential":"ddowney2","ip":"10.10.10.10"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/sso-browser-sessions"

	payload := strings.NewReader("{\n  \"credential\": \"ddowney2\",\n  \"ip\": \"10.10.10.10\"\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("authorization", "Bearer eyJ0eXAiOiJKV1...")
	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/sso-browser-sessions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["authorization"] = 'Bearer eyJ0eXAiOiJKV1...'
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"credential\": \"ddowney2\",\n  \"ip\": \"10.10.10.10\"\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/sso-browser-sessions")
  .header("authorization", "Bearer eyJ0eXAiOiJKV1...")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"credential\": \"ddowney2\",\n  \"ip\": \"10.10.10.10\"\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/sso-browser-sessions', [
  'body' => '{
  "credential": "ddowney2",
  "ip": "10.10.10.10"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
    'authorization' => 'Bearer eyJ0eXAiOiJKV1...',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/sso-browser-sessions");
var request = new RestRequest(Method.POST);
request.AddHeader("authorization", "Bearer eyJ0eXAiOiJKV1...");
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"credential\": \"ddowney2\",\n  \"ip\": \"10.10.10.10\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "authorization": "Bearer eyJ0eXAiOiJKV1...",
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "credential": "ddowney2",
  "ip": "10.10.10.10"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/sso-browser-sessions")! as URL,
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