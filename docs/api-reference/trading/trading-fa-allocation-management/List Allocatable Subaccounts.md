# 列出可分配的子账户

GET https://localhost:5000/v1/api/iserver/account/allocation/accounts

检索所有子账户的列表，并返回其净流动性和可用权益，供财务顾问决定应分配哪些账户以及如何分配。该端点仅支持财务顾问（Financial Advisors）和 IBroker 账户。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-allocation-management/get-allocatable-subaccounts

## 认证

- `Authorization` 请求头（bearer token, required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 响应

### 200

表示数据成功返回。

- `accounts` (list of SubAccountsAccountsItems, optional) — 包含该财务顾问持有的所有子账户的数组。

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，在传入请求无法处理时返回。有时可能包含部分错误请求。例如，传入的 accountId 有误，而只能在处理请求的后期才被检测到。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，若因某个内部服务不可用导致请求耗时超过 10 秒，请求将被中止并返回此状态

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 类型

### SubAccountsAccountsItems

- `data` (list of SubAccountsAccountsItemsDataItems, optional) — 包含给定账户 Id 的净清算价值和可用权益。
- `name` (string, optional) — 返回与该余额数据关联的账户 ID。

### SubAccountsAccountsItemsDataItems

- `value` (string, optional) — 包含与该键关联的价格值。
- `key` (enum, optional) — 定义对象的值 * `AvailableEquity` - 表示该值与账户内持有的可用权益相关 * `NetLiquidation` - 表示该值与账户内持有的净清算价值相关
  - Allowed values: `AvailableEquity`, `NetLiquidation`

## 示例

**响应**

```json
{
  "accounts": [
    {
      "data": [
        {
          "value": "230013224.04",
          "key": "NetLiquidation"
        },
        {
          "value": "229617260.41",
          "key": "AvailableEquity"
        }
      ],
      "name": "U1234567"
    },
    {
      "data": [
        {
          "value": "229453917.57",
          "key": "NetLiquidation"
        },
        {
          "value": "229153196.12",
          "key": "AvailableEquity"
        }
      ],
      "name": "U1234568"
    }
  ]
}
```

**SDK 代码**

```python 2-sub-accounts
import requests

url = "https://localhost:5000/v1/api/iserver/account/allocation/accounts"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript 2-sub-accounts
const url = 'https://localhost:5000/v1/api/iserver/account/allocation/accounts';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go 2-sub-accounts
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/allocation/accounts"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby 2-sub-accounts
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/allocation/accounts")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java 2-sub-accounts
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/allocation/accounts")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php 2-sub-accounts
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/allocation/accounts', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp 2-sub-accounts
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/allocation/accounts");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift 2-sub-accounts
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/allocation/accounts")! as URL,
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