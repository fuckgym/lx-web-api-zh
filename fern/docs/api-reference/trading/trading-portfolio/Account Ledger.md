# 账户账簿

GET https://localhost:5000/v1/api/portfolio/{accountId}/ledger

获取给定账户的账簿数据，其中按币种详细列出其余额。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-portfolio/get-portfolio-ledger

## 认证

- `Authorization` 请求头（bearer token，required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 路径参数

- `accountId` (string, required)

### 查询参数

- `model` (string, optional)

## 响应

### 200

账簿

- `map from string to Ledger`

## 错误

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

### Ledger

描述账户以其基础货币计的余额的对象，按资产类别和账户分段细分。响应中还会有一个以该币种名称命名的对象，其内容与之重复。

- `acctcode` (string, optional) — 所请求账户的账户 ID。
- `cashbalance` (double, optional) — 给定账户以该币种计的现金余额。
- `cashbalancefxsegment` (double, optional) — 如适用，给定账户在其专属外汇分段中以该币种计的现金余额。
- `commoditymarketvalue` (double, optional) — 给定账户以该币种计的商品持仓市值。
- `corporatebondsmarketvalue` (double, optional) — 给定账户以该币种计的公司债券持仓市值。
- `currency` (string, optional) — 该对象所反映币种的三字母名称，账户基础货币则为 'BASE'。
- `dividends` (double, optional) — 给定账户以该币种计的应收（尚未发放）股息余额。
- `exchangerate` (long, optional) — 该币种相对账户基础货币的汇率。
- `funds` (double, optional) — 给定账户以该币种计的共同基金持仓价值。
- `futuremarketvalue` (double, optional) — 给定账户以该币种计的期货持仓市值。
- `futureoptionmarketvalue` (double, optional) — 给定账户以该币种计的期货期权持仓市值。
- `futuresonlypnl` (double, optional) — 给定账户以该币种计的期货持仓盈亏（PNL）。
- `interest` (double, optional) — 给定账户以该币种计的应收利息余额。
- `issueroptionsmarketvalue` (double, optional) — 给定账户以该币种计的发行人期权持仓市值。
- `key` (enum, optional) — 标识数据的性质。始终取值 'LedgerList'。
  - Allowed values: `LedgerList`
- `moneyfunds` (double, optional) — 给定账户以该币种计的货币市场基金持仓价值。
- `netliquidationvalue` (double, optional) — 给定账户以该币种计的持仓净清算价值。
- `realizedpnl` (double, optional) — 给定账户以该币种计的已实现盈亏（PNL）。
- `secondkey` (string, optional) — 该对象所反映币种的附加标识符。始终与 'currency' 字段一致。
- `sessionid` (long, optional)
- `settledcash` (double, optional) — 给定账户以该币种计的已结算现金余额。
- `severity` (long, optional)
- `stockmarketvalue` (double, optional) — 给定账户以该币种计的股票持仓市值。
- `stockoptionmarketvalue` (double, optional) — 给定账户以该币种计的股票期权持仓市值。
- `tbillsmarketvalue` (double, optional) — 给定账户以该币种计的国库券持仓市值。
- `tbondsmarketvalue` (double, optional) — 给定账户以该币种计的国债持仓市值。
- `timestamp` (long, optional) — 该账户账簿数据的获取时间戳。
- `unrealizedpnl` (double, optional) — 给定账户以该币种计的未实现盈亏（PNL）。
- `warrantsmarketvalue` (double, optional) — 给定账户以该币种计的权证持仓市值。

## 示例

**响应**

```json
{
  "AUD": {
    "acctcode": "DU5240685",
    "cashbalance": 223911.11,
    "cashbalancefxsegment": 0,
    "commoditymarketvalue": 0,
    "corporatebondsmarketvalue": 0,
    "currency": "AUD",
    "dividends": 0,
    "exchangerate": 0.650378,
    "funds": 0,
    "futuremarketvalue": 0,
    "futureoptionmarketvalue": 0,
    "futuresonlypnl": 0,
    "interest": 83.04,
    "issueroptionsmarketvalue": 0,
    "key": "LedgerList",
    "moneyfunds": 0,
    "netliquidationvalue": 223994.16,
    "realizedpnl": 0,
    "secondkey": "AUD",
    "sessionid": 1,
    "settledcash": 223911.11,
    "severity": 0,
    "stockmarketvalue": 0,
    "stockoptionmarketvalue": 0,
    "tbillsmarketvalue": 0,
    "tbondsmarketvalue": 0,
    "timestamp": 1754948718,
    "unrealizedpnl": 0,
    "warrantsmarketvalue": 0,
    "cryptocurrencyvalue": 0
  },
  "BASE": {
    "acctcode": "DU5240685",
    "cashbalance": 218093824,
    "cashbalancefxsegment": 0,
    "commoditymarketvalue": 0,
    "corporatebondsmarketvalue": 2094.11,
    "currency": "BASE",
    "dividends": 0,
    "exchangerate": 1,
    "funds": 0,
    "futuremarketvalue": 2750.1,
    "futureoptionmarketvalue": 0,
    "futuresonlypnl": 2750.1,
    "interest": 150856.48,
    "issueroptionsmarketvalue": 0,
    "key": "LedgerList",
    "moneyfunds": 0,
    "netliquidationvalue": 219449280,
    "realizedpnl": 0,
    "secondkey": "BASE",
    "sessionid": 1,
    "settledcash": 218093824,
    "severity": 0,
    "stockmarketvalue": 1202347.1,
    "stockoptionmarketvalue": 906.95,
    "tbillsmarketvalue": 0,
    "tbondsmarketvalue": 0,
    "timestamp": 1754948718,
    "unrealizedpnl": 154673.2,
    "warrantsmarketvalue": 0,
    "cryptocurrencyvalue": 0
  },
  "USD": {
    "acctcode": "DU5240685",
    "cashbalance": 213375440,
    "cashbalancefxsegment": 0,
    "commoditymarketvalue": 0,
    "corporatebondsmarketvalue": 2094.11,
    "currency": "USD",
    "dividends": 0,
    "exchangerate": 1,
    "funds": 0,
    "futuremarketvalue": 2750.1,
    "futureoptionmarketvalue": 0,
    "futuresonlypnl": 2750.1,
    "interest": 150009.97,
    "issueroptionsmarketvalue": 0,
    "key": "LedgerList",
    "moneyfunds": 0,
    "netliquidationvalue": 214730048,
    "realizedpnl": 0,
    "secondkey": "USD",
    "sessionid": 1,
    "settledcash": 213375440,
    "severity": 0,
    "stockmarketvalue": 1202347.1,
    "stockoptionmarketvalue": 906.95,
    "tbillsmarketvalue": 0,
    "tbondsmarketvalue": 0,
    "timestamp": 1754948718,
    "unrealizedpnl": 154673.2,
    "warrantsmarketvalue": 0,
    "cryptocurrencyvalue": 0,
    "endofbundle": 1
  }
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/portfolio/DU123456/ledger"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/portfolio/DU123456/ledger';
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

	url := "https://localhost:5000/v1/api/portfolio/DU123456/ledger"

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

url = URI("https://localhost:5000/v1/api/portfolio/DU123456/ledger")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/portfolio/DU123456/ledger")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/portfolio/DU123456/ledger', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/portfolio/DU123456/ledger");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/portfolio/DU123456/ledger")! as URL,
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