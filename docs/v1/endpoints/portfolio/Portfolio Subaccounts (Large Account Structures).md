# 投资组合子账户（大型账户结构）

用于分层账户结构（如财务顾问（Financial Advisor）账户和 IBroker 账户），返回用户可查看持仓及账户相关信息的子账户列表，每页最多分页显示 20 个账户。在为这些子账户调用其他 /portfolio 端点之前，必须先调用此端点。如果您的子账户少于 100 个，请使用 /portfolio/subaccounts。要查询用户可以交易的账户列表，请参见 /iserver/accounts。

`GET /portfolio/subaccounts2`

#### 请求对象

**page:** String。必填\
指明应检索的页面标识符。\
分页从第 0 页开始。\
每页返回 20 个账户。

#### Python

```python
request_url = f"{baseUrl}/portfolio/subaccounts2?page=0"
requests.get(url=request_url) 
```

#### Abap

```abap
curl \
--url {{baseUrl}}/portfolio/subaccounts2?page=0 \
--request GET
```

#### 响应对象

**metadata:** Object。\
包含响应数据的元数据。\
\{\
**total:** int。\
显示返回的账户总数。

**pageSize:** int。\
返回页面大小。

**pageNum:** int。\
返回请求的页码或页面标识符。

**subaccounts:** 对象数组。\
包含所有账户及其各自的数据。\
\[\{\
**id:** String\
应由哪个账户下单的账户 ID。

**accountId:** String\
应由哪个账户下单的账户 ID。

**accountVan:** String\
应由哪个账户下单的账户别名。

**accountTitle:** String\
账户的标题。

**displayName:** String\
应由哪个账户下单的账户 ID。

**accountAlias:** String\
用户可自定义的账户别名。详情请参阅配置账户别名（Configure Account Alias）。

**accountStatus:** int。\
账户以 unix 时间表示的开户时间。

**currency:** String\
账户的基础货币。

**type:** String\
账户类型。

**tradingType:** String\
账户的交易结构。

**businessType:** String。\
返回账户的组织结构。

**ibEntity:** String。\
返回该账户所属的 Interactive Brokers 实体。

**faClient:** bool。\
该账户是否为财务顾问（Financial Advisor）的子账户。

**clearingStatus:** String\
账户的清算状态\
可能的取值：O: Open（开放）; P 或 N: Pending（待定）; A: Abandoned（放弃）; R: Rejected（拒绝）; C: Closed（关闭）。

**covestor:** bool。\
是否为 Covestor 账户。

**noClientTrading:** bool。\
返回客户账户是否可以交易。

**trackVirtualFXPortfolio:** bool。\
返回该账户是否跟踪 Virtual FX。

**parent:** \{

**mmc:** 字符串数组。\
返回资金经理客户账户（Money Manager Client Account）。

**accountId:** String\
资金经理客户的账号。

**isMParent:** bool。\
返回这是否为多路复用父账户（Multiplex Parent Account）。

**isMChild:** bool。\
返回这是否为多路复用子账户（Multiplex Child Account）。

**isMultiplex:** bool。\
是否为多路复用账户（Multiplex Account）。此类账户模型中，个人账户为父账户，管理账户为子账户。

}\
**desc:** String\
返回账户描述。\
值格式："accountId – accountAlias"\
}]

```
[
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
