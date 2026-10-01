# 账户盈亏

GET https://localhost:5000/v1/api/iserver/account/pnl/partitioned

返回所选账户的最新盈亏值。初始请求会在 upnl 对象中返回一个空数组。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-accounts/get-pnl

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 响应

### 200

指“最新盈亏”（updated PnL）。包含一个由键值对盈亏详情组成的 json 对象。

- `upnl` (PnlPartitionedResponseUpnl, optional) — 指 U 账户的盈亏。此处的确引用的是已实现盈亏（Realized Profit and Loss）。

## 错误

### 400 错误请求错误

错误请求；传入的输入未通过初始验证并被立即检测到

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 503 服务不可用错误

服务不可用。例如，当由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### PnlPartitionedResponseUpnl

指 U 账户的盈亏。此处的确引用的是已实现盈亏（Realized Profit and Loss）。

- `U1234567.Core` (PnlPartitionedResponseUpnlU1234567Core, optional) — 账户或模型的盈亏。

### PnlPartitionedResponseUpnlU1234567Core

账户或模型的盈亏。

- `rowType` (long, optional) — 返回所返回账户的位置值。对个人账户始终返回 1。
- `dpl` (long, optional) — 指定账户分区的当日盈亏。
- `nl` (long, optional) — 指定账户分区的净清算价值（Net Liquidity）。
- `upl` (long, optional) — 指定账户分区的未实现盈亏。
- `el` (long, optional) — 指定账户分区的超额流动性（Excess Liquidity）。
- `mv` (long, optional) — 指定账户分区的保证金价值。

## 示例

### success

**响应**

```json
{
  "upnl": {
    "U1234567.Core": {
      "rowType": 1,
      "dpl": -12510,
      "nl": 1290000,
      "upl": 256000,
      "el": 824600,
      "mv": 1700000
    }
  }
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/iserver/account/pnl/partitioned"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/iserver/account/pnl/partitioned';
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

	url := "https://localhost:5000/v1/api/iserver/account/pnl/partitioned"

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

url = URI("https://localhost:5000/v1/api/iserver/account/pnl/partitioned")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/pnl/partitioned")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/pnl/partitioned', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/pnl/partitioned");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/pnl/partitioned")! as URL,
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

### can-be-empty-for-initial-request

**响应**

```json
{
  "upnl": {}
}
```

**SDK 代码**

```python can-be-empty-for-initial-request
import requests

url = "https://localhost:5000/v1/api/iserver/account/pnl/partitioned"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript can-be-empty-for-initial-request
const url = 'https://localhost:5000/v1/api/iserver/account/pnl/partitioned';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go can-be-empty-for-initial-request
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/pnl/partitioned"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby can-be-empty-for-initial-request
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/pnl/partitioned")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java can-be-empty-for-initial-request
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/pnl/partitioned")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php can-be-empty-for-initial-request
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/pnl/partitioned', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp can-be-empty-for-initial-request
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/pnl/partitioned");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift can-be-empty-for-initial-request
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/pnl/partitioned")! as URL,
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