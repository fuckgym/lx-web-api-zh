# 新订单示例

以下工作流描述了如何提交新的订单票据（order ticket）。

##### **所需值：**

* 所需合约（instrument）的合约 ID（"conid"）
* 您所需的订单处理指令

## 标准订单工作流

向 `/iserver/account/{accountId}/orders` 端点发送 `POST` 请求，用于向路径中 `{accountId}` 所引用的账户提交新的订单票据。该端点需要一个必需的路径参数：

* `accountId`：下单目标账户的账户 ID。

该端点还需要一个 JSON 请求体。成功提交某个订单票据所需的具体键会因多种因素而异，包括订单类型。有关订单票据构造的更多信息，请参阅我们的订单类型（Order Types）页面。

不过，通过 Web API 提交的任何新订单票据，其请求体至少需要包含：

* `conid`：该合约的 conid
* `orderType`：新订单票据的订单类型（Order Type）
* `side`：所下订单的方向（例如 "BUY" 或 "SELL"）
* `tif`：Time in force（有效期），即订单持续有效的时间。
* `quantity`：合约的数量（单位数）

请查阅我们的参考资料（Reference Material）以获取提交新订单票据时可用的所有 JSON 键的列表。

假设我们拥有账户 DU123456 的交易权限。我们想向该账户提交一笔新订单，以 165 美元的限价买入 100 股 AAPL，并在今日常规交易时段的剩余时间内有效（即未加修饰的 "day" 订单）。

首先，我们必须已经获得 IB 分配给 AAPL 股票（在美国以 USD 交易）的 conid，即 265598。我们还必须知道如何将所需的处理指令传达给 Web API：

* 买单即 `"side":"BUY"`
* 100 股数量即 `"quantity":100`
* 限价单即 `"orderType":"LMT"`
* 165 美元限价即 `"price":165`
* 日内有效单即 `"tif":"DAY"`
* 最后，AAPL 的 conid 即 `"conid":265598`

请注意，上述键和值均区分大小写。

还须注意使用正确的 JSON 数据类型，详情请参阅我们的参考资料。随后我们便可以构造如下请求：

`POST https://api.ibkr.com/v1/api/iserver/account/DU123456/orders`

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

另请注意，此 POST 请求的请求体需要一个包含订单票据对象的 JSON 数组。该数组用于提交订单括号单（order brackets），详情见下文。目前，我们将只通过该数组中的单个对象元素来提交单个订单票据。

如果订单提交成功，我们将收到一个包含 `order_id` 值的响应，该值可用于跟踪订单状态，同时还会指示提交时订单的当前状态：

```{
  "order_id": "987654",
  "order_status": "Submitted",
  "encrypt_message": "1"
}
```

## 财务顾问订单分配

财务顾问（Financial Advisors）结构可以使用同一订单端点同时向多个账户分配订单。这只需额外添加 `jsonPayload` 订单参数来定义要分配的股份数量。以之前的订单为例，我们可以沿用相同的基础结构，同时加入 `jsonPayload`。

`POST https://api.ibkr.com/v1/api/iserver/account/DF794613/orders`

```
  'orders': [
    {
      'conid': 265598,
      'jsonPayload': {
        'allocation_profile': {
          'alloc_type': 'SHARE',
          'allocations': [
            {'account': 'DUN123456','amount': 1},
            {'account': 'DUN876543','amount': 1}
          ]
        }
      },
      'orderType': 'LMT',
      'price': 340,
      'quantity': 100,
      'side': 'BUY',
      'tif': 'DAY'
    }
  ]
```

股份按照各账户对应的 `amount` 相对于 `quantity` 的比例进行分配。在 `amount` 设置不平衡的情况下也会采用类似的分配方式。

* 在上面的示例中，两个账户各将获得 `50` 股，因为 1:1 的比例意味着均分。
* 如果账户被分配的 `amount` 为 `1` 和 `3`，则按照 1:3 的比例，最终结果分别是分配 25 股和 75 股。
* 该比例基于最小公倍数计算。即使两个账户的 `amount` 都设置为 10，股份分配仍会按 1:1 的比例计算。

```
[
  {
    'encrypt_message': '1',
    'order_id': '1453536095',
    'order_status': 'Submitted'
  }
]
```
