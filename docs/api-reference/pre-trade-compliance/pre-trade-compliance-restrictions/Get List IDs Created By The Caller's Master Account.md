# 获取调用者主账户创建的列表 ID

GET https://localhost:5000/gw/api/v1/restrictions/lists/ids

返回已认证调用者自己的主账户（或 employer-track 模式下的雇主）创建的所有列表 ID，与 PTC 门户的 Lists 页面相同。**范围**：`restrictions.read`**安全策略**：`HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/pre-trade-compliance/pre-trade-compliance-restrictions/get-master-list-ids

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 请求

### 查询参数

- `masterUserName` (string, required) — 已认证调用者的 IBKR 主用户名。最多 64 个字符。
- `isEmpTrack` (string, optional) — 设置为 `T` 以进行雇主通道（employer-track）授权。

### 请求头

- `Authorization` (string, required) — RS256 签名的 JWT（Bearer 格式），使用您注册的私钥签名。必须包含标识主账户的 `accountId` 声明。令牌缺失或无效时返回 HTTP 401。

## 响应

### 200

调用者主账户创建的列表 ID。

- `status` (string, required) — 成功时始终为 `ok`。
- `masterUserName` (string, required) — 原样返回请求中的值。
- `lists` (list of MasterListEntry, required) — 调用者主账户（或 employer-track 模式下的雇主）创建的列表。没有时为空数组。

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

### 500 服务器内部错误

服务器内部错误。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

## 类型

### MasterListEntry

单个列表 ID 及其创建者类型标志。

- `listId` (long, optional) — 列表 ID。
- `byOperator` (boolean, optional) — 如果由 IB 操作员（合规/风险角色）创建则为 `true`；如果由客户（Customer 角色）创建则为 `false`。

## 示例

### 存在列表的主账户

**响应**

```json
{
  "status": "ok",
  "masterUserName": "user1",
  "lists": [
    {
      "listId": 2001,
      "byOperator": false
    },
    {
      "listId": 2002,
      "byOperator": true
    }
  ]
}
```

**SDK 代码**

```python Master account with lists
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/lists/ids"

querystring = {"masterUserName":"user1"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Master account with lists
const url = 'https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Master account with lists
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Master account with lists
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Master account with lists
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Master account with lists
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Master account with lists
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Master account with lists
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1")! as URL,
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

### 无列表的主账户

**响应**

```json
{
  "status": "ok",
  "masterUserName": "user1",
  "lists": []
}
```

**SDK 代码**

```python Master account with no lists
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/lists/ids"

querystring = {"masterUserName":"user1"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Master account with no lists
const url = 'https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Master account with no lists
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Master account with no lists
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Master account with no lists
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Master account with no lists
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Master account with no lists
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Master account with no lists
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/lists/ids?masterUserName=user1")! as URL,
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