# 校验 PTC CSV

POST https://localhost:5000/gw/api/v1/restrictions/verify
Content-Type: application/json

在不应用变更的情况下校验 CSV 内容。必须在使用相同的 `requestId` 调用 `/csv/v2/apply` 之前调用。

主账户身份由 Authorization 请求头 JWT 中的 `accountId` 声明解析得出。请勿在请求体中包含 `masterAcctId`。

缺少或无效的 Authorization 请求头不会返回 HTTP 401。请求会继续执行并在校验阶段失败，返回 `success: false, message: "Master account not specified and not emp track"`，除非在请求体中设置了 `isEmpTrack: T`。**范围**: `restrictions.write`**安全策略**: `Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/pre-trade-compliance/pre-trade-compliance-restrictions/verify-csv

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 签名 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway，默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱环境)

## 请求

### 请求头

- `Authorization` (string, required) — RS256 签名的 JWT（Bearer 格式），使用您注册的私钥签名。必须包含标识主账户的 `accountId` 声明。

### 请求体 (application/json)

此端点接受一个 VerifyRequest。

- `userName` (string, required) — IBKR 用户名。
- `requestId` (long, required) — 唯一的请求标识符。
- `payload` (string, required) — Base64 编码的 CSV 内容。支持的操作：`RESTR_ADD`、`RESTR_DELETE`、`RESTR_ASSOC_ADD`、`RESTR_ASSOC_DELETE`。
- `isEmpTrack` (string, optional) — 进行雇主跟踪（employer-track）授权时设置为 `T`。

## 响应

### 200

始终返回 HTTP 200。请检查 `success` 字段以确定结果。所有失败情形——认证、授权、校验以及内部错误——都会返回 `success: false`。

- `success` (boolean, required) — 指示操作是否成功。
- `requestId` (long, optional) — 从请求中回显。仅在早期 apply 失败（请求体令牌未激活、缺少 payload）时缺失，此时 `requestId` 尚未被解析。
- `message` (CsvResponseMessage, optional) — 成功时为 `OK`。失败时，或者是描述错误的普通字符串，或者是表示结构化桥接（bridge）校验错误的 JSON 对象。

## 类型

### CsvResponseMessage

成功时为 `OK`。失败时，或者是描述错误的普通字符串，或者是表示结构化桥接（bridge）校验错误的 JSON 对象。

## 示例

### 操作成功

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

url = "https://localhost:5000/gw/api/v1/restrictions/verify"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Operation succeeded
const url = 'https://localhost:5000/gw/api/v1/restrictions/verify';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

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
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/verify"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://localhost:5000/gw/api/v1/restrictions/verify")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Operation succeeded
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/restrictions/verify")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Operation succeeded
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/restrictions/verify', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Operation succeeded
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/verify");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Operation succeeded
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/verify")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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

### CSV 校验失败 — 普通字符串消息

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

url = "https://localhost:5000/gw/api/v1/restrictions/verify"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript CSV validation failed — plain string message
const url = 'https://localhost:5000/gw/api/v1/restrictions/verify';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

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
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/verify"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://localhost:5000/gw/api/v1/restrictions/verify")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java CSV validation failed — plain string message
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/restrictions/verify")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php CSV validation failed — plain string message
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/restrictions/verify', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp CSV validation failed — plain string message
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/verify");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift CSV validation failed — plain string message
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/verify")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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

### CSV 校验失败 — 结构化桥接消息

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

url = "https://localhost:5000/gw/api/v1/restrictions/verify"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript CSV validation failed — structured bridge message
const url = 'https://localhost:5000/gw/api/v1/restrictions/verify';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

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
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/verify"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://localhost:5000/gw/api/v1/restrictions/verify")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java CSV validation failed — structured bridge message
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/restrictions/verify")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php CSV validation failed — structured bridge message
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/restrictions/verify', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp CSV validation failed — structured bridge message
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/verify");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift CSV validation failed — structured bridge message
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/verify")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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

### 认证或账户解析失败

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

url = "https://localhost:5000/gw/api/v1/restrictions/verify"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Auth or account resolution failure
const url = 'https://localhost:5000/gw/api/v1/restrictions/verify';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

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
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/verify"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://localhost:5000/gw/api/v1/restrictions/verify")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Auth or account resolution failure
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/restrictions/verify")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Auth or account resolution failure
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/restrictions/verify', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Auth or account resolution failure
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/verify");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Auth or account resolution failure
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/verify")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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

### 仅 apply —— 在 requestId 解析前请求体令牌失败

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

url = "https://localhost:5000/gw/api/v1/restrictions/verify"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript Apply only — body token failure before requestId is parsed
const url = 'https://localhost:5000/gw/api/v1/restrictions/verify';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

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
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/verify"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

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

url = URI("https://localhost:5000/gw/api/v1/restrictions/verify")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Apply only — body token failure before requestId is parsed
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/restrictions/verify")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Apply only — body token failure before requestId is parsed
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/restrictions/verify', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Apply only — body token failure before requestId is parsed
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/verify");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Apply only — body token failure before requestId is parsed
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/verify")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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

### 标准调用方

**请求**

```json
{
  "userName": "user1",
  "requestId": 1,
  "payload": "UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s..."
}
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

