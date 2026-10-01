# 投资组合账户

在非分层账户结构中,返回用户可查看持仓和账户信息的账户列表。在为这些账户调用其他 /portfolio 端点之前,必须先调用此端点。要查询用户可交易的账户列表,请参见 /iserver/accounts。要获取分层账户结构(如财务顾问或 IBroker 账户)中的子账户列表,请参见 /portfolio/subaccounts。

`GET /portfolio/accounts`

#### 请求对象

不应发送任何参数或请求体内容。

#### Python

```python
request_url = f"{baseUrl}/portfolio/accounts"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/portfolio/accounts \
--request GET
```

#### 响应对象

**id:** 字符串\
应下单的账户的账户 ID。

**accountId:** 字符串\
应下单的账户的账户 ID。

**accountVan:** 字符串\
应下单的账户的账户别名。

**accountTitle:** 字符串\
账户标题

**displayName:** 字符串\
应下单的账户的账户 ID。

**accountAlias:** 字符串\
用户可自定义的账户别名。详情请参阅"配置账户别名"(Configure Account Alias)。

**accountStatus:** int。\
账户以 Unix 时间表示的开户时间。

**currency:** 字符串\
账户的基础货币。

**type:** 字符串\
账户类型

**tradingType:** 字符串\
账户交易结构。

**businessType:** 字符串。\
返回账户的组织结构。

**ibEntity:** 字符串。\
返回账户所关联的 Interactive Brokers 实体。

**faClient:** bool。\
账户是否为财务顾问的子账户。

**clearingStatus:** 字符串\
账户状态\
可能的取值:O:已开户(Open);P 或 N:待定(Pending);A:已放弃(Abandoned);R:已拒绝(Rejected);C:已关闭(Closed)。

**covestor:** bool。\
是否为 Covestor 账户

**noClientTrading:** bool。\
返回客户账户是否可以交易。

**trackVirtualFXPortfolio:** bool。\
返回该账户是否跟踪 Virtual FX。

**parent:** \{

**mmc:** 字符串数组。\
返回资金经理客户账户(Money Manager Client Account)。

**accountId:** 字符串\
资金经理客户的账号

**isMParent:** bool。\
返回这是否为多路复用父账户(Multiplex Parent Account)

**isMChild:** bool。\
返回这是否为多路复用子账户(Multiplex Child Account)

**isMultiplex:** bool。\
是否为多路复用账户(Multiplex Account)。这类账户模型中,个人账户为父账户,管理账户为子账户。

}\
**desc:** 字符串\
返回账户描述。\
取值格式:"accountId – accountAlias"\
}]

```
[
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
