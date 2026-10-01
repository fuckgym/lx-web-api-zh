# 取消订单

##### **所需的值:**

* 待取消订单票(order ticket)的 orderId

向 `/iserver/account/{accountId}/order/{orderId}` 端点发送 `DELETE` 请求,用于提交取消账户 `{accountId}` 中由 `{orderId}` 引用的订单票的请求。该端点接受两个必需的路径参数:

* `accountId`:未成交订单所属的账户 ID。
* `orderId`:待取消订单票的 orderId。

该端点的 `DELETE` 方法不接受任何 JSON 正文。要取消 `orderId` 为 987654 的订单,我们发送以下请求:

DELETE [https://api.ibkr.com/v1/api/iserver/account/DU123456/order/987654](https://api.ibkr.com/v1/api/iserver/account/DU123456/order/987654)

取消订单的请求成功后会返回一条消息,表明我们的请求已被接收:

```{
    "msg": "Request was submitted",
    "order_id": 987654,
    "conid": 265598,
    "account": "DU123456"
}
```

请注意,上面的响应表明我们取消订单 987654 的请求已被接收,但并不表示该订单票本身已被取消。例如,由于与拍卖相关的截止时间,在交易所或其他外部交易场所正在生效的订单可能无法被取消。
