# 提交新订单

POST https://localhost:5000/v1/api/iserver/account/{accountId}/orders
Content-Type: application/json

提交新的订单票（一张或多张）、括号订单（bracket）或 OCA 组。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-orders/submit-new-order

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 路径参数

- `accountId` (string, required) — 订单将进行清算的账户。

### 请求体（application/json）

该端点接受一个 ordersSubmissionRequest。

- `orders` (list of singleOrderSubmissionRequest, optional) — 订单票对象数组。除非构建括号订单（bracket），否则每个请求只能提交一个订单票对象。

## 响应

### 200

订单提交响应（成功、错误、需要回复或订单被拒绝）

- `Trading Orders_submitNewOrder_Response_200`

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

服务不可用。例如，由于某个内部服务不可用导致请求耗时超过 10 秒，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 类型

### singleOrderSubmissionRequest

单个订单票。

- `conid` (long, required) — 该金融工具的 IB 合约 ID。
- `orderType` (string, required) — IB 订单类型标识符。
- `side` (enum, required) — 订单票的方向。
  - Allowed values: `BUY`, `SELL`
- `tif` (enum, required) — 订单票的有效期（Time in force）。
  - Allowed values: `DAY`, `IOC`, `GTC`, `OPG`, `PAX`
- `quantity` (double, required) — 订单票的数量，以金融工具的单位计。
- `acctId` (string, optional) — 订单票的接收账户。
- `conidex` (string, optional) — 合约 ID 与路由目的地合并在内，格式为 123456@EXCHANGE。
- `secType` (string, optional) — IB 资产类别标识符。
- `cOID` (string, optional) — 客户端可配置的订单标识符。该值在 24 小时范围内必须唯一。该值长度不得超过 64 个字符。括号订单的子订单不应设置该值。
- `parentId` (string, optional) — 如果订单票是括号订单中的子订单，则 parentId 字段必须设置为与为父订单提供的 cOID 相同。
- `listingExchange` (string, optional) — 该金融工具的上市交易所。
- `isSingleGroup` (boolean, optional) — 表示所在数组中的所有订单将被视为一个 OCA 组。
- `outsideRTH` (boolean, optional) — 指示 IB 允许该订单在常规交易时间之外执行。
- `allOrNone` (boolean, optional) — 指示 IB 要么全部执行该订单，要么完全不执行。
- `auxPrice` (double, optional) — 某些订单类型（如止损单）所使用的附加价格值。
- `ticker` (string, optional) — 该金融工具的股票代码。
- `trailingAmt` (double, optional) — 与追踪（Trailing）订单一起使用的偏移量。
- `trailingType` (enum, optional) — 指定追踪订单所使用的追踪类型。
  - Allowed values: `amt`, `%`
- `referrer` (string, optional) — 订单录入 UI 元素的 IB 内部标识符。
- `cashQty` (double, optional) — 现金数量订单所使用的货币数量。
- `useAdaptive` (boolean, optional) — 指示 IB 应用价格管理算法（Price Management Algo）。
- `isCcyConv` (boolean, optional) — 表示该外汇订单用于货币兑换，且在适用情况下不应在账户中产生虚拟外汇持仓。
- `price` (double, optional) — 订单票的价格（如适用）。
- `strategy` (string, optional) — 执行算法的名称。
- `strategyParameters` (SingleOrderSubmissionRequestStrategyParameters, optional) — 控制所选算法的参数（如适用）。
- `extOperator` (string, optional) — ExtOperator 用于识别外部操作者
- `manualIndicator` (boolean, optional) — 对于美国期货（US Futures）产品的所有订单，客户必须提交此标志，以指明订单是由人工发起（由自然人）还是自动发起（由在无人为干预的情况下传输订单的自动化交易系统）。提交 True 表示人工发起的订单，提交 False 表示自动化订单。未包含此字段的 USFUT 产品订单将被拒绝。
- `taxOptimizerId` (string, optional) — 标识所选的税务批次（tax lots）集合，用于损益管理。
- `jsonPayload` (SingleOrderSubmissionRequestJsonPayload, optional)

### orderSubmitError

表示订单回复消息或提交未被接受。

- `error` (string, optional) — 表示订单提交未成功的消息。

### advancedOrderReject

对应针对所提交订单票被拒绝而生成的消息。在某些情况下，它还可能提供一种机制，在作出提示性决定后重新提交同一订单。

- `orderId` (long, optional) — IB 分配给被拒绝订单票的订单 ID。
- `reqId` (string, optional) — IB 分配给所返回消息的内部标识符。
- `dismissable` (list of any, optional) — 表示该提示是否可关闭。
- `text` (string, optional) — IB 为响应订单提交而发出的消息的人类可读文本。
- `options` (list of string, optional) — 针对该拒绝消息客户端可选择的选项。
- `type` (string, optional) — 所返回消息的具体类型。
- `messageId` (string, optional) — 所返回消息的性质或类别的 IB 内部标识符。
- `prompt` (boolean, optional) — 表示该消息是一个提供一组决策的提示，其中一个或多个决策可能允许重新提交被拒绝的订单。

### SingleOrderSubmissionRequestStrategyParameters

控制所选算法的参数（如适用）。

- `PLACEHOLDER` (string, optional) — 占位符 —— 这些参数因算法而异（且类型并不总是 string，有时为 bool）

