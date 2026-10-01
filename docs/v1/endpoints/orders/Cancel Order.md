# 取消订单

取消一个未成交订单。

在取消订单之前,必须先调用 /iserver/accounts 端点。

使用 /iservers/account/orders 端点查看未成交订单并获取最新的订单状态。

`DELETE /iserver/account/{{ accountId }}/order/{{ orderId }}`

#### 请求对象

###### 路径参数(Path Param)

**accountId:** 字符串。\
应下单的账户 ID。

**orderId:** 字符串。\
要修改的订单 ID(orderID)。\
可从 /iserver/account/orders 获取\
提交 '-1' 将取消所有未成交订单

###### 查询参数(Query Param)

**manualIndicator:** 布尔值。必填\*\
**重要** 交易期货及期货期权合约时必须填写此字段,以符合 [CME Group Rule 536-B](https://www.cmegroup.com/rulebook/files/cme-group-Rule-536-B-Tag1028.pdf) 的规定。\
手动订单指示符(Manual Order Indicator)用于判定订单是手动输入的还是通过自动化工具处理的。无论原始提交方式如何,取消操作也必须包含 manualIndicator 标签,以表明订单取消是手动完成还是自动完成的。\
true 表示订单是通过界面手动取消的,而 false 表示订单是通过自动化系统取消的。

**extOperator:** string。必填\*\
**重要** 交易期货及期货期权合约时必须填写此字段,以符合 [CME Group Rule 536-B](https://www.cmegroup.com/rulebook/files/cme-group-Rule-536-B-Tag1028.pdf) 的规定。\
外部操作员(External Operator)字段应包含在请求提交时负责该 API 操作的提交用户的相关信息。

request\_url = f"\{baseUrl}/iserver/account/U1234567/order/123456789?manualIndicator=true\&extOperator=person1234″\
requests.delete(url=request\_url)

```
curl \
--url {{baseUrl}}/iserver/account/U1234567/order/123456789?manualIndicator=true&extOperator=person1234 \
--request DELETE
```

#### 响应对象

**msg:** 字符串。\
返回请求已提交的确认信息。

**order\_id:** int。\
返回被取消订单的订单 ID(orderID)。

**conid:** int。\
返回请求取消的订单的 conid。\
对于请求时即被立即取消的订单,返回 -1。

**account:** 字符串。\
返回请求取消的订单的 accountId。\
对于请求时即被立即取消的订单,返回 null。

```
{
    "msg": "Request was submitted",
    "order_id": 123456789,
    "conid": 265598,
    "account": "U1234567"
}
```

#### 错误对象

**error:** 字符串。\
返回错误消息。

```
{
    "error": "OrderID 1 doesn't exist"
}
```
