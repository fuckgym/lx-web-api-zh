# 创建自选列表

POST https://localhost:5000/v1/api/iserver/watchlist
Content-Type: application/json

通过提交一组 conid 创建一个命名的自选列表。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-watchlists/post-new-watchlist

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 请求体 (application/json)

该端点期望接收一个对象。

- `id` (string, required) — 必须为数字，且仅能包含数字 0-9。必须相对于其他自选列表 ID 唯一。
- `name` (string, required) — 将在 TWS 和客户端门户中显示的任意易读名称。
- `rows` (list of V1ApiIserverWatchlistPostRequestBodyContentApplicationJsonSchemaRowsItems, required) — 对应自选列表各行的 JSON 对象数组，每个金融工具一行。

## 响应

### 200

自选列表创建成功。

- `id` (string, optional) — 已提交的自选列表 ID。
- `hash` (string, optional) — IB 对所提交自选列表的内部哈希值。
- `name` (string, optional) — 已提交的自选列表易读名称。
- `readOnly` (boolean, optional) — 指示该自选列表是否被限制写入。用户创建的自选列表始终显示 false。
- `instruments` (list of any, optional) — 数组将始终为空。内容可通过 `GET /iserver/watchlist?id=` 查询

## 错误

### 400 错误请求错误

缺少参数、参数为空、参数非数字或超出范围。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，当传入请求无法被处理时返回。有时可能包含部分错误请求的情况。例如，传入的 accountId 有误，而只有在处理请求的过程中才能检测到。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### V1ApiIserverWatchlistPostRequestBodyContentApplicationJsonSchemaRowsItems

- `C` (string, optional) — 以字符串形式表示的 Conid。

## 示例

**请求**

```json
{
  "id": "string",
  "name": "string",
  "rows": [
    {}
  ]
}
```

**响应**

```json
{
  "id": "string",
  "hash": "string",
  "name": "string",
  "readOnly": true,
  "instruments": [
    "string"
  ]
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/v1/api/iserver/watchlist"

payload = {
    "id": "string",
    "name": "string",
    "rows": [{}]
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/v1/api/iserver/watchlist';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"id":"string","name":"string","rows":[{}]}'
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

	url := "https://localhost:5000/v1/api/iserver/watchlist"

	payload := strings.NewReader("{\n  \"id\": \"string\",\n  \"name\": \"string\",\n  \"rows\": [\n    {}\n  ]\n}")

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

url = URI("https://localhost:5000/v1/api/iserver/watchlist")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"id\": \"string\",\n  \"name\": \"string\",\n  \"rows\": [\n    {}\n  ]\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/watchlist")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"id\": \"string\",\n  \"name\": \"string\",\n  \"rows\": [\n    {}\n  ]\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/watchlist', [
  'body' => '{
  "id": "string",
  "name": "string",
  "rows": [
    {}
  ]
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

var client = new RestClient("https://localhost:5000/v1/api/iserver/watchlist");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"id\": \"string\",\n  \"name\": \"string\",\n  \"rows\": [\n    {}\n  ]\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "id": "string",
  "name": "string",
  "rows": [[]]
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/watchlist")! as URL,
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