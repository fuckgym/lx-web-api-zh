# 按交易所列出所有股票 conid

GET https://localhost:5000/v1/api/trsrv/all-conids

发送请求以检索在指定交易所可用的所有合约。此请求返回可在该交易所交易的所有合约，包括那些并未以该交易所作为其主要上市交易所的合约。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-conids-by-exchange

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 查询参数

- `exchange` (string, required)
- `assetClass` (any, optional, default: STK)

## 响应

### 200

成功响应，包含合约的证券定义。

- `list of V1ApiTrsrvAllConidsGetResponsesContentApplicationJsonSchemaItems`

## 错误

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

### V1ApiTrsrvAllConidsGetResponsesContentApplicationJsonSchemaItems

- `ticker` (string, optional) — 该合约的股票代码。
- `conid` (long, optional) — 所返回合约的合约标识符。
- `exchange` (string, optional) — 所返回合约的主要上市交易所。

## 示例

**响应**

```json
[
  {
    "ticker": "BMO",
    "conid": 5094,
    "exchange": "NYSE"
  },
  {
    "ticker": "BNS",
    "conid": 15156975,
    "exchange": "NYSE"
  }
]
```

**SDK 代码**

```python response
import requests

url = "https://localhost:5000/v1/api/trsrv/all-conids"

querystring = {"exchange":"AMEX"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript response
const url = 'https://localhost:5000/v1/api/trsrv/all-conids?exchange=AMEX';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go response
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/trsrv/all-conids?exchange=AMEX"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby response
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/trsrv/all-conids?exchange=AMEX")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java response
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/trsrv/all-conids?exchange=AMEX")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php response
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/trsrv/all-conids?exchange=AMEX', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp response
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/trsrv/all-conids?exchange=AMEX");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift response
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/trsrv/all-conids?exchange=AMEX")! as URL,
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