# 列出未成交订单

GET https://localhost:5000/v1/api/iserver/account/orders

返回未成交订单，以及当前经纪会话期间提交的已成交或已取消订单。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-orders/get-open-orders

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 请求

### 查询参数

- `filters` (enum, optional) — 使用逗号分隔的订单状态（Order Status）值列表过滤结果。也接受一个用于按时间对结果排序的值。
  - Allowed values: `inactive`, `pending_submit`, `pre_submitted`, `submitted`, `filled`, `pending_cancel`, `cancelled`, `warn_state`, `sort_by_time`
- `force` (boolean, optional) — 指示 IB 清除订单缓存并从经纪后端获取更新后的视图。响应将是一个空数组。

## 响应

### 200

特定账户的订单

- `orders` (list of LiveOrdersResponseOrdersItems, optional) — 当前仍在生效、或在当前经纪会话中已成交/已取消的订单数组。
- `snapshot` (boolean, optional) — 响应是否为快照。

## 错误

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

### LiveOrdersResponseOrdersItems

表示单个订单的对象。

- `account` (string, optional) — 下达订单的 IB 账户 ID。
- `acct` (string, optional) — 下达订单的 IB 账户 ID。
- `avgPrice` (string, optional) — 该订单成交的平均价格（如有）。
- `bgColor` (string, optional) — 内部使用。IB 界面的十六进制背景色。
- `cashCcy` (string, optional) — 订单现金数量（Cash Quantity）的货币（如适用）。
- `companyName` (string, optional) — 与金融工具关联的公司名称，或金融工具的描述。
- `conid` (string, optional) — 订单所涉金融工具的合约 ID。
- `conidex` (string, optional) — 合约 ID 和路由目的地，格式为 123456@EXCHANGE。
- `description1` (string, optional) — 描述性文本，或指明该金融工具的其他详细信息。
- `description2` (string, optional) — 仅适用于衍生品。显示到期日、行权价、期权类型（Right）和交易所信息。
- `exchange` (string, optional) — 订单的路由目的地。
- `fgColor` (string, optional) — 内部使用。IB 界面的十六进制前景色。
- `filledQuantity` (string, optional) — 以金融工具单位计的已成交数量。
- `isEventTrading` (enum, optional) — 指示订单是否为事件交易（Event Trading）订单。
  - Allowed values: `0`, `1`
- `lastExecutionTime` (string, optional) — 该订单最后一次成交的时间，格式为 YYMMDDhhmmss。
- `lastExecutionTime_r` (string, optional) — 该订单最后一次成交的 Unix 时间戳。
- `listingExchange` (string, optional) — 金融工具上市的交易所。
- `orderDesc` (string, optional) — 订单的人类可读简写形式。
- `orderId` (long, optional) — IB 分配的订单标识符。
- `orderType` (string, optional) — 生效中订单的订单类型。
- `order_cancellation_by_system_reason` (string, optional) — 仅适用于已取消订单。提供订单被系统取消或拒绝的原因。
- `order_ccp_status` (string, optional) — IB 内部订单状态。
- `origOrderType` (string, optional) — 已成交订单的订单类型。
- `price` (string, optional) — 订单价格（如该订单类型适用）。
- `remainingQuantity` (string, optional) — 以金融工具单位计的待成交剩余数量。
- `secType` (string, optional) — 金融工具的资产类别。
- `side` (string, optional) — 订单方向。
- `sizeAndFills` (string, optional) — 订单已成交数量与总数量的易读简写表示。
- `status` (enum, optional) — 订单的状态。
  - Allowed values: `Inactive`, `PendingSubmit`, `PreSubmitted`, `Submitted`, `Filled`, `PendingCancel`, `Cancelled`, `WarnState`
- `supportsTaxOpt` (enum, optional) — 指示订单是否受 IB 税务优化工具支持。
  - Allowed values: `0`, `1`
- `taxOptimizerId` (string, optional) — 税务优化器（Tax Optimizer）id，标识所选的税务批次集合，用于损益管理。
- `ticker` (string, optional) — 金融工具的代码或基础产品代码。
- `timeInForce` (string, optional) — 订单的有效期（Time in Force）。
- `totalCashSize` (string, optional) — 现金数量订单的总规模。
- `totalSize` (string, optional) — 以金融工具单位计的订单总规模。

## 示例

**响应**

```json
{
  "orders": [
    {
      "account": "DU4355398",
      "acct": "U1234567",
      "avgPrice": "0.8908",
      "bgColor": "#FFFFFF",
      "cashCcy": "CAD",
      "companyName": "Australian dollar",
      "conid": "15016138",
      "conidex": "15016138@IDEALPRO",
      "description1": "AUD.CAD",
      "exchange": "IDEALPRO",
      "fgColor": "#000000",
      "filledQuantity": "2499.99",
      "isEventTrading": "0",
      "lastExecutionTime": "240425160326",
      "lastExecutionTime_r": "1714061006000",
      "listingExchange": "FXCONV",
      "orderDesc": "Bought 2806.46 Limit 0.90000, Day",
      "orderId": 1370093238,
      "orderType": "Limit",
      "order_ccp_status": "Filled",
      "origOrderType": "LIMIT",
      "price": "0.90000",
      "remainingQuantity": "0",
      "secType": "CASH",
      "side": "BUY",
      "sizeAndFills": "2.4K CAD",
      "status": "Filled",
      "supportsTaxOpt": "0",
      "taxOptimizerId": "12334",
      "ticker": "AUD",
      "timeInForce": "CLOSE",
      "totalCashSize": "2500",
      "totalSize": "2806.46"
    }
  ],
  "snapshot": true
}
```

**SDK 代码**

```python orders
import requests

url = "https://localhost:5000/v1/api/iserver/account/orders"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript orders
const url = 'https://localhost:5000/v1/api/iserver/account/orders';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go orders
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/orders"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby orders
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/orders")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java orders
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/orders")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php orders
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/orders', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp orders
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/orders");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift orders
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/orders")! as URL,
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