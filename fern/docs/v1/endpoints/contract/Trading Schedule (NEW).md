# 交易时间表(NEW)

返回围绕当前交易日的共 6 天的交易时间表。非交易日(如节假日)不会返回。

`GET /contract/trading-schedule`

#### 请求对象

###### 查询参数

**conid:** *String。*必填\
提供要获取其交易时间表的合约标识符。

**exchange:** *String。*\
接受要从中获取数据的交易所。默认假定为主交易所。

#### Python

```python
request_url = f"{baseUrl}/contract/trading-schedule?conid=265598&exchange=ISLAND"
requests.get(url=requests_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/contract/trading-schedule?conid=265598&exchange=ISLAND \
--request GET
```

#### 响应对象

**exchange\_time\_zone:** String。\
返回交易所进行交易所在的时区。

**schedules:** Object。\
包含交易时间的计划(schedule)对象。\
\{\
**\{date}:** Array。\
由小时时段对象组成的数组,详述延长交易与标准交易。\
\[\
**extended\_hours:** Array。\
参考该交易时段的延长交易总时长。\
\{\
**cancel\_daily\_orders:** Boolean。\
决定 DAY 订单是否会在"收盘"时间之后被取消。

**closing:** Integer。\
交易所收盘的 Epoch 时间戳。

**opening:** Integer。\
交易所开盘的 Epoch 时间戳。\
}

**liquid\_hours:** Array。\
参考常规交易时段的可交易时间\
\{\
**closing:** Integer。\
交易所收盘的 Epoch 时间戳。

**opening:** Integer。\
交易所开盘的 Epoch 时间戳。\
}]}

```
{
  'exchange_time_zone': 'US/Central', 
  'schedules': {
    '20251218': {
      'extended_hours': [{
        'cancel_daily_orders': True,
        'closing': 1766095200,
        'opening': 1766012400}],
    'liquid_hours': [{
        'closing': 1766095200,
        'opening': 1766068200
    }]},
    '20251219': {
      'extended_hours': [{
        'cancel_daily_orders': True,
        'closing': 1766181600,
        'opening': 1766098800}],
    'liquid_hours': [{
        'closing': 1766181600,
        'opening': 1766154600
    }]},
    '20251222': {
      'extended_hours': [{
        'cancel_daily_orders': True,
        'closing': 1766440800,
        'opening': 1766358000}],
    'liquid_hours': [{
        'closing': 1766440800,
        'opening': 1766413800
    }]},
    '20251223': {
      'extended_hours': [{
        'cancel_daily_orders': True,
        'closing': 1766527200,
        'opening': 1766444400
		}],
    'liquid_hours': [{
        'closing': 1766527200,
        'opening': 1766500200
    }]},
    '20251224': {
      'extended_hours': [{
        'cancel_daily_orders': True,
        'closing': 1766600100,
        'opening': 1766530800}],
    'liquid_hours': [{
        'closing': 1766600100,
        'opening': 1766586600
    }]},
    '20251226': {
      'extended_hours': [{
        'cancel_daily_orders': True,
        'closing': 1766786400,
        'opening': 1766703600
    }]}	
  }
}
```
