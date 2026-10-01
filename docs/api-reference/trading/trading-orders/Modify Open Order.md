# 修改未成交订单

POST https://localhost:5000/v1/api/iserver/account/{accountId}/order/{orderId}
Content-Type: application/json

修改一笔已存在且未成交的订单。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-orders/modify-open-order

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway，默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱环境)

## 请求

### 路径参数

- `accountId` (string, required) — 该订单将清算至的账户。
- `orderId` (string, required) — 目标订单票据（order ticket）由 IB 分配的订单 ID。

### 请求体 (application/json)

此端点接受一个 singleOrderSubmissionRequest。

- `conid` (long, required) — 金融工具的 IB 合约 ID。
- `orderType` (string, required) — IB 订单类型标识符。
- `side` (enum, required) — 订单票据的方向。
  - Allowed values: `BUY`, `SELL`
- `tif` (enum, required) — 订单票据的有效期（Time in Force）。
  - Allowed values: `DAY`, `IOC`, `GTC`, `OPG`, `PAX`
- `quantity` (double, required) — 订单票据的数量，以金融工具的单位计。
- `acctId` (string, optional) — 订单票据的接收账户。
- `conidex` (string, optional) — 合约 ID 与路由目的地合在一起，格式为 123456@EXCHANGE。
- `secType` (string, optional) — IB 资产类别标识符。
- `cOID` (string, optional) — 客户端可配置的订单标识符。该值在 24 小时内必须唯一。该值长度不得超过 64 个字符。对于括号订单（bracket order）的子订单，不应设置此值。
- `parentId` (string, optional) — 如果订单票据是括号订单（bracket）中的子订单，则 parentId 字段必须设置为与为父订单提供的 cOID 相同。
- `listingExchange` (string, optional) — 金融工具的上市交易所。
- `isSingleGroup` (boolean, optional) — 指示所在数组中的所有订单都将被视为一个 OCA 组。
- `outsideRTH` (boolean, optional) — 指示 IB 允许该订单在常规交易时间之外执行。
- `allOrNone` (boolean, optional) — 指示 IB 要么全部执行该订单，要么完全不执行。
- `auxPrice` (double, optional) — 某些订单类型（如止损单）所使用的附加价格值。
- `ticker` (string, optional) — 金融工具的行情代码（ticker symbol）。
- `trailingAmt` (double, optional) — 与跟踪（Trailing）订单一起使用的偏移量。
- `trailingType` (enum, optional) — 指定跟踪订单所使用的跟踪类型。
  - Allowed values: `amt`, `%`
- `referrer` (string, optional) — 订单录入 UI 元素的 IB 内部标识符。
- `cashQty` (double, optional) — 现金数量订单所使用的货币数量。
- `useAdaptive` (boolean, optional) — 指示 IB 应用价格管理算法（Price Management Algo）。
- `isCcyConv` (boolean, optional) — 指示该外汇订单用于货币兑换，且（如适用）不应在账户中产生虚拟外汇持仓。
- `price` (double, optional) — 订单票据的价格（如适用）。
- `strategy` (string, optional) — 执行算法的名称。
- `strategyParameters` (SingleOrderSubmissionRequestStrategyParameters, optional) — 控制所选算法的参数（如适用）。
- `extOperator` (string, optional) — ExtOperator 用于标识外部操作者
- `manualIndicator` (boolean, optional) — 对于所有美国期货（US Futures）产品的订单，客户必须提交此标志，以指示订单是由人工发起（由自然人发起）还是自动发起（由无需人工干预即可传输订单的自动化交易系统发起）。提交 True 值表示人工发起的订单，提交 False 值表示自动订单。不含此字段的 USFUT 产品订单将被拒绝。
- `taxOptimizerId` (string, optional) — 标识所选的税务批次（tax lots）集合，用于损益管理。
- `jsonPayload` (SingleOrderSubmissionRequestJsonPayload, optional)

## 响应

### 200

提交状态

- `Trading Orders_modifyOpenOrder_Response_200`

## 错误

### 400 错误请求错误

缺少参数、参数为空、非数值或超出范围。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

缺少、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，当传入的请求无法被处理时返回。它有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，而只能在处理请求的后期才被检测出来。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，由于某个内部服务不可用导致请求耗时超过 10 秒，请求将被中止并返回此状态

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### SingleOrderSubmissionRequestStrategyParameters

控制所选算法的参数（如适用）。

- `PLACEHOLDER` (string, optional) — 占位符 -- 这些参数因算法而异（且类型并不总是 string，有时为 bool）

### SingleOrderSubmissionRequestJsonPayload

- `allocation_profile` (SingleOrderSubmissionRequestJsonPayloadAllocationProfile, optional) — 关于订单应如何在子账户之间进行分配的指定内容。

### orderSubmitError

表示订单回复消息或提交未被接受。

- `error` (string, optional) — 指示订单提交未成功的消息。

### advancedOrderReject

传递针对所提交订单票据被拒绝而生成的消息。在某些情况下，它还可能提供一种机制，在提示作出决策后重新提交同一订单。

- `orderId` (long, optional) — IB 分配给被拒绝订单票据的订单 ID。
- `reqId` (string, optional) — 分配给所返回消息的 IB 内部标识符。
- `dismissable` (list of any, optional) — 指示此提示是否可关闭。
- `text` (string, optional) — IB 针对订单提交所发出消息的人类可读文本。
- `options` (list of string, optional) — 针对拒绝消息，客户端可选择的选项。
- `type` (string, optional) — 所返回消息的具体类型。
- `messageId` (string, optional) — 所返回消息的性质或类别的 IB 内部标识符。
- `prompt` (boolean, optional) — 指示该消息是一个提供一组决策的提示，其中一项或多项决策可能允许被拒绝的订单被重新提交。

