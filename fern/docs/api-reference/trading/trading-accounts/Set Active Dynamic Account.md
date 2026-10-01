# 设置活动的动态账户

POST https://localhost:5000/v1/api/iserver/dynaccount
Content-Type: application/json

设置活动的动态账户。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-accounts/set-dynamic-account

## 认证

- `Authorization` 请求头（bearer token, required）— SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱)

## 请求

### 请求体 (application/json)

此端点需要一个对象。

- `acctId` (string, required) — 应为后续请求设置的账户 ID。

## 响应

### 200

一个包含合约详细信息的对象数组。

- `set` (boolean, optional) — 确认账户变更已设置
- `acctId` (string, optional) — 确认已切换到的账户。

## 错误

### 401 未授权错误

缺少、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

内部服务器错误，在传入请求无法被处理时返回。有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，而只有在处理请求的后续阶段才能检测到。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 示例

**请求**

```json
{
  "acctId": "U1234567"
}
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

url = "https://localhost:5000/v1/api/iserver/dynaccount"

payload = { "acctId": "U1234567" }
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript successfully-set-account
const url = 'https://localhost:5000/v1/api/iserver/dynaccount';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"acctId":"U1234567"}'
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

	url := "https://localhost:5000/v1/api/iserver/dynaccount"

	payload := strings.NewReader("{\n  \"acctId\": \"U1234567\"\n}")

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

url = URI("https://localhost:5000/v1/api/iserver/dynaccount")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"acctId\": \"U1234567\"\n}"

response = http.request(request)
puts response.read_body
```

```java successfully-set-account
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/dynaccount")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"acctId\": \"U1234567\"\n}")
  .asString();
```

```php successfully-set-account
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/dynaccount', [
  'body' => '{
  "acctId": "U1234567"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp successfully-set-account
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/dynaccount");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"acctId\": \"U1234567\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift successfully-set-account
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["acctId": "U1234567"] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/dynaccount")! as URL,
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