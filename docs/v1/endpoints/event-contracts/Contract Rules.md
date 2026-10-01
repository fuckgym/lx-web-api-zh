# 合约规则

提供特定二元期权的合约规则。

`GET /forecast/contract/rules`

#### 请求对象

###### 查询参数

**conid:** Integer(整数)\
合约标识符

#### Python

```python
import requests

url = "{{base-url}}/forecast/contract/rules?conid=767285167"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

#### Abap

```abap
curl --location --globoff '{{base-url}}/forecast/contract/rules?conid=767285167'
```

#### 响应对象

**asset\_class:** String\
产品资产类别

**description:** String\
产品描述

**market\_name:** String\
合约所属市场的名称

**measured\_period:** String

**threshold:** String\
视合约而定,为行权价(strike)或行权价标签(strike label)

**source\_agency:** String\
数据来源机构的名称

**data\_and\_resolution\_link:** String\
指向来源机构数据的链接

**last\_trade\_time:**  Long\
最后交易时间(EPOCH 格式)

**product\_code:** String\
产品代码,符号

**market\_rules\_link:** String\
指向市场规则文档的链接

**release\_time:** Long\
发布时间(EPOCH 秒)

**payout\_time:** Long\
赔付时间(EPOCH 秒)

**payout:** String\
格式化后的赔付金额

**price\_increment:** String\
格式化后的价格增量

**exchange\_timezone:** String\
交易所时区

```
{
    "asset_class": "OPT",
    "description": "The Georgia Democratic Gubernatorial Primary determines the party nominee for governor, shaping state leadership and national political influence.",
    "market_name": "Georgia Governor Democratic Primary",
    "measured_period": "May19'26",
    "threshold": "Stacey Abrams",
    "source_agency": "Georgia Secretary of State Elections Division",
    "data_and_resolution_link": "https://sos.ga.gov/index.php/elections",
    "last_trade_time": 1781301540,
    "product_code": "GPGAD",
    "market_rules_link": "https://data.forecastex.com/regulatory/GPTermsandConditions.pdf",
    "release_time": 1781301540,
    "payout_time": 1781373600,
    "payout": "$1.00",
    "price_increment": "$0.01",
    "exchange_timezone": "US/Central"
}
```
