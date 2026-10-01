# 获取分配预设

GET https://localhost:5000/v1/api/iserver/account/allocation/presets

获取分配组针对特定事件的预设行为。此端点仅支持财务顾问和 IBroker 账户。 


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-allocation-management/get-allocation-presets

## 认证

- `Authorization` 请求头（bearer token, required）— SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱)

## 响应

### 200

成功获取预设详情

- `group_auto_close_positions` (boolean, optional) — 确定分配组是否应优先平仓持仓而非平均分配。
- `default_method_for_all` (enum, optional) — Interactive Brokers 支持两种形式的分配方法：由 Interactive Brokers 完成计算的分配方法，以及由用户计算后再指定的一组分配方法。IB 计算的分配方法： * `A` - 可用权益 * `E` - 平均 * `N` - 净清算价值 用户指定的分配方法： * `C` - 现金数量 * `P` - 百分比 * `R` - 比率 * `S` - 股数
  - Allowed values: `AvailableEquity`, `E`, `N`, `C`, `P`, `R`, `S`
- `profiles_auto_close_positions` (boolean, optional) — 确定分配配置是否应优先平仓持仓而非平均分配。
- `strict_credit_check` (boolean, optional) — 确定系统是每次在开始下单流程前都始终检查用户信用，还是仅在下单和执行时检查。
- `group_proportional_allocation` (boolean, optional) — 确定系统在缩放时是否应保持分配组成比例。

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

**响应**

```json
{
  "group_auto_close_positions": false,
  "default_method_for_all": "AvailableEquity",
  "profiles_auto_close_positions": false,
  "strict_credit_check": false,
  "group_proportional_allocation": false
}
```

**SDK 代码**

```python presents
import requests

url = "https://localhost:5000/v1/api/iserver/account/allocation/presets"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript presents
const url = 'https://localhost:5000/v1/api/iserver/account/allocation/presets';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go presents
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/allocation/presets"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby presents
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/allocation/presets")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java presents
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/allocation/presets")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php presents
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/allocation/presets', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp presents
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/allocation/presets");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift presents
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/allocation/presets")! as URL,
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