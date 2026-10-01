# 关闭所有后端数据流

GET https://localhost:5000/v1/api/iserver/marketdata/unsubscribeall

指示 IServer 关闭其针对所有金融工具打开的所有后端数据流。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-market-data/close-all-md-streams

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 响应

### 200

表示成功请求取消订阅所有数据流。

- `unsubscribed` (boolean, optional) — 唯一的键 'unsubscribed' 的布尔值将为 true。

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
  "unsubscribed": true
}
```

**SDK 代码**

```python marketdataUnsubscribeAllSuccessExample
import requests

url = "https://localhost:5000/v1/api/iserver/marketdata/unsubscribeall"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript marketdataUnsubscribeAllSuccessExample
const url = 'https://localhost:5000/v1/api/iserver/marketdata/unsubscribeall';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go marketdataUnsubscribeAllSuccessExample
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/marketdata/unsubscribeall"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby marketdataUnsubscribeAllSuccessExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/marketdata/unsubscribeall")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java marketdataUnsubscribeAllSuccessExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/marketdata/unsubscribeall")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php marketdataUnsubscribeAllSuccessExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/marketdata/unsubscribeall', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp marketdataUnsubscribeAllSuccessExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/marketdata/unsubscribeall");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift marketdataUnsubscribeAllSuccessExample
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/marketdata/unsubscribeall")! as URL,
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