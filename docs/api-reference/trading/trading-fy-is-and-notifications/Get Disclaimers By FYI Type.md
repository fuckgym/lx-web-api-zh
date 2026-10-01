# 按 FYI 类型获取免责声明

GET https://localhost:5000/v1/api/fyi/disclaimer/{typecode}

根据指定的 typecode 接收更多免责声明。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fy-is-and-notifications/get-fyi-disclaimerss

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

成功返回免责声明详情

- `FC` (string, optional) — 返回给定免责声明的 Typecode。
- `DT` (string, optional) — 返回免责声明消息。

## 错误

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
  "FC": "BA",
  "DT": "This communication is provided for information purposes only and is not a recommendation or a solicitation to buy, sell or hold any investment product. Selling securities short involves significant risk and you may lose more than you invest."
}
```

**SDK 代码**

```python ba-disclaimer
import requests

url = "https://localhost:5000/v1/api/fyi/disclaimer/BA"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript ba-disclaimer
const url = 'https://localhost:5000/v1/api/fyi/disclaimer/BA';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go ba-disclaimer
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/fyi/disclaimer/BA"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby ba-disclaimer
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/fyi/disclaimer/BA")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java ba-disclaimer
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/fyi/disclaimer/BA")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php ba-disclaimer
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/fyi/disclaimer/BA', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp ba-disclaimer
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/fyi/disclaimer/BA");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift ba-disclaimer
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fyi/disclaimer/BA")! as URL,
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