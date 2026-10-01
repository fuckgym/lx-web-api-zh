# 获取特定账户 ID 的可用成交确认日期列表

GET https://localhost:5000/gw/api/v1/trade-confirmations/available

**范围**：`statements.read` OR `reports.read`**安全策略**：`HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-reports/list-trade-confirmations-available

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥进行签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒)

## 请求

### 查询参数

- `accountId` (string, required) — 指定要检索信息的账户 ID

### 请求头

- `authorization` (string, required) — 指定授权请求头的值（例如 Bearer eyJ0eXAiOiJKV1...）。

## 响应

### 200

返回一个 JSON 对象，其中包含可用的用户成交日期。

- `data` (GetAvailableTradeConfirmationDatesResponseData, optional)

## 错误

### 400 请求错误

返回表示错误请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 401 未授权错误

返回表示未授权请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `detail` (string, optional)

### 402 需要付款错误

返回表示未授权请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `detail` (string, optional)

### 403 禁止访问错误

返回表示被禁止请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `detail` (string, optional)

### 500 服务器内部错误

返回表示服务器内部错误的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### GetAvailableTradeConfirmationDatesResponseData

- `dataType` (string, optional)
- `value` (list of string, optional) — 可用的成交确认日期

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

## 示例

**响应**

```json
{
  "data": {
    "dataType": "String",
    "value": [
      "string"
    ]
  }
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/trade-confirmations/available"

querystring = {"accountId":"UXXXX"}

headers = {
    "authorization": "Bearer eyJ0eXAiOiJKV1...",
    "Authorization": "Bearer <token>"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/trade-confirmations/available?accountId=UXXXX';
const options = {
  method: 'GET',
  headers: {authorization: 'Bearer eyJ0eXAiOiJKV1...', Authorization: 'Bearer <token>'}
};

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

	url := "https://localhost:5000/gw/api/v1/trade-confirmations/available?accountId=UXXXX"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("authorization", "Bearer eyJ0eXAiOiJKV1...")
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

url = URI("https://localhost:5000/gw/api/v1/trade-confirmations/available?accountId=UXXXX")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["authorization"] = 'Bearer eyJ0eXAiOiJKV1...'
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/trade-confirmations/available?accountId=UXXXX")
  .header("authorization", "Bearer eyJ0eXAiOiJKV1...")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/trade-confirmations/available?accountId=UXXXX', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'authorization' => 'Bearer eyJ0eXAiOiJKV1...',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/trade-confirmations/available?accountId=UXXXX");
var request = new RestRequest(Method.GET);
request.AddHeader("authorization", "Bearer eyJ0eXAiOiJKV1...");
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "authorization": "Bearer eyJ0eXAiOiJKV1...",
  "Authorization": "Bearer <token>"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/trade-confirmations/available?accountId=UXXXX")! as URL,
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