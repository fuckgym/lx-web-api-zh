# 获取账户信息

GET https://localhost:5000/gw/api/v1/accounts/{accountId}/details

**作用域**: `accounts.read`**安全策略**: `HTTPS`

参考：https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/get-accounts-details

## 认证

- `Authorization` 请求头（bearer token, required）— 使用您注册的私钥签名的 RS256 JWT 访问令牌。

## 服务器

- `https://localhost:5000` (Client Portal Gateway, 默认)
- `https://api.ibkr.com` (生产环境)
- `https://qa.interactivebrokers.com` (沙箱)

## 请求

### 路径参数

- `accountId` (string, required)

## 响应

### 200

查看与账户关联的信息，包括联系数据、财务信息和交易配置。

- `error` (ErrorResponse, optional)
- `hasError` (boolean, optional)
- `errorDescription` (string, optional)
- `account` (AccountData, optional)
- `associatedPersons` (list of AssociatedPerson, optional)
- `associatedEntities` (list of AssociatedEntity, optional)
- `withHoldingStatement` (map from string to string, optional)
- `marketData` (list of map from string to string, optional)
- `financialInformation` (map from string to AccountDetailsResponseFinancialInformation, optional)
- `sourcesOfWealth` (list of map from string to AccountDetailsResponseSourcesOfWealthItems, optional)
- `tradeBundles` (list of string, optional)
- `individualIRABeneficiaries` (list of IndividualIRABene, optional)
- `entityIRABeneficiaries` (list of EntityIRABene, optional)
- `decedents` (list of map from string to string, optional)
- `restrictions` (list of RestrictionInfo, optional)

## 错误

### 400 错误请求错误

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

### 500 服务器内部错误

返回表示服务器内部错误的错误描述

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

### AccountData

- `accountId` (string, optional)
- `masterAccountId` (string, optional)
- `mainAccount` (string, optional)
- `sourceAccountId` (string, optional)
- `primaryUser` (string, optional)
- `clearingStatus` (string, optional)
- `clearingStatusDescription` (string, optional)
- `stateCode` (string, optional)
- `optionLevel` (long, optional)
- `baseCurrency` (string, optional)
- `dateBegun` (datetime, optional)
- `dateApproved` (datetime, optional)
- `dateOpened` (datetime, optional)
- `dateFunded` (datetime, optional)
- `dateClosed` (datetime, optional)
- `dateLinked` (datetime, optional)
- `dateDelinked` (datetime, optional)
- `accountTitle` (string, optional)
- `officialTitle` (string, optional)
- `accountAlias` (string, optional)
- `emailAddress` (string, optional)
- `margin` (string, optional)
- `applicantType` (string, optional)
- `subType` (string, optional)
- `stockYieldProgram` (map from string to string, optional)
- `feeTemplate` (map from string to string, optional)
- `capabilities` (map from string to list of string, optional)
- `limitedOptionTrading` (string, optional)
- `investmentObjectives` (list of string, optional)
- `dividendReinvestment` (map from string to boolean, optional)
- `externalId` (string, optional)
- `mifidCategory` (string, optional)
- `mifirStatus` (string, optional)
- `equity` (double, optional)
- `household` (string, optional)
- `propertyProfile` (string, optional)
- `processType` (string, optional)
- `riskScore` (long, optional)
- `class_action_program` (string, optional)
- `trustType` (string, optional)
- `orgType` (string, optional)
- `businessDescription` (string, optional)
- `usTaxPurposeType` (string, optional)
- `tradeIntentionType` (string, optional)
- `registeredAddress` (map from string to string, optional)
- `mailing` (map from string to string, optional)
- `countryOfCorporation` (string, optional)
- `lei` (string, optional)
- `taxIds` (list of map from string to string, optional)
- `taxTreatyDetails` (list of map from string to string, optional)
- `signatures` (list of string, optional)

### AssociatedPerson

