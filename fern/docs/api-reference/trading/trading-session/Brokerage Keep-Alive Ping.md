# 经纪会话保活探测

POST https://localhost:5000/v1/api/tickle

如果网关连续几分钟未收到任何请求，已打开的会话将自动超时。tickle 端点会向服务器发送探测信号（ping）以防止会话结束。应大约每 60 秒调用一次该端点，以维持与经纪会话的连接。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-session/get-session-token

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 响应

### 200

一个包含合约详细信息的对象数组。

- `tickleResponse`

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

## 类型

### successfulTickleResponse

- `session` (string, optional) — 返回合约的会话令牌。
- `ssoExpires` (long, optional) — 返回当前 sso 会话距离过期的毫秒数。
- `collission` (boolean, optional) — （仅限内部使用）
- `userId` (long, optional) — （仅限内部使用）
- `hmds` (SuccessfulTickleResponseHmds, optional) — 返回历史市场数据服务器的连接详细信息。
- `iserver` (SuccessfulTickleResponseIserver, optional)

### failedTickleResponse

- `error` (string, optional) — tickle 被接受但未被处理的原因

### SuccessfulTickleResponseHmds

返回历史市场数据服务器的连接详细信息。

- `error` (string, optional) — 传递任何内部连接错误。
- `authStatus` (list of any, optional) — 返回认证详细信息。

### SuccessfulTickleResponseIserver

- `authStatus` (brokerageSessionStatus, optional)

### brokerageSessionStatus

- `authenticated` (boolean, optional) — 返回您的经纪会话是否已通过认证。
- `established` (boolean, optional) — 返回您的经纪会话是否已完全建立并准备好处理请求。当从底层经纪基础设施收到登录消息时设置为 true，表示认证已完成且账户信息已加载。
- `competing` (boolean, optional) — 返回您在另一个连接中是否存在竞争的经纪会话。
- `connected` (boolean, optional) — 返回您是否已连接到网关。
- `message` (string, optional) — 关于您的认证状态的消息（如有）。
- `MAC` (string, optional) — 设备 MAC 信息。
- `serverInfo` (BrokerageSessionStatusServerInfo, optional)
- `hardware_info` (string, optional) — 仅限客户端门户使用。
- `fail` (string, optional) — 返回获取认证状态失败的原因。

### BrokerageSessionStatusServerInfo

- `serverName` (string, optional) — IBKR 服务器信息。仅限内部使用。
- `serverVersion` (string, optional) — IBKR 版本信息。仅限内部使用。

## 示例

**响应**

```json
{
  "fail": {
    "value": {
      "error": "failed to process request"
    }
  },
  "success": {
    "value": {
      "collission": false,
      "hmds": {
        "error": "no bridge"
      },
      "iserver": {
        "authStatus": {
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
      },
      "session": "bb665d0f55b6289d70bc7380089fc96f",
      "ssoExpires": 460311,
      "userId": 123456789
    }
  }
}
```

**SDK 代码**

```python Trading Session_getSessionToken_example
import requests

url = "https://localhost:5000/v1/api/tickle"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Trading Session_getSessionToken_example
const url = 'https://localhost:5000/v1/api/tickle';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Trading Session_getSessionToken_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/tickle"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Trading Session_getSessionToken_example
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/tickle")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Trading Session_getSessionToken_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/tickle")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Trading Session_getSessionToken_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/tickle', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Trading Session_getSessionToken_example
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/tickle");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Trading Session_getSessionToken_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/tickle")! as URL,
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