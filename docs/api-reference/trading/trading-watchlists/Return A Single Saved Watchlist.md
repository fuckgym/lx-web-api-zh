# 返回单个已保存的自选列表

GET https://localhost:5000/v1/api/iserver/watchlist

检索单个存储在用户名设置中的自选列表的详细信息。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-watchlists/get-specific-watchlist

## 认证

- `Authorization` 请求头（bearer token, required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 请求

### 查询参数

- `id` (string, required) — 所请求自选列表的自选列表 ID。

## 响应

### 200

成功删除指定的自选列表。

- `id` (string, optional) — 自选列表的标识符。
- `hash` (string, optional) — 内部使用。自选列表的唯一哈希值。
- `name` (string, optional) — 自选列表人类可读的显示名称。
- `readOnly` (boolean, optional) — 指示该自选列表是否可编辑。
- `instruments` (list of singleWatchlistEntry, optional) — 自选列表中包含的金融工具数组。

## 错误

### 400 错误请求

参数缺失、为空、非数字或超出范围。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

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

## 类型

### singleWatchlistEntry

包含单个金融工具的自选列表条目的对象。

- `ST` (enum, optional) — 该金融工具全大写的简写证券类型标识符。
  - Allowed values: `STK`, `OPT`, `FUT`, `BOND`, `FUND`, `WAR`, `CASH`, `CRYPTO`
- `C` (string, optional) — 以字符串表示的金融工具 conid。
- `conid` (long, optional) — 该金融工具的 IB 合约 ID。
- `name` (string, optional) — 该金融工具的完整显示名称。
- `fullName` (string, optional) — 该金融工具代码的完整显示形式。
- `assetClass` (enum, optional) — 该金融工具全大写的简写证券类型标识符。
  - Allowed values: `STK`, `OPT`, `FUT`, `BOND`, `FUND`, `WAR`, `CASH`, `CRYPTO`
- `ticker` (string, optional) — 该金融工具的代码。
- `chineseName` (string, optional) — 该金融工具名称的中文呈现。

## 示例

**响应**

```json
{
  "id": "1234",
  "hash": "1234987651621",
  "name": "Test Watchlist",
  "readOnly": false,
  "instruments": [
    {
      "ST": "STK",
      "C": "8314",
      "conid": 8314,
      "name": "INTL BUSINESS MACHINES CORP",
      "fullName": "IBM",
      "assetClass": "STK",
      "ticker": "IBM",
      "chineseName": ""
    }
  ]
}
```

**SDK 代码**

```python singleWatchlistExample
import requests

url = "https://localhost:5000/v1/api/iserver/watchlist"

querystring = {"id":"1234"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript singleWatchlistExample
const url = 'https://localhost:5000/v1/api/iserver/watchlist?id=1234';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go singleWatchlistExample
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/watchlist?id=1234"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby singleWatchlistExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/watchlist?id=1234")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java singleWatchlistExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/watchlist?id=1234")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php singleWatchlistExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/watchlist?id=1234', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp singleWatchlistExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/watchlist?id=1234");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift singleWatchlistExample
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/watchlist?id=1234")! as URL,
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