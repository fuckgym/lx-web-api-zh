# 交易历史

POST https://localhost:5000/v1/api/pa/transactions
Content-Type: application/json

给定一组 conid 和账户的交易历史。交易类型包括股息支付、买入和卖出交易、划转。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-portfolio-analyst/get-transactions

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 请求体 (application/json)

该端点期望接收一个对象。

- `acctIds` (list of string, optional)
- `conids` (list of long, optional)
- `currency` (string, optional, default: USD) — 定义显示价格金额所用的货币。
- `days` (long, optional, default: 90) — 指定接收多少天的交易数据。

## 响应

### 200

一组详述合约信息的对象数组。

- `rc` (long, optional) — 仅供 Client Portal 内部使用
- `nd` (long, optional) — 仅供 Client Portal 内部使用
- `rpnl` (TransactionsResponseRpnl, optional) — 返回包含该合约在指定日期已实现盈亏的对象。
- `currency` (string, optional) — 返回账户交易所用的货币。
- `from` (long, optional) — 返回请求开始时间的 epoch 时间。
- `id` (string, optional) — 返回请求标识符，getTransactions。
- `to` (long, optional) — 返回请求结束时间的 epoch 时间。
- `includesRealTime` (boolean, optional) — 返回交易数据是否为最新。
- `transactions` (list of TransactionsResponseTransactionsItems, optional) — 列出所有受支持的交易值。

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

### TransactionsResponseRpnl

返回包含该合约在指定日期已实现盈亏的对象。

- `data` (list of any, optional) — 返回一个由已实现盈亏对象组成的数组。
- `items` (TransactionsResponseRpnlItems, optional)
- `amt` (string, optional) — 提供返回的所有天数的总盈亏金额

### TransactionsResponseTransactionsItems

- `date` (string, optional) — 返回该交易的人类可读日期时间。
- `cur` (string, optional) — 返回所交易金融工具的货币。
- `fxRate` (long, optional) — 返回外汇兑换汇率。
- `pr` (long, optional) — 返回该交易的每股价格。
- `qty` (long, optional) — 返回成交总数量。卖单显示负值，买单显示正值。
- `acctid` (string, optional) — 返回进行该交易的账户。
- `amt` (long, optional) — 返回该交易的总价值。
- `conid` (long, optional) — 返回合约标识符。
- `type` (string, optional) — 返回订单方向。
- `desc` (string, optional) — 返回公司的完整名称。

### TransactionsResponseRpnlItems

- `date` (string, optional) — 指定该交易的日期。
- `cur` (string, optional) — 指定已实现金额的货币。
- `fxRate` (long, optional) — 返回外汇汇率。
- `side` (enum, optional) — 确定当天是亏损还是盈利 * `L` - 亏损（LOSS） * `G` - 盈利（GAIN）
  - Allowed values: `L`, `G`
- `acctid` (string, optional) — 返回该交易发生的账户 ID。
- `amt` (string, optional) — 返回当天盈利或亏损的金额。
- `conid` (string, optional) — 返回该交易的合约 ID。

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "rc": 0,
  "nd": 4,
  "rpnl": {
    "data": [
      "string"
    ],
    "amt": "12.2516"
  },
  "currency": "USD",
  "from": 1702270800000,
  "id": "getTransactions",
  "to": 1702530000000,
  "includesRealTime": true,
  "transactions": [
    {
      "date": "Mon Dec 11 00:00:00 EST 2023",
      "cur": "USD",
      "fxRate": 1,
      "pr": 1,
      "qty": -5,
      "acctid": "U1234567",
      "amt": 1,
      "conid": 265598,
      "type": "Sell",
      "desc": "Apple Inc"
    }
  ]
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/pa/transactions"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/pa/transactions';
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

```go success
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/pa/transactions"

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

```ruby success
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/pa/transactions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/pa/transactions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/pa/transactions', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/pa/transactions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/pa/transactions")! as URL,
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