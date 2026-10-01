# 基于请求参数以受支持的格式生成对账单

POST https://localhost:5000/gw/api/v1/statements
Content-Type: application/json

**范围**: `statements.read` OR `statements.write` OR `reports.write`**安全策略**: `Signed JWT`

参考： https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-reports/create-statements

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway，默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 请求头

- `authorization` (string, required) — 指定授权请求头的值（例如 Bearer eyJ0eXAiOiJKV1...）。

### 请求体 (application/json)

此端点期望接收一个 StmtRequest。

- `accountId` (string, required) — 账户 ID
- `startDate` (string, required) — 起始日期
- `endDate` (string, required) — 结束日期
- `accountIds` (list of string, optional) — 账户 ID 数组
- `multiAccountFormat` (string, optional) — 可能取值为 consolidate、concatenate 或 customConsolidate
- `cryptoConsolIfAvailable` (boolean, optional, default: false) — 加密货币合并标志，如果请求包含任何属于加密货币分部的账户，则会将请求转换为加密货币合并（Crypto Consolidated）
- `mimeType` (string, optional) — 输出格式
- `language` (string, optional, default: en) — 两位字符的 ISO 语言代码
- `gzip` (boolean, optional, default: false) — 若要 gzip 整个响应，请传入 true

## 响应

### 200

返回包含相关对账单的 JSON 对象。

- `data` (GetStatementsResponseData, optional)

## 错误

### 400 错误请求错误

返回表示错误请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `invalidArguments` (list of InvalidArgument, optional)

### 401 未授权错误

返回表示未授权请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `detail` (string, optional)

### 402 需要付款错误

返回表示未授权请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `detail` (string, optional)

### 403 禁止访问错误

返回表示禁止访问请求的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)
- `detail` (string, optional)

### 500 服务器内部错误

返回表示服务器内部错误的 Problem detail 实例。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 类型

### GetStatementsResponseData

- `dataType` (string, optional) — 该值解码后的数据类型
- `encoding` (string, optional) — 该值使用的编码
- `value` (string, optional) — byte[] 的 Base 64 编码字符串。当 gzip 为 true 时，byte[] 表示压缩数据
- `mimeType` (string, optional) — 对该值解码并序列化后文档的 mimeType
- `gzip` (boolean, optional) — 内容编码标志。表示响应是否已压缩
- `accept` (string, optional) — 指定可接受的响应媒体类型

### InvalidArgument

- `field` (string, required)
- `description` (string, optional)

## 示例

### Daily html

**请求**

```json
{
  "accountId": "UXXXX",
  "startDate": "20230102",
  "endDate": "20230102",
  "mimeType": "text/html"
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

```python Daily html
import requests

url = "https://localhost:5000/gw/api/v1/statements"

payload = {
    "accountId": "UXXXX",
    "startDate": "20230102",
    "endDate": "20230102",
    "mimeType": "text/html"
}
headers = {
    "authorization": "Bearer eyJ0eXAiOiJKV1...",
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Daily html
const url = 'https://localhost:5000/gw/api/v1/statements';
const options = {
  method: 'POST',
  headers: {
    authorization: 'Bearer eyJ0eXAiOiJKV1...',
    Authorization: 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: '{"accountId":"UXXXX","startDate":"20230102","endDate":"20230102","mimeType":"text/html"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Daily html
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/statements"

	payload := strings.NewReader("{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"20230102\",\n  \"endDate\": \"20230102\",\n  \"mimeType\": \"text/html\"\n}")

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

```ruby Daily html
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/statements")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["authorization"] = 'Bearer eyJ0eXAiOiJKV1...'
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"20230102\",\n  \"endDate\": \"20230102\",\n  \"mimeType\": \"text/html\"\n}"

response = http.request(request)
puts response.read_body
```

```java Daily html
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/statements")
  .header("authorization", "Bearer eyJ0eXAiOiJKV1...")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"20230102\",\n  \"endDate\": \"20230102\",\n  \"mimeType\": \"text/html\"\n}")
  .asString();
```

```php Daily html
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/statements', [
  'body' => '{
  "accountId": "UXXXX",
  "startDate": "20230102",
  "endDate": "20230102",
  "mimeType": "text/html"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
    'authorization' => 'Bearer eyJ0eXAiOiJKV1...',
  ],
]);

echo $response->getBody();
```

```csharp Daily html
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/statements");
var request = new RestRequest(Method.POST);
request.AddHeader("authorization", "Bearer eyJ0eXAiOiJKV1...");
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"20230102\",\n  \"endDate\": \"20230102\",\n  \"mimeType\": \"text/html\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Daily html
import Foundation

let headers = [
  "authorization": "Bearer eyJ0eXAiOiJKV1...",
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "accountId": "UXXXX",
  "startDate": "20230102",
  "endDate": "20230102",
  "mimeType": "text/html"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/statements")! as URL,
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

### Monthly pdf

**请求**

```json
{
  "accountId": "UXXXX",
  "startDate": "202301",
  "endDate": "202301",
  "mimeType": "application/pdf"
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

```python Monthly pdf
import requests

url = "https://localhost:5000/gw/api/v1/statements"

payload = {
    "accountId": "UXXXX",
    "startDate": "202301",
    "endDate": "202301",
    "mimeType": "application/pdf"
}
headers = {
    "authorization": "Bearer eyJ0eXAiOiJKV1...",
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Monthly pdf
const url = 'https://localhost:5000/gw/api/v1/statements';
const options = {
  method: 'POST',
  headers: {
    authorization: 'Bearer eyJ0eXAiOiJKV1...',
    Authorization: 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: '{"accountId":"UXXXX","startDate":"202301","endDate":"202301","mimeType":"application/pdf"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Monthly pdf
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/statements"

	payload := strings.NewReader("{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"202301\",\n  \"endDate\": \"202301\",\n  \"mimeType\": \"application/pdf\"\n}")

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

```ruby Monthly pdf
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/statements")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["authorization"] = 'Bearer eyJ0eXAiOiJKV1...'
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"202301\",\n  \"endDate\": \"202301\",\n  \"mimeType\": \"application/pdf\"\n}"

response = http.request(request)
puts response.read_body
```

```java Monthly pdf
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/statements")
  .header("authorization", "Bearer eyJ0eXAiOiJKV1...")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"202301\",\n  \"endDate\": \"202301\",\n  \"mimeType\": \"application/pdf\"\n}")
  .asString();
```

```php Monthly pdf
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/statements', [
  'body' => '{
  "accountId": "UXXXX",
  "startDate": "202301",
  "endDate": "202301",
  "mimeType": "application/pdf"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
    'authorization' => 'Bearer eyJ0eXAiOiJKV1...',
  ],
]);

