# 确认订单回复消息

POST https://localhost:5000/v1/api/iserver/reply/{replyId}
Content-Type: application/json

确认订单回复消息，并继续提交订单票。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-orders/confirm-order-reply

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 路径参数

- `replyId` (string, required) — 待确认回复消息的 UUID，取自订单提交响应。当触发某些警告消息时，该 ID 由 POST /iserver/account/\{accountId}/orders 端点返回。

### 请求体（application/json）

该端点接受一个对象。

- `confirmed` (boolean, optional) — 值为 true 表示对该问题给出肯定答复，并继续进行订单提交。

## 响应

### 200

回复状态

- `Trading Orders_confirmOrderReply_Response_200`

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，当传入的请求无法被处理时返回。它有时可能包含错误请求（bad request）的子集。例如，传入的 accountId 有误，而只能在处理请求的后续阶段才被检测出来。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，由于某个内部服务不可用导致请求耗时超过 10 秒，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 类型

### orderSubmitError

表示订单回复消息或提交未被接受。

- `error` (string, optional) — 表示订单提交未成功的消息。

### orderReplyNotFound

表示订单回复 ID 不存在。

- `error` (string, optional) — 表示未找到订单回复 ID 的消息。

### advancedOrderReject

对应针对所提交订单票被拒绝而生成的消息。在某些情况下，它还可能提供一种机制，在作出提示性决定后重新提交同一订单。

- `orderId` (long, optional) — IB 分配给被拒绝订单票的订单 ID。
- `reqId` (string, optional) — IB 分配给所返回消息的内部标识符。
- `dismissable` (list of any, optional) — 表示该提示是否可关闭。
- `text` (string, optional) — IB 为响应订单提交而发出的消息的人类可读文本。
- `options` (list of string, optional) — 针对该拒绝消息客户端可选择的选项。
- `type` (string, optional) — 所返回消息的具体类型。
- `messageId` (string, optional) — 所返回消息的性质或类别的 IB 内部标识符。
- `prompt` (boolean, optional) — 表示该消息是一个提供一组决策的提示，其中一个或多个决策可能允许重新提交被拒绝的订单。

## 示例

### orderSubmitSuccessExample

**请求**

```json
{}
```

**响应**

```json
[
  {
    "encrypt_message": "1",
    "order_id": "1370093239",
    "order_status": "PreSubmitted"
  }
]
```

**SDK 代码**

```python orderSubmitSuccessExample
import requests

url = "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript orderSubmitSuccessExample
const url = 'https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go orderSubmitSuccessExample
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593"

	payload := strings.NewReader("{}")

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

```ruby orderSubmitSuccessExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java orderSubmitSuccessExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php orderSubmitSuccessExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp orderSubmitSuccessExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift orderSubmitSuccessExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")! as URL,
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

### orderReplyMessageExample

**请求**

```json
{}
```

**响应**

```json
[
  {
    "id": "99097238-9824-4830-84ef-46979aa22593",
    "isSuppressed": false,
    "message": [
      "You are submitting an order without market data. We strongly recommend against this as it may result in erroneous and unexpected trades.\nAre you sure you want to submit this order?"
    ],
    "messageIds": [
      "o354"
    ]
  }
]
```

**SDK 代码**

```python orderReplyMessageExample
import requests

url = "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript orderReplyMessageExample
const url = 'https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go orderReplyMessageExample
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593"

	payload := strings.NewReader("{}")

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

```ruby orderReplyMessageExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java orderReplyMessageExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php orderReplyMessageExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp orderReplyMessageExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift orderReplyMessageExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")! as URL,
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

### orderSubmitErrorExample

**请求**

```json
{}
```

**响应**

```json
{
  "error": "Order not confirmed "
}
```

**SDK 代码**

```python orderSubmitErrorExample
import requests

url = "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript orderSubmitErrorExample
const url = 'https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go orderSubmitErrorExample
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593"

	payload := strings.NewReader("{}")

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

```ruby orderSubmitErrorExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java orderSubmitErrorExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php orderSubmitErrorExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp orderSubmitErrorExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift orderSubmitErrorExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")! as URL,
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

### orderReplyNotFoundExample

**请求**

```json
{}
```

**响应**

```json
{
  "error": "reply id not found: '99097238-9824-4830-84ef-46979aa22593'"
}
```

**SDK 代码**

```python orderReplyNotFoundExample
import requests

url = "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript orderReplyNotFoundExample
const url = 'https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go orderReplyNotFoundExample
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593"

	payload := strings.NewReader("{}")

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

```ruby orderReplyNotFoundExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java orderReplyNotFoundExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php orderReplyNotFoundExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp orderReplyNotFoundExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift orderReplyNotFoundExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")! as URL,
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

### advancedOrderRejectPromptExample

**请求**

```json
{}
```

**响应**

```json
{
  "dismissable": [],
  "messageId": "p12",
  "options": [
    "Use on this order",
    "Always use",
    "Do not use"
  ],
  "orderId": 123456789,
  "prompt": true,
  "reqId": "22170",
  "text": "If your order is not immediately executable, our systems may, depending on market conditions, reject your order if its limit price is more that the allowed amount away from the reference price at that time. If this happens, you will not receive a fill. This is a control designed to ensure that we comply with our regulatory obligations to avoid submitting disruptive orders to the marketplace.\nUse the Price Management Algo?",
  "type": "M"
}
```

**SDK 代码**

```python advancedOrderRejectPromptExample
import requests

url = "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript advancedOrderRejectPromptExample
const url = 'https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go advancedOrderRejectPromptExample
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593"

	payload := strings.NewReader("{}")

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

```ruby advancedOrderRejectPromptExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java advancedOrderRejectPromptExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php advancedOrderRejectPromptExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp advancedOrderRejectPromptExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift advancedOrderRejectPromptExample
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/reply/99097238-9824-4830-84ef-46979aa22593")! as URL,
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