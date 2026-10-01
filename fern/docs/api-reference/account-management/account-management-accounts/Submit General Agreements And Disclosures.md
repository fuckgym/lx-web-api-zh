# 提交通用协议与披露

POST https://localhost:5000/gw/api/v1/accounts/documents
Content-Type: application/json

提供一种每天一次（而非随每个申请）向 IBKR 提交协议与披露的机制。我们将这些文档存储在服务器上，并将在当天提交的新申请请求中使用它们。文档需要每天提交一次（在提交申请之前）。PDF 将按原样显示和提交——不会对实际 PDF 文件做任何更改/编辑。该端点不会处理任何税务表格文档。税务表格文档应随每个申请一并提交。如果在上午提交，您只需为每个申请人附上税务表格附件；否则，您需要在每个申请（创建账户）中都附上 PDF。**范围**：`accounts.write`**安全策略**：`Signed JWT`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/create-accounts-documents

## 认证

- `Authorization` 请求头（bearer token，required）— 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙箱环境）

## 请求

### 请求体 (application/json)

该端点期望接收一个 ProcessDocumentsPayload。

- `processDocuments` (ProcessDocuments, optional)

## 响应

### 200

提交标准协议与披露

- `requestId` (long, optional)
- `problemDetail` (map from string to StatusResponseProblemDetail, optional)
- `dateSubmitted` (datetime, optional)
- `fileData` (FileData, optional)

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

### 422 无法处理的实体错误

请求因业务规则或验证错误而被系统拒绝。

- `requestId` (long, optional)
- `problemDetail` (map from string to StatusResponseProblemDetail, optional)
- `dateSubmitted` (datetime, optional)
- `fileData` (FileData, optional)

### 500 服务器内部错误

返回表示服务器内部错误的错误描述

- `type` (string, optional)
- `title` (string, optional)
- `status` (long, optional)
- `detail` (string, optional)
- `instance` (string, optional)

## 类型

### ProcessDocuments

- `documents` (list of Document, optional)
- `inputLanguage` (enum, optional)
  - Allowed values: `en`, `zh-Hans`, `ja`, `ru`, `fr`, `pt`, `es`, `it`, `ar-AE`, `de`, `he-IL`, `hu`
- `translation` (boolean, optional)

### StatusResponseProblemDetail

### FileData

- `data` (FileDataData, optional)
- `name` (string, optional)

### Document

