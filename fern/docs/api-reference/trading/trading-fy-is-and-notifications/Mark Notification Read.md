# 将通知标记为已读

PUT https://localhost:5000/v1/api/fyi/notifications/{notificationId}

将某条通知消息标记为已读或未读。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fy-is-and-notifications/read-fyi-notification

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 路径参数

- `notificationId` (any, required)

## 响应

### 200

已成功启用或禁用您的电子邮件通知。

- `V` (long, optional) — 返回 1 表示消息已被确认。
- `T` (long, optional) — 返回完成此次编辑所用的时间（毫秒）。
- `P` (NotificationReadAcknowledgeP, optional) — 返回有关通知已读状态的详细信息。

## 错误

### 400 错误请求错误

参数缺失、为空、非数值或超出范围。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，在传入请求无法被处理时返回。有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，而只有在处理请求的后续阶段才能检测到。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态码

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### NotificationReadAcknowledgeP

返回有关通知已读状态的详细信息。

- `R` (long, optional) — 返回消息是已读 (1) 还是未读 (0)。
- `ID` (string, optional) — 返回该通知的 ID。

## 示例

**响应**

```json
{
  "V": 1,
  "T": 5,
  "P": {
    "R": 1,
    "ID": "2024031947509444"
  }
}
```

**SDK 代码**

```python acknowledged
import requests

url = "https://localhost:5000/v1/api/fyi/notifications/:notificationId"

headers = {"Authorization": "Bearer <token>"}

response = requests.put(url, headers=headers)

print(response.json())
```

```javascript acknowledged
const url = 'https://localhost:5000/v1/api/fyi/notifications/:notificationId';
const options = {method: 'PUT', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go acknowledged
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/fyi/notifications/:notificationId"

	req, _ := http.NewRequest("PUT", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby acknowledged
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/fyi/notifications/:notificationId")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Put.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java acknowledged
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.put("https://localhost:5000/v1/api/fyi/notifications/:notificationId")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php acknowledged
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('PUT', 'https://localhost:5000/v1/api/fyi/notifications/:notificationId', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp acknowledged
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/fyi/notifications/:notificationId");
var request = new RestRequest(Method.PUT);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift acknowledged
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fyi/notifications/:notificationId")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PUT"
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