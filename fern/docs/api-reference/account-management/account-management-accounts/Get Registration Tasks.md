# 获取注册任务

GET https://localhost:5000/gw/api/v1/accounts/{accountId}/tasks

查询分配给账户的注册任务以及账户审批所需的待办任务**范围**：`accounts.read`**安全策略**：`HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/get-accounts-tasks

## 认证

- `Authorization` 请求头 (bearer token, required) — 使用你注册的私钥进行签名的 RS256 签名 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, default)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙盒环境)

## 请求

### 路径参数

- `accountId` (string, required)

### 查询参数

- `type` (enum, optional, default: registration)
  - Allowed values: `pending`, `registration`

## 响应

### 200

查询分配给账户的注册任务以及账户审批所需的待办任务

- `Account Management Accounts_getAccountsTasks_Response_200`

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

### RegistrationTasksResponse

- `registrationTaskPresent` (boolean, optional)
- `empty` (boolean, optional)
- `error` (ErrorResponse, optional)
- `hasError` (boolean, optional)
- `errorDescription` (string, optional)
- `accountId` (string, optional)
- `status` (string, optional)
- `description` (string, optional)
- `state` (string, optional)
- `registrationTasks` (list of RegistrationTask, optional)

### PendingTasksResponse

- `empty` (boolean, optional)
- `error` (ErrorResponse, optional)
- `hasError` (boolean, optional)
- `errorDescription` (string, optional)
- `accountId` (string, optional)
- `status` (string, optional)
- `description` (string, optional)
- `state` (string, optional)
- `pendingTasks` (list of PendingTask, optional)
- `pendingTaskPresent` (boolean, optional)

### ErrorResponse

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### RegistrationTask

- `externalId` (string, optional)
- `formNumber` (long, optional)
- `formName` (string, optional)
- `action` (string, optional)
- `dateCompleted` (datetime, optional)
- `state` (string, optional)
- `questionIds` (list of long, optional)
- `warning` (string, optional)
- `isRequiredForApproval` (boolean, optional)
- `isCompleted` (boolean, optional)
- `isDeclined` (boolean, optional)

### PendingTask

- `taskNumber` (long, optional)
- `formNumber` (long, optional)
- `formName` (string, optional)
- `action` (string, optional)
- `externalId` (string, optional)
- `state` (string, optional)
- `documentRejectReason` (list of string, optional)
- `url` (string, optional)
- `startDate` (datetime, optional)
- `au10tixCreatedDate` (datetime, optional)
- `au10tixExpiryDate` (datetime, optional)
- `entityId` (long, optional)
- `onlineTask` (boolean, optional)
- `requiredForApproval` (boolean, optional)
- `requiredForTrading` (boolean, optional)
- `questionIds` (list of long, optional)

## 示例

**响应**

```json
{
  "accountId": "string",
  "description": "string",
  "empty": true,
  "error": {
    "error": "string",
    "message": "string",
    "status": 1
  },
  "errorDescription": "string",
  "hasError": true,
  "registrationTaskPresent": true,
  "registrationTasks": [
    {
      "action": "string",
      "dateCompleted": "2024-01-15T09:30:00Z",
      "externalId": "string",
      "formName": "string",
      "formNumber": 1,
      "isCompleted": true,
      "isDeclined": true,
      "isRequiredForApproval": true,
      "questionIds": [
        1
      ],
      "state": "string",
      "warning": "string"
    }
  ],
  "state": "string",
  "status": "string"
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/accounts/accountId/tasks"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/accounts/accountId/tasks';
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

	url := "https://localhost:5000/gw/api/v1/accounts/accountId/tasks"

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

url = URI("https://localhost:5000/gw/api/v1/accounts/accountId/tasks")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/accounts/accountId/tasks")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/accounts/accountId/tasks', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/accounts/accountId/tasks");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/accounts/accountId/tasks")! as URL,
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