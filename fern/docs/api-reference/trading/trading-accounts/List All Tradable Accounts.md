# 列出所有可交易账户

GET https://localhost:5000/v1/api/iserver/accounts

返回用户拥有交易权限的账户列表、各账户的别名以及当前选中的账户。注意，在修改订单或查询未成交订单之前必须先调用该端点。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-accounts/get-brokerage-accounts

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 响应

### 200

一个包含有效账户以及与交易权限相关的账户属性的对象。该端点也用于确认账户验证。

- `accounts` (list of string, optional) — 返回一个数组，包含所有可访问的 accountId。
- `acctProps` (UserAccountsResponseAcctProps, optional) — 为每个可访问账户的属性返回一个 json 对象。
- `aliases` (UserAccountsResponseAliases, optional)
- `allowFeatures` (UserAccountsResponseAllowFeatures, optional)
- `chartPeriods` (UserAccountsResponseChartPeriods, optional)
- `groups` (list of string, optional)
- `profiles` (list of string, optional)
- `selectedAccount` (string, optional)
- `serverInfo` (UserAccountsResponseServerInfo, optional)
- `sessionId` (string, optional)
- `isFt` (boolean, optional)
- `isPaper` (boolean, optional)

## 错误

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

### UserAccountsResponseAcctProps

为每个可访问账户的属性返回一个 json 对象。

- `U1234567` (UserAccountsResponseAcctPropsU1234567, optional)

### UserAccountsResponseAliases

- `U1234567` (string, optional)

### UserAccountsResponseAllowFeatures

- `showGFIS` (boolean, optional)
- `showEUCostReport` (boolean, optional)
- `allowEventContract` (boolean, optional)
- `allowFXConv` (boolean, optional)
- `allowFinancialLens` (boolean, optional)
- `allowMTA` (boolean, optional)
- `allowTypeAhead` (boolean, optional)
- `allowEventTrading` (boolean, optional)
- `snapshotRefreshTimeout` (long, optional)
- `liteUser` (boolean, optional)
- `showWebNews` (boolean, optional)
- `research` (boolean, optional)
- `debugPnl` (boolean, optional)
- `showTaxOpt` (boolean, optional)
- `showImpactDashboard` (boolean, optional)
- `allowDynAccount` (boolean, optional)
- `allowCrypto` (boolean, optional)
- `allowedAssetTypes` (string, optional)
- `restrictTradeSubscription` (boolean, optional)
- `showUkUserLabels` (boolean, optional)
- `sideBySide` (boolean, optional)

### UserAccountsResponseChartPeriods

- `STK` (list of string, optional)
- `CFD` (list of string, optional)
- `OPT` (list of string, optional)
- `FOP` (list of string, optional)
- `WAR` (list of string, optional)
- `IOPT` (list of string, optional)
- `FUT` (list of string, optional)
- `CASH` (list of string, optional)
- `IND` (list of string, optional)
- `BOND` (list of string, optional)
- `FUND` (list of string, optional)
- `CMDTY` (list of string, optional)
- `PHYSS` (list of string, optional)
- `CRYPTO` (list of string, optional)

### UserAccountsResponseServerInfo

- `serverName` (string, optional)
- `serverVersion` (string, optional)

### UserAccountsResponseAcctPropsU1234567

- `hasChildAccounts` (boolean, optional)
- `supportsCashQty` (boolean, optional)
- `liteUnderPro` (boolean, optional)
- `noFXConv` (boolean, optional)
- `isProp` (boolean, optional)
- `supportsFractions` (boolean, optional)
- `allowCustomerTime` (boolean, optional)
- `autoFx` (boolean, optional)

## 示例

**响应**

```json
{
  "accounts": [
    "U1234567"
  ],
  "acctProps": {
    "U1234567": {
      "hasChildAccounts": false,
      "supportsCashQty": true,
      "liteUnderPro": false,
      "supportsFractions": true,
      "allowCustomerTime": true,
      "autoFx": false,
      "noFxConv": false
    }
  },
  "aliases": {
    "U1234567": "U1234567",
    "All": "All"
  },
  "allowFeatures": {
    "showGFIS": true,
    "showEUCostReport": false,
    "allowEventContract": true,
    "allowFXConv": true,
    "allowFinancialLens": true,
    "allowMTA": false,
    "allowTypeAhead": true,
    "allowEventTrading": true,
    "snapshotRefreshTimeout": 30,
    "liteUser": false,
    "showWebNews": true,
    "research": true,
    "debugPnl": true,
    "showTaxOpt": true,
    "showImpactDashboard": true,
    "allowDynAccount": false,
    "allowCrypto": false,
    "allowedAssetTypes": "STK,CFD,OPT,FOP,WAR,FUT,BAG,PDC,CASH,IND,BOND,BILL,FUND,SLB,News,CMDTY,IOPT,ICU,ICS,PHYSS,CRYPTO",
    "restrictTradeSubscription": false,
    "showUkUserLabels": false,
    "sideBySide": true,
    "allowFA": false,
    "allowLiteUnderPro": false
  },
  "chartPeriods": {
    "STK": [
      "*"
    ],
    "CFD": [
      "*"
    ],
    "OPT": [
      "2h",
      "1d",
      "2d",
      "1w",
      "1m"
    ],
    "FOP": [
      "2h",
      "1d",
      "2d",
      "1w",
      "1m"
    ],
    "WAR": [
      "*"
    ],
    "IOPT": [
      "*"
    ],
    "FUT": [
      "*"
    ],
    "CASH": [
      "*"
    ],
    "IND": [
      "*"
    ],
    "BOND": [
      "*"
    ],
    "FUND": [
      "*"
    ],
    "CMDTY": [
      "*"
    ],
    "PHYSS": [
      "*"
    ],
    "CRYPTO": [
      "*"
    ]
  },
  "groups": [
    "All"
  ],
  "profiles": [],
  "selectedAccount": "U1234567",
  "serverInfo": {
    "serverName": "server",
    "serverVersion": "Build 99.99.9, May 22, 2020 4:19:22 PM"
  },
  "sessionId": "65ee8a41.0000001e",
  "isPaper": true,
  "isFT": false
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/iserver/accounts"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/iserver/accounts';
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

	url := "https://localhost:5000/v1/api/iserver/accounts"

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

url = URI("https://localhost:5000/v1/api/iserver/accounts")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/accounts")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/accounts', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/accounts");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/accounts")! as URL,
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