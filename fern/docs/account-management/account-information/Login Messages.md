# 登录消息

如果在账户创建后需要客户采取行动,IBKR 会为用户分配一条登录消息。登录消息一旦分配,用户在访问 IBKR Portal 时将被提示完成该登录消息。

IBKR 会分配登录消息的情形包括:

* 税务表格过期
* 更新 CRS 表格
* 核实账户信息
* 电子邮件退回

以下登录消息可以通过 API 完成:

* ACK\_AGREEMENT\_UPDATE(使用 [`DocumentSubmission`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/get-accounts-details))
* W8INFO(使用 [`UpdateTaxForm`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/get-accounts-details))
* LLC\_AGREEMENT\_UPDATE(使用 [`DocumentSubmission`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/get-accounts-details))

所有其他登录消息都需要在 IBKR Portal 内完成(不能通过 API)。

### 按账户查看登录消息

`/gw/api/v1/accounts/{accountId}/login-messages` 可用于查看分配给特定账户的登录消息。

### 查看一组账户的登录消息

[`/gw/api/v1/accounts/login-messages`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/list-accounts-login-messages) 可用于筛选已分配登录消息的账户列表。

* 筛选已分配特定登录消息的账户列表。
* 筛选在特定时间范围内创建的账户列表。

| 名称        | 值                                                                  | 说明                                                                                                  |
| ----------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| startDate   | yyyy-mm-dd                                                        | 查询在特定时间段内创建的账户列表时必填。                                                                     |
| endDate     | yyyy-mm-dd                                                        | 按账户创建日期筛选。如果提供了开始日期,则结束日期为必填。                                                    |
| messageType | W8INFO  MIFIR\_INFO ACK\_AGREEMENT\_UPDATE LLC\_AGREEMENT\_UPDATE | W8INFO(税务表格过期)MIFIR\_INFO(需要 MIFIR 数据)   可选-用于按登录消息类型筛选                              |

返回超过 10,000 条结果的查询将触发超时错误。请使用 '`limit`' 和 '`offset`' 参数实现分页,以管理较大的结果集。