### SingleOrderSubmissionRequestJsonPayloadAllocationProfile

关于订单应如何在子账户之间进行分配的指定内容。

- `alloc_type` (enum, optional) — 用于定义股份应如何分配的分配类型。需要预先批准的警告消息。* `SHARE` - 将分配金额指定为股份的数量。* `CASH` - 将分配金额指定为要分配的现金数量。
  - Allowed values: `SHARE`, `CASH`
- `allocations` (list of SingleOrderSubmissionRequestJsonPayloadAllocationProfileAllocationsItems, optional) — 要为其分配交易的账户及相关数量的列表。

### SingleOrderSubmissionRequestJsonPayloadAllocationProfileAllocationsItems

- `account` (string, optional) — 要向其分配交易的账户。
- `amount` (double, optional) — 基于 alloc_type 分配给给定账户的数量。

## 示例

### orderModifySuccessExample

**请求**

```json
{
  "conid": 1,
  "orderType": "string",
  "side": "BUY",
  "tif": "DAY",
  "quantity": 1.1
}
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

```python orderModifySuccessExample
import requests

url = "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559"

payload = {
    "conid": 1,
    "orderType": "string",
    "side": "BUY",
    "tif": "DAY",
    "quantity": 1.1
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript orderModifySuccessExample
const url = 'https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"conid":1,"orderType":"string","side":"BUY","tif":"DAY","quantity":1.1}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go orderModifySuccessExample
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559"

	payload := strings.NewReader("{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}")

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

```ruby orderModifySuccessExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}"

response = http.request(request)
puts response.read_body
```

```java orderModifySuccessExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}")
  .asString();
```

```php orderModifySuccessExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559', [
  'body' => '{
  "conid": 1,
  "orderType": "string",
  "side": "BUY",
  "tif": "DAY",
  "quantity": 1.1
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp orderModifySuccessExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift orderModifySuccessExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "conid": 1,
  "orderType": "string",
  "side": "BUY",
  "tif": "DAY",
  "quantity": 1.1
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")! as URL,
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
{
  "conid": 1,
  "orderType": "string",
  "side": "BUY",
  "tif": "DAY",
  "quantity": 1.1
}
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

url = "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559"

payload = {
    "conid": 1,
    "orderType": "string",
    "side": "BUY",
    "tif": "DAY",
    "quantity": 1.1
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript orderReplyMessageExample
const url = 'https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"conid":1,"orderType":"string","side":"BUY","tif":"DAY","quantity":1.1}'
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

	url := "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559"

	payload := strings.NewReader("{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}")

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

url = URI("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}"

response = http.request(request)
puts response.read_body
```

```java orderReplyMessageExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}")
  .asString();
```

```php orderReplyMessageExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559', [
  'body' => '{
  "conid": 1,
  "orderType": "string",
  "side": "BUY",
  "tif": "DAY",
  "quantity": 1.1
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp orderReplyMessageExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift orderReplyMessageExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "conid": 1,
  "orderType": "string",
  "side": "BUY",
  "tif": "DAY",
  "quantity": 1.1
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")! as URL,
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

### orderModifyErrorExample

**请求**

```json
{
  "conid": 1,
  "orderType": "string",
  "side": "BUY",
  "tif": "DAY",
  "quantity": 1.1
}
```

**响应**

```json
{
  "error": "OrderID 123456 doesn't exist"
}
```

**SDK 代码**

```python orderModifyErrorExample
import requests

url = "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559"

payload = {
    "conid": 1,
    "orderType": "string",
    "side": "BUY",
    "tif": "DAY",
    "quantity": 1.1
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript orderModifyErrorExample
const url = 'https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"conid":1,"orderType":"string","side":"BUY","tif":"DAY","quantity":1.1}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go orderModifyErrorExample
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559"

	payload := strings.NewReader("{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}")

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

```ruby orderModifyErrorExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}"

response = http.request(request)
puts response.read_body
```

```java orderModifyErrorExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}")
  .asString();
```

```php orderModifyErrorExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559', [
  'body' => '{
  "conid": 1,
  "orderType": "string",
  "side": "BUY",
  "tif": "DAY",
  "quantity": 1.1
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp orderModifyErrorExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift orderModifyErrorExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "conid": 1,
  "orderType": "string",
  "side": "BUY",
  "tif": "DAY",
  "quantity": 1.1
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")! as URL,
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
{
  "conid": 1,
  "orderType": "string",
  "side": "BUY",
  "tif": "DAY",
  "quantity": 1.1
}
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

url = "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559"

payload = {
    "conid": 1,
    "orderType": "string",
    "side": "BUY",
    "tif": "DAY",
    "quantity": 1.1
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript advancedOrderRejectPromptExample
const url = 'https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"conid":1,"orderType":"string","side":"BUY","tif":"DAY","quantity":1.1}'
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

	url := "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559"

	payload := strings.NewReader("{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}")

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

url = URI("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}"

response = http.request(request)
puts response.read_body
```

```java advancedOrderRejectPromptExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}")
  .asString();
```

```php advancedOrderRejectPromptExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559', [
  'body' => '{
  "conid": 1,
  "orderType": "string",
  "side": "BUY",
  "tif": "DAY",
  "quantity": 1.1
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp advancedOrderRejectPromptExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"conid\": 1,\n  \"orderType\": \"string\",\n  \"side\": \"BUY\",\n  \"tif\": \"DAY\",\n  \"quantity\": 1.1\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift advancedOrderRejectPromptExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "conid": 1,
  "orderType": "string",
  "side": "BUY",
  "tif": "DAY",
  "quantity": 1.1
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")! as URL,
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