echo $response->getBody();
```

```csharp Monthly pdf
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/statements");
var request = new RestRequest(Method.POST);
request.AddHeader("authorization", "Bearer eyJ0eXAiOiJKV1...");
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"202301\",\n  \"endDate\": \"202301\",\n  \"mimeType\": \"application/pdf\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Monthly pdf
import Foundation

let headers = [
  "authorization": "Bearer eyJ0eXAiOiJKV1...",
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "accountId": "UXXXX",
  "startDate": "202301",
  "endDate": "202301",
  "mimeType": "application/pdf"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/statements")! as URL,
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

### Daily html gzip

**请求**

```json
{
  "accountId": "UXXXX",
  "startDate": "20230102",
  "endDate": "20230102",
  "mimeType": "text/html",
  "gzip": true
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

```python Daily html gzip
import requests

url = "https://localhost:5000/gw/api/v1/statements"

payload = {
    "accountId": "UXXXX",
    "startDate": "20230102",
    "endDate": "20230102",
    "mimeType": "text/html",
    "gzip": True
}
headers = {
    "authorization": "Bearer eyJ0eXAiOiJKV1...",
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Daily html gzip
const url = 'https://localhost:5000/gw/api/v1/statements';
const options = {
  method: 'POST',
  headers: {
    authorization: 'Bearer eyJ0eXAiOiJKV1...',
    Authorization: 'Bearer <token>',
    'Content-Type': 'application/json'
  },
  body: '{"accountId":"UXXXX","startDate":"20230102","endDate":"20230102","mimeType":"text/html","gzip":true}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Daily html gzip
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/statements"

	payload := strings.NewReader("{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"20230102\",\n  \"endDate\": \"20230102\",\n  \"mimeType\": \"text/html\",\n  \"gzip\": true\n}")

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

```ruby Daily html gzip
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/statements")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["authorization"] = 'Bearer eyJ0eXAiOiJKV1...'
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"20230102\",\n  \"endDate\": \"20230102\",\n  \"mimeType\": \"text/html\",\n  \"gzip\": true\n}"

response = http.request(request)
puts response.read_body
```

```java Daily html gzip
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/statements")
  .header("authorization", "Bearer eyJ0eXAiOiJKV1...")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"20230102\",\n  \"endDate\": \"20230102\",\n  \"mimeType\": \"text/html\",\n  \"gzip\": true\n}")
  .asString();
```

```php Daily html gzip
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/statements', [
  'body' => '{
  "accountId": "UXXXX",
  "startDate": "20230102",
  "endDate": "20230102",
  "mimeType": "text/html",
  "gzip": true
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
    'authorization' => 'Bearer eyJ0eXAiOiJKV1...',
  ],
]);

echo $response->getBody();
```

```csharp Daily html gzip
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/statements");
var request = new RestRequest(Method.POST);
request.AddHeader("authorization", "Bearer eyJ0eXAiOiJKV1...");
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"accountId\": \"UXXXX\",\n  \"startDate\": \"20230102\",\n  \"endDate\": \"20230102\",\n  \"mimeType\": \"text/html\",\n  \"gzip\": true\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Daily html gzip
import Foundation

let headers = [
  "authorization": "Bearer eyJ0eXAiOiJKV1...",
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "accountId": "UXXXX",
  "startDate": "20230102",
  "endDate": "20230102",
  "mimeType": "text/html",
  "gzip": true
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/statements")! as URL,
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