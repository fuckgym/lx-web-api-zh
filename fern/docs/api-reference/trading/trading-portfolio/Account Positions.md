# 账户持仓

GET https://localhost:5000/v1/api/portfolio/{accountId}/positions/{pageId}

获取账户中的所有持仓。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-portfolio/get-paginated-positions

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 请求

### 路径参数

- `accountId` (string, required)
- `pageId` (long, required)

### 查询参数

- `model` (string, optional)
- `sort` (any, optional)
- `direction` (any, optional)
- `waitForSecDef` (boolean, optional)

## 响应

### 200

持仓

- `list of individualPosition`

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

## 类型

### individualPosition

特定账户在所请求 conid 上的持仓。

- `acctId` (string, optional) — 在所请求 conid 上持有持仓的账户的 IB accountId。
- `allExchanges` (string, optional) — 该金融工具进行交易的所有交易所，以逗号分隔。
- `assetClass` (string, optional) — 所请求金融工具的资产类别。
- `avgCost` (double, optional) — 账户持仓的平均成本。
- `avgPrice` (double, optional) — 账户持仓的平均价格。
- `baseAvgCost` (double, optional) — 以账户基础货币计的平均成本。
- `baseAvgPrice` (double, optional) — 以账户基础货币计的平均价格。
- `baseMktPrice` (double, optional) — 以账户基础货币计的金融工具市场价格。
- `baseMktValue` (double, optional) — 以账户基础货币计的持仓市值。
- `baseRealizedPnl` (double, optional) — 以账户基础货币计的该金融工具的已实现 PnL。
- `baseUnrealizedPnl` (double, optional) — 以账户基础货币计的该金融工具的未实现 PnL。
- `chineseName` (string, optional) — 该金融工具的中文名称。
- `conExchMap` (list of any, optional)
- `conid` (long, optional) — 该金融工具的 IB 合约 ID。
- `contractDesc` (string, optional) — 该金融工具的人类可读描述。
- `countryCode` (string, optional) — 发行该金融工具的国家。
- `currency` (string, optional) — 该金融工具的交易币种。
- `displayRule` (IndividualPositionDisplayRule, optional) — 定义显示该金融工具市场数据时所用的最小增量的对象。
- `exchs` (IndividualPositionExchs, optional, nullable)
- `exerciseStyle` (string, optional, nullable) — 期权的行权方式。
- `expiry` (string, optional, nullable) — 金融工具的到期日（如适用）。
- `fullName` (string, optional) — 该金融工具的完整显示名称。
- `group` (string, optional) — 该金融工具的行业子分类。
- `hasOptions` (boolean, optional) — 指示该金融工具在 IB 是否有可供交易的期权合约。
- `incrementRules` (list of IndividualPositionIncrementRulesItems, optional) — 包含为该金融工具的订单定价时所使用增量规则的数组。
- `isEventContract` (boolean, optional) — 指示该金融工具是否为事件合约（Event Contract）。
- `isUS` (boolean, optional) — 指示该金融工具是否在美国发行。
- `lastTradingDay` (string, optional) — 该金融工具的最后一个交易日（如适用）。格式为 `YYYYMMDD`。
- `listingExchange` (string, optional) — 该金融工具的上市交易所，或 IB 为该金融工具认可的主要交易所。
- `mktPrice` (double, optional) — 该金融工具的当前市场价格，以该金融工具的币种计。
- `mktValue` (double, optional) — 账户在该金融工具上持仓的当前市值，以该金融工具的币种计。
- `model` (string, optional) — 账户所投资的、贡献该持仓的模型投资组合的名称。
- `multiplier` (double, optional) — 该金融工具的乘数（如适用）。
- `name` (string, optional) — 该金融工具所关联实体或资产的正式名称。
- `pageSize` (long, optional) — 单个请求可返回的最大账户数量。
- `position` (double, optional) — 以金融工具单位计的持仓规模。
- `putOrCall` (enum, optional) — 期权合约的权利类型（如适用）。
  - Allowed values: `P`, `C`
