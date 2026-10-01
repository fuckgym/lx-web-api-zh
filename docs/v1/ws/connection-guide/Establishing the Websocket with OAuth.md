# 通过 OAuth 建立 WebSocket 连接

对于使用 OAuth 进行身份验证的用户,流程大体相似,但略有不同。除了 API cookie 之外,您还必须包含 "oauth\_token" 查询参数,该参数应设置为用户的 access token 值。

#### Python

```python
ws = websocket.WebSocketApp(
  url="wss://api.ibkr.com/v1/api/ws?oauth_token={accessToken}",
  on_open=on_open,
  on_message=on_message,
  on_error=on_error,
  on_close=on_close,
  cookie=f"api={sessionToken}"
)
ws.run_forever()
```

#### 通用

```generic
curl -i -N -H "Connection: Upgrade" -H "Upgrade: websocket" -H "origin: interactivebrokers.github.io" --cookie "api=d21b8cf5ebc8ea01c6ce37c8125ec83f" wss://api.ibkr.com/v1/api/ws?oauth_token={Access Token}
```
