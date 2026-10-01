# 应用 PTC CSV

POST https://localhost:5000/gw/api/v1/restrictions
Content-Type: text/plain

应用先前已验证的 CSV 更改。需要两个令牌：

**Authorization 请求头** — 包含 `accountId` 声明的 RS256 签名 JWT，用于识别主账户。令牌缺失或无效时不会返回 HTTP 401；请求会继续处理，并在校验时以 `success: false` 失败。

**请求体** — 一个单独的 RS256 签名 JWT（有效期：1 分钟），其载荷包含请求声明（`userName`、`requestId`、`payload`，以及可选的 `isEmpTrack`）。`requestId` 必须与之前某次成功的 `/csv/v2/verify` 调用相匹配。

在请求体 JWT 载荷被解析之前发生的失败（令牌未激活、缺少载荷）会返回 `success: false`，且不包含 `requestId` 字段。**作用域**：`restrictions.write`**安全策略**：`Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/pre-trade-compliance/pre-trade-compliance-restrictions/apply-csv

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 签名 JWT 访问令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 请求头

- `Authorization` (string, required) — RS256 签名 JWT（Bearer 格式），使用您注册的私钥签名。必须包含用于识别主账户的 `accountId` 声明。它与请求体中的 JWT 相互独立，且为其之外的额外要求。

### 请求体（text/plain）

该端点接受一个字符串。

- `string`

## 响应

### 200

始终返回 HTTP 200。请检查 `success` 字段以确定结果。所有失败情形 —— 认证、授权、校验以及内部错误 —— 均返回 `success: false`。

- `success` (boolean, required) — 表示操作是否成功。
- `requestId` (long, optional) — 从请求中原样返回。仅在早期应用失败（请求体令牌未激活、缺少载荷）时缺失，此时 `requestId` 尚未被解析。
- `message` (CsvResponseMessage, optional) — 成功时为 `OK`。失败时为描述错误的纯字符串，或表示结构化桥接（bridge）校验错误的 JSON 对象。

## 类型

### CsvResponseMessage

成功时为 `OK`。失败时为描述错误的纯字符串，或表示结构化桥接（bridge）校验错误的 JSON 对象。

## 示例

### 操作成功

**请求**

```json
"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."
```

**响应**

```json
{
  "success": true,
  "requestId": 1,
  "message": "OK"
}
```

**SDK 代码**

```python Operation succeeded
import requests

url = "https://localhost:5000/gw/api/v1/restrictions"

payload = "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\""
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "text/plain"
}

response = requests.post(url, data=payload, headers=headers)

print(response.json())
```

```javascript Operation succeeded
const url = 'https://localhost:5000/gw/api/v1/restrictions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'text/plain'},
  body: '"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Operation succeeded
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions"

	payload := strings.NewReader("\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "text/plain")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Operation succeeded
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'text/plain'
request.body = "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\""

response = http.request(request)
puts response.read_body
```

```java Operation succeeded
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/restrictions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "text/plain")
  .body("\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"")
  .asString();
```

```php Operation succeeded
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/restrictions', [
  'body' => '"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'text/plain',
  ],
]);

echo $response->getBody();
```

```csharp Operation succeeded
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "text/plain");
request.AddParameter("text/plain", "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Operation succeeded
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "text/plain"
]

let postData = NSData(data: ""eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."".data(using: String.Encoding.utf8)!)

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions")! as URL,
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

### CSV 校验失败 — 纯字符串消息

**请求**

```json
"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."
```

**响应**

```json
{
  "success": false,
  "requestId": 1,
  "message": "Invalid CSV: Missing RULE_END"
}
```

**SDK 代码**

```python CSV validation failed — plain string message
import requests

url = "https://localhost:5000/gw/api/v1/restrictions"

payload = "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\""
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "text/plain"
}

response = requests.post(url, data=payload, headers=headers)

print(response.json())
```

```javascript CSV validation failed — plain string message
const url = 'https://localhost:5000/gw/api/v1/restrictions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'text/plain'},
  body: '"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go CSV validation failed — plain string message
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions"

	payload := strings.NewReader("\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "text/plain")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby CSV validation failed — plain string message
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'text/plain'
request.body = "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\""

response = http.request(request)
puts response.read_body
```

```java CSV validation failed — plain string message
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/restrictions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "text/plain")
  .body("\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"")
  .asString();
```

```php CSV validation failed — plain string message
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/restrictions', [
  'body' => '"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'text/plain',
  ],
]);

echo $response->getBody();
```

