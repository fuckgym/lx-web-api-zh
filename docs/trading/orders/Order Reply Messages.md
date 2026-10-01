# 订单回复消息

在某些情况下,订单提交请求的响应可能不会返回确认信息。

相反,它可能包含一条"订单回复消息(order reply message)"——本质上是一个通知——必须通过第二个请求加以确认,我们的订单票(order ticket)才能开始执行。

收到此类"订单回复消息"并不意味着订单被拒绝或遇到了其他问题。而是说,在寻求订单执行之前,IB 需要对订单票的某些要素或我们后续处理的某些方面进行明确确认。

这些消息通常与可由客户针对给定用户名自行配置的预防性设置有关——实际上是"防手误(fat finger)"保护机制,您可以根据需要调整或移除:

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

除了消息内容之外,此类"订单回复"响应中还包含两个重要的值。

第一个是 `id`,它唯一标识所发出的这条消息。通过 `/iserver/reply/{messageId}` 端点,我们可以使用这个 `id` 值来消除该消息,并让订单开始执行:

`POST https://api.ibkr.com/v1/api/iserver/reply/a12b34c5-d678-9e012f-3456-7a890b12cd3e`

```{
  "confirmed":true
}
```

上述请求需要一个包含 `{"confirmed":true}` 的 JSON 正文,这是告知 IB 该消息已被接收、且您希望继续执行订单的指令。

只要订单能够被接受并开始执行,您对 `/iserver/reply/{messageId}` 请求的响应将是一个订单确认响应,如上所示:

```{
  "order_id": "1234567890",
  "order_status": "Submitted",
  "encrypt_message": "1"
}
```

另一个需要从订单消息响应中获取的重要值(或一组值)是 `messageIds`,如上文中的 `"messageIds": ["o163"]`。

这些 `messageIds` 字符串对订单回复消息的种类进行分类。您可以使用这些 ID 在您的用户名当前 Web API 经纪会话的剩余时间内抑制某些类型的订单回复消息。

更多详情请参见"抑制订单回复消息(Suppressing Order Reply Messages)"部分。