### SingleOrderSubmissionRequestJsonPayload

- `allocation_profile` (SingleOrderSubmissionRequestJsonPayloadAllocationProfile, optional) — 订单应如何在各子账户之间进行分配的指定内容。

### SingleOrderSubmissionRequestJsonPayloadAllocationProfile

订单应如何在各子账户之间进行分配的指定内容。

- `alloc_type` (enum, optional) — 定义股份应如何分配的分配类型。需要预先批准的警告消息。 * `SHARE` - 将分配金额指定为股份数量。 * `CASH` - 将分配金额指定为要分配的现金数量。
  - Allowed values: `SHARE`, `CASH`
- `allocations` (list of SingleOrderSubmissionRequestJsonPayloadAllocationProfileAllocationsItems, optional) — 要为其分配交易及对应数量的账户列表。

### SingleOrderSubmissionRequestJsonPayloadAllocationProfileAllocationsItems

- `account` (string, optional) — 要向其分配交易的账户。
- `amount` (double, optional) — 基于 alloc_type 分配给指定账户的数量。

## 示例

### orderSubmitSuccessExample

**请求**

```json
{}
```

**响应**

```json
[
  {
    "encrypt_message": "1",
    "order_id": "1370093239",
    "order_status": "PreSubmitted"
  }
]
```

**SDK 代码**

```python orderSubmitSuccessExample
import requests

url = "https://localhost:5000/v1/api/iserver/account/DU123456/orders"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript orderSubmitSuccessExample
const url = 'https://localhost:5000/v1/api/iserver/account/DU123456/orders';
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

```go orderSubmitSuccessExample
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/DU123456/orders"

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

```ruby orderSubmitSuccessExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/DU123456/orders")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java orderSubmitSuccessExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/DU123456/orders")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php orderSubmitSuccessExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/DU123456/orders', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp orderSubmitSuccessExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/DU123456/orders");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift orderSubmitSuccessExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/DU123456/orders")! as URL,
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

### orderReplyMessageExample

**请求**

```json
{}
```

**响应**

```json
[
  {
    "id": "99097238-9824-4830-84ef-46979aa22593",
    "isSuppressed": false,
    "message": [
      "You are submitting an order without market data. We strongly recommend against this as it may result in erroneous and unexpected trades.\nAre you sure you want to submit this order?"
    ],
    "messageIds": [
      "o354"
    ]
  }
]
```

**SDK 代码**

```python orderReplyMessageExample
import requests

url = "https://localhost:5000/v1/api/iserver/account/DU123456/orders"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript orderReplyMessageExample
const url = 'https://localhost:5000/v1/api/iserver/account/DU123456/orders';
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

```go orderReplyMessageExample
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/DU123456/orders"

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

```ruby orderReplyMessageExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/DU123456/orders")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java orderReplyMessageExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/DU123456/orders")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php orderReplyMessageExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/DU123456/orders', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp orderReplyMessageExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/DU123456/orders");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift orderReplyMessageExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/DU123456/orders")! as URL,
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

### orderSubmitErrorExample

**请求**

```json
{}
```

**响应**

```json
{
  "error": "Order not confirmed "
}
```

**SDK 代码**

```python orderSubmitErrorExample
import requests

url = "https://localhost:5000/v1/api/iserver/account/DU123456/orders"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript orderSubmitErrorExample
const url = 'https://localhost:5000/v1/api/iserver/account/DU123456/orders';
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

```go orderSubmitErrorExample
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/DU123456/orders"

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

```ruby orderSubmitErrorExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/DU123456/orders")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java orderSubmitErrorExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/DU123456/orders")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php orderSubmitErrorExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/DU123456/orders', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp orderSubmitErrorExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/DU123456/orders");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift orderSubmitErrorExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/DU123456/orders")! as URL,
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

### advancedOrderRejectPromptExample

**请求**

```json
{}
```

**响应**

```json
{
  "dismissable": [],
  "messageId": "p12",
  "options": [
    "Use on this order",
    "Always use",
    "Do not use"
  ],
  "orderId": 123456789,
  "prompt": true,
  "reqId": "22170",
  "text": "If your order is not immediately executable, our systems may, depending on market conditions, reject your order if its limit price is more that the allowed amount away from the reference price at that time. If this happens, you will not receive a fill. This is a control designed to ensure that we comply with our regulatory obligations to avoid submitting disruptive orders to the marketplace.\nUse the Price Management Algo?",
  "type": "M"
}
```

**SDK 代码**

```python advancedOrderRejectPromptExample
import requests

url = "https://localhost:5000/v1/api/iserver/account/DU123456/orders"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript advancedOrderRejectPromptExample
const url = 'https://localhost:5000/v1/api/iserver/account/DU123456/orders';
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

```go advancedOrderRejectPromptExample
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/DU123456/orders"

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

```ruby advancedOrderRejectPromptExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/DU123456/orders")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java advancedOrderRejectPromptExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/DU123456/orders")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php advancedOrderRejectPromptExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/DU123456/orders', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp advancedOrderRejectPromptExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/DU123456/orders");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift advancedOrderRejectPromptExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/DU123456/orders")! as URL,
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