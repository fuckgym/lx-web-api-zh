# 返回所有已保存的自选列表

GET https://localhost:5000/v1/api/iserver/watchlists

返回当前 Web API 会话中所用用户名存储在 IB 后端的所有已保存自选列表。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-watchlists/get-all-watchlists

## 认证

- `Authorization` 请求头（bearer token, required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 请求

### 查询参数

- `SC` (enum, optional) — 只能使用值 USER_WATCHLIST，它仅返回用户创建的自选列表，并排除由 IB 创建的自选列表。
  - Allowed values: `USER_WATCHLIST`

## 响应

### 200

历史数据查询成功返回数据。

- `data` (WatchlistsResponseData, optional) — 包含自选列表查询结果。
- `action` (enum, optional) — 内部使用。始终为值 'content'。
  - Allowed values: `content`
- `MID` (string, optional) — 内部使用。会话期间该端点被访问的次数。

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

## 类型

### WatchlistsResponseData

包含自选列表查询结果。

- `scanners_only` (boolean, optional) — 指示查询结果是否仅包含市场扫描器。
- `show_scanners` (boolean, optional) — 指示查询结果中是否包含市场扫描器。
- `bulk_delete` (boolean, optional) — 指示该用户名的自选列表是否可以批量删除。
- `user_lists` (list of WatchlistsResponseDataUserListsItems, optional) — 详细列出当前 Web API 会话中所用用户名已保存自选列表的对象数组。

### WatchlistsResponseDataUserListsItems

单个自选列表的详细信息。

- `is_open` (boolean, optional) — 内部使用。指示该自选列表当前是否正在使用。
- `read_only` (boolean, optional) — 指示该自选列表是否可编辑。
- `name` (string, optional) — 自选列表的显示名称。
- `modified` (long, optional) — 自选列表最近一次修改的 Unix 时间戳（毫秒）。
- `id` (string, optional) — 该自选列表的自选列表 ID。
- `type` (enum, optional) — 始终为值 'watchlist'。
  - Allowed values: `watchlist`

## 示例

**响应**

```json
{
  "data": {
    "scanners_only": false,
    "show_scanners": false,
    "bulk_delete": false,
    "user_lists": [
      {
        "is_open": false,
        "read_only": false,
        "name": "Test Watchlist",
        "modified": 1702581306241,
        "id": "1234",
        "type": "watchlist"
      }
    ]
  },
  "action": "content",
  "MID": "2"
}
```

**SDK 代码**

```python watchlistDataExample
import requests

url = "https://localhost:5000/v1/api/iserver/watchlists"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript watchlistDataExample
const url = 'https://localhost:5000/v1/api/iserver/watchlists';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go watchlistDataExample
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/watchlists"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby watchlistDataExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/watchlists")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java watchlistDataExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/watchlists")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php watchlistDataExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/watchlists', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp watchlistDataExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/watchlists");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift watchlistDataExample
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/watchlists")! as URL,
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