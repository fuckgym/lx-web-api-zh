# 账户市值汇总

GET https://localhost:5000/v1/api/iserver/account/{accountId}/summary/market_value

按货币和资产类别返回账户的市值汇总。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-accounts/get-account-market-summary

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

表示市值请求成功。

- `currency` (SummaryMarketValueResponseCurrency, optional) — 返回一个对象，包含该货币以及以该货币持有的持仓的市值详情。

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

### SummaryMarketValueResponseCurrency

返回一个对象，包含该货币以及以该货币持有的持仓的市值详情。

- `total_cash` (string, optional) — 列出给定货币持有的现金总额。
- `settled_cash` (string, optional) — 结算时确认的现金，减去交易时的买入支出、佣金、税费。
- `MTD Interest` (string, optional) — 本月至今的利息总额。
- `stock` (string, optional) — 持有股票的现金价值总额。
- `options` (string, optional) — 持有期权的现金价值总额。
- `futures` (string, optional) — 持有期货的现金价值总额。
- `future_options` (string, optional) — 持有期货期权的现金价值总额。
- `funds` (string, optional) — 持有基金的现金价值总额。
- `dividends_receivable` (string, optional) — 应收股息的现金价值总额。
- `mutual_funds` (string, optional) — 持有共同基金的现金价值总额。
- `money_market` (string, optional) — 持有货币市场证券的现金价值总额。
- `bonds` (string, optional) — 持有债券的现金价值总额。
- `Govt Bonds` (string, optional) — 持有政府债券的现金价值总额。
- `t_bills` (string, optional) — 持有短期国库券的现金价值总额。
- `warrants` (string, optional) — 持有认股权证的现金价值总额。
- `issuer_option` (string, optional) — 持有发行人期权的现金价值总额。
- `commodity` (string, optional) — 持有商品的现金价值总额。
- `Notional CFD` (string, optional) — 持有名目 CFD 的现金价值总额。
- `cfd` (string, optional) — 持有 CFD 的现金价值总额。
- `Cryptocurrency` (string, optional) — 持有加密货币的现金价值总额。
- `net_liquidation` (string, optional) — 净清算价值的现金价值总额。
- `unrealized_pnl` (string, optional) — 每日未实现盈亏总额。
- `realized_pnl` (string, optional) — 每日已实现盈亏总额。
- `Exchange Rate` (string, optional) — 所标注货币兑换基础货币的汇率。

## 示例

**响应**

```json
{
  "EUR": {
    "Cryptocurrency": "0",
    "Exchange Rate": "1.092525",
    "Govt Bonds": "0",
    "MTD Interest": "0",
    "Notional CFD": "0",
    "bonds": "0",
    "cfd": "0",
    "commodity": "0",
    "dividends_receivable": "0",
    "funds": "0",
    "future_options": "0",
    "futures": "0",
    "issuer_option": "0",
    "money_market": "0",
    "mutual_funds": "0",
    "net_liquidation": "194",
    "options": "0",
    "realized_pnl": "0",
    "settled_cash": "194",
    "stock": "0",
    "t_bills": "0",
    "total_cash": "194",
    "unrealized_pnl": "0",
    "warrants": "0"
  },
  "HKD": {
    "Cryptocurrency": "0",
    "Exchange Rate": "0.1278515",
    "Govt Bonds": "0",
    "MTD Interest": "0",
    "Notional CFD": "0",
    "bonds": "0",
    "cfd": "0",
    "commodity": "0",
    "dividends_receivable": "0",
    "funds": "0",
    "future_options": "0",
    "futures": "0",
    "issuer_option": "0",
    "money_market": "0",
    "mutual_funds": "0",
    "net_liquidation": "19,441",
    "options": "0",
    "realized_pnl": "0",
    "settled_cash": "0",
    "stock": "19,441",
    "t_bills": "0",
    "total_cash": "0",
    "unrealized_pnl": "4,857",
    "warrants": "0"
  },
  "JPY": {
    "Cryptocurrency": "0",
    "Exchange Rate": "0.0068052",
    "Govt Bonds": "0",
    "MTD Interest": "0",
    "Notional CFD": "0",
    "bonds": "0",
    "cfd": "0",
    "commodity": "0",
    "dividends_receivable": "0",
    "funds": "0",
    "future_options": "0",
    "futures": "0",
    "issuer_option": "0",
    "money_market": "0",
    "mutual_funds": "0",
    "net_liquidation": "14,781",
    "options": "0",
    "realized_pnl": "0",
    "settled_cash": "14,781",
    "stock": "0",
    "t_bills": "0",
    "total_cash": "14,781",
    "unrealized_pnl": "0",
    "warrants": "0"
  },
  "Total (in USD)": {
    "Cryptocurrency": "0",
    "Exchange Rate": "1.00",
    "Govt Bonds": "0",
    "MTD Interest": "-549",
    "Notional CFD": "0",
    "bonds": "0",
    "cfd": "0",
    "commodity": "0",
    "dividends_receivable": "0",
    "funds": "0",
    "future_options": "0",
    "futures": "-212",
    "issuer_option": "0",
    "money_market": "0",
    "mutual_funds": "0",
    "net_liquidation": "1,291,959",
    "options": "0",
    "realized_pnl": "0",
    "settled_cash": "-401,646",
    "stock": "1,694,154",
    "t_bills": "0",
    "total_cash": "-401,646",
    "unrealized_pnl": "253,896",
    "warrants": "0"
  },
  "USD": {
    "Cryptocurrency": "0",
    "Exchange Rate": "1.00",
    "Govt Bonds": "0",
    "MTD Interest": "-549",
    "Notional CFD": "0",
    "bonds": "0",
    "cfd": "0",
    "commodity": "0",
    "dividends_receivable": "0",
    "funds": "0",
    "future_options": "0",
    "futures": "-212",
    "issuer_option": "0",
    "money_market": "0",
    "mutual_funds": "0",
    "net_liquidation": "1,289,161",
    "options": "0",
    "realized_pnl": "0",
    "settled_cash": "-401,958",
    "stock": "1,691,668",
    "t_bills": "0",
    "total_cash": "-401,958",
    "unrealized_pnl": "253,275",
    "warrants": "0"
  }
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/iserver/account/U1234567/summary/market_value"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/iserver/account/U1234567/summary/market_value';
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

	url := "https://localhost:5000/v1/api/iserver/account/U1234567/summary/market_value"

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

url = URI("https://localhost:5000/v1/api/iserver/account/U1234567/summary/market_value")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/U1234567/summary/market_value")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/U1234567/summary/market_value', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/U1234567/summary/market_value");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/U1234567/summary/market_value")! as URL,
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