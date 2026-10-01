# 按代码搜索金融工具

GET https://localhost:5000/v1/api/iserver/secdef/search

根据作为查询参数提供的搜索代码返回一组合约列表。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-contract-symbols

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 查询参数

- `symbol` (string, optional)
- `secType` (enum, optional, default: STK) — 可用的标的证券类型：* `STK` - 表示标的为股票（Stock）证券类型。* `IND` - 表示标的为指数（Index）证券类型。* `BOND` - 表示标的为债券（Bond）证券类型。
  - Allowed values: `STK`, `IND`, `BOND`
- `name` (boolean, optional)
- `more` (boolean, optional)
- `fund` (boolean, optional)
- `fundFamilyConidEx` (string, optional)
- `pattern` (boolean, optional)
- `referrer` (string, optional)

## 响应

### 200

一组详述合约信息的对象数组。

- `list of SecdefSearchResponseItems`

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

内部服务器错误，当传入的请求无法被处理时返回。它有时可能包含错误请求（bad request）的子集。例如，传入的 accountId 有误，而只能在处理请求的后续阶段才被检测出来。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### SecdefSearchResponseItems

- `bondid` (long, optional) — 适用于债券
- `conid` (string, optional) — 唯一合约的合约标识符。
- `companyHeader` (string, optional) — 公司名称 - 交易所
- `companyName` (string, optional, nullable) — 公司的正式名称。
- `symbol` (string, optional) — 标的股票代码。
- `description` (string, optional) — 合约的主要交易所
- `restricted` (boolean, optional, nullable) — 返回该合约是否可供交易。
- `fop` (string, optional, nullable) — 返回一个以分号分隔的日期字符串。
- `opt` (string, optional, nullable) — 返回一个以分号分隔的日期字符串。
- `war` (string, optional, nullable) — 返回一个以分号分隔的日期字符串。
- `sections` (list of SecdefSearchResponseItemsSectionsItems, optional)
- `issuers` (list of SecdefSearchResponseItemsIssuersItems, optional)

### SecdefSearchResponseItemsSectionsItems

- `secType` (string, optional)
- `months` (string, optional) — 以分号分隔的月份列表
- `exchange` (string, optional) — 以分号分隔的交易所列表

### SecdefSearchResponseItemsIssuersItems

- `id` (string, optional)
- `name` (string, optional)

## 示例

**响应**

```json
[
  {
    "conid": "8314",
    "companyHeader": "INTL BUSINESS MACHINES CORP - NYSE",
    "companyName": "INTL BUSINESS MACHINES CORP",
    "symbol": "IBM",
    "description": "NYSE",
    "restricted": null,
    "fop": null,
    "opt": "20240315;20240322;20240328;20240405;20240412;20240419;20240426;20240517;20240621;20240719;20240920;20241018;20250117;20250620;20260116",
    "war": "20240208;20240213;20240214;20240215;20240216;20240222;20240226;20240227;20240228;20240229;20240301;20240304;20240305;20240306;20240307;20240308;20240311;20240312;20240313;20240314;20240315;20240416;20240418;20240514;20240516;20240618;20240619;20240620;20240621;20240718;20240917;20240918;20240919;20240920;20241017;20241217;20241218;20241219;20241220;20250114;20250115;20250116;20250117;20250319;20250320;20250617;20250618;20250619;20250620;20250918;20251216;20251218;20260113;20260115",
    "sections": [
      {
        "secType": "STK"
      },
      {
        "secType": "OPT",
        "months": "MAR24;APR24;MAY24;JUN24;JUL24;SEP24;OCT24;JAN25;JUN25;JAN26",
        "exchange": "SMART;AMEX;BATS;BOX;CBOE;CBOE2;EDGX;EMERALD;GEMINI;IBUSOPT;ISE;MEMX;MERCURY;MIAX;NASDAQBX;NASDAQOM;PEARL;PHLX;PSE"
      },
      {
        "secType": "WAR",
        "months": "FEB24;MAR24;APR24;MAY24;JUN24;JUL24;SEP24;OCT24;DEC24;JAN25;MAR25;JUN25;SEP25;DEC25;JAN26",
        "exchange": "EBS;FWB;GETTEX;SBF;SWB"
      },
      {
        "secType": "IOPT"
      },
      {
        "secType": "CFD",
        "exchange": "SMART",
        "conid": "118239202"
      },
      {
        "secType": "BAG"
      }
    ]
  },
  {
    "conid": "41645598",
    "companyHeader": "INTL BUSINESS MACHINES CORP - LSE",
    "companyName": "INTL BUSINESS MACHINES CORP",
    "symbol": "IBM",
    "description": "LSE",
    "restricted": null,
    "fop": null,
    "opt": null,
    "war": null,
    "sections": [
      {
        "secType": "STK"
      }
    ]
  },
  {
    "bondid": 5,
    "conid": "2147483647",
    "companyHeader": "Corporate Fixed Income",
    "companyName": null,
    "restricted": null,
    "fop": null,
    "opt": null,
    "war": null,
    "sections": [
      {
        "secType": "BOND"
      }
    ],
    "issuers": [
      {
        "id": "e5499005",
        "name": "IBM International Capital Pte Ltd"
      },
      {
        "id": "e1580374",
        "name": "IBM-CALL"
      },
      {
        "id": "e1400789",
        "name": "International Business Machines Corp"
      },
      {
        "id": "e1658116",
        "name": "Truven Health Analytics Inc"
      }
    ]
  }
]
```

**SDK 代码**

```python found
import requests

url = "https://localhost:5000/v1/api/iserver/secdef/search"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript found
const url = 'https://localhost:5000/v1/api/iserver/secdef/search';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go found
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/secdef/search"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby found
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/secdef/search")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java found
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/secdef/search")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php found
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/secdef/search', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp found
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/secdef/search");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift found
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/secdef/search")! as URL,
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