# 列出所有通知

GET https://localhost:5000/v1/api/fyi/notifications

获取可用通知的列表。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fy-is-and-notifications/get-all-fyis

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 查询参数

- `max` (long, required)
- `include` (any, optional)
- `exclude` (any, optional)
- `id` (any, optional)

## 响应

### 200

已成功启用或禁用您的电子邮件通知。

- `list of NotificationsItems`

## 错误

### 400 错误请求错误

缺少参数、参数为空、参数非数字或超出范围。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，当传入的请求无法被处理时返回。它有时可能包含错误请求（bad request）的子集。例如，传入的 accountId 有误，而只能在处理请求的后续阶段才被检测出来。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### NotificationsItems

- `R` (string, optional) — 返回该通知是否已读。取值格式：0：已禁用；1：已启用。
- `D` (string, optional) — 通知日期，以 epoch 字符串表示。
- `MS` (string, optional) — 通知标题。
- `MD` (string, optional) — 通知内容。
- `ID` (string, optional) — 引用该通知的唯一标识。
- `HT` (long, optional) — HT
- `FC` (string, optional) — FYI 代码，可用于在设置中查明免责声明是否已被接受

## 示例

**响应**

```json
[
  {
    "R": "0",
    "D": "1710847062.0",
    "MS": "FYI: Changes in Analyst Ratings",
    "MD": "<html>Some investors use analysts ratings to stay informed about their investments. Analysts have changed their ratings for one or more companies in which you hold positions.    <br />The following summary displays the affected companies, the current number of analysts by rating category and, in parentheses, the recent change in the number of analysts rating the company within each rating category.  <br /> - JWN@NYSE: Buy: 1(0), Outperform: 1(0), Hold: 12(-1), Underperform: 5(0), Sell: 0(0). Held in: D****000 <br /> - RF@NYSE: Buy: 4(+1), Outperform: 5(0), Hold: 17(-1), Underperform: 1(0), Sell: 0(0). Held in: D****000 <br /> <br />   Note: Current ratings are from Reuters and may not reflect all rating changes from other sources such as Street Insider and Briefing.</html>",
    "ID": "2024031947509444",
    "HT": 0,
    "FC": "PF"
  },
  {
    "R": "1",
    "D": "1710761985.0",
    "MS": "FYI: Changes in Analyst Ratings",
    "MD": "<html>Some investors use analysts ratings to stay informed about their investments. Analysts have changed their ratings for one or more companies in which you hold positions.    <br />The following summary displays the affected companies, the current number of analysts by rating category and, in parentheses, the recent change in the number of analysts rating the company within each rating category.  <br /> - F@NYSE: Buy: 4(0), Outperform: 4(0), Hold: 15(+1), Underperform: 3(-1), Sell: 1(0). Held in: D****000 <br /> - RF@NYSE: Buy: 4(+1), Outperform: 5(0), Hold: 17(-1), Underperform: 1(0), Sell: 0(0). Held in: D****000 <br /> - TSLA@NASDAQ: Buy: 5(0), Outperform: 12(0), Hold: 21(0), Underperform: 7(+1), Sell: 4(0). Held in: D****000 <br /> - UAA@NYSE: Buy: 6(0), Outperform: 2(-1), Hold: 17(+1), Underperform: 2(0), Sell: 0(0). Held in: D****000 <br /> <br />   Note: Current ratings are from Reuters and may not reflect all rating changes from other sources such as Street Insider and Briefing.</html>",
    "ID": "2024031843829868",
    "HT": 0,
    "FC": "PF"
  },
  {
    "R": "1",
    "D": "1710501829.0",
    "MS": "FYI: Changes in Analyst Ratings",
    "MD": "<html>Some investors use analysts ratings to stay informed about their investments. Analysts have changed their ratings for one or more companies in which you hold positions.    <br />The following summary displays the affected companies, the current number of analysts by rating category and, in parentheses, the recent change in the number of analysts rating the company within each rating category.  <br /> - F@NYSE: Buy: 4(0), Outperform: 4(0), Hold: 14(+1), Underperform: 4(0), Sell: 1(0). Held in: D****000 <br /> - UAA@NYSE: Buy: 6(0), Outperform: 3(-1), Hold: 16(-1), Underperform: 2(+1), Sell: 0(0). Held in: D****000 <br /> <br />   Note: Current ratings are from Reuters and may not reflect all rating changes from other sources such as Street Insider and Briefing.</html>",
    "ID": "2024031537589663",
    "HT": 0,
    "FC": "PF"
  }
]
```

**SDK 代码**

```python all-notifications
import requests

url = "https://localhost:5000/v1/api/fyi/notifications"

querystring = {"max":"10"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript all-notifications
const url = 'https://localhost:5000/v1/api/fyi/notifications?max=10';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go all-notifications
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/fyi/notifications?max=10"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby all-notifications
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/fyi/notifications?max=10")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java all-notifications
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/fyi/notifications?max=10")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php all-notifications
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/fyi/notifications?max=10', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp all-notifications
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/fyi/notifications?max=10");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift all-notifications
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fyi/notifications?max=10")! as URL,
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