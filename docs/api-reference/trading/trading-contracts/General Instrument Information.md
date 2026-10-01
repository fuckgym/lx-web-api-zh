# 金融工具通用信息

GET https://localhost:5000/v1/api/iserver/contract/{conid}/info

请求给定 conid 的完整合约详情。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-instrument-info

## 认证

- `Authorization` 请求头（bearer token，required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 路径参数

- `conid` (string, required)

## 响应

### 200

返回所传入合约的详细信息。

- `cfi_code` (string, optional) — 金融工具分类（CFI）代码
- `symbol` (string, optional) — 标的代码
- `cusip` (string, optional, nullable) — 返回给定金融工具的 CUSIP。仅用于 BOND 交易。
- `expiry_full` (string, optional) — 返回合约的到期月份。
- `con_id` (long, optional) — 表示给定合约的合约标识符。
- `maturity_date` (string, optional) — 表示给定合约的最终到期日。
- `industry` (string, optional) — 特定的公司或行业群体。
- `instrument_type` (string, optional) — 金融工具的资产类别。
- `trading_class` (string, optional) — 合约指定的交易类别。
- `valid_exchanges` (string, optional) — 以逗号分隔的受支持交易所或交易场所列表。
- `allow_sell_long` (boolean, optional) — 允许卖出您持有的股份。
- `is_zero_commission_security` (boolean, optional) — 表示该合约是否支持零佣金交易。
- `local_symbol` (string, optional) — 合约在主交易所的代码。对期权而言是 OCC 代码。
- `contract_clarification_type` (string, optional)
- `classifier` (string, optional)
- `currency` (string, optional) — 合约交易所用的基础货币。
- `text` (string, optional) — 表示合约的显示名称，与 Client Portal 中显示的一致。
- `underlying_con_id` (long, optional) — 所请求合约的标的合约标识符。
- `r_t_h` (boolean, optional) — 表示该合约能否在常规交易时间之外交易。
- `multiplier` (string, optional) — 表示合约的乘数。
- `underlying_issuer` (string, optional) — 表示标的的发行人。
- `contract_month` (string, optional) — 表示合约到期的年份和月份。
- `company_name` (string, optional) — 表示公司或指数的名称。
- `smart_available` (boolean, optional) — 表示该合约能否进行智能路由。
- `exchange` (string, optional) — 表示可交易该合约的主交易所。
- `category` (string, optional) — 表示该金融工具的行业类别。

## 错误

### 401 未授权错误

授权令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

服务器内部错误，在无法处理传入请求时返回。有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，且只能在处理请求的后续阶段才能检测出来。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 示例

### stk-contract-info

**响应**

```json
{
  "cfi_code": "",
  "symbol": "IBM",
  "cusip": null,
  "con_id": 8314,
  "industry": "Computers",
  "instrument_type": "STK",
  "trading_class": "IBM",
  "valid_exchanges": "SMART,AMEX,NYSE,CBOE,PHLX,ISE,CHX,ARCA,NASDAQ,DRCTEDGE,BEX,BATS,EDGEA,BYX,NYSEDARK,NASDDARK,IEX,EDGX,FOXRIVER,PEARL,NYSENAT,IEXMID,JANELP,IMCLP,LTSE,MEMX,JUMPLP,OLDMCLP,RBCCMALP,IBEOS,GSLP,BLUEOCEAN,OVERNIGHT,JANEMID,G1XLP,PSX",
  "allow_sell_long": false,
  "is_zero_commission_security": false,
  "local_symbol": "IBM",
  "currency": "USD",
  "underlying_con_id": 0,
  "r_t_h": true,
  "company_name": "INTL BUSINESS MACHINES CORP",
  "smart_available": true,
  "exchange": "SMART",
  "category": "Computer Services"
}
```

**SDK 代码**

```python stk-contract-info
import requests

url = "https://localhost:5000/v1/api/iserver/contract/265598/info"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript stk-contract-info
const url = 'https://localhost:5000/v1/api/iserver/contract/265598/info';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go stk-contract-info
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/contract/265598/info"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby stk-contract-info
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/contract/265598/info")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java stk-contract-info
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/contract/265598/info")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php stk-contract-info
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/contract/265598/info', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp stk-contract-info
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/contract/265598/info");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift stk-contract-info
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/contract/265598/info")! as URL,
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

### opt-contract-info

**响应**

```json
{
  "cfi_code": "OCXXXS",
  "symbol": "IBM",
  "cusip": null,
  "expiry_full": "20240315",
  "con_id": 685302909,
  "maturity_date": "20240315",
  "instrument_type": "OPT",
  "trading_class": "IBM",
  "valid_exchanges": "SMART,AMEX,CBOE,PHLX,PSE,ISE,BOX,BATS,NASDAQOM,CBOE2,NASDAQBX,MIAX,GEMINI,EDGX,MERCURY,PEARL,EMERALD,MEMX,IBUSOPT",
  "allow_sell_long": false,
  "is_zero_commission_security": false,
  "local_symbol": "IBM   240315C00187500",
  "currency": "USD",
  "text": "MAR 15 '24 187.5 Call",
  "underlying_con_id": 8314,
  "r_t_h": false,
  "multiplier": "100",
  "contract_month": "202403",
  "company_name": "INTL BUSINESS MACHINES CORP",
  "smart_available": true,
  "exchange": "SMART",
  "right": "CALL",
  "strike": "187.5"
}
```

**SDK 代码**

```python opt-contract-info
import requests

url = "https://localhost:5000/v1/api/iserver/contract/265598/info"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript opt-contract-info
const url = 'https://localhost:5000/v1/api/iserver/contract/265598/info';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go opt-contract-info
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/contract/265598/info"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby opt-contract-info
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/contract/265598/info")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java opt-contract-info
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/contract/265598/info")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php opt-contract-info
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/contract/265598/info', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp opt-contract-info
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/contract/265598/info");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift opt-contract-info
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/contract/265598/info")! as URL,
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