# 根据请求参数以受支持的格式获取成交确认

POST https://localhost:5000/gw/api/v1/trade-confirmations
Content-Type: application/json

**范围**：`statements.write` OR `reports.write`**安全策略**：`Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-reports/create-trade-confirmations

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用你注册的私钥进行签名的 RS256 签名 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 请求头

- `authorization` (string, required) — 指定授权请求头的值（例如 Bearer eyJ0eXAiOiJKV1...）。

### 请求体 (application/json)

该端点期望接收一个 TradeConfirmationRequest。

- `accountId` (string, required) — 账户 ID
- `startDate` (string, required) — 起始日期
- `endDate` (string, required) — 结束日期
- `mimeType` (string, optional) — 输出格式

## 响应

### 200

返回一个包含相关成交确认的 JSON 对象。

- `data` (TradeConfirmationResponseData, optional)

## 错误

### 400 错误请求

返回一个表示错误请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 401 未授权错误

返回一个表示未授权请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `detail` (string, optional)

### 402 需要付款错误

返回一个表示未授权请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `detail` (string, optional)

### 403 禁止访问错误

返回一个表示被禁止请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `detail` (string, optional)

### 500 内部服务器错误

返回一个表示内部服务器错误的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### TradeConfirmationResponseData

- `dataType` (string, optional) — 解码后该值的数据类型
- `encoding` (string, optional) — 该值所使用的编码
- `value` (string, optional) — byte[] 的 Base 64 编码字符串。当 gzip 为 true 时，byte[] 表示压缩数据
- `mimeType` (string, optional) — 对该值进行解码和序列化后文档的 mimeType
- `gzip` (boolean, optional) — 内容编码标志。表示响应是否已被压缩
- `accept` (string, optional) — 指定可接受的响应媒体类型

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

## 示例

**请求**

```json
{
  "accountId": "UXXXX",
  "startDate": "20230102",
  "endDate": "20230115"
}
```

**响应**

```json
{
  "data": {
    "dataType": "string",
    "encoding": "string",
    "value": "string",
    "mimeType": "string",
    "gzip": true,
    "accept": "string"
  }
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/trade-confirmations"

payload = {
    "accountId": "UXXXX",
    "startDate": "20230102",
    "endDate": "20230115"
}
headers = {
    "authorization": "Bearer eyJ0eXAiOiJKV1...",
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/trade-confirmations';
const options = {
  method: 'POST',
  headers: {
    authorization: 'Bearer eyJ0eXAiOiJKV1...',
    Authorization: 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: '{"accountId":"UXXXX","startDate":"20230102","endDate":"20230115"}'
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

	url := "https://localhost:5000/gw/api/v1/trade-confirmations"

	payload := strings.NewReader("{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"20230102\",\n  \"endDate\": \"20230115\"\n}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("authorization", "Bearer eyJ0eXAiOiJKV1...")
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

url = URI("https://localhost:5000/gw/api/v1/trade-confirmations")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["authorization"] = 'Bearer eyJ0eXAiOiJKV1...'
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"20230102\",\n  \"endDate\": \"20230115\"\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/trade-confirmations")
  .header("authorization", "Bearer eyJ0eXAiOiJKV1...")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"20230102\",\n  \"endDate\": \"20230115\"\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/trade-confirmations', [
  'body' => '{
  "accountId": "UXXXX",
  "startDate": "20230102",
  "endDate": "20230115"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
    'authorization' => 'Bearer eyJ0eXAiOiJKV1...',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/trade-confirmations");
var request = new RestRequest(Method.POST);
request.AddHeader("authorization", "Bearer eyJ0eXAiOiJKV1...");
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"20230102\",\n  \"endDate\": \"20230115\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "authorization": "Bearer eyJ0eXAiOiJKV1...",
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "accountId": "UXXXX",
  "startDate": "20230102",
  "endDate": "20230115"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/trade-confirmations")! as URL,
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