# 经纪会话状态

POST https://localhost:5000/v1/api/iserver/auth/status

当前与经纪系统的认证状态。若未通过认证，则无法进行市场数据和交易。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-session/get-brokerage-status

## 认证

- `Authorization` 请求头（bearer token, required）— SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱)

## 响应

### 200

经纪会话的详细状态

- `authenticated` (boolean, optional) — 返回您的经纪会话是否已通过认证。
- `established` (boolean, optional) — 返回您的经纪会话是否已完全建立并准备好处理请求。当从底层经纪基础设施收到登录消息时设置为 true，表示认证已完成且账户信息已加载。
- `competing` (boolean, optional) — 返回您在另一个连接中是否存在竞争的经纪会话。
- `connected` (boolean, optional) — 返回您是否已连接到网关。
- `message` (string, optional) — 关于您认证状态的消息（如有）。
- `MAC` (string, optional) — 设备 MAC 信息。
- `serverInfo` (BrokerageSessionStatusServerInfo, optional)
- `hardware_info` (string, optional) — 仅限 Client Portal 使用。
- `fail` (string, optional) — 返回获取认证状态失败的原因。

## 错误

### 401 未授权错误

缺少、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

## 类型

### BrokerageSessionStatusServerInfo

- `serverName` (string, optional) — IBKR 服务器信息。仅供内部使用。
- `serverVersion` (string, optional) — IBKR 版本信息。仅供内部使用。

## 示例

**响应**

```json
{
  "success": {
    "value": {
      "MAC": "12:B:B3:23:BF:A0",
      "authenticated": true,
      "competing": false,
      "connected": true,
      "established": true,
      "fail": "",
      "hardware_info": "21026956|06:8E:04:45:DA:8F",
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

```python Trading Session_getBrokerageStatus_example
import requests

url = "https://localhost:5000/v1/api/iserver/auth/status"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Trading Session_getBrokerageStatus_example
const url = 'https://localhost:5000/v1/api/iserver/auth/status';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Trading Session_getBrokerageStatus_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/auth/status"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Trading Session_getBrokerageStatus_example
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/auth/status")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Trading Session_getBrokerageStatus_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/auth/status")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Trading Session_getBrokerageStatus_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/auth/status', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Trading Session_getBrokerageStatus_example
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/auth/status");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Trading Session_getBrokerageStatus_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/auth/status")! as URL,
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