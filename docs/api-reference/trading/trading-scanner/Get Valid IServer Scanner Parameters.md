# 获取有效的 IServer 扫描器参数

GET https://localhost:5000/v1/api/iserver/scanner/params

返回一个 xml 文件，其中包含可随 IServer 扫描器请求发送的所有可用参数。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-scanner/get-scanner-parameters

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 响应

### 200

一组详述合约信息的对象数组。

- `scan_type_list` (list of IserverScannerParamsScanTypeListItems, optional) — 包含请求中扫描器“type”所使用的全部取值。
- `instrument_list` (list of IserverScannerParamsInstrumentListItems, optional) — 包含与扫描器“instrument”请求字段相关的全部取值。
- `filter_list` (list of IserverScannerParamsFilterListItems, optional)
- `location_tree` (list of IserverScannerParamsLocationTreeItems, optional) — 包含与市场扫描器请求的 location 字段相关的全部取值。

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

### IserverScannerParamsScanTypeListItems

- `display_name` (string, optional) — 扫描器“type”的人类可读名称
- `code` (string, optional) — 市场扫描器请求中使用的值。
- `instruments` (list of any, optional) — 返回该扫描器类型可搭配使用的所有金融工具。

### IserverScannerParamsInstrumentListItems

- `display_name` (string, optional) — 金融工具类型的人类可读表示。
- `type` (string, optional) — 市场扫描器请求中使用的值。
- `filters` (list of any, optional) — 返回一个数组，包含该金融工具类型独有的所有过滤器。

### IserverScannerParamsFilterListItems

- `group` (string, optional) — 返回该请求所关联的过滤器分组。
- `display_name` (string, optional) — 返回该过滤器的人类可读标识符。
- `code` (string, optional) — 市场扫描器请求中使用的值。
- `type` (string, optional) — 返回请求中要使用的值类型。它可以指示一个基于范围的值，或应为单一值。
- `combo_values` (list of IserverScannerParamsFilterListItemsComboValuesItems, optional) — type 为 combo 时的组合值

### IserverScannerParamsLocationTreeItems

- `display_name` (string, optional) — 返回用于指定位置的上一级金融工具类型。
- `type` (string, optional) — 返回市场扫描器金融工具类型值的 code 值。
- `locations` (list of IserverScannerParamsLocationTreeItemsLocationsItems, optional)

### IserverScannerParamsFilterListItemsComboValuesItems

- `default` (boolean, optional)
- `vendor` (IserverScannerParamsFilterListItemsComboValuesItemsVendor, optional)

### IserverScannerParamsLocationTreeItemsLocationsItems

- `display_name` (string, optional) — 返回市场扫描器 location 值的人类可读值。
- `type` (string, optional) — 返回市场扫描器 location 值的 code 值。
- `locations` (list of IserverScannerParamsLocationTreeItemsLocationsItemsLocationsItems, optional)

### IserverScannerParamsFilterListItemsComboValuesItemsVendor

### IserverScannerParamsLocationTreeItemsLocationsItemsLocationsItems

- `display_name` (string, optional)
- `type` (string, optional)

## 示例

**响应**

```json
{
  "scan_type_list": [
    {
      "display_name": "Top % Gainers",
      "code": "TOP_PERC_GAIN",
      "instruments": [
        "STK",
        "ETF.EQ.US",
        "ETF.FI.US",
        "FUT.US",
        "IND.US",
        "STOCK.NA",
        "FUT.NA",
        "SSF.NA",
        "STOCK.EU",
        "FUT.EU",
        "IND.EU",
        "SSF.EU",
        "STOCK.ME",
        "STOCK.HK",
        "FUT.HK",
        "IND.HK",
        "SSF.HK"
      ]
    }
  ],
  "instrument_list": [
    {
      "display_name": "US Stocks",
      "type": "STK",
      "filters": [
        "afterHoursChange",
        "afterHoursChangePerc",
        "avgOptVolume",
        "avgPriceTarget",
        "avgRating"
      ]
    }
  ],
  "filter_list": [
    {
      "group": "afterHoursChangeAbove",
      "display_name": "After-Hours Change Above",
      "code": "afterHoursChangeAbove",
      "type": "non-range"
    },
    {
      "group": "stkTypes",
      "display_name": "Stock type",
      "code": "stkTypes",
      "combo_values": [
        {
          "default": true
        }
      ]
    }
  ],
  "location_tree": [
    {
      "display_name": "US Stocks",
      "type": "STK",
      "locations": [
        {
          "display_name": "Listed/NASDAQ",
          "type": "STK.US.MAJOR",
          "locations": []
        },
        {
          "display_name": "OTCMarkets",
          "type": "STK.US.MINOR",
          "locations": []
        }
      ]
    },
    {
      "display_name": "US Futures",
      "type": "FUT.US",
      "locations": [
        {
          "display_name": "CME",
          "type": "FUT.CME"
        },
        {
          "display_name": "CBOT",
          "type": "FUT.CBOT"
        },
        {
          "display_name": "NYMEX",
          "type": "FUT.NYMEX"
        }
      ]
    }
  ]
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/iserver/scanner/params"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/iserver/scanner/params';
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

	url := "https://localhost:5000/v1/api/iserver/scanner/params"

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

url = URI("https://localhost:5000/v1/api/iserver/scanner/params")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/scanner/params")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/scanner/params', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/scanner/params");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/scanner/params")! as URL,
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