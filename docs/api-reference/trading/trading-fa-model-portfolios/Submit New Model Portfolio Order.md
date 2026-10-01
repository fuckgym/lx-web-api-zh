# 提交新的模型投资组合订单

POST https://localhost:5000/v1/api/iserver/account/{modelCode}/orders
Content-Type: application/json

创建模型投资组合投资或再平衡订单。针对 URL 路径中 `modelCode` 所标识的模型投资组合提交一条或多条订单指令。每个订单条目均遵循 `/iserver/account/{accountId}/orders` 所使用的标准 IBKR 订单提交契约，其中 `acctId` 设置为目标子账户，订单在模型下进行路由。

该端点要么返回成功提交的订单确认列表，要么返回需要通过 `/iserver/reply/{replyId}` 进行后续确认的回复对象列表，确认之后订单才会被传送。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/submit-model-portfolio-order

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 路径参数

- `modelCode` (string, required) — 接收投资或再平衡订单的目标模型投资组合的名称。

### 请求体 (application/json)

该端点预期接收一个对象。

- `orders` (list of V1ApiIserverAccountModelCodeOrdersPostRequestBodyContentApplicationJsonSchemaOrdersItems, required) — 要针对该模型投资组合提交的订单指令集合。

## 响应

### 200

已成功提交模型投资组合订单。响应为订单确认列表，或需要通过 `/iserver/reply/{replyId}` 进行后续确认的回复对象列表。

- `list of V1ApiIserverAccountModelCodeOrdersPostResponsesContentApplicationJsonSchemaItems`

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

### V1ApiIserverAccountModelCodeOrdersPostRequestBodyContentApplicationJsonSchemaOrdersItems

- `acctId` (string, optional) — 模型下订单所适用的子账户标识符。
- `conid` (long, optional) — 要交易的金融工具的合约标识符。
- `conidex` (string, optional) — 组合形式的合约标识符与路由目的地，格式为 `<conid>@<exchange>`。可选；若省略，则使用 IBKR 默认路由。
- `secType` (string, optional) — 证券类型（例如 `STK`、`OPT`、`FUT`、`CASH`）。
- `cOID` (string, optional) — 客户端订单标识符。每个订单必须唯一，可用于将订单提交与下游事件相关联。
- `parentId` (string, optional) — 在括号（bracket）或 OCA 组中提交子订单时，父订单的 `cOID`。
- `orderType` (enum, optional) — 订单类型。
  - Allowed values: `MKT`, `LMT`, `STP`, `STOP_LIMIT`, `MIDPRICE`, `TRAIL`, `TRAILLMT`
- `listingExchange` (string, optional) — 该金融工具的首选上市交易所。
- `isSingleGroup` (boolean, optional) — 为 true 时，将订单集作为单个 OCA 组提交。
- `outsideRTH` (boolean, optional) — 为 true 时，允许订单在常规交易时段之外执行。
- `price` (double, optional) — 限价。`LMT` 和 `STOP_LIMIT` 订单类型必填。
- `auxPrice` (double, optional) — 止损价或追踪价。`STP`、`STOP_LIMIT` 以及追踪类订单类型必填。
- `side` (enum, optional) — 订单方向。
  - Allowed values: `BUY`, `SELL`
- `ticker` (string, optional) — 金融工具的代码。
- `tif` (enum, optional) — 订单的有效期。
  - Allowed values: `DAY`, `GTC`, `OPG`, `IOC`
- `trailingAmt` (double, optional) — `TRAIL` / `TRAILLMT` 订单类型的追踪金额。
- `trailingType` (enum, optional) — 追踪金额类型。
  - Allowed values: `amt`, `%`
