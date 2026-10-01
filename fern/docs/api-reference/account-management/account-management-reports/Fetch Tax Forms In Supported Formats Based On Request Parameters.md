# 根据请求参数以受支持的格式获取税务表格

POST https://localhost:5000/gw/api/v1/tax-documents
Content-Type: application/json

**Scope**: `statements.write` OR `reports.write`**Security Policy**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-reports/create-tax-documents

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 签名 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 请求头

- `authorization` (string, required) — 指定 authorization 请求头的值（例如 Bearer eyJ0eXAiOiJKV1...）。

### 请求体 (application/json)

该端点预期接收一个 TaxFormRequest。

- `accountId` (string, required) — 账户 id
- `year` (string, required) — 税务年度
- `type` (string, required) — 税务表格类型（可通过 /api/v1/tax-documents/available 获取可用的税务文件）
- `format` (string, required) — 格式
- `gzip` (boolean, optional, default: false) — 要对整个响应进行 gzip 压缩请传入 true

## 响应

### 200

返回一个 JSON 对象，其中包含相关的税务表格。

- `data` (TaxFormResponseData, optional)

## 错误

### 400 错误请求错误

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

### TaxFormResponseData

- `dataType` (string, optional) — 解码后值的数据类型
- `encoding` (string, optional) — 值所使用的编码
- `value` (string, optional) — byte[] 的 Base 64 编码字符串。当 gzip 为 true 时，byte[] 表示压缩数据
- `mimeType` (string, optional) — 对值解码并序列化后文档的 mimeType
- `gzip` (boolean, optional) — 内容编码标志。表示响应是否被压缩
- `accept` (string, optional) — 指定可接受的响应媒体类型

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

## 示例

**请求**

```json
{
  "accountId": "UXXXX",
  "year": "2023",
  "type": "ALL,1099,1099R,1042S,8949",
  "format": "HTML,CSV,PDF"
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

url = "https://localhost:5000/gw/api/v1/tax-documents"

payload = {
    "accountId": "UXXXX",
    "year": "2023",
    "type": "ALL,1099,1099R,1042S,8949",
    "format": "HTML,CSV,PDF"
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
const url = 'https://localhost:5000/gw/api/v1/tax-documents';
const options = {
  method: 'POST',
  headers: {
    authorization: 'Bearer eyJ0eXAiOiJKV1...',
    Authorization: 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: '{"accountId":"UXXXX","year":"2023","type":"ALL,1099,1099R,1042S,8949","format":"HTML,CSV,PDF"}'
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

	url := "https://localhost:5000/gw/api/v1/tax-documents"

	payload := strings.NewReader("{\n  \"accountId\": \"UXXXX\",\n  \"year\": \"2023\",\n  \"type\": \"ALL,1099,1099R,1042S,8949\",\n  \"format\": \"HTML,CSV,PDF\"\n}")

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

url = URI("https://localhost:5000/gw/api/v1/tax-documents")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["authorization"] = 'Bearer eyJ0eXAiOiJKV1...'
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"accountId\": \"UXXXX\",\n  \"year\": \"2023\",\n  \"type\": \"ALL,1099,1099R,1042S,8949\",\n  \"format\": \"HTML,CSV,PDF\"\n}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/tax-documents")
  .header("authorization", "Bearer eyJ0eXAiOiJKV1...")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"accountId\": \"UXXXX\",\n  \"year\": \"2023\",\n  \"type\": \"ALL,1099,1099R,1042S,8949\",\n  \"format\": \"HTML,CSV,PDF\"\n}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/tax-documents', [
  'body' => '{
  "accountId": "UXXXX",
  "year": "2023",
  "type": "ALL,1099,1099R,1042S,8949",
  "format": "HTML,CSV,PDF"
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

var client = new RestClient("https://localhost:5000/gw/api/v1/tax-documents");
var request = new RestRequest(Method.POST);
request.AddHeader("authorization", "Bearer eyJ0eXAiOiJKV1...");
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"accountId\": \"UXXXX\",\n  \"year\": \"2023\",\n  \"type\": \"ALL,1099,1099R,1042S,8949\",\n  \"format\": \"HTML,CSV,PDF\"\n}", ParameterType.RequestBody);
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
  "year": "2023",
  "type": "ALL,1099,1099R,1042S,8949",
  "format": "HTML,CSV,PDF"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/tax-documents")! as URL,
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