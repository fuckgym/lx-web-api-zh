# 金融工具定义详情

GET https://localhost:5000/v1/api/trsrv/secdef

返回给定 conid 的证券定义列表。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-instrument-definition

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒环境）

## 请求

### 查询参数

- `conids` (string, required)

## 响应

### 200

成功的响应，包含合约的证券定义。

- `secdef` (list of TrsrvSecDefResponseSecdefItems, optional)

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

### 500 服务器内部错误

服务器内部错误，在传入请求无法被处理时返回。有时可能包含部分属于错误请求的情况。例如传入了错误的 accountId，只能在处理请求的过程中才能检测出来。错误信息包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，当由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### TrsrvSecDefResponseSecdefItems

- `conid` (long, optional) — 该 conID
- `currency` (string, optional) — 合约的交易货币。
- `time` (long, optional) — 生成数据所耗的时间（毫秒）。
- `chineseName` (string, optional) — 代码对应的中文名称。
- `allExchanges` (string, optional) — 给定代码可进行交易的一系列交易所。
- `listingExchange` (string, optional) — 合约所在的主要交易所或上市交易所。
- `countryCode` (string, optional) — 合约交易所在的国家/地区代码。
- `name` (string, optional) — 公司名称。
- `assetClass` (string, optional) — 合约的资产类别或证券类型。
- `expiry` (string, optional, nullable) — 合约的到期日。对于无到期日的金融工具返回 null。
- `lastTradingDay` (string, optional, nullable) — 合约的最后交易日。
- `group` (string, optional) — 合约所属的组别或行业。
- `putOrCall` (string, optional, nullable) — 看跌（Put）或看涨（Call）期权。
- `sector` (string, optional) — 合约所属的板块。
- `sectorGroup` (string, optional) — 板块所属的组别。
- `strike` (string, optional) — 合约的行权价。
- `ticker` (string, optional) — 所交易合约的股票代码。
- `undConid` (long, optional) — 合约的标的。
- `multiplier` (long, optional) — 合约乘数。
- `type` (string, optional) — 股票类型。
- `hasOptions` (boolean, optional) — 该合约拥有可交易的期权合约。
- `fullName` (string, optional) — 返回所请求合约的代码名称。
- `isUS` (boolean, optional) — 合约是否属于美国。
- `incrementRules` (list of TrsrvSecDefResponseSecdefItemsIncrementRulesItems, optional) — 指示增量规则的取值，包括 lowerEdge 和增量值。
- `displayRule` (list of TrsrvSecDefResponseSecdefItemsDisplayRuleItems, optional) — 返回有关下单价格增量的规则。并非对所有交易所都有效。更准确的规则详情请参见 /iserver/contract/rules。
- `isEventContract` (boolean, optional) — 合约是否为事件合约。
- `pageSize` (long, optional) — 返回请求的内容大小。

### TrsrvSecDefResponseSecdefItemsIncrementRulesItems

- `lowerEdge` (double, optional) — 如果金融工具的当前标记价格达到或高于下限（lowerEdge），则订单价格将使用给定的增量值。
- `increment` (double, optional) — 金融工具的价格必须以增量值的整数倍提交。

### TrsrvSecDefResponseSecdefItemsDisplayRuleItems

- `magnification` (long, optional) — 如果显示的合约信息基于给定的倍数进行放大，该值将在此处体现。
- `displayRuleStep` (list of TrsrvSecDefResponseSecdefItemsDisplayRuleItemsDisplayRuleStepItems, optional)

### TrsrvSecDefResponseSecdefItemsDisplayRuleItemsDisplayRuleStepItems

- `decimalDigits` (long, optional) — 显示小数点后使用的总位数。
- `lowerEdge` (double, optional) — 与增量规则对应的 lowerEdge 显示值。
- `wholeDigits` (long, optional) — 显示小数点前后有效的显示价格。

## 示例

**响应**

```json
{
  "secdef": [
    {
      "conid": 8314,
      "currency": "USD",
      "time": 770,
      "chineseName": "&#x56FD;&#x9645;&#x5546;&#x4E1A;&#x673A;&#x5668;",
      "allExchanges": "AMEX,NYSE,CBOE,PHLX,CHX,ARCA,ISLAND,ISE,IDEAL,NASDAQQ,REALNYSE,DRCTEDGE,BEX,BATS,NITEECN,EDGEA,CSFBALGO,PSX,BYX,ITG,PDQ,IBKRATS,NYSEFLOOR,CITADEL,NYSEDARK,MIAX,IBDARK,CITADELDP,NASDDARK,IEX,WEDBUSH,SUMMER,WINSLOW,FINRA,LIQITG,UBSDARK,BTIG,VIRTU,JEFF,OPCO,COWEN,DBK,JPMC,EDGX,JANE,NEEDHAM,FRACSHARE,RBCALGO,VIRTUDP,BAYCREST,FOXRIVER,MND,NITEEXST,PEARL,GSDARK,NITERTL,NYSENAT,IEXMID,HRT,FLOWTRADE,HRTDP,JANELP,PEAK6,CTDLZERO,HRTMID,JANEZERO,HRTEXST,IMCLP,LTSE,SOCGENDP,MEMX,INTELCROS,VIRTUBYIN,JUMPTRADE,NITEZERO,TPLUS1,XTXEXST,XTXDP,XTXMID,COWENLP,BARCDP,JUMPLP,OLDMCLP,RBCCMALP,WALLBETH,IBEOS,JONES,GSLP,BLUEOCEAN,USIBSILP,OVERNIGHT,JANEMID,IBATSEOS,HRTZERO,VIRTUALGO,G1XLP,VIRTUMID,GLOBALXLP,CTDLMID,TPLUS0",
      "listingExchange": "NYSE",
      "countryCode": "US",
      "name": "INTL BUSINESS MACHINES CORP",
      "assetClass": "STK",
      "expiry": null,
      "lastTradingDay": null,
      "group": "Computers",
      "putOrCall": null,
      "sector": "Technology",
      "sectorGroup": "Computer Services",
      "strike": "0",
      "ticker": "IBM",
      "undConid": 0,
      "multiplier": 0,
      "type": "COMMON",
      "hasOptions": true,
      "fullName": "IBM",
      "isUS": true,
      "incrementRules": [
        {
          "lowerEdge": 0,
          "increment": 0.01
        }
      ],
      "displayRule": [
        {
          "magnification": 0,
          "displayRuleStep": [
            {
              "decimalDigits": 2,
              "lowerEdge": 0,
              "wholeDigits": 4
            }
          ]
        }
      ],
      "isEventContract": false
    }
  ]
}
```

**SDK 代码**

```python response
import requests

url = "https://localhost:5000/v1/api/trsrv/secdef"

querystring = {"conids":"265598,8314"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript response
const url = 'https://localhost:5000/v1/api/trsrv/secdef?conids=265598%2C8314';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go response
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/trsrv/secdef?conids=265598%2C8314"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby response
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/trsrv/secdef?conids=265598%2C8314")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java response
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/trsrv/secdef?conids=265598%2C8314")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php response
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/trsrv/secdef?conids=265598%2C8314', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp response
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/trsrv/secdef?conids=265598%2C8314");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift response
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/trsrv/secdef?conids=265598%2C8314")! as URL,
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