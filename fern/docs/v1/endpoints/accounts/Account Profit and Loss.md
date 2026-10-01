# 账户盈亏

返回一个对象，其中包含所选账户及其模型(如有)的盈亏(PnL)。

`GET /iserver/account/pnl/partitioned`

#### 请求对象:

无需其他参数。

#### Python

```python
request_url = f"{baseUrl}/iserver/account/pnl/partitioned"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/pnl/partitioned \
--request GET
```

#### 响应对象:

**upnl** : JSON 对象。

指"updated PnL"(更新后的盈亏)。保存一个由键值对组成的账户盈亏明细 JSON 对象。

**\{accountId}.Core:** JSON 对象。

基于您当前账户或组模型的对象。

**rowType:** int。\
返回所返回账户的位置值。对于个人账户始终返回 1。

**dpl:** float。\
指定账户配置文件的每日盈亏。

**nl:** float。\
指定账户配置文件的净清算价值(Net Liquidity)。

**upl:** float。\
指定账户配置文件的未实现盈亏。

**el:** float。\
指定账户配置文件的超额流动性(Excess Liquidity)。

**mv:** float。\
指定账户配置文件的保证金价值。

```
{
  "upnl": {
    "U1234567.Core": {
      "rowType": 1,
      "dpl": 15.7,
      "nl": 10000.0,
      "upl": 607.0,
      "el": 10000.0,
      "mv": 0.0
    }
  }
}
```