- `entityId` (long, optional)
- `externalCode` (string, optional)
- `firstName` (string, optional)
- `middleName` (string, optional)
- `middleInitial` (string, optional)
- `lastName` (string, optional)
- `suffix` (string, optional)
- `username` (string, optional)
- `passwordDate` (string, optional)
- `userStatus` (string, optional)
- `userStatusTrading` (string, optional)
- `lastLogin` (string, optional)
- `gender` (string, optional)
- `maritalStatus` (string, optional)
- `salutation` (string, optional)
- `ownershipPercentage` (double, optional)
- `email` (string, optional)
- `countryOfCitizenship` (string, optional)
- `countryOfBirth` (string, optional)
- `dateOfBirth` (string, optional)
- `motersMaidenName` (string, optional)
- `numberOfDependents` (long, optional)
- `securityDevice` (string, optional)
- `commercial` (string, optional)
- `countryOfLegalResidence` (string, optional)
- `stateOfLegalResidence` (string, optional)
- `mdSubscriberStatus` (string, optional)
- `phones` (map from string to string, optional)
- `residence` (map from string to string, optional)
- `mailing` (map from string to string, optional)
- `associations` (list of string, optional)
- `identityDocuments` (list of map from string to string, optional)
- `employmentType` (string, optional)
- `employmentDetails` (map from string to AssociatedPersonEmploymentDetails, optional)
- `subscribedServices` (list of map from string to AssociatedPersonSubscribedServicesItems, optional)
- `taxTreatyDetails` (list of map from string to string, optional)

### AssociatedEntity

- `entityId` (long, optional)
- `externalCode` (string, optional)
- `name` (string, optional)
- `email` (string, optional)
- `organizationCountry` (string, optional)
- `phones` (map from string to string, optional)
- `residence` (map from string to string, optional)
- `mailing` (map from string to string, optional)
- `associations` (list of string, optional)
- `identityDocuments` (list of map from string to string, optional)
- `taxTreatyDetails` (list of map from string to string, optional)
- `AssociatedPersons` (list of AssociatedPerson, optional)

### AccountDetailsResponseFinancialInformation

### AccountDetailsResponseSourcesOfWealthItems

### IndividualIRABene

- `firstName` (string, optional)
- `lastName` (string, optional)
- `dateOfBirth` (string, optional)
- `type` (string, optional)
- `identification` (map from string to string, optional)
- `location` (map from string to string, optional)
- `relationship` (string, optional)
- `ownership` (long, optional)
- `perStripes` (string, optional)

### EntityIRABene

- `name` (string, optional)
- `entityType` (string, optional)
- `type` (string, optional)
- `location` (map from string to string, optional)
- `articleOfWill` (string, optional)

### RestrictionInfo

- `id` (long, optional)
- `byIB` (boolean, optional)
- `name` (string, optional)

### AssociatedPersonEmploymentDetails

