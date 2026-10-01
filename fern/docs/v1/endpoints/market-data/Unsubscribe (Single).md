# 取消订阅(单个)

取消给定 conid 的市场数据。

#### Abap

```abap
POST /iserver/marketdata/unsubscribe
```

#### Python

```python
request_url = f"{baseUrl}/iserver/marketdata/unsubscribe" 
json_content ={
  "conid":265598 
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/marketdata/unsubscribe \ 
--request POST
--data '{
  "conid":265598
}'
```

#### 响应对象

**success:** bool。\
返回您取消订阅请求的确认状态。true 响应表示市场数据订阅已成功取消。

```
{
  "success": true
}
```

#### 错误响应对象

当尝试取消订阅一个当前未打开的市场数据订阅时,将返回状态码 500 的响应。

**error:** String。\
返回消息为 unknown 的错误响应,表示用户没有该给定 conid 的现有数据订阅。

```
{
  "error": "unknown"
}
```
