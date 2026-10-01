# 获取给定资产类型的参与券商列表

GET https://localhost:5000/gw/api/v1/enumerations/complex-asset-transfer

获取支持给定资产划转类型的券商列表**作用域**: `enumerations.read`**安全策略**: `HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/list-enumerations-complex-asset-transfer

## 认证

- `Authorization` 请求头（bearer token, required）— 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱)

## 请求

### 路径参数

- `client-id` (string, required) — 客户的 clientId

### 查询参数

- `instructionType` (string, required) — 用于获取受支持券商列表的资产划转类型

## 响应

### 200

返回支持给定资产类型的券商列表

- `instructionType` (string, required) — 指令的类型。
- `brokers` (list of string, required) — 受支持的券商名称列表。

## 错误

### 400 错误请求错误

返回表示未找到请求的 Problem detail 实例。

- `type` (string, required) — 标识问题类型的 URI 引用。
- `title` (string, required) — 问题的简短人类可读摘要。
- `status` (long, required) — HTTP 状态码 (404)。
- `detail` (string, optional) — 问题的人类可读解释。

### 500 服务器内部错误

由于内部错误无法处理请求。请稍后重试。

- `type` (string, required)
- `title` (string, required)
- `status` (long, required)

## 示例

**响应**

```json
{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "brokers": [
    "DONNER & REUSCHEL",
    "IBROKER GLOBAL MARKETS SOCIEDAD DE VALORES, S.A",
    "EQUATEX 4500",
    "IMAGI  BROKERAGE LIMITED",
    "V-BANK",
    "ADMIRAL MARKETS UK LTD",
    "ALFA BANK",
    "YICKO SECURITIES LIMITED",
    "BLACKWELL GLOBAL SECURITIES LIMITED",
    "EQUINITI",
    "KAISA FINANCIAL GROUP COMPANY LIMITED"
  ]
}
```

**SDK 代码**

```python Response
import requests

url = "https://localhost:5000/gw/api/v1/enumerations/complex-asset-transfer"

querystring = {"instructionType":"COMPLEX_ASSET_TRANSFER"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Response
const url = 'https://localhost:5000/gw/api/v1/enumerations/complex-asset-transfer?instructionType=COMPLEX_ASSET_TRANSFER';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Response
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/enumerations/complex-asset-transfer?instructionType=COMPLEX_ASSET_TRANSFER"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Response
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/enumerations/complex-asset-transfer?instructionType=COMPLEX_ASSET_TRANSFER")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Response
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/enumerations/complex-asset-transfer?instructionType=COMPLEX_ASSET_TRANSFER")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Response
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/enumerations/complex-asset-transfer?instructionType=COMPLEX_ASSET_TRANSFER', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Response
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/enumerations/complex-asset-transfer?instructionType=COMPLEX_ASSET_TRANSFER");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Response
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/enumerations/complex-asset-transfer?instructionType=COMPLEX_ASSET_TRANSFER")! as URL,
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