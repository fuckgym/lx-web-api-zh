# 获取已生成的报告

GET https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement

检索由先前成功调用 `/SendRequest` 所返回的 `ReferenceCode` 标识的 Flex Query 报告实例。视报告大小而定，你可能需要等待一段时间后再调用此端点，以使报告生成完成。


参考：https://ibkrcampus.com/docs/web-api/api-reference/get-statement

## 请求

### 查询参数

- `t` (string, required) — 在 Client Portal 中于 Reporting -> Flex Queries 下为 Flex Web Service 创建的访问令牌。
- `q` (string, required) — 由先前成功调用 `/SendRequest` 返回的 `ReferenceCode`，用于标识要检索的特定报告实例。
- `v` (enum, required) — Flex Web Service 的版本。支持 `2` 和 `3` 两个值；应始终使用版本 `3`。
  - Allowed values: `2`, `3`

## 响应

### 200

已生成的报告文件。其格式（例如 CSV、XML）取决于 Flex Query 模板的配置。失败时将改为返回 XML 错误响应。

## 示例

### 成功

**响应**

```json
"\"ClientAccountID\",\"CurrencyPrimary\",\"Symbol\",\"Conid\",\"Date/Time\",\"Exchange\",\"Buy/Sell\",\"Quantity\",\"Price\",\"OrigTradeID\",\"TraderID\",\"OrderID\",\"OrderReference\",\"IsAPIOrder\" \"DU5240685\",\"USD\",\"AAPL\",\"265598\",\"20260806;112923\",\"IEX\",\"BUY\",\"80\",\"309.96\",\"\",\"\",\"734329156\",\"\",\"N\" \"DU5240685\",\"USD\",\"AAPL\",\"265598\",\"20260806;112923\",\"IEX\",\"BUY\",\"40\",\"309.98\",\"\",\"\",\"734329156\",\"\",\"N\" \"DU5240685\",\"USD\",\"AAPL\",\"265598\",\"20260806;112923\",\"IBDARK\",\"BUY\",\"80\",\"309.94\",\"\",\"\",\"734329156\",\"\",\"N\" \"DU5240685\",\"USD\",\"AAPL\",\"265598\",\"20260811;130307\",\"NASDAQ\",\"BUY\",\"10\",\"306.11\",\"\",\"\",\"736171840\",\"\",\"Y\" \"DU5240685\",\"USD\",\"AAPL\",\"265598\",\"20260811;130352\",\"MEMX\",\"BUY\",\"10\",\"306.11\",\"\",\"\",\"736173116\",\"order-id-in-exec\",\"Y\""
```

**SDK 代码**

```python Succes
import requests

url = "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement"

querystring = {"q":"7729029235","t":"833145478193195254070598","v":"3"}

response = requests.get(url, params=querystring)

print(response.json())
```

```javascript Succes
const url = 'https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3';
const options = {method: 'GET'};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go Succes
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3"

	req, _ := http.NewRequest("GET", url, nil)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby Succes
require 'uri'
require 'net/http'

url = URI("https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

```java Succes
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3")
  .asString();
```

```php Succes
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3');

echo $response->getBody();
```

```csharp Succes
using RestSharp;

var client = new RestClient("https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3");
var request = new RestRequest(Method.GET);
IRestResponse response = client.Execute(request);
```

```swift Succes
import Foundation

let request = NSMutableURLRequest(url: NSURL(string: "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3")! as URL,
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
"<FlexStatementResponse timestamp=\"28 August, 2012 10:37 AM EDT\"><Status>Fail</Status><ErrorCode>1017</ErrorCode><ErrorMessage>Reference code is invalid.</ErrorMessage></FlexStatementResponse>"
```

**SDK 代码**

```python Failure
import requests

url = "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement"

querystring = {"q":"7729029235","t":"833145478193195254070598","v":"3"}

response = requests.get(url, params=querystring)

print(response.json())
```

```javascript Failure
const url = 'https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3';
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

	url := "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3"

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

url = URI("https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body
```

```java Failure
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3")
  .asString();
```

```php Failure
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3');

echo $response->getBody();
```

```csharp Failure
using RestSharp;

var client = new RestClient("https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3");
var request = new RestRequest(Method.GET);
IRestResponse response = client.Execute(request);
```

```swift Failure
import Foundation

let request = NSMutableURLRequest(url: NSURL(string: "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?q=7729029235&t=833145478193195254070598&v=3")! as URL,
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