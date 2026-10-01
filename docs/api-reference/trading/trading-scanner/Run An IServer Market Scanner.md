# 运行 IServer 市场扫描器

POST https://localhost:5000/v1/api/iserver/scanner/run
Content-Type: application/json

根据 /iserver/scanner/params 端点中指定的筛选条件搜索合约。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-scanner/get-scanner-results

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 请求体 (application/json)

该端点预期接收一个 iserverScannerRunRequest。

- `instrument` (string, optional) — 作为市场扫描器请求目标的金融工具类型。可在 /iserver/scanner/params 响应的 "instrument_list" 部分中找到。
- `type` (string, optional) — 市场扫描器排序所依据的扫描器值。基于 /iserver/scanner/params 响应的 "scan_type_list" 部分。
- `location` (string, optional) — 市场扫描器搜索时所遍历的位置值。基于 /iserver/scanner/params 响应的 "location_tree" 部分。
- `filter` (list of IserverScannerRunRequestFilterItems, optional) — 包含应当应用于响应的其他筛选条件。

## 响应

### 200

一个包含详细合约信息的对象数组。

- `contracts` (list of IserverScannerRunResponseContractsItems, optional) — 包含与市场扫描器请求相关的合约。
- `scan_data_column_name` (string, optional) — 仅限内部使用

## 错误

### 400 错误请求错误

缺少参数、参数为空、参数非数字或超出范围。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

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

### IserverScannerRunRequestFilterItems

- `code` (string, optional) — 筛选条件的代码值。基于 /iserver/scanner/params 响应中 "filter_list" 部分内的 "code" 值。
- `value` (IserverScannerRunRequestFilterItemsValue, optional) — 与 "code" 输入对应的值。

### IserverScannerRunResponseContractsItems

- `server_id` (string, optional) — 合约相对于市场扫描器类型排序优先级的索引。
- `column_name` (string, optional) — 始终为第一个合约返回。
- `symbol` (string, optional) — 返回合约的股票代码。
- `conidex` (string, optional) — 返回该合约的合约 ID。
- `con_id` (long, optional) — 返回该合约的合约 ID。
- `available_chart_periods` (string, optional) — 仅限内部使用
- `company_name` (string, optional) — 返回公司全称。
- `contract_description_1` (string, optional) — 对于期货等衍生品，将返回合约的本地代码（local symbol）。
- `listing_exchange` (string, optional) — 返回合约的主要上市交易所。
- `sec_type` (string, optional) — 返回合约的证券类型。

### IserverScannerRunRequestFilterItemsValue

与 "code" 输入对应的值。

## 示例

### top_trade_count

**响应**

```json
{
  "contracts": [
    {
      "server_id": "0",
      "column_name": "Trades",
      "symbol": "TSLA",
      "conidex": "76792991",
      "con_id": 76792991,
      "available_chart_periods": "#R|1",
      "company_name": "TESLA INC",
      "contract_description_1": "TSLA",
      "listing_exchange": "NASDAQ.NMS",
      "sec_type": "STK",
      "scan_data": "221.521K"
    },
    {
      "server_id": "1",
      "symbol": "SPY",
      "conidex": "756733",
      "con_id": 756733,
      "available_chart_periods": "#R|1",
      "company_name": "SPDR S&P 500 ETF TRUST",
      "contract_description_1": "SPY",
      "listing_exchange": "ARCA",
      "sec_type": "STK",
      "scan_data": "123.661K"
    }
  ],
  "scan_data_column_name": "Trades"
}
```

**SDK 代码**

