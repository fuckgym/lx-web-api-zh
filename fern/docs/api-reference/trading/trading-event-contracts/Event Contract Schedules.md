# 事件合约时间表

GET https://localhost:5000/v1/api/forecast/contract/schedules

提供预测交易时间表。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-event-contracts/get-forecast-schedule

## 认证

- `Authorization` 请求头（bearer token, required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 请求

### 查询参数

- `conid` (string, required)

## 响应

### 200

返回即将到来和之前交易日的常规交易时段与延长交易时段。

- `timezone` (string, optional) — 事件合约的交易所时区。
- `trading_schedules` (list of ForecastSchedulesResponseTradingSchedulesItems, optional) — 包含每个日期交易对象的列表。

## 错误

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

### ForecastSchedulesResponseTradingSchedulesItems

- `day_of_week` (string, optional) — 提供与该交易时间表对应的星期几。
- `trading_times` (list of ForecastSchedulesResponseTradingSchedulesItemsTradingTimesItems, optional) — 包含事件合约开盘时间的列表。如果该合约存在日内交易休市，则可能返回多个交易时段。

### ForecastSchedulesResponseTradingSchedulesItemsTradingTimesItems

- `open` (string, optional) — 给定交易时段的开盘时间。
- `close` (string, optional) — 给定交易时段的收盘时间。

## 示例

**响应**

```json
{
  "timezone": "US/Central",
  "trading_schedules": [
    {
      "day_of_week": "Saturday",
      "trading_times": [
        {
          "open": "12:00 AM",
          "close": "4:00 PM"
        },
        {
          "open": "4:15 PM",
          "close": "11:59 PM"
        }
      ]
    },
    {
      "day_of_week": "Sunday",
      "trading_times": [
        {
          "open": "12:00 AM",
          "close": "4:00 PM"
        },
        {
          "open": "4:15 PM",
          "close": "11:59 PM"
        }
      ]
    },
    {
      "day_of_week": "Monday",
      "trading_times": [
        {
          "open": "12:00 AM",
          "close": "4:00 PM"
        },
        {
          "open": "4:15 PM",
          "close": "11:59 PM"
        }
      ]
    }
  ]
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/forecast/contract/schedules"

querystring = {"conid":"conid"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/forecast/contract/schedules?conid=conid';
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

	url := "https://localhost:5000/v1/api/forecast/contract/schedules?conid=conid"

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

url = URI("https://localhost:5000/v1/api/forecast/contract/schedules?conid=conid")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/forecast/contract/schedules?conid=conid")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/forecast/contract/schedules?conid=conid', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/forecast/contract/schedules?conid=conid");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/forecast/contract/schedules?conid=conid")! as URL,
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