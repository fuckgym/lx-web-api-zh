# 将 FYI 免责声明标记为已读

PUT https://localhost:5000/v1/api/fyi/disclaimer/{typecode}

将特定的免责声明消息标记为已读。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fy-is-and-notifications/read-fyi-disclaimer

## 认证

- `Authorization` 请求头（bearer token, required）— SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱)

## 请求

### 路径参数

- `typecode` (enum, required) — 许多 FYI 端点都会引用一个 "typecode" 值。下表列出了可用的代码及其对应的含义。 * `BA` - 借券可用性 * `CA` - 可比算法 * `DA` - 股息顾问 * `EA` - 即将公布的财报 * `MF` - 共同基金顾问 * `OE` - 期权到期 * `PR` - 投资组合构建器再平衡 * `SE` - 经济事件暂停订单 * `SG` - 短期收益转为长期 * `SM` - 系统消息 * `T2` - 行权实现长期收益 * `TO` - 收购 * `UA` - 用户警报 * `M8` - M871 交易 * `PS` - 平台使用建议 * `DL` - 未行权期权损失预防提醒 * `PT` - 持仓转移 * `CB` - 缺失成本基础 * `MS` - 里程碑 * `TD` - MiFID || 10% 贬值通知 * `ST` - 节税 * `TI` - 交易想法 * `CT` - 资金划转
  - Allowed values: `BA`, `CA`, `DA`, `EA`, `MF`, `OE`, `PR`, `SE`, `SG`, `SM`, `T2`, `TO`, `UA`, `M8`, `PS`, `DL`, `PT`, `CB`, `MS`, `TD`, `ST`, `TI`, `CT`

## 响应

### 200

成功标记为已读

- `V` (long, optional) — 返回 1 表示消息已被确认。
- `T` (long, optional) — 返回完成编辑所用的时间（毫秒）。

## 错误

### 400 错误请求错误

缺少、为空、非数值或超出范围的参数。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

缺少、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

内部服务器错误，在传入请求无法被处理时返回。有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，而只有在处理请求的后续阶段才能检测到。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 示例

**响应**

```json
{
  "V": 1,
  "T": 10
}
```

**SDK 代码**

```python marked
import requests

url = "https://localhost:5000/v1/api/fyi/disclaimer/BA"

headers = {"Authorization": "Bearer <token>"}

response = requests.put(url, headers=headers)

print(response.json())
```

```javascript marked
const url = 'https://localhost:5000/v1/api/fyi/disclaimer/BA';
const options = {method: 'PUT', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go marked
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/fyi/disclaimer/BA"

	req, _ := http.NewRequest("PUT", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby marked
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/fyi/disclaimer/BA")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Put.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java marked
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.put("https://localhost:5000/v1/api/fyi/disclaimer/BA")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php marked
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('PUT', 'https://localhost:5000/v1/api/fyi/disclaimer/BA', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp marked
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/fyi/disclaimer/BA");
var request = new RestRequest(Method.PUT);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift marked
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fyi/disclaimer/BA")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "PUT"
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