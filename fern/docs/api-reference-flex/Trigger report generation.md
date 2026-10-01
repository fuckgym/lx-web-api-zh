# 触发报告生成

GET https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest

提交一个请求以生成 Flex Query 报告实例。成功时返回一个 `ReferenceCode`，将其传递给 `/GetStatement` 即可检索已生成的报告。

**频率限制：** 每秒 1 个请求；每个令牌每分钟最多 10 个请求。


参考：https://ibkrcampus.com/docs/web-api/api-reference/send-request

## 请求

### 查询参数

- `t` (string, required) — 在 Client Portal 中于 Reporting -> Flex Queries 下为 Flex Web Service 创建的访问令牌。
- `q` (string, required) — 所需 Flex Query 报告模板的 Query ID，可在 Client Portal 的 Reporting -> Flex Query 下获取。
- `v` (enum, required) — Flex Web Service 的版本。支持 `2` 和 `3` 两个值；应始终使用版本 `3`。
  - Allowed values: `2`, `3`
- `fd` (string, optional) — `fromDate` 的缩写。定义要检索的最早日期。如果使用 `fd`，则 `td` 参数为必需。
- `td` (string, optional) — `toDate` 的缩写。定义要检索的最后日期。如果使用 `td`，则 `fd` 参数为必需。
- `p` (integer, optional) — `Period` 的缩写。从当前日期起要检索数据的天数。最多可请求 365 天。

## 响应

### 200

XML 响应，指示报告生成请求成功还是失败。请检查 `Status` 元素以确定结果。

## 示例

### 成功

**响应**

```json
"<FlexStatementResponse timestamp=\"28 August, 2012 10:37 AM EDT\"><Status>Success</Status><ReferenceCode>1234567890</ReferenceCode><url>https://gdcdyn.interactivebrokers.com/Universal/servlet/FlexStatementService.GetStatement</url></FlexStatementResponse>"
```

**SDK 代码**

```python Success
import requests

url = "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest"

querystring = {"q":"1099104","t":"833145478193195254070598","v":"3"}

response = requests.get(url, params=querystring)

print(response.json())
```

```javascript Success
const url = 'https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3';
const options = {method: 'GET'};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Success
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Success
require 'uri'
require 'net/http'

url = URI("https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

```java Success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3")
  .asString();
```

```php Success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3');

echo $response->getBody();
```

```csharp Success
using RestSharp;

var client = new RestClient("https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3");
var request = new RestRequest(Method.GET);
IRestResponse response = client.Execute(request);
```

```swift Success
import Foundation

let request = NSMutableURLRequest(url: NSURL(string: "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"

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

### 失败

**响应**

```json
"<FlexStatementResponse timestamp=\"28 August, 2012 10:37 AM EDT\"><Status>Fail</Status><ErrorCode>1012</ErrorCode><ErrorMessage>Token has expired.</ErrorMessage></FlexStatementResponse>"
```

**SDK 代码**

```python Failure
import requests

url = "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest"

querystring = {"q":"1099104","t":"833145478193195254070598","v":"3"}

response = requests.get(url, params=querystring)

print(response.json())
```

```javascript Failure
const url = 'https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3';
const options = {method: 'GET'};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Failure
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Failure
require 'uri'
require 'net/http'

url = URI("https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

```java Failure
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3")
  .asString();
```

```php Failure
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3');

echo $response->getBody();
```

```csharp Failure
using RestSharp;

var client = new RestClient("https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3");
var request = new RestRequest(Method.GET);
IRestResponse response = client.Execute(request);
```

```swift Failure
import Foundation

let request = NSMutableURLRequest(url: NSURL(string: "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?q=1099104&t=833145478193195254070598&v=3")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"

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