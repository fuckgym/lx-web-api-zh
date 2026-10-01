# 设置模型分配

POST https://localhost:5000/v1/api/fa/model/save
Content-Type: application/json

创建或修改模型的目标持仓。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-model-portfolios/set-model-target-positions

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 请求体 (application/json)

该端点期望接收一个对象。

- `cashTargets` (list of V1ApiFaModelSavePostRequestBodyContentApplicationJsonSchemaCashTargetsItems, required) — 目标现金对象数组
- `desc` (string, required) — 模型的个人描述，用于在 IBKR GUI 元素中显示。
- `isStatic` (boolean, required) — 确定投资和再平衡应静态处理还是动态处理。* `true` - 静态模型将始终使用原始目标。* `false` - 动态模型会根据市场变动调整分配。
- `model` (string, required) — 你的模型名称。
- `positionTargets` (list of V1ApiFaModelSavePostRequestBodyContentApplicationJsonSchemaPositionTargetsItems, required) — 包含模型要持有的全部合约的列表。
- `reqID` (long, required) — 用于唯一跟踪请求的请求标识符。

## 响应

### 200

成功保存模型

- `reqID` (long, optional) — 用于唯一跟踪请求的请求标识符。
- `success` (boolean, optional) — 表示请求已成功提交。

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

### V1ApiFaModelSavePostRequestBodyContentApplicationJsonSchemaCashTargetsItems

- `ccy` (string, optional) — 持有持仓所用的货币代码。
- `target` (double, optional) — 分配给给定货币的模型百分比。

### V1ApiFaModelSavePostRequestBodyContentApplicationJsonSchemaPositionTargetsItems

- `conid` (long, optional) — 合约标识符（conid），用于指定要持有的证券。
- `target` (double, optional) — 分配给给定货币的模型百分比。

## 示例

**请求**

```json
{
  "cashTargets": [
    {}
  ],
  "desc": "string",
  "isStatic": true,
  "model": "Sample-Model",
  "positionTargets": [
    {}
  ],
  "reqID": 540607
}
```

**响应**

```json
{
  "reqID": 540607,
  "success": true
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/v1/api/fa/model/save"

payload = {
    "cashTargets": [{}],
    "desc": "string",
    "isStatic": True,
    "model": "Sample-Model",
    "positionTargets": [{}],
    "reqID": 540607
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/v1/api/fa/model/save';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"cashTargets":[{}],"desc":"string","isStatic":true,"model":"Sample-Model","positionTargets":[{}],"reqID":540607}'
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
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/fa/model/save"

	payload := strings.NewReader("{\n  \"cashTargets\": [\n    {}\n  ],\n  \"desc\": \"string\",\n  \"isStatic\": true,\n  \"model\": \"Sample-Model\",\n  \"positionTargets\": [\n    {}\n  ],\n  \"reqID\": 540607\n}")

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

```ruby
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/fa/model/save")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"cashTargets\": [\n    {}\n  ],\n  \"desc\": \"string\",\n  \"isStatic\": true,\n  \"model\": \"Sample-Model\",\n  \"positionTargets\": [\n    {}\n  ],\n  \"reqID\": 540607\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fa/model/save")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"cashTargets\": [\n    {}\n  ],\n  \"desc\": \"string\",\n  \"isStatic\": true,\n  \"model\": \"Sample-Model\",\n  \"positionTargets\": [\n    {}\n  ],\n  \"reqID\": 540607\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fa/model/save', [
  'body' => '{
  "cashTargets": [
    {}
  ],
  "desc": "string",
  "isStatic": true,
  "model": "Sample-Model",
  "positionTargets": [
    {}
  ],
  "reqID": 540607
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/fa/model/save");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"cashTargets\": [\n    {}\n  ],\n  \"desc\": \"string\",\n  \"isStatic\": true,\n  \"model\": \"Sample-Model\",\n  \"positionTargets\": [\n    {}\n  ],\n  \"reqID\": 540607\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "cashTargets": [[]],
  "desc": "string",
  "isStatic": true,
  "model": "Sample-Model",
  "positionTargets": [[]],
  "reqID": 540607
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fa/model/save")! as URL,
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