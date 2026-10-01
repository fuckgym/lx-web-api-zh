# 账户保证金使用情况摘要

GET https://localhost:5000/v1/api/iserver/account/{accountId}/summary/margins

按总计和各账户分区返回账户保证金的摘要。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-accounts/get-margin-summary

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

表示成功请求获取保证金余额值。

- `total` (SummaryOfAccountMarginResponseTotal, optional)
- `Crypto at Paxos` (SummaryOfAccountMarginResponseCryptoAtPaxos, optional)
- `commodities` (SummaryOfAccountMarginResponseCommodities, optional)
- `securities` (SummaryOfAccountMarginResponseSecurities, optional)

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

### SummaryOfAccountMarginResponseTotal

- `current_initial` (string, optional) — 开立新持仓所需的最低金额。
- `Prdctd Pst-xpry Mrgn @ Opn` (string, optional) — 基于您投资组合中即将到期的合约，提供预计的“到期时”保证金值。
- `current_maint` (string, optional) — 维持您的持仓所需的权益金额。
- `projected_liquidity_inital_margin` (string, optional) — 基于账户清算价值，提供预计的“流动”初始保证金值。
- `Prjctd Lk Ahd Mntnnc Mrgn` (string, optional) — 如果现在是美东时间下午 3:00，您所前瞻的下一个计算是收盘之后，即隔夜初始保证金。如果是美东时间凌晨 3:00，下一个计算将发生在市场开盘时。* `Securities` – 截至下一期间保证金变动时的预计维持保证金要求，以账户基础货币计。* `Commodities` – 基于当前保证金要求（可能会发生变化）、截至下一期间保证金变动时的维持保证金要求，以账户基础货币计。该值取决于您查看保证金要求的时间。
- `projected_overnight_initial_margin` (string, optional) — 隔夜（Overnight）指当地市场交易日收盘之后的时间窗口。* Securities – 以账户基础货币计的预计隔夜初始保证金要求。* Commodities – 基于当前保证金要求（可能会发生变化）、以账户基础货币计的隔夜初始保证金要求。
- `Prjctd Ovrnght Mntnnc Mrgn` (string, optional) — 隔夜（Overnight）指当地市场交易日收盘之后的时间窗口。* `Securities` – 以账户基础货币计的预计隔夜维持保证金要求。* `Commodities` – 基于当前保证金要求（可能会发生变化）、以账户基础货币计的隔夜维持保证金要求。

### SummaryOfAccountMarginResponseCryptoAtPaxos

- `current_initial` (string, optional) — 开立新持仓所需的最低金额。
- `Prdctd Pst-xpry Mrgn @ Opn` (string, optional) — 基于您投资组合中即将到期的合约，提供预计的“到期时”保证金值。
- `current_maint` (string, optional) — 维持您的持仓所需的权益金额。
- `projected_liquidity_inital_margin` (string, optional) — 基于账户清算价值，提供预计的“流动”初始保证金值。
- `Prjctd Lk Ahd Mntnnc Mrgn` (string, optional) — 如果现在是美东时间下午 3:00，您所前瞻的下一个计算是收盘之后，即隔夜初始保证金。如果是美东时间凌晨 3:00，下一个计算将发生在市场开盘时。* `Securities` – 截至下一期间保证金变动时的预计维持保证金要求，以账户基础货币计。* `Commodities` – 基于当前保证金要求（可能会发生变化）、截至下一期间保证金变动时的维持保证金要求，以账户基础货币计。该值取决于您查看保证金要求的时间。
- `projected_overnight_initial_margin` (string, optional) — 隔夜（Overnight）指当地市场交易日收盘之后的时间窗口。* Securities – 以账户基础货币计的预计隔夜初始保证金要求。* Commodities – 基于当前保证金要求（可能会发生变化）、以账户基础货币计的隔夜初始保证金要求。
- `Prjctd Ovrnght Mntnnc Mrgn` (string, optional) — 隔夜（Overnight）指当地市场交易日收盘之后的时间窗口。* `Securities` – 以账户基础货币计的预计隔夜维持保证金要求。* `Commodities` – 基于当前保证金要求（可能会发生变化）、以账户基础货币计的隔夜维持保证金要求。

### SummaryOfAccountMarginResponseCommodities

