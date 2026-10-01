# 搜索合约规则

POST https://localhost:5000/v1/api/iserver/contract/rules
Content-Type: application/json

返回特定合约和方向的交易相关规则。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-contract-rules

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 请求体 (application/json)

该端点预期接收一个对象。

- `conid` (long, required) — 所关注合约的合约标识符。
- `isBuy` (boolean, optional, default: true) — 规则所适用的市场方向。买单设为 true，卖单设为 false。
- `modifyOrder` (boolean, optional, default: false) — 用于查找与现有订单相关的交易规则。
- `orderId` (long, optional) — 指定用于跟踪给定订单的订单标识符。

## 响应

### 200

一个包含详细合约信息的对象数组。

- `algoEligible` (boolean, optional) — 指示该合约是否可以使用算法交易。
- `allOrNoneEligible` (boolean, optional) — 指示给定合约是否支持全部执行或全不执行（all or none）选项。
- `costReport` (boolean, optional) — 指示是否已请求成本报告（仅限 Client Portal）。
- `canTradeAcctIds` (list of string, optional) — 指示被允许交易该合约的 accountIDs。
- `error` (string, optional, nullable) — 如果因任何原因无法获取规则信息，将在此处表示。
- `orderTypes` (list of enum, optional) — 指示标准数量交易允许使用的订单类型。
  - Allowed values: `limit`, `midprice`, `market`, `stop`, `stop_limit`, `mit`, `lit`, `trailing_stop`, `trailing_stop_limit`, `relative`, `marketonclose`, `limitonclose`
- `ibAlgoTypes` (list of enum, optional) — 指示给定合约允许使用的算法类型。
  - Allowed values: `limit`, `stop_limit`, `lit`, `trailing_stop_limit`, `relative`, `marketonclose`, `limitonclose`
- `fraqTypes` (list of enum, optional) — 指示碎股交易（fractional trading）允许使用的订单类型。
  - Allowed values: `limit`, `market`, `stop`, `stop_limit`, `mit`, `lit`, `trailing_stop`, `trailing_stop_limit`
- `forceOrderPreview` (boolean, optional) — 指示是否在提交之前强制用户进行订单预览。
- `cqtTypes` (list of enum, optional) — 指示现金数量（cash quantity）接受使用的订单类型。
  - Allowed values: `limit`, `market`, `stop`, `stop_limit`, `mit`, `lit`, `trailing_stop`, `trailing_stop_limit`
- `orderDefaults` (ContractRulesOrderDefaults, optional) — 指示给定证券类型的默认订单类型。
- `orderTypesOutside` (list of enum, optional) — 指示常规交易时段之外允许使用的订单类型。
  - Allowed values: `limit`, `stop_limit`, `lit`, `trailing_stop_limit`, `relative`
- `defaultSize` (long, optional) — 订单的默认总数量值。
- `cashSize` (long, optional) — 默认现金价值数量。
- `sizeIncrement` (long, optional) — 指示该合约的数量增量。
- `tifTypes` (list of string, optional) — 指示该合约支持的允许 tif 类型。
- `tifDefaults` (ContractRulesTifDefaults, optional) — 包含您的 TIF 值默认值详情的对象。这些默认值可以在 TWS 的全局配置（Global Configuration）中查看和修改。
- `limitPrice` (double, optional) — 给定合约的默认限价。
- `stopPrice` (double, optional) — 给定合约的默认止损价。
- `orderOrigination` (string, optional, nullable) — 美国证券期权和期权清算公司（Options Clearing Corporation）的订单来源指定
- `preview` (boolean, optional) — 指示是否必须进行订单预览（仅限客户端门户）
- `displaySize` (long, optional, nullable) — 该金融工具的标准显示增量规则。
- `fraqInt` (long, optional) — 指示碎股订单数量的小数位数。
- `cashCcy` (string, optional) — 指示该金融工具的基础货币。
- `cashQtyIncr` (long, optional) — 指示现金数量增量规则。
- `priceMagnifier` (long, optional, nullable) — 表示给定合约的放大器。这与价格乘数不同，通常会返回 'null'
- `negativeCapable` (boolean, optional) — 指示合约的价值是否可以为负（true），还是始终为正（false）。
- `incrementType` (long, optional) — 指示增量样式的类型。
- `incrementRules` (list of ContractRulesIncrementRulesItems, optional) — 指示增量规则值，包括 lowerEdge 和增量值。
- `hasSecondary` (boolean, optional)
- `modTypes` (list of any, optional) — 列出修改订单时所支持的可用订单类型。
- `increment` (double, optional) — 价格的最小增量值
- `incrementDigits` (long, optional) — 表示增量值的小数位数。

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