- `attachedFile` (AttachedFileType, required)
- `formNumber` (long, required) — 所提交的 pendingTask 或文档的表单编号。
- `execLoginTimestamp` (long, required) — 会话的登录时间戳（客户登录并确认协议的时间）。
- `execTimestamp` (long, required) — 客户签署协议的执行时间戳（即客户签署协议的时间）。
- `signedBy` (list of string, optional) — signedBy 必须与所提交的内容匹配：姓名（名 + 中间名首字母（如适用）+ 姓）。\*数据区分大小写和空格。为以下端点提交文档时该对象为必填：客户注册：\[POST]: [https://api.ibkr.com/gw/api/v1/accounts](https://api.ibkr.com/gw/api/v1/accounts)更新账户信息：\[PATCH] [https://api.ibkr.com/gw/api/v1/account](https://api.ibkr.com/gw/api/v1/account)
- `validAddress` (boolean, optional) — 如果提供 Driver License 作为 proofOfIdentityType 且 validAddress=true，则单一文档可同时满足身份证明和地址证明。
- `documentType` (enum, optional) — 可接受的文档因 formNumber 而异。
  - Allowed values: `Check`, `Company Ownership`, `Divorce Settlement`, `Employer Confirmation`, `Entitlement to Payments`, `Letter`, `Ownership`, `Pay Slip`, `Proof of Sale`, `Proof of Winnings`, `Severance`, `Tax Return`, `Will`, `Bank Statement`, `Brokerage Statement`, `Current Lease`, `Financial Statement`, `Certificate of Incorporation/Formation`, `Certificate of Registratios`, `Company Charter`, `Certificate of Good Standing`, `Government-issued Business License`, `Corporate Charter`, `Articles of Incorporation`, `Bank Passbook/Statement`, `Certified Proof of Identity`, `Certified Proof of Address`, `Income Tax Return`, `Additional Proof of Identity Document`, `Proof of Principal Place of Business and Registration`, `Utility Bill`, `Evidence of Ownership of Property`, `Authorization to Open Account - Evidence`, `Authorization to Open Account - Certification`, `Italian Health Card (Tessera Sanitaria)`, `CRS card of Lombardy`, `Italian Electronic ID Card - CIE`, `Court- or Govt-issued document`, `Copy of Passport, National Id or Driver's License`, `Passport`, `National ID`
- `signature` (string, optional)
- `externalAccountId` (string, optional)
- `externalIndividualId` (string, optional) — 执行协议的个人在外部实体处的标识符。必须是申请中列出的个人。INDIVIDUAL（个人）申请中会被忽略，因为协议必须由账户持有人签署。对于通过 ECA 创建的 JOINT（联名）账户，提交 POI 和 POA 时必填。对于通过 ECA 创建的联名持有人，需要为正在提交 POI/POA 的账户持有人提供其外部 ID。
- `proofOfIdentityType` (enum, optional) — 为满足身份证明而提交的文档的描述。
  - Allowed values: `Driver License`, `Passport`, `Alien ID Card`, `National ID Card`, `Bank Statement`, `Evidence of Ownership of Property`, `Credit Card Statement`, `Utility Bill`, `Brokerage Statement`, `T4 Statement`, `CRA Assessment`, `Hong Kong and Macao Entry Permit`
- `expirationDate` (date, optional) — 身份证件的到期日。
- `proofOfAddressType` (enum, optional) — 为满足地址证明而提交的文档的描述。
  - Allowed values: `Driver License`, `Bank Statement`, `Brokerage Statement`, `Homeowner Insurance Policy Bill`, `Homeowner Insurance Policy Document`, `Renter Insurance Policy bill`, `Renter Insurance Policy Document`, `Security System Bill`, `Government Issued Letters`, `Utility Bill`, `Current Lease`, `Evidence of Ownership of Property`, `Other Document`
- `payload` (FilePayload, optional)

### FileDataData

### AttachedFileType

- `fileName` (string, required) — 提交给 IBKR 的 PDF 文档的文件名。documents 请求中包含的 fileName 必须与签名请求中包含的 PDF 文件的 fileName 一致。 • 可接受的格式：.jpeg、.jpg、.pdf、.png • 最大大小：10 MB
- `fileLength` (long, required) — PDF 表单的长度
- `sha1Checksum` (string, required) — SHA-1 是一种用于验证文件未被篡改的加密算法。其做法是在文件传输前生成一次校验和，然后在文件到达目的地后再次生成进行比对。

### FilePayload

- `mimeType` (string, required) — 文件的格式。
- `data` (string, required) — 包含以 base64 编码的文档。

## 示例

**请求**

```json
{}
```

**响应**

```json
{
  "requestId": 1,
  "dateSubmitted": "2024-01-15T09:30:00Z",
  "fileData": {
    "data": {},
    "name": "string"
  }
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/accounts/documents"

payload = {}
headers = {
    "Authorization": "Bearer <token>",
    "Content-Type": "application/json"
}

response = requests.post(url, json=payload, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/accounts/documents';
const options = {
  method: 'POST',
  headers: {Authorization: 'Bearer <token>', 'Content-Type': 'application/json'},
  body: '{}'
};

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
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/gw/api/v1/accounts/documents"

	payload := strings.NewReader("{}")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Authorization", "Bearer <token>")
	req.Header.Add("Content-Type", "application/json")

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

url = URI("https://localhost:5000/gw/api/v1/accounts/documents")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Authorization"] = 'Bearer <token>'
request["Content-Type"] = 'application/json'
request.body = "{}"

response = http.request(request)
puts response.read_body
```

```java
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.post("https://localhost:5000/gw/api/v1/accounts/documents")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/json")
  .body("{}")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('POST', 'https://localhost:5000/gw/api/v1/accounts/documents', [
  'body' => '{}',
  'headers' => [
    'Authorization' => 'Bearer <token>',
    'Content-Type' => 'application/json',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/accounts/documents");
var request = new RestRequest(Method.POST);
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Content-Type", "application/json");
request.AddParameter("application/json", "{}", ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = [
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
]
let parameters = [] as [String : Any]

let postData = JSONSerialization.data(withJSONObject: parameters, options: [])

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/accounts/documents")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "POST"
request.allHTTPHeaderFields = headers
request.httpBody = postData as Data

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