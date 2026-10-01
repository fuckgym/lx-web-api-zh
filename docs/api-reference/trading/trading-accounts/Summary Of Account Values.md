# 账户价值摘要

GET https://localhost:5000/v1/api/iserver/account/{accountId}/summary

提供账户详情的总体概览，例如余额数值。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-accounts/get-account-summary

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 路径参数

- `accountId` (string, required)

## 响应

### 200

提供账户详情的总体概览，例如余额数值。

- `accountType` (string, optional) — 描述唯一的账户类型。对于标准个人账户，将返回空字符串。
- `status` (string, optional) — 如果账户当前不可交易，将显示一条状态消息。
- `balance` (double, optional) — 返回账户总余额。
- `SMA` (double, optional) — 该账户的简单移动平均值。
- `buyingPower` (double, optional) — 该账户可用的总购买力。
- `availableFunds` (double, optional) — 你可用于交易的权益金额。对于证券和商品两个部分，其计算方式为：含贷款价值权益 – 初始保证金。
- `excessLiquidity` (double, optional) — 你账户中超出通常要求的现金金额。
- `netLiquidationValue` (double, optional) — 确定你账户中资产价格的基础。
- `equityWithLoanValue` (double, optional) — 确定你是否有必要资产以发起或维持证券资产的基础。
- `regTLoan` (double, optional) — 美国联邦储备委员会制定的监管规定，约束经纪自营商可向借钱以保证金购买证券的客户提供的信贷额度。
- `securitiesGVP` (double, optional) — 多头股票价值 + 空头股票价值 + 多头期权价值 + 空头期权价值 + 基金价值的绝对值。
- `totalCashValue` (double, optional) — 交易时确认的现金 + 期货 P&L。该数值反映实时货币持仓，包括：* 通过外汇（FX）市场直接执行的交易。* 因 IB 自动转换而执行的交易，当你交易非基础货币的产品时会发生这种转换。* 为平掉非基础货币持仓而使用 FXCONV 途径刻意执行的交易。
- `accruedInterest` (double, optional) — 应计利息是自上一个付息日以来在证券上累积的利息。如果证券在两个支付日之间被出售，买方通常会补偿卖方已累积的利息，补偿可以在价格中体现，也可以作为单独的付款。
- `regTMargin` (double, optional) — 根据美国 Regulation T 规则为你账户的证券和商品部分计算的初始保证金要求。
- `initialMargin` (double, optional) — 该账户可用的初始保证金。
- `maintenanceMargin` (double, optional) — 该账户可用的维持保证金。
- `cashBalances` (list of AccountSummaryResponseCashBalancesItems, optional) — 一个数组，包含该账户持有的所有货币的余额信息。

## 错误

### 400 错误请求

错误的请求；传入的输入无法通过初步校验，随即被检测出来。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

### 401 未授权错误

缺少、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 503 服务不可用错误

服务不可用。例如，若因某些内部服务不可用导致请求耗时超过 10 秒，则请求会被中止并返回此状态码。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### AccountSummaryResponseCashBalancesItems

- `currency` (string, optional) — 这些数值所代表的货币。基础货币以 "Total (in \{BaseCurrency})" 表示
- `balance` (double, optional) — 账户中持有的可用货币总额。
- `settledCash` (double, optional) — 可从账户中提取的已结算现金。

## 示例

**响应**

```json
{
  "accountType": "",
  "status": "",
  "balance": 825903,
  "SMA": 368538,
  "buyingPower": 3307124,
  "availableFunds": 825903,
  "excessLiquidity": 826781,
  "netLiquidationValue": 1290490,
  "equityWithLoanValue": 1281714,
  "regTLoan": 0,
  "securitiesGVP": 1793178,
  "totalCashValue": -401846,
  "accruedInterest": 0,
  "regTMargin": 0,
  "initialMargin": 464586,
  "maintenanceMargin": 463709,
  "cashBalances": [
    {
      "currency": "EUR",
      "balance": 194,
      "settledCash": 194
    },
    {
      "currency": "HKD",
      "balance": 0,
      "settledCash": 0
    },
    {
      "currency": "JPY",
      "balance": 14781,
      "settledCash": 14781
    },
    {
      "currency": "USD",
      "balance": -402158,
      "settledCash": -402158
    },
    {
      "currency": "Total (in USD)",
      "balance": -401846,
      "settledCash": -401846
    }
  ]
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/iserver/account/U1234567/summary"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/iserver/account/U1234567/summary';
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

	url := "https://localhost:5000/v1/api/iserver/account/U1234567/summary"

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

url = URI("https://localhost:5000/v1/api/iserver/account/U1234567/summary")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/U1234567/summary")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/U1234567/summary', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/U1234567/summary");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/U1234567/summary")! as URL,
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