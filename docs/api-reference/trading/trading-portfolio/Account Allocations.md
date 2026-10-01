# 账户分配

GET https://localhost:5000/v1/api/portfolio/{accountId}/allocation

按资产类别、行业组和行业获取账户的分配情况。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-portfolio/get-asset-allocation

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 路径参数

- `accountId` (string, required)

### 查询参数

- `model` (string, optional)

## 响应

### 200

包含分配信息的响应

- `assetClass` (PortfolioAllocationsAssetClass, optional) — 按多头/空头和资产类别排序的持仓价值对象。
- `group` (PortfolioAllocationsGroup, optional) — 按多头/空头和行业组排序的持仓价值对象。
- `sector` (PortfolioAllocationsSector, optional) — 按多头/空头和行业排序的持仓价值对象。

## 错误

### 400 错误请求

缺少、为空、非数值或超出范围的参数。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

缺少、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，在无法处理传入请求时返回。有时可能包含部分属于错误请求的情况。例如，传入的 accountId 有误，而只能在处理请求的后续阶段才检测出来。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，若因某些内部服务不可用导致请求耗时超过 10 秒，则请求会被中止并返回此状态码。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### PortfolioAllocationsAssetClass

按多头/空头和资产类别排序的持仓价值对象。

- `long` (map from string to double, optional) — 按资产类别汇总的账户多头持仓价值对象。
- `short` (map from string to double, optional) — 按资产类别汇总的账户空头持仓价值对象。

### PortfolioAllocationsGroup

按多头/空头和行业组排序的持仓价值对象。

- `long` (map from string to double, optional) — 按行业组汇总的账户多头持仓价值对象。
- `short` (map from string to double, optional) — 按行业组汇总的账户空头持仓价值对象。

### PortfolioAllocationsSector

按多头/空头和行业排序的持仓价值对象。

- `long` (map from string to double, optional) — 按行业汇总的账户多头持仓价值对象。
- `short` (map from string to double, optional) — 按行业汇总的账户空头持仓价值对象。

## 示例

**响应**

```json
{
  "assetClass": {
    "long": {
      "BOND": 380106.54,
      "CASH": 72425.68706744915,
      "CRYPTO": 255.17,
      "OPT": 44352.82,
      "STK": 1564447.6240790943
    },
    "short": {
      "CASH": -508096.16629793524,
      "OPT": -80.53,
      "STK": -103716.11109948158
    }
  },
  "group": {
    "long": {
      "Aerospace/Defense": 380106.54,
      "Auto Manufacturers": 18213.43337263364,
      "Banks": 366666.31,
      "Biotechnology": 49.72,
      "Computers": 279285.37,
      "Diversified Finan Serv": 45970.8,
      "Internet": 164576.99,
      "Others": 704313.8907064605,
      "Semiconductors": 371.9,
      "Software": 29607.2
    },
    "short": {
      "Auto Manufacturers": -11763,
      "Insurance": -4682.111099481583,
      "Internet": -189.53,
      "Semiconductors": -87162
    }
  },
  "sector": {
    "long": {
      "Communications": 164576.99,
      "Consumer, Cyclical": 18213.43337263364,
      "Consumer, Non-cyclical": 49.72,
      "Financial": 412637.11,
      "Industrial": 380106.54,
      "Others": 704313.8907064605,
      "Technology": 309264.47000000003
    },
    "short": {
      "Communications": -189.53,
      "Consumer, Cyclical": -11763,
      "Financial": -4682.111099481583,
      "Technology": -87162
    }
  }
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/portfolio/accountId/allocation"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/portfolio/accountId/allocation';
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

	url := "https://localhost:5000/v1/api/portfolio/accountId/allocation"

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

url = URI("https://localhost:5000/v1/api/portfolio/accountId/allocation")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/portfolio/accountId/allocation")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/portfolio/accountId/allocation', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/portfolio/accountId/allocation");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/portfolio/accountId/allocation")! as URL,
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