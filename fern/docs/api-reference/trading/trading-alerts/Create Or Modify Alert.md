# 创建或修改警报

POST https://localhost:5000/v1/api/iserver/account/{accountId}/alert
Content-Type: application/json

用于创建新警报或修改现有警报的端点。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-alerts/create-alert

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway，默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱环境)

## 请求

### 路径参数

- `accountId` (string, required)

### 请求体 (application/json)

此端点接受一个 alertCreationRequest。

- `alertName` (string, required) — 警报名称。
- `alertMessage` (string, required) — 将要发送的警报消息
- `alertRepeatable` (enum, required) — 布尔数字 (0, 1)，表示警报是否可以多次触发。MTA 警报要求值为 '1'
  - Allowed values: `0`, `1`
- `outsideRth` (enum, required) — 允许 (1) 或不允许 (0) 警报在常规交易时间之外触发
  - Allowed values: `0`, `1`
- `tif` (enum, required) — 警报的有效期（Time in Force）时长。
  - Allowed values: `GTC`, `GTD`
- `conditions` (list of AlertCreationRequestConditionsItems, required) — 警报触发所应用的全部条件的容器。
- `orderId` (long, optional) — 可选；在修改时使用，表示警报 ID
- `email` (string, optional) — 您希望向其发送电子邮件警报的电子邮件地址
- `expireTime` (string, optional) — 仅在 tif 为 "GTD" 时使用。表示如果没有警报被触发，警报应终止的时间。
- `iTWSOrdersOnly` (long, optional) — 允许 (0) 或不允许 (1) 通过移动应用触发警报
- `sendMessage` (enum, optional) — 允许 (1) 或不允许 (0) 警报触发电子邮件消息
  - Allowed values: `0`, `1`
- `showPopup` (long, optional) — 允许 (1) 或不允许 (0) 警报触发 TWS 弹出消息

## 响应

### 200

一个包含有效账户以及与交易访问权限相关的账户属性的对象。此端点还用于确认账户验证。

- `request_id` (long, optional) — 不适用
- `order_id` (long, optional) — 警报的跟踪编号。警报标识符在内部以订单 ID 引用。
- `success` (boolean, optional) — 显示警报请求的结果状态
- `text` (string, optional) — 用于说明提交状态的响应消息。
- `order_status` (string, optional) — 不适用
- `warning_message` (string, optional) — 返回 'null'

## 错误

### 400 错误请求错误

错误请求；请求体为空

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

### 401 未授权错误

缺少、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误。如果传入的值无效，则无法处理请求。例如 operator 为 "abc"，或者修改请求中包含未修改的字段

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，由于某个内部服务不可用导致请求耗时超过 10 秒，请求将被中止并返回此状态

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### AlertCreationRequestConditionsItems

- `conidex` (string, required) — conid 与 exchange 的拼接。格式为 "conid@exchange"
- `logicBind` (enum, required, default: a) — 描述多个条件应如何共同发挥作用。可用的逻辑类型：* `a` - AND * `o` - OR * `n` - END
  - Allowed values: `a`, `o`, `n`
- `operator` (enum, required) — 指示触发条件应高于还是低于给定值。
  - Allowed values: `>=`, `<=`, `>`, `<`, `==`
- `triggerMethod` (string, required) — 传入零的字符串表示形式，即 "0"
- `type` (enum, required) — 指定要使用的条件类型。注意，所列出的 "MTA" 类型仅在 iTWSOrdersOnly=1 时受支持。可用的条件类型：* `1` - 价格 * `3` - 时间 * `4` - 保证金 * `5` - 成交 * `6` - 成交量 * `7` - MTA 市场 * `8` - MTA 持仓 * `9` - MTA 账户每日 PNL
  - Allowed values: `1`, `3`, `4`, `5`, `6`, `7`, `8`, `9`
- `value` (string, required, default: *) — 基于 Type 的触发值。
- `timeZone` (string, optional) — 仅某些 MTA 警报条件才需要。

## 示例

### 成功创建

**响应**

```json
{
  "order_id": 1408549184,
  "success": true,
  "text": "Submitted"
}
```

