# 查询你的账户

要查询用户可交易的账户列表,参见 `/iserver/accounts`。

## 查询单个账户的投资组合

在非分层账户结构中,`/portfolio/accounts` 端点返回用户可查看持仓和账户信息的账户列表。

在为这些账户调用其他 `/portfolio` 端点之前,必须先调用此端点。

要查询用户可交易的账户列表,参见 `/iserver/accounts`。对于分层账户结构(例如财务顾问或 ibroker 账户)中的子账户列表,参见 `/portfolio/subaccounts`。

示例请求:

`GET https://api.ibkr.com/v1/api/portfolio/accounts`

成功响应:

```[
  {
    "id": "U1234567",
    "PrepaidCrypto-Z": false,
    "PrepaidCrypto-P": false,
    "brokerageAccess": true,
    "accountId": "U1234567",
    "accountVan": "U1234567",
    "accountTitle": "",
    "displayName": "U1234567",
    "accountAlias": null,
    "accountStatus": 1644814800000,
    "currency": "USD",
    "type": "DEMO",
    "tradingType": "PMRGN",
    "businessType": "IB_PROSERVE",
    "ibEntity": "IBLLC-US",
    "faclient": false,
    "clearingStatus": "O",
    "covestor": false,
    "noClientTrading": false,
    "trackVirtualFXPortfolio": true,
    "parent": {
      "mmc": [],
      "accountId": "",
      "isMParent": false,
      "isMChild": false,
      "isMultiplex": false
    },
    "desc": "U1234567"
  }
]
```

## 查询多级账户结构

在多级账户结构(如财务顾问和 IBroker 账户)中,`/portfolio/subaccounts` 端点返回最多 100 个子账户的列表,用户可查看这些子账户的持仓和账户相关信息。如果你的子账户超过 100 个,请使用 `/portfolio/subaccounts2`。

在为这些子账户调用其他 `/portfolio` 端点之前,必须先调用此端点。

示例请求:

`GET https://api.ibkr.com/v1/api/portfolio/subaccounts`

成功响应:

```[
  {
    "id": "U1234567",
    "PrepaidCrypto-Z": false,
    "PrepaidCrypto-P": false,
    "brokerageAccess": false,
    "accountId": "U1234567",
    "accountVan": "U1234567",
    "accountTitle": "",
    "displayName": "U1234567",
    "accountAlias": null,
    "accountStatus": 1644814800000,
    "currency": "USD",
    "type": "DEMO",
    "tradingType": "PMRGN",
    "businessType": "IB_PROSERVE",
    "ibEntity": "IBLLC-US",
    "faclient": false,
    "clearingStatus": "O",
    "covestor": false,
    "noClientTrading": false,
    "trackVirtualFXPortfolio": true,
    "parent": {
      "mmc": [],
      "accountId": "",
      "isMParent": false,
      "isMChild": false,
      "isMultiplex": false
    },
    "desc": "U1234567"
  }
]
```

## 查询大型账户结构(超过 100 个账户)

`/portfolio/subaccounts2` 端点专门启用用于处理大型账户结构(超过 100 个账户),供财务顾问和 IBroker 查看多个账户的持仓。对于此类账户,应在查询其他 /portfolio 端点之前先使用 `/portfolio/subaccounts2` 端点。

`/portfolio/subaccounts2` 的独特之处在于其分页组件,可在所有账户排序的情况下改进筛选支持。`/portfolio/subaccounts2` 端点专门支持 `page` 和 `pageSize` 查询参数。默认情况下,该端点将返回第一页账户,每页包含 20 个账户。不过,用户可以使用 `pageSize` 查询参数请求每页最多 1000 个账户。

从 `/portfolio/subaccounts2` 端点返回的 `metadata` 对象将声明:

* `pageNum` - 当前查看的页码。
* `pageSize` - 请求每页显示的账户数量。
* `total` - 该结构中的账户总数。

根据上述细节,`total` 除以 `pageSize` 即为可用总页数,最小值为 0。

示例请求:

`GET https://api.ibkr.com/v1/api/portfolio/subaccounts?page=0&pageSize=1000`

成功响应:

```
'metadata': {
  'pageNum': 0, 
  'pageSize': 1000, 
  'total': 1
},
'subaccounts': [
  {
    "id": "U1234567",
    "PrepaidCrypto-Z": false,
    "PrepaidCrypto-P": false,
    "brokerageAccess": false,
    "accountId": "U1234567",
    "accountVan": "U1234567",
    "accountTitle": "",
    "displayName": "U1234567",
    "accountAlias": null,
    "accountStatus": 1644814800000,
    "currency": "USD",
    "type": "DEMO",
    "tradingType": "PMRGN",
    "businessType": "IB_PROSERVE",
    "ibEntity": "IBLLC-US",
    "faclient": false,
    "clearingStatus": "O",
    "covestor": false,
    "noClientTrading": false,
    "trackVirtualFXPortfolio": true,
    "parent": {
      "mmc": [],
      "accountId": "",
      "isMParent": false,
      "isMChild": false,
      "isMultiplex": false
    },
    "desc": "U1234567"
  }
]
```
