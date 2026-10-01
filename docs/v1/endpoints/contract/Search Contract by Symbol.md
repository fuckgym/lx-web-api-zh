# 按符号搜索合约

按标的符号或公司名称搜索。返回其拥有的衍生品合约。在使用 /secdef/info 之前必须先调用此端点。

对于债券,请在 symbol 字段中输入债券族类型(family type),以获取 /iserver/secdef/info 端点中使用的 issuerID。

`GET /iserver/secdef/search`

#### 请求对象

###### 查询参数

**symbol:** 字符串。必填\
感兴趣的标的符号。如果将 'name' 设置为 true,也可以传入公司名称;或传入债券发行人类型以检索债券。

**name:** bool。\
确定 symbol 是公司名称还是股票代码。如果包含公司名称,则只会收到有限响应:conid、companyName、companyHeader 和 symbol。包含 name 字段将导致 [/iserver/secdef/strikes](/web-api/v1/endpoints/contract/search-strikes-by-underlying-contract-id) 端点无法返回数据。在获取到预期合约后,希望创建期权链的客户应从请求中移除 name 字段。

#### Python

```python
request_url = f"{baseUrl}/iserver/secdef/search?symbol=Interactive Brokers&name=true"
requests.get(url=request_url)
```

#### Abap

```abap
curl --insecure \
--url https://localhost:5000/v1/api/iserver/secdef/search?symbol=Interactive Brokers&name=true \
--request GET
```

#### 响应对象

**"conid":** 字符串。\
给定合约的 conid。

**"companyHeader":** 字符串。\
完整的公司名称及主交易所。

**"companyName":** 字符串。\
公司名称。

**"symbol":** 字符串。\
公司股票代码。

**"description":** 字符串。\
合约的主交易所。

**"restricted":** bool。\
返回该合约是否可供交易。

**"sections":** 对象数组

**"secType":** 字符串。\
给定合约的证券类型。

**"months":** 字符串。\
返回一个由分号分隔的日期字符串。\
取值格式:"JANYY;FEBYY;MARYY"

**"symbol":** 字符串。\
工具的符号。

**"exchange":** 字符串。\
返回一个由分号分隔的交易所字符串。\
取值格式:"EXCH;EXCH;EXCH"

债券特有\
**"issuers":** 对象数组\
包含每个债券发行人的 id 和 name 的对象数组。

**"id":** 字符串。\
给定合约的发行人 ID。

**"name":** 字符串。\
发行人名称。

**"bondid":** int。\
债券类型标识符。

**"conid":** 字符串。\
给定债券的合约 ID。

**"companyHeader":** 字符串。\
债券类型名称\
取值格式:"Corporate Fixed Income"

**"companyName":** null\
对于债券合约返回 'null'。

**"symbol":null**\
对于债券合约返回 'null'。

**"description":null**\
对于债券合约返回 'null'。

**"restricted":null**\
对于债券合约返回 'null'。

**"fop":null**\
对于债券合约返回 'null'。

**"opt":null**\
对于债券合约返回 'null'。

**"war":null**\
对于债券合约返回 'null'。

**"sections":** 对象数组\
在 Bonds 区段中仅返回 "secType":"BOND"。

```
[
  {
    "conid": "43645865",
    "companyHeader": "IBKR INTERACTIVE BROKERS GRO-CL A (NASDAQ) ",
    "companyName": "INTERACTIVE BROKERS GRO-CL A (NASDAQ)",
    "symbol": "IBKR",
    "description": null,
    "restricted": null,
    "sections": [],
    "secType": "STK"
  }
]
```
