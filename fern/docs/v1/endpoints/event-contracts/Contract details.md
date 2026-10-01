# 合约详情

提供特定事件二元期权（event binary options）的合约规则。

`GET /forecast/contract/details`

#### Request Object

###### Query Params

**conid:** Integer\
合约标识符

#### Python

```python
import requests

url = "{{base-url}}/forecast/contract/details?conid=767285167"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

#### Abap

```abap
curl --location --globoff '{{base-url}}/forecast/contract/details?conid=767285167'
```

#### Response Object

**conid\_yes:** Integer\
"yes" 合约的合约 ID

**conid\_no:** Integer\
"no" 合约的合约 ID

**question:** String\
合约问题（即"这会在该日期发生吗？"）

**side:** String\
"Y" 或 "N" —— yes 或 no 合约

**strike\_label:** String\
要显示的行权价标签

**strike:** Double\
合约行权价

**exchange:** String\
合约交易所

**expiration:** String\
合约到期日

**symbol:** String\
合约代码

**logo\_category:** String

**measured\_period:**

**market\_name:** String\
合约所属市场的名称

**unerlying\_conid:** Integer\
合约的标的资产

```
{
    "conid_yes": 767285167,
    "conid_no": 767285169,
    "question": "Will Stacey Abrams win the Georgia Democratic primary for governor in 2026?",
    "side": "Y",
    "strike_label": "Stacey Abrams",
    "strike": 1.0,
    "exchange": "FORECASTX",
    "expiration": "20260612",
    "symbol": "GPGAD",
    "category": "g7428",
    "logo_category": "g17467",
    "measured_period": "May19'26",
    "market_name": "Georgia Governor Democratic Primary",
    "underlying_conid": 766914406,
    "payout": 1.0
}
```
