# 历史 OHLC K线数据

GET https://localhost:5000/v1/api/iserver/marketdata/history

以 OHLC K线的形式请求某个金融工具的历史数据。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-market-data/get-md-history

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway，默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱环境)

## 请求

### 查询参数

- `conid` (long, required) — 所请求金融工具的 IB 合约 ID。
- `period` (string, required, default: 1d) — 距离 startTime 向未来延伸的一段时间长度，将被划分为指定宽度的 K线。支持的周期大小 * `min` - 分钟 * `h` - 小时 * `d` - 天 * `w` - 周 * `m` - 月 * `y` - 年
- `bar` (string, required, default: 1min) — 由 period 和 startTime 所确定的区间将被划分成的 K线宽度。不要求 bar 能整除 period；可以返回部分 K线。支持的 K线大小 * `S` - 秒 * `min` - 分钟 * `h` - 小时 * `d` - 天 * `w` - 周 * `m` - 月
- `exchange` (string, optional) — 请求数据的交易所（或 SMART）。
- `outsideRth` (boolean, optional, default: false) — 指示响应中是否应包含常规交易时间以外的数据。
- `startTime` (string, optional) — 历史数据请求的固定 UTC 日期时间参考点，指定的 period 自该点延伸。格式为 YYYYMMDD-hh:mm:ss。如果省略，则使用当前时间，且 direction 必须省略或为 1。
- `direction` (enum, optional, default: -1) — 指示数据应在开始时间处开始还是结束。* `-1` - 历史数据将从距开始时间一段距离处开始，结束于当前时间/startTime。* `1` - 历史数据从开始时间开始，向当前时间方向推进。仅在包含 startTime 时受支持。
  - Allowed values: `-1`, `1`
- `source` (string, optional, default: Last) — 历史 K线中要返回的数据类型。支持的 Bar 大小 * `Bid_Ask` - OHLC 买入/卖出价值。* `Last` - OHLC 成交值。* `Midpoint` - 买卖价中间点的 OHLC。

## 响应

### 200

历史数据查询成功返回数据。

- `Trading Market Data_getMdHistory_Response_200`

## 错误

### 400 错误请求错误

缺少参数、参数为空、非数值或超出范围。`error` 字段始终以 `Bad Request:` 为前缀。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 401 未授权错误

缺少、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，当传入的请求无法被处理时返回。它有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，而只能在处理请求的后期才被检测出来。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，由于某个内部服务不可用导致请求耗时超过 10 秒，请求将被中止并返回此状态

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### iserverHistoryBidAskResponse

包含所请求历史数据及相关元数据的对象。

- `serverId` (string, optional) — 内部使用。请求的标识符。
- `symbol` (string, optional) — 所请求金融工具的 symbol。
- `text` (string, optional) — 金融工具的描述或公司名称。
- `priceFactor` (long, optional) — 内部使用。用于缩放 Client Portal 图表的 Y 轴。
- `startTime` (string, optional) — 完整周期开始（按时间先后较早一端）的 UTC 日期和时间，格式为 YYYYMMDD-hh:mm:ss。
- `high` (string, optional) — 内部使用。提供整个区间内的最高价格值。用于图表缩放。字符串按 'highestPrice*priceFactor/totalVolume*volumeFactor/minutesFromStartTime' 构造。
- `low` (string, optional) — 内部使用。提供整个区间内的最低价格值。用于图表缩放。字符串按 'lowestPrice*priceFactor/totalVolume*volumeFactor/minutesFromStartTime' 构造。
- `timePeriod` (string, optional) — 客户端指定的 period 值。
- `barLength` (long, optional) — 客户端指定的 K线宽度，以秒表示。
- `mdAvailability` (string, optional) — 一个由三个字符组成的字符串，反映可用数据的性质。R = 实时, D = 延迟, Z = 冻结, Y = 冻结延迟, N = 未订阅。P = 快照, p = 合并。B = 盘口最优档。
- `outsideRth` (boolean, optional) — 指示响应中是否包含常规交易时间以外的数据。
- `tradingDayDuration` (long, optional) — 金融工具交易日的时长（以秒计）。
- `volumeFactor` (long, optional) — 内部使用。用于缩放成交量直方图。
- `priceDisplayRule` (long, optional) — 内部使用。管理价格显示规则的应用。
- `priceDisplayValue` (string, optional) — 内部使用。管理所显示价格的渲染。
- `chartPanStartTime` (string, optional) — 内部使用。用于将 Client Portal 图表居中的 UTC 日期时间字符串。格式为 YYYYMMDD-hh:mm:ss。
- `direction` (enum, optional) — 指示 period 相对于 startTime 的应用方式。该值始终为 -1，表示 period 从 startTime 向未来延伸。
  - Allowed values: `-1`
