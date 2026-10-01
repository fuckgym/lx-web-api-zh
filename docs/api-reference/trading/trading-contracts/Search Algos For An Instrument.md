# 搜索金融工具的算法

GET https://localhost:5000/v1/api/iserver/contract/{conid}/algos

返回某一金融工具支持的 IB 算法（IB Algos）。在检索信息之前必须先提交预检请求。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-contracts/get-algos-by-instrument

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway，默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒)

## 请求

### 路径参数

- `conid` (string, required)

### 查询参数

- `algos` (enum, optional) — 用于过滤的、以 \";\" 分隔的算法 id 列表。最多可指定 8 个算法 id。算法 id 区分大小写。
  - Allowed values: `Adaptive`, `Vwap`
- `addDescription` (enum, optional, default: 0) — 是否在响应中添加算法描述。设为 1 表示是，0 表示否。
  - Allowed values: `0`, `1`
- `addParams` (enum, optional, default: 0) — 是否显示算法参数。设为 1 表示是，0 表示否。
  - Allowed values: `0`, `1`

## 响应

### 200

返回可用算法列表及其行为描述。

- `algos` (list of AlgosResponseAlgosItems, optional) — 包含与该合约相关的所有算法。

## 错误

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

### AlgosResponseAlgosItems

- `name` (string, required) — 算法的通用名称
- `id` (string, required) — 用于请求的算法标识符。
- `parameters` (list of algoParam, optional)

### algoParam

- `guiRank` (long, optional) — 算法的位置排序。用于 Client Portal。
- `defaultValue` (AlgoParamDefaultValue, optional) — 默认参数值。类型在 valueClassName 字段中定义
- `minValue` (long, optional)
- `maxValue` (long, optional)
- `name` (string, optional) — 参数名称。
- `id` (string, optional) — 该算法的参数标识符。
- `description` (string, optional)
- `legalStrings` (list of string, optional) — 该参数允许的取值。
- `required` (boolean, optional) — 说明下达该算法订单时该参数是否为必填。
- `valueClassName` (enum, optional) — 返回该参数的变量类型。
  - Allowed values: `String`, `Boolean`, `Time`, `Double`, `Integer`

### AlgoParamDefaultValue

默认参数值。类型在 valueClassName 字段中定义

## 示例

### 成功

**响应**

```json
{
  "algos": [
    {
      "name": "Adaptive",
      "id": "Adaptive"
    },
    {
      "name": "Arrival Price",
      "id": "ArrivalPx"
    },
    {
      "name": "Close Price",
      "id": "ClosePx"
    },
    {
      "name": "DarkIce",
      "id": "DarkIce"
    },
    {
      "name": "Percentage of Volume",
      "id": "PctVol"
    },
    {
      "name": "Price Variant Percentage of Volume",
      "id": "PctVolPx"
    },
    {
      "name": "Size Variant Percentage of Volume",
      "id": "PctVolSz"
    },
    {
      "name": "TWAP",
      "id": "Twap"
    },
    {
      "name": "Time Variant Percentage of Volume",
      "id": "PctVolTm"
    },
    {
      "name": "VWAP",
      "id": "Vwap"
    }
  ]
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/iserver/contract/conid/algos"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/iserver/contract/conid/algos';
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

	url := "https://localhost:5000/v1/api/iserver/contract/conid/algos"

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

url = URI("https://localhost:5000/v1/api/iserver/contract/conid/algos")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/contract/conid/algos")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/contract/conid/algos', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/contract/conid/algos");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/contract/conid/algos")! as URL,
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

### 成功（含附加数据）

**响应**

```json
{
  "algos": [
    {
      "name": "Adaptive",
      "id": "Adaptive",
      "parameters": [
        {
          "guiRank": 1,
          "defaultValue": "Normal",
          "name": "Adaptive order priority/urgency",
          "id": "adaptivePriority",
          "legalStrings": [
            "Urgent",
            "Normal",
            "Patient"
          ],
          "required": true,
          "valueClassName": "String"
        }
      ]
    },
    {
      "name": "Arrival Price",
      "id": "ArrivalPx",
      "parameters": [
        {
          "guiRank": 3,
          "defaultValue": "Neutral",
          "name": "Urgency/Risk aversion",
          "id": "riskAversion",
          "legalStrings": [
            "GetDone",
            "Aggressive",
            "Neutral",
            "Passive"
          ],
          "required": true,
          "valueClassName": "String"
        },
        {
          "guiRank": 6,
          "defaultValue": false,
          "name": "Allow trading past end time",
          "id": "allowPastEndTime",
          "valueClassName": "Boolean"
        },
        {
          "guiRank": 7,
          "defaultValue": false,
          "name": "Attempt completion by EOD",
          "id": "forceCompletion",
          "valueClassName": "Boolean"
        },
        {
          "guiRank": 4,
          "name": "Start Time",
          "id": "startTime",
          "description": "Defaults to start of market trading",
          "valueClassName": "Time"
        },
        {
          "guiRank": 2,
          "minValue": 1,
          "maxValue": 50,
          "name": "Max Percentage",
          "id": "maxPctVol",
          "description": "From 0.01 to 50.0",
          "required": true,
          "valueClassName": "Double"
        },
        {
          "guiRank": 5,
          "name": "End Time",
          "id": "endTime",
          "description": "Defaults to end of market trading",
          "valueClassName": "Time"
        }
      ]
    }
  ]
}
```

**SDK 代码**

```python success-with-additional-data
import requests

url = "https://localhost:5000/v1/api/iserver/contract/conid/algos"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success-with-additional-data
const url = 'https://localhost:5000/v1/api/iserver/contract/conid/algos';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go success-with-additional-data
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/iserver/contract/conid/algos"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby success-with-additional-data
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/iserver/contract/conid/algos")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java success-with-additional-data
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/iserver/contract/conid/algos")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success-with-additional-data
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/iserver/contract/conid/algos', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success-with-additional-data
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/iserver/contract/conid/algos");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success-with-additional-data
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/iserver/contract/conid/algos")! as URL,
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