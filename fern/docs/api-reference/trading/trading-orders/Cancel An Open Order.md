# 取消未成交订单

DELETE https://localhost:5000/v1/api/iserver/account/{accountId}/order/{orderId}

取消一个已存在且未成交的订单。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-orders/cancel-open-order

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 请求

### 路径参数

- `accountId` (string, required) — 订单将进行清算的账户。
- `orderId` (string, required) — 目标订单的 IB 分配的订单 ID。

### 查询参数

- `extOperator` (string, optional) — ExtOperator 用于标识外部操作者。
- `manualIndicator` (boolean, optional) — 对于美国期货产品的所有订单，客户必须提交此标志，以表明订单是由人工（自然人）发起，还是由自动交易系统在无人工干预的情况下发送订单自动发起。提交 True 表示人工发起的订单，提交 False 表示自动订单。不含此字段的 USFUT 产品订单将被拒绝。
- `manualCancelTime` (string, optional) — 人工取消的时间。

## 响应

### 200

提交状态

- `Trading Orders_cancelOpenOrder_Response_200`

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

服务器内部错误，在传入请求无法被处理时返回。有时可能包含部分属于错误请求的情况。例如传入了错误的 accountId，只能在处理请求的过程中才能检测出来。错误信息包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### orderCancelSuccess

确认 IB 已接受取消订单的请求。并不报告该取消最终能否或将会被执行。

- `msg` (enum, optional) — 以值 'Request was submitted' 表示成功
  - Allowed values: `Request was submitted`
- `order_id` (long, optional) — 请求取消的订单的 IB 订单 ID。
- `conid` (string, optional) — 订单所涉金融工具的 IB 合约 ID。
- `account` (string, optional, nullable) — 订单最初设定进行清算的 IB 账户。

### orderSubmitError

表示订单回复消息或提交未被接受。

- `error` (string, optional) — 指示订单提交未成功的消息。

## 示例

### orderCancelSuccessExample

**响应**

```json
{
  "account": null,
  "conid": "-1",
  "msg": "Request was submitted",
  "order_id": 1370093239
}
```

**SDK 代码**

```python orderCancelSuccessExample
import requests

url = "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559"

headers = {"Authorization": "Bearer <token>"}

response = requests.delete(url, headers=headers)

print(response.json())
```

```javascript orderCancelSuccessExample
const url = 'https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559';
const options = {method: 'DELETE', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go orderCancelSuccessExample
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559"

	req, _ := http.NewRequest("DELETE", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby orderCancelSuccessExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java orderCancelSuccessExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.delete("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php orderCancelSuccessExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('DELETE', 'https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp orderCancelSuccessExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559");
var request = new RestRequest(Method.DELETE);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift orderCancelSuccessExample
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "DELETE"
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

### orderCancelErrorExample

**响应**

```json
{
  "error": "OrderID 123456 doesn't exist"
}
```

**SDK 代码**

```python orderCancelErrorExample
import requests

url = "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559"

headers = {"Authorization": "Bearer <token>"}

response = requests.delete(url, headers=headers)

print(response.json())
```

```javascript orderCancelErrorExample
const url = 'https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559';
const options = {method: 'DELETE', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go orderCancelErrorExample
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559"

	req, _ := http.NewRequest("DELETE", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby orderCancelErrorExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Delete.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java orderCancelErrorExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.delete("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php orderCancelErrorExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('DELETE', 'https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp orderCancelErrorExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559");
var request = new RestRequest(Method.DELETE);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift orderCancelErrorExample
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/DU123456/order/1799796559")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "DELETE"
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