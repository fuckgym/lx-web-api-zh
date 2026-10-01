# 提供给定标的市场的所有合约。

GET https://localhost:5000/v1/api/forecast/contract/market

返回与所提供的标的 conid 相关联的所有高层级合约详情。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-event-contracts/get-forecast-markets

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 查询参数

- `underlyingConid` (string, required)
- `exchange` (string, optional)

## 响应

### 200

返回即将到来及之前交易日的流动交易时段与延长交易时段。

- `market_name` (string, optional) — 市场合约标识符。
- `exchange` (string, optional) — 请求中传入或由内部确定的交易所。
- `symbol` (string, optional) — 市场代码。
- `logo_category` (string, optional) — 用于在 logo 服务中检索图像的 logo 类别。
- `exclude_historical_data` (boolean, optional) — 指示 UI 应显示还是不显示标的图表。
- `payout` (double, optional) — 赔付缩放比率。
- `contracts` (list of ForecastMarketResponseContractsItems, optional) — 与所请求市场匹配的合约列表。

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

### ForecastMarketResponseContractsItems

- `conid` (long, optional) — 市场合约标识符。
- `side` (string, optional) — "Y" 或 "N"，表示 Yes（是）或 No（否）合约。
- `expiration` (string, optional) — 合约到期日，采用 YYYYMMDD 格式。
- `strike` (long, optional) — 合约行权价。
- `strike_label` (string, optional) — 要显示的行权价标签。
- `expiry_label` (string, optional) — 到期日标签页在 UI 中显示的标签。
- `underlying_conid` (long, optional) — 合约的直接标的（例如 FOP 的期货 conid）。
- `time_specifier` (string, optional) — 指定的到期日期。

## 示例

**响应**

```json
{
  "market_name": "United States Carbon Dioxide Emissions",
  "exchange": "FORECASTX",
  "symbol": "USCE",
  "logo_category": "g7369",
  "exclude_historical_data": false,
  "payout": 1,
  "contracts": [
    {
      "conid": 732957192,
      "side": "Y",
      "expiration": "20260430",
      "strike": 4700,
      "strike_label": "Above 4,700",
      "expiry_label": "2025",
      "underlying_conid": 732764706,
      "time_specifier": "2025.12.31"
    },
    {
      "conid": 732957197,
      "side": "N",
      "expiration": "20260430",
      "strike": 4700,
      "strike_label": "Above 4,700",
      "expiry_label": "2025",
      "underlying_conid": 732764706,
      "time_specifier": "2025.12.31"
    }
  ]
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/forecast/contract/market"

querystring = {"underlyingConid":"underlyingConid"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/forecast/contract/market?underlyingConid=underlyingConid';
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

	url := "https://localhost:5000/v1/api/forecast/contract/market?underlyingConid=underlyingConid"

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

url = URI("https://localhost:5000/v1/api/forecast/contract/market?underlyingConid=underlyingConid")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/forecast/contract/market?underlyingConid=underlyingConid")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/forecast/contract/market?underlyingConid=underlyingConid', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/forecast/contract/market?underlyingConid=underlyingConid");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/forecast/contract/market?underlyingConid=underlyingConid")! as URL,
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