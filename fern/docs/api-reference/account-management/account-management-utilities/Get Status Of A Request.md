# 获取请求状态

GET https://localhost:5000/gw/api/v1/requests/{requestId}/status

返回账户管理请求的状态**Scope**: `accounts.read`**Security Policy**: `HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/get-requests-status

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 路径参数

- `requestId` (long, required)

### 查询参数

- `type` (enum, required)
  - Allowed values: `response`, `update`

## 响应

### 200

返回账户管理请求的状态

- `Account Management Utilities_getRequestsStatus_Response_200`

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

### AmRequestStatusResponse

- `requestId` (string, optional)
- `requestType` (string, optional)
- `status` (string, optional)
- `message` (string, optional)
- `acctId` (string, optional)

### StatusResponse

- `requestId` (long, optional)
- `problemDetail` (map from string to StatusResponseProblemDetail, optional)
- `dateSubmitted` (datetime, optional)
- `fileData` (FileData, optional)

### StatusResponseProblemDetail

### FileData

- `data` (FileDataData, optional)
- `name` (string, optional)

### FileDataData

## 示例

**响应**

```json
{
  "acctId": "string",
  "message": "string",
  "requestId": "string",
  "requestType": "string",
  "status": "string"
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/requests/1/status"

querystring = {"type":"response"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/requests/1/status?type=response';
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

	url := "https://localhost:5000/gw/api/v1/requests/1/status?type=response"

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

url = URI("https://localhost:5000/gw/api/v1/requests/1/status?type=response")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/requests/1/status?type=response")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/requests/1/status?type=response', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/requests/1/status?type=response");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/requests/1/status?type=response")! as URL,
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