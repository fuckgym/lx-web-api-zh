# 校验 SSO Web API 会话

GET https://localhost:5000/v1/api/sso/validate

校验 SSO 用户的当前会话。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-session/get-session-validation

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO bearer 令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (Production)
- `https://qa.interactivebrokers.com` (Sandbox)

## 响应

### 200

一个包含合约详细信息的对象数组。

- `USER_ID` (long, optional) — 内部用户标识符。
- `USER_NAME` (string, optional) — 当前会话登录的用户名。
- `RESULT` (boolean, optional) — 确认校验是否成功。会话通过校验则为 true；否则为 false。
- `AUTH_TIME` (long, optional) — 返回认证时间（epoch 时间）。
- `SF_ENABLED` (boolean, optional) — （仅限内部使用）
- `IS_FREE_TRIAL` (boolean, optional) — 返回该账户是试用账户还是已注资账户。
- `CREDENTIAL` (string, optional) — 返回账户的底层用户名。
- `IP` (string, optional) — 仅限内部使用。不反映用户的 IP 地址。
- `EXPIRES` (long, optional) — 返回 SSO 会话到期前的剩余时间（毫秒）。
- `QUALIFIED_FOR_MOBILE_AUTH` (boolean, optional) — 返回客户是否需要双重认证（two factor authentication）。
- `LANDING_APP` (string, optional) — 用于客户端门户（仅限内部使用）
- `IS_MASTER` (boolean, optional) — 返回该账户是主账户（true）还是子账户（false）。
- `lastAccessed` (long, optional) — 返回用户最后一次被访问的时间（epoch 时间）。
- `loginType` (long, optional) — 返回登录类型。实盘（Live）为 1，模拟（Paper）为 2
- `PAPER_USER_NAME` (string, optional) — 返回该账户的模拟账户用户名。
- `features` (SsoValidateResponseFeatures, optional) — 返回支持的功能，例如债券和期权交易。
- `region` (string, optional) — 返回内部连接的区域。

## 错误

### 401 未授权错误

Authorization 令牌缺失、无效或无法解析。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

## 类型

### SsoValidateResponseFeatures

返回支持的功能，例如债券和期权交易。

- `envs` (string, optional) — 返回所连接的环境，以区分生产（production）或模拟（paper）环境。
- `wlms` (boolean, optional) — 仅限内部使用
- `realtime` (boolean, optional) — 返回实时市场数据是否可用
- `bond` (boolean, optional) — 返回是否可以交易债券。
- `optionChains` (boolean, optional) — 返回是否可以获取账户的期权链。
- `calendar` (boolean, optional) — 返回交易日历是否已启用
- `newMf` (boolean, optional) — 仅限内部使用

## 示例

**响应**

```json
{
  "success": {
    "value": {
      "AUTH_TIME": 1702580846836,
      "CREDENTIAL": "user1234",
      "EXPIRES": 415890,
      "IP": "12.345.678.901",
      "IS_FREE_TRIAL": false,
      "IS_MASTER": false,
      "LANDING_APP": "UNIVERSAL",
      "LOGIN_TYPE": 2,
      "PAPER_USER_NAME": "user1234",
      "QUALIFIED_FOR_MOBILE_AUTH": null,
      "RESULT": true,
      "SF_ENABLED": false,
      "USER_ID": 123456789,
      "USER_NAME": "user1234",
      "features": {
        "bond": true,
        "calendar": true,
        "env": "PROD",
        "newMf": true,
        "optionChains": true,
        "realtime": true,
        "wlms": true
      },
      "lastAccessed": 1702581069652,
      "region": "NJ"
    }
  }
}
```

**SDK 代码**

```python Trading Session_getSessionValidation_example
import requests

url = "https://localhost:5000/v1/api/sso/validate"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript Trading Session_getSessionValidation_example
const url = 'https://localhost:5000/v1/api/sso/validate';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Trading Session_getSessionValidation_example
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/sso/validate"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Trading Session_getSessionValidation_example
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/sso/validate")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java Trading Session_getSessionValidation_example
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/sso/validate")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php Trading Session_getSessionValidation_example
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/sso/validate', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp Trading Session_getSessionValidation_example
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/sso/validate");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift Trading Session_getSessionValidation_example
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/sso/validate")! as URL,
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