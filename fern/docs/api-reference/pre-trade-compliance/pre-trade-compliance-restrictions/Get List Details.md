# 获取列表详情

GET https://localhost:5000/gw/api/v1/restrictions/list

返回列表的元数据和金融工具条目。该列表必须为调用者所有。对于未授权和不存在的列表均返回 403，以防止 ID 枚举。**范围**：`restrictions.read`**安全策略**：`HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/pre-trade-compliance/pre-trade-compliance-restrictions/get-list-details

## 认证

- `Authorization` 请求头（bearer token，required）— 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 查询参数

- `masterUserName` (string, required) — 已认证调用者的 IBKR 主用户名。最多 64 个字符。
- `listId` (long, required) — 范围 1–2147483647 内的正整数。小数和非数值将返回 400。大于 2147483647 的值将返回 400。
- `isEmpTrack` (string, optional) — 雇主通道（employer-track）授权时设置为 `T`。

### 请求头

- `Authorization` (string, required) — RS256 签名的 JWT（Bearer 格式），使用您注册的私钥签名。必须包含标识主账户的 `accountId` 声明（claim）。令牌缺失或无效时返回 HTTP 401。

## 响应

### 200

列表元数据和条目。

- `status` (string, required) — 成功时始终为 `ok`。
- `listId` (long, required) — 范围 1–2147483647。
- `entries` (list of ListEntry, required) — 金融工具条目。没有时为空数组。
- `type` (string, optional) — 示例值：SYMBOL, CONID, EXCHANGE, SECTOR, ISSUERORCONID。
- `name` (string, optional) — 列表名称。
- `description` (string, optional, nullable) — 列表描述。

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

### ListEntry

列表中的单个金融工具条目。

- `id` (long, optional) — 条目 ID。
- `type` (string, optional) — 示例值：ISSUER, CONID, SYMBOL, INDUSTRY。
- `createdAt` (long, optional) — 创建时间戳（epoch 毫秒）。
- `params` (ListEntryParams, optional) — 金融工具标识符参数。键取决于条目类型：ISSUER/CONID 条目使用 `symbol`、`symboldesc`、`val`；INDUSTRY 条目使用 `indgroup`；其他类型可能使用不同的键。

### ListEntryParams

金融工具标识符参数。键取决于条目类型：ISSUER/CONID 条目使用 `symbol`、`symboldesc`、`val`；INDUSTRY 条目使用 `indgroup`；其他类型可能使用不同的键。

- `symbol` (string, optional) — 金融工具标识符。格式取决于条目类型。
- `symboldesc` (string, optional) — 人类可读的金融工具描述。
- `val` (string, optional) — 内部实体标识符。

## 示例

### 包含两个 ISSUER 条目的 ISSUERORCONID 列表

**响应**

```json
{
  "status": "ok",
  "listId": 2001,
  "entries": [
    {
      "id": 300001,
      "type": "ISSUER",
      "createdAt": 1700000000000,
      "params": {
        "symbol": "ISIN:US0000000000",
        "symboldesc": "Bond, Example Corp - Ultimate Issuer: Example Corp, ISIN: US0000000000",
        "val": "e0000001"
      }
    },
    {
      "id": 300002,
      "type": "ISSUER",
      "createdAt": 1700000000000,
      "params": {
        "symbol": "ISIN:US0000000001",
        "symboldesc": "Bond, Example Corp Subsidiary - Ultimate Issuer: Example Corp, ISIN: US0000000001",
        "val": "e0000002"
      }
    }
  ],
  "type": "ISSUERORCONID",
  "name": "My Issuer List",
  "description": null
}
```

**SDK 代码**

```python ISSUERORCONID list with two ISSUER entries
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/list"

querystring = {"listId":"2001","masterUserName":"user1"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript ISSUERORCONID list with two ISSUER entries
const url = 'https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go ISSUERORCONID list with two ISSUER entries
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby ISSUERORCONID list with two ISSUER entries
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java ISSUERORCONID list with two ISSUER entries
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php ISSUERORCONID list with two ISSUER entries
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp ISSUERORCONID list with two ISSUER entries
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift ISSUERORCONID list with two ISSUER entries
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1")! as URL,
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

### 无条目的列表

**响应**

```json
{
  "status": "ok",
  "listId": 2001,
  "entries": [],
  "type": "SYMBOL",
  "name": "My Symbol List",
  "description": null
}
```

**SDK 代码**

```python List with no entries
import requests

url = "https://localhost:5000/gw/api/v1/restrictions/list"

querystring = {"listId":"2001","masterUserName":"user1"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript List with no entries
const url = 'https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go List with no entries
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby List with no entries
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java List with no entries
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php List with no entries
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp List with no entries
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift List with no entries
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/restrictions/list?listId=2001&masterUserName=user1")! as URL,
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