# 获取用户的限制 ID

GET https://localhost:5000/gw/api/v1/restrictions/user

返回给定用户名的所有限制 ID。该用户名必须是主用户、子用户，或在主账户下具有交易权限的用户。对于未授权和不存在的用户均返回 403，以防止 ID 枚举。**范围**: `restrictions.read`**安全策略**: `HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/pre-trade-compliance/pre-trade-compliance-restrictions/get-user-restrictions

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 查询参数

- `masterUserName` (string, required) — 已认证调用方的 IBKR 主用户名。最多 64 个字符。
- `userName` (string, required) — 要查询的用户名。最多 64 个字符。
- `isEmpTrack` (string, optional) — 设置为 `T` 以进行雇主跟踪（employer-track）授权。

### 请求头参数

- `Authorization` (string, required) — RS256 签名的 JWT（Bearer 格式），使用您注册的私钥签名。必须包含用于标识主账户的 `accountId` 声明。令牌缺失或无效时返回 HTTP 401。

## 响应

### 200

用户的限制 ID。

- `status` (string, required) — 成功时始终为 `ok`。
- `userName` (string, required) — 从请求中原样回显。如果提供的 `userName` 是别名，则按原样返回该别名。
- `restrictionIds` (list of long, required) — 用户的限制 ID。没有时为空数组。

## 错误

### 400 错误请求错误

缺少参数、参数为空、参数非数字或超出范围。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 403 禁止访问错误

资源不属于调用方、不存在，或使用了不受支持的 HTTP 方法。所有情况均返回完全相同的响应体，以防止 ID 枚举。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

## 示例

### 主用户查询其自身的限制

**响应**

```json
{
  "status": "ok",
  "userName": "user1",
  "restrictionIds": [
    1001,
    1002,
    1003
  ]
}
```

**SDK 代码**

```python Master user querying their own restrictions
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/user"

querystring = {"masterUserName":"user1","userName":"user1"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Master user querying their own restrictions
const url = 'https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Master user querying their own restrictions
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Master user querying their own restrictions
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Master user querying their own restrictions
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Master user querying their own restrictions
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Master user querying their own restrictions
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Master user querying their own restrictions
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1")! as URL,
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

### 主用户查询子用户

**响应**

```json
{
  "status": "ok",
  "userName": "user1-sub",
  "restrictionIds": [
    1004,
    1005
  ]
}
```

**SDK 代码**

```python Master user querying a sub-user
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/user"

querystring = {"masterUserName":"user1","userName":"user1"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Master user querying a sub-user
const url = 'https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Master user querying a sub-user
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Master user querying a sub-user
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Master user querying a sub-user
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Master user querying a sub-user
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Master user querying a sub-user
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Master user querying a sub-user
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1")! as URL,
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

### 无任何限制的用户

**响应**

```json
{
  "status": "ok",
  "userName": "user1",
  "restrictionIds": []
}
```

**SDK 代码**

```python User with no restrictions
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/user"

querystring = {"masterUserName":"user1","userName":"user1"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript User with no restrictions
const url = 'https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go User with no restrictions
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby User with no restrictions
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java User with no restrictions
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php User with no restrictions
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp User with no restrictions
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift User with no restrictions
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/user?masterUserName=user1&userName=user1")! as URL,
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