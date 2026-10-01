# 将账户投资至模型

POST https://localhost:5000/v1/api/fa/model/invest-divest
Content-Type: application/json

提交将一个或多个账户投资至**单个**目标模型或从中撤资的指令，并针对**每个账户**指定现金金额。`accountList` 中的每一项都将一个账户标识符与应用于该账户的 `amtToInvest` 值配对（正数为投资，负数为撤资）。

与 `/fa/model/tws-invest-divest` 的约束与对比：
 * 每个请求只能指向**单个模型**（即顶层的 `model`
   字段）。若要在一次调用中投资多个模型，请使用
   `/fa/model/tws-invest-divest` 及其 `modelList`。
 * 模型必须以**单一货币**计价；本端点不支持多币种
   模型。对于持有多种货币金融工具的模型，请使用
   `/fa/model/tws-invest-divest`。
 * 此处**不支持** FA 盘前分配**组**——每个账户
   及其各自的投资金额必须在
   `accountList` 中明确列出。
 * 由于每个账户都是单独列出的，本端点允许
   **每个账户的投资金额不同**。相比之下，`/fa/model/tws-invest-divest`
   在使用 `group` 或 `accountList` 时，会将单个 `amtToInvest`
   平均分摊到各账户。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/set-accountinvestment-in-model

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 请求体 (application/json)

该端点期望接收一个对象。

- `reqID` (long, optional) — 用于唯一跟踪请求的请求标识符。
- `model` (string, optional) — 定义要将其账户投资至其中的模型。
- `accountList` (list of V1ApiFaModelInvestDivestPostRequestBodyContentApplicationJsonSchemaAccountListItems, optional) — 要投资至模型中的账户集合。

## 响应

### 200

模型投资已成功提交。

- `reqID` (string, optional) — 用于唯一跟踪请求的请求标识符。
- `subscriptionStatus` (long, optional) — 描述模型是否处于轮询模式。

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

### V1ApiFaModelInvestDivestPostRequestBodyContentApplicationJsonSchemaAccountListItems

- `account` (string, optional) — 要投资的账户标识符。
- `amtToInvest` (double, optional) — 从该账户投资到模型中的现金金额。

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "reqID": "130",
  "subscriptionStatus": 0,
  "subscriptionKey": "2"
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/fa/model/invest-divest"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/fa/model/invest-divest';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{}'
};

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
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/fa/model/invest-divest"

	payload := strings.NewReader("{}")

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

```ruby success
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/fa/model/invest-divest")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fa/model/invest-divest")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fa/model/invest-divest', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/fa/model/invest-divest");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fa/model/invest-divest")! as URL,
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