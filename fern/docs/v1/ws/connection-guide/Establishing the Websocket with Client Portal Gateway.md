# 通过 Client Portal Gateway 建立 Websocket 连接

接下来,你需要构建你的 websocket,连接到 wss\://localhost:5000/v1/api/ws。在建立 websocket 的请求中,请务必将 cookie 头设置为 "api=\{'session' value here}"。

#### Python

```python
ws = websocket.WebSocketApp(
  url="wss://localhost:5000/v1/api/ws",
  on_open=on_open,
  on_message=on_message,
  on_error=on_error,
  on_close=on_close,
  cookie=f"api={sessionToken}"
)
ws.run_forever()
```

#### Generic

```generic
curl -i -k -N -H "Connection: Upgrade" -H "Upgrade: websocket" -H "origin: interactivebrokers.github.io" --cookie "api=d21b8cf5ebc8ea01c6ce37c8125ec83f" wss://localhost:5000/v1/api/ws
```
