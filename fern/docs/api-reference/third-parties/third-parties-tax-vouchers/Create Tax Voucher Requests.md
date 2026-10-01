# 创建税务凭证请求

POST https://localhost:5000/gw/api/v1/tax-vouchers
Content-Type: text/plain

从已签名的 JWT 载荷创建税务凭证请求。请求体必须是一个已签名的 OAuth2 JWT（text/plain），其解码后的载荷包含税务凭证请求列表。**作用域**: `tax-vouchers.write`**安全策略**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/third-parties/third-parties-tax-vouchers/create-tax-voucher-requests

## 认证

- `Authorization` 请求头（bearer token, required）— 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱)

## 请求

### 请求头

- `X-Request-ID` (string, optional) — 每个 HTTP 请求的唯一标识符，用于追踪和调试目的

### 请求体 (text/plain)

此端点需要一个字符串。

- `string`

## 响应

### 200

税务凭证请求创建成功

- `list of TaxVoucherDTO`

## 错误

### 400 错误请求错误

无效的请求体

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

OAuth2 JWT 验证失败

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

服务器内部错误

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

## 类型

### TaxVoucherDTO

- `requestId` (string, optional)
- `custAcctId` (string, optional)
- `corpactionId` (string, optional)
- `requestState` (string, optional)
- `fee` (double, optional)
- `divAmount` (double, optional)
- `withHeldAmount` (double, optional)
- `quantity` (double, optional)
- `countryCode` (string, optional)
- `year` (long, optional)
- `migratedCustAcctId` (string, optional)

## 示例

**请求**

```json
"eyJhbGciOiJSUzI1NiJ9..."
```

**响应**

```json
[
  {
    "requestId": "string",
    "custAcctId": "string",
    "corpactionId": "string",
    "requestState": "string",
    "fee": 1.1,
    "divAmount": 1.1,
    "withHeldAmount": 1.1,
    "quantity": 1.1,
    "countryCode": "string",
    "year": 1,
    "migratedCustAcctId": "string"
  }
]
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/tax-vouchers"

payload = "\"eyJhbGciOiJSUzI1NiJ9...\""
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "text/plain"
}

response = requests.post(url, data=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/tax-vouchers';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'text/plain'},
  body: '"eyJhbGciOiJSUzI1NiJ9..."'
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

	url := "https://localhost:5000/gw/api/v1/tax-vouchers"

	payload := strings.NewReader("\"eyJhbGciOiJSUzI1NiJ9...\"")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "text/plain")

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

url = URI("https://localhost:5000/gw/api/v1/tax-vouchers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'text/plain'
request.body = "\"eyJhbGciOiJSUzI1NiJ9...\""

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/tax-vouchers")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "text/plain")
  .body("\"eyJhbGciOiJSUzI1NiJ9...\"")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/tax-vouchers', [
  'body' => '"eyJhbGciOiJSUzI1NiJ9..."',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'text/plain',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/tax-vouchers");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "text/plain");
request.AddParameter("text/plain", "\"eyJhbGciOiJSUzI1NiJ9...\"", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "text/plain"
]

let postData = NSData(data: ""eyJhbGciOiJSUzI1NiJ9..."".data(using: String.Encoding.utf8)!)

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/tax-vouchers")! as URL,
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