**SDK 代码**

```python successfully-created
import requests

url = "https://localhost:5000/v1/api/iserver/account/U1234567/alert"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript successfully-created
const url = 'https://localhost:5000/v1/api/iserver/account/U1234567/alert';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go successfully-created
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/U1234567/alert"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby successfully-created
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/U1234567/alert")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java successfully-created
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/U1234567/alert")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php successfully-created
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/U1234567/alert', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp successfully-created
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/U1234567/alert");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift successfully-created
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/U1234567/alert")! as URL,
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

### 成功修改

**响应**

```json
{
  "order_id": 1408549184,
  "success": true,
  "text": "Submitted"
}
```

**SDK 代码**

```python successfully-modified
import requests

url = "https://localhost:5000/v1/api/iserver/account/U1234567/alert"

headers = {"Authorization": "Bearer <token>"}

response = requests.post(url, headers=headers)

print(response.json())
```

```javascript successfully-modified
const url = 'https://localhost:5000/v1/api/iserver/account/U1234567/alert';
const options = {method: 'POST', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go successfully-modified
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/U1234567/alert"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby successfully-modified
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/U1234567/alert")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java successfully-modified
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/U1234567/alert")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php successfully-modified
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/U1234567/alert', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp successfully-modified
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/U1234567/alert");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift successfully-modified
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/U1234567/alert")! as URL,
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

### 警报创建请求

**请求**

```json
{
  "alertName": "AAPL_Price",
  "alertMessage": "AAPL Price Drop!",
  "alertRepeatable": 0,
  "outsideRth": 0,
  "tif": "GTC",
  "conditions": [
    {
      "conidex": "265598@NYSE",
      "logicBind": "a",
      "operator": ">=",
      "triggerMethod": "0",
      "type": 1,
      "value": "500",
      "timeZone": "US/Eastern"
    }
  ],
  "email": "jonh.smith@example.com",
  "expireTime": "20231231-12:00:00",
  "iTWSOrdersOnly": 0,
  "sendMessage": 1,
  "showPopup": 1
}
```

**响应**

```json
{
  "order_id": 1408549184,
  "success": true,
  "text": "Submitted"
}
```

**SDK 代码**

```python alert-creation-request
import requests

url = "https://localhost:5000/v1/api/iserver/account/U1234567/alert"

payload = {
    "alertName": "AAPL_Price",
    "alertMessage": "AAPL Price Drop!",
    "alertRepeatable": 0,
    "outsideRth": 0,
    "tif": "GTC",
    "conditions": [
        {
            "conidex": "265598@NYSE",
            "logicBind": "a",
            "operator": ">=",
            "triggerMethod": "0",
            "type": 1,
            "value": "500",
            "timeZone": "US/Eastern"
        }
    ],
    "email": "jonh.smith@example.com",
    "expireTime": "20231231-12:00:00",
    "iTWSOrdersOnly": 0,
    "sendMessage": 1,
    "showPopup": 1
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript alert-creation-request
const url = 'https://localhost:5000/v1/api/iserver/account/U1234567/alert';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"alertName":"AAPL_Price","alertMessage":"AAPL Price Drop!","alertRepeatable":0,"outsideRth":0,"tif":"GTC","conditions":[{"conidex":"265598@NYSE","logicBind":"a","operator":">=","triggerMethod":"0","type":1,"value":"500","timeZone":"US/Eastern"}],"email":"jonh.smith@example.com","expireTime":"20231231-12:00:00","iTWSOrdersOnly":0,"sendMessage":1,"showPopup":1}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go alert-creation-request
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/U1234567/alert"

	payload := strings.NewReader("{\n  \"alertName\": \"AAPL_Price\",\n  \"alertMessage\": \"AAPL Price Drop!\",\n  \"alertRepeatable\": 0,\n  \"outsideRth\": 0,\n  \"tif\": \"GTC\",\n  \"conditions\": [\n    {\n      \"conidex\": \"265598@NYSE\",\n      \"logicBind\": \"a\",\n      \"operator\": \">=\",\n      \"triggerMethod\": \"0\",\n      \"type\": 1,\n      \"value\": \"500\",\n      \"timeZone\": \"US/Eastern\"\n    }\n  ],\n  \"email\": \"jonh.smith@example.com\",\n  \"expireTime\": \"20231231-12:00:00\",\n  \"iTWSOrdersOnly\": 0,\n  \"sendMessage\": 1,\n  \"showPopup\": 1\n}")

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

```ruby alert-creation-request
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/U1234567/alert")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"alertName\": \"AAPL_Price\",\n  \"alertMessage\": \"AAPL Price Drop!\",\n  \"alertRepeatable\": 0,\n  \"outsideRth\": 0,\n  \"tif\": \"GTC\",\n  \"conditions\": [\n    {\n      \"conidex\": \"265598@NYSE\",\n      \"logicBind\": \"a\",\n      \"operator\": \">=\",\n      \"triggerMethod\": \"0\",\n      \"type\": 1,\n      \"value\": \"500\",\n      \"timeZone\": \"US/Eastern\"\n    }\n  ],\n  \"email\": \"jonh.smith@example.com\",\n  \"expireTime\": \"20231231-12:00:00\",\n  \"iTWSOrdersOnly\": 0,\n  \"sendMessage\": 1,\n  \"showPopup\": 1\n}"

response = http.request(request)
puts response.read_body
```

```java alert-creation-request
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/U1234567/alert")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"alertName\": \"AAPL_Price\",\n  \"alertMessage\": \"AAPL Price Drop!\",\n  \"alertRepeatable\": 0,\n  \"outsideRth\": 0,\n  \"tif\": \"GTC\",\n  \"conditions\": [\n    {\n      \"conidex\": \"265598@NYSE\",\n      \"logicBind\": \"a\",\n      \"operator\": \">=\",\n      \"triggerMethod\": \"0\",\n      \"type\": 1,\n      \"value\": \"500\",\n      \"timeZone\": \"US/Eastern\"\n    }\n  ],\n  \"email\": \"jonh.smith@example.com\",\n  \"expireTime\": \"20231231-12:00:00\",\n  \"iTWSOrdersOnly\": 0,\n  \"sendMessage\": 1,\n  \"showPopup\": 1\n}")
  .asString();