- `RegT Margin` (string, optional) — 当前使用的 RegT 保证金。
- `current_initial` (string, optional) — 开立新持仓所需的最低金额。
- `Prdctd Pst-xpry Mrgn @ Opn` (string, optional) — 基于您投资组合中即将到期的合约，提供预计的“到期时”保证金值。
- `current_maint` (string, optional) — 维持您的持仓所需的权益金额。
- `projected_liquidity_inital_margin` (string, optional) — 基于账户清算价值，提供预计的“流动”初始保证金值。
- `Prjctd Lk Ahd Mntnnc Mrgn` (string, optional) — 如果现在是美东时间下午 3:00，您所前瞻的下一个计算是收盘之后，即隔夜初始保证金。如果是美东时间凌晨 3:00，下一个计算将发生在市场开盘时。* `Securities` – 截至下一期间保证金变动时的预计维持保证金要求，以账户基础货币计。* `Commodities` – 基于当前保证金要求（可能会发生变化）、截至下一期间保证金变动时的维持保证金要求，以账户基础货币计。该值取决于您查看保证金要求的时间。
- `projected_overnight_initial_margin` (string, optional) — 隔夜（Overnight）指当地市场交易日收盘之后的时间窗口。* Securities – 以账户基础货币计的预计隔夜初始保证金要求。* Commodities – 基于当前保证金要求（可能会发生变化）、以账户基础货币计的隔夜初始保证金要求。
- `Prjctd Ovrnght Mntnnc Mrgn` (string, optional) — 隔夜（Overnight）指当地市场交易日收盘之后的时间窗口。* `Securities` – 以账户基础货币计的预计隔夜维持保证金要求。* `Commodities` – 基于当前保证金要求（可能会发生变化）、以账户基础货币计的隔夜维持保证金要求。

### SummaryOfAccountMarginResponseSecurities

- `current_initial` (string, optional) — 开立新持仓所需的最低金额。
- `Prdctd Pst-xpry Mrgn @ Opn` (string, optional) — 基于您投资组合中即将到期的合约，提供预计的“到期时”保证金值。
- `current_maint` (string, optional) — 维持您的持仓所需的权益金额。
- `projected_liquidity_inital_margin` (string, optional) — 基于账户清算价值，提供预计的“流动”初始保证金值。
- `Prjctd Lk Ahd Mntnnc Mrgn` (string, optional) — 如果现在是美东时间下午 3:00，您所前瞻的下一个计算是收盘之后，即隔夜初始保证金。如果是美东时间凌晨 3:00，下一个计算将发生在市场开盘时。* `Securities` – 截至下一期间保证金变动时的预计维持保证金要求，以账户基础货币计。* `Commodities` – 基于当前保证金要求（可能会发生变化）、截至下一期间保证金变动时的维持保证金要求，以账户基础货币计。该值取决于您查看保证金要求的时间。
- `projected_overnight_initial_margin` (string, optional) — 隔夜（Overnight）指当地市场交易日收盘之后的时间窗口。* Securities – 以账户基础货币计的预计隔夜初始保证金要求。* Commodities – 基于当前保证金要求（可能会发生变化）、以账户基础货币计的隔夜初始保证金要求。
- `Prjctd Ovrnght Mntnnc Mrgn` (string, optional) — 隔夜（Overnight）指当地市场交易日收盘之后的时间窗口。* `Securities` – 以账户基础货币计的预计隔夜维持保证金要求。* `Commodities` – 基于当前保证金要求（可能会发生变化）、以账户基础货币计的隔夜维持保证金要求。

## 示例

**响应**

```json
{
  "total": {
    "current_initial": "468,562 USD",
    "Prdctd Pst-xpry Mrgn @ Opn": "0 USD",
    "current_maint": "467,308 USD",
    "projected_liquidity_inital_margin": "468,562 USD",
    "Prjctd Lk Ahd Mntnnc Mrgn": "467,308 USD",
    "projected_overnight_initial_margin": "468,562 USD",
    "Prjctd Ovrnght Mntnnc Mrgn": "467,308 USD",
    "RegT Margin": "896,255 USD"
  },
  "Crypto at Paxos": {
    "current_initial": "0 USD",
    "Prdctd Pst-xpry Mrgn @ Opn": "0 USD",
    "current_maint": "0 USD",
    "projected_liquidity_inital_margin": "0 USD",
    "Prjctd Lk Ahd Mntnnc Mrgn": "0 USD",
    "projected_overnight_initial_margin": "0 USD",
    "Prjctd Ovrnght Mntnnc Mrgn": "0 USD"
  },
  "commodities": {
    "current_initial": "13,794 USD",
    "Prdctd Pst-xpry Mrgn @ Opn": "0 USD",
    "current_maint": "12,540 USD",
    "projected_liquidity_inital_margin": "13,794 USD",
    "Prjctd Lk Ahd Mntnnc Mrgn": "12,540 USD",
    "projected_overnight_initial_margin": "13,794 USD",
    "Prjctd Ovrnght Mntnnc Mrgn": "12,540 USD"
  },
  "securities": {
    "current_initial": "454,768 USD",
    "Prdctd Pst-xpry Mrgn @ Opn": "0 USD",
    "current_maint": "454,768 USD",
    "projected_liquidity_inital_margin": "454,768 USD",
    "Prjctd Lk Ahd Mntnnc Mrgn": "454,768 USD",
    "projected_overnight_initial_margin": "454,768 USD",
    "Prjctd Ovrnght Mntnnc Mrgn": "454,768 USD",
    "RegT Margin": "896,255 USD"
  }
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/iserver/account/U1234567/summary/margins"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/iserver/account/U1234567/summary/margins';
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

	url := "https://localhost:5000/v1/api/iserver/account/U1234567/summary/margins"

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

url = URI("https://localhost:5000/v1/api/iserver/account/U1234567/summary/margins")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/U1234567/summary/margins")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/U1234567/summary/margins', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/U1234567/summary/margins");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/U1234567/summary/margins")! as URL,
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