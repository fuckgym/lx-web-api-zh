# 列出账户签名与所有者

GET https://localhost:5000/v1/api/acesws/{accountId}/signatures-and-owners

获取账户上所有申请人姓名的列表，以及所代表的账户和实体。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-accounts/get-account-owners

## 认证

- `Authorization` 请求头（bearer token, required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 请求

### 路径参数

- `accountId` (string, required)

## 响应

### 200

一个包含有效账户以及与交易访问权限相关的账户属性的对象。该端点也用于确认账户验证。

- `accountId` (string, optional) — 账户标识符
- `users` (list of user, optional)
- `applicant` (SignatureAndOwnersApplicant, optional)

## 错误

### 400 错误请求

错误请求；accountId 为空

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 503 服务不可用错误

服务不可用。例如，若因某个内部服务不可用导致请求耗时超过 10 秒，请求将被中止并返回此状态

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 类型

### user

- `roleId` (string, optional) — 该用户名相对于此账户的角色
- `hasRightCodeInd` (boolean, optional) — 内部使用
- `userName` (string, optional) — 标识指定实体的用户名。
- `entity` (UserEntity, optional) — 提供特定实体的相关信息

### SignatureAndOwnersApplicant

- `signatures` (list of string, optional) — 附加到该账户的所有姓名

### UserEntity

提供特定实体的相关信息

- `entityName` (string, optional) — 实体的完整名称，由名字和姓氏字段拼接而成
- `entityType` (enum, optional) — 分配给用户的实体类型
  - Allowed values: `INDIVIDUAL`, `Joint`, `ORG`
- `firstName` (string, optional) — 用户的名字
- `lastName` (string, optional) — 用户的姓氏

## 示例

**响应**

```json
{
  "accountId": "U1234567",
  "users": [
    {
      "roleId": "OWNER",
      "hasRightCodeInd": true,
      "userName": "user1234",
      "entity": {
        "entityName": "John Smith",
        "entityType": "INDIVIDUAL",
        "firstName": "John",
        "lastName": "Smith"
      }
    }
  ],
  "applicant": {
    "signatures": [
      "John Smith"
    ]
  }
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/acesws/accountId/signatures-and-owners"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/acesws/accountId/signatures-and-owners';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go success
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/acesws/accountId/signatures-and-owners"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby success
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/acesws/accountId/signatures-and-owners")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/acesws/accountId/signatures-and-owners")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/acesws/accountId/signatures-and-owners', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/acesws/accountId/signatures-and-owners");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/acesws/accountId/signatures-and-owners")! as URL,
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