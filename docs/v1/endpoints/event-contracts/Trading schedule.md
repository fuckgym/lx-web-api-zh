# 交易时间表

提供合约的交易时间表

`GET /forecast/contract/schedules`

#### 请求对象

###### 查询参数

**conid:** 整数\
合约标识符

#### Python

```python
import requests

url = "{{base-url}}/forecast/contract/schedules?conid=767285167"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

#### Abap

```abap
curl --location --globoff '{{base-url}}/forecast/contract/schedules?conid=767285167'
```

#### 响应对象

**timezone:** 字符串\
交易所时区

**trading schedule:** 列表\
行权价列表

**day\_of\_week:** 字符串

**trading\_times:** 列表\
交易时间区间列表

**open:** 字符串\
交易区间的开始时间

**close:** 字符串\
交易区间的结束时间

```
{
    "timezone": "US/Central",
    "trading_schedules": [
        {
            "day_of_week": "Saturday",
            "trading_times": [
                {
                    "open": "12:00 AM",
                    "close": "4:15 PM"
                },
                {
                    "open": "4:16 PM",
                    "close": "11:59 PM"
                }
            ]
        },
        {
            "day_of_week": "Sunday",
            "trading_times": [
                {
                    "open": "12:00 AM",
                    "close": "4:15 PM"
                },
                {
                    "open": "4:16 PM",
                    "close": "11:59 PM"
                }
            ]
        },
}
```
