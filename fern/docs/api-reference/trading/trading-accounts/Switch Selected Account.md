# 切换所选账户

POST https://localhost:5000/v1/api/iserver/account
Content-Type: application/json

切换用于请求数据的活动账户。仅适用于财务顾问和多账户结构。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-accounts/set-active-account

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 请求体 (application/json)

此端点期望接收一个对象。

- `acctId` (string, optional) — 要从中获取信息的唯一账户的标识符。

## 响应

### 200

验证切换到的账户。

- `set` (boolean, optional) — 确认账户变更已设置
- `acctId` (string, optional) — 确认切换到的账户。

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误。如果传入的值无效，则无法处理请求。例如 accountId 不正确

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态码

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "set": true,
  "acctId": "U2234567"
}
```

**SDK 代码**

```python successfully-set-account
import requests

url = "https://localhost:5000/v1/api/iserver/account"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript successfully-set-account
const url = 'https://localhost:5000/v1/api/iserver/account';
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

```go successfully-set-account
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account"

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

```ruby successfully-set-account
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java successfully-set-account
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php successfully-set-account
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp successfully-set-account
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift successfully-set-account
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account")! as URL,
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