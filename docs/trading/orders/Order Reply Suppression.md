# 订单回复抑制

对订单票(order ticket)提交的以下响应表明,在订单被接受之前,我们必须确认订单票的某些方面:

```[
  {
    "id": "07a13a5a-4a48-44a5-bb25-5ab37b79186c",
    "message": [
      "The following order \"BUY 100 AAPL NASDAQ.NMS @ 165.0\" price exceeds \nthe Percentage constraint of 3%.\nAre you sure you want to submit this order?"
    ],
    "isSuppressed": false,
    "messageIds": [
      "o163"
    ]
  }
]
```

我们将这些消息称为"订单回复消息(order reply messages)"。

`"messageIds"` 数组包含对我们收到的订单回复消息类型进行分类的标识符。在本例中,我们收到了 `"messageIds": ["o163"]`。

某些类型的订单回复消息可以在您的用户名当前 Web API 经纪会话期间被抑制。

当某一类订单回复消息被抑制后,系统将不再向您发送需要确认的订单回复消息响应。取而代之,有效的订单票将被立即接受并确认,无效的订单票将被拒绝。

`/iserver/questions/suppress` 端点提供了这种抑制机制。您可以 `POST` 一个 `messageIds` 数组,以在 Web API 经纪会话的剩余时间内抑制这些订单消息类型:

`POST https://api.ibkr.com/v1/api/iserver/questions/suppress`

```{
  "messageIds": [
    "o163"
  ]
}
```

响应将确认这些消息已被抑制:

```{
  "status": "submitted"
}
```

您无需事先收到过某个给定的 `messageId` 值即可将其抑制。

## 抑制多个 MessageId

您可以在单个请求中提交多个 `messageIds`,以抑制多种订单回复消息。

`POST https://api.ibkr.com/v1/api/iserver/questions/suppress`

```{
  "messageIds": [
    "o0","p6", "o10164","o10223","o403","o10331","o2137","o10082","o10332","o10333","o10334","o2136","o10335","o10151","o10288","o10152","o10153","o2165","p12","o354","o383","o451","o10138","o163","o382", "o354"
  ]
}
```

我们建议您在经纪会话开始时、进行任何交易之前,提交这份待抑制的消息列表。

如果您想在交易过程中抑制某种新类型的消息,请重新发送完整的 `messageIds` 数组。

您也可以撤销当前经纪会话中对消息的全部抑制:

`POST https://api.ibkr.com/v1/api/iserver/questions/suppress/reset`

响应将确认已恢复在订单提交过程中生成的所有消息的送达:

```{
  "status": "submitted"
}
```
