# 修改分配组

PUT https://localhost:5000/v1/api/iserver/account/allocation/group
Content-Type: application/json

修改现有的分配组。

参考： https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fa-allocation-management/modify-allocation-group

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway，默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 请求体 (application/json)

此端点期望接收一个对象。

- `name` (string, required) — 用于指代您的分配组的名称。如果指定了 prev_name，这将成为该组的新名称。
- `accounts` (list of V1ApiIserverAccountAllocationGroupPutRequestBodyContentApplicationJsonSchemaAccountsItems, required) — 应包含在分配组中的账户数组；如果使用用户指定的分配方法，还包括与分配相关的值。
- `default_method` (enum, required, default: N) — Interactive Brokers 支持两种形式的分配方法：由 Interactive Brokers 完成计算的分配方法，以及由用户计算后再指定的一组分配方法。IB 计算的分配方法：* `A` - 可用权益 * `E` - 平均 * `N` - 净清算价值 用户指定的分配方法：* `C` - 现金数量 * `P` - 百分比 * `R` - 比率 * `S` - 份额
  - Allowed values: `A`, `E`, `N`, `C`, `P`, `R`, `S`
- `prev_name` (string, optional) — 可用于重命名组。使用此字段将识别先前的名称，而 "name" 字段将标记更新后的名称。

## 响应

### 200

返回修改成功的确认。

- `success` (boolean, optional)

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

服务器内部错误，当传入的请求无法被处理时返回。有时可能包含部分错误请求的情形。例如，传入的 accountId 错误，而只能在处理请求的后续阶段才被发现。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态码

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 类型

### V1ApiIserverAccountAllocationGroupPutRequestBodyContentApplicationJsonSchemaAccountsItems

- `name` (string, required) — 给定子账户的 accountId。
- `amount` (long, optional) — 在用户自定义分配方法下，各子账户的总分配值。

## 示例

### Shares

**请求**

```json
{
  "name": "Group_1_Shares",
  "accounts": [
    {
      "name": "U456789",
      "amount": 4
    },
    {
      "name": "U123456",
      "amount": 1
    }
  ],
  "default_method": "S",
  "prev_name": "Group_0_Shares"
}
```

**响应**

```json
{
  "success": true
}
```

**SDK 代码**

```python Shares
import requests

url = "https://localhost:5000/v1/api/iserver/account/allocation/group"

payload = {
    "name": "Group_1_Shares",
    "accounts": [
        {
            "name": "U456789",
            "amount": 4
        },
        {
            "name": "U123456",
            "amount": 1
        }
    ],
    "default_method": "S",
    "prev_name": "Group_0_Shares"
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.put(url, json=payload, headers=headers)

print(response.json())
```

```javascript Shares
const url = 'https://localhost:5000/v1/api/iserver/account/allocation/group';
const options = {
  method: 'PUT',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"name":"Group_1_Shares","accounts":[{"name":"U456789","amount":4},{"name":"U123456","amount":1}],"default_method":"S","prev_name":"Group_0_Shares"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Shares
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/allocation/group"

	payload := strings.NewReader("{\n  \"name\": \"Group_1_Shares\",\n  \"accounts\": [\n    {\n      \"name\": \"U456789\",\n      \"amount\": 4\n    },\n    {\n      \"name\": \"U123456\",\n      \"amount\": 1\n    }\n  ],\n  \"default_method\": \"S\",\n  \"prev_name\": \"Group_0_Shares\"\n}")

	req, _ := http.NewRequest("PUT", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Shares
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/allocation/group")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Put.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"name\": \"Group_1_Shares\",\n  \"accounts\": [\n    {\n      \"name\": \"U456789\",\n      \"amount\": 4\n    },\n    {\n      \"name\": \"U123456\",\n      \"amount\": 1\n    }\n  ],\n  \"default_method\": \"S\",\n  \"prev_name\": \"Group_0_Shares\"\n}"

response = http.request(request)
puts response.read_body
```

