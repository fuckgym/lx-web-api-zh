# 搜索债券筛选器信息

GET https://localhost:5000/v1/api/iserver/secdef/bond-filters

请求与给定债券发行方 issuerID 相关的筛选器列表。issuerId 可通过 /iserver/secdef/search 获取，并可在 /iserver/secdef/info?issuerId=\{issuerId} 中用于检索 conId。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-bond-filters

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 查询参数

- `symbol` (string, required)
- `issuerId` (string, required)

## 响应

### 200

成功的请求返回目标货币值除以源货币所得的汇率。

- `bondFilters` (list of BondFiltersResponseBondFiltersItems, optional) — 包含与给定 issuerId 相关的所有筛选器

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

### BondFiltersResponseBondFiltersItems

- `displayText` (enum, optional) — 用于记录返回选项/值的标识符。可以将其视为一个键。
  - Allowed values: `Maturity Date`, `Issue Date`, `Coupon`, `Currency`
- `columnId` (long, optional) — 用于用户界面。仅限内部使用。
- `options` (list of BondFiltersResponseBondFiltersItemsOptionsItems, optional) — 包含其值与父级 displayText 键对应的所有对象。

### BondFiltersResponseBondFiltersItemsOptionsItems

- `value` (string, required) — 返回与 displayText 键直接对应的值。其中可能包括交易所、到期日、发行日、票息或货币。
- `text` (string, optional) — 在某些情况下，会返回一个文本值，表示标准化的值格式（如纯文本日期），而不仅仅是数值。

## 示例

**响应**

```json
{
  "bondFilters": [
    {
      "displayText": "Maturity Date",
      "columnId": 27,
      "options": [
        {
          "value": "202501",
          "text": "Jan 2025"
        },
        {
          "value": "202812",
          "text": "Dec 2028"
        }
      ]
    },
    {
      "displayText": "Issue Date",
      "columnId": 28,
      "options": [
        {
          "value": "20140918",
          "text": "Sep 18 2014"
        },
        {
          "value": "20150409",
          "text": "Apr 09 2015"
        }
      ]
    },
    {
      "displayText": "Coupon",
      "columnId": 25,
      "options": [
        {
          "value": "1.301"
        },
        {
          "value": "1.34"
        }
      ]
    },
    {
      "displayText": "Currency",
      "columnId": 5,
      "options": [
        {
          "value": "EUR"
        },
        {
          "value": "USD"
        }
      ]
    }
  ]
}
```

**SDK 代码**

```python bond-filter
import requests

url = "https://localhost:5000/v1/api/iserver/secdef/bond-filters"

querystring = {"issuerId":"e1400715","symbol":"BOND"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript bond-filter
const url = 'https://localhost:5000/v1/api/iserver/secdef/bond-filters?issuerId=e1400715&symbol=BOND';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go bond-filter
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/secdef/bond-filters?issuerId=e1400715&symbol=BOND"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby bond-filter
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/secdef/bond-filters?issuerId=e1400715&symbol=BOND")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java bond-filter
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/secdef/bond-filters?issuerId=e1400715&symbol=BOND")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php bond-filter
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/secdef/bond-filters?issuerId=e1400715&symbol=BOND', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp bond-filter
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/secdef/bond-filters?issuerId=e1400715&symbol=BOND");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift bond-filter
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/secdef/bond-filters?issuerId=e1400715&symbol=BOND")! as URL,
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