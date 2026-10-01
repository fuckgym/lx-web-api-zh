# 单个订单的状态

GET https://localhost:5000/v1/api/iserver/account/order/status/{orderId}

检索单个订单的状态。仅显示当前经纪会话中的订单。如果订单是在之前的日期或会话中执行的，查询将返回 503 错误。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-orders/get-order-status

## 认证

- `Authorization` 请求头（bearer token，required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 路径参数

- `orderId` (string, required)

## 响应

### 200

订单状态

- `Trading Orders_getOrderStatus_Response_200`

## 错误

### 400 错误请求

参数缺失、为空、非数值或超出范围。`error` 字段始终带有 `Bad Request:` 前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

授权令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

服务器内部错误，在无法处理传入请求时返回。有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，且只能在处理请求的后续阶段才能检测出来。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 类型

### orderStatus

包含订单凭单（order ticket）状态信息的对象。

- `sub_type` (string, optional, nullable) — 仅限内部使用。
- `request_id` (string, optional) — 仅限内部使用。IB 分配的状态请求标识符。
- `server_id` (string, optional) — IB 分配的元标识符，用于在服务器提示（Server Prompts）之后关联被拒绝和重新提交的订单。
- `order_id` (long, optional) — 订单的 IB 分配订单标识符，即请求路径中提供的值。
- `conidex` (string, optional) — 合约 ID 和路由目的地，格式为 123456@EXCHANGE。
- `conid` (long, optional) — 订单金融工具的合约 ID。
- `symbol` (string, optional) — 订单凭单金融工具的代码。
- `side` (enum, optional) — 订单凭单的方向。
  - Allowed values: `BUY`, `SELL`
- `contract_description_1` (string, optional) — 订单金融工具的人类可读描述。
- `listing_exchange` (string, optional) — 订单凭单金融工具的主上市交易所。
- `option_acct` (string, optional) — 仅限内部使用。
- `company_name` (string, optional) — 与该金融工具关联的公司或资产名称。
- `size` (string, optional) — 订单凭单剩余未成交数量。如果订单已全部成交、已取消或以其他方式终结且不再生效，将显示为 0.0。
- `total_size` (string, optional) — 订单凭单的总数量。
- `currency` (string, optional) — 该金融工具交易及成交所用货币。
- `account` (string, optional) — 接收该订单凭单成交的账户。
- `order_type` (string, optional) — 订单的 IB 订单类型。
- `cum_fill` (string, optional) — 该金融工具针对订单凭单的累计成交数量。
- `order_status` (enum, optional) — 订单凭单的状态。
  - Allowed values: `Inactive`, `PendingSubmit`, `PreSubmitted`, `Submitted`, `Filled`, `PendingCancel`, `Cancelled`, `WarnState`
- `order_ccp_status` (string, optional) — IB 内部订单状态。
- `order_status_description` (string, optional) — 订单状态的人类可读表述，用于 UI 展示。
- `tif` (enum, optional) — 订单凭单的有效期（Time in force）。
  - Allowed values: `DAY`, `IOC`, `GTC`, `OPG`, `PAX`
- `fgColor` (string, optional) — 内部使用。IB UI 的十六进制前景色。
- `bgColor` (string, optional) — 内部使用。IB UI 的十六进制背景色。
- `order_not_editable` (boolean, optional) — 表示订单凭单是否可修改。
- `editable_fields` (string, optional) — 表示订单凭单当前可修改的字段。
- `cannot_cancel_order` (boolean, optional) — 表示订单凭单能否被取消。
- `deactivate_order` (boolean, optional) — 表示订单凭单能否被停用。
- `sec_type` (enum, optional) — IB 资产类别标识符。
  - Allowed values: `STK`, `OPT`, `FUT`, `FOP`, `CASH`, `CRYPTO`, `BOND`, `WAR`, `FUND`
- `available_chart_periods` (string, optional) — 内部使用。表示该金融工具可用的图表周期。
- `order_description` (string, optional) — 订单凭单状态或当前结果的人类可读描述，用于 UI 展示。
- `order_description_with_contract` (string, optional) — 订单凭单状态或当前结果的人类可读描述，用于 UI 展示。包含金融工具名称。
- `alert_active` (enum, optional) — 表示订单凭单存在处于活动状态的警报。
  - Allowed values: `0`, `1`
- `child_order_type` (enum, optional) — 表示订单凭单是否对冲，若对冲，以何种方式。0 = 无对冲，A = 附带子对冲订单，B = Beta/投资组合对冲
  - Allowed values: `0`, `A`, `B`
- `order_clearing_account` (string, optional) — 订单凭单的 IB 清算账户。
- `size_and_fills` (string, optional) — 反映订单累计成交数量与总规模的字符串。
- `exit_strategy_display_price` (string, optional) — 内部使用。与 Client Portal 退出策略关联的 UI 显示价格。
- `exit_strategy_chart_description` (string, optional) — 内部使用。描述处于活动状态的 Client Portal 退出策略或其执行结果的字符串。
- `average_price` (string, optional) — 订单成交的平均价格（如有）。
- `exit_strategy_tool_availability` (string, optional) — 内部使用。表示该订单的 Client Portal 退出策略工具可用性。
- `allowed_duplicate_opposite` (boolean, optional) — 表示能否在相反方向下达完全相同的订单。
- `order_time` (string, optional) — 订单提交时间，格式为 YYMMDDhhmmss。

## 示例

**响应**

```json
{
  "account": "U1234567",
  "alert_active": 1,
  "allowed_duplicate_opposite": true,
  "available_chart_periods": "#R|1",
  "average_price": "192.26",
  "bg_color": "#000000",
  "cannot_cancel_order": true,
  "child_order_type": "0",
  "company_name": "APPLE INC",
  "conid": 265598,
  "conidex": "265598",
  "contract_description_1": "AAPL",
  "cum_fill": "5.0",
  "currency": "USD",
  "deactivate_order": false,
  "editable_fields": "",
  "exit_strategy_chart_description": "Sold 5 @ 192.26",
  "exit_strategy_display_price": "193.12",
  "exit_strategy_tool_availability": "1",
  "fg_color": "#FFFFFF",
  "listing_exchange": "NASDAQ.NMS",
  "option_acct": "c",
  "order_ccp_status": "2",
  "order_clearing_account": "U1234567",
  "order_description": "Sold 5 Market, Day",
  "order_description_with_contract": "Sold 5 AAPL Market, Day",
  "order_id": 1799796559,
  "order_not_editable": true,
  "order_status": "Filled",
  "order_status_description": "Order Filled",
  "order_time": "231211180049",
  "order_type": "MARKET",
  "request_id": "209",
  "sec_type": "STK",
  "server_id": "0",
  "side": "BUY",
  "size": "0.0",
  "size_and_fills": "5",
  "sub_type": null,
  "symbol": "AAPL",
  "tif": "DAY",
  "total_size": "5.0"
}
```

**SDK 代码**

```python orderStatusExample
import requests

url = "https://localhost:5000/v1/api/iserver/account/order/status/1799796559"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript orderStatusExample
const url = 'https://localhost:5000/v1/api/iserver/account/order/status/1799796559';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go orderStatusExample
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/order/status/1799796559"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby orderStatusExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/order/status/1799796559")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java orderStatusExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/order/status/1799796559")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php orderStatusExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/order/status/1799796559', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp orderStatusExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/order/status/1799796559");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift orderStatusExample
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/order/status/1799796559")! as URL,
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