# 事件合约规则

GET https://localhost:5000/v1/api/forecast/contract/rules

提供特定事件合约的交易规则。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-event-contracts/get-forecast-rules

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 查询参数

- `conid` (string, required)

## 响应

### 200

返回对应的合约规则。

- `asset_class` (string, optional) — 产品资产类别。
- `description` (string, optional) — 产品的完整描述。
- `market_name` (string, optional) — 合约所属市场的名称。
- `measured_period` (string, optional) — 合约的测量期间。
- `threshold` (string, optional) — 行权价或行权价标签，取决于合约类型。
- `source_agency` (string, optional) — 合约数据来源机构的名称。
- `data_and_resolution_link` (string, optional) — 指向来源机构数据的链接。
- `last_trade_time` (long, optional) — 最后交易时间，以 epoch 秒表示。
- `product_code` (string, optional) — 产品代码（symbol）。
- `market_rules_link` (string, optional) — 指向市场规则文档的链接。
- `release_time` (long, optional) — 发布时间，以 epoch 秒表示。
- `payout_time` (long, optional) — 派付时间，以 epoch 秒表示。
- `payout` (string, optional) — 格式化后的派付金额。
- `price_increment` (string, optional) — 格式化后的价格最小变动单位。
- `exchange_timezone` (string, optional) — 交易所时区。

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

## 示例

**响应**

```json
{
  "asset_class": "OPT",
  "description": "Carbon Dioxide is an important greenhouse gas and thought to be one of the major contributors to anthropogenic climate change, a major societal challenge. US Carbon Dioxide emissions estimate the amount of Carbon Dioxide emitted in the United States in a calendar year.",
  "market_name": "United States Carbon Dioxide Emissions",
  "measured_period": "Dec31'35",
  "threshold": "5050.0",
  "source_agency": "Energy Information Agency",
  "data_and_resolution_link": "https://www.eia.gov/environment/emissions/carbon/",
  "last_trade_time": 2093202000,
  "product_code": "USCE",
  "market_rules_link": "https://data.forecastex.com/regulatory/USCETermsandConditions.pdf",
  "release_time": 2093202000,
  "payout_time": 2093277600,
  "payout": "$1.00",
  "price_increment": "$0.01",
  "exchange_timezone": "US/Central"
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/forecast/contract/rules"

querystring = {"conid":"conid"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/forecast/contract/rules?conid=conid';
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

	url := "https://localhost:5000/v1/api/forecast/contract/rules?conid=conid"

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

url = URI("https://localhost:5000/v1/api/forecast/contract/rules?conid=conid")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/forecast/contract/rules?conid=conid")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/forecast/contract/rules?conid=conid', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/forecast/contract/rules?conid=conid");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/forecast/contract/rules?conid=conid")! as URL,
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