- `negativeCapable` (boolean, optional) — 指示金融工具是否支持负价格。
- `messageVersion` (long, optional) — 内部使用。反映所使用的响应 schema 版本。
- `travelTime` (long, optional) — 服务该请求的内部在途时间。
- `data` (list of singleHistoricalBarBidAsk, optional) — 包含所请求周期的 OHLC K线的数组。
- `points` (long, optional) — data 数组中返回的 K线数量的计数。
- `mktDataDelay` (long, optional) — 满足此历史数据请求所用的毫秒数。

### iserverHistoryLastResponse

包含所请求历史数据及相关元数据的对象。

- `serverId` (string, optional) — 内部使用。请求的标识符。
- `symbol` (string, optional) — 所请求金融工具的 symbol。
- `text` (string, optional) — 金融工具的描述或公司名称。
- `priceFactor` (long, optional) — 内部使用。用于缩放 Client Portal 图表的 Y 轴。
- `startTime` (string, optional) — 完整周期开始（按时间先后较早一端）的 UTC 日期和时间，格式为 YYYYMMDD-hh:mm:ss。
- `high` (string, optional) — 内部使用。提供整个区间内的最高价格值。用于图表缩放。字符串按 'highestPrice*priceFactor/totalVolume*volumeFactor/minutesFromStartTime' 构造。
- `low` (string, optional) — 内部使用。提供整个区间内的最低价格值。用于图表缩放。字符串按 'lowestPrice*priceFactor/totalVolume*volumeFactor/minutesFromStartTime' 构造。
- `timePeriod` (string, optional) — 客户端指定的 period 值。
- `barLength` (long, optional) — 客户端指定的 K线宽度，以秒表示。
- `mdAvailability` (string, optional) — 一个由三个字符组成的字符串，反映可用数据的性质。R = 实时, D = 延迟, Z = 冻结, Y = 冻结延迟, N = 未订阅。P = 快照, p = 合并。B = 盘口最优档。
- `outsideRth` (boolean, optional) — 指示响应中是否包含常规交易时间以外的数据。
- `tradingDayDuration` (long, optional) — 金融工具交易日的时长（以秒计）。
- `volumeFactor` (long, optional) — 内部使用。用于缩放成交量直方图。
- `priceDisplayRule` (long, optional) — 内部使用。管理价格显示规则的应用。
- `priceDisplayValue` (string, optional) — 内部使用。管理所显示价格的渲染。
- `chartPanStartTime` (string, optional) — 内部使用。用于将 Client Portal 图表居中的 UTC 日期时间字符串。格式为 YYYYMMDD-hh:mm:ss。
- `direction` (enum, optional) — 指示 period 相对于 startTime 的应用方式。该值始终为 -1，表示 period 从 startTime 向未来延伸。
  - Allowed values: `-1`
- `negativeCapable` (boolean, optional) — 指示金融工具是否支持负价格。
- `messageVersion` (long, optional) — 内部使用。反映所使用的响应 schema 版本。
- `travelTime` (long, optional) — 服务该请求的内部在途时间。
- `data` (list of singleHistoricalBarLast, optional) — 包含所请求周期的 OHLC K线的数组。
- `points` (long, optional) — data 数组中返回的 K线数量的计数。
- `mktDataDelay` (long, optional) — 满足此历史数据请求所用的毫秒数。

### iserverHistoryMidpointResponse

包含所请求历史数据及相关元数据的对象。

- `serverId` (string, optional) — 内部使用。请求的标识符。
- `symbol` (string, optional) — 所请求金融工具的 symbol。
- `text` (string, optional) — 金融工具的描述或公司名称。
- `priceFactor` (long, optional) — 内部使用。用于缩放 Client Portal 图表的 Y 轴。
- `startTime` (string, optional) — 完整周期开始（按时间先后较早一端）的 UTC 日期和时间，格式为 YYYYMMDD-hh:mm:ss。
- `high` (string, optional) — 内部使用。提供整个区间内的最高价格值。用于图表缩放。字符串按 'highestPrice*priceFactor/totalVolume*volumeFactor/minutesFromStartTime' 构造。
- `low` (string, optional) — 内部使用。提供整个区间内的最低价格值。用于图表缩放。字符串按 'lowestPrice*priceFactor/totalVolume*volumeFactor/minutesFromStartTime' 构造。
- `timePeriod` (string, optional) — 客户端指定的 period 值。
- `barLength` (long, optional) — 客户端指定的 K线宽度，以秒表示。
- `mdAvailability` (string, optional) — 一个由三个字符组成的字符串，反映可用数据的性质。R = 实时, D = 延迟, Z = 冻结, Y = 冻结延迟, N = 未订阅。P = 快照, p = 合并。B = 盘口最优档。
- `outsideRth` (boolean, optional) — 指示响应中是否包含常规交易时间以外的数据。
- `tradingDayDuration` (long, optional) — 金融工具交易日的时长（以秒计）。
- `volumeFactor` (long, optional) — 内部使用。用于缩放成交量直方图。
- `priceDisplayRule` (long, optional) — 内部使用。管理价格显示规则的应用。
- `priceDisplayValue` (string, optional) — 内部使用。管理所显示价格的渲染。
- `chartPanStartTime` (string, optional) — 内部使用。用于将 Client Portal 图表居中的 UTC 日期时间字符串。格式为 YYYYMMDD-hh:mm:ss。
- `direction` (enum, optional) — 指示 period 相对于 startTime 的应用方式。该值始终为 -1，表示 period 从 startTime 向未来延伸。
  - Allowed values: `-1`
