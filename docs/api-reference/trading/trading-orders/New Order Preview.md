# 新订单预览

POST https://localhost:5000/v1/api/iserver/account/{accountId}/orders/whatif
Content-Type: application/json

预览订单票据（order ticket）或订单括号组合（bracket）的预计影响，包括成本以及保证金和账户权益的变化。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-orders/preview-margin-impact

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 路径参数

- `accountId` (string, required) — 订单将进行清算的账户。

### 请求体 (application/json)

该端点预期接收一个 ordersSubmissionRequest。

- `orders` (list of singleOrderSubmissionRequest, optional) — 订单票据对象数组。除非构建括号（bracket）订单，否则每个请求只能提交一个订单票据对象。

## 响应

### 200

订单预览

- `amount` (OrderPreviewAmount, optional) — 描述与订单票据相关的预计成本。
- `equity` (OrderPreviewEquity, optional) — 描述账户权益的预计变化。
- `initial` (OrderPreviewInitial, optional) — 描述初始保证金的预计变化。
- `maintenance` (OrderPreviewMaintenance, optional) — 描述维持保证金的预计变化。
- `position` (OrderPreviewPosition, optional) — 描述账户在该金融工具上持仓的预计变化。
- `warn` (string, optional) — 警告消息的人类可读文本（如适用）。否则为 null。
- `error` (string, optional, nullable) — 错误消息的人类可读文本（如适用）。否则为 null。

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

### singleOrderSubmissionRequest

单个订单票据。

- `conid` (long, required) — 金融工具的 IB 合约 ID。
- `orderType` (string, required) — IB 订单类型标识符。
- `side` (enum, required) — 订单票据的方向。
  - Allowed values: `BUY`, `SELL`
- `tif` (enum, required) — 订单票据的有效期。
  - Allowed values: `DAY`, `IOC`, `GTC`, `OPG`, `PAX`
- `quantity` (double, required) — 以金融工具单位计的订单票据数量。
- `acctId` (string, optional) — 订单票据的接收账户。
- `conidex` (string, optional) — 合约 ID 与路由目的地的组合，格式为 123456@EXCHANGE。
- `secType` (string, optional) — IB 资产类别标识符。
- `cOID` (string, optional) — 客户端可配置的订单标识符。该值在 24 小时内必须唯一。该值长度不得超过 64 个字符。括号订单的子订单不应设置此值。
- `parentId` (string, optional) — 如果订单票据是括号（bracket）中的子订单，则 parentId 字段必须设置为与父订单所提供的 cOID 相等。
- `listingExchange` (string, optional) — 金融工具的上市交易所。
- `isSingleGroup` (boolean, optional) — 指示所含数组中的所有订单将被视为一个 OCA 组。
- `outsideRTH` (boolean, optional) — 指示 IB 允许该订单在常规交易时段之外执行。
- `allOrNone` (boolean, optional) — 指示 IB 要么全部执行该订单，要么完全不执行。
- `auxPrice` (double, optional) — 某些订单类型（如止损订单）所使用的附加价格值。
- `ticker` (string, optional) — 金融工具的股票代码。
- `trailingAmt` (double, optional) — 与追踪（Trailing）订单一起使用的偏移量。
- `trailingType` (enum, optional) — 指定追踪订单所使用的追踪类型。
  - Allowed values: `amt`, `%`
- `referrer` (string, optional) — 用于订单录入 UI 元素的 IB 内部标识符。
- `cashQty` (double, optional) — 与现金数量订单一起使用的货币数量。
- `useAdaptive` (boolean, optional) — 指示 IB 应用价格管理算法（Price Management Algo）。
- `isCcyConv` (boolean, optional) — 指示该外汇订单用于货币兑换，并且在适用情况下不应在账户中产生虚拟外汇持仓。
- `price` (double, optional) — 订单票据的价格（如适用）。
- `strategy` (string, optional) — 执行算法的名称。
- `strategyParameters` (SingleOrderSubmissionRequestStrategyParameters, optional) — 管理所选算法的参数（如适用）。
- `extOperator` (string, optional) — ExtOperator 用于标识外部操作者
- `manualIndicator` (boolean, optional) — 对于所有美国期货产品的订单，客户必须提交此标志，以指示订单是由人工（自然人）发起，还是由自动交易系统（无需人工干预即传送订单）自动发起。提交 True 值表示人工发起的订单，提交 False 值表示自动订单。不含此字段的 USFUT 产品订单将被拒绝。
- `taxOptimizerId` (string, optional) — 标识所选的税务批次（tax lots）集合，用于损益管理。
- `jsonPayload` (SingleOrderSubmissionRequestJsonPayload, optional)

