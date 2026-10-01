# 获取登录消息

GET https://localhost:5000/gw/api/v1/accounts/login-messages

查询与‘Client ID’关联的所有存在未完成登录消息的账户**Scope**: `accounts.read`**Security Policy**: `HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/list-accounts-login-messages

## 认证

- `Authorization` 请求头 (bearer token, required) — RS256 签名 JWT 访问令牌，使用您注册的私钥签名。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 查询参数

- `loginMessageRequest` (LoginMessageRequest, required)

## 响应

### 200

查询与‘Client ID’关联的所有存在未完成登录消息的账户

- `accountId` (string, optional)
- `clearingStatus` (string, optional)
- `clearingStatusDescription` (string, optional)
- `loginMessages` (list of LoginMessage, optional)
- `loginMessagePresent` (boolean, optional)

## 错误

### 400 错误请求错误

返回表示错误请求的错误描述

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

### 401 未授权错误

返回表示访问问题的错误描述

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

### 403 禁止访问错误

返回表示访问问题的错误描述

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

### 500 内部服务器错误

返回表示内部服务器错误的错误描述

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

## 类型

### LoginMessageRequest

- `startDate` (date, required)
- `endDate` (date, required)
- `offset` (long, optional)
- `limit` (long, optional)
- `status` (enum, optional)
  - Allowed values: `N`, `O`, `P`, `C`, `A`, `E`, `F`, `I`, `J`, `L`, `M`, `R`, `W`, `Q`
- `type` (string, optional)

### LoginMessage

- `recordDate` (datetime, optional)
- `id` (long, optional)
- `username` (string, optional)
- `messageType` (string, optional)
- `contentId` (long, optional)
- `state` (string, optional)
- `description` (string, optional)
- `tasks` (list of long, optional)

## 示例

**响应**

```json
{
  "accountId": "string",
  "clearingStatus": "string",
  "clearingStatusDescription": "string",
  "loginMessages": [
    {
      "recordDate": "2024-01-15T09:30:00Z",
      "id": 1,
      "username": "string",
      "messageType": "string",
      "contentId": 1,
      "state": "string",
      "description": "string",
      "tasks": [
        1
      ]
    }
  ],
  "loginMessagePresent": true
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/accounts/login-messages"

querystring = {"loginMessageRequest":"{\"endDate\":\"2023-01-15\",\"startDate\":\"2023-01-15\"}"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/accounts/login-messages?loginMessageRequest=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/accounts/login-messages?loginMessageRequest=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/accounts/login-messages?loginMessageRequest=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/accounts/login-messages?loginMessageRequest=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/accounts/login-messages?loginMessageRequest=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/accounts/login-messages?loginMessageRequest=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/accounts/login-messages?loginMessageRequest=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D")! as URL,
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