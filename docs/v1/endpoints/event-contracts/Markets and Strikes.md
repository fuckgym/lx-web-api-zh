# 市场与行权价

ForecastEx 预测合约被建模为期权或期货期权,具体取决于其所解析针对的事件。

由于它们是衍生品,因此始终针对某个标的(underlier)上市。目前,预测合约的标的要么是指数,要么是期货合约。这些标的有自己独立的合约 ID,与预测合约的合约 ID 分开。

这些标的合约 ID 可用于获取底层事件的相关历史数据集(如果可用)。例如,GT(全球温度)合约针对某个 GT 指数上市,该指数数据集是来自 NOAA 的历史全球温度数据。

在所有情况下,一个市场(Market)都有一个符号(symbol),与期权类似。示例:FF、HORC、USIP

预测合约与期权一样,具有行权价(strike)和到期时间(expiration)。行权价不一定是数值;例如,与选举相关的合约,其行权价将是候选人的姓名。`/contracts` 响应中的 strikeLabel 字段会提供这些字符串。

所有合约都有一个真正的到期时间(expiration),即上述的解析时间,在此之后合约被视为已解析并不复存在。

一个完整表述的问题(包括行权价和测量周期)被称为一个"strike"(行权)——类似于双边期权链表中的特定行权行。

每个这样的 strike 都关联两个合约:YES 和 NO。

IBKR 为给定 strike 的 YES 和 NO 合约分别分配独立的合约 ID。

沿用期权模型:YES 相当于看涨期权(Call),NO 相当于看跌期权(Put)。

对于每个合约:

* 问题的完整(规范)形式在 longDescription 字段中提供。
* 缩短的期权风格形式在 shortDescription 字段中提供。

请注意,YES 和 NO 合约各自拥有自己的买价/卖价/最新价数据。

提供给定标的市场下的所有合约。

`GET /forecast/contract/market`

#### 请求对象

###### 查询参数

**underlyingConid:** 整数\
合约市场的名称

**exchange:** 字符串

#### Python

```python
import requests

url = "{{base-url}}/forecast/contract/market?underlyingConid=766914406&exchange=FORECASTX"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

#### Abap

```abap
curl --location --globoff '{{base-url}}/forecast/contract/market?underlyingConid=766914406&exchange=FORECASTX'
```

#### 响应对象

**market\_name:** 字符串\
合约市场的名称

**exchange:** 字符串\
请求中传入的交易所

**symbol:** 字符串\
市场符号

**logo\_category:** 字符串

**exclude\_historical\_data:** 布尔值

**payout:**  Double

**contracts:** 列表

**conid:** 整数\
市场合约标识符

**side:** 字符串\
Y 或 N,表示 yes 合约或 no 合约

**expiration:** 字符串\
合约到期日期,YYYYMMDD 格式

**strike:** Double\
合约行权价

**strike\_label:** 字符串

**expiry\_label:** 字符串

**underlying\_conid**整数\
合约的标的资产

```
{
    "market_name": "Georgia Governor Democratic Primary",
    "exchange": "FORECASTX",
    "symbol": "GPGAD",
    "logo_category": "g17467",
    "exclude_historical_data": true,
    "payout": 1.0,
    "contracts": [
        {
            "conid": 767285167,
            "side": "Y",
            "expiration": "20260612",
            "strike": 1.0,
            "strike_label": "Stacey Abrams",
            "expiry_label": "2026",
            "underlying_conid": 766914406,
            "time_specifier": "2026.5.19"
        },
}
```