```

```php alert-creation-request
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/U1234567/alert', [
  'body' => '{
  "alertName": "AAPL_Price",
  "alertMessage": "AAPL Price Drop!",
  "alertRepeatable": 0,
  "outsideRth": 0,
  "tif": "GTC",
  "conditions": [
    {
      "conidex": "265598@NYSE",
      "logicBind": "a",
      "operator": ">=",
      "triggerMethod": "0",
      "type": 1,
      "value": "500",
      "timeZone": "US/Eastern"
    }
  ],
  "email": "jonh.smith@example.com",
  "expireTime": "20231231-12:00:00",
  "iTWSOrdersOnly": 0,
  "sendMessage": 1,
  "showPopup": 1
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp alert-creation-request
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/U1234567/alert");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"alertName\": \"AAPL_Price\",\n  \"alertMessage\": \"AAPL Price Drop!\",\n  \"alertRepeatable\": 0,\n  \"outsideRth\": 0,\n  \"tif\": \"GTC\",\n  \"conditions\": [\n    {\n      \"conidex\": \"265598@NYSE\",\n      \"logicBind\": \"a\",\n      \"operator\": \">=\",\n      \"triggerMethod\": \"0\",\n      \"type\": 1,\n      \"value\": \"500\",\n      \"timeZone\": \"US/Eastern\"\n    }\n  ],\n  \"email\": \"jonh.smith@example.com\",\n  \"expireTime\": \"20231231-12:00:00\",\n  \"iTWSOrdersOnly\": 0,\n  \"sendMessage\": 1,\n  \"showPopup\": 1\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift alert-creation-request
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "alertName": "AAPL_Price",
  "alertMessage": "AAPL Price Drop!",
  "alertRepeatable": 0,
  "outsideRth": 0,
  "tif": "GTC",
  "conditions": [
    [
      "conidex": "265598@NYSE",
      "logicBind": "a",
      "operator": ">=",
      "triggerMethod": "0",
      "type": 1,
      "value": "500",
      "timeZone": "US/Eastern"
    ]
  ],
  "email": "jonh.smith@example.com",
  "expireTime": "20231231-12:00:00",
  "iTWSOrdersOnly": 0,
  "sendMessage": 1,
  "showPopup": 1
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/U1234567/alert")! as URL,
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

