# 账户持仓（新）

GET https://localhost:5000/v1/api/portfolio2/{accountId}/positions

返回给定账户的持仓列表。在调用此端点之前，必须先调用 /v1/api/portfolio/accounts 或 /portfolio/subaccounts。此端点提供接近实时的更新，并移除了 /portfolio/\{accountId}/positions/\{pageId} 端点中原本存在的缓存。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-portfolio/get-uncached-positions

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 路径参数

- `accountId` (string, required)

### 查询参数

- `model` (string, optional)
- `direction` (enum, optional, default: a) — 用于排序的订单时间先后顺序。 * `a` - 按升序显示。 * `d` - 按降序显示。
  - Allowed values: `a`, `d`

## 响应

### 200

包含持仓详细信息的响应

- `list of Portfolio2PositionsItems`

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，当传入请求无法被处理时返回。有时可能包含部分错误请求的情况。例如，传入的 accountId 有误，而只有在处理请求的过程中才能检测到。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### Portfolio2PositionsItems

- `assetClass` (string, optional) — 所请求金融工具的资产类别。
- `avgCost` (any, optional) — 账户该持仓的平均成本。
- `avgPrice` (double, optional) — 账户该持仓的平均价格。
- `conid` (long, optional) — 该金融工具的 IB 合约 ID。
- `currency` (string, optional) — 该金融工具的交易货币。
- `description` (string, optional) — 合约的本地代码（local symbol）
- `group` (string, optional) — 该金融工具的行业子分类。
- `isLastToLoq` (boolean, optional)
- `marketPrice` (double, optional) — 该金融工具的当前市场价格，以该金融工具的货币计。
- `marketValue` (double, optional) — 账户在该金融工具上持仓的当前市值，以该金融工具的货币计。
- `model` (string, optional) — 账户所投资的、贡献此持仓的模型投资组合的名称。
- `position` (double, optional) — 以金融工具单位计的持仓规模。
- `realizedPnl` (double, optional) — 该金融工具的已实现盈亏（PnL），以该金融工具的货币计。
- `secType` (string, optional) — 该金融工具的证券类型。
- `sector` (string, optional) — 该金融工具的行业板块分类。
- `timestamp` (long, optional) — 检索持仓数据所耗的时间（毫秒）。
- `unrealizedPnl` (double, optional) — 该账户中该金融工具的未实现盈亏（PnL）。

## 示例

**响应**

```json
[
  {
    "assetClass": "STK",
    "avgCost": null,
    "avgPrice": 262.2430710711693,
    "conid": 265598,
    "currency": "USD",
    "description": "AAPL",
    "group": "Computers",
    "isLastToLoq": false,
    "marketPrice": 256.39068603515625,
    "marketValue": 82292949.324646,
    "model": "",
    "position": 320967,
    "realizedPnl": 0,
    "secType": "STK",
    "sector": "Technology",
    "timestamp": 1767885880,
    "unrealizedPnl": -1878422.467854008
  }
]
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/portfolio2/DU123456/positions"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/portfolio2/DU123456/positions';
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

	url := "https://localhost:5000/v1/api/portfolio2/DU123456/positions"

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

url = URI("https://localhost:5000/v1/api/portfolio2/DU123456/positions")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/portfolio2/DU123456/positions")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/portfolio2/DU123456/positions', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/portfolio2/DU123456/positions");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/portfolio2/DU123456/positions")! as URL,
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