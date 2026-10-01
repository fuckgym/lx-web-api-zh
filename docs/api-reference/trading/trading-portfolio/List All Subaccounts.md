# 列出所有子账户

GET https://localhost:5000/v1/api/portfolio/subaccounts

获取账户结构中子账户的属性。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-portfolio/get-all-subaccounts

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 响应

### 200

表示结构中账户的对象数组。

- `list of accountAttributes`

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

服务器内部错误，在传入请求无法被处理时返回。有时可能包含部分属于错误请求的情况。例如传入了错误的 accountId，只能在处理请求的过程中才能检测出来。错误信息包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### accountAttributes

- `PrepaidCrypto-P` (boolean, optional) — 指示账户是否拥有与 PAXOS 的预付加密货币分部（Crypto Plus）。
- `PrepaidCrypto-Z` (boolean, optional) — 指示账户是否拥有与 ZEROHASH 的预付加密货币分部（Crypto Plus）。
- `accountAlias` (string, optional, nullable) — 为账户指定的用户自定义别名，便于识别。
- `accountId` (string, optional) — 指示账户的标识编号。
- `accountStatus` (long, optional) — 账户开设时间的 Unix 时间戳。
- `accountTitle` (string, optional) — 分配给账户的名称，通常为账户持有人姓名或商业实体。
- `accountVan` (string, optional) — 账户的虚拟账号（VAN）；若未设置 VAN，则为其 IB accountId。
- `acctCustType` (string, optional) — 标识账户所关联的客户类型，例如个人或 LLC。
- `brokerageAccess` (boolean, optional) — 指示账户是否可以接收真实订单（请勿与模拟交易混淆）。
- `businessType` (enum, optional) — 账户性质的描述符，反映 IB 内部负责的部门。
  - Allowed values: `IB_SALES`, `IB_PROSERVE`, `FA`, `FA_CLIENT`, `INTR_BROK`, `INTR_BROK_CLIENT`, `FD_CLIENT`, `INSTITUTIONAL`, `IB_DEVELOPERS`
- `category` (string, optional) — 指定的账户类别。仅用于非标准账户结构。
- `clearingStatus` (enum, optional) — 账户在 IB 的清算状态。O 表示已开通，P 表示待定，N 表示新建，A 表示已弃置，C 表示已关闭，R 表示已拒绝。
  - Allowed values: `A`, `N`, `O`, `C`, `P`, `R`, `E`, `Q`
- `covestor` (boolean, optional) — 指示这是一个 Covestor 账户。
- `currency` (enum, optional) — 账户的基础货币。
  - Allowed values: `AED`, `AUD`, `CAD`, `CHF`, `CNH`, `CZK`, `DKK`, `EUR`, `GBP`, `HKD`, `HUF`, `ILS`, `JPY`, `MXN`, `NOK`, `NZD`, `PLN`, `SEK`, `SGD`, `USD`
- `desc` (string, optional) — 账户的内部人类可读描述。
- `displayName` (string, optional) — 账户在界面中显示的名称。若已设置，将反映 accountId 或 accountAlias。
- `faClient` (boolean, optional) — 指示该账户由财务顾问管理。
- `ibEntity` (enum, optional) — 账户所属的 IB 业务实体。
  - Allowed values: `IBLLC-US`, `IB-CAN`, `IB-UK`, `IB-IE`, `IB-AU`, `IB-HK`, `IB-IN`, `IB-JP`, `IB-SG`
- `id` (string, optional) — 账户的 IB accountId。
- `noClientTrading` (boolean, optional) — 指示该账户已禁用客户交易。
- `parent` (AccountAttributesParent, optional) — 描述分区或多路复用（分段）账户结构中的账户关系。
- `trackVirtualFXPortfolio` (boolean, optional) — 指示该账户跟踪虚拟外汇持仓。
- `tradingType` (enum, optional) — IB 用于反映账户交易权限的内部标识符。
  - Allowed values: `IRAMRGN`, `FUTNOPT`, `GPMRGN`, `PMRGN`, `STKCASH`, `STKMRGN`, `STKNOPT`
- `type` (enum, optional) — 指示账户存在于生产、模拟还是演示环境。
  - Allowed values: `DEMO`, `DEMO-BROKER`, `DEMO-ADVISOR`, `FNF`, `INDIVIDUAL`, `COMPANY`, `STL`, `UTMA`, `PRO-ADV`, `IRA`, `TRUST`

### AccountAttributesParent

描述分区或多路复用（分段）账户结构中的账户关系。

- `accountId` (string, optional) — 多路复用账户结构中父账户的账户 ID。
- `isMChild` (boolean, optional) — 指示给定账户是多路复用子账户。
- `isMParent` (boolean, optional) — 指示给定账户本身就是多路复用父账户。
- `isMultiplex` (boolean, optional) — 指示该账户是多路复用账户。
- `mmc` (list of any, optional) — 资金管理人客户。

## 示例

**响应**

```json
[
  {
    "PrepaidCrypto-P": false,
    "PrepaidCrypto-Z": false,
    "accountAlias": null,
    "accountId": "DU123456",
    "accountStatus": 1590724800000,
    "accountTitle": "John Smith, LLC",
    "accountVan": "DU123456",
    "acctCustType": "LLC",
    "brokerageAccess": true,
    "businessType": "IB_SALES",
    "category": "",
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
]
```

**SDK 代码**

```python subAccounts
import requests

url = "https://localhost:5000/v1/api/portfolio/subaccounts"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript subAccounts
const url = 'https://localhost:5000/v1/api/portfolio/subaccounts';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go subAccounts
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/portfolio/subaccounts"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby subAccounts
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/portfolio/subaccounts")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java subAccounts
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/portfolio/subaccounts")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php subAccounts
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/portfolio/subaccounts', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp subAccounts
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/portfolio/subaccounts");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift subAccounts
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/portfolio/subaccounts")! as URL,
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