### 警报修改请求

**请求**

```json
{
  "alertName": "AAPL_Price",
  "alertMessage": "AAPL Price Drop! Modified message",
  "alertRepeatable": 0,
  "outsideRth": 0,
  "tif": "GTC",
  "conditions": [
    {
      "conidex": "265598@NYSE",
      "logicBind": "a",
      "operator": ">=",
      "triggerMethod": "0",
      "type": 1,
      "value": "500",
      "timeZone": "US/Eastern"
    }
  ],
  "orderId": 1408549184,
  "email": "jonh.smith@example.com",
  "expireTime": "20231231-12:00:00",
  "iTWSOrdersOnly": 0,
  "sendMessage": 1,
  "showPopup": 1
}
```

**响应**

```json
{
  "order_id": 1408549184,
  "success": true,
  "text": "Submitted"
}
```

**SDK 代码**

```python alert-modification-request
import requests

url = "https://localhost:5000/v1/api/iserver/account/U1234567/alert"

payload = {
    "alertName": "AAPL_Price",
    "alertMessage": "AAPL Price Drop! Modified message",
    "alertRepeatable": 0,
    "outsideRth": 0,
    "tif": "GTC",
    "conditions": [
        {
            "conidex": "265598@NYSE",
            "logicBind": "a",
            "operator": ">=",
            "triggerMethod": "0",
            "type": 1,
            "value": "500",
            "timeZone": "US/Eastern"
        }
    ],
    "orderId": 1408549184,
    "email": "jonh.smith@example.com",
    "expireTime": "20231231-12:00:00",
    "iTWSOrdersOnly": 0,
    "sendMessage": 1,
    "showPopup": 1
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript alert-modification-request
const url = 'https://localhost:5000/v1/api/iserver/account/U1234567/alert';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"alertName":"AAPL_Price","alertMessage":"AAPL Price Drop! Modified message","alertRepeatable":0,"outsideRth":0,"tif":"GTC","conditions":[{"conidex":"265598@NYSE","logicBind":"a","operator":">=","triggerMethod":"0","type":1,"value":"500","timeZone":"US/Eastern"}],"orderId":1408549184,"email":"jonh.smith@example.com","expireTime":"20231231-12:00:00","iTWSOrdersOnly":0,"sendMessage":1,"showPopup":1}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go alert-modification-request
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/U1234567/alert"

	payload := strings.NewReader("{\n  \"alertName\": \"AAPL_Price\",\n  \"alertMessage\": \"AAPL Price Drop! Modified message\",\n  \"alertRepeatable\": 0,\n  \"outsideRth\": 0,\n  \"tif\": \"GTC\",\n  \"conditions\": [\n    {\n      \"conidex\": \"265598@NYSE\",\n      \"logicBind\": \"a\",\n      \"operator\": \">=\",\n      \"triggerMethod\": \"0\",\n      \"type\": 1,\n      \"value\": \"500\",\n      \"timeZone\": \"US/Eastern\"\n    }\n  ],\n  \"orderId\": 1408549184,\n  \"email\": \"jonh.smith@example.com\",\n  \"expireTime\": \"20231231-12:00:00\",\n  \"iTWSOrdersOnly\": 0,\n  \"sendMessage\": 1,\n  \"showPopup\": 1\n}")

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

```ruby alert-modification-request
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/U1234567/alert")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"alertName\": \"AAPL_Price\",\n  \"alertMessage\": \"AAPL Price Drop! Modified message\",\n  \"alertRepeatable\": 0,\n  \"outsideRth\": 0,\n  \"tif\": \"GTC\",\n  \"conditions\": [\n    {\n      \"conidex\": \"265598@NYSE\",\n      \"logicBind\": \"a\",\n      \"operator\": \">=\",\n      \"triggerMethod\": \"0\",\n      \"type\": 1,\n      \"value\": \"500\",\n      \"timeZone\": \"US/Eastern\"\n    }\n  ],\n  \"orderId\": 1408549184,\n  \"email\": \"jonh.smith@example.com\",\n  \"expireTime\": \"20231231-12:00:00\",\n  \"iTWSOrdersOnly\": 0,\n  \"sendMessage\": 1,\n  \"showPopup\": 1\n}"

