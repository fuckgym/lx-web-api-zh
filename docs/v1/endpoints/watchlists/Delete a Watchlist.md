# 删除自选列表

永久删除特定自选列表,该删除对所有平台生效。

`DELETE /iserver/watchlist`

#### 请求对象

**id:** String。必填\
包含您希望删除的自选列表 ID。

#### Python

```python
request_url = f"{baseUrl}/iserver/watchlist?id=1234"
requests.delete(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/watchlist?id=1234 \
--request DELETE
```

#### 响应对象

**Data:** Object。\
返回有关已删除自选列表的数据。

**deleted:** String。\
返回已删除自选列表的 ID。

**action:** String。\
始终返回 "context"。

**MID:** String。\
返回本次会话中 /iserver/watchlist 被调用次数的 ID。

```
{
  "data": {
    "deleted": "1234"
  },
  "action": "context",
  "MID": "2"
}
```
