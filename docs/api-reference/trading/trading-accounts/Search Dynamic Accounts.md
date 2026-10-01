# 搜索动态账户

GET https://localhost:5000/v1/api/iserver/account/search/{searchPattern}

返回与请求中设置的查询模式相匹配的账户列表。配置了 DYNACCT 属性的经纪账户在登录时不会收到账户信息，而是必须先动态查询再设置其账户号码。不具备 DYNACCT 属性的客户将收到 503 错误。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-accounts/get-dynamic-accounts

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 路径参数

- `searchPattern` (string, required)

## 响应

### 200

返回所有与 searchPattern 字符串相匹配的账户。

- `matchedAccounts` (list of DynAccountSearchResponseMatchedAccountsItems, optional) — 包含一系列与所请求账户信息相关的对象。
- `pattern` (string, optional) — 显示该请求所使用的 searchPattern。

## 错误

### 401 未授权错误

缺少、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 503 服务不可用错误

服务不可用。例如，若因某些内部服务不可用导致请求耗时超过 10 秒，则请求会被中止并返回此状态码。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### DynAccountSearchResponseMatchedAccountsItems

- `accountId` (string, optional) — 返回与该匹配值相对应的匹配账户 ID。
- `alias` (string, optional) — 返回特定账户 ID 对应的别名或替代名称。在大多数情况下可能与 accountId 值重复。
- `allocationId` (string, optional) — 返回该账户内部使用的分配标识符。

## 示例

### successfully-found

**响应**

```json
{
  "matchedAccounts": [
    {
      "accountId": "U1234567",
      "alias": "U1234567",
      "allocationId": "U1234567"
    }
  ],
  "pattern": "U1"
}
```

**SDK 代码**

```python successfully-found
import requests

url = "https://localhost:5000/v1/api/iserver/account/search/U123"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript successfully-found
const url = 'https://localhost:5000/v1/api/iserver/account/search/U123';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go successfully-found
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/search/U123"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby successfully-found
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/search/U123")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java successfully-found
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/search/U123")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php successfully-found
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/search/U123', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp successfully-found
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/search/U123");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift successfully-found
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/search/U123")! as URL,
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

### not-found

**响应**

```json
{
  "matchedAccounts": [],
  "pattern": "123"
}
```

**SDK 代码**

```python not-found
import requests

url = "https://localhost:5000/v1/api/iserver/account/search/U123"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript not-found
const url = 'https://localhost:5000/v1/api/iserver/account/search/U123';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go not-found
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/search/U123"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby not-found
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/search/U123")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java not-found
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/search/U123")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php not-found
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/search/U123', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp not-found
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/search/U123");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift not-found
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/search/U123")! as URL,
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