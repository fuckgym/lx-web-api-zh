# 修改订单

以下示例描述了如何提交请求,以修改一个现有的、未成交的订单(order ticket)。

##### **所需值:**

* 先前提交的所有订单处理指令,包括品种的 conid
* 要修改的订单的 orderId

向 `/iserver/account/{accountId}/order/{orderId}` 端点发送 `POST` 请求,用于提交修改账户 `{accountId}` 中由 `{orderId}` 所引用订单的请求。该端点接受两个必填的路径参数:

* `accountId`:该未成交订单所属的账户 ID。
* `orderId`:要修改的订单的 orderId。

该端点还需要一个 JSON 正文。此 JSON 正文必须是单个 JSON 对象(注意:不是数组),其中包含原始订单的全部属性和处理指令。

初始下单时提交的所有 JSON 键都必须存在,并且除要修改的值之外,所有 JSON 值也必须相同。

请注意,与新订单提交相比,订单修改可能适用不同的市场规则集。我们的 /iserver/secdef/rules 端点可用于查看修改所执行的规则集。

假设我们有一个活跃且未成交的订单,orderId 为 987654,属于账户 DU123456,最初以下列处理指令提交:

```[
  {
    "conid": 265598,
    "side": "BUY",
    "orderType": "LMT",
    "price": 165,
    "quantity": 100,
    "tif": "DAY"
  }
]
```

我们想将该订单的限价从 165 改为 170。为此,我们发送以下请求:

`POST https://api.ibkr.com/v1/api/iserver/account/DU123456/order/987654`

```{
  "conid": 265598,
  "side": "BUY",
  "orderType": "LMT",
  "price": 170,
  "quantity": 100,
  "tif": "DAY"
}
```

首先要注意,订单修改每次请求只处理单个订单。因此,该请求不使用 JSON 数组作为修改后订单对象的容器,修改后的订单对象本身就是请求正文的全部内容。

此外,除要更改的值之外,我们必须确保订单的所有其他属性与现有订单修改前的当前属性完全一致。

虽然在客户端保存成功提交的新订单内容应当已经足够,但我们也可以通过订单状态(Order Status)端点 `/iserver/account/{accountId}/order/status/{orderId}` 查看现有订单的内容。

成功的订单修改将返回与成功提交新订单类似的响应:

```{
  "order_id": "987654",
  "order_status": "Submitted",
  "encrypt_message": "1"
}
```

或者,如上所述,我们也可能收到订单回复(order reply)消息。
