# 按代码查询交易时间表

GET https://localhost:5000/v1/api/trsrv/secdef/schedule

返回所请求合约最长一个月的交易时间表。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-trading-schedule

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 请求

### 查询参数

- `assetClass` (enum, required) — 指定给定合约的证券类型。有效资产类别为：* `STK` - 股票 * `OPT` - 期权 * `FUT` - 期货 * `CFD` - 差价合约 * `WAR` - 认股权证 * `SWP` - 外汇 * `FND` - 共同基金 * `BND` - 债券 * `ICS` - 跨商品价差
  - Allowed values: `STK`, `OPT`, `FUT`, `CFD`, `WAR`, `SWP`, `FND`, `BND`, `ICS`
- `symbol` (string, required)
- `exchange` (string, optional)
- `exchangeFilter` (string, optional)

## 响应

### 200

返回所请求合约最长一个月的交易时间表。

- `list of TradingScheduleItems`

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

### 500 服务器内部错误

服务器内部错误，在传入请求无法被处理时返回。有时可能包含部分属于错误请求的情况。例如传入了错误的 accountId，只能在处理请求的过程中才能检测出来。错误信息包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### TradingScheduleItems

- `id` (string, optional) — 交易所参数 id
- `tradeVenueId` (string, optional) — 给定交易所参数对应交易场所的引用
- `exchange` (string, optional) — 交易所简称
- `description` (string, optional) — 交易所描述
- `timezone` (string, optional) — 引用与所列日期和时间对应的时区。
- `schedules` (list of TradingScheduleItemsSchedulesItems, optional) — 始终包含至少一个 'tradingTime' 标签以及零个或多个 'sessionTime' 标签

### TradingScheduleItemsSchedulesItems

- `clearingCycleEndTime` (string, optional) — 清算周期的结束时间。
- `tradingScheduleDate` (string, optional) — 清算时间表的日期。20000101 表示任意周六，20000102 表示任意周日，…… 20000107 表示任意周五。其他任何日期则表示其本身。
- `sessions` (list of TradingScheduleItemsSchedulesItemsSessionsItems, optional) — 列出可用的交易时段。此处显示常规交易时间。如果 LIQUID 时段与整个交易日不同，则会返回单独的 'session' 标签。
- `tradingTimes` (list of TradingScheduleItemsSchedulesItemsTradingTimesItems, optional) — 包含交易时间的对象。

### TradingScheduleItemsSchedulesItemsSessionsItems

- `openingTime` (string, optional) — 时段的开始日期时间。
- `closingTime` (string, optional) — 时段的结束日期时间。
- `prop` (string, optional) — 如果整个交易日被视为 LIQUID，则返回值 'LIQUID'。

### TradingScheduleItemsSchedulesItemsTradingTimesItems

- `openingTime` (string, optional) — 交易日的开始时间。
- `closingTime` (string, optional) — 交易日的结束时间。
- `prop` (string, optional)
- `cancelDayOrders` (string, optional) — 当日订单的取消时间。

## 示例

**响应**

```json
[
  {
    "id": "p101781",
    "tradeVenueId": "v13038",
    "exchange": "NYSE",
    "description": "New York Stock Exchange",
    "timezone": "America/New_York",
    "schedules": [
      {
        "clearingCycleEndTime": "0000",
        "tradingScheduleDate": "20000101",
        "sessions": [],
        "tradingtimes": [
          {
            "cancelDayOrders": "Y",
            "closingTime": "2330",
            "openingTime": "0035"
          }
        ]
      },
      {
        "clearingCycleEndTime": "0000",
        "tradingScheduleDate": "20000102",
        "sessions": [],
        "tradingtimes": [
          {
            "cancelDayOrders": "Y",
            "closingTime": "2330",
            "openingTime": "0035"
          }
        ]
      },
      {
        "clearingCycleEndTime": "1700",
        "tradingScheduleDate": "20000103",
        "sessions": [],
        "tradingtimes": [
          {
            "cancelDayOrders": "Y",
            "closingTime": "2330",
            "openingTime": "0035",
            "prop": "LIQUID"
          }
        ]
      },
      {
        "clearingCycleEndTime": "1700",
        "tradingScheduleDate": "20000104",
        "sessions": [],
        "tradingtimes": [
          {
            "cancelDayOrders": "Y",
            "closingTime": "2330",
            "openingTime": "0035",
            "prop": "LIQUID"
          }
        ]
      },
      {
        "clearingCycleEndTime": "1700",
        "tradingScheduleDate": "20000105",
        "sessions": [],
        "tradingtimes": [
          {
            "cancelDayOrders": "Y",
            "closingTime": "2330",
            "openingTime": "0035",
            "prop": "LIQUID"
          }
        ]
      },
      {
        "clearingCycleEndTime": "1700",
        "tradingScheduleDate": "20000106",
        "sessions": [],
        "tradingtimes": [
          {
            "cancelDayOrders": "Y",
            "closingTime": "2330",
            "openingTime": "0035",
            "prop": "LIQUID"
          }
        ]
      },
      {
        "clearingCycleEndTime": "1700",
        "tradingScheduleDate": "20000107",
        "sessions": [],
        "tradingtimes": [
          {
            "cancelDayOrders": "Y",
            "closingTime": "2330",
            "openingTime": "0035",
            "prop": "LIQUID"
          }
        ]
      },
      {
        "clearingCycleEndTime": "0000",
        "tradingScheduleDate": "20240329",
        "sessions": [],
        "tradingtimes": [
          {
            "cancelDayOrders": "Y",
            "closingTime": "2330",
            "openingTime": "0035"
          }
        ]
      }
    ]
  }
]
```

**SDK 代码**

```python ibm-nyse
import requests

url = "https://localhost:5000/v1/api/trsrv/secdef/schedule"

querystring = {"assetClass":"STK","symbol":"AAPL"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript ibm-nyse
const url = 'https://localhost:5000/v1/api/trsrv/secdef/schedule?assetClass=STK&symbol=AAPL';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go ibm-nyse
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/trsrv/secdef/schedule?assetClass=STK&symbol=AAPL"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby ibm-nyse
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/trsrv/secdef/schedule?assetClass=STK&symbol=AAPL")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java ibm-nyse
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/trsrv/secdef/schedule?assetClass=STK&symbol=AAPL")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php ibm-nyse
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/trsrv/secdef/schedule?assetClass=STK&symbol=AAPL', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp ibm-nyse
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/trsrv/secdef/schedule?assetClass=STK&symbol=AAPL");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift ibm-nyse
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/trsrv/secdef/schedule?assetClass=STK&symbol=AAPL")! as URL,
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