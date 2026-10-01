# 账户属性

GET https://localhost:5000/v1/api/portfolio/{accountId}/meta

获取单个账户的属性与能力。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-portfolio/get-portfolio-metadata

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

账户的属性

- `PrepaidCrypto-P` (boolean, optional) — 表示该账户是否在 PAXOS 拥有预付加密货币分区（Crypto Plus）。
- `PrepaidCrypto-Z` (boolean, optional) — 表示该账户是否在 ZEROHASH 拥有预付加密货币分区（Crypto Plus）。
- `accountAlias` (string, optional, nullable) — 为便于识别而分配给账户的用户自定义别名。
- `accountId` (string, optional) — 表示账户的标识编号。
- `accountStatus` (long, optional) — 账户开户时间的 Unix epoch 时间戳。
- `accountTitle` (string, optional) — 分配给账户的名称，通常为账户持有人姓名或商业实体名称。
- `accountVan` (string, optional) — 账户的虚拟账号（VAN）；若未设置 VAN，则为其 IB accountId。
- `acctCustType` (string, optional) — 标识账户所关联的客户类型，例如个人或 LLC。
- `brokerageAccess` (boolean, optional) — 表示账户是否可以接收真实订单（不要与模拟交易混用）。
- `businessType` (enum, optional) — 账户性质的描述符，反映 IB 内部负责的部门。
  - Allowed values: `IB_SALES`, `IB_PROSERVE`, `FA`, `FA_CLIENT`, `INTR_BROK`, `INTR_BROK_CLIENT`, `FD_CLIENT`, `INSTITUTIONAL`, `IB_DEVELOPERS`
- `category` (string, optional) — 指定的账户类别。仅在非标准账户结构中使用。
- `clearingStatus` (enum, optional) — 账户在 IB 的清算状态。O 为已开立，P 为待处理，N 为新建，A 为已放弃，C 为已关闭，R 为已拒绝。
  - Allowed values: `A`, `N`, `O`, `C`, `P`, `R`, `E`, `Q`
- `covestor` (boolean, optional) — 表示这是一个 Covestor 账户。
- `currency` (enum, optional) — 账户的基础货币。
  - Allowed values: `AED`, `AUD`, `CAD`, `CHF`, `CNH`, `CZK`, `DKK`, `EUR`, `GBP`, `HKD`, `HUF`, `ILS`, `JPY`, `MXN`, `NOK`, `NZD`, `PLN`, `SEK`, `SGD`, `USD`
- `desc` (string, optional) — 账户的内部人类可读描述。
- `displayName` (string, optional) — 账户在界面中显示的名称。若已设置，将反映 accountId 或 accountAlias。
- `faClient` (boolean, optional) — 表示该账户由财务顾问管理。
- `ibEntity` (enum, optional) — 账户所属的 IB 业务实体。
  - Allowed values: `IBLLC-US`, `IB-CAN`, `IB-UK`, `IB-IE`, `IB-AU`, `IB-HK`, `IB-IN`, `IB-JP`, `IB-SG`
- `id` (string, optional) — 账户的 IB accountId。
- `noClientTrading` (boolean, optional) — 表示该账户中客户的交易已被禁用。
- `parent` (AccountAttributesParent, optional) — 描述分区或多路复用（分段）账户结构中的账户关系。
- `trackVirtualFXPortfolio` (boolean, optional) — 表示该账户中跟踪虚拟外汇持仓。
- `tradingType` (enum, optional) — IB 用于反映账户交易权限的内部标识符。
  - Allowed values: `IRAMRGN`, `FUTNOPT`, `GPMRGN`, `PMRGN`, `STKCASH`, `STKMRGN`, `STKNOPT`
- `type` (enum, optional) — 表示账户存在于生产、模拟还是演示环境。
  - Allowed values: `DEMO`, `DEMO-BROKER`, `DEMO-ADVISOR`, `FNF`, `INDIVIDUAL`, `COMPANY`, `STL`, `UTMA`, `PRO-ADV`, `IRA`, `TRUST`

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

### AccountAttributesParent

描述分区或多路复用（分段）账户结构中的账户关系。

- `accountId` (string, optional) — 多路复用账户结构中父账户的账户 ID。
- `isMChild` (boolean, optional) — 表示给定账户是一个多路复用子账户。
- `isMParent` (boolean, optional) — 表示给定账户本身是一个多路复用父账户。
- `isMultiplex` (boolean, optional) — 表示该账户是一个多路复用账户。
- `mmc` (list of any, optional) — 资金管理客户。

## 示例

**响应**

```json
{
  "PrepaidCrypto-P": false,
  "PrepaidCrypto-Z": false,
  "accountAlias": "Retirement",
  "accountId": "DU123456",
  "accountStatus": 1590724800000,
  "accountTitle": "John Smith, LLC",
  "accountVan": "DU123456",
  "acctCustType": "LLC",
  "brokerageAccess": false,
  "businessType": "IB_SALES",
  "clearingStatus": "O",
  "covestor": false,
  "currency": "USD",
  "desc": "DU123456",
  "displayName": "John Smith, LLC",
  "ibEntity": "IBLLC-US",
  "id": "DU123456",
  "noClientTrading": false,
  "parent": {
    "accountId": "",
    "isMChild": false,
    "isMParent": false,
    "isMultiplex": false,
    "mmc": []
  },
  "trackVirtualFXPortfolio": true,
  "tradingType": "STKNOPT",
  "type": "DEMO",
  "faclient": false
}
```

**SDK 代码**

```python accountMetaInformation
import requests

url = "https://localhost:5000/v1/api/portfolio/DU123456/meta"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript accountMetaInformation
const url = 'https://localhost:5000/v1/api/portfolio/DU123456/meta';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go accountMetaInformation
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/portfolio/DU123456/meta"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby accountMetaInformation
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/portfolio/DU123456/meta")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java accountMetaInformation
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/portfolio/DU123456/meta")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php accountMetaInformation
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/portfolio/DU123456/meta', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp accountMetaInformation
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/portfolio/DU123456/meta");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift accountMetaInformation
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/portfolio/DU123456/meta")! as URL,
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