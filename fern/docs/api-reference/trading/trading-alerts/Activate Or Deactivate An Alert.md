# 激活或停用警报

POST https://localhost:5000/v1/api/iserver/account/{accountId}/alert/activate
Content-Type: application/json

激活或停用为此账户创建的现有警报。这不会删除警报，而是在重新激活之前禁用通知。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-alerts/activate-alert

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 路径参数

- `accountId` (string, required)

### 请求体 (application/json)

该端点预期接收一个 alertActivationRequest。

- `alertId` (long, required) — 警报标识符
- `alertActive` (enum, required) — 设置警报应处于激活状态（1）还是停用状态（0）。
  - Allowed values: `1`, `0`

## 响应

### 200

包含已激活/已停用警报详情的对象。

- `request_id` (long, optional)
- `order_id` (long, optional) — 警报的跟踪号。有时被称为 alertId 或 alert_id。
- `success` (boolean, optional) — 显示警报请求的结果状态
- `text` (string, optional) — 用于说明成功状态原因的响应消息。
- `failure_list` (string, optional) — 如果 "success" 返回 false，将列出失败的订单 ID

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误；由于请求中包含无效数据，无法处理传入请求

- `error` (string, optional) — 错误原因

## 示例

### activated-deactivated-successfully

**响应**

```json
{
  "order_id": 833967258,
  "success": true,
  "text": "Request was submitted"
}
```

**SDK 代码**

```python activated-deactivated-successfully
import requests

url = "https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript activated-deactivated-successfully
const url = 'https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go activated-deactivated-successfully
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby activated-deactivated-successfully
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java activated-deactivated-successfully
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php activated-deactivated-successfully
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp activated-deactivated-successfully
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift activated-deactivated-successfully
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate")! as URL,
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

### activate-request

**请求**

```json
{
  "alertId": 9876543210,
  "alertActive": 1
}
```

**响应**

```json
{
  "order_id": 833967258,
  "success": true,
  "text": "Request was submitted"
}
```

**SDK 代码**

```python activate-request
import requests

url = "https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate"

payload = {
    "alertId": 9876543210,
    "alertActive": 1
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript activate-request
const url = 'https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"alertId":9876543210,"alertActive":1}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go activate-request
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate"

	payload := strings.NewReader("{\n  \"alertId\": 9876543210,\n  \"alertActive\": 1\n}")

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

```ruby activate-request
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"alertId\": 9876543210,\n  \"alertActive\": 1\n}"

response = http.request(request)
puts response.read_body
```

```java activate-request
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"alertId\": 9876543210,\n  \"alertActive\": 1\n}")
  .asString();
```

```php activate-request
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate', [
  'body' => '{
  "alertId": 9876543210,
  "alertActive": 1
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp activate-request
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"alertId\": 9876543210,\n  \"alertActive\": 1\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift activate-request
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "alertId": 9876543210,
  "alertActive": 1
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate")! as URL,
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

### deactivate-request

**请求**

```json
{
  "alertId": 9876543210,
  "alertActive": 0
}
```

**响应**

```json
{
  "order_id": 833967258,
  "success": true,
  "text": "Request was submitted"
}
```

**SDK 代码**

```python deactivate-request
import requests

url = "https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate"

payload = {
    "alertId": 9876543210,
    "alertActive": 0
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript deactivate-request
const url = 'https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"alertId":9876543210,"alertActive":0}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go deactivate-request
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate"

	payload := strings.NewReader("{\n  \"alertId\": 9876543210,\n  \"alertActive\": 0\n}")

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

```ruby deactivate-request
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"alertId\": 9876543210,\n  \"alertActive\": 0\n}"

response = http.request(request)
puts response.read_body
```

```java deactivate-request
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"alertId\": 9876543210,\n  \"alertActive\": 0\n}")
  .asString();
```

```php deactivate-request
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate', [
  'body' => '{
  "alertId": 9876543210,
  "alertActive": 0
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp deactivate-request
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"alertId\": 9876543210,\n  \"alertActive\": 0\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift deactivate-request
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "alertId": 9876543210,
  "alertActive": 0
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/U1234567/alert/activate")! as URL,
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