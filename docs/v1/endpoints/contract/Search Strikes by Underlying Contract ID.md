# 按标的 Contract ID 搜索行权价

查询以获取给定标的所支持的潜在行权价列表。

除非事先对同一标的代码调用过 [/iserver/secdef/search](/web-api/v1/endpoints/contract/search-contract-by-symbol),否则此端点将始终返回空数组。在 [/iserver/secdef/search](/web-api/v1/endpoints/contract/search-contract-by-symbol) 端点中包含 name 字段将导致 strikes 端点不返回数据。在通过初始搜索检索到预期合约之后,希望创建期权链的开发者应从请求中移除 name 字段。

`GET /iserver/secdef/strikes`

#### 请求对象

###### 查询参数

**conid:** *String。* 必填\
标的的合约标识符编号

**sectype:** *String。* 必填\
您所查找的衍生品的证券类型。\
值格式:"OPT" 或 "WAR"

**month:** *String。* 必填\
给定标的的到期月份和年份\
值格式:\{3 位月份}\{2 位年份}\
示例:AUG23

**exchange:** String。可选\
应从中检索衍生品的交易所。\
默认值设置为 SMART

#### Python

```python
request_url = f"{baseUrl}/iserver/secdef/strikes?conid=265598&sectype=OPT&month=JAN24&exchange=SMART"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/secdef/strikes?conid=265598&sectype=OPT&month=JAN24&exchange=SMART \
--request GET
```

响应对象

**call:** 浮点数数组\
包含一系列以逗号分隔的浮点值的数组,表示该工具的潜在看涨期权(Call)行权价。

**put:** 浮点数数组\
包含一系列以逗号分隔的浮点值的数组,表示该工具的潜在看跌期权(Put)行权价。

```
{
  "call":[
    185.0,
    190.0,
    195.0,
    200.0
  ],
  "put":[
    185.0,
    190.0,
    195.0,
    200.0
  ]
}
```
