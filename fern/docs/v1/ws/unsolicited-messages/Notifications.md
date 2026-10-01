# 通知

如果存在与交易活动相关的简短消息,将会发送主题(topic)为 ntf 的消息。

**topic:** String。\
返回该请求的主题。

**args:** Object。\
返回包含 pnl 数据的对象。

**id:** String。\
返回该特定通知的标识符。

**text:** String。\
返回该通知的正文文本。

**title:** String。\
返回该通知的标题或标题行。

**url:** String。\
如果相关,提供一个可供用户进一步了解该通知详情的 URL。

```
{
    "topic": "ntf",
    "args": {
        "id": "id",
        "text": "text",
        "title": "title",
        "url": "url"
    }
}
```