- `negativeCapable` (boolean, optional) — 指示金融工具是否支持负价格。
- `messageVersion` (long, optional) — 内部使用。反映所使用的响应 schema 版本。
- `travelTime` (long, optional) — 服务该请求的内部在途时间。
- `data` (list of singleHistoricalBarMidpoint, optional) — 包含所请求周期的 OHLC K线的数组。
- `points` (long, optional) — data 数组中返回的 K线数量的计数。
- `mktDataDelay` (long, optional) — 满足此历史数据请求所用的毫秒数。

### singleHistoricalBarBidAsk

包含单个 OHLC K线的买入价（Bid）与卖出价（Ask）数据的对象。

- `o` (double, optional) — K线的开盘值。表示该 K线期间的时间平均买入价。
- `c` (double, optional) — K线的收盘值。表示该 K线期间的时间平均卖出价。
- `h` (double, optional) — K线的最高值。表示该 K线期间最高的卖出价。
- `l` (double, optional) — K线的最低值。表示该 K线期间最低的买入价。
- `v` (double, optional) — K线的成交量值。始终返回 0。
- `t` (long, optional) — K线开始（按时间先后较早一端）的 Unix 时间戳。

### singleHistoricalBarLast

包含单个 OHLC K线的最新成交（Last）或成交（Trades）数据的对象。

- `o` (double, optional) — K线的开盘值。表示该 K线的首个成交价。
- `c` (double, optional) — K线的收盘值。表示该 K线的最终成交价。
- `h` (double, optional) — K线的最高值。表示该 K线的最高成交价。
- `l` (double, optional) — K线的最低值。表示该 K线的最低成交价。
- `v` (double, optional) — K线的成交量值，仅对 "Last" barType 返回。
- `t` (long, optional) — K线开始（按时间先后较早一端）的 Unix 时间戳。

### singleHistoricalBarMidpoint

包含单个 OHLC K线的中间价（Midpoint）数据的对象。

- `o` (double, optional) — K线的开盘值。表示该 K线期间的起始中间价。
- `c` (double, optional) — K线的收盘值。表示该 K线期间的最后一个中间价。
- `h` (double, optional) — K线的最高值。表示该 K线期间最高的中间价。
- `l` (double, optional) — K线的最低值。表示该 K线期间最低的中间价。
- `v` (double, optional) — K线的成交量值。始终返回 0。
- `t` (long, optional) — K线开始（按时间先后较早一端）的 Unix 时间戳。

## 示例

### iserverHistoryBidAskSuccessExample

**响应**

```json
{
  "barLength": 86400,
  "chartPanStartTime": "20250521-00:00:00",
  "data": [
    {
      "c": 212.11,
      "h": 213.94,
      "l": 210.58,
      "o": 212.09,
      "t": 1747229400000,
      "v": 0
    },
    {
      "c": 211.34,
      "h": 212.97,
      "l": 209.53,
      "o": 211.32,
      "t": 1747315800000,
      "v": 0
    },
    {
      "c": 211.07,
      "h": 212.56,
      "l": 209.77,
      "o": 211.05,
      "t": 1747402200000,
      "v": 0
    },
    {
      "c": 207.86,
      "h": 209.48,
      "l": 204.25,
      "o": 207.84,
      "t": 1747661400000,
      "v": 0
    }
  ],
  "direction": -1,
  "high": "21394/0/1440",
  "low": "20425/0/8640",
  "mdAvailability": "S",
  "messageVersion": 2,
  "mktDataDelay": 0,
  "negativeCapable": false,
  "outsideRth": false,
  "points": 3,
  "priceDisplayRule": 1,
  "priceDisplayValue": "2",
  "priceFactor": 100,
  "serverId": "4155828",
  "startTime": "20250513-13:30:00",
  "symbol": "AAPL",
  "text": "APPLE INC",
  "timePeriod": "1w",
  "travelTime": 2,
  "volumeFactor": 100
}
```

**SDK 代码**