- `referrer` (string, optional) — 用于内部跟踪的可选引荐来源标识符。
- `quantity` (double, optional) — 要交易的股份数量。与 `cashQty` 互斥。
- `cashQty` (double, optional) — 要交易的以现金计的数量。与 `quantity` 互斥。
- `fxQty` (double, optional) — 货币兑换订单的外汇数量。
- `useAdaptive` (boolean, optional) — 为 true 时，使用 IB Adaptive 算法路由订单。
- `isCcyConv` (boolean, optional) — 若该订单为货币兑换订单，则为 true。
- `allocationMethod` (string, optional) — 用于在该模型的各子账户之间分配订单的 FA 分配方法（例如 `AvailableEquity`、`NetLiq`、`EqualQuantity`、`PctChange`）。
- `strategy` (string, optional) — 可选的算法执行策略名称。
- `strategyParameters` (V1ApiIserverAccountModelCodeOrdersPostRequestBodyContentApplicationJsonSchemaOrdersItemsStrategyParameters, optional) — 传递给所选算法策略的参数。

### V1ApiIserverAccountModelCodeOrdersPostResponsesContentApplicationJsonSchemaItems

- `order_id` (string, optional) — 已提交模型投资组合订单的标识符。
- `order_status` (string, optional) — 已提交订单的当前状态（例如 `PreSubmitted`、`Submitted`、`Filled`）。
- `encrypt_message` (string, optional) — 提交结果的内部加密确认。
- `id` (string, optional) — 当订单需要额外确认时返回的回复标识符。将该值提供给 `/iserver/reply/{replyId}` 以继续提交。
- `message` (list of string, optional) — 在订单被传送之前必须确认的提示信息。
- `isSuspended` (boolean, optional) — 若订单因等待回复确认而被挂起，则为 true。

### V1ApiIserverAccountModelCodeOrdersPostRequestBodyContentApplicationJsonSchemaOrdersItemsStrategyParameters

传递给所选算法策略的参数。

## 示例

### success

**请求**

```json
{
  "orders": [
    {}
  ]
}
```

**响应**

```json
[
  {
    "order_id": "1799115492",
    "order_status": "PreSubmitted",
    "encrypt_message": "1"
  }
]
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/iserver/account/Sample-Model/orders"

payload = { "orders": [{}] }
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/iserver/account/Sample-Model/orders';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"orders":[{}]}'
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

	url := "https://localhost:5000/v1/api/iserver/account/Sample-Model/orders"

	payload := strings.NewReader("{\n  \"orders\": [\n    {}\n  ]\n}")

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

url = URI("https://localhost:5000/v1/api/iserver/account/Sample-Model/orders")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"orders\": [\n    {}\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/Sample-Model/orders")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"orders\": [\n    {}\n  ]\n}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/Sample-Model/orders', [
  'body' => '{
  "orders": [
    {}
  ]
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

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/Sample-Model/orders");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"orders\": [\n    {}\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["orders": [[]]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/Sample-Model/orders")! as URL,
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

### replyRequired

**请求**

```json
{
  "orders": [
    {}
  ]
}
```

**响应**

```json
[
  {
    "id": "a1b2c3d4-1234-5678-9abc-def012345678",
    "message": [
      "The following order size is larger than the average daily trading volume for this instrument. Are you sure you want to submit this order?"
    ],
    "isSuspended": false
  }
]
```

**SDK 代码**

```python replyRequired
import requests

url = "https://localhost:5000/v1/api/iserver/account/Sample-Model/orders"

payload = { "orders": [{}] }
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript replyRequired
const url = 'https://localhost:5000/v1/api/iserver/account/Sample-Model/orders';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"orders":[{}]}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go replyRequired
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/Sample-Model/orders"

	payload := strings.NewReader("{\n  \"orders\": [\n    {}\n  ]\n}")

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

```ruby replyRequired
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/Sample-Model/orders")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"orders\": [\n    {}\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java replyRequired
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/Sample-Model/orders")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"orders\": [\n    {}\n  ]\n}")
  .asString();
```

```php replyRequired
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/Sample-Model/orders', [
  'body' => '{
  "orders": [
    {}
  ]
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp replyRequired
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/Sample-Model/orders");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"orders\": [\n    {}\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift replyRequired
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["orders": [[]]] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/Sample-Model/orders")! as URL,
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