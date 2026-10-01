# 用户(Users)

## User

定义与账户关联的用户。

|                                                                                                                |
| -------------------------------------------------------------------------------------------------------------- |
| `"users": [{"externalUserId": "MyTestAccount123","externalIndividualId": MyTestAccount123","prefix": "johnd"}` |

| 名称                 | 类型                      | 描述                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| externalIndividualId | String; max 64 characters | 与此用户关联的个人标识符。在 IBKR 数据库中创建关联所必需。该值由对手方指定,且对每个账户必须唯一。如果某个 externalIndividualId 已被使用,您将收到错误。   \*这可以与 [Customer](/account-management/schema/customer) 节点中指定的 externalId 相同。 |
| externalUserId       | String; max 64 characters | 与此用户关联的个人标识符。在 IBKR 数据库中创建关联所必需。该值由对手方指定,且对每个账户必须唯一。如果某个 externalIndividualId 已被使用,您将收到错误。   \*/web-api/account-management/schema/customer) node。                                                                      |
| prefix               | 3-6 个小写字母。            | 前缀将在创建用户 ID 时使用。IBKR 会在前缀末尾追加 3-6 位数字。如果前缀包含以下内容,您将收到错误:  • 符号或数字 • 大写字母 • 前缀少于 3 个字母或多于 6 个字母 \*此前缀应与 [Customer](/account-management/schema/customer) 节点中输入的前缀相同。                       |

## mdServices

管理市场数据订阅并订阅高级服务。

|                         |
| ----------------------- |
| `"mdServices": [ 1473]` |

| 名称 | 类型   | 描述                                               |
| ---- | ------ | --------------------------------------------------------- |
| id   | String | 用户请求订阅的市场服务 ID。 |

* 根据与服务关联的 id,列出用户请求订阅的市场数据。
* 可以使用 `/api/v1/enumerations/market-data?mdStatusNonPro=F` 基于 id 查看订阅。
* 如果 `mdStatusNonPro=F,` 则包含非专业客户(Non-Professional)的订阅。
* 如果 `mdStatusNonPro=T,` 则包含专业客户(Professional)的订阅。
* 实时数据的价格因专业客户或非专业客户而异。
* 专业客户与非专业客户的区分条件可参见[此处](https://ibkr.info/article/2369)。
