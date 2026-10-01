# 行权期权

通过 Client Portal 执行行权（exercise）的操作相当复杂，需要用户在多个 websocket 请求中确认各项细节。

要启动该流程，开发者必须发送一个携带 "exercise" 参数的握手请求。然后，用户需要将其期权的 ConID 传入 "CEX" 字段。

在行权期权时，开发者还应保持[实时订单更新](/web-api/v1/ws/order-position-operations/request-live-order-updates)订阅，以确认最终结果。

```
shs+exercise+{"CEX":"Your_Option_Conid"}
```

最初的响应是对该主题的确认。

随后您将收到关于可用后续操作的其他消息，包括 "Cancel"（取消）或 "Submit"（提交）。其中还会提供合约信息、持仓信息以及一个用于跟踪该请求的 ID。

我们还可能收到关于此次期权行权的警告通知，例如价内（in-the-money）警告。这些警告无需被抑制或回复；不过，交易者应在收到时加以注意。

```
{"topic":"shs+exercise"}

{"data":{"user_action":[{"id":"submit","text":"Submit"},{"id":"cancel","text":"Cancel"}],"underlying_price":"$211.35","contract":"**AAPL** JUN 28 '24 192.5 Call","underlying_symbol":"AAPL","exercise":{"confirm":false,"confirm_final":false,"enabled":true},"revocable":false,"loading":true,"hold":{"confirm":false,"enabled":true},"qty_lapse":0,"submitted":0,"qty_hold":0,"sec_type":"OPT","qty_exercise":0,"underlying_conid":"265598","morning_expiration":false,"id":5,"position":50,"deadline":"16:25"},"action":"content","MID":"14","topic":"shs+exercise"}

{"data":{"submitted":0,"qty_hold":0,"qty_exercise":0,"warning":"Currently the option is in-the-money by the amount of 18.85 (more than 5 ticks)","exercise":{"confirm":false,"enabled":true},"revocable":false,"loading":false,"qty_lapse":0},"action":"content","MID":"17","topic":"shs+exercise"}
```

收到上面列出的第二条消息后，我们就可以构造行权请求。这将再次使用 "inp" 主题以及 exercise 参数。

在花括号内，我们将 "user\_input" 作为操作传入，然后 data 字段将包含订单参数。其中包括我们从先前 shs+exercise 响应中获取的 ID。接着我们传入 "submit" 作为 user\_action，然后再传入行权期权的相关参数。

此处需要关注的关键值是：您是否希望此次行权为最终行权，即 "make\_final":true。我们还通过 "value" 参数提交要行权的期权数量。在本例中，我们行权 5 股。

```
inp+exercise+{"action":"user_input","data":{"id":"5","user_action":"submit","exercise":{"allowed":"not_shown","make_final":true,"value":5}}}
```

如果还有其他确认/警告，它们将通过一条新消息提供，其中包含新的 "id" 值。

```
{"data":{"user_actions":[{"id":"continue","text":"Continue"},{"id":"cancel","text":"Cancel"}],"id":7,"text":"This exercise request will be final and irreversible. Once submitted, the option position and the stock position will update immediately.","title":"Warning"},"MID":"19","action":"prompt","topic":"inp+exercise"}
```

如上所述，我们现在需要再次使用 inp+exercise 主题，请求 id 7 的行权继续进行。

```
inp+exercise+{"action":"user_input","data":{"id":"7","user_action":"continue"}
```

一旦开发者提交了新的 ID 并以 "continue" 作为 user\_action，他们就会在 SOR websocket 中看到订单已提交。

```
{"topic":"sor","args":[{"acct":"DU1234567","conidex":"708764406","conid":708764406,"account":"DU1234567","orderId":827785484,"cashCcy":"USD","sizeAndFills":"0/5","orderDesc":"EXERCISE 5, Day","description1":"AAPL","description2":"JUN 28 '24 192.5 Call","ticker":"AAPL","secType":"OPT","remainingQuantity":5.0,"filledQuantity":0.0,"totalSize":5.0,"companyName":"APPLE INC","status":"Inactive","order_ccp_status":"Pending Submit","supportsTaxOpt":"1","lastExecutionTime":"240624150344","bgColor":"#000000","fgColor":"#AFAFAF","isEventTrading":"0","lastExecutionTime_r":1719241424000,"side":"EXER"}]}
```
