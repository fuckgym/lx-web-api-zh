# 获取股息详情

GET https://localhost:5000/gw/api/v1/tax-vouchers/dividends

检索给定客户账户、年份和国家的股息详情。**作用域**：`tax-vouchers.read`**安全策略**：`HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/third-parties/third-parties-tax-vouchers/fetch-dividends-1

## 认证

- `Authorization` 请求头（bearer token, required）— 使用您注册的私钥签名的 RS256 签名 JWT 访问令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 请求

### 查询参数

- `custAcctId` (string, required) — 客户账户 ID
- `year` (string, required) — 税务年度（例如 2023）
- `countryCode` (string, required) — 国家代码（例如 DE）

### 请求头

- `X-Request-ID` (string, optional) — 每个 HTTP 请求的唯一标识符，用于跟踪和调试

## 响应

### 200

成功返回股息列表

- `list of DividendDTO`

## 错误

### 400 错误请求

请求参数无效

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

OAuth2 验证失败

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

## 类型

### DividendDTO

- `currency` (string, optional)
- `exDate` (string, optional)
- `payDate` (string, optional)
- `corpactionId` (string, optional)
- `country` (string, optional)
- `isin` (string, optional)
- `securityDesc` (string, optional)
- `symbol` (string, optional)
- `voucher` (TaxVoucherDTO, optional)

### TaxVoucherDTO

- `requestId` (string, optional)
- `custAcctId` (string, optional)
- `corpactionId` (string, optional)
- `requestState` (string, optional)
- `fee` (double, optional)
- `divAmount` (double, optional)
- `withHeldAmount` (double, optional)
- `quantity` (double, optional)
- `countryCode` (string, optional)
- `year` (long, optional)
- `migratedCustAcctId` (string, optional)

## 示例

**响应**

```json
[
  {
    "currency": "string",
    "exDate": "string",
    "payDate": "string",
    "corpactionId": "string",
    "country": "string",
    "isin": "string",
    "securityDesc": "string",
    "symbol": "string",
    "voucher": {
      "requestId": "string",
      "custAcctId": "string",
      "corpactionId": "string",
      "requestState": "string",
      "fee": 1.1,
      "divAmount": 1.1,
      "withHeldAmount": 1.1,
      "quantity": 1.1,
      "countryCode": "string",
      "year": 1,
      "migratedCustAcctId": "string"
    }
  }
]
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/tax-vouchers/dividends"

querystring = {"countryCode":"countryCode","custAcctId":"custAcctId","year":"year"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/tax-vouchers/dividends?countryCode=countryCode&custAcctId=custAcctId&year=year';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/tax-vouchers/dividends?countryCode=countryCode&custAcctId=custAcctId&year=year"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/tax-vouchers/dividends?countryCode=countryCode&custAcctId=custAcctId&year=year")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/tax-vouchers/dividends?countryCode=countryCode&custAcctId=custAcctId&year=year")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/tax-vouchers/dividends?countryCode=countryCode&custAcctId=custAcctId&year=year', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/tax-vouchers/dividends?countryCode=countryCode&custAcctId=custAcctId&year=year");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/tax-vouchers/dividends?countryCode=countryCode&custAcctId=custAcctId&year=year")! as URL,
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