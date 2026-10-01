# 获取枚举

GET https://localhost:5000/gw/api/v1/enumerations/{enumerationType}

用于查询 extPositionsTransfers、occupation、employerBusiness、financialInformation、affiliationDetails、tradingPermissions 等属性内包含的枚举列表。**范围**：`accounts.read` OR `enumerations.read`**安全策略**：`HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/get-enumerations

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用你注册的私钥进行签名的 RS256 签名 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 路径参数

- `enumeration` (enum, required) — exchange-bundles - 查询用于 tradingPermissions 的最新 exchange-bundles 列表business-and-occupation - 用于 employmentDetails 的职业（occupation）与雇主行业（employerBusiness）列表employee-track - 查询账户最新的 companyId。对于关联详情，如果公司已有现存的 IBKR Employee Track 账户fin-info-ranges - 按货币查询 annualNetIncome、netWorth、liquidNetWorth 的最新区间 IDacats - 查询 brokerId 和 brokerName 的最新值。用于通过美国 ACATS extPositionsTransfers 注资的情形aton - 查询 brokerId 和 brokerName 的最新值。用于通过美国 ACATS extPositionsTransfers 注资的情形market-data - 查询 brokerId 和 brokerName 的最新值。用于通过 ATON Canada extPositionsTransfers 注资的情形edd-avt - 查询分配给账户的 EDD（Enhanced Due Diligence，增强尽职调查）或 AVT（Additional Verification，额外验证）任务相关的问题prohibited-country - 查看受限国家列表。居住在受限国家的申请人将被限制在 IBKR 开户。如果 legalResidenceCountry 或 country（包含于 Residence、mailingAddress 和 employerAddress、taxResidency 节点中）是受限国家，则会抛出错误employee-plans - 查看与主账户关联的 EPA（适用于提供 SEP IRA 账户的情形）questionnaires - 获取问卷列表security-questions - 获取 IBKR 安全问题所支持的问题列表quiz-questions - 获取与 IBKR 知识测评相关联的问题列表wire-instructions - 获取电汇指示列表product-country-bundles - 获取产品国家组合列表countries - 获取国家列表states - 获取州列表identification - 按国家获取所需身份证件目录（包括 MiFIR 规则）。传入 type=mifir 和一个或多个 citizenship 参数，可改为获取指定公民身份所需的 MiFIR 身份证件
  - Allowed values: `exchange-bundles`, `business-and-occupation`, `employee-track`, `fin-info-ranges`, `acats`, `aton`, `market-data`, `edd-avt`, `prohibited-country`, `employee-plans`, `questionnaires`, `security-questions`, `quiz-questions`, `wire-instructions`, `product-country-bundles`, `countries`, `states`, `identification`
- `enumerationType` (string, required)

### 查询参数

- `currency` (string, optional)
- `ibEntity` (string, optional)
- `mdStatusNonPro` (string, optional)
- `form-number` (string, optional)
- `language` (enum, optional)
  - Allowed values: `en`, `ar`, `de`, `es`, `fr`, `he`, `hu`, `it`, `ja`, `nl`, `pt`, `ru`, `zh_CN`, `zh_TW`
- `accountId` (string, optional)
- `userName` (string, optional)
- `type` (string, optional)
- `citizenship` (list of string, optional)

## 响应

### 200

获取枚举

- `enumerationsType` (string, optional)
- `formNumber` (string, optional)
- `jsonData` (ArrayNode, optional)

## 错误

### 400 错误请求

返回表示错误请求的错误描述

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

### 401 未授权错误

返回表示访问问题的错误描述

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

### 403 禁止访问错误

返回表示访问问题的错误描述

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

### 500 内部服务器错误

返回表示内部服务器错误的错误描述

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

## 类型

### ArrayNode

## 示例

**响应**

```json
{
  "enumerationsType": "string",
  "formNumber": "string",
  "jsonData": {}
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/enumerations/enumerationType"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/enumerations/enumerationType';
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

	url := "https://localhost:5000/gw/api/v1/enumerations/enumerationType"

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

url = URI("https://localhost:5000/gw/api/v1/enumerations/enumerationType")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/enumerations/enumerationType")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/enumerations/enumerationType', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/enumerations/enumerationType");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/enumerations/enumerationType")! as URL,
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