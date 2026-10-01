# 关闭后端数据流

POST https://localhost:5000/v1/api/iserver/marketdata/unsubscribe
Content-Type: application/json

当不再需要实时快照时，指示 IServer 关闭该金融工具的后端数据流。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-market-data/close-md-stream

## 认证

- `Authorization` 请求头（bearer token, required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 请求

### 请求体 (application/json)

该端点预期接收一个对象。

- `conid` (long, optional) — 要取消订阅其市场数据订阅源的金融工具的 IB 合约 ID。

## 响应

### 200

确认请求成功

- `success` (boolean, optional) — 唯一的键 'success' 将为布尔值 true。

## 错误

### 400 错误请求

参数缺失、为空、非数字或超出范围。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

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

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "success": true
}
```

**SDK 代码**

```python marketdataUnsubscribeSuccessExample
import requests

url = "https://localhost:5000/v1/api/iserver/marketdata/unsubscribe"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript marketdataUnsubscribeSuccessExample
const url = 'https://localhost:5000/v1/api/iserver/marketdata/unsubscribe';
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

```go marketdataUnsubscribeSuccessExample
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/marketdata/unsubscribe"

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

```ruby marketdataUnsubscribeSuccessExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/marketdata/unsubscribe")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java marketdataUnsubscribeSuccessExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/marketdata/unsubscribe")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php marketdataUnsubscribeSuccessExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/marketdata/unsubscribe', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp marketdataUnsubscribeSuccessExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/marketdata/unsubscribe");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift marketdataUnsubscribeSuccessExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/marketdata/unsubscribe")! as URL,
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