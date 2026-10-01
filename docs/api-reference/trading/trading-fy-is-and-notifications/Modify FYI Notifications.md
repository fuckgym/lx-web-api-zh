# 修改 FYI 通知

POST https://localhost:5000/v1/api/fyi/settings/{typecode}
Content-Type: application/json

按特定的 typecode 启用或禁用一组通知。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fy-is-and-notifications/modify-fyi-notification

## 认证

- `Authorization` 请求头（bearer token, required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 请求

### 路径参数

- `typecode` (enum, required) — 许多 FYI 端点都会引用一个 "typecode" 值。下表列出了可用的代码及其对应的含义。* `BA` - 借贷可用性 * `CA` - 可比算法 * `DA` - 股息顾问 * `EA` - 即将到来的财报 * `MF` - 共同基金顾问 * `OE` - 期权到期 * `PR` - Portfolio Builder 再平衡 * `SE` - 经济事件期间暂停订单 * `SG` - 短期收益转为长期 * `SM` - 系统消息 * `T2` - 行权实现长期收益 * `TO` - 收购 * `UA` - 用户警报 * `M8` - M871 交易 * `PS` - 平台使用建议 * `DL` - 未行权期权亏损防范提醒 * `PT` - 持仓转移 * `CB` - 缺失成本基础 * `MS` - 里程碑 * `TD` - MiFID || 10% 减值通知 * `ST` - 节省税款 * `TI` - 交易观点 * `CT` - 资金划转
  - Allowed values: `BA`, `CA`, `DA`, `EA`, `MF`, `OE`, `PR`, `SE`, `SG`, `SM`, `T2`, `TO`, `UA`, `M8`, `PS`, `DL`, `PT`, `CB`, `MS`, `TD`, `ST`, `TI`, `CT`

### 请求体 (application/json)

该端点预期接收一个对象。

- `enabled` (boolean, optional) — 该通知应启用还是禁用。

## 响应

### 200

成功获取预设详情

- `V` (long, optional) — 返回 1，表示消息已确认。
- `T` (long, optional) — 返回完成此次编辑所耗时的时间（毫秒）。

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，在传入请求无法处理时返回。有时可能包含部分错误请求。例如，传入的 accountId 有误，而只能在处理请求的后期才被检测到。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，若因某个内部服务不可用导致请求耗时超过 10 秒，请求将被中止并返回此状态

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "V": 1,
  "T": 10
}
```

**SDK 代码**

```python successEdited
import requests

url = "https://localhost:5000/v1/api/fyi/settings/BA"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript successEdited
const url = 'https://localhost:5000/v1/api/fyi/settings/BA';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go successEdited
package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/fyi/settings/BA"

	payload := strings.NewReader("{}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby successEdited
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/fyi/settings/BA")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java successEdited
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/v1/api/fyi/settings/BA")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php successEdited
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/v1/api/fyi/settings/BA', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp successEdited
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/fyi/settings/BA");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift successEdited
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fyi/settings/BA")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

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