```java Shares
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.put("https://localhost:5000/v1/api/iserver/account/allocation/group")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"name\": \"Group_1_Shares\",\n  \"accounts\": [\n    {\n      \"name\": \"U456789\",\n      \"amount\": 4\n    },\n    {\n      \"name\": \"U123456\",\n      \"amount\": 1\n    }\n  ],\n  \"default_method\": \"S\",\n  \"prev_name\": \"Group_0_Shares\"\n}")
  .asString();
```

```php Shares
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('PUT', 'https://localhost:5000/v1/api/iserver/account/allocation/group', [
  'body' => '{
  "name": "Group_1_Shares",
  "accounts": [
    {
      "name": "U456789",
      "amount": 4
    },
    {
      "name": "U123456",
      "amount": 1
    }
  ],
  "default_method": "S",
  "prev_name": "Group_0_Shares"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp Shares
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/allocation/group");
var request = new RestRequest(Method.PUT);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"name\": \"Group_1_Shares\",\n  \"accounts\": [\n    {\n      \"name\": \"U456789\",\n      \"amount\": 4\n    },\n    {\n      \"name\": \"U123456\",\n      \"amount\": 1\n    }\n  ],\n  \"default_method\": \"S\",\n  \"prev_name\": \"Group_0_Shares\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift Shares
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "name": "Group_1_Shares",
  "accounts": [
    [
      "name": "U456789",
      "amount": 4
    ],
    [
      "name": "U123456",
      "amount": 1
    ]
  ],
  "default_method": "S",
  "prev_name": "Group_0_Shares"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/allocation/group")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PUT"
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

### NetLiq

**请求**

```json
{
  "name": "Group_1_NetLiq",
  "accounts": [
    {
      "name": "U456789"
    },
    {
      "name": "U123456"
    }
  ],
  "default_method": "N",
  "prev_name": "Group_0_NetLiq"
}
```

**响应**

```json
{
  "success": true
}
```

**SDK 代码**

```python NetLiq
import requests

url = "https://localhost:5000/v1/api/iserver/account/allocation/group"

