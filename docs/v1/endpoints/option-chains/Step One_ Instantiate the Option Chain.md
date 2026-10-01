# 第一步:实例化期权链

首先,用户必须先针对标的代码(symbol)调用 [/iserver/secdef/search endpoint](/web-api/v1/endpoints/contract/search-contract-by-symbol) 端点。每当用户不知道最终衍生品的 conId 时,后续所有步骤都需要执行此操作。

**即使您已经知道 conId 和到期日,在继续之前也必须始终调用该端点。**

#### Python

```python
request_url = f"{baseUrl}/iserver/secdef/search?symbol=SPX"
requests.get(url=request_url)
```

#### Abap

```abap
curl --insecure \
--url https://localhost:5000/v1/api/iserver/secdef/search?symbol=SPX \
--request GET
```

在响应中,我们可以看到返回了两个重要的值。第一个是标的的 ConID,即 416904,后续请求将需要用到它。

我们还可以在 "sections"::"secType":"OPT 下的 "months" 中看到所有合约到期月份。这将用于在下一个请求中构建我们的期权链。

```
[
  {
    "conid": "416904",
    "companyHeader": "S&P 500 Stock Index - CBOE",
    "companyName": "S&P 500 Stock Index",
    "symbol": "SPX",
    "description": "CBOE",
    "restricted": "IND",
    "sections": [
      {...},
      {
        "secType": "OPT",
        "months": "JAN24;FEB24;MAR24;APR24;MAY24;JUN24;JUL24;AUG24;SEP24;OCT24;NOV24;DEC24;JAN25;MAR25;JUN25;DEC25;DEC26;DEC27;DEC28;DEC29",
        "exchange": "SMART;CBOE;IBUSOPT"
      },
      {...}
    ]
  }
]
```
