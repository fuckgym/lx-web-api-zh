# 投资组合分配

POST https://localhost:5000/v1/api/pa/allocation
Content-Type: application/json

按金融工具、资产类别、行业、地区或国家返回给定一组账户的合并投资组合分配。结果对所包含的账户进行汇总。仅当所有包含的账户的基础货币与 currency 参数中指定的货币相同时，才支持当日数据。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-portfolio-analyst/create-allocation

## 认证

- `Authorization` 请求头（bearer token，required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 请求体 (application/json)

该端点期望接收一个对象。

- `acctIds` (list of string, required)
- `type` (enum, required) — 分配的类别类型。为 FINANCIAL_INSTRUMENT、ASSET_CLASS、SECTOR、REGION、COUNTRY 或 ALL 之一。不区分大小写。指定 ALL 时，响应将包含每个类别类型的分配。
  - Allowed values: `FINANCIAL_INSTRUMENT`, `ASSET_CLASS`, `SECTOR`, `REGION`, `COUNTRY`, `ALL`
- `currency` (string, optional, default: USD) — 三位字符的货币代码。响应中 NAV 计算所使用的基础货币。
- `date` (string, optional) — 可选。格式为 yyyymmdd。如指定，应为当前日期之前的日期。如未指定，请求将针对当天。如果请求针对当天而当天数据尚不可用，则响应将是前一个工作日的数据。
- `model` (string, optional) — 可选。用于分配计算的模型投资组合名称。

## 响应

### 200

返回指定账户的分配明细。

- `id` (string, optional) — 响应标识符。
- `currency` (string, optional) — 三位字符的货币代码。NAV 值的货币，与请求中指定的一致。
- `realtime` (boolean, optional) — true 表示响应对应的是当日数据。
- `date` (string, optional) — NAV 和分配的截至日期。格式为 yyyymmdd。
- `allocations` (map from string to AllocationResponseAllocations, optional) — 以分配类型（FINANCIAL_INSTRUMENT、ASSET_CLASS、SECTOR、REGION 或 COUNTRY）为键的对象。请求 type=ALL 时可能出现多个键。
- `excluded` (list of string, optional) — 因错误而未包含在结果中的所请求账户。
- `warning` (string, optional) — 警告消息（如有）。

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

### AllocationResponseAllocations

- `long` (AllocationResponseAllocationsLong, optional) — 多头持仓分配明细。
- `short` (AllocationResponseAllocationsShort, optional) — 空头持仓分配明细。

### AllocationResponseAllocationsLong

多头持仓分配明细。

- `total` (AllocationResponseAllocationsLongTotal, optional)
- `items` (list of AllocationResponseAllocationsLongItemsItems, optional) — 多头分配条目。

### AllocationResponseAllocationsShort

空头持仓分配明细。

- `total` (AllocationResponseAllocationsShortTotal, optional)
- `items` (list of AllocationResponseAllocationsShortItemsItems, optional) — 空头分配条目。

### AllocationResponseAllocationsLongTotal

- `nav` (double, optional) — 多头持仓的总 NAV。
- `weight` (double, optional) — 多头持仓的总权重。乘以 100 即为百分比。

### AllocationResponseAllocationsLongItemsItems

- `id` (string, optional) — 类别的标识符。
- `name` (string, optional) — 类别的英文显示名称。
- `nav` (double, optional) — 该类别持有的金额。精度 8。
- `weight` (double, optional) — 多头投资组合中该类别所占比例。乘以 100 即为百分比。
- `color` (string, optional) — 十六进制格式的 RGB 颜色代码。

### AllocationResponseAllocationsShortTotal

- `nav` (double, optional) — 空头持仓的总 NAV。
- `weight` (double, optional) — 空头持仓的总权重。乘以 100 即为百分比。

### AllocationResponseAllocationsShortItemsItems

- `id` (string, optional) — 类别的标识符。
- `name` (string, optional) — 类别的英文显示名称。
- `nav` (double, optional) — 该类别持有的金额。精度 8。
- `weight` (double, optional) — 空头投资组合中该类别所占比例。乘以 100 即为百分比。
- `color` (string, optional) — 十六进制格式的 RGB 颜色代码。

## 示例

**请求**

```json
{
  "acctIds": [
    "DU123456"
  ],
  "type": "FINANCIAL_INSTRUMENT"
}
```

**响应**

```json
{
  "id": "getAllocation",
  "currency": "USD",
  "realtime": false,
  "date": "20240611",
  "allocations": {
    "SECTOR": {
      "long": {
        "total": {
          "nav": 111598.1,
          "weight": 1
        },
        "items": [
          {
            "id": "51",
            "name": "Basic Materials",
            "nav": 2593.59,
            "weight": 0.02324045,
            "color": "#007aa0"
          },
          {
            "id": "57",
            "name": "Technology",
            "nav": 27329.01,
            "weight": 0.24488781,
            "color": "#008fd5"
          }
        ]
      },
      "short": {
        "total": {
          "nav": -42904.21,
          "weight": 1
        },
        "items": [
          {
            "id": "51",
            "name": "Basic Materials",
            "nav": -708.14,
            "weight": 0.01650514,
            "color": "#007aa0"
          }
        ]
      }
    }
  }
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/pa/allocation"

payload = {
    "acctIds": ["DU123456"],
    "type": "FINANCIAL_INSTRUMENT"
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/pa/allocation';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"acctIds":["DU123456"],"type":"FINANCIAL_INSTRUMENT"}'
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

	url := "https://localhost:5000/v1/api/pa/allocation"

	payload := strings.NewReader("{\n  \"acctIds\": [\n    \"DU123456\"\n  ],\n  \"type\": \"FINANCIAL_INSTRUMENT\"\n}")

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

url = URI("https://localhost:5000/v1/api/pa/allocation")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"acctIds\": [\n    \"DU123456\"\n  ],\n  \"type\": \"FINANCIAL_INSTRUMENT\"\n}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/pa/allocation")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"acctIds\": [\n    \"DU123456\"\n  ],\n  \"type\": \"FINANCIAL_INSTRUMENT\"\n}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/pa/allocation', [
  'body' => '{
  "acctIds": [
    "DU123456"
  ],
  "type": "FINANCIAL_INSTRUMENT"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/pa/allocation");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"acctIds\": [\n    \"DU123456\"\n  ],\n  \"type\": \"FINANCIAL_INSTRUMENT\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "acctIds": ["DU123456"],
  "type": "FINANCIAL_INSTRUMENT"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/pa/allocation")! as URL,
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