```csharp CSV validation failed — plain string message
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "text/plain");
request.AddParameter("text/plain", "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift CSV validation failed — plain string message
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "text/plain"
]

let postData = NSData(data: ""eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."".data(using: String.Encoding.utf8)!)

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions")! as URL,
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

### CSV 校验失败 — 结构化桥接消息

**请求**

```json
"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."
```

**响应**

```json
{
  "success": false,
  "requestId": 1,
  "message": {
    "detail": "Unknown parameter for rule type",
    "errorCode": "RULE_PARAM_INVALID"
  }
}
```

**SDK 代码**

```python CSV validation failed — structured bridge message
import requests

url = "https://localhost:5000/gw/api/v1/restrictions"

payload = "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\""
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "text/plain"
}

response = requests.post(url, data=payload, headers=headers)

print(response.json())
```

```javascript CSV validation failed — structured bridge message
const url = 'https://localhost:5000/gw/api/v1/restrictions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'text/plain'},
  body: '"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go CSV validation failed — structured bridge message
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions"

	payload := strings.NewReader("\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "text/plain")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby CSV validation failed — structured bridge message
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'text/plain'
request.body = "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\""

response = http.request(request)
puts response.read_body
```

```java CSV validation failed — structured bridge message
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/restrictions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "text/plain")
  .body("\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"")
  .asString();
```

```php CSV validation failed — structured bridge message
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/restrictions', [
  'body' => '"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'text/plain',
  ],
]);

echo $response->getBody();
```

```csharp CSV validation failed — structured bridge message
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "text/plain");
request.AddParameter("text/plain", "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift CSV validation failed — structured bridge message
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "text/plain"
]

let postData = NSData(data: ""eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."".data(using: String.Encoding.utf8)!)

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions")! as URL,
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

### 认证或账户解析失败

**请求**

```json
"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."
```

**响应**

```json
{
  "success": false,
  "requestId": 1,
  "message": "Master account not specified and not emp track"
}
```

**SDK 代码**

```python Auth or account resolution failure
import requests

url = "https://localhost:5000/gw/api/v1/restrictions"

payload = "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\""
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "text/plain"
}

response = requests.post(url, data=payload, headers=headers)

print(response.json())
```

```javascript Auth or account resolution failure
const url = 'https://localhost:5000/gw/api/v1/restrictions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'text/plain'},
  body: '"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Auth or account resolution failure
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions"

	payload := strings.NewReader("\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "text/plain")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Auth or account resolution failure
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'text/plain'
request.body = "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\""

response = http.request(request)
puts response.read_body
```

```java Auth or account resolution failure
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/restrictions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "text/plain")
  .body("\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"")
  .asString();
```

```php Auth or account resolution failure
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/restrictions', [
  'body' => '"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'text/plain',
  ],
]);

echo $response->getBody();
```

```csharp Auth or account resolution failure
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "text/plain");
request.AddParameter("text/plain", "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Auth or account resolution failure
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "text/plain"
]

let postData = NSData(data: ""eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."".data(using: String.Encoding.utf8)!)

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions")! as URL,
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

### 仅应用 — 在 requestId 被解析之前请求体令牌失败

**请求**

```json
"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."
```

**响应**

```json
{
  "success": false,
  "message": "The token is not active"
}
```

**SDK 代码**

```python Apply only — body token failure before requestId is parsed
import requests

url = "https://localhost:5000/gw/api/v1/restrictions"

payload = "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\""
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "text/plain"
}

response = requests.post(url, data=payload, headers=headers)

print(response.json())
```

```javascript Apply only — body token failure before requestId is parsed
const url = 'https://localhost:5000/gw/api/v1/restrictions';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'text/plain'},
  body: '"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Apply only — body token failure before requestId is parsed
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions"

	payload := strings.NewReader("\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "text/plain")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Apply only — body token failure before requestId is parsed
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'text/plain'
request.body = "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\""

response = http.request(request)
puts response.read_body
```

```java Apply only — body token failure before requestId is parsed
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/restrictions")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "text/plain")
  .body("\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"")
  .asString();
```

```php Apply only — body token failure before requestId is parsed
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/restrictions', [
  'body' => '"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'text/plain',
  ],
]);

echo $response->getBody();
```

```csharp Apply only — body token failure before requestId is parsed
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "text/plain");
request.AddParameter("text/plain", "\"eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx...\"", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Apply only — body token failure before requestId is parsed
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "text/plain"
]

let postData = NSData(data: ""eyJ0eXAiOiJhdCtKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjFkOTEx..."".data(using: String.Encoding.utf8)!)

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions")! as URL,
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