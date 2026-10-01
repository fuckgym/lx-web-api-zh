# 按代码搜索期货

GET https://localhost:5000/v1/api/trsrv/futures

返回给定代码（symbol）对应的未到期期货合约列表

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-future-by-symbol

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway，默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱环境)

## 请求

### 查询参数

- `symbols` (string, required)
- `exchange` (string, optional)

## 响应

### 200

成功的响应，包含合约的证券定义。

- `symbol` (list of FeaturesSymbolItems, optional) — 显示为您的代码（symbol）的字符串，其中针对每个与请求相匹配的 symbol 包含一系列对象。

## 错误

### 401 未授权错误

缺少、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，当传入的请求无法被处理时返回。它有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，而只能在处理请求的后期才被检测出来。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，由于某个内部服务不可用导致请求耗时超过 10 秒，请求将被中止并返回此状态

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### FeaturesSymbolItems

- `symbol` (string, optional) — 所请求的 symbol 值。
- `conid` (long, optional) — 特定 symbol 的合约标识符
- `underlyingConid` (long, optional) — 该期货标的合约的合约标识符。
- `expirationDate` (long, optional) — 特定期货合约的到期日。
- `ltd` (long, optional) — 期货合约的最后交易日。
- `shortFuturesCutOff` (long, optional) — 表示做空期货合约展期（rollover）的最后一天。
- `longFuturesCutOff` (long, optional) — 表示做多期货合约展期（rollover）的最后一天。

## 示例

**响应**

```json
{
  "ES": [
    {
      "conid": 495512557,
      "expirationDate": 20241220,
      "longFuturesCutOff": 20241219,
      "ltd": 20241219,
      "shortFuturesCutOff": 20241219,
      "symbol": "ES",
      "underlyingConid": 11004968
    },
    {
      "conid": 495512563,
      "expirationDate": 20251219,
      "longFuturesCutOff": 20251218,
      "ltd": 20251218,
      "shortFuturesCutOff": 20251218,
      "symbol": "ES",
      "underlyingConid": 11004968
    }
  ]
}
```

**SDK 代码**

```python futures
import requests

url = "https://localhost:5000/v1/api/trsrv/futures"

querystring = {"symbols":"ES,MES"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript futures
const url = 'https://localhost:5000/v1/api/trsrv/futures?symbols=ES%2CMES';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go futures
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/trsrv/futures?symbols=ES%2CMES"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby futures
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/trsrv/futures?symbols=ES%2CMES")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java futures
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/trsrv/futures?symbols=ES%2CMES")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php futures
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/trsrv/futures?symbols=ES%2CMES', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp futures
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/trsrv/futures?symbols=ES%2CMES");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift futures
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/trsrv/futures?symbols=ES%2CMES")! as URL,
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