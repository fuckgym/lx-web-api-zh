# 可用资金汇总

GET https://localhost:5000/v1/api/iserver/account/{accountId}/summary/available_funds

提供专门针对可用资金的汇总，比标准 /summary 端点更为深入。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-accounts/get-fund-summary

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 请求

### 路径参数

- `accountId` (string, required)

## 响应

### 200

表示成功返回可用资金。

- `total` (AvailableFundsResponseTotal, optional) — 总计值
- `Crypto at Paxos` (funds, optional) — 包含商品特定的资金数值。
- `commodities` (funds, optional) — 包含商品特定的资金数值。
- `securities` (AvailableFundsResponseSecurities, optional) — 包含证券特定资金数值的概览。

## 错误

### 400 错误请求

错误请求；传入的输入未能通过初始校验，并被立即检测出来。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 503 服务不可用错误

服务不可用。例如，当由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### AvailableFundsResponseTotal

总计值

- `current_available` (string, optional) — 描述您账户中当前可用于交易的资金。
- `current_excess` (string, optional) — 描述账户的总价值。
- `Prdctd Pst-xpry Excss` (string, optional) — 显示预测的到期后账户价值。
- `Lk Ahd Avlbl Fnds` (string, optional) — 该值反映下次保证金调整时的可用资金。
- `Lk Ahd Excss Lqdty` (string, optional) — * `Securities` - 具有贷款价值的权益。预期维持保证金。* `Commodities` - 净清算价值。预期维持保证金。
- `overnight_available` (string, optional) — 描述可用于隔夜交易的资金。
- `overnight_excess` (string, optional) — 隔夜指当地市场交易日收盘后的时间窗口。* `Securities` - 等同于常规交易时段。* `Commodities` - 商品净清算价值。隔夜维持保证金。
- `buying_power` (string, optional) — 描述账户的总购买力，包括现有余额与保证金。
- `leverage` (string, optional) — 描述总合并杠杆。
- `Lk Ahd Nxt Chng` (string, optional) — 描述下次“预期”（Look Ahead）计算将何时进行。
- `day_trades_left` (string, optional) — 描述在被标记为日内交易者（Pattern Day Trader）状态之前剩余的交易次数。对于已有的日内交易者，使用 "Unlimited"。

### funds

包含商品特定的资金数值。

- `current_available` (string, optional) — 描述您账户中当前可用于交易的资金。
- `current_excess` (string, optional) — 描述账户的总价值。
- `Prdctd Pst-xpry Excss` (string, optional) — 显示预测的到期后账户价值。
- `Lk Ahd Avlbl Fnds` (string, optional) — 该值反映下次保证金调整时的可用资金。
- `overnight_available` (string, optional) — 描述可用于隔夜交易的资金。
- `overnight_excess` (string, optional) — 隔夜指当地市场交易日收盘后的时间窗口。* `Securities` - 等同于常规交易时段。* `Commodities` - 商品净清算价值。隔夜维持保证金。

### AvailableFundsResponseSecurities

包含证券特定资金数值的概览。

- `current_available` (string, optional) — 描述您账户中当前可用于交易的资金。
- `current_excess` (string, optional) — 描述账户的总价值。
- `Prdctd Pst-xpry Excss` (string, optional) — 显示预测的到期后账户价值。
- `SMA` (string, optional)
- `Lk Ahd Avlbl Fnds` (string, optional) — 该值反映下次保证金调整时的可用资金。
- `Lk Ahd Excss Lqdty` (string, optional) — * `Securities` - 具有贷款价值的权益。预期维持保证金。* `Commodities` - 净清算价值。预期维持保证金。
- `overnight_available` (string, optional) — 描述可用于隔夜交易的资金。
- `overnight_excess` (string, optional) — 隔夜指当地市场交易日收盘后的时间窗口。* `Securities` - 等同于常规交易时段。* `Commodities` - 商品净清算价值。隔夜维持保证金。
- `leverage` (string, optional) — 描述总合并杠杆。

## 示例

**响应**

```json
{
  "total": {
    "current_available": "825,208 USD",
    "current_excess": "826,089 USD",
    "Prdctd Pst-xpry Excss": "0 USD",
    "Lk Ahd Avlbl Fnds": "821,067 USD",
    "Lk Ahd Excss Lqdty": "822,324 USD",
    "overnight_available": "821,067 USD",
    "overnight_excess": "822,324 USD",
    "buying_power": "3,304,346 USD",
    "leverage": "n/a",
    "Lk Ahd Nxt Chng": "@ 16:00:00",
    "day_trades_left": "Unlimited",
    "SMA": "368,538 USD"
  },
  "Crypto at Paxos": {
    "current_available": "0 USD",
    "current_excess": "0 USD",
    "Prdctd Pst-xpry Excss": "0 USD",
    "Lk Ahd Avlbl Fnds": "0 USD",
    "overnight_available": "0 USD",
    "overnight_excess": "0 USD",
    "Lk Ahd Excss Lqdty": "0 USD"
  },
  "commodities": {
    "current_available": "22,483 USD",
    "current_excess": "23,361 USD",
    "Prdctd Pst-xpry Excss": "0 USD",
    "Lk Ahd Avlbl Fnds": "18,342 USD",
    "overnight_available": "18,342 USD",
    "overnight_excess": "19,597 USD",
    "Lk Ahd Excss Lqdty": "19,597 USD"
  },
  "securities": {
    "current_available": "802,725 USD",
    "current_excess": "802,727 USD",
    "Prdctd Pst-xpry Excss": "0 USD",
    "SMA": "368,538 USD",
    "Lk Ahd Avlbl Fnds": "802,725 USD",
    "Lk Ahd Excss Lqdty": "802,727 USD",
    "overnight_available": "802,725 USD",
    "overnight_excess": "802,727 USD",
    "leverage": "1.43"
  }
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/iserver/account/U1234567/summary/available_funds"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/iserver/account/U1234567/summary/available_funds';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

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
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/U1234567/summary/available_funds"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://localhost:5000/v1/api/iserver/account/U1234567/summary/available_funds")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/U1234567/summary/available_funds")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/U1234567/summary/available_funds', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/U1234567/summary/available_funds");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/U1234567/summary/available_funds")! as URL,
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