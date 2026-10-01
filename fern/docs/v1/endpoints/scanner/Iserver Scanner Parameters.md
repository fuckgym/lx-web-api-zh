# Iserver 扫描器参数

返回一个 xml 文件,其中包含 Iserver 扫描器请求可发送的所有可用参数。

#### Abap

```abap
GET /iserver/scanner/params
```

#### Python

```python
request_url = f"{baseUrl}/iserver/scanner/params"
requests.get(url=request_url) 
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/scanner/params \
--request GET
```

#### 响应对象

**scan\_type\_list:** 对象列表数组。\
包含请求中用作扫描器 "type" 的所有值。\
\[\{\
**display\_name:** String。\
扫描器 "type" 的人类可读名称

**code:** String。\
市场扫描器请求中使用的值。

**instruments:** 字符串数组。\
返回该扫描器类型可搭配使用的所有品种。\
}]

**instrument\_list:** 对象数组。\
包含与扫描器请求字段 "instrument" 相关的所有值。\
\[\{\
**display\_name:** String。\
品种类型的人类可读表示。

**type:** String。\
市场扫描器请求中使用的值。

**filters:** 字符串数组。\
返回该品种类型独有的所有可用筛选条件组成的数组。\
}]

**filter\_list:** 对象数组。\
\[\{\
**group:** String。\
返回该请求所属的筛选条件组。

**display\_name:** String。\
返回筛选条件的人类可读标识符。

**code:** String。\
市场扫描器请求中使用的值。

**type:** String。\
返回请求中要使用的值的类型。\
它可以指示基于范围的值,或应当是单个值。\
}]

**location\_tree:** 对象数组。\
包含与市场扫描器请求的 location 字段相关的所有值。

**display\_name:** String。\
返回用于指定位置的总体品种类型。

**type:** String。\
返回市场扫描器品种类型值的代码值。

**locations:** 对象数组。\
\[\{\
**display\_name:** String。\
返回市场扫描器 location 值的人类可读值。

**type:** String。\
返回市场扫描器 location 值的代码值。

**locations:** Array。\
在此层级始终返回空数组。\
}]

]

```
{
  "scan_type_list":[
    {
      "display_name": "display_name",
      "code": "code",
      "instruments": []
    }
  ],
  "instrument_list":[ 
    {
      "display_name": "display_name",
      "type": "type",
      "filters": []
    }
  ],
  "filter_list":[
    {
      "group": "group",
      "display_name": "display_name",
      "code": "code",
      "type": "type"
    }
  ],
  "location_tree":[
    {
      "display_name": "display_name",
      "type": "type",
      "locations": [
        {
          "display_name": "display_name",
          "type": "type",
          "locations": []
        }
      ]
    }
  ]
}
```
