# 简介

Flex Web Service 是一个小型、独立的 HTTP API,用于以编程方式生成和检索预先配置好的 Flex Query(Flex 查询)。Flex Query 首先在 Client Portal 中以模板形式手动构建,随后通过 Flex Web Service API 生成一个填充了最新数据的报表实例,并将其交付给请求方客户端。Flex Web Service 提供的 Flex Query 报表,与您原本需要在 Client Portal 中手动获取的报表完全相同。

#### 创建访问令牌

在使用 Flex Web Service API 以编程方式检索 Flex Query 报表之前,您需要先从 Client Portal 中手动获取一些值。

#### 创建查询并获取其 ID

用户在 Client Portal 中创建 Flex Query,作为需要以编程方式或直接通过 Portal 检索的信息模板。

#### 生成报表

发起一个请求,触发 IB 的后端生成报表的一个实例,该实例将使用可用数据填充您的 Flex Query 模板。此操作会提供一个引用代码(reference code),用于标识该报表的这一个特定实例。

#### 检索报表

最后,您将使用该引用代码发起请求,以获取已生成的报表。

有关 Flex Query 以及 IB 整体报表功能的更多信息,请查阅以下文档:

* [Flex 查询](https://www.ibkrguides.com/clientportal/performanceandstatements/flex.htm)
* [报表指南](https://www.ibkrguides.com/clientportal/performanceandstatements/reports.htm)