```python top_trade_count
import requests

url = "https://localhost:5000/v1/api/iserver/scanner/run"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript top_trade_count
const url = 'https://localhost:5000/v1/api/iserver/scanner/run';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go top_trade_count
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/scanner/run"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby top_trade_count
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/scanner/run")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java top_trade_count
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/scanner/run")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php top_trade_count
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/scanner/run', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp top_trade_count
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/scanner/run");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift top_trade_count
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/scanner/run")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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

### Trading Scanner_getScannerResults_example

**请求**

```json
{
  "instrument": "STK",
  "type": "TOP_TRADE_COUNT",
  "location": "STK.US.MAJOR",
  "filter": [
    {
      "code": "priceAbove",
      "value": 5
    }
  ]
}
```

**响应**

```json
{
  "contracts": [
    {
      "server_id": "0",
      "column_name": "Trades",
      "symbol": "TSLA",
      "conidex": "76792991",
      "con_id": 76792991,
      "available_chart_periods": "#R|1",
      "company_name": "TESLA INC",
      "contract_description_1": "TSLA",
      "listing_exchange": "NASDAQ.NMS",
      "sec_type": "STK",
      "scan_data": "221.521K"
    },
    {
      "server_id": "1",
      "symbol": "SPY",
      "conidex": "756733",
      "con_id": 756733,
      "available_chart_periods": "#R|1",
      "company_name": "SPDR S&P 500 ETF TRUST",
      "contract_description_1": "SPY",
      "listing_exchange": "ARCA",
      "sec_type": "STK",
      "scan_data": "123.661K"
    }
  ],
  "scan_data_column_name": "Trades"
}
```

**SDK 代码**

```python Trading Scanner_getScannerResults_example
import requests

url = "https://localhost:5000/v1/api/iserver/scanner/run"

payload = {
    "instrument": "STK",
    "type": "TOP_TRADE_COUNT",
    "location": "STK.US.MAJOR",
    "filter": [
        {
            "code": "priceAbove",
            "value": 5
        }
    ]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Trading Scanner_getScannerResults_example
const url = 'https://localhost:5000/v1/api/iserver/scanner/run';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"instrument":"STK","type":"TOP_TRADE_COUNT","location":"STK.US.MAJOR","filter":[{"code":"priceAbove","value":5}]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Trading Scanner_getScannerResults_example
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/scanner/run"

	payload := strings.NewReader("{\n  \"instrument\": \"STK\",\n  \"type\": \"TOP_TRADE_COUNT\",\n  \"location\": \"STK.US.MAJOR\",\n  \"filter\": [\n    {\n      \"code\": \"priceAbove\",\n      \"value\": 5\n    }\n  ]\n}")

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

```ruby Trading Scanner_getScannerResults_example
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/scanner/run")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"instrument\": \"STK\",\n  \"type\": \"TOP_TRADE_COUNT\",\n  \"location\": \"STK.US.MAJOR\",\n  \"filter\": [\n    {\n      \"code\": \"priceAbove\",\n      \"value\": 5\n    }\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java Trading Scanner_getScannerResults_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/scanner/run")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"instrument\": \"STK\",\n  \"type\": \"TOP_TRADE_COUNT\",\n  \"location\": \"STK.US.MAJOR\",\n  \"filter\": [\n    {\n      \"code\": \"priceAbove\",\n      \"value\": 5\n    }\n  ]\n}")
  .asString();
```

```php Trading Scanner_getScannerResults_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/scanner/run', [
  'body' => '{
  "instrument": "STK",
  "type": "TOP_TRADE_COUNT",
  "location": "STK.US.MAJOR",
  "filter": [
    {
      "code": "priceAbove",
      "value": 5
    }
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Trading Scanner_getScannerResults_example
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/scanner/run");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"instrument\": \"STK\",\n  \"type\": \"TOP_TRADE_COUNT\",\n  \"location\": \"STK.US.MAJOR\",\n  \"filter\": [\n    {\n      \"code\": \"priceAbove\",\n      \"value\": 5\n    }\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Trading Scanner_getScannerResults_example
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "instrument": "STK",
  "type": "TOP_TRADE_COUNT",
  "location": "STK.US.MAJOR",
  "filter": [
    [
      "code": "priceAbove",
      "value": 5
    ]
  ]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/scanner/run")! as URL,
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