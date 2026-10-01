# 获取所有自选列表

检索该账户所有可用自选列表的列表。

`GET /iserver/watchlists`

#### 请求对象:

###### Body 参数

**SC:** String。\
指定请求的范围。\
有效值:USER\_WATCHLIST

#### Python

```python
request_url = f"{baseUrl}/iserver/watchlist?SC=USER_WATCHLIST"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/watchlists?SC=USER_WATCHLIST \
--request GET
```

#### 响应对象

**data:** Object(对象)。\
包含有关自选列表的所有数据。\
\{\
**scanners\_only:** bool。\
显示系统当前是否仅展示扫描器。

**system\_lists:** 对象数组。\
返回所有由 IB 创建的自选列表。\
\[\{\
**is\_open:** bool。\
仅供内部使用。

**read\_only:** bool。\
返回该自选列表是否可编辑。

**name:** String。\
返回自选列表的可读名称。

**id:** String。\
返回自选列表的代码标识符。

**type:** String。\
返回自选列表类型。\
始终返回 "watchlist"。\
}],

**show\_scanners:** bool。\
返回是否显示扫描器。

**bulk\_delete:** bool。\
显示是否应删除这些自选列表。

**user\_lists:** 对象数组。\
返回所有可用的用户创建列表。\
\[\{\
**is\_open:** bool。\
仅供内部使用。

**read\_only:** bool。\
返回该自选列表是否可编辑。

**name:** String。\
返回自选列表的可读名称。

**id:** String。\
返回自选列表的代码标识符。

**type:** String。\
返回自选列表类型。\
始终返回 "watchlist"。\
}]\
},

**action:** String。\
仅供内部使用。\
返回 "content"。

**MID:** String。\
返回本次会话中该端点被请求的次数。\
}

```
{
  "data": {
    "scanners_only": false,
    "show_scanners": false,
    "bulk_delete": false,
    "user_lists": [
      {
        "is_open": false,
        "read_only": false,
        "name": "Test Watchlist",
        "modified": 1702581306241,
        "id": "1234",
        "type": "watchlist"
      }
    ]
  },
  "action": "content",
  "MID": "1"
}
```