### ContractRulesOrderDefaults

指示给定证券类型的默认订单类型。

- `LMT` (ContractRulesOrderDefaultsLmt, optional)

### ContractRulesTifDefaults

包含您的 TIF 值默认值详情的对象。这些默认值可以在 TWS 的全局配置（Global Configuration）中查看和修改。

- `TIF` (string, optional) — 订单的默认 TIF 类型。
- `SIZE` (string, optional) — 订单的默认数量值。
- `DEFAULT_ACCT` (string, optional) — 默认账户（仅限多账户）
- `PMALGO` (boolean, optional)

### ContractRulesIncrementRulesItems

- `lowerEdge` (long, optional) — 如果该金融工具的当前市场价格达到或高于下界，则订单价格使用给定的增量值。
- `increment` (long, optional) — 该金融工具的价格必须以增量值的倍数提交。

### ContractRulesOrderDefaultsLmt

- `LP` (string, optional) — 表示限价默认值。

## 示例

**请求**

```json
{
  "conid": 1
}
```

**响应**

```json
{
  "algoEligible": true,
  "allOrNoneEligible": true,
  "costReport": false,
  "canTradeAcctIds": [
    "U1234567",
    "U1234568",
    "U1234569"
  ],
  "error": null,
  "orderTypes": [
    "limit",
    "midprice",
    "market",
    "stop",
    "stop_limit",
    "mit",
    "lit",
    "trailing_stop",
    "trailing_stop_limit",
    "relative",
    "marketonclose",
    "limitonclose"
  ],
  "ibAlgoTypes": [
    "limit",
    "stop_limit",
    "lit",
    "trailing_stop_limit",
    "relative",
    "marketonclose",
    "limitonclose"
  ],
  "fraqTypes": [
    "limit",
    "market",
    "stop",
    "stop_limit",
    "mit",
    "lit",
    "trailing_stop",
    "trailing_stop_limit"
  ],
  "forceOrderPreview": false,
  "cqtTypes": [
    "limit",
    "market",
    "stop",
    "stop_limit",
    "mit",
    "lit",
    "trailing_stop",
    "trailing_stop_limit"
  ],
  "orderDefaults": {
    "LMT": {
      "LP": "198.22"
    }
  },
  "orderTypesOutside": [
    "limit",
    "stop_limit",
    "lit",
    "trailing_stop_limit",
    "relative"
  ],
  "defaultSize": 100,
  "cashSize": 0,
  "sizeIncrement": 100,
  "tifTypes": [
    "IOC/MARKET,LIMIT,RELATIVE,MARKETONCLOSE,MIDPRICE,LIMITONCLOSE,MKT_PROTECT,STPPRT,a",
    "GTC/o,a",
    "OPG/LIMIT,MARKET,a",
    "GTD/o,a",
    "DAY/o,a"
  ],
  "tifDefaults": {
    "TIF": "DAY",
    "SIZE": "100.00",
    "DEFAULT_ACCT": "U1234567",
    "PMALGO": true
  },
  "limitPrice": 198.22,
  "orderOrigination": null,
  "preview": true,
  "displaySize": null,
  "fraqInt": 4,
  "cashCcy": "USD",
  "cashQtyIncr": 500,
  "priceMagnifier": null,
  "negativeCapable": false,
  "incrementType": 1,
  "incrementRules": [
    {
      "lowerEdge": 0,
      "increment": 1
    }
  ],
  "hasSecondary": true,
  "increment": 0.01,
  "incrementDigits": 2,
  "stopprice": 198.22
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/iserver/contract/rules"

payload = { "conid": 1 }
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/iserver/contract/rules';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"conid":1}'
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

	url := "https://localhost:5000/v1/api/iserver/contract/rules"

	payload := strings.NewReader("{\n  \"conid\": 1\n}")

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

url = URI("https://localhost:5000/v1/api/iserver/contract/rules")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"conid\": 1\n}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/contract/rules")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"conid\": 1\n}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/contract/rules', [
  'body' => '{
  "conid": 1
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

var client = new RestClient("https://localhost:5000/v1/api/iserver/contract/rules");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"conid\": 1\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["conid": 1] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/contract/rules")! as URL,
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