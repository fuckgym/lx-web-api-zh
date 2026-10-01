# 已投资该模型的账户摘要

POST https://localhost:5000/v1/api/fa/model/invest-divest-positions
Content-Type: application/json

请求已投资所提供模型的全部账户列表及其投资摘要。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/get-invested-accounts-in-model

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 请求体 (application/json)

该端点期望接收一个对象。

- `reqID` (long, optional) — 用于唯一跟踪请求的请求标识符。
- `model` (string, optional) — 定义要从中检索账户的模型。
- `subscriptionStatus` (long, optional) — 描述该模型是否处于轮询模式。

## 响应

### 200

成功获取预设详情

- `accountList` (list of GetInvestedAccountsSummaryAccountListItems, optional) — 账户详情数组，包含净清算价值与货币信息
- `baseCcyMaster` (string, optional) — 主账户的基础货币（ISO 4217 货币代码）
- `baseCcyMasterPrecision` (string, optional) — 主账户基础货币的精度（小数位数）
- `model` (string, optional) — 与此账户列表关联的模型投资组合标识符
- `reqID` (long, optional) — 用于跟踪 API 调用的唯一请求标识符
- `subscriptionStatus` (enum, optional) — 市场数据订阅状态（1 = 活动，0 = 非活动）
  - Allowed values: `0`, `1`

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

### GetInvestedAccountsSummaryAccountListItems

- `account` (string, optional) — 账户标识符（账户号码）
- `accountModelNlv` (string, optional) — 当前模型投资组合中持仓的净清算价值
- `accountOtherModelsNlv` (string, optional) — 其他模型投资组合中持仓的净清算价值
- `alias` (string, optional) — 用户为账户定义的别名（未设置时为空字符串）
- `baseCcyAccount` (string, optional) — 该账户的基础货币（ISO 4217 货币代码）
- `baseCcyAccountPrecision` (string, optional) — 账户基础货币的精度（小数位数）
- `exchangeRate` (double, optional) — 从账户基础货币到主账户基础货币的汇率
- `cashInIndependentNlv` (string, optional) — 以基础货币表示的单独现金净清算价值
- `positionsInIndependentNlv` (string, optional) — 以基础货币表示的单独持仓净清算价值
- `nlv` (string, optional) — 以基础货币表示的总净清算价值（现金 + 持仓）

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "accountList": [
    {
      "account": "DU12346",
      "accountModelNlv": "0",
      "accountOtherModelsNlv": "30545.33",
      "alias": "",
      "baseCcyAccount": "USD",
      "baseCcyAccountPrecision": "0.01",
      "exchangeRate": 1,
      "cashInIndependentNlv": "974589.5",
      "positionsInIndependentNlv": "6820.19",
      "nlv": "1011955.02"
    },
    {
      "account": "DU12347",
      "accountModelNlv": "0",
      "accountOtherModelsNlv": "-17.91",
      "alias": "",
      "baseCcyAccount": "USD",
      "baseCcyAccountPrecision": "0.01",
      "exchangeRate": 1,
      "cashInIndependentNlv": "1006063.06",
      "positionsInIndependentNlv": "6320.08",
      "nlv": "1012365.23"
    }
  ],
  "baseCcyMaster": "USD",
  "baseCcyMasterPrecision": "0.01",
  "model": "USModel",
  "reqID": 129,
  "subscriptionStatus": 1
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/fa/model/invest-divest-positions"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/fa/model/invest-divest-positions';
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

	url := "https://localhost:5000/v1/api/fa/model/invest-divest-positions"

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

url = URI("https://localhost:5000/v1/api/fa/model/invest-divest-positions")

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

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fa/model/invest-divest-positions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fa/model/invest-divest-positions', [
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

var client = new RestClient("https://localhost:5000/v1/api/fa/model/invest-divest-positions");
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

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fa/model/invest-divest-positions")! as URL,
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