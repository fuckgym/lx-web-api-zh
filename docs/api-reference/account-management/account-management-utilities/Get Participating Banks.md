# 获取参与银行

GET https://localhost:5000/gw/api/v1/participating-banks

获取支持与 Interactive Brokers 建立银行连接的银行列表。**作用域**: `enumerations.read`**安全策略**: `HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/list-participating-banks

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

- `type` (string, required) — 用于获取参与银行列表的参数

## 响应

### 200

返回参与银行列表。

- `type` (string, required) — 参与银行列表适用的方案/指令类型。
- `participatingBanks` (list of GetParticipatingListResponseParticipatingBanksItems, required) — 参与银行列表。

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

## 类型

### GetParticipatingListResponseParticipatingBanksItems

- `institutionName` (string, required) — 机构名称。
- `clearingCode` (string, required) — 机构的清算代码。
- `BIC` (string, required) — 机构的 BIC/SWIFT 代码。

## 示例

**响应**

```json
{
  "type": "eDDA",
  "participatingBanks": [
    {
      "institutionName": "WELAB BANK LIMITED",
      "clearingCode": "390",
      "BIC": "WEDIHKHHXXX"
    },
    {
      "institutionName": "INDUSTRIAL AND COMMERCIAL BANK OF CHINA (ASIA) LIMITED",
      "clearingCode": "072",
      "BIC": "UBHKHKHHXXX"
    },
    {
      "institutionName": "FUSION BANK LIMITED",
      "clearingCode": "391",
      "BIC": "IFFUHKHHXXX"
    },
    {
      "institutionName": "CITIBANK (HONG KONG) LIMITED",
      "clearingCode": "250",
      "BIC": "CITIHKAXXXX"
    }
  ]
}
```

**SDK 代码**

```python Participating Banks
import requests

url = "https://localhost:5000/gw/api/v1/participating-banks"

querystring = {"type":"eDDA"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript Participating Banks
const url = 'https://localhost:5000/gw/api/v1/participating-banks?type=eDDA';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Participating Banks
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/participating-banks?type=eDDA"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Participating Banks
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/gw/api/v1/participating-banks?type=eDDA")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Participating Banks
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/participating-banks?type=eDDA")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Participating Banks
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/participating-banks?type=eDDA', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Participating Banks
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/participating-banks?type=eDDA");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Participating Banks
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/participating-banks?type=eDDA")! as URL,
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