# 创建访问令牌

POST https://localhost:5000/oauth2/api/v1/token
Content-Type: application/x-www-form-urlencoded

根据请求参数生成 OAuth 2.0 访问令牌。

参考：https://ibkrcampus.com/docs/web-api/api-reference/authentication/oauth-2-0/generate-token

## 认证

- `Authorization` 请求头（bearer token, required）— SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱）

## 请求

### 请求体 (application/x-www-form-urlencoded)

该端点预期接收一个 TokenRequest。

- `scope` (string, optional)
- `clientId` (string, optional)
- `clientAuthenticationMethod` (enum, optional)
  - Allowed values: `none`, `private_key_jwt`, `client_secret_basic`, `client_secret_post`
- `clientSecret` (string, optional)
- `clientAssertion` (string, optional)
- `clientAssertionType` (string, optional)

## 响应

### 200

返回一个令牌响应。

- `access_token` (string, optional) — 序列化的访问令牌
- `refresh_token` (string, optional) — 如适用，序列化的刷新令牌
- `id_token` (string, optional) — 如适用，序列化的 ID 令牌
- `token_type` (string, optional) — 令牌类型（例如 Bearer）
- `scope` (string, optional) — 以空格分隔的已授予作用域列表
- `expires_in` (long, optional) — 距访问令牌过期剩余的秒数

## 错误

### 400 错误请求

返回一个表示错误请求的 [Problem detail](https://datatracker.ietf.org/doc/html/rfc9457) 实例。

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

### 500 内部服务器错误

返回一个表示内部服务器错误的 [Problem detail](https://datatracker.ietf.org/doc/html/rfc9457) 实例。

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjM0MDk5YjQxYThkZTY1ZTJmNTAwMzQ3MmQ0M2Q5ZDBhZjI2MWIzN2IifQ.eyJpc3MiOiIvdG9rZW4iLCJzdWIiOiJwcm9kdGVzdGVyIiwiZXhwIjoxNzA5NzczMjgyLCJpYXQiOjE3MDk2ODY4ODIsInNjb3BlIjoiZWNoby5yZWFkIGVjaG8ud3JpdGUiLCJjc2lkIjoicHJvZHRlc3RlciIsImFjY291bnRJZCI6IlU0NjM3NyJ9.HDfltwI2xOYYnCRgjefujhU2h5lcQCvuvtNuCVSeq26IydAvMiv_QccmcBvsMSHKYjH6nvA1r_5f7R3Jsc46_d1YMArcFfE33mj_qj9GYml-B_8634vLdD104abB-DU2J4a7yW1YwN61hYwPGWueps_UsnKnxf-Iaj6ELxtPBRl4NOEC8vJZ9nfhL81t4L5N_f-skXbpcLcArZaBtxqXvI1z4ClJd9L1-9pJ_3DPUp0s3VHnDCnx2wBkLY_pPEcnP52Ms_gppSHLXn_x5OLL82kbxWSlhbX9fvogj0AtHJDvhWNwTFk8Az57MSsPBAZMf4rsx-LY1ZK9bNSlQNb2W-BuqotDwwPwIZNB9en_6p0KoJFFEQu0dTSJAxGjfMeADQc6ZduHFzyNeOTpnh2oPfRK7JrsLGuGvbQ_M7taKEiDV49gpYzjJqVtfuNDAzLARLbj8WPGcUbckSF4pJH5Ipm1FbYhp0DzEgo5VEjZlQU5ChlQGakF4nf9NEIz5Aed",
  "token_type": "Bearer",
  "scope": "echo.read echo.write",
  "expires_in": 86399
}
```

**SDK 代码**

```python Token Response
import requests

url = "https://localhost:5000/oauth2/api/v1/token"

payload = ""
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/x-www-form-urlencoded"
}

response = requests.post(url, data=payload, headers=headers)

print(response.json())
```

```javascript Token Response
const url = 'https://localhost:5000/oauth2/api/v1/token';
const options = {
  method: 'POST',
  headers: {
    Authorization: 'Bearer <token>',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams('')
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Token Response
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/oauth2/api/v1/token"

	req, _ := http.NewRequest("POST", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Token Response
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/oauth2/api/v1/token")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/x-www-form-urlencoded'

response = http.request(request)
puts response.read_body
```

```java Token Response
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/oauth2/api/v1/token")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/x-www-form-urlencoded")
  .asString();
```

```php Token Response
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/oauth2/api/v1/token', [
  'form_params' => null,
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/x-www-form-urlencoded',
  ],
]);

echo $response->getBody();
```

```csharp Token Response
using RestSharp;

var client = new RestClient("https://localhost:5000/oauth2/api/v1/token");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
IRestResponse response = client.Execute(request);
```

```swift Token Response
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/x-www-form-urlencoded"
]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/oauth2/api/v1/token")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
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