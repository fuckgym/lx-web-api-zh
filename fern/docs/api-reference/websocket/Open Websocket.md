# 打开 Websocket 连接

GET https://localhost:5000/v1/api/ws

打开 websocket。

参考：https://ibkrcampus.com/docs/web-api/api-reference/websocket/open-websocket

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 请求

### 查询参数

- `bearer_token` (string, optional) — OAuth 2.0 用户必填。定义用于授权连接的 Bearer 令牌的查询参数。
- `oauth_token` (string, optional) — 使用 OAuth 1.0a 授权时必填。8 字符的 OAuth 访问令牌。

### 请求头

- `Connection` (enum, required)
  - Allowed values: `Upgrade`
- `Upgrade` (enum, required)
  - Allowed values: `websocket`

## 示例

**SDK 代码**

```python
import requests

url = "https://localhost:5000/v1/api/ws"

headers = {
    "Connection": "Upgrade",
    "Upgrade": "websocket",
    "Authorization": "Bearer <token>"
}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/v1/api/ws';
const options = {
  method: 'GET',
  headers: {Connection: 'Upgrade', Upgrade: 'websocket', Authorization: 'Bearer <token>'}
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
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/ws"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Connection", "Upgrade")
	req.Header.Add("Upgrade", "websocket")
	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://localhost:5000/v1/api/ws")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Connection"] = 'Upgrade'
request["Upgrade"] = 'websocket'
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/ws")
  .header("Connection", "Upgrade")
  .header("Upgrade", "websocket")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/ws', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Connection' => 'Upgrade',
    'Upgrade' => 'websocket',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/ws");
var request = new RestRequest(Method.GET);
request.AddHeader("Connection", "Upgrade");
request.AddHeader("Upgrade", "websocket");
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Connection": "Upgrade",
  "Upgrade": "websocket",
  "Authorization": "Bearer <token>"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/ws")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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