# 验证通过后将请求连同 HTTPS 安全策略原样回显。

GET https://localhost:5000/gw/api/v1/echo/https

**范围**: `echo.read`**安全策略**: `HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/utilities/list-echo-https

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥进行 RS256 签名的 JWT 访问令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 响应

### 200

返回一个包含请求参数的 JSON 对象。

- `requestMethod` (enum, required)
  - Allowed values: `GET`, `POST`, `PATCH`, `PUT`
- `securityPolicy` (enum, required)
  - Allowed values: `HTTPS`, `SIGNED_JWT`, `ENCRYPTED_JWE`
- `queryParameters` (EchoResponseQueryParameters, optional)

## 错误

### 401 未授权错误

返回一个 Problem detail 实例，表示未授权的请求。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `detail` (string, optional)

### 403 禁止访问错误

返回一个 Problem detail 实例，表示被禁止的请求。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `detail` (string, optional)

### 500 内部服务器错误

返回一个 Problem detail 实例，表示内部服务器错误。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### EchoResponseQueryParameters

## 示例

**响应**

```json
{
  "requestMethod": "GET",
  "securityPolicy": "HTTPS",
  "queryParameters": {}
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/echo/https"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/echo/https';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

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
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/echo/https"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://localhost:5000/gw/api/v1/echo/https")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/echo/https")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/echo/https', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/echo/https");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/echo/https")! as URL,
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