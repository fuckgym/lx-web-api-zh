# 金融工具属性详情

GET https://localhost:5000/v1/api/iserver/secdef/info

返回金融工具的属性。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-contract-info

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 查询参数

- `conid` (string, optional)
- `sectype` (any, optional)
- `month` (any, optional)
- `exchange` (any, optional)
- `strike` (any, optional)
- `right` (enum, optional) — 为给定合约设置权利方向。 * `C` - 看涨期权（Call）。 * `P` - 看跌期权（Put）。
  - Allowed values: `C`, `P`
- `issuerId` (string, optional)
- `filters` (any, optional)

## 响应

### 200

成功的响应，包含给定合约的证券定义。

- `conid` (long, optional) — 给定合约的合约标识符（Contract Identifier）。
- `ticker` (string, optional) — 给定合约的股票代码
- `secType` (string, optional) — 给定合约的证券类型。
- `listingExchange` (string, optional) — 给定合约的主要上市交易所。
- `exchange` (string, optional) — 请求获取其数据的交易所。
- `companyName` (string, optional) — 给定合约的公司名称。
- `currency` (string, optional) — 给定合约允许交易的货币。
- `validExchanges` (string, optional) — 该合约可在其上交易的所有有效交易所，以单个逗号分隔的字符串形式表示。
- `priceRendering` (string, optional, nullable)
- `maturityDate` (string, optional, nullable) — 给定合约的到期日。
- `right` (enum, optional) — 为给定合约设置权利方向。 * `C` - 看涨期权（Call）。 * `P` - 看跌期权（Put）。
  - Allowed values: `P`, `C`
- `strike` (double, optional) — 返回给定合约的行权价。

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

内部服务器错误，当传入请求无法被处理时返回。有时可能包含部分错误请求的情况。例如，传入的 accountId 有误，而只有在处理请求的过程中才能检测到。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 示例

**响应**

```json
{
  "conid": 8314,
  "ticker": "IBM",
  "secType": "STK",
  "listingExchange": "NYSE",
  "exchange": "SMART",
  "companyName": "INTL BUSINESS MACHINES CORP",
  "currency": "USD",
  "validExchanges": "SMART,AMEX,NYSE,CBOE,PHLX,ISE,CHX,ARCA,NASDAQ,DRCTEDGE,BEX,BATS,EDGEA,BYX,NYSEDARK,NASDDARK,IEX,EDGX,FOXRIVER,PEARL,NYSENAT,IEXMID,JANELP,IMCLP,LTSE,MEMX,JUMPLP,OLDMCLP,RBCCMALP,IBEOS,GSLP,BLUEOCEAN,OVERNIGHT,JANEMID,G1XLP,PSX",
  "priceRendering": null,
  "maturityDate": null,
  "right": "P",
  "strike": 0
}
```

**SDK 代码**

```python infoBy-symbol-exchange-conid
import requests

url = "https://localhost:5000/v1/api/iserver/secdef/info"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript infoBy-symbol-exchange-conid
const url = 'https://localhost:5000/v1/api/iserver/secdef/info';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go infoBy-symbol-exchange-conid
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/secdef/info"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby infoBy-symbol-exchange-conid
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/secdef/info")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java infoBy-symbol-exchange-conid
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/secdef/info")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php infoBy-symbol-exchange-conid
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/secdef/info', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp infoBy-symbol-exchange-conid
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/secdef/info");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift infoBy-symbol-exchange-conid
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/secdef/info")! as URL,
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