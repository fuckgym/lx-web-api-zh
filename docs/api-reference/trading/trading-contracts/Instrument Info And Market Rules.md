# 金融工具信息与市场规则

GET https://localhost:5000/v1/api/iserver/contract/{conid}/info-and-rules

请求给定 conid 的完整合约详情与交易规则。后续请求将提供更多交易规则。


参考： https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-info-and-rules

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway，默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 路径参数

- `conid` (string, required)

## 响应

### 200

返回该合约的所有合约信息与交易规则。

- `cfi_code` (string, optional) — 金融工具分类（Classification of Financial Instrument）代码
- `symbol` (string, optional) — 标的代码
- `cusip` (string, optional, nullable) — 返回给定金融工具的 CUSIP。仅用于 BOND 交易。
- `expiry_full` (string, optional) — 返回合约的到期月份。
- `con_id` (long, optional) — 指示给定合约的合约标识符。
- `maturity_date` (string, optional) — 指示给定合约的最终到期日。
- `industry` (string, optional) — 特定的公司或行业群体。
- `instrument_type` (string, optional) — 该金融工具的资产类别。
- `trading_class` (string, optional) — 合约指定的交易类别。
- `valid_exchanges` (string, optional) — 以逗号分隔的受支持交易所或交易场所列表。
- `allow_sell_long` (boolean, optional) — 允许卖出您持有的股份。
- `is_zero_commission_security` (boolean, optional) — 指示该合约是否支持零佣金交易。
- `local_symbol` (string, optional) — 合约在主交易所的代码。对于期权，即 OCC 代码。
- `contract_clarification_type` (string, optional)
- `classifier` (string, optional)
- `currency` (string, optional) — 合约交易所用的基础货币。
- `text` (string, optional) — 指示合约的显示名称，与 Client Portal 中显示的一致。
- `underlying_con_id` (long, optional) — 所请求合约的标的合约标识符。
- `r_t_h` (boolean, optional) — 指示该合约能否在常规交易时间之外交易。
- `multiplier` (string, optional) — 指示合约的乘数。
- `underlying_issuer` (string, optional) — 指示标的的发行人。
- `contract_month` (string, optional) — 指示合约到期的年份和月份。
- `company_name` (string, optional) — 指示公司或指数的名称。
- `smart_available` (boolean, optional) — 指示该合约是否支持智能路由。
- `exchange` (string, optional) — 指示该合约可交易的主交易所。
- `category` (string, optional) — 指示该金融工具的行业类别。
- `rules` (contractRules, optional) — 详细的合约信息

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

服务器内部错误，当传入的请求无法被处理时返回。有时可能包含部分错误请求的情形。例如，传入的 accountId 错误，而只能在处理请求的后续阶段才被发现。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态码

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 类型

### contractRules

详细的合约信息

- `algoEligible` (boolean, optional) — 指示该合约能否使用算法订单交易。
- `allOrNoneEligible` (boolean, optional) — 指示给定合约是否支持全有或全无（All or None）选项。
- `costReport` (boolean, optional) — 指示是否已请求成本报告（仅限 Client Portal）。
- `canTradeAcctIds` (list of string, optional) — 指示允许交易该合约的账户 ID（accountIDs）。
- `error` (string, optional, nullable) — 如果因任何原因无法获取规则信息，将在此处说明。
- `orderTypes` (list of enum, optional) — 指示标准数量交易可使用的订单类型。
  - Allowed values: `limit`, `midprice`, `market`, `stop`, `stop_limit`, `mit`, `lit`, `trailing_stop`, `trailing_stop_limit`, `relative`, `marketonclose`, `limitonclose`
- `ibAlgoTypes` (list of enum, optional) — 指示给定合约可使用的算法类型。
  - Allowed values: `limit`, `stop_limit`, `lit`, `trailing_stop_limit`, `relative`, `marketonclose`, `limitonclose`
- `fraqTypes` (list of enum, optional) — 指示零股（fractional）交易可使用的订单类型。
  - Allowed values: `limit`, `market`, `stop`, `stop_limit`, `mit`, `lit`, `trailing_stop`, `trailing_stop_limit`
- `forceOrderPreview` (boolean, optional) — 指示提交前是否强制用户进行订单预览。
- `cqtTypes` (list of enum, optional) — 指示现金数量（cash quantity）订单可接受的订单类型。
  - Allowed values: `limit`, `market`, `stop`, `stop_limit`, `mit`, `lit`, `trailing_stop`, `trailing_stop_limit`
- `orderDefaults` (ContractRulesOrderDefaults, optional) — 指示给定证券类型的默认订单类型。
- `orderTypesOutside` (list of enum, optional) — 指示常规交易时间之外可使用的订单类型。
  - Allowed values: `limit`, `stop_limit`, `lit`, `trailing_stop_limit`, `relative`
