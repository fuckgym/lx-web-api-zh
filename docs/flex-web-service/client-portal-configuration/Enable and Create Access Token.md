# 启用并创建访问令牌

导航到"Reporting"（报告）选项卡，并选择"Flex Queries"（Flex 查询）。在这里，你可以找到有关 Activity Flex Query（活动 Flex 查询）、Trade Confirmation Flex Query（交易确认 Flex 查询）、Flex Query Delivery（Flex 查询交付）以及 Flex Web Service Configuration（Flex Web 服务配置）的信息。

我们需要先在右侧选择"Flex Web Service Configuration"部分。

**重要提示：**

* 关联账户只能在结构的主账户中查看 Flex Web Service 令牌。当财务顾问查看子账户时，可能无法看到"Flex Web Service Configuration"。

* Flex Web Service 令牌可用于检索所有关联账户的报告数据，具体取决于生成 Flex 查询时包含的账户。

* 只有在搜索相同的账户选择时，Flex 查询才可见。
  * 例如，财务顾问在选中单个账户时创建的 Flex 查询，在同时选中顾问账户和单个账户时将无法查看该查询。

*[图] Client Portal 的 Flex Query 页面。*

在新页面上，点击 **Flex Web Service Status** 旁边的空框以启用 Flex Web 服务，然后点击"Save"（保存）以保存你的凭据。这将启用 Flex Web 服务，并提供一个新的"Current Token"（当前令牌）值，后续的 Flex Web 服务请求都将使用该令牌。

*[图] 生成新令牌后的 Configure Flex Web Service 页面。*

你也可以选择生成一个新令牌。可以将令牌指定为保持激活状态，时长介于 6 小时到 1 年之间。生成新令牌还允许用户限制哪些 IP 可以发起 Flex Web 服务请求。

*[图] Configure Flex Web Service 页面的 Token Generation 部分。*
