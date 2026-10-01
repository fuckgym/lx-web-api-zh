# 接收经纪账户

返回用户拥有交易权限的账户列表、它们各自的别名（alias）以及当前选中的账户。注意，在修改订单或查询未结订单之前必须先调用此端点。

`GET /iserver/accounts`

#### 请求对象：

无需任何参数。

#### Python

```python
request_url = f"{baseUrl}/iserver/accounts" 
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/accounts \ 
--request GET
```

#### 响应对象：

**accounts:** 字符串数组。\
返回所有可访问的 accountId 组成的数组。

**acctProps:** JSON 对象。\
返回每个可访问账户的属性组成的 JSON 对象。

**hasChildAccounts:** bool。\
返回该账户是否存在子账户。

**supportsCashQty:** bool\
返回该账户是否可以使用现金数量（Cash Quantity）进行交易。

**supportsFractions:** bool。\
返回该账户是否可以提交零股（fractional share）订单。

**allowCustomerTime:** bool。\
返回该账户是否必须在订单中提交 "manualOrderTime"。\
若为 true，则**必须**包含 manualOrderTime。\
若为 false，则**不能**包含 manualOrderTime。

**aliases:** JSON 对象。\
返回该账户所有可用的别名。

**allowFeatures:** JSON 对象\
该账户允许使用的功能的 JSON。

**showGFIS:** bool。\
返回该账户是否可以访问市场数据。

**showEUCostReport:** bool。\
返回该账户是否可以查看欧盟成本报告（EU Cost Report）。

**allowFXConv:** bool。\
返回该账户是否可以兑换货币。

**allowFinancialLens:** bool。\
返回该账户是否可以访问 financial lens。

**allowMTA:** bool。\
返回该账户是否可以使用移动交易警报（mobile trading alerts）。

**allowTypeAhead:** bool。\
返回该账户是否可以在 Client Portal 中使用 Type-Ahead 支持。

**allowEventTrading:** bool。\
返回该账户是否可以使用 Event Trader。

**snapshotRefreshTimeout:** int。\
返回新数据的快照刷新超时窗口。

**liteUser:** bool。\
返回该账户是否为 IBKR Lite 用户。

**showWebNews:** bool。\
返回该账户是否可以通过网页使用新闻源。\
research: bool。

**debugPnl:** bool。\
返回该账户是否可以使用 debugPnl 端点。

**showTaxOpt:** bool。\
返回该账户是否可以使用税务优化器（Tax Optimizer）工具。

**showImpactDashboard:** bool。\
返回该账户是否可以查看 Impact Dashboard。

**allowDynAccount:** bool。\
返回该账户是否可以使用动态账户变更。

**allowCrypto:** bool。\
返回该账户是否可以交易加密货币。

**allowedAssetTypes:** bool。\
返回该账户可交易的资产类型列表。

**chartPeriods:** JSON 对象。\
返回所有可用证券类型的可用交易时段。

**groups:** 数组。\
返回关联群组（group）组成的数组。

**profiles:** 数组。\
返回关联配置（profile）组成的数组。

**selectedAccount:** 字符串。\
返回当前选中的账户。详见[切换账户](/web-api/v1/endpoints/accounts/switch-account)。

**serverInfo:** JSON 对象。\
返回关于 IBKR 会话的信息。与 Client Portal Gateway 无关。

**sessionId:** 字符串。\
返回当前会话 ID。

**isFT:** bool。\
返回零股交易（fractional trading）权限。

**isPaper:** bool。\
返回账户类型状态。

```
{
  "accounts": [
    "U1234567"
  ],
  "acctProps": {
    "U1234567": {
      "hasChildAccounts": false,
      "supportsCashQty": true,
      "noFXConv": false,
      "isProp": false,
      "supportsFractions": true,
      "allowCustomerTime": false
    }
  },
  "aliases": {
    "U1234567": "U1234567"
  },
  "allowFeatures": {
    "showGFIS": true,
    "showEUCostReport": false,
    "allowEventContract": true,
    "allowFXConv": true,
    "allowFinancialLens": false,
    "allowMTA": true,
    "allowTypeAhead": true,
    "allowEventTrading": true,
    "snapshotRefreshTimeout": 30,
    "liteUser": false,
    "showWebNews": true,
    "research": true,
    "debugPnl": true,
    "showTaxOpt": true,
    "showImpactDashboard": true,
    "allowDynAccount": false,
    "allowCrypto": false,
    "allowedAssetTypes": "STK,CRYPTO"
  },
  "chartPeriods": {
    "STK": [
      "*"
    ],
    "CRYPTO": [
      "*"
    ]
  },
  "groups": [],
  "profiles": [],
  "selectedAccount": "U1234567",
  "serverInfo": {
    "serverName": "JifN17091",
    "serverVersion": "Build 10.25.0p, Dec 5, 2023 5:48:12 PM"
  },
  "sessionId": "1234a5b.12345678",
  "isFT": false,
  "isPaper": false
}
```
