# 获取账户的限制 ID

GET https://localhost:5000/gw/api/v1/restrictions/account

返回给定账户的所有限制 ID。该账户必须是调用者的主账户或直接子账户。对未授权和不存在的账户均返回 403，以防止 ID 枚举。**范围**：`restrictions.read`**安全策略**：`HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/pre-trade-compliance/pre-trade-compliance-restrictions/get-account-restrictions

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 请求

### 查询参数

- `masterUserName` (string, required) — 已认证调用者的 IBKR 主用户名。最多 64 个字符。
- `accountId` (string, required) — 主账户或子账户 ID。最多 64 个字符。
- `isEmpTrack` (string, optional) — 设置为 `T` 以进行雇主通道（employer-track）授权。

### 请求头

- `Authorization` (string, required) — RS256 签名的 JWT（Bearer 格式），使用您注册的私钥签名。必须包含标识主账户的 `accountId` 声明。令牌缺失或无效时返回 HTTP 401。

## 响应

### 200

账户的限制 ID。

- `status` (string, required) — 成功时始终为 `ok`。
- `accountId` (string, required) — 原样返回请求中的值。
- `restrictionIds` (list of long, required) — 账户的限制 ID。没有时为空数组。

## 错误

### 400 错误请求

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

资源不属于调用者、不存在，或使用了不受支持的 HTTP 方法。所有情况均返回相同的响应体，以防止 ID 枚举。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

服务器内部错误。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

## 示例

### 存在限制的账户

**响应**

```json
{
  "status": "ok",
  "accountId": "U1000000",
  "restrictionIds": [
    1001,
    1002,
    1003
  ]
}
```

**SDK 代码**

```python Account with restrictions
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/account"

querystring = {"accountId":"U1000000","masterUserName":"user1"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Account with restrictions
const url = 'https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Account with restrictions
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Account with restrictions
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Account with restrictions
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Account with restrictions
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Account with restrictions
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Account with restrictions
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1")! as URL,
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

### 无限制的账户

**响应**

```json
{
  "status": "ok",
  "accountId": "U1000000",
  "restrictionIds": []
}
```

**SDK 代码**

```python Account with no restrictions
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/account"

querystring = {"accountId":"U1000000","masterUserName":"user1"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Account with no restrictions
const url = 'https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Account with no restrictions
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Account with no restrictions
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Account with no restrictions
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Account with no restrictions
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Account with no restrictions
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Account with no restrictions
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/account?accountId=U1000000&masterUserName=user1")! as URL,
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