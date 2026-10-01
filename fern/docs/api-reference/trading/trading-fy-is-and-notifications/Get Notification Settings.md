# 获取通知设置

GET https://localhost:5000/v1/api/fyi/settings

返回当前的通知订阅选项。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fy-is-and-notifications/get-fyi-settings

## 认证

- `Authorization` 请求头（bearer token，required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 响应

### 200

表示数据已成功返回。

- `list of FyiSettingsItems`

## 错误

### 401 未授权错误

授权令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

服务器内部错误，在无法处理传入请求时返回。有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，且只能在处理请求的后续阶段才能检测出来。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 类型

### FyiSettingsItems

- `A` (long, optional) — 仅当订阅可以手动禁用/启用时返回。如何启用/禁用请参见 /fyi/settings/\{typecode}。
- `FC` (string, optional) — 用于启用或禁用该通知的 FYI 代码。
- `H` (long, optional) — 通知是否已读的免责声明。
- `FD` (string, optional) — 返回主题的详细描述。
- `FN` (string, optional) — 返回通知的人类可读标题。

## 示例

**响应**

```json
[
  {
    "A": 1,
    "FC": "PF",
    "H": 0,
    "FD": "Notify me of recent activity affecting my portfolio holdings.",
    "FN": "Portfolio FYIs"
  },
  {
    "A": 1,
    "FC": "PT",
    "H": 0,
    "FD": "Notify me of potential account configuration changes needed and useful features based on my position transfers.",
    "FN": "Position Transfer"
  }
]
```

**SDK 代码**

```python settings
import requests

url = "https://localhost:5000/v1/api/fyi/settings"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript settings
const url = 'https://localhost:5000/v1/api/fyi/settings';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go settings
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/fyi/settings"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby settings
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/fyi/settings")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java settings
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/fyi/settings")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php settings
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/fyi/settings', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp settings
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/fyi/settings");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift settings
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fyi/settings")! as URL,
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