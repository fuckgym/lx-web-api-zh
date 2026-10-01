# 最后步骤

在确认所有我们感兴趣的行权价并获取相应 conId 之后,我们的期权链就正式建立完成了。接下来,用户可能希望通过逗号分隔 "conids" 列表,批量向 [/iserver/marketdata/snapshot 端点](/v1/endpoints/market-data/live-market-data-snapshot)发送请求。

此外,已经通过其他途径了解相关市场数据的用户,可以直接开始使用 [/iserver/account/\{accountId}/orders 端点](/v1/endpoints/orders/place-order)下单。
