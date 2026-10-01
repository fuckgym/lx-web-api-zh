# 获取限制范围

GET https://localhost:5000/gw/api/v1/restrictions/restriction-scope

返回限制的范围（`Active For Family`、`Active Except`、`Active For Some` 或 `Inactive`）以及与该范围相关的账户 ID。对于 `Active For Family` 和 `Inactive`，会省略 `accountIds`（隐含表示：全部/无账户）。对于 `Active For Some`，`accountIds` 会被限制在一个可配置的上限内（默认 10000），并通过 `truncated` 标志指示上限之外是否还存在更多账户。对于 `Active Except`，`accountIds`（被排除的账户）始终完整返回，不受上限约束。该限制必须由调用方的主账户（master account）拥有。不支持员工通道（Employee-track，`isEmpTrack=T`）的调用方。**范围**: `restrictions.read`**安全策略**: `HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/pre-trade-compliance/pre-trade-compliance-restrictions/get-restriction-scope

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway，默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒)

## 请求

### 查询参数

- `masterUserName` (string, required) — 已认证调用方的 IBKR 主用户名。最长 64 个字符。
- `restrictionId` (long, required) — 正整数。小数和非数字值将返回 400。
- `isEmpTrack` (string, optional) — 设置为 `T` 以进行雇主通道（employer-track）授权。

### 请求头

- `Authorization` (string, required) — RS256 签名的 JWT（Bearer 格式），使用您注册的私钥签名。必须包含标识主账户的 `accountId` 声明（claim）。令牌缺失或无效时返回 HTTP 401。

## 响应

### 200

限制范围及相关的账户 ID。

- `status` (string, required) — 成功时始终为 `ok`。
- `restrictionId` (long, required) — 从请求中原样返回。
- `scope` (string, required) — 该限制的范围。取值为：`Active For Family`、`Active Except`、`Active For Some`、`Inactive` 之一。
- `accountIds` (list of string, optional, nullable) — 与该范围相关的账户 ID。对于 `Active For Family`（隐含所有账户都在范围内）和 `Inactive`（无账户），完全省略该字段。对于 `Active For Some`，为直接关联的账户，上限为可配置的限制（见 `truncated`）。对于 `Active Except`，为被排除的账户，始终完整返回且不受上限约束。
- `truncated` (boolean, optional, nullable) — 仅在 `Active For Some` 时提供。如果账户列表在配置的上限处被截断且上限之外还存在更多账户，则为 `true`；如果返回了完整列表，则为 `false`。其他范围下从不提供（`Active Except` 始终完整返回，不受上限约束）。

## 错误

### 400 错误请求错误

参数缺失、为空、非数字或超出范围。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 403 禁止访问错误

资源不属于调用方、不存在，或使用了不受支持的 HTTP 方法。所有情况均返回相同的响应体，以防止 ID 枚举。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

内部服务器错误。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

## 示例

### 对家庭组生效

**响应**

```json
{
  "status": "ok",
  "restrictionId": 1001,
  "scope": "Active For Family"
}
```

**SDK 代码**

```python Active for family
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/restriction-scope"

querystring = {"masterUserName":"user1","restrictionId":"1001"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Active for family
const url = 'https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Active for family
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Active for family
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Active for family
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Active for family
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Active for family
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Active for family
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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

### 除指定账户外生效

**响应**

```json
{
  "status": "ok",
  "restrictionId": 1002,
  "scope": "Active Except",
  "accountIds": [
    "U1000001"
  ]
}
```

**SDK 代码**

```python Active except
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/restriction-scope"

querystring = {"masterUserName":"user1","restrictionId":"1001"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Active except
const url = 'https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Active except
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Active except
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Active except
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Active except
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Active except
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Active except
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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

### 对部分账户生效

**响应**

```json
{
  "status": "ok",
  "restrictionId": 1003,
  "scope": "Active For Some",
  "accountIds": [
    "U1000000",
    "U1000002"
  ],
  "truncated": false
}
```

**SDK 代码**

```python Active for some
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/restriction-scope"

querystring = {"masterUserName":"user1","restrictionId":"1001"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Active for some
const url = 'https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Active for some
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Active for some
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Active for some
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Active for some
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Active for some
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Active for some
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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

### 未启用

**响应**

```json
{
  "status": "ok",
  "restrictionId": 1004,
  "scope": "Inactive"
}
```

**SDK 代码**

```python Inactive
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/restriction-scope"

querystring = {"masterUserName":"user1","restrictionId":"1001"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Inactive
const url = 'https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Inactive
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Inactive
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Inactive
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Inactive
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Inactive
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Inactive
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/restriction-scope?masterUserName=user1&restrictionId=1001")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
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