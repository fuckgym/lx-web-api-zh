# 订单错误详情

WebAPI 包含多套独特的错误响应机制,具体取决于请求在哪个层级失败。下表描述了可能导致该问题的状态码、状态消息和错误消息。

#### Web API 错误

| Status Code | Status Message | Error Message                                                               | Context                                                                                                             |
| ----------- | -------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 400         | BadRequest     | Failed to parse body as JSON. Content Type: application/json; charset=utf-8 | 请求主体未按 JSON 格式正确组织。                                                          |
| 400         | BadRequest     | orders request includes parameter with incorrect type                       | 要求特定变量类型的字段收到了无效类型。请参阅下单参考以了解支持的类型。                                     |
| 400         | BadRequest     | Invalid Side (must be 'BUY' or 'SELL').                                     | Side 的值无效。                                                                                               |
| 400         | BadRequest     | Unknown order type                                                          | 提供的订单类型不正确。                                                                                             |
| 400         | BadRequest     | conid or conidex is required                                                | 未包含 conid 或 conidex,或拼写有误。                                                                               |

#### Interactive Brokers 错误与注意事项

| Status Code | Status Message | Error Message                                                                                                                               | Context                                                                                                            |
| ----------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 200         | OK             | Invalid order price fields                                                                                                                  | 价格值不受支持。请确保价格符合市场规则。                                                   |
| 200         | OK             | null time in force is not supported for this order                                                                                          | 未提供 tif 值,或 tif 值无效。                                                                      |
| 200         | OK             | "id":"\{\{Reply\_ID}}","message":\["\{\{Message}}"],"isSuppressed":false,"messageIds":\["\{\{Message\_ID}}"],"messageOptions":\["Yes","No"] | 特定 ID 信息请参阅[可抑制消息 ID](/v1/endpoints/orders/suppressible-message-ids)。 |
| 200         | OK             | no sec defs returned forSecDef reqId=resolve ecReqByConid13297                                                                              | 提供的 conid 或 conidex 无效。请通过 /iserver/secdef/info 验证合约。                |
