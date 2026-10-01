# 获取限制详情

GET https://localhost:5000/gw/api/v1/restrictions/restriction

返回限制的完整详情，包括其规则。该限制必须为调用者所有。对于未授权和不存在的限制均返回 403，以防止 ID 枚举。**范围**：`restrictions.read`**安全策略**：`HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/pre-trade-compliance/pre-trade-compliance-restrictions/get-restriction-details

## 认证

- `Authorization` 请求头（bearer token，required）— 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 查询参数

- `masterUserName` (string, required) — 已认证调用者的 IBKR 主用户名。最多 64 个字符。
- `restrictionId` (long, required) — 正整数。小数和非数值将返回 400。
- `isEmpTrack` (string, optional) — 雇主通道（employer-track）授权时设置为 `T`。

### 请求头

- `Authorization` (string, required) — RS256 签名的 JWT（Bearer 格式），使用您注册的私钥签名。必须包含标识主账户的 `accountId` 声明（claim）。令牌缺失或无效时返回 HTTP 401。

## 响应

### 200

完整的限制详情。

- `status` (string, required) — 成功时始终为 `ok`。
- `restrictionId` (long, required) — 从请求中回显。
- `rules` (list of RestrictionRule, required) — 附加到此限制的规则。没有时为空数组。
- `name` (string, optional) — 限制名称。
- `description` (string, optional, nullable) — 限制描述。
- `message` (string, optional, nullable) — 限制触发时向用户显示的消息。
- `applicationType` (string, optional) — 示例值：Restrict。
- `usageType` (string, optional) — 示例值：Trading, Compliance, Monitor。
- `allowOnly` (string, optional, nullable) — 不适用时为 null。数据库返回的值 `F` 会被规范化为 null。
- `matchAll` (string, optional, nullable) — 不适用时为 null。数据库返回的值 `F` 会被规范化为 null。
- `isWhiteList` (string, optional) — 白名单标志。
- `tmFrequency` (string, optional) — 交易监控的重复频率。仅在已配置时存在。
- `tmFirstDate` (long, optional) — 交易监控的开始时间戳（epoch 毫秒）。仅在已配置时存在。

## 错误

### 400 错误请求

参数缺失、为空、非数值或超出范围。`error` 字段始终带有 `Bad Request:` 前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

授权令牌缺失、无效或无法解析。

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

## 类型

### RestrictionRule

限制中的单条规则。字段顺序：`ruleId`、`type`、`validityType`、`startDate`/`endDate`（仅限 GTD）、`params`（为空时不出现）。

- `ruleId` (long, optional) — 限制内的规则 ID。
- `type` (string, optional) — 示例值：CLOSINGONLY, RESTRICTALLORDERS, CONCENTRATIONLIMIT, RESTRICTEDASSETCLASS, ISSUER, CONID, UNDERLYING, WHITELIST。
- `validityType` (string, optional) — GTC = Good Till Cancelled，GTD = Good Till Date。
- `startDate` (string, optional) — 仅适用于 GTD 规则。格式：MM/dd/yyyy。
- `endDate` (string, optional) — 仅适用于 GTD 规则。格式：MM/dd/yyyy。
- `params` (list of map from string to string, optional) — 规则参数。规则没有参数时不出现。

## 示例

### 包含一条规则的限制

**响应**

```json
{
  "status": "ok",
  "restrictionId": 1001,
  "rules": [
    {
      "ruleId": 5001,
      "type": "RESTRICTALLORDERS",
      "validityType": "GTC",
      "params": [
        {
          "orderside": "ALL"
        }
      ]
    }
  ],
  "name": "My Restriction",
  "description": null,
  "message": null,
  "applicationType": "Restrict",
  "usageType": "Trading",
  "allowOnly": null,
  "matchAll": null,
  "isWhiteList": "F"
}
```

**SDK 代码**

```python Restriction with one rule
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/restriction"

querystring = {"masterUserName":"user1","restrictionId":"1001"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Restriction with one rule
const url = 'https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Restriction with one rule
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Restriction with one rule
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Restriction with one rule
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Restriction with one rule
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Restriction with one rule
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Restriction with one rule
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001")! as URL,
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

### 包含交易监控的限制

**响应**

```json
{
  "status": "ok",
  "restrictionId": 1002,
  "rules": [],
  "name": "My TM Restriction",
  "description": null,
  "message": null,
  "applicationType": "Restrict",
  "usageType": "Monitor",
  "allowOnly": null,
  "matchAll": null,
  "isWhiteList": "F",
  "tmFrequency": "Daily",
  "tmFirstDate": 1700000000000
}
```

**SDK 代码**

```python Restriction with trade-monitoring
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/restriction"

querystring = {"masterUserName":"user1","restrictionId":"1001"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Restriction with trade-monitoring
const url = 'https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Restriction with trade-monitoring
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Restriction with trade-monitoring
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Restriction with trade-monitoring
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Restriction with trade-monitoring
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Restriction with trade-monitoring
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Restriction with trade-monitoring
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/restriction?masterUserName=user1&restrictionId=1001")! as URL,
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