# 模型现金分析器

POST https://localhost:5000/v1/api/fa/model/cash-analyzer
Content-Type: application/json

运行模型现金分析器，以审查待处理的资金划转、外汇（FX）转换订单，以及当前待处理的模型分配计划可能引发的任何保证金警告。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/model-cash-analyzer

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 请求体 (application/json)

该端点期望接收一个对象。

- `reqID` (long, required) — 用于唯一跟踪请求的请求标识符。
- `subscriptionKey` (string, optional) — 订阅密钥。首次请求时发送空字符串。

## 响应

### 200

成功获取现金分析器摘要。

- `cashTransfers` (list of twsInvestDivestCashTransfer, optional) — 当前分配计划所需的资金划转。
- `error` (string, optional, nullable) — 分析器产生的错误消息，若无则为 `null`。
- `fxconvorders` (list of CashAnalyzerResponseFxconvordersItems, optional) — 为该计划注资所需的外汇转换订单。
- `marginWarning` (boolean, optional) — 如果该计划会触发保证金警告，则为 true。
- `reqID` (long, optional) — 从原始请求回显的请求标识符。
- `subscriptionStatus` (long, optional) — 描述该模型是否处于轮询模式。
- `success` (boolean, optional) — 表示分析器已成功完成。
- `transfersInstructionId` (long, optional) — 对生成的划转进行分组的标识符；请提供给下游的提交端点。

## 错误

### 401 未授权错误

缺少、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，在无法处理传入请求时返回。有时可能包含部分属于错误请求的情况。例如，传入的 accountId 有误，而只能在处理请求的后续阶段才检测出来。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，若因某些内部服务不可用导致请求耗时超过 10 秒，则请求会被中止并返回此状态码。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### twsInvestDivestCashTransfer

由 TWS invest/divest 规划器生成的源模型与目标模型之间的资金划转。

- `account` (string, optional) — 该资金划转所适用的账户。
- `amt` (string, optional) — 要划转的现金金额，以 `ccy` 表示。
- `batchNumber` (long, optional) — 用于对提交的划转进行排序的批次分组。
- `ccy` (string, optional) — 资金划转的货币（ISO 4217）。
- `destinationModel` (string, optional) — 接收现金的模型。
- `sourceModel` (string, optional) — 提供现金的模型（例如独立现金池的 `Core`）。

### CashAnalyzerResponseFxconvordersItems

## 示例

**请求**

```json
{
  "reqID": 398899
}
```

**响应**

```json
{
  "cashTransfers": [],
  "error": "None",
  "fxconvorders": [],
  "marginWarning": false,
  "reqID": 398899,
  "subscriptionStatus": 1,
  "success": true,
  "transfersInstructionId": 3
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/fa/model/cash-analyzer"

payload = { "reqID": 398899 }
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/fa/model/cash-analyzer';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"reqID":398899}'
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

	url := "https://localhost:5000/v1/api/fa/model/cash-analyzer"

	payload := strings.NewReader("{\n  \"reqID\": 398899\n}")

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

url = URI("https://localhost:5000/v1/api/fa/model/cash-analyzer")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"reqID\": 398899\n}"

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fa/model/cash-analyzer")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"reqID\": 398899\n}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fa/model/cash-analyzer', [
  'body' => '{
  "reqID": 398899
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/fa/model/cash-analyzer");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"reqID\": 398899\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = ["reqID": 398899] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fa/model/cash-analyzer")! as URL,
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