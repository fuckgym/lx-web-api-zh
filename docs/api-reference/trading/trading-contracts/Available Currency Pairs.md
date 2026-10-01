# 可用货币对

GET https://localhost:5000/v1/api/iserver/currency/pairs

获取与给定目标货币对应的可用货币对。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-currency-pairs

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 查询参数

- `currency` (string, required)

## 响应

### 200

返回给定货币的有效外汇货币对列表。该货币既可以作为目标货币，也可以作为基础货币。

- `map from string to list of CurrencyPairsItems`

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

## 类型

### CurrencyPairsItems

- `symbol` (string, optional) — 给定货币对的官方代码。
- `conid` (long, optional) — 给定货币对的官方合约标识符。
- `ccyPair` (string, optional) — 返回对应的对方货币代码。

## 示例

**响应**

```json
{
  "USD": [
    {
      "symbol": "USD.SGD",
      "conid": 37928772,
      "ccyPair": "SGD"
    },
    {
      "symbol": "USD.RON",
      "conid": 38231133,
      "ccyPair": "RON"
    },
    {
      "symbol": "USD.CZK",
      "conid": 34838409,
      "ccyPair": "CZK"
    }
  ]
}
```

**SDK 代码**

```python USD
import requests

url = "https://localhost:5000/v1/api/iserver/currency/pairs"

querystring = {"currency":"USD"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript USD
const url = 'https://localhost:5000/v1/api/iserver/currency/pairs?currency=USD';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go USD
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/currency/pairs?currency=USD"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby USD
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/currency/pairs?currency=USD")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java USD
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/currency/pairs?currency=USD")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php USD
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/currency/pairs?currency=USD', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp USD
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/currency/pairs?currency=USD");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift USD
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/currency/pairs?currency=USD")! as URL,
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