```python iserverHistoryBidAskSuccessExample
import requests

url = "https://localhost:5000/v1/api/iserver/marketdata/history"

querystring = {"bar":"1min","conid":"265598","period":"1d"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript iserverHistoryBidAskSuccessExample
const url = 'https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go iserverHistoryBidAskSuccessExample
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby iserverHistoryBidAskSuccessExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java iserverHistoryBidAskSuccessExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php iserverHistoryBidAskSuccessExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp iserverHistoryBidAskSuccessExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift iserverHistoryBidAskSuccessExample
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d")! as URL,
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

### iserverHistoryLastSuccessExample

**响应**

```json
{
  "barLength": 86400,
  "chartPanStartTime": "20250521-00:00:00",
  "data": [
    {
      "c": 212.33,
      "h": 213.94,
      "l": 210.58,
      "o": 212.43,
      "t": 1747229400000,
      "v": 266616.18
    },
    {
      "c": 211.45,
      "h": 212.96,
      "l": 209.54,
      "o": 210.95,
      "t": 1747315800000,
      "v": 256847.25
    },
    {
      "c": 211.26,
      "h": 212.57,
      "l": 209.77,
      "o": 212.36,
      "t": 1747402200000,
      "v": 235240.24
    },
    {
      "c": 208.78,
      "h": 209.48,
      "l": 204.26,
      "o": 207.78,
      "t": 1747661400000,
      "v": 267569.89
    }
  ],
  "direction": -1,
  "high": "21394/266616.18/1440",
  "low": "20426/267569.89/8640",
  "mdAvailability": "S",
  "messageVersion": 2,
  "mktDataDelay": 0,
  "negativeCapable": false,
  "outsideRth": false,
  "points": 3,
  "priceDisplayRule": 1,
  "priceDisplayValue": "2",
  "priceFactor": 100,
  "serverId": "4155816",
  "startTime": "20250513-13:30:00",
  "symbol": "AAPL",
  "text": "APPLE INC",
  "timePeriod": "1w",
  "travelTime": 7,
  "volumeFactor": 100
}
```

**SDK 代码**

```python iserverHistoryLastSuccessExample
import requests

url = "https://localhost:5000/v1/api/iserver/marketdata/history"

querystring = {"bar":"1min","conid":"265598","period":"1d"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript iserverHistoryLastSuccessExample
const url = 'https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go iserverHistoryLastSuccessExample
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby iserverHistoryLastSuccessExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java iserverHistoryLastSuccessExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php iserverHistoryLastSuccessExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp iserverHistoryLastSuccessExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift iserverHistoryLastSuccessExample
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d")! as URL,
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

### iserverHistoryMidpointSuccessExample

**响应**

```json
{
  "barLength": 86400,
  "chartPanStartTime": "20250521-00:00:00",
  "data": [
    {
      "c": 212.42,
      "h": 213.94,
      "l": 210.59,
      "o": 212.37,
      "t": 1747229400000,
      "v": 0
    },
    {
      "c": 211.43,
      "h": 212.97,
      "l": 209.53,
      "o": 210.98,
      "t": 1747315800000,
      "v": 0
    },
    {
      "c": 211.19,
      "h": 212.5,
      "l": 209.77,
      "o": 212.36,
      "t": 1747402200000,
      "v": 0
    },
    {
      "c": 208.72,
      "h": 209.48,
      "l": 204.26,
      "o": 207.94,
      "t": 1747661400000,
      "v": 0
    }
  ],
  "direction": -1,
  "high": "21394/0/1440",
  "low": "20426/0/8640",
  "mdAvailability": "S",
  "messageVersion": 2,
  "mktDataDelay": 0,
  "negativeCapable": false,
  "outsideRth": false,
  "points": 3,
  "priceDisplayRule": 1,
  "priceDisplayValue": "2",
  "priceFactor": 100,
  "serverId": "4155818",
  "startTime": "20250513-13:30:00",
  "symbol": "AAPL",
  "text": "APPLE INC",
  "timePeriod": "1w",
  "travelTime": 7,
  "volumeFactor": 100
}
```

**SDK 代码**

```python iserverHistoryMidpointSuccessExample
import requests

url = "https://localhost:5000/v1/api/iserver/marketdata/history"

querystring = {"bar":"1min","conid":"265598","period":"1d"}

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
```

```javascript iserverHistoryMidpointSuccessExample
const url = 'https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go iserverHistoryMidpointSuccessExample
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby iserverHistoryMidpointSuccessExample
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java iserverHistoryMidpointSuccessExample
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php iserverHistoryMidpointSuccessExample
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp iserverHistoryMidpointSuccessExample
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift iserverHistoryMidpointSuccessExample
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/marketdata/history?bar=1min&conid=265598&period=1d")! as URL,
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