### AssociatedPersonSubscribedServicesItems

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
  "account": {
    "accountId": "string",
    "masterAccountId": "string",
    "mainAccount": "string",
    "sourceAccountId": "string",
    "primaryUser": "string",
    "clearingStatus": "string",
    "clearingStatusDescription": "string",
    "stateCode": "string",
    "optionLevel": 1,
    "baseCurrency": "string",
    "dateBegun": "2024-01-15T09:30:00Z",
    "dateApproved": "2024-01-15T09:30:00Z",
    "dateOpened": "2024-01-15T09:30:00Z",
    "dateFunded": "2024-01-15T09:30:00Z",
    "dateClosed": "2024-01-15T09:30:00Z",
    "dateLinked": "2024-01-15T09:30:00Z",
    "dateDelinked": "2024-01-15T09:30:00Z",
    "accountTitle": "string",
    "officialTitle": "string",
    "accountAlias": "string",
    "emailAddress": "string",
    "margin": "string",
    "applicantType": "string",
    "subType": "string",
    "stockYieldProgram": {},
    "feeTemplate": {},
    "capabilities": {},
    "limitedOptionTrading": "string",
    "investmentObjectives": [
      "string"
    ],
    "dividendReinvestment": {},
    "externalId": "string",
    "mifidCategory": "string",
    "mifirStatus": "string",
    "equity": 1.1,
    "household": "string",
    "propertyProfile": "string",
    "processType": "string",
    "riskScore": 1,
    "class_action_program": "string",
    "trustType": "string",
    "orgType": "string",
    "businessDescription": "string",
    "usTaxPurposeType": "string",
    "tradeIntentionType": "string",
    "registeredAddress": {},
    "mailing": {},
    "countryOfCorporation": "string",
    "lei": "string",
    "taxIds": [
      {}
    ],
    "taxTreatyDetails": [
      {}
    ],
    "signatures": [
      "string"
    ]
  },
  "associatedPersons": [
    {
      "entityId": 1,
      "externalCode": "string",
      "firstName": "string",
      "middleName": "string",
      "middleInitial": "string",
      "lastName": "string",
      "suffix": "string",
      "username": "string",
      "passwordDate": "string",
      "userStatus": "string",
      "userStatusTrading": "string",
      "lastLogin": "string",
      "gender": "string",
      "maritalStatus": "string",
      "salutation": "string",
      "ownershipPercentage": 1.1,
      "email": "string",
      "countryOfCitizenship": "string",
      "countryOfBirth": "string",
      "dateOfBirth": "string",
      "motersMaidenName": "string",
      "numberOfDependents": 1,
      "securityDevice": "string",
      "commercial": "string",
      "countryOfLegalResidence": "string",
      "stateOfLegalResidence": "string",
      "mdSubscriberStatus": "string",
      "phones": {},
      "residence": {},
      "mailing": {},
      "associations": [
        "string"
      ],
      "identityDocuments": [
        {}
      ],
      "employmentType": "string",
      "employmentDetails": {},
      "subscribedServices": [
        {}
      ],
      "taxTreatyDetails": [
        {}
      ]
    }
  ],
  "associatedEntities": [
    {
      "entityId": 1,
      "externalCode": "string",
      "name": "string",
      "email": "string",
      "organizationCountry": "string",
      "phones": {},
      "residence": {},
      "mailing": {},
      "associations": [
        "string"
      ],
      "identityDocuments": [
        {}
      ],
      "taxTreatyDetails": [
        {}
      ],
      "AssociatedPersons": [
        {
          "entityId": 1,
          "externalCode": "string",
          "firstName": "string",
          "middleName": "string",
          "middleInitial": "string",
          "lastName": "string",
          "suffix": "string",
          "username": "string",
          "passwordDate": "string",
          "userStatus": "string",
          "userStatusTrading": "string",
          "lastLogin": "string",
          "gender": "string",
          "maritalStatus": "string",
          "salutation": "string",
          "ownershipPercentage": 1.1,
          "email": "string",
          "countryOfCitizenship": "string",
          "countryOfBirth": "string",
          "dateOfBirth": "string",
          "motersMaidenName": "string",
          "numberOfDependents": 1,
          "securityDevice": "string",
          "commercial": "string",
          "countryOfLegalResidence": "string",
          "stateOfLegalResidence": "string",
          "mdSubscriberStatus": "string",
          "phones": {},
          "residence": {},
          "mailing": {},
          "associations": [
            "string"
          ],
          "identityDocuments": [
            {}
          ],
          "employmentType": "string",
          "employmentDetails": {},
          "subscribedServices": [
            {}
          ],
          "taxTreatyDetails": [
            {}
          ]
        }
      ]
    }
  ],
  "withHoldingStatement": {},
  "marketData": [
    {}
  ],
  "financialInformation": {},
  "sourcesOfWealth": [
    {}
  ],
  "tradeBundles": [
    "string"
  ],
  "individualIRABeneficiaries": [
    {
      "firstName": "string",
      "lastName": "string",
      "dateOfBirth": "string",
      "type": "string",
      "identification": {},
      "location": {},
      "relationship": "string",
      "ownership": 1,
      "perStripes": "string"
    }
  ],
  "entityIRABeneficiaries": [
    {
      "name": "string",
      "entityType": "string",
      "type": "string",
      "location": {},
      "articleOfWill": "string"
    }
  ],
  "decedents": [
    {}
  ],
  "restrictions": [
    {
      "id": 1,
      "byIB": true,
      "name": "string"
    }
  ]
}
```

**SDK 代码**

```python
import requests

url = "https://localhost:5000/gw/api/v1/accounts/accountId/details"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript
const url = 'https://localhost:5000/gw/api/v1/accounts/accountId/details';
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

	url := "https://localhost:5000/gw/api/v1/accounts/accountId/details"

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

url = URI("https://localhost:5000/gw/api/v1/accounts/accountId/details")

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

HttpResponse<String> response = Unirest.get("https://localhost:5000/gw/api/v1/accounts/accountId/details")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/gw/api/v1/accounts/accountId/details', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp
using RestSharp;

var client = new RestClient("https://localhost:5000/gw/api/v1/accounts/accountId/details");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/gw/api/v1/accounts/accountId/details")! as URL,
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