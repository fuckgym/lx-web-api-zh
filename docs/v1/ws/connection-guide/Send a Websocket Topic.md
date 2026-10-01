# 发送 WebSocket 主题

建立会话后,您可以通过新建的 websocket 连接发送所需的任意主题。

```
on_open(ws):
    print("Opened Connection")
    time.sleep(3)
    ws.send('smd+265598+{"fields":["31","84","86"]}')
```

请注意,虽然 websocket 会话本身支持建立 websocket 连接,但 cURL 无法发送后续的主题请求。这需要借助第三方终端插件,或使用 Python、Java 等编程语言来实现。
