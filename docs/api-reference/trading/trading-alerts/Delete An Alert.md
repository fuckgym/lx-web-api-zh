# 删除警报

DELETE https://localhost:5000/v1/api/iserver/account/{accountId}/alert/{alertId}
Content-Type: application/json

永久删除一个现有警报。删除 MTA 警报会将其重置为默认状态。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-alerts/delete-alert

## 认证

- `Authorization` 请求头（bearer token, required）— SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱)

## 请求

### 路径参数

- `accountId` (string, required)
- `alertId` (string, required)

## 响应

### 200

一个包含所删除端点详细信息的对象。

- `request_id` (long, optional) — 不适用
- `order_id` (long, optional) — 警报的跟踪编号。有时也称为 alertId 或 alert_id。
- `success` (boolean, optional) — 显示警报请求的结果状态
- `text` (string, optional) — 用于说明成功状态原因的响应消息。
- `failure_list` (string, optional) — 如果 "success" 返回 false，将列出失败的订单 ID

## 错误

### 401 未授权错误

缺少、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

服务器内部错误；当提供的警报 id 不存在时无法删除警报

- `error` (string, optional) — 错误原因

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "order_id": 833967258,
  "success": true,
  "text": "Request was submitted"
}
```

**SDK 代码**

```python successfully-deleted
import requests

url = "https://localhost:5000/v1/api/iserver/account/U1234567/alert/9876543210"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.delete(url, json=payload, headers=headers)

print(response.json())
```

```javascript successfully-deleted
const url = 'https://localhost:5000/v1/api/iserver/account/U1234567/alert/9876543210';
const options = {
  method: 'DELETE',
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

```go successfully-deleted
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/U1234567/alert/9876543210"

	payload := strings.NewReader("{}")

	req, _ := http.NewRequest("DELETE", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby successfully-deleted
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/U1234567/alert/9876543210")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java successfully-deleted
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.delete("https://localhost:5000/v1/api/iserver/account/U1234567/alert/9876543210")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php successfully-deleted
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('DELETE', 'https://localhost:5000/v1/api/iserver/account/U1234567/alert/9876543210', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp successfully-deleted
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/U1234567/alert/9876543210");
var request = new RestRequest(Method.DELETE);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift successfully-deleted
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/U1234567/alert/9876543210")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "DELETE"
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