- `realizedPnl` (double, optional) — 以该金融工具币种计的该金融工具的已实现 PnL。
- `sector` (string, optional) — 该金融工具的行业板块分类。
- `sectorGroup` (string, optional) — 该金融工具的行业子分类。
- `strike` (string, optional) — 行权价（如适用）。以字符串形式返回。
- `ticker` (string, optional) — 与该金融工具关联的代码。
- `time` (long, optional) — 检索持仓数据所耗费的时间（毫秒）。
- `type` (string, optional) — 该金融工具的描述，用于区分类别（如适用）。
- `undConid` (long, optional) — 标的金融工具的合约 ID（如适用）。
- `unrealizedPnl` (double, optional) — 账户中该金融工具的未实现 PnL。

### IndividualPositionDisplayRule

定义显示该金融工具市场数据时所用的最小增量的对象。

- `displayRuleStep` (list of IndividualPositionDisplayRuleDisplayRuleStepItems, optional) — 包含与显示规则增量相对应对象的数组。
- `magnification` (long, optional) — 应用于价格的放大倍数（如适用）。

### IndividualPositionExchs

### IndividualPositionIncrementRulesItems

描述单个增量规则的对象。

- `increment` (double, optional) — 价格增量。
- `lowerEdge` (double, optional) — 价格增量规则自此下界起生效。

### IndividualPositionDisplayRuleDisplayRuleStepItems

单个显示规则增量。

- `decimalDigits` (long, optional) — 要显示的小数位数。
- `lowerEdge` (double, optional) — 显示规则自此下界起生效。
- `wholeDigits` (long, optional) — 要显示的整数位数。

## 示例

**响应**

