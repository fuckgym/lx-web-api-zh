# 组合持仓

GET https://localhost:5000/v1/api/portfolio/{accountId}/combo/positions

提供账户中以组合方式取得的所有持仓，包括比率、数量和市值等数值。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-portfolio/get-combo-positions

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

- `nocache` (boolean, optional, default: false)

## 响应

### 200

返回组合持仓定义的响应

- `list of ComboPositionResponseItems`

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，当传入的请求无法被处理时返回。它有时可能包含错误请求（bad request）的子集。例如，传入的 accountId 有误，而只能在处理请求的后续阶段才被检测出来。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### ComboPositionResponseItems

- `description` (string, optional) — 该持仓中包含的比率与 conid。
- `legs` (list of ComboPositionResponseItemsLegsItems, optional) — 构成该持仓的腿（leg）列表。
- `name` (string, optional) — 组合持仓的内部标识符。
- `positions` (list of individualComboPosition, optional) — 构成该组合的持仓列表。

### ComboPositionResponseItemsLegsItems

- `conid` (string, optional) — 给定腿的合约标识符。
- `ratio` (long, optional) — 该腿相对于数量的比率。

### individualComboPosition

- `acctId` (string, optional) — 在所请求 conid 上持有持仓的账户的 IB accountId。
- `assetClass` (string, optional) — 所请求金融工具的资产类别。
- `avgCost` (double, optional) — 该账户持仓的平均成本。
- `avgPrice` (double, optional) — 该账户持仓的平均价格。
- `conExchMap` (list of any, optional)
- `conid` (long, optional) — 该金融工具的 IB 合约 ID。
- `contractDesc` (string, optional) — 该金融工具的人类可读描述。
- `currency` (string, optional) — 该金融工具的交易货币。
- `exchs` (IndividualComboPositionExchs, optional, nullable)
- `exerciseStyle` (string, optional, nullable) — 期权的行权方式。
- `expiry` (string, optional) — 金融工具的到期日（如适用）。
- `mktPrice` (double, optional) — 该金融工具的当前市场价格，以该金融工具的货币计。
- `mktValue` (double, optional) — 该账户在该金融工具上持仓的当前市值，以该金融工具的货币计。
- `multiplier` (double, optional) — 金融工具的乘数（如适用）。
- `position` (double, optional) — 以金融工具单位计的持仓数量。
- `putOrCall` (enum, optional) — 期权合约的权利类型（如适用）。
  - Allowed values: `P`, `C`, `None`
- `realizedPnl` (double, optional) — 该金融工具的已实现盈亏，以该金融工具的货币计。
- `strike` (string, optional) — 行权价（如适用）。以字符串形式返回。
- `undConid` (long, optional) — 标的金融工具的合约 ID（如适用）。
- `unrealizedPnl` (double, optional) — 该金融工具在该账户中的未实现盈亏。

### IndividualComboPositionExchs

## 示例

**响应**

```json
[
  {
    "description": "1*649180695-1*654503299",
    "legs": [
      {
        "conid": "649180695",
        "ratio": 1
      },
      {
        "conid": "654503299",
        "ratio": -1
      }
    ],
    "name": "CP.CP695fcbb4",
    "positions": [
      {
        "acctId": "DU5240685",
        "assetClass": "FUT",
        "avgCost": 348114.52,
        "avgPrice": 6962.2904,
        "conExchMap": [],
        "conid": 649180695,
        "contractDesc": "ES       MAR2026",
        "currency": "USD",
        "exchs": "None",
        "exerciseStyle": "None",
        "expiry": "None",
        "mktPrice": 6962,
        "mktValue": 348100,
        "multiplier": 1.1,
        "position": 1,
        "putOrCall": "None",
        "realizedPnl": 0,
        "strike": "0",
        "undConid": 0,
        "unrealizedPnl": -14.52
      },
      {
        "acctId": "DU5240685",
        "assetClass": "FUT",
        "avgCost": 49997.98,
        "avgPrice": 999.9596,
        "conExchMap": [],
        "conid": 654503299,
        "contractDesc": "ES       DEC2028",
        "currency": "USD",
        "exchs": "None",
        "exerciseStyle": "None",
        "expiry": "None",
        "mktPrice": 7530.1928711,
        "mktValue": -376509.64,
        "multiplier": 1.1,
        "position": -1,
        "putOrCall": "None",
        "realizedPnl": 0,
        "strike": "0",
        "undConid": 0,
        "unrealizedPnl": -326511.66
      }
    ]
  }
]
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/portfolio/accountId/combo/positions"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/portfolio/accountId/combo/positions';
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

	url := "https://localhost:5000/v1/api/portfolio/accountId/combo/positions"

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

url = URI("https://localhost:5000/v1/api/portfolio/accountId/combo/positions")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/portfolio/accountId/combo/positions")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/portfolio/accountId/combo/positions', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/portfolio/accountId/combo/positions");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/portfolio/accountId/combo/positions")! as URL,
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