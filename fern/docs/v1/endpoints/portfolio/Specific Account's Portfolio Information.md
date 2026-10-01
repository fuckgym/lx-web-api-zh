# 特定账户的投资组合信息

与此账户 ID 相关的账户信息端点 /portfolio/accounts 或 /portfolio/subaccounts 必须在此端点之前调用。

`GET /portfolio/{accountId}/meta`

#### 请求对象

###### 路径参数

**accountId:** String。必填\
指定要获取其投资组合信息的 AccountID。

#### Python

```python
request_url = f"{baseUrl}/portfolio/U1234567/meta"
requests.get(url=request_url) 
```

#### Abap

```abap
curl \
--url {{baseUrl}}/portfolio/U1234567/meta \
--request GET
```

#### 响应对象

**id:** String\
应下单的账户的账户 ID。

**accountId:** String\
应下单的账户的账户 ID。

**accountVan:** String\
应下单的账户的账户别名。

**accountTitle:** String\
账户标题

**displayName:** String\
应下单的账户的账户 ID。

**accountAlias:** String\
用户可自定义的账户别名。详情请参阅"配置账户别名"(Configure Account Alias)。

**accountStatus:** int。\
账户开立时的 Unix 时间。

**currency:** String\
账户的基础货币。

**type:** String\
账户类型

**tradingType:** String\
账户的交易结构。

**businessType:** String。\
返回账户的组织结构。

**ibEntity:** String。\
返回该账户所属的 Interactive Brokers 实体。

**faClient:** bool。\
该账户是否为财务顾问(Financial Advisor)的子账户。

**clearingStatus:** String\
账户的状态\
可能的取值:O:Open(已开立);P 或 N:Pending(待定);A:Abandoned(已放弃);R:Rejected(已拒绝);C:Closed(已关闭)。

**covestor:** bool。\
是否为 Covestor 账户

**noClientTrading:** bool。\
返回该客户账户是否可以交易。

**trackVirtualFXPortfolio:** bool。\
返回该账户是否跟踪 Virtual FX(虚拟外汇)。

**parent:** \{

**mmc:** 字符串数组。\
返回 Money Manager Client(资金管理人客户)账户。

**accountId:** String\
Money Manager Client 的账户编号

**isMParent:** bool。\
返回这是否为 Multiplex 父账户

**isMChild:** bool。\
返回这是否为 Multiplex 子账户

**isMultiplex:** bool。\
是否为 Multiplex 账户。此类账户模型中,个人账户为父账户,受管账户为子账户。

}\
**desc:** String\
返回账户描述。\
值格式:"accountId – accountAlias"
}]

```
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
```
