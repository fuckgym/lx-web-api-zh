# 实时市场数据快照

GET https://localhost:5000/v1/api/iserver/marketdata/snapshot

获取给定 conid(s) 的市场数据。在接收数据之前必须先进行预检请求。对于某些字段，可能需要一些时间才能收到信息。可通过 fields 参数请求的可用字段列表请参见响应字段。必须先调用 /iserver/accounts 端点，然后才能调用 /iserver/marketdata/snapshot。对于衍生品合约，必须先调用 /iserver/secdef/search 端点。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-market-data/get-md-snapshot

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway，默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒)

## 请求

### 查询参数

- `conids` (string, required)
- `fields` (string, optional) — 市场数据字段，将 tick id 枚举映射到其各自的值。可以提供以逗号分隔的一系列字段。一次最多可指定 50 个字段。 * `31` - 最新价（Last Price）。合约成交的最后一个价格。可能包含以下前缀之一：C - 前一交易日的收盘价。H - 交易已暂停。 * `55` - 代码（Symbol）。 * `58` - 文本（Text）。 * `70` - 最高价（High）。当日最高价 * `71` - 最低价（Low）。当日最低价 * `73` - 市值（Market Value）。您在该证券中持仓的当前市场价值。市值使用实时市场数据计算（即使未订阅市场数据）。 * `74` - 平均价格（Avg Price）。持仓的均价。 * `75` - 未实现盈亏（Unrealized PnL）。未实现的盈利或亏损。未实现盈亏使用实时市场数据计算（即使未订阅市场数据）。 * `76` - 格式化的持仓（Formatted position）。 * `77` - 格式化的未实现盈亏（Formatted Unrealized PnL）。 * `78` - 当日盈亏（Daily PnL）。自前一收盘以来的当日盈亏。当日盈亏使用实时市场数据计算（即使未订阅市场数据）。 * `79` - 已实现盈亏（Realized PnL）。已实现的盈利或亏损。已实现盈亏使用实时市场数据计算（即使未订阅市场数据）。 * `80` - 未实现盈亏百分比（Unrealized PnL %）。以百分比表示的未实现盈亏。 * `82` - 涨跌（Change）。最新价与前一交易日收盘价之间的差额 * `83` - 涨跌幅（Change %）。以百分比表示的最新价与前一交易日收盘价之间的差额。 * `84` - 买价（Bid Price）。该合约上出价最高的买价。 * `85` - 卖量（Ask Size）。以卖价挂出的合约或股份数量。适用于美股 * `86` - 卖价（Ask Price）。该合约上要价最低的卖价。 * `87` - 成交量（Volume）。当日成交量 * `88` - 买量（Bid Size）。以买价申报的合约或股份数量。适用于美股 * `201` - 权利类型（Right）。声明期权的权利类型，看涨（Call）或看跌（Put）。 * `6004` - 交易所（Exchange）。 * `6008` - Conid。IBKR 数据库中的合约标识符。 * `6070` - SecType。金融工具的资产类别。 * `6072` - 月份（Months）。 * `6073` - 常规到期日（Regular Expiry）。 * `6119` - 市场数据传输方式的标记（类似于请求 id）。 * `6457` - 标的 Conid。使用 /trsrv/secdef 获取有关该证券的更多信息。 * `6508` - 服务参数（Service Params）。 * `6509` - 市场数据可用性（Market Data Availability）。该字段可能包含三个字符。第一个字符定义：R = 实时（RealTime），D = 延迟（Delayed），Z = 冻结（Frozen），Y = 冻结延迟（Frozen Delayed），N = 未订阅（Not Subscribed），i - 不完整（incomplete），v - VDR 豁免（VDR Exempt，Vendor Display Rule 603c）。第二个字符定义：P = 快照（Snapshot），p = 合并（Consolidated）。第三个字符定义：B = 盘口（Book）。实时（RealTime）数据无延迟实时回传，需要市场数据订阅。延迟（Delayed）- 数据以 15-20 分钟的延迟回传。冻结（Frozen）- 市场收盘时最后记录的数据，实时回传。冻结延迟（Frozen Delayed）- 市场收盘时最后记录的数据，延迟回传。未订阅（Not Subscribed）- 用户没有所需的市场数据订阅，无法回传实时或延迟数据。快照（Snapshot）- 该合约可使用快照请求。合并（Consolidated）- 市场数据在多个交易所或交易场所间汇总。盘口（Book）- 该合约可提供盘口顶端数据。 * `7051` - 公司名称（Company name）。 * `7057` - 卖价交易所（Ask Exch）。显示提供 SMART 价格的交易所。A=AMEX, C=CBOE, I=ISE, X=PHLX, N=PSE, B=BOX, Q=NASDAQOM, Z=BATS, W=CBOE2, T=NASDAQBX, M=MIAX, H=GEMINI, E=EDGX, J=MERCURY * `7058` - 最新价交易所（Last Exch）。显示提供 SMART 价格的交易所。A=AMEX, C=CBOE, I=ISE, X=PHLX, N=PSE, B=BOX, Q=NASDAQOM, Z=BATS, W=CBOE2, T=NASDAQBX, M=MIAX, H=GEMINI, E=EDGX, J=MERCURY * `7059` - 最新价成交量（Last Size）。以最新价格成交的数量 * `7084` - 隐含波动率/历史波动率百分比（Implied Vol./Hist. Vol %）。隐含波动率与历史波动率之比，以百分比表示。 * `7085` - 当日看跌期权未平仓合约总数除以看涨期权未平仓合约数。仅可用于标的。 * `7086` - 认沽/认购成交量（Put/Call Volume）。当日看跌期权成交量/看涨期权成交量。 * `7087` - 历史波动率百分比（Hist. Vol. %）。30 天实时历史波动率。 * `7088` - 历史波动率收盘百分比（Hist. Vol. Close %）。显示基于前一收盘价的历史波动率。 * `7089` - 期权成交量（Opt. Volume）。期权成交量 * `7094` - Conid + 交易所（Conid + Exchange）。 * `7184` - canBeTraded。合约是否为可交易的金融工具。返回 1（true）或 0（false）。 * `7219` - 合约描述（Contract Description）。 * `7220` - 合约描述（Contract Description）。 * `7221` - 上市交易所（Listing Exchange）。 * `7280` - 行业（Industry）。显示标的公司可归入的行业类型。 * `7281` - 类别（Category）。在标的公司可归入的行业内显示更详细的描述层级。 * `7282` - 平均成交量（Average Volume）。90 天内的平均日成交量。 * `7283` - 期权隐含波动率百分比（Option Implied Vol. %）。对标的未来波动程度的预测。基于自当前交易日起三十个日历日后到期的市场波动率估计，并基于连续两个到期月份的期权价格。要查询特定期权行权价的隐含波动率百分比，请参考字段 7633。 * `7284` - 历史波动率百分比（Historical volatility %）。已弃用 * `7285` - 认沽/认购比率（Put/Call Ratio）。 * `7292` - 持仓成本（Cost Basis）。您在该证券中的当前持仓乘以平均价格和乘数。 * `7293` - 52 周最高价（52 Week High）。过去 52 周的最高价。 * `7294` - 52 周最低价（52 Week Low）。过去 52 周的最低价。 * `7295` - 开盘价（Open）。今日开盘价。 * `7296` - 收盘价（Close）。今日收盘价。 * `7308` - Delta。期权价格变动与标的价格相应变动之比。 * `7309` - Gamma。Delta 相对于标的资产价格的变化率。 * `7310` - Theta。衡量期权价值随时间流逝而下降的速率。 * `7311` - Vega。波动率每变动 1% 时期权价格的变动量。 * `7607` - 期权成交量变化百分比（Opt. Volume Change %）。今日期权成交量占平均期权成交量的百分比。 * `7633` - 隐含波动率百分比（Implied Vol. %）。期权特定期权行权价的隐含波动率，以百分比表示。要从标的角度查询期权隐含波动率百分比，请参考字段 7283。 * `7635` - 标记价格（Mark）。标记价格是 * `7636` - 可卖空股数（Shortable Shares）。可用于卖空的股份数量。 * `7637` - 费率（Fee Rate）。对借入股份收取的利率。 * `7638` - 期权未平仓合约量（Option Open Interest）。适用于标的和衍生品。 * `7639` - 标记价值百分比（% of Mark Value）。以账户总市值的百分比显示该合约的市值。标记价值使用实时市场数据计算（即使未订阅市场数据）。 * `7644` - 可卖空（Shortable）。描述该证券卖空的难易程度。 * `7671` - 股息（Dividends）。该值为未来十二个月每股预期股息支付总额。 * `7672` - 股息 TTM（Dividends TTM）。该值为过去十二个月每股预期股息支付总额。 * `7674` - EMA(200)。指数移动平均线 (N=200)。 * `7675` - EMA(100)。指数移动平均线 (N=100)。 * `7676` - EMA(50)。指数移动平均线 (N=50)。 * `7677` - EMA(20)。指数移动平均线 (N=20)。 * `7678` - 价格/EMA(200)（Price/EMA(200)）。价格与指数移动平均线 (N=200) 之比 -1 * `7679` - 价格/EMA(100)（Price/EMA(100)）。价格与指数移动平均线 (N=100) 之比 -1 * `7724` - 价格/EMA(50)（Price/EMA(50)）。价格与指数移动平均线 (N=50) 之比 -1 * `7681` - 价格/EMA(20)（Price/EMA(20)）。价格与指数移动平均线 (N=20) 之比 -1 * `7682` - 自开盘以来涨跌（Change Since Open）。最新价与开盘价之间的差额。 * `7683` - 即将发生的事件（Upcoming Event）。显示下一个重大公司事件。需要 Wall Street Horizon 订阅。 * `7684` - 即将发生事件的日期（Upcoming Event Date）。下一个重大公司事件的日期。需要 Wall Street Horizon 订阅。 * `7685` - 即将举行的分析师会议（Upcoming Analyst Meeting）。下一次计划的分析师会议的日期和时间。需要 Wall Street Horizon 订阅。 * `7686` - 即将发布的财报（Upcoming Earnings）。下一次计划的财报/财报电话会议事件的日期和时间。需要 Wall Street Horizon 订阅。 * `7687` - 即将举行的其他事件（Upcoming Misc Event）。下一次股东大会的日期和时间 * `7688` - 最近的分析师会议（Recent Analyst Meeting）。最近一次分析师会议的日期和时间。需要 Wall Street Horizon 订阅。 * `7689` - 最近的财报（Recent Earnings）。最近一次财报/财报电话会议事件的日期和时间。需要 Wall Street Horizon 订阅。 * `7690` - 最近的其他事件（Recent Misc Event）。最近一次股东大会的日期和时间 * `7694` - 最大回报概率（Probability of Max Return）。客户隐含的最大潜在收益概率。 * `7695` - 盈亏平衡（Break Even）。盈亏平衡点 * `7696` - SPX Delta。Beta 加权 Delta 使用以下公式计算：Delta x 经美元调整的 beta * `7697` - 期货未平仓合约（Futures Open Interest）。未平仓期货合约总数 * `7698` - 最新价收益率（Last Yield）。如果以当前最新价买入债券的隐含收益率。最新价收益率使用所有可能赎回日上的最新价（Last）计算。假设如果债券包含赎回或回售条款且发行人能够根据当前市场利率提供更低的票息率，则会发生提前偿付。最差收益率将是到期收益率或赎回收益率中的较低者（如果债券包含提前偿付条款）。最差收益率可能与到期收益率相同，但绝不会更高。 * `7699` - 买价收益率（Bid Yield）。如果以当前买价买入债券的隐含收益率。买价收益率使用所有可能赎回日上的卖价（Ask）计算。假设如果债券包含赎回或回售条款且发行人能够根据当前市场利率提供更低的票息率，则会发生提前偿付。最差收益率将是到期收益率或赎回收益率中的较低者（如果债券包含提前偿付条款）。最差收益率可能与到期收益率相同，但绝不会更高。 * `7700` - 最大回报概率（Probability of Max Return）。客户隐含的最大潜在收益概率。 * `7702` - 最大损失概率（Probability of Max Loss）。客户隐含的最大潜在损失概率。 * `7703` - 盈利概率（Profit Probability）。客户隐含的获得任何收益的概率。 * `7704` - 机构类型（Organization Type）。 * `7705` - 债务类别（Debt Class）。 * `7706` - 评级（Ratings）。为债券合约发布的评级。 * `7707` - 债券状态代码（Bond State Code）。 * `7708` - 债券类型（Bond Type）。 * `7714` - 最后交易日（Last Trading Date）。 * `7715` - 发行日期（Issue Date）。 * `7720` - 卖价收益率（Ask Yield）。如果以当前卖价买入债券的隐含收益率。卖价收益率使用所有可能赎回日上的买价（Bid）计算。假设如果债券包含赎回或回售条款且发行人能够根据当前市场利率提供更低的票息率，则会发生提前偿付。最差收益率将是到期收益率或赎回收益率中的较低者（如果债券包含提前偿付条款）。最差收益率可能与到期收益率相同，但绝不会更高。 * `7741` - 前收盘价（Prior Close）。昨日收盘价 * `7762` - 高精度成交量（Volume Long）。当日的高精度成交量。格式化的成交量请参考字段 87。 * `7768` - hasTradingPermissions。用户是否具有指定合约的交易权限。返回 1（true）或 0（false）。 * `7899` - 股票类型（Stock Type）。确定股票类型。包括：Common, CORP, ADR, ETF, ETN, EFN, REIT, CEF, ETMF。 * `7920` - 当日盈亏原始值（Daily PnL Raw）。自前一收盘以来的当日盈亏。当日盈亏使用实时市场数据计算（即使未订阅市场数据）。 * `7921` - 持仓成本原始值（Cost Basis Raw）。您在该证券中的当前持仓乘以平均价格和乘数。 * `7943` - 返还利率（Rebate Rate）。联邦基金利率或其他货币相关的基准利率减去对借入股份收取的利率。

## 响应

### 200

成功请求市场数据

- `list of IserverSnapshotItems`

## 错误

### 400 错误请求错误

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

内部服务器错误，在传入请求无法被处理时返回。它有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，而只有在处理请求的过程中才能检测出来。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，由于某些内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态。

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 类型

### IserverSnapshotItems

## 示例

**响应**

```json
[
  null
]
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/v1/api/iserver/marketdata/snapshot"

querystring = {"conids":"265598,8314"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids=265598%2C8314';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids=265598%2C8314"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids=265598%2C8314")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids=265598%2C8314")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids=265598%2C8314', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids=265598%2C8314");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids=265598%2C8314")! as URL,
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