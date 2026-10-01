# 第二步:查找潜在行权价

在查询 /iserver/secdef/search 端点之后,开发者现在应调用 [/iserver/secdef/strikes 端点](/web-api/v1/endpoints/contract/search-strikes-by-underlying-contract-id)。要接收相应的行权价,应指定 conId、secType 和到期月份。

**即使您已经知道行权价,在继续之前也必须始终调用此端点。**

注意事项:

* 对于期货期权,应指定指数(Index)的 conId,并明确指定其上市交易所。例如,CL 期货期权应将 "exchange=NYMEX" 作为附加查询参数指定。
* 包含 name 字段将导致 /iserver/secdef/strikes 端点不返回数据。在检索到预期合约之后,希望创建期权链的客户应从请求中移除 name 字段。

#### Python

```python
request_url = f"{baseUrl}/iserver/secdef/strikes?conid=416904&sectype=OPT&month=JAN25"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/secdef/strikes?conid=416904&secType=OPT&month=JAN25 \
--request GET
```

作为响应,将返回一个对象,其中包含所有看涨(Call)与看跌(Put)行权价的数组。这只会返回潜在的行权价。这并不一定表明。应使用我们的 /info 端点确认这些行权价,以确认该行权价是否有效。

注意:

* 除非事先对同一标的代码调用过 [/iserver/secdef/search](/web-api/v1/endpoints/contract/search-contract-by-symbol),否则此端点将始终返回空数组。在 [/iserver/secdef/search](/web-api/v1/endpoints/contract/search-contract-by-symbol) 端点中包含 name 字段将导致 strikes 端点不返回数据。在通过初始搜索检索到预期合约之后,希望创建期权链的开发者应从请求中移除 name 字段。

```
{
  "call": [
    200.0,
  {...},
    7800.0
  ],
  "put": [
    200.0,
  {...},
    7800.0
  ]
}
```
