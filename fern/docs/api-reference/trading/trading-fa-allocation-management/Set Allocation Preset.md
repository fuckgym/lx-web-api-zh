# 设置分配预设

POST https://localhost:5000/v1/api/iserver/account/allocation/presets
Content-Type: application/json

为特定事件设置新分配组的预设行为。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-allocation-management/set-allocation-preset

## 认证

- `Authorization` 请求头（bearer token, required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 请求

### 请求体 (application/json)

该端点预期接收 presets。

- `group_auto_close_positions` (boolean, optional) — 确定分配组是否应优先平仓持仓而非均等分配。
- `default_method_for_all` (enum, optional) — Interactive Brokers 支持两种形式的分配方法：由 Interactive Brokers 完成计算的分配方法，以及由用户自行计算后再指定的一组分配方法。IB 计算的分配方法：* `A` - 可用权益 * `E` - 均等 * `N` - 净清算价值 用户指定的分配方法：* `C` - 现金数量 * `P` - 百分比 * `R` - 比率 * `S` - 股数
  - Allowed values: `AvailableEquity`, `E`, `N`, `C`, `P`, `R`, `S`
- `profiles_auto_close_positions` (boolean, optional) — 确定各分配 profile 是否应优先平仓持仓而非均等分配。
- `strict_credit_check` (boolean, optional) — 确定系统是应在每次开始订单流程之前始终检查用户信用，还是仅在订单下单和执行时检查。
- `group_proportional_allocation` (boolean, optional) — 确定系统是否应在缩放时保持分配组成比例。

## 响应

### 200

成功获取预设详情

- `success` (boolean, optional) — 表示请求已成功提交。

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，在传入请求无法处理时返回。有时可能包含部分错误请求。例如，传入的 accountId 有误，而只能在处理请求的后期才被检测到。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，若因某个内部服务不可用导致请求耗时超过 10 秒，请求将被中止并返回此状态

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "success": true
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/v1/api/iserver/account/allocation/presets"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/v1/api/iserver/account/allocation/presets';
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

```go
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/allocation/presets"

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

```ruby
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/allocation/presets")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/allocation/presets")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/allocation/presets', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/allocation/presets");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/allocation/presets")! as URL,
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