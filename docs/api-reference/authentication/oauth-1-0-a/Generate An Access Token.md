# 生成访问令牌

POST https://localhost:5000/v1/api/oauth/access_token

为已向消费者（consumer）授予授权的 IB 用户名请求访问令牌。

参考：https://ibkrcampus.com/docs/web-api/api-reference/authentication/oauth-1-0-a/req-access-token

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 请求头

- `Authorization` (string, optional) — 用于请求 /access_token 端点的 OAuth 1.0a 授权请求头。

## 响应

### 200

成功响应，返回永久有效的 OAuth 访问令牌

- `is_true` (boolean, optional) — 指示进行授权的用户名是否为模拟账户。
- `oauth_token` (string, optional) — 就进行授权的用户名而言，分配给该消费者的永久 OAuth 访问令牌。20 个字符的十六进制值。
- `oauth_token_secret` (string, optional) — OAuth 令牌密钥值。Base64 编码的字符串。

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 503 服务不可用错误

服务不可用。例如，由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态码

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 示例

**响应**

```json
{
  "oauth_token": "a1b2c3d4e5f6a7b8c9d0",
  "oauth_token_secret": "coPZc+YOyFy7IdMg6is+etf9HASi3Um3SIhZvILcaifG6zhzZygYafYZx4XTFsrefRV/qrsy4sMAMwyPVp07VgkfQJPJkxYA7Sjhwz/Q76vuVN2YZNsRirNyL63Q3t+EHkjKA5HJEFY2PiIgqO4EWZ4etZUl3iZjCStiahhD+BNv7zgrlxS0bB4lL4vKw9AGcUiUnIQrqzTGJPj0/P2Zc3fMqCbXVWRcoYRcwUkk9ZYtMaIwPPVgvJ0c76rle5O5m4R4ZoFgrjfXpNiXC1F8MRS0fc7T6pgyyMvV+vI2C9XZbl7cNIEuCvtz3XYLNlUi+svyeZJh4RzjB824qH/fJQ==",
  "is_paper": true
}
```

**SDK 代码**

```python Success
import requests

url = "https://localhost:5000/v1/api/oauth/access_token"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Success
const url = 'https://localhost:5000/v1/api/oauth/access_token';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Success
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/oauth/access_token"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Success
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/oauth/access_token")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/oauth/access_token")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/oauth/access_token', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/oauth/access_token");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/oauth/access_token")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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