payload = {
    "name": "Group_1_NetLiq",
    "accounts": [{ "name": "U456789" }, { "name": "U123456" }],
    "default_method": "N",
    "prev_name": "Group_0_NetLiq"
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.put(url, json=payload, headers=headers)

print(response.json())
```

```javascript NetLiq
const url = 'https://localhost:5000/v1/api/iserver/account/allocation/group';
const options = {
  method: 'PUT',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"name":"Group_1_NetLiq","accounts":[{"name":"U456789"},{"name":"U123456"}],"default_method":"N","prev_name":"Group_0_NetLiq"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go NetLiq
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/allocation/group"

	payload := strings.NewReader("{\n  \"name\": \"Group_1_NetLiq\",\n  \"accounts\": [\n    {\n      \"name\": \"U456789\"\n    },\n    {\n      \"name\": \"U123456\"\n    }\n  ],\n  \"default_method\": \"N\",\n  \"prev_name\": \"Group_0_NetLiq\"\n}")

	req, _ := http.NewRequest("PUT", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby NetLiq
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/allocation/group")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Put.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"name\": \"Group_1_NetLiq\",\n  \"accounts\": [\n    {\n      \"name\": \"U456789\"\n    },\n    {\n      \"name\": \"U123456\"\n    }\n  ],\n  \"default_method\": \"N\",\n  \"prev_name\": \"Group_0_NetLiq\"\n}"

response = http.request(request)
puts response.read_body
```

```java NetLiq
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.put("https://localhost:5000/v1/api/iserver/account/allocation/group")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"name\": \"Group_1_NetLiq\",\n  \"accounts\": [\n    {\n      \"name\": \"U456789\"\n    },\n    {\n      \"name\": \"U123456\"\n    }\n  ],\n  \"default_method\": \"N\",\n  \"prev_name\": \"Group_0_NetLiq\"\n}")
  .asString();
```

```php NetLiq
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('PUT', 'https://localhost:5000/v1/api/iserver/account/allocation/group', [
  'body' => '{
  "name": "Group_1_NetLiq",
  "accounts": [
    {
      "name": "U456789"
    },
    {
      "name": "U123456"
    }
  ],
  "default_method": "N",
  "prev_name": "Group_0_NetLiq"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp NetLiq
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/allocation/group");
var request = new RestRequest(Method.PUT);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"name\": \"Group_1_NetLiq\",\n  \"accounts\": [\n    {\n      \"name\": \"U456789\"\n    },\n    {\n      \"name\": \"U123456\"\n    }\n  ],\n  \"default_method\": \"N\",\n  \"prev_name\": \"Group_0_NetLiq\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift NetLiq
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "name": "Group_1_NetLiq",
  "accounts": [["name": "U456789"], ["name": "U123456"]],
  "default_method": "N",
  "prev_name": "Group_0_NetLiq"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/allocation/group")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PUT"
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

### EqualQty

**请求**

```json
{
  "name": "Group_1_Equal",
  "accounts": [
    {
      "name": "U456789"
    },
    {
      "name": "U123456"
    }
  ],
  "default_method": "E",
  "prev_name": "Group_0_Equal"
}
```

**响应**

```json
{
  "success": true
}
```

**SDK 代码**

```python EqualQty
import requests

url = "https://localhost:5000/v1/api/iserver/account/allocation/group"

payload = {
    "name": "Group_1_Equal",
    "accounts": [{ "name": "U456789" }, { "name": "U123456" }],
    "default_method": "E",
    "prev_name": "Group_0_Equal"
}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.put(url, json=payload, headers=headers)

print(response.json())
```

```javascript EqualQty
const url = 'https://localhost:5000/v1/api/iserver/account/allocation/group';
const options = {
  method: 'PUT',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{"name":"Group_1_Equal","accounts":[{"name":"U456789"},{"name":"U123456"}],"default_method":"E","prev_name":"Group_0_Equal"}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go EqualQty
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/allocation/group"

	payload := strings.NewReader("{\n  \"name\": \"Group_1_Equal\",\n  \"accounts\": [\n    {\n      \"name\": \"U456789\"\n    },\n    {\n      \"name\": \"U123456\"\n    }\n  ],\n  \"default_method\": \"E\",\n  \"prev_name\": \"Group_0_Equal\"\n}")

	req, _ := http.NewRequest("PUT", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby EqualQty
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/allocation/group")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Put.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{\n  \"name\": \"Group_1_Equal\",\n  \"accounts\": [\n    {\n      \"name\": \"U456789\"\n    },\n    {\n      \"name\": \"U123456\"\n    }\n  ],\n  \"default_method\": \"E\",\n  \"prev_name\": \"Group_0_Equal\"\n}"

response = http.request(request)
puts response.read_body
```

```java EqualQty
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.put("https://localhost:5000/v1/api/iserver/account/allocation/group")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{\n  \"name\": \"Group_1_Equal\",\n  \"accounts\": [\n    {\n      \"name\": \"U456789\"\n    },\n    {\n      \"name\": \"U123456\"\n    }\n  ],\n  \"default_method\": \"E\",\n  \"prev_name\": \"Group_0_Equal\"\n}")
  .asString();
```

```php EqualQty
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('PUT', 'https://localhost:5000/v1/api/iserver/account/allocation/group', [
  'body' => '{
  "name": "Group_1_Equal",
  "accounts": [
    {
      "name": "U456789"
    },
    {
      "name": "U123456"
    }
  ],
  "default_method": "E",
  "prev_name": "Group_0_Equal"
}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp EqualQty
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/allocation/group");
var request = new RestRequest(Method.PUT);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{\n  \"name\": \"Group_1_Equal\",\n  \"accounts\": [\n    {\n      \"name\": \"U456789\"\n    },\n    {\n      \"name\": \"U123456\"\n    }\n  ],\n  \"default_method\": \"E\",\n  \"prev_name\": \"Group_0_Equal\"\n}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift EqualQty
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [
  "name": "Group_1_Equal",
  "accounts": [["name": "U456789"], ["name": "U123456"]],
  "default_method": "E",
  "prev_name": "Group_0_Equal"
] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/allocation/group")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PUT"
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