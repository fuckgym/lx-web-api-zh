# 获取模型账户

POST https://localhost:5000/v1/api/fa/model/accounts-details
Content-Type: application/json

请求某个模型中持有的所有账户。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/get-accounts-in-model

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 请求体 (application/json)

该端点期望接收一个对象。

- `calcPnls` (boolean, optional) — 确定是否计算盈亏值。
- `model` (string, optional) — 请求要从中提取账户详情的模型。
- `reqID` (long, optional) — 用于唯一跟踪请求的请求标识符。

## 响应

### 200

成功获取某个模型中的账户详情。

- `accountInfoList` (list of V1ApiFaModelAccountsDetailsPostResponsesContentApplicationJsonSchemaAccountInfoListItems, optional) — 该模型中持有的账户集合。
- `baseCcyMaster` (string, optional) — 模型的基础货币。
- `model` (string, optional) — 从中检索账户的模型。
- `reqID` (long, optional) — 该请求的唯一标识符。

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

### V1ApiFaModelAccountsDetailsPostResponsesContentApplicationJsonSchemaAccountInfoListItems

- `account` (string, optional) — 账户标识符。
- `accountImbalance` (string, optional) — 账户相对于目标分配的失衡度。
- `alias` (string, optional) — 账户别名。
- `baseCcyAccount` (string, optional) — 账户的基础货币。
- `costBasis` (string, optional) — 成本基础。
- `exchangeRate` (double, optional) — 账户基础货币相对于模型基础货币的汇率。
- `nlv` (string, optional) — 该金融工具的净清算价值。
- `numInstrumentsOutsideRange` (long, optional) — 该账户持有的超出预设分配范围的金融工具数量。
- `unrealizedPnL` (string, optional) — 该账户中模型的未实现盈亏。

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "accountInfoList": [
    {
      "account": "DU12346",
      "accountImbalance": "0.904036",
      "alias": "",
      "baseCcyAccount": "USD",
      "costBasis": "0",
      "exchangeRate": 1,
      "nlv": "0",
      "numInstrumentsOutsideRange": 2,
      "unrealizedPnL": "0",
      "cashInIndependent": "974588.11"
    },
    {
      "account": "DU12348",
      "accountImbalance": "0.904036",
      "alias": "",
      "baseCcyAccount": "USD",
      "costBasis": "0",
      "exchangeRate": 1,
      "nlv": "0",
      "numInstrumentsOutsideRange": 2,
      "unrealizedPnL": "0",
      "cashInIndependent": "1006035.06"
    },
    {
      "account": "TOTAL",
      "accountImbalance": "0",
      "alias": "None",
      "baseCcyAccount": "USD",
      "costBasis": "0",
      "exchangeRate": 1,
      "nlv": "0",
      "numInstrumentsOutsideRange": 0,
      "unrealizedPnL": "0",
      "cashInIndependent": "1980623.17"
    }
  ],
  "baseCcyMaster": "USD",
  "model": "MCPAPI01",
  "reqID": 131
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/fa/model/accounts-details"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/fa/model/accounts-details';
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

	url := "https://localhost:5000/v1/api/fa/model/accounts-details"

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

url = URI("https://localhost:5000/v1/api/fa/model/accounts-details")

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

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fa/model/accounts-details")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fa/model/accounts-details', [
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

var client = new RestClient("https://localhost:5000/v1/api/fa/model/accounts-details");
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

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fa/model/accounts-details")! as URL,
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