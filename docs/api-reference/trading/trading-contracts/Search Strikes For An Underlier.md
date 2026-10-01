# 搜索标的的行权价

GET https://localhost:5000/v1/api/iserver/secdef/strikes

返回给定标的在所有当前可交易到期日下的期权合约有效行权价列表。必须先为该标的调用 /iserver/secdef/search 端点，否则 "puts" 和 "calls" 将返回空数组。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-contract-strikes

## 认证

- `Authorization` 请求头（bearer token, required）— SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱)

## 请求

### 查询参数

- `conid` (string, required)
- `sectype` (enum, required) — 所请求合约的证券类型。有效的资产类别为： * `FOP` - 期货期权 * `OPT` - 期权 * `WAR` - 权证
  - Allowed values: `OPT`, `FOP`, `WAR`
- `month` (string, required)
- `exchange` (string, optional, default: SMART)

## 响应

### 200

成功响应，包含合约的证券定义。

- `call` (list of double, optional) — 包含一系列以逗号分隔的值的数组，表示该金融工具潜在的看涨期权行权价。
- `put` (list of double, optional) — 包含一系列以逗号分隔的值的数组，表示该金融工具潜在的看跌期权行权价。

## 错误

### 400 错误请求错误

缺少、为空、非数值或超出范围的参数。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

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
  "call": [
    70,
    75,
    80,
    85,
    90,
    95,
    100
  ],
  "put": [
    70,
    75,
    80,
    85,
    90,
    95,
    100
  ]
}
```

**SDK 代码**

```python strikes
import requests

url = "https://localhost:5000/v1/api/iserver/secdef/strikes"

querystring = {"conid":"265598","month":"JAN24","sectype":"OPT"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript strikes
const url = 'https://localhost:5000/v1/api/iserver/secdef/strikes?conid=265598&month=JAN24&sectype=OPT';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go strikes
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/secdef/strikes?conid=265598&month=JAN24&sectype=OPT"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby strikes
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/secdef/strikes?conid=265598&month=JAN24&sectype=OPT")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java strikes
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/secdef/strikes?conid=265598&month=JAN24&sectype=OPT")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php strikes
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/secdef/strikes?conid=265598&month=JAN24&sectype=OPT', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp strikes
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/secdef/strikes?conid=265598&month=JAN24&sectype=OPT");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift strikes
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/secdef/strikes?conid=265598&month=JAN24&sectype=OPT")! as URL,
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