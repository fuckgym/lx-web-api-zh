# 切换电子邮件推送

PUT https://localhost:5000/v1/api/fyi/deliveryoptions/email

启用或禁用您账户的主电子邮件以接收通知。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fy-is-and-notifications/modify-fyi-emails

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 查询参数

- `enabled` (any, required)

## 响应

### 200

已成功启用或禁用您的电子邮件通知。

- `V` (long, optional) — 返回 1 表示消息已被确认。
- `T` (long, optional) — 返回完成此次编辑所用的时间（毫秒）。

## 错误

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

## 示例

**响应**

```json
{
  "V": 1,
  "T": 10
}
```

**SDK 代码**

```python successEdited
import requests

url = "https://localhost:5000/v1/api/fyi/deliveryoptions/email"

querystring = {"enabled":""}

headers = {"Authorization": "Bearer <token>"}

response = requests.put(url, headers=headers, params=querystring)

print(response.json())
```

```javascript successEdited
const url = 'https://localhost:5000/v1/api/fyi/deliveryoptions/email?enabled=';
const options = {method: 'PUT', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go successEdited
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/fyi/deliveryoptions/email?enabled="

	req, _ := http.NewRequest("PUT", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby successEdited
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/fyi/deliveryoptions/email?enabled=")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Put.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java successEdited
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.put("https://localhost:5000/v1/api/fyi/deliveryoptions/email?enabled=")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php successEdited
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('PUT', 'https://localhost:5000/v1/api/fyi/deliveryoptions/email?enabled=', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp successEdited
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/fyi/deliveryoptions/email?enabled=");
var request = new RestRequest(Method.PUT);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift successEdited
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fyi/deliveryoptions/email?enabled=")! as URL,
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