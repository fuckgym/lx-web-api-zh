# 账户余额摘要

GET https://localhost:5000/v1/api/iserver/account/{accountId}/summary/balances

返回账户权益与现金余额的摘要，包括总计和按账户分区细分的数据。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-accounts/get-balance-summary

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 路径参数

- `accountId` (string, required)

## 响应

### 200

表示成功返回可用资金。

- `total` (SummaryOfAccountBalancesResponseTotal, optional) — 包含账户的总余额详情。
- `commodities` (SummaryOfAccountBalancesResponseCommodities, optional) — 包含商品（Commodity）分区特有的余额详情。
- `securities` (SummaryOfAccountBalancesResponseSecurities, optional) — 包含证券（Security）分区特有的余额详情。

## 错误

### 400 错误请求错误

错误请求；传入的输入未通过初始验证并被立即检测到

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 503 服务不可用错误

服务不可用。例如，当由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### SummaryOfAccountBalancesResponseTotal

包含账户的总余额详情。

- `net_liquidation` (string, optional) — 确定您账户中资产价格的基础。
- `Nt Lqdtn Uncrtnty` (string, optional) — 显示与盘后价格变动相关的净清算价值的不确定性。
- `equity_with_loan` (string, optional) — * `Cash Accounts` 已结算现金 * `Margin Accounts` 现金总值 + 股票价值 + 债券价值 + 基金价值 + 欧洲与亚洲期权价值。
- `Prvs Dy Eqty Wth Ln Vl` (string, optional) — 该账户包含贷款价值的权益余额。
- `sec_gross_pos_val` (string, optional) — 等于除现金、指数期货和美国国债之外所有持仓绝对值之和。
- `cash` (string, optional) — 账户中的现金总余额
- `MTD Interest` (string, optional) — 本月迄今（Month-to-date）的利息总额。
- `Pndng Dbt Crd Chrgs` (string, optional) — IBKR 借记账户的任何待扣费用。

### SummaryOfAccountBalancesResponseCommodities

包含商品（Commodity）分区特有的余额详情。

- `net_liquidation` (string, optional) — 确定您账户中资产价格的基础。
- `equity_with_loan` (string, optional) — * `Cash Accounts` 已结算现金 * `Margin Accounts` 现金总值 + 股票价值 + 债券价值 + 基金价值 + 欧洲与亚洲期权价值。
- `cash` (string, optional) — 账户中的现金总余额
- `MTD Interest` (string, optional) — 本月迄今（Month-to-date）的利息总额。
- `Pndng Dbt Crd Chrgs` (string, optional) — IBKR 借记账户的任何待扣费用。

### SummaryOfAccountBalancesResponseSecurities

包含证券（Security）分区特有的余额详情。

- `net_liquidation` (string, optional) — 确定您账户中资产价格的基础。
- `equity_with_loan` (string, optional) — * `Cash Accounts` 已结算现金 * `Margin Accounts` 现金总值 + 股票价值 + 债券价值 + 基金价值 + 欧洲与亚洲期权价值。
- `Prvs Dy Eqty Wth Ln Vl` (string, optional) — 该账户包含贷款价值的权益余额。
- `sec_gross_pos_val` (string, optional) — 等于除现金、指数期货和美国国债之外所有持仓绝对值之和。
- `cash` (string, optional) — 账户中的现金总余额
- `MTD Interest` (string, optional) — 本月迄今（Month-to-date）的利息总额。
- `Pndng Dbt Crd Chrgs` (string, optional) — IBKR 借记账户的任何待扣费用。

## 示例

**响应**

```json
{
  "total": {
    "net_liquidation": "1,288,301 USD",
    "Nt Lqdtn Uncrtnty": "0 USD",
    "equity_with_loan": "1,279,520 USD",
    "Prvs Dy Eqty Wth Ln Vl": "1,275,902 USD",
    "sec_gross_pos_val": "1,791,096 USD",
    "cash": "-401,693 USD",
    "MTD Interest": "-549 USD",
    "Pndng Dbt Crd Chrgs": "0 USD",
    "Rg T Eqty Wth Ln Vl": "1,256,229 USD"
  },
  "commodities": {
    "net_liquidation": "32,072 USD",
    "equity_with_loan": "23,291 USD",
    "cash": "32,072 USD",
    "MTD Interest": "0 USD",
    "Pndng Dbt Crd Chrgs": "0 USD"
  },
  "securities": {
    "net_liquidation": "1,256,229 USD",
    "equity_with_loan": "1,256,229 USD",
    "Prvs Dy Eqty Wth Ln Vl": "1,275,902 USD",
    "sec_gross_pos_val": "1,791,096 USD",
    "cash": "-433,765 USD",
    "MTD Interest": "-549 USD",
    "Pndng Dbt Crd Chrgs": "0 USD",
    "Rg T Eqty Wth Ln Vl": "1,256,229 USD"
  },
  "Crypto at Paxos": {
    "MTD Interest": "0 USD",
    "Pndng Dbt Crd Chrgs": "0 USD",
    "cash": "0 USD",
    "equity_with_loan": "0 USD",
    "net_liquidation": "0 USD"
  }
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/iserver/account/U1234567/summary/balances"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/iserver/account/U1234567/summary/balances';
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

	url := "https://localhost:5000/v1/api/iserver/account/U1234567/summary/balances"

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

url = URI("https://localhost:5000/v1/api/iserver/account/U1234567/summary/balances")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/U1234567/summary/balances")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/U1234567/summary/balances', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/U1234567/summary/balances");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/U1234567/summary/balances")! as URL,
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