# 货币汇率

GET https://localhost:5000/v1/api/iserver/exchangerate

获取货币对的汇率。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-exchange-rates

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 查询参数

- `target` (string, required)
- `source` (string, required)

## 响应

### 200

成功的请求返回目标货币值除以源货币所得的货币汇率。

- `rate` (double, optional) — 返回该货币对的汇率。

## 错误

### 400 错误请求错误

参数缺失、为空、非数值或超出范围。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，在传入请求无法被处理时返回。有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，而只有在处理请求的后续阶段才能检测到。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态码

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 示例

**响应**

```json
{
  "rate": 0.91324199
}
```

**SDK 代码**

```python rate
import requests

url = "https://localhost:5000/v1/api/iserver/exchangerate"

querystring = {"source":"USD","target":"EUR"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript rate
const url = 'https://localhost:5000/v1/api/iserver/exchangerate?source=USD&target=EUR';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go rate
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/exchangerate?source=USD&target=EUR"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby rate
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/exchangerate?source=USD&target=EUR")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java rate
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/exchangerate?source=USD&target=EUR")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php rate
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/exchangerate?source=USD&target=EUR', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp rate
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/exchangerate?source=USD&target=EUR");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift rate
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/exchangerate?source=USD&target=EUR")! as URL,
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