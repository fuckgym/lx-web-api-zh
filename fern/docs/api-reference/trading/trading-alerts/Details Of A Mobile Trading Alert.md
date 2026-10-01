# 移动交易警报详情

GET https://localhost:5000/v1/api/iserver/account/mta

检索有关您的 MTA 警报的信息。每个登录用户只有一个移动交易助手（MTA）警报，它拥有自己唯一的、不可更改的工具 ID。MTA 警报无法创建或删除，只能修改。修改后会生成一个新的订单 ID。


参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-alerts/get-mta-details

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 响应

### 200

账户上唯一 MTA 警报的警报描述。

- `account` (string, optional) — 请求方的账户 ID
- `order_id` (long, optional) — 警报的跟踪 ID。可用于修改或删除警报。
- `alertName` (string, optional) — 警报的人类可读名称。
- `tif` (string, optional) — 对该警报有效的有效期（Time in Force）
- `expire_time` (string, optional) — 返回用于 GTD 订单的 UTC 格式日期。
- `alert_active` (enum, optional) — 返回该警报是激活 [1] 还是停用 [0]。
  - Allowed values: `1`, `0`
- `alert_repeatable` (long, optional) — 返回该警报是否可以发送多次。
- `alert_email` (string, optional) — 返回为 sendMessage 功能指定的电子邮件地址。
- `alert_send_message` (long, optional) — 返回该警报是否会发送电子邮件。
- `alert_message` (string, optional) — 返回该警报触发后将报告的正文内容
- `alert_show_popup` (long, optional) — 返回该警报是否会触发 TWS 弹出消息。
- `alert_play_audio` (long, optional) — 返回该警报是否会播放音频。
- `order_status` (enum, optional) — 表示订单状态。始终返回 "Presubmitted"。
  - Allowed values: `Presubmitted`, `Submitted`
- `alert_triggered` (long, optional) — 返回该警报是否已被触发。
- `fg_color` (string, optional) — 前景色。不适用于 API。
- `bg_color` (string, optional) — 背景色。不适用于 API。
- `order_not_editable` (boolean, optional) — 返回该订单是否可编辑。
- `itws_orders_only` (long, optional) — 返回该警报是否会触发移动通知。
- `alert_mta_currency` (string, optional) — 返回为 MTA 警报设置的币种。仅对警报类型 8 和 9 有效。
- `alert_mta_defaults` (string, optional) — 返回当前的 MTA 默认值。
- `tool_id` (long, optional) — 仅用于 MTA 警报的跟踪 ID。对标准警报返回 'null'。
- `time_zone` (string, optional) — 针对特定时间的条件返回。
- `alert_default_type` (long, optional) — 返回为警报设置的默认类型。在 Client Portal 中配置。
- `condition_size` (long, optional) — 返回该警报中条件的总数。
- `condition_outside_rth` (long, optional) — 返回该警报是否会在常规交易时段之外触发。
- `conditions` (list of alertCondition, optional) — 返回所有条件

## 类型

### alertCondition

- `condition_type` (long, optional) — 所设置的条件类型。
- `conidex` (string, optional) — 以 "conid@exchange" 格式返回 conid 和交易所。
- `contract_description_1` (string, optional) — 包含相关描述（如适用）。
- `condition_operator` (string, optional) — 为警报设置的条件运算符。
- `condition_trigger_method` (long, optional) — 所设置的 TriggerMethod 值。
- `condition_value` (string, optional) — 所设置的条件值。
- `condition_logic_bind` (boolean, optional) — 所设置的 logic_bind 值。
- `condition_time_zone` (string, optional) — 所设置的条件 timeZone 值。

## 示例

**响应**

```json
{
  "account": "U1234567",
  "order_id": 167426254,
  "tif": "GTC",
  "alert_active": 1,
  "alert_repeatable": 1,
  "alert_email": "jonh.smith@example.com",
  "alert_send_message": 1,
  "alert_show_popup": 0,
  "order_status": "Submitted",
  "alert_triggered": 1,
  "fg_color": "#FFFFFF",
  "bg_color": "#0000CC",
  "order_not_editable": false,
  "itws_orders_only": 0,
  "alert_mta_currency": "USD",
  "alert_mta_defaults": "9:STATE=1,MIN=-260000,MAX=260000,STEP=500,DEF_MIN=-26000,DEF_MAX=26000|8:STATE=0,MIN=-15,MAX=15,STEP=0.5,DEF_MIN=-2,DEF_MAX=2|7:STATE=1,MIN=-5,MAX=5,STEP=0.5,DEF_MIN=-2,DEF_MAX=2|4:STATE=1,MIN=1,MAX=50,STEP=1,DEF_VAL=10|5:STATE=0",
  "tool_id": 55834574848,
  "time_zone": "all timezones can be here",
  "condition_size": 1,
  "condition_outside_rth": 0,
  "conditions": [
    {
      "condition_type": 5,
      "conidex": "*@*",
      "contract_description_1": "Unknown",
      "condition_value": "*",
      "condition_logic_bind": true
    }
  ],
  "alert_name": "MTA (AutoAlert)"
}
```

**SDK 代码**

```python mta-details
import requests

url = "https://localhost:5000/v1/api/iserver/account/mta"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript mta-details
const url = 'https://localhost:5000/v1/api/iserver/account/mta';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go mta-details
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/account/mta"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby mta-details
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/account/mta")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java mta-details
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/account/mta")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php mta-details
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/account/mta', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp mta-details
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/account/mta");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift mta-details
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/account/mta")! as URL,
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