- `defaultSize` (long, optional) — 订单的默认总数量值。
- `cashSize` (long, optional) — 默认现金价值数量。
- `sizeIncrement` (long, optional) — 指示该合约的数量递增步长。
- `tifTypes` (list of string, optional) — 指示该合约支持的 TIF 类型。
- `tifDefaults` (ContractRulesTifDefaults, optional) — 包含您的 TIF 默认值详情的对象。这些默认值可在 TWS 的全局配置（Global Configuration）中查看和修改。
- `limitPrice` (double, optional) — 给定合约的默认限价。
- `stopPrice` (double, optional) — 给定合约的默认止损价。
- `orderOrigination` (string, optional, nullable) — 美国证券期权与期权清算公司（Options Clearing Corporation）的订单来源标识
- `preview` (boolean, optional) — 指示是否必须进行订单预览（仅限 Client Portal）
- `displaySize` (long, optional, nullable) — 该金融工具的标准显示增量规则。
- `fraqInt` (long, optional) — 指示零股订单数量的小数位数。
- `cashCcy` (string, optional) — 指示该金融工具的基础货币。
- `cashQtyIncr` (long, optional) — 指示现金数量的增量规则。
- `priceMagnifier` (long, optional, nullable) — 表示给定合约的放大系数。它与价格乘数不同，通常返回 'null'
- `negativeCapable` (boolean, optional) — 指示合约价值是否可以为负（true）或始终为正（false）。
- `incrementType` (long, optional) — 指示增量样式的类型。
- `incrementRules` (list of ContractRulesIncrementRulesItems, optional) — 指示增量规则的值，包括 lowerEdge 和增量值。
- `hasSecondary` (boolean, optional)
- `modTypes` (list of any, optional) — 列出修改订单时支持的可用订单类型。
- `increment` (double, optional) — 价格的最小增量值
- `incrementDigits` (long, optional) — 表示增量值的小数位数。

### ContractRulesOrderDefaults

指示给定证券类型的默认订单类型。

- `LMT` (ContractRulesOrderDefaultsLmt, optional)

### ContractRulesTifDefaults

包含您的 TIF 默认值详情的对象。这些默认值可在 TWS 的全局配置（Global Configuration）中查看和修改。

- `TIF` (string, optional) — 订单的默认 TIF 类型。
- `SIZE` (string, optional) — 订单的默认数量值。
- `DEFAULT_ACCT` (string, optional) — 默认账户（仅限多账户）
- `PMALGO` (boolean, optional)

### ContractRulesIncrementRulesItems

- `lowerEdge` (long, optional) — 如果该金融工具的当前标记价格达到或高于下边界，则订单价格使用给定的增量值。
- `increment` (long, optional) — 该金融工具的价格必须以增量值的倍数提交。

### ContractRulesOrderDefaultsLmt

- `LP` (string, optional) — 指示限价（Limit Price）默认值。

## 示例

### stk

**响应**

