# 生成实时会话令牌

POST https://localhost:5000/v1/api/oauth/live_session_token

生成实时会话令牌（Live Session Token）共享密钥，并获得 Web API 的访问权限。

参考：https://ibkrcampus.com/docs/web-api/api-reference/authentication/oauth-1-0-a/req-live-session-token

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 请求头

- `Authorization` (string, optional) — 用于请求 /live_session_token 端点的 OAuth 1.0a 授权请求头。

## 响应

### 200

成功响应，包含 Diffie-Hellman 质询值和签名值

- `diffie_hellman_challenge` (string, optional) — 用于客户端在本地计算实时会话令牌的 Diffie-Hellman 质询值。
- `live_session_token_signature` (string, optional) — 用于验证客户端是否成功计算出实时会话令牌的签名值。
- `live_session_token_expiration` (long, optional) — IB 计算实时会话令牌时间的 Unix 时间戳（毫秒）。实时会话令牌自该时间起 24 小时内有效。

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
  "live_session_token_signature": "712549e22ba937ab10bc8d571bd3a9c20c43d7cb",
  "live_session_token_expiration": 1714669716258,
  "diffie_hellman_response": "74d222b7c3c0916eb3c7e60ecec937cd4f531aab5ea5698ebd754feeb39a9d7fe04c2887b5e11d8a8e4176c2eee7ddd42016e57c7a98cfbb9a3282c5247f7d4a9b8f544a34fac4d6334065b55d6a2e73e390175cfb94e80281443e555030c576d1db409bf96870dab20581bc01cdf28489778f20c714e7ad39af60c476cf2207a119df3af82bbefcdad7749fa5b4ae6e93169ec14f66ff3220cf3156487ca33932284b0a09af14f05a75269ab243362ff4eabb2e2a57db0d7911ca549f24affa1f92f04908fd9a2349cefb0f9326aca65fc144847ab837fcbd1635b1aa84b4509198e349fad87c2caf6744cb94be2c5c1c7ef9f08c44e85ded45ebeefa248dc8"
}
```

**SDK 代码**

```python Success
import requests

url = "https://localhost:5000/v1/api/oauth/live_session_token"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Success
const url = 'https://localhost:5000/v1/api/oauth/live_session_token';
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

	url := "https://localhost:5000/v1/api/oauth/live_session_token"

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

url = URI("https://localhost:5000/v1/api/oauth/live_session_token")

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

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/oauth/live_session_token")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/oauth/live_session_token', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/oauth/live_session_token");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/oauth/live_session_token")! as URL,
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