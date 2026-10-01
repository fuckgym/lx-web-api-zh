# 获取表格

GET https://localhost:5000/gw/api/v1/forms

获取表格**范围**：`accounts.read` OR `forms.read`**安全策略**：`HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/list-forms

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用你注册的私钥进行签名的 RS256 签名 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 查询参数

- `formNo` (list of long, optional)
- `getDocs` (string, optional)
- `fromDate` (string, optional)
- `toDate` (string, optional)
- `language` (string, optional)
- `projection` (enum, optional, default: NONE)
  - Allowed values: `PAYLOAD`, `DOCS`, `NONE`

## 响应

### 200

获取表格

- `error` (ErrorResponse, optional)
- `hasError` (boolean, optional)
- `errorDescription` (string, optional)
- `fileData` (FileData, optional)
- `formDetails` (list of FormDetails, optional)
- `timestamp` (datetime, optional)

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

### ErrorResponse

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### FileData

- `data` (FileDataData, optional)
- `name` (string, optional)

### FormDetails

- `formNumber` (long, optional)
- `sha1Checksum` (string, optional)
- `dateModified` (datetime, optional)
- `fileName` (string, optional)
- `language` (string, optional)
- `formName` (string, optional)
- `payload` (FormPayload, optional)
- `apiSupportedTask` (boolean, optional)
- `type` (string, optional)
- `action` (string, optional)
- `acceptableDocs` (list of string, optional)
- `questionnaire` (list of QuestionnaireResponse, optional)
- `error` (ErrorResponse, optional)
- `hasError` (boolean, optional)
- `errorDescription` (string, optional)
- `fileLength` (long, optional)

### FileDataData

### FormPayload

- `mimeType` (string, optional)
- `data` (string, optional)

### QuestionnaireResponse

- `questionId` (long, optional)
- `question` (string, optional)
- `isMandatoryToAnswer` (boolean, optional)
- `questionType` (string, optional)
- `answers` (list of AnswerResponse, optional)

### AnswerResponse

- `answerId` (long, optional)
- `answer` (string, optional)
- `dependentQuestionId` (long, optional)
- `dependentAnswerId` (long, optional)
- `multiAnswerDetail` (list of string, optional)

## 示例

**响应**

```json
{
  "error": {
    "status": 1,
    "error": "string",
    "message": "string"
  },
  "hasError": true,
  "errorDescription": "string",
  "fileData": {
    "data": {},
    "name": "string"
  },
  "formDetails": [
    {
      "formNumber": 1,
      "sha1Checksum": "string",
      "dateModified": "2024-01-15T09:30:00Z",
      "fileName": "string",
      "language": "string",
      "formName": "string",
      "payload": {
        "mimeType": "string",
        "data": "string"
      },
      "apiSupportedTask": true,
      "type": "string",
      "action": "string",
      "acceptableDocs": [
        "string"
      ],
      "questionnaire": [
        {
          "questionId": 1,
          "question": "string",
          "isMandatoryToAnswer": true,
          "questionType": "string",
          "answers": [
            {
              "answerId": 1,
              "answer": "string",
              "dependentQuestionId": 1,
              "dependentAnswerId": 1,
              "multiAnswerDetail": [
                "string"
              ]
            }
          ]
        }
      ],
      "error": {
        "status": 1,
        "error": "string",
        "message": "string"
      },
      "hasError": true,
      "errorDescription": "string",
      "fileLength": 1
    }
  ],
  "timestamp": "2024-01-15T09:30:00Z"
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/forms"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/forms';
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

	url := "https://localhost:5000/gw/api/v1/forms"

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

url = URI("https://localhost:5000/gw/api/v1/forms")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/forms")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/forms', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/forms");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/forms")! as URL,
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