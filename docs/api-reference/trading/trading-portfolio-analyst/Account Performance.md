# 账户绩效

POST https://localhost:5000/v1/api/pa/performance
Content-Type: application/json

返回给定账户的绩效（MTM）；如果传入多个账户，结果将被合并。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-portfolio-analyst/get-single-performance-period

## 认证

- `Authorization` 请求头（bearer token，required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 请求体 (application/json)

该端点期望接收一个对象。

- `acctIds` (list of any, optional) — 包含要检索绩效详情的每个账户标识符的字符串数组。
- `period` (enum, optional, default: 12M) — 指定要分析账户的期间。可用的期间长度：* `1D` - 最近 24 小时。* `7D` - 最近 7 个完整日历日。* `MTD` - 自本月 1 日起的绩效。* `1M` - 距最后一个完整交易日的 1 个完整日历月。* `3M` - 距最后一个完整交易日的 3 个完整日历月。* `6M` - 距最后一个完整交易日的 6 个完整日历月。* `12M` - 距最后一个完整交易日的 12 个完整日历月。* `YTD` - 自 1 月 1 日起的绩效。
  - Allowed values: `1D`, `7D`, `MTD`, `1M`, `3M`, `6M`, `12M`, `YTD`

## 响应

### 200

一个包含合约详细信息的对象数组。

- `currencyType` (string, optional) — 确认币种类型。如果完全以您的基础货币进行交易，将返回 "base"。
- `rc` (long, optional) — 返回数据标识符（仅限内部使用）。
- `nav` (PerformanceResponseNav, optional) — 账户或合并账户的净资产值数据。NAV 数据不适用于基准。
- `nd` (long, optional) — 返回数据点总数。
- `cps` (PerformanceResponseCps, optional) — 返回包含累计绩效数据的对象。
- `tpps` (PerformanceResponseTpps, optional) — 返回时间段绩效数据。
- `id` (string, optional) — 返回请求标识符 getPerformanceData。
- `included` (list of any, optional) — 返回一个包含所审查账户的数组。
- `pm` (string, optional) — 投资组合指标（Portfolio Measure）。用于指示返回的是 TWR 还是 MWR 值。

## 错误

### 400 错误请求

参数缺失、为空、非数值或超出范围。`error` 字段始终带有 `Bad Request:` 前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

授权令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

服务器内部错误，在无法处理传入请求时返回。有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，且只能在处理请求的后续阶段才能检测出来。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 类型

### PerformanceResponseNav

账户或合并账户的净资产值数据。NAV 数据不适用于基准。

- `data` (list of PerformanceResponseNavDataItems, optional) — 包含关联的 'nav' 数据。
- `freq` (string, optional) — 显示与给定频率对应的值。
- `dates` (list of any, optional) — 返回与您的频率对应的、格式化为字符串的日期数组，其长度应与 data 中 returns 的长度相同。

### PerformanceResponseCps

返回包含累计绩效数据的对象。

- `data` (list of PerformanceResponseCpsDataItems, optional) — 返回可用的 cps 数据数组。
- `freq` (string, optional) — 返回数据范围所确定的频率。
- `dates` (list of any, optional) — 返回与数据频率对应的日期。

### PerformanceResponseTpps

返回时间段绩效数据。

- `data` (list of PerformanceResponseTppsDataItems, optional) — 包含 tpps 所有数据的对象。
- `freq` (string, optional) — 返回数据范围所确定的频率。
- `dates` (list of any, optional) — 返回与数据频率对应的日期。

### PerformanceResponseNavDataItems

- `idType` (string, optional) — 返回标识符的确定方式。
- `navs` (list of any, optional) — 返回与 "start" 和 "end" 日期之间的净资产值对应的顺序数据点。
- `start` (string, optional) — 返回数据的第一个可用日期。
- `end` (string, optional) — 返回可用频率的结束日期。
- `id` (string, optional) — 返回账户标识符。
- `startNAV` (PerformanceResponseNavDataItemsStartNav, optional) — 返回可用的初始 NAV。
- `baseCurrency` (string, optional) — 返回账户中使用的基础货币。

### PerformanceResponseCpsDataItems

- `idType` (string, optional) — 返回请求的键值。
- `start` (string, optional) — 返回数值范围的起始值。
- `end` (string, optional) — 返回数值范围的结束值。
- `returns` (list of any, optional) — 按顺序返回开始与结束时间之间的所有 cps 值。
- `id` (string, optional) — 返回账户标识符。
- `baseCurrency` (string, optional) — 返回账户的基础货币。

### PerformanceResponseTppsDataItems

- `idType` (string, optional) — 返回请求的键值。
- `start` (string, optional) — 返回数值范围的起始值。
- `end` (string, optional) — 返回数值范围的结束值。
- `returns` (list of any, optional) — 按顺序返回开始与结束时间之间的所有 cps 值。
- `id` (string, optional) — 返回账户标识符。
- `baseCurrency` (string, optional) — 返回账户的基础货币。

### PerformanceResponseNavDataItemsStartNav

返回可用的初始 NAV。

- `date` (string, optional) — 返回请求的起始日期。
- `val` (long, optional) — 返回账户的净资产值。

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "currencyType": "base",
  "rc": 0,
  "nav": {
    "data": [
      {
        "idType": "acctid",
        "navs": [
          "202767332.1223",
          "215718598.8239"
        ],
        "start": "20230102",
        "end": "20231213",
        "id": "U1234567",
        "startNAV": {
          "date": "20221230",
          "val": 1
        },
        "baseCurrency": "USD"
      }
    ],
    "freq": "D",
    "dates": [
      "20230102",
      "20231213"
    ]
  },
  "nd": 346,
  "cps": {
    "data": [
      {
        "idType": "acctid",
        "start": "20230102",
        "end": "20231213",
        "returns": [
          "0",
          "0.0639"
        ],
        "id": "U1234567",
        "baseCurrency": "USD"
      }
    ],
    "freq": "D",
    "dates": [
      "20230102",
      "20231213"
    ]
  },
  "tpps": {
    "data": [
      {
        "idType": "acctid",
        "start": "20230102",
        "end": "20231213",
        "returns": [
          "0.0037",
          "0.0031",
          "0.0033",
          "0.0034",
          "0.02",
          "0.0127",
          "0.0036",
          "0.0036",
          "0.0034",
          "0.0012",
          "0.0026",
          "0.0017"
        ],
        "id": "U1234567",
        "baseCurrency": "USD"
      }
    ],
    "freq": "M",
    "dates": [
      "202301",
      "202302",
      "202303",
      "202304",
      "202305",
      "202306",
      "202307",
      "202308",
      "202309",
      "202310",
      "202311",
      "202312"
    ]
  },
  "id": "getPerformanceData",
  "included": [
    "U1234567"
  ],
  "pm": "TWR"
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/pa/performance"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/pa/performance';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{}'
};

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
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/pa/performance"

	payload := strings.NewReader("{}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

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

url = URI("https://localhost:5000/v1/api/pa/performance")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/pa/performance")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/pa/performance', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/pa/performance");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/pa/performance")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

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