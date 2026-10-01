# 事件合约类别

GET https://localhost:5000/v1/api/forecast/category/tree

返回事件合约的类别名称、父级 ID 和市场。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-event-contracts/get-forecast-categories

## 认证

- `Authorization` 请求头（bearer token, required）— SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱)

## 响应

### 200

返回类别标识符和名称的列表，用于更细粒度的合约查找。

- `categories` (CategoryTreeResponseCategories, optional) — 一个包含所有类别 ID 及其相关信息的 JSON 对象。

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

### CategoryTreeResponseCategories

一个包含所有类别 ID 及其相关信息的 JSON 对象。

- `categoryId` (CategoryTreeResponseCategoriesCategoryId, optional) — 类别标识符。

### CategoryTreeResponseCategoriesCategoryId

类别标识符。

- `name` (string, optional) — 类别名称。
- `parent_id` (string, optional) — 父类别的标识符（如适用）。
- `markets` (list of any, optional) — 关联市场的列表（如适用）。

## 示例

**响应**

```json
{
  "categories": {
    "g17490": {
      "markets": [
        {
          "conid": 732764706,
          "exchange": "FORECASTX",
          "name": "United States Carbon Dioxide Emissions",
          "product_conid": 732764711,
          "symbol": "USCE"
        },
        {
          "conid": 732764712,
          "exchange": "FORECASTX",
          "name": "United States Drought",
          "product_conid": 732764717,
          "symbol": "USDR"
        }
      ],
      "name": "United States",
      "parent_id": "g7369"
    },
    "g5351": {
      "name": "Environmental"
    },
    "g7369": {
      "name": "Climate Change",
      "parent_id": "g5351"
    }
  }
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/forecast/category/tree"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/forecast/category/tree';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go success
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/forecast/category/tree"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby success
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/forecast/category/tree")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/forecast/category/tree")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/forecast/category/tree', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/forecast/category/tree");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/forecast/category/tree")! as URL,
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