response = http.request(request)
puts response.read_body
```

```java alert-modification-request
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/iserver/account/U1234567/alert")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"alertName\": \"AAPL_Price\",\n  \"alertMessage\": \"AAPL Price Drop! Modified message\",\n  \"alertRepeatable\": 0,\n  \"outsideRth\": 0,\n  \"tif\": \"GTC\",\n  \"conditions\": [\n    {\n      \"conidex\": \"265598@NYSE\",\n      \"logicBind\": \"a\",\n      \"operator\": \">=\",\n      \"triggerMethod\": \"0\",\n      \"type\": 1,\n      \"value\": \"500\",\n      \"timeZone\": \"US/Eastern\"\n    }\n  ],\n  \"orderId\": 1408549184,\n  \"email\": \"jonh.smith@example.com\",\n  \"expireTime\": \"20231231-12:00:00\",\n  \"iTWSOrdersOnly\": 0,\n  \"sendMessage\": 1,\n  \"showPopup\": 1\n}")
  .asString();
```

```php alert-modification-request
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/iserver/account/U1234567/alert', [
  'body' => '{
  "alertName": "AAPL_Price",
  "alertMessage": "AAPL Price Drop! Modified message",
  "alertRepeatable": 0,
  "outsideRth": 0,
  "tif": "GTC",
  "conditions": [
    {
      "conidex": "265598@NYSE",
      "logicBind": "a",
      "operator": ">=",
      "triggerMethod": "0",
      "type": 1,
      "value": "500",
      "timeZone": "US/Eastern"
    }
  ],
  "orderId": 1408549184,
  "email": "jonh.smith@example.com",
  "expireTime": "20231231-12:00:00",
  "iTWSOrdersOnly": 0,
  "sendMessage": 1,
  "showPopup": 1
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp alert-modification-request
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/U1234567/alert");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"alertName\": \"AAPL_Price\",\n  \"alertMessage\": \"AAPL Price Drop! Modified message\",\n  \"alertRepeatable\": 0,\n  \"outsideRth\": 0,\n  \"tif\": \"GTC\",\n  \"conditions\": [\n    {\n      \"conidex\": \"265598@NYSE\",\n      \"logicBind\": \"a\",\n      \"operator\": \">=\",\n      \"triggerMethod\": \"0\",\n      \"type\": 1,\n      \"value\": \"500\",\n      \"timeZone\": \"US/Eastern\"\n    }\n  ],\n  \"orderId\": 1408549184,\n  \"email\": \"jonh.smith@example.com\",\n  \"expireTime\": \"20231231-12:00:00\",\n  \"iTWSOrdersOnly\": 0,\n  \"sendMessage\": 1,\n  \"showPopup\": 1\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift alert-modification-request
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "alertName": "AAPL_Price",
  "alertMessage": "AAPL Price Drop! Modified message",
  "alertRepeatable": 0,
  "outsideRth": 0,
  "tif": "GTC",
  "conditions": [
    [
      "conidex": "265598@NYSE",
      "logicBind": "a",
      "operator": ">=",
      "triggerMethod": "0",
      "type": 1,
      "value": "500",
      "timeZone": "US/Eastern"
    ]
  ],
  "orderId": 1408549184,
  "email": "jonh.smith@example.com",
  "expireTime": "20231231-12:00:00",
  "iTWSOrdersOnly": 0,
  "sendMessage": 1,
  "showPopup": 1
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/U1234567/alert")! as URL,
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