# 投资组合子账户（大型账户结构）

GET https://localhost:5000/v1/api/portfolio/subaccounts2

用于分层账户结构（如财务顾问账户和 IBroker 账户），返回用户可查看持仓及账户相关信息的子账户列表，每页最多分页 1000 个账户。在为这些子账户调用其他 /portfolio 端点之前，必须先调用此端点。如果子账户少于 100 个，请使用 /portfolio/subaccounts。要查询用户可交易的账户列表，请参见 /iserver/accounts。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-portfolio/get-many-subaccounts

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 请求

### 路径参数

- `accountId` (string, required)

### 查询参数

- `nocache` (boolean, optional, default: false)
- `page` (long, optional)
- `pageSize` (long, optional, default: 20)

## 响应

### 200

返回包含子账户定义的响应

- `metadata` (Subaccounts2ResponseMetadata, optional) — 描述子账户的元数据容器。
- `subaccounts` (list of accountAttributes, optional) — 包含账户结构中所有子账户的列表。

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

### Subaccounts2ResponseMetadata

描述子账户的元数据容器。

- `pageNum` (long, optional) — 当前页码。
- `pageSize` (long, optional) — 返回页面中包含的条目数。
- `total` (long, optional) — 该页面返回的账户总数。

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
{
  "metadata": {
    "pageNum": 0,
    "pageSize": 20,
    "total": 1
  },
  "subaccounts": [
    {
      "PrepaidCrypto-P": false,
      "PrepaidCrypto-Z": false,
      "accountAlias": "None",
      "accountId": "U1234567",
      "accountStatus": 1644814800000,
      "accountTitle": "",
      "accountVan": "U1234567",
      "acctCustType": "LLC",
      "brokerageAccess": false,
      "businessType": "IB_PROSERVE",
      "category": "",
      "clearingStatus": "O",
      "covestor": false,
      "currency": "USD",
      "desc": "U1234567",
      "displayName": "U1234567",
      "ibEntity": "IBLLC-US",
      "id": "U1234567",
      "noClientTrading": false,
      "parent": {
        "accountId": "",
        "isMChild": false,
        "isMParent": false,
        "isMultiplex": false,
        "mmc": []
      },
      "trackVirtualFXPortfolio": true,
      "tradingType": "PMRGN",
      "type": "DEMO",
      "faclient": false
    }
  ]
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/portfolio/subaccounts2"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/portfolio/subaccounts2';
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

	url := "https://localhost:5000/v1/api/portfolio/subaccounts2"

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

url = URI("https://localhost:5000/v1/api/portfolio/subaccounts2")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/portfolio/subaccounts2")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/portfolio/subaccounts2', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/portfolio/subaccounts2");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/portfolio/subaccounts2")! as URL,
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