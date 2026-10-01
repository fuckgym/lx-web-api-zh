# 按代码搜索股票

GET https://localhost:5000/v1/api/trsrv/stocks

返回一个对象，包含给定代码对应的所有股票合约

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-stock-by-symbol

## 认证

- `Authorization` 请求头（bearer token, required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 请求

### 查询参数

- `symbols` (string, required)

## 响应

### 200

成功的响应，包含合约的证券定义。

- `map from string to list of StocksItems`

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

### 500 内部服务器错误

内部服务器错误，在传入请求无法处理时返回。有时可能包含部分错误请求。例如，传入的 accountId 有误，而只能在处理请求的后期才被检测到。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，若因某个内部服务不可用导致请求耗时超过 10 秒，请求将被中止并返回此状态

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 类型

### StocksItems

为每个匹配请求的代码包含一系列对象

- `name` (string, optional) — 该合约对应公司的完整名称。
- `chineseName` (string, optional) — 该公司以 unicode 表示的中文名称。
- `assetClass` (string, optional) — 该公司的资产类别。
- `contracts` (list of StocksItemsContractsItems, optional) — 以 "name" 列出的属于同一家公司的一系列数组。通常根据主交易所的货币进行区分。

### StocksItemsContractsItems

- `conid` (long, optional) — 该特定合约的合约 ID。
- `exchange` (string, optional) — 该合约的主交易所。
- `isUS` (boolean, optional) — 说明该合约是否托管在美国。

## 示例

**响应**

```json
{
  "IBM": [
    {
      "name": "INTL BUSINESS MACHINES CORP",
      "chineseName": "&#x56FD;&#x9645;&#x5546;&#x4E1A;&#x673A;&#x5668;",
      "assetClass": "STK",
      "contracts": [
        {
          "conid": 8314,
          "exchange": "NYSE",
          "isUS": true
        },
        {
          "conid": 1411277,
          "exchange": "IBIS",
          "isUS": false
        },
        {
          "conid": 38709473,
          "exchange": "MEXI",
          "isUS": false
        },
        {
          "conid": 41645598,
          "exchange": "LSE",
          "isUS": false
        }
      ]
    },
    {
      "name": "INTL BUSINESS MACHINES C-CDR",
      "chineseName": "&#x56FD;&#x9645;&#x5546;&#x4E1A;&#x673A;&#x5668;",
      "assetClass": "STK",
      "contracts": [
        {
          "conid": 530091934,
          "exchange": "AEQLIT",
          "isUS": false
        }
      ]
    }
  ]
}
```

**SDK 代码**

```python ibm
import requests

url = "https://localhost:5000/v1/api/trsrv/stocks"

querystring = {"symbols":"AAPL,IBKR"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript ibm
const url = 'https://localhost:5000/v1/api/trsrv/stocks?symbols=AAPL%2CIBKR';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go ibm
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/trsrv/stocks?symbols=AAPL%2CIBKR"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby ibm
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/trsrv/stocks?symbols=AAPL%2CIBKR")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java ibm
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/trsrv/stocks?symbols=AAPL%2CIBKR")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php ibm
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/trsrv/stocks?symbols=AAPL%2CIBKR', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp ibm
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/trsrv/stocks?symbols=AAPL%2CIBKR");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift ibm
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/trsrv/stocks?symbols=AAPL%2CIBKR")! as URL,
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