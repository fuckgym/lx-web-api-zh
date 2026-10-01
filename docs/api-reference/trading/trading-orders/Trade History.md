# 交易历史

GET https://localhost:5000/v1/api/iserver/account/trades

检索一份交易列表，最多可回溯至 7 天之前。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-orders/get-trade-history

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 查询参数

- `days` (long, optional) — 响应中包含此前天数的数据，最大为 7。如果省略，则仅返回当日的成交记录。

## 响应

### 200

交易

- `list of TradesResponseItems`

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

### TradesResponseItems

包含单笔成交详情的对象。

- `execution_id` (string, optional) — IB 分配的成交标识符。
- `symbol` (string, optional) — 该笔成交所涉金融工具的代码。
- `supports_tax_opt` (enum, optional) — 表示该订单是否受 IB 的税务优化（Tax Optimization）工具支持。
  - Allowed values: `0`, `1`
- `side` (enum, optional) — 成交方向。
  - Allowed values: `B`, `S`
- `order_description` (string, optional) — 对该笔成交结果的人类可读描述。
- `trade_time` (string, optional) — 该笔成交的 UTC 日期和时间，格式为 YYYYMMDD-hh:mm:ss。
- `trade_time_r` (long, optional) — 该笔成交时间的 Unix 时间戳（毫秒）。
- `size` (double, optional) — 以金融工具单位计的成交数量。
- `price` (string, optional) — 该笔成交的发生价格。
- `order_ref` (string, optional) — 客户提供的客户订单标识符。在 Web API 中于提交订单时通过 cOID 指定。
- `submitter` (string, optional) — 发起该笔成交所属订单单据（order ticket）的 IB 用户名。
- `exchange` (string, optional) — 该笔成交发生的交易所或其他交易场所。
- `commission` (string, optional) — 该笔成交产生的佣金。还可能包含
- `net_amount` (double, optional) — net_amount
- `account` (string, optional) — 接收该笔成交的账户的 IB 账户 ID。
- `accountCode` (string, optional) — 接收该笔成交的账户的 IB 账户 ID。
- `account_allocation_name` (string, optional) — 接收该笔成交的账户的 IB 账户 ID。
- `company_name` (string, optional) — 与该金融工具关联的企业名称，或该金融工具的描述。
- `contract_description_1` (string, optional) — 订单金融工具的人类可读描述。
- `sec_type` (enum, optional) — IB 资产类别标识符。
  - Allowed values: `STK`, `OPT`, `FUT`, `FOP`, `CASH`, `CRYPTO`, `BOND`, `WAR`, `FUND`
- `listing_exchange` (string, optional) — 该金融工具上市的主要交易所。
- `conid` (string, optional) — 订单金融工具的合约 ID。
- `conidEx` (string, optional) — 合约 ID 与路由目的地，格式为 123456@EXCHANGE。
- `clearing_id` (string, optional) — 为该笔交易清算的机构标识符。若账户由 Interactive Brokers 清算，则值为 "IB"。
- `clearing_name` (string, optional) — 为该笔交易清算的机构名称。若账户由 Interactive Brokers 清算，则值为 "IB"。
- `liquidation_trade` (enum, optional) — 表示该笔交易是否为 IB 强制平仓（liquidation）的结果。
  - Allowed values: `0`, `1`
- `is_event_trading` (enum, optional) — 表示该订单单据是否为事件交易（Event Trading）订单。
  - Allowed values: `0`, `1`
- `order_id` (long, optional) — 订单 ID

## 示例

**响应**

```json
[
  {
    "execution_id": "0000e0d5.6576fd38.01.01",
    "symbol": "AAPL",
    "supports_tax_opt": "1",
    "side": "S",
    "order_description": "Sold 5 @ 192.26 on ISLAND",
    "trade_time": "20231211-18:00:49",
    "trade_time_r": 1702317649000,
    "size": 5,
    "price": "192.26",
    "order_ref": "Order123",
    "submitter": "user1234",
    "exchange": "ISLAND",
    "commission": "1.01",
    "net_amount": 961.3,
    "account": "U1234567",
    "accountCode": "U1234567",
    "account_allocation_name": "U1234567",
    "company_name": "APPLE INC",
    "contract_description_1": "AAPL",
    "sec_type": "STK",
    "listing_exchange": "NASDAQ.NMS",
    "conid": "265598",
    "conidEx": "265598",
    "clearing_id": "IB",
    "clearing_name": "IB",
    "liquidation_trade": "0",
    "is_event_trading": "0",
    "order_id": 17437897932
  }
]
```

**SDK 代码**

```python tradesResponseExample
import requests

url = "https://localhost:5000/v1/api/iserver/account/trades"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript tradesResponseExample
const url = 'https://localhost:5000/v1/api/iserver/account/trades';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go tradesResponseExample
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/trades"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby tradesResponseExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/trades")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java tradesResponseExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/trades")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php tradesResponseExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/trades', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp tradesResponseExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/trades");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift tradesResponseExample
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/trades")! as URL,
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