```json
{
  "cfi_code": "",
  "symbol": "IBM",
  "cusip": null,
  "expiry_full": null,
  "con_id": 8314,
  "maturity_date": null,
  "industry": "Computers",
  "instrument_type": "STK",
  "trading_class": "IBM",
  "valid_exchanges": "SMART,AMEX,NYSE,CBOE,PHLX,ISE,CHX,ARCA,NASDAQ,DRCTEDGE,BEX,BATS,EDGEA,BYX,NYSEDARK,NASDDARK,IEX,EDGX,FOXRIVER,PEARL,NYSENAT,IEXMID,JANELP,IMCLP,LTSE,MEMX,JUMPLP,OLDMCLP,RBCCMALP,IBEOS,GSLP,BLUEOCEAN,OVERNIGHT,JANEMID,G1XLP,PSX",
  "allow_sell_long": false,
  "is_zero_commission_security": false,
  "local_symbol": "IBM",
  "contract_clarification_type": null,
  "classifier": null,
  "currency": "USD",
  "text": null,
  "underlying_con_id": 0,
  "r_t_h": true,
  "multiplier": null,
  "underlying_issuer": null,
  "contract_month": null,
  "company_name": "INTL BUSINESS MACHINES CORP",
  "smart_available": true,
  "exchange": "SMART",
  "category": "Computer Services",
  "rules": {
    "algoEligible": true,
    "costReport": false,
    "canTradeAcctIds": [
      "DUC10000"
    ],
    "error": null,
    "orderTypes": [
      "limit",
      "midprice",
      "market",
      "stop",
      "stop_limit",
      "mit",
      "lit",
      "trailing_stop",
      "trailing_stop_limit",
      "relative",
      "marketonclose",
      "limitonclose"
    ],
    "ibAlgoTypes": [
      "limit",
      "stop_limit",
      "lit",
      "trailing_stop_limit",
      "relative",
      "marketonclose",
      "limitonclose"
    ],
    "fraqTypes": [
      "limit",
      "market",
      "stop",
      "stop_limit",
      "mit",
      "lit",
      "trailing_stop",
      "trailing_stop_limit"
    ],
    "forceOrderPreview": false,
    "cqtTypes": [
      "limit",
      "market",
      "stop",
      "stop_limit",
      "mit",
      "lit",
      "trailing_stop",
      "trailing_stop_limit"
    ],
    "orderDefaults": {
      "MKT": {}
    },
    "orderTypesOutside": [
      "limit",
      "stop_limit",
      "lit",
      "trailing_stop_limit",
      "relative"
    ],
    "defaultSize": 100,
    "cashSize": 0,
    "sizeIncrement": 100,
    "tifTypes": [
      "IOC/MARKET,LIMIT,RELATIVE,MARKETONCLOSE,MIDPRICE,LIMITONCLOSE,MKT_PROTECT,STPPRT,a",
      "GTC/o,a",
      "OPG/LIMIT,MARKET,a",
      "GTD/o,a",
      "DAY/o,a"
    ],
    "tifDefaults": {
      "TIF": "DAY",
      "SIZE": "100.00"
    },
    "limitPrice": 196.88,
    "orderOrigination": null,
    "preview": true,
    "displaySize": null,
    "fraqInt": 4,
    "cashCcy": "USD",
    "cashQtyIncr": 500,
    "priceMagnifier": null,
    "negativeCapable": false,
    "incrementType": 1,
    "incrementRules": [
      {
        "lowerEdge": 0,
        "increment": 1
      }
    ],
    "hasSecondary": true,
    "increment": 0.01,
    "incrementDigits": 2,
    "overnightEligible": true,
    "stopprice": 196.88
  }
}
```

**SDK 代码**

```python stk
import requests

url = "https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript stk
const url = 'https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go stk
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby stk
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java stk
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php stk
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp stk
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift stk
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules")! as URL,
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

### option

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
  "contract_clarification_type": null,
  "classifier": null,
  "currency": "USD",
  "text": "MAR 15 '24 187.5 Call",
  "underlying_con_id": 8314,
  "r_t_h": false,
  "multiplier": "100",
  "underlying_issuer": null,
  "contract_month": "202403",
  "company_name": "INTL BUSINESS MACHINES CORP",
  "smart_available": true,
  "exchange": "SMART",
  "rules": {
    "algoEligible": true,
    "costReport": false,
    "canTradeAcctIds": [
      "DUC10000"
    ],
    "error": null,
    "orderTypes": [
      "limit",
      "market",
      "stop",
      "stop_limit",
      "mit",
      "lit",
      "trailing_stop",
      "trailing_stop_limit",
      "relative"
    ],
    "ibAlgoTypes": [
      "limit",
      "stop_limit",
      "lit",
      "trailing_stop_limit",
      "relative"
    ],
    "fraqTypes": [],
    "forceOrderPreview": false,
    "cqtTypes": [],
    "orderDefaults": {
      "LMT": {
        "LP": "empty"
      }
    },
    "orderTypesOutside": [],
    "defaultSize": 1,
    "cashSize": 0,
    "sizeIncrement": 1,
    "tifTypes": [
      "IOC/MARKET,LIMIT,RELATIVE,MARKETONCLOSE,MIDPRICE,LIMITONCLOSE,MKT_PROTECT,STPPRT,a",
      "GTC/o,a",
      "GTD/o,a",
      "DAY/o,a"
    ],
    "tifDefaults": {
      "TIF": "DAY",
      "SIZE": "1.00"
    },
    "orderOrigination": null,
    "preview": true,
    "displaySize": null,
    "fraqInt": 0,
    "cashCcy": "USD",
    "priceMagnifier": null,
    "negativeCapable": false,
    "incrementType": 1,
    "incrementRules": [
      {
        "lowerEdge": 0,
        "increment": 1
      }
    ],
    "hasSecondary": true,
    "increment": 0.01,
    "incrementDigits": 2,
    "overnightEligible": false,
    "stopprice": null
  },
  "right": "CALL",
  "strike": "187.5"
}
```

**SDK 代码**

```python option
import requests

url = "https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript option
const url = 'https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go option
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby option
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java option
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php option
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp option
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift option
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/contract/265598/info-and-rules")! as URL,
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