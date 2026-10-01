# 市场数据更新频率

Interactive Brokers 的自选列表市场数据源自基于时间的快照间隔,该间隔因产品和地区而异。这意味着给定 tick 的更新频率只会达到其间隔所允许的程度。各产品的具体细节请参见下表。

请留意,Web API 仍保留每秒 10 次请求的标准限速。若需更高的数据返回频率,请改用 [smd websocket 主题](/web-api/v1/ws/market-data/market-data-request)代替 HTML 端点。

| 产品         | 频率      |
| ------------ | --------- |
| 所有产品     | 500ms     |
