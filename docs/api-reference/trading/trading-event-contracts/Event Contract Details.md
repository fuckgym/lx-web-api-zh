# 事件合约详情

GET https://localhost:5000/v1/api/forecast/contract/details

提供特定预测合约的金融工具详情。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-event-contracts/get-forecast-contract

## 认证

- `Authorization` 请求头（bearer token, required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 请求

### 查询参数

- `conid` (string, required)

## 响应

### 200

返回事件合约的扩展列表，同时包含 Yes 和 No 方向的标识符信息。

- `conid_yes` (long, optional) — "yes" 合约的合约标识符
- `conid_no` (long, optional) — "no" 合约的合约标识符
- `question` (string, optional) — 合约问题（例如 "这件事会在这个日期发生吗？"）
- `side` (string, optional) — "Y" 或 "N"，即 yes 或 no 合约。
- `strike_label` (string, optional) — 要显示的行权价标签。
- `strike` (long, optional) — 合约行权价。
- `exchange` (string, optional) — 合约的交易所。
- `expiration` (string, optional) — 合约到期日期，YYYYMMDD 格式。
- `symbol` (string, optional) — 合约代码。
- `category` (string, optional) — 在 /forecast/category/tree 中声明的所属市场类别。
- `logo_category` (string, optional) — 在 logo 服务中用于获取图像的 logo 类别。
- `measured_period` (string, optional) — 测量周期
- `market_name` (string, optional) — 合约所属市场的名称。
- `underlying_conid` (long, optional) — 合约的直接标的（例如 FOP 的期货 conid）
- `payout` (double, optional) — 赔付缩放比率。

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

**响应**

```json
{
  "conid_yes": 805953033,
  "conid_no": 805953036,
  "question": "Will US carbon dioxide emmissions exceed 5,050 million metric tons in 2035?",
  "side": "Y",
  "strike_label": "Above 5,050",
  "strike": 5050,
  "exchange": "FORECASTX",
  "expiration": "20360430",
  "symbol": "USCE",
  "category": "g5351",
  "logo_category": "g7369",
  "measured_period": "Dec31'35",
  "market_name": "United States Carbon Dioxide Emissions",
  "underlying_conid": 732764706,
  "payout": 1
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/forecast/contract/details"

querystring = {"conid":"conid"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/forecast/contract/details?conid=conid';
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

	url := "https://localhost:5000/v1/api/forecast/contract/details?conid=conid"

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

url = URI("https://localhost:5000/v1/api/forecast/contract/details?conid=conid")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/forecast/contract/details?conid=conid")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/forecast/contract/details?conid=conid', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/forecast/contract/details?conid=conid");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/forecast/contract/details?conid=conid")! as URL,
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