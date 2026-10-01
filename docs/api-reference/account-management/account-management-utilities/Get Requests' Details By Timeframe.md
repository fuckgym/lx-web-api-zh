# 按时间段获取请求详情

GET https://localhost:5000/gw/api/v1/requests

按时间段获取请求详情**作用域**：`accounts.read`**安全策略**：`HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/list-requests

## 认证

- `Authorization` 请求头（bearer token, required）— 使用您注册的私钥签名的 RS256 签名 JWT 访问令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 请求

### 查询参数

- `requestDetails` (RequestDetailsRequest, required)

## 响应

### 200

按时间段获取请求详情

- `requestDetails` (list of RequestDetail, optional)
- `offset` (long, optional)
- `limit` (long, optional)
- `total` (long, optional)

## 错误

### 400 错误请求

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

### RequestDetailsRequest

- `startDate` (date, required)
- `endDate` (date, required)
- `offset` (long, optional)
- `limit` (long, optional)
- `status` (enum, optional)
  - Allowed values: `N`, `O`, `P`, `C`, `A`, `E`, `F`, `I`, `J`, `L`, `M`, `R`, `W`, `Q`

### RequestDetail

- `requestId` (long, optional)
- `dateSubmitted` (string, optional)
- `status` (string, optional)
- `accountID` (string, optional)
- `requestType` (string, optional)

## 示例

**响应**

```json
{
  "requestDetails": [
    {
      "requestId": 1,
      "dateSubmitted": "string",
      "status": "string",
      "accountID": "string",
      "requestType": "string"
    }
  ],
  "offset": 1,
  "limit": 1,
  "total": 1
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/requests"

querystring = {"requestDetails":"{\"endDate\":\"2023-01-15\",\"startDate\":\"2023-01-15\"}"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/requests?requestDetails=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D';
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

	url := "https://localhost:5000/gw/api/v1/requests?requestDetails=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D"

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

url = URI("https://localhost:5000/gw/api/v1/requests?requestDetails=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/requests?requestDetails=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/requests?requestDetails=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/requests?requestDetails=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/requests?requestDetails=%7B%22endDate%22%3A%222023-01-15%22%2C%22startDate%22%3A%222023-01-15%22%7D")! as URL,
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