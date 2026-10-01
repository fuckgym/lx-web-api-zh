# 列出所有分配组

GET https://localhost:5000/v1/api/iserver/account/allocation/group

检索顾问的所有分配组的列表。其中包括分配组的名称、组内子账户的数量以及该组使用的分配方法。此端点仅支持财务顾问和 IBroker 账户。 


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-allocation-management/get-allocation-groups

## 认证

- `Authorization` 请求头（bearer token, required）— SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱)

## 响应

### 200

返回 "data" 数组，其中包含顾问账户下的所有分配组。

- `data` (list of AllocationGroupsDataItems, optional) — 数组，包含顾问账户下的所有分配组

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

## 类型

### AllocationGroupsDataItems

- `allocation_method` (enum, optional, default: N) — Interactive Brokers 支持两种形式的分配方法：由 Interactive Brokers 完成计算的分配方法，以及由用户计算后再指定的一组分配方法。IB 计算的分配方法： * `A` - 可用权益 * `E` - 平均 * `N` - 净清算价值 用户指定的分配方法： * `C` - 现金数量 * `P` - 百分比 * `R` - 比率 * `S` - 股数
  - Allowed values: `A`, `E`, `N`, `C`, `P`, `R`, `S`
- `size` (long, optional) — 表示组内子账户的总数。
- `name` (string, optional) — 为给定分配组设置的名称。

## 示例

**响应**

```json
{
  "data": [
    {
      "allocation_method": "E",
      "size": 16,
      "name": "group_1"
    },
    {
      "allocation_method": "N",
      "size": 3,
      "name": "group_2"
    }
  ]
}
```

**SDK 代码**

```python groups
import requests

url = "https://localhost:5000/v1/api/iserver/account/allocation/group"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript groups
const url = 'https://localhost:5000/v1/api/iserver/account/allocation/group';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go groups
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/allocation/group"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby groups
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/allocation/group")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java groups
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/allocation/group")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php groups
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/allocation/group', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp groups
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/allocation/group");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift groups
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/allocation/group")! as URL,
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