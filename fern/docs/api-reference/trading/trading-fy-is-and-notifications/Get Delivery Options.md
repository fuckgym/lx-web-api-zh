# 获取推送选项

GET https://localhost:5000/v1/api/fyi/deliveryoptions

用于将 FYI 通知发送到电子邮件及其他设备的选项。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-fy-is-and-notifications/get-fyi-delivery

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 响应

### 200

成功检索预设详情

- `E` (list of DeliveryOptionsEItems, optional) — 返回一个包含设备信息的数组。
- `M` (long, optional) — 电子邮件选项是否已启用。

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 内部服务器错误

内部服务器错误，在传入请求无法被处理时返回。有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，而只有在处理请求的后续阶段才能检测到。错误中包含问题原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，由于某个内部服务不可用导致请求耗时超过 10 秒时，请求将被中止并返回此状态码

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟响应状态码

## 类型

### DeliveryOptionsEItems

- `NM` (string, optional) — 返回人类可读的设备名称。
- `I` (string, optional) — 返回设备标识符。
- `UI` (string, optional) — 返回设备的唯一 ID。
- `A` (string, optional) — 设备是否已启用。

## 示例

**响应**

```json
{
  "E": [
    {
      "NM": "iPhone",
      "I": "apn://mtws@SDFSDFDSFS123123DSFSDF",
      "UI": "apn://mtws@SDFSDFDSFS123123DSFSDF",
      "A": "1"
    }
  ],
  "M": 1
}
```

**SDK 代码**

```python delivery-options
import requests

url = "https://localhost:5000/v1/api/fyi/deliveryoptions"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript delivery-options
const url = 'https://localhost:5000/v1/api/fyi/deliveryoptions';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go delivery-options
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/fyi/deliveryoptions"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby delivery-options
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/fyi/deliveryoptions")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java delivery-options
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/fyi/deliveryoptions")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php delivery-options
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/fyi/deliveryoptions', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp delivery-options
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/fyi/deliveryoptions");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift delivery-options
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/fyi/deliveryoptions")! as URL,
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