### OrderPreviewAmount

描述与订单票据相关的预计成本。

- `amount` (string, optional) — 订单的预计成本，即当前参考价格乘以总数量。
- `commission` (string, optional) — 与订单相关的预计佣金和费用。
- `total` (string, optional) — 订单的预计成本与佣金值之和。

### OrderPreviewEquity

描述账户权益的预计变化。

- `current` (string, optional) — 当前权益。
- `change` (string, optional) — 当前权益值与预计权益值之间的差额。
- `after` (string, optional) — 订单执行后的预计权益。

### OrderPreviewInitial

描述初始保证金的预计变化。

- `current` (string, optional) — 当前初始保证金。
- `change` (string, optional) — 当前初始保证金值与预计初始保证金值之间的差额。
- `after` (string, optional) — 订单执行后的预计初始保证金。

### OrderPreviewMaintenance

描述维持保证金的预计变化。

- `current` (string, optional) — 当前维持保证金。
- `change` (string, optional) — 当前维持保证金值与预计维持保证金值之间的差额。
- `after` (string, optional) — 订单执行后的预计维持保证金。

### OrderPreviewPosition

描述账户在该金融工具上持仓的预计变化。

- `current` (string, optional) — 该金融工具的当前持仓。
- `change` (string, optional) — 当前持仓规模与预计持仓规模之间的差额。
- `after` (string, optional) — 订单执行后的预计持仓规模。

### SingleOrderSubmissionRequestStrategyParameters

管理所选算法的参数（如适用）。

- `PLACEHOLDER` (string, optional) — 占位符 -- 这些参数因算法而异（且类型并不总是字符串，有时为布尔值）

### SingleOrderSubmissionRequestJsonPayload

- `allocation_profile` (SingleOrderSubmissionRequestJsonPayloadAllocationProfile, optional) — 订单应如何在各子账户之间进行分配的指定内容。

### SingleOrderSubmissionRequestJsonPayloadAllocationProfile

订单应如何在各子账户之间进行分配的指定内容。

- `alloc_type` (enum, optional) — 定义股份分配方式的分配类型。需要预先批准的警告消息。* `SHARE` - 将分配金额指定为股份数量。* `CASH` - 将分配金额指定为要分配的现金数量。
  - Allowed values: `SHARE`, `CASH`
- `allocations` (list of SingleOrderSubmissionRequestJsonPayloadAllocationProfileAllocationsItems, optional) — 要分配交易的账户列表及相应的数量。

### SingleOrderSubmissionRequestJsonPayloadAllocationProfileAllocationsItems

- `account` (string, optional) — 接收交易分配的账户。
- `amount` (double, optional) — 基于 alloc_type 分配给给定账户的金额。

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "amount": {
    "amount": "1,977.60 USD (10 Shares)",
    "commission": "1 USD",
    "total": "1,978.60 USD"
  },
  "equity": {
    "current": "123,456",
    "change": "-1",
    "after": "123,455"
  },
  "initial": {
    "current": "1000",
    "change": "652",
    "after": "1652"
  },
  "maintenance": {
    "current": "900",
    "change": "590\"\"",
    "after": "1490"
  },
  "position": {
    "current": "20",
    "change": "10",
    "after": "30"
  },
  "warn": "21/You are trying to submit an order without having market data for this instrument. \nIB strongly recommends against this kind of blind trading which may result in \nerroreous or unexpected trades.",
  "error": null
}
```

**SDK 代码**

```python orderPreview
import requests

url = "https://localhost:5000/v1/api/iserver/account/DU123456/orders/whatif"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript orderPreview
const url = 'https://localhost:5000/v1/api/iserver/account/DU123456/orders/whatif';
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

```go orderPreview
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/DU123456/orders/whatif"

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

```ruby orderPreview
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/DU123456/orders/whatif")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java orderPreview
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/DU123456/orders/whatif")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php orderPreview
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/DU123456/orders/whatif', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp orderPreview
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/DU123456/orders/whatif");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift orderPreview
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/DU123456/orders/whatif")! as URL,
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