```python Standard caller
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/verify"

payload = {
    "userName": "user1",
    "requestId": 1,
    "payload": "UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s..."
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Standard caller
const url = 'https://localhost:5000/gw/api/v1/restrictions/verify';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"userName":"user1","requestId":1,"payload":"UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s..."}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Standard caller
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/verify"

	payload := strings.NewReader("{\n  \"userName\": \"user1\",\n  \"requestId\": 1,\n  \"payload\": \"UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s...\"\n}")

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

```ruby Standard caller
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/verify")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"userName\": \"user1\",\n  \"requestId\": 1,\n  \"payload\": \"UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s...\"\n}"

response = http.request(request)
puts response.read_body
```

```java Standard caller
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/restrictions/verify")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"userName\": \"user1\",\n  \"requestId\": 1,\n  \"payload\": \"UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s...\"\n}")
  .asString();
```

```php Standard caller
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/restrictions/verify', [
  'body' => '{
  "userName": "user1",
  "requestId": 1,
  "payload": "UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s..."
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Standard caller
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/verify");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"userName\": \"user1\",\n  \"requestId\": 1,\n  \"payload\": \"UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s...\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Standard caller
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "userName": "user1",
  "requestId": 1,
  "payload": "UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s..."
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/verify")! as URL,
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

### 雇主跟踪（employer-track）调用方

**请求**

```json
{
  "userName": "user1",
  "requestId": 2,
  "payload": "UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s...",
  "isEmpTrack": "T"
}
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

```python Employer-track caller
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/verify"

payload = {
    "userName": "user1",
    "requestId": 2,
    "payload": "UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s...",
    "isEmpTrack": "T"
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript Employer-track caller
const url = 'https://localhost:5000/gw/api/v1/restrictions/verify';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"userName":"user1","requestId":2,"payload":"UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s...","isEmpTrack":"T"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Employer-track caller
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/verify"

	payload := strings.NewReader("{\n  \"userName\": \"user1\",\n  \"requestId\": 2,\n  \"payload\": \"UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s...\",\n  \"isEmpTrack\": \"T\"\n}")

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

```ruby Employer-track caller
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/verify")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"userName\": \"user1\",\n  \"requestId\": 2,\n  \"payload\": \"UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s...\",\n  \"isEmpTrack\": \"T\"\n}"

response = http.request(request)
puts response.read_body
```

```java Employer-track caller
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/restrictions/verify")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"userName\": \"user1\",\n  \"requestId\": 2,\n  \"payload\": \"UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s...\",\n  \"isEmpTrack\": \"T\"\n}")
  .asString();
```

```php Employer-track caller
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/restrictions/verify', [
  'body' => '{
  "userName": "user1",
  "requestId": 2,
  "payload": "UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s...",
  "isEmpTrack": "T"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Employer-track caller
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/verify");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"userName\": \"user1\",\n  \"requestId\": 2,\n  \"payload\": \"UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s...\",\n  \"isEmpTrack\": \"T\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Employer-track caller
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "userName": "user1",
  "requestId": 2,
  "payload": "UkVTVFJfQURELCBUZXN0UmVzdHJpY3Rpb24s...",
  "isEmpTrack": "T"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/verify")! as URL,
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