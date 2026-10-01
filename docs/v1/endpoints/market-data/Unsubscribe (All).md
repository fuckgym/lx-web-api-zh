# 取消订阅(全部)

取消所有市场数据请求。若要取消特定 conid 的市场数据,请参见 /iserver/marketdata/\{conid}/unsubscribe。

#### Abap

```abap
GET /iserver/marketdata/unsubscribeall
```

#### Python

```python
request_url = f"{baseUrl}/iserver/marketdata/unsubscribeall"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/marketdata/unsubscribeall \ 
--request GET
```

#### 响应对象

**confirmed:** 字符串。\
返回你的取消订阅请求的确认状态。

```
{
  "unsubscribed": true
}
```
