# 检索单个分配组

POST https://localhost:5000/v1/api/iserver/account/allocation/group/single
Content-Type: application/json

检索单个账户组的配置。其中包括该分配组的名称、组内包含的具体账户，以及所使用的分配方法及相关数量。此端点仅支持财务顾问（Financial Advisor）账户和 IBroker 账户。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-allocation-management/get-single-allocation-group

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 请求体 (application/json)

该端点期望接收一个对象。

- `name` (string, required) — 现有分配组的名称。

## 响应

### 200

返回分配组的详细信息。

- `name` (string, optional) — 用于指代您的分配组的名称。下单时会使用该名称。
- `accounts` (list of AllocationGroupAccountsItems, optional) — 包含一系列对象，描述涉及哪些账户，以及（对于用户自定义的分配方法）每个子账户的分配值。
- `default_method` (enum, optional, default: N) — Interactive Brokers 支持两种形式的分配方法：由 Interactive Brokers 完成计算的分配方法，以及由用户计算后再行指定的一组分配方法。IB 计算的分配方法：* `A` - 可用权益 * `E` - 平均 * `N` - 净清算价值 用户指定的分配方法：* `C` - 现金数量 * `P` - 百分比 * `R` - 比例 * `S` - 股数
  - Allowed values: `A`, `E`, `N`, `C`, `P`, `R`, `S`

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，当传入请求无法被处理时返回。有时可能包含部分错误请求的情况。例如，传入的 accountId 有误，而只有在处理请求的过程中才能检测到。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### AllocationGroupAccountsItems

- `amount` (long, optional) — 对于用户自定义的分配方法，每个子账户的分配总值。
- `name` (string, optional) — 给定子账户的 accountId。

## 示例

**请求**

```json
{
  "name": "Group_1_NetLiq"
}
```

**响应**

```json
{
  "name": "group1",
  "accounts": [
    {
      "name": "U1234567"
    },
    {
      "name": "U1234568"
    }
  ],
  "default_method": "E"
}
```

**SDK 代码**

```python single-group
import requests

url = "https://localhost:5000/v1/api/iserver/account/allocation/group/single"

payload = { "name": "Group_1_NetLiq" }
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript single-group
const url = 'https://localhost:5000/v1/api/iserver/account/allocation/group/single';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"name":"Group_1_NetLiq"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go single-group
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/allocation/group/single"

	payload := strings.NewReader("{\n  \"name\": \"Group_1_NetLiq\"\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby single-group
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/allocation/group/single")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"name\": \"Group_1_NetLiq\"\n}"

response = http.request(request)
puts response.read_body
```

```java single-group
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/allocation/group/single")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"name\": \"Group_1_NetLiq\"\n}")
  .asString();
```

```php single-group
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/allocation/group/single', [
  'body' => '{
  "name": "Group_1_NetLiq"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp single-group
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/allocation/group/single");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"name\": \"Group_1_NetLiq\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift single-group
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["name": "Group_1_NetLiq"] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/allocation/group/single")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

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