```json
[
  {
    "acctId": "DU123456",
    "allExchanges": "PAXOS",
    "assetClass": "CRYPTO",
    "avgCost": 27608.34921045,
    "avgPrice": 27608.34921045,
    "chineseName": "&#x7F8E;&#x5143;",
    "conExchMap": [],
    "conid": 479624278,
    "contractDesc": "BTC CRYPTO",
    "countryCode": "US",
    "currency": "USD",
    "displayRule": {
      "displayRuleStep": [
        {
          "decimalDigits": 2,
          "lowerEdge": 0,
          "wholeDigits": 4
        }
      ],
      "magnification": 0
    },
    "exchs": null,
    "exerciseStyle": null,
    "expiry": null,
    "fullName": "BTC",
    "hasOptions": false,
    "incrementRules": [
      {
        "increment": 0.25,
        "lowerEdge": 0
      }
    ],
    "isEventContract": false,
    "listingExchange": "PAXOS",
    "mktPrice": 69814.3984375,
    "mktValue": 255.4,
    "model": "",
    "multiplier": 0,
    "name": "Bitcoin cryptocurrency",
    "pageSize": 100,
    "position": 0.00365831,
    "realizedPnl": 0,
    "strike": "0",
    "ticker": "BTC",
    "time": 6,
    "type": "",
    "undConid": 0,
    "unrealizedPnl": 154.4
  },
  {
    "acctId": "DU123456",
    "allExchanges": "AMEX,CBOE,PHLX,PSE,ISE,BOX,BATS,NASDAQOM,CBOE2,NASDAQBX,MIAX,GEMINI,EDGX,MERCURY,PEARL,EMERALD,MEMX,WALLBETH,IBUSOPT",
    "assetClass": "OPT",
    "avgCost": 5801.0401,
    "avgPrice": 58.010401,
    "chineseName": "SPDR&#x6807;&#x666E;500 ETF&#x4FE1;&#x6258;",
    "conExchMap": [],
    "conid": 584891614,
    "contractDesc": "SPY    JAN2025 440 C [SPY   250117C00440000 100]",
    "countryCode": "US",
    "currency": "USD",
    "displayRule": {
      "displayRuleStep": [
        {
          "decimalDigits": 2,
          "lowerEdge": 0,
          "wholeDigits": 4
        }
      ],
      "magnification": 0
    },
    "exchs": null,
    "exerciseStyle": null,
    "expiry": "20250117",
    "fullName": "SPY Jan17'25 440 Call",
    "hasOptions": false,
    "incrementRules": [
      {
        "increment": 0.01,
        "lowerEdge": 0
      }
    ],
    "isEventContract": false,
    "isUS": true,
    "lastTradingDay": "20250117",
    "listingExchange": "AMEX",
    "mktPrice": 95.70706175,
    "mktValue": 9570.71,
    "model": "",
    "multiplier": 100,
    "name": "SPDR S&P 500 ETF TRUST",
    "pageSize": 100,
    "position": 1,
    "putOrCall": "C",
    "realizedPnl": 0,
    "strike": "440",
    "ticker": "SPY",
    "time": 26,
    "type": "",
    "undConid": 756733,
    "unrealizedPnl": 3769.67,
    "crossCurrency": false,
    "undComp": "SPDR S&P 500 ETF TRUST",
    "undSym": "SPY"
  },
  {
    "acctId": "DU123456",
    "allExchanges": "AMEX,NYSE,CBOE,PHLX,CHX,ARCA,ISLAND,ISE,IDEAL,NASDAQQ,REALNYSE,DRCTEDGE,BEX,BATS,NITEECN,EDGEA,CSFBALGO,PSX,BYX,ITG,PDQ,IBKRATS,NYSEFLOOR,CITADEL,NYSEDARK,MIAX,IBDARK,CITADELDP,NASDDARK,IEX,WEDBUSH,SUMMER,WINSLOW,FINRA,LIQITG,UBSDARK,BTIG,VIRTU,JEFF,OPCO,COWEN,DBK,JPMC,EDGX,JANE,NEEDHAM,FRACSHARE,RBCALGO,VIRTUDP,BAYCREST,FOXRIVER,MND,NITEEXST,PEARL,GSDARK,NITERTL,NYSENAT,IEXMID,HRT,FLOWTRADE,HRTDP,JANELP,PEAK6,CTDLZERO,HRTMID,JANEZERO,HRTEXST,IMCLP,LTSE,SOCGENDP,MEMX,INTELCROS,VIRTUBYIN,JUMPTRADE,NITEZERO,TPLUS1,XTXEXST,XTXDP,XTXMID,COWENLP,BARCDP,JUMPLP,OLDMCLP,RBCCMALP,WALLBETH,IBEOS,JONES,GSLP,BLUEOCEAN,USIBSILP,OVERNIGHT,JANEMID,IBATSEOS,HRTZERO,VIRTUALGO,G1XLP,VIRTUMID,GLOBALXLP,CTDLMID,TPLUS0",
    "assetClass": "STK",
    "avgCost": 144.46141,
    "avgPrice": 144.46141,
    "chineseName": "&#x56FD;&#x9645;&#x5546;&#x4E1A;&#x673A;&#x5668;",
    "conExchMap": [],
    "conid": 8314,
    "contractDesc": "IBM",
    "countryCode": "US",
    "currency": "USD",
    "displayRule": {
      "displayRuleStep": [
        {
          "decimalDigits": 2,
          "lowerEdge": 0,
          "wholeDigits": 4
        }
      ],
      "magnification": 0
    },
    "exchs": null,
    "exerciseStyle": null,
    "expiry": null,
    "fullName": "IBM",
    "group": "Computers",
    "hasOptions": true,
    "incrementRules": [
      {
        "increment": 0.01,
        "lowerEdge": 0
      }
    ],
    "isEventContract": false,
    "isUS": true,
    "listingExchange": "NYSE",
    "mktPrice": 185.17599485,
    "mktValue": 261468.5,
    "model": "",
    "multiplier": 0,
    "name": "INTL BUSINESS MACHINES CORP",
    "pageSize": 100,
    "position": 1412,
    "realizedPnl": 0,
    "sector": "Technology",
    "sectorGroup": "Computer Services",
    "strike": "0",
    "ticker": "IBM",
    "time": 38,
    "type": "COMMON",
    "undConid": 0,
    "unrealizedPnl": 57488.99
  }
]
```

**SDK 代码**

```python positions
import requests

url = "https://localhost:5000/v1/api/portfolio/DU123456/positions/1"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript positions
const url = 'https://localhost:5000/v1/api/portfolio/DU123456/positions/1';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go positions
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/portfolio/DU123456/positions/1"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby positions
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/portfolio/DU123456/positions/1")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java positions
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/portfolio/DU123456/positions/1")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php positions
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/portfolio/DU123456/positions/1', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp positions
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/portfolio/DU123456/positions/1");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift positions
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/portfolio/DU123456/positions/1")! as URL,
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