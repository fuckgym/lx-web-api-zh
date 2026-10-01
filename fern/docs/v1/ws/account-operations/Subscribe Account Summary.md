# 订阅账户摘要

#### 订阅账户摘要主题

###### 主题:

**ssd**\
订阅指定账户的账户摘要消息流。

###### 主题目标:

**accountId:** 必填。\
必须传入需要订阅其账户摘要数据的账户 ID。

###### 参数:

\{\
**keys:** 字符串数组。\
传入特定的账户摘要数据键,以仅接收与这些键相关的消息。打开订阅时不传入指定键,将传递包含所选账户各项值的账户摘要消息。\
示例值:"AccruedCash-S"、"ExcessLiquidity-S"

**fields:** 字符串数组。\
传入特定的账户摘要字段名,以过滤响应,使其仅包含所请求键的这些字段。打开订阅时不传入指定字段,将传递指定账户摘要键的所有可用数据点。\
示例值:"currency"、"monetaryValue"
}

```
ssd+DU1234567+{
    "keys":["AccruedCash-S","ExcessLiquidity-S"],
    "fields":["currency","monetaryValue"]
}
```

#### 账户摘要主题消息

\{\
**result:** JSON 对象数组,每个对象对应该账户的一个账户摘要值。\
\[\
\{\
**key:** String。\
账户摘要值的名称。\
始终返回。

**timestamp:** 数字(仅整数)。\
反映取值时间的时间戳。\
始终返回。

**value:** String。\
与该键关联的非货币值。可能包括日期、账户标题或其他相关信息。

**monetaryValue:** 数字。\
与该键关联的货币值。当键与定价或余额明细相关时返回。

**currency:** String。\
monetaryValue 所反映的货币。\
示例值:"USD"、"EUR"、"HKD"

**severity:** 数字(仅整数)。\
仅供内部使用。\
},\
…\
]\
}

```
{"result":[
    {
     "key":"key1",
     "currency":"currency", 
     "monetaryValue":monetaryValue, 
     "severity":0, 
     "timestamp":timestamp
    },
    {
     "key":"key2",
     "currency":"currency", 
     "value":value, 
     "severity":0, 
     "timestamp":timestamp
    },
]}
```
