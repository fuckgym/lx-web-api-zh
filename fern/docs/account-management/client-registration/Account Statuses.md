# 账户状态

账户的 **status** 可以是以下之一:

| 状态 | 描述                                                                                                                                                                                                            |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A      | 已废弃(Abandoned);已删除的申请。只有待处理或新建的申请才能被废弃。账户可能因不活动(135 天后)而被废弃,或者由经纪商或客户发起废弃申请的请求。 |
| N      | 待处理申请,且尚未提供入金信息。                                                                                                                                                         |
| O      | 开立(Open);账户已获 IBKR 批准并开立。这被视为活跃账户。                                                                                                                              |
| C      | 已关闭(Closed);曾经活跃的账户,或开立后又被关闭的账户。                                                                                                                                     |
| P      | 待处理申请,且已提供入金指令。                                                                                                                                                       |
| R      | 已拒绝(Rejected);账户从未获得批准/开立 - 被合规部门拒绝)                                                                                                                                                   |
| E      | 重新开立请求待处理。                                                                                                                                                                                 |
| Q      | 尚未经 IBKR 批准的批量迁移账户。                                                                                                                                                               |

`status` 可以发生如下变更:

|       |       |       |       |       |       |
| ----- | ----- | ----- | ----- | ----- | ----- |
| N > P | N > R | P > R | A > P | O > C | E > O |
| N > O | N > A | P > A | A > O | C > O | Q > R |
| N > P | P > O | A > N | A > R | C > E | Q > O |

### 关闭账户

[accountClose](https://www.interactivebrokers.com/campus/ibkr-api-page/webapi-ref/#tag/Account-Management-Accounts/paths/~1gw~1api~1v1~1accounts/patch) 可用于根据 `accountId` **关闭**已开立的账户。请在请求正文中包含关闭账户的原因(closeReason)。

* 有资格被关闭的账户当前状态必须为 O 或 Q,且余额必须已结清。如果提交关闭请求时账户仍有资金,请求将被拒绝。
* 如果状态为 Q 的账户被关闭,状态将变为 R(已拒绝)

请求在美东时间(EST)上午 8 点至上午 11 点之间处理。在此时间之外收到的请求将在次日处理。

## 示例

```
POST /gw/api/v1/accounts/close

{
  "accountManagementRequests": {
   "accountClose": {
      "accountId": "U1233457",
      "closeReason": "time to go"
    }
  }
```

### 重新开立账户

[reopenAccount](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/update-accounts) 可用于根据 `accountId` **重新开立**已开立的账户。

* 以下账户有资格重新开立:
  * 使用 Hybrid 方式创建的 Fully-Disclosed 和 Advisor 子账户
  * 当前状态为 C(已关闭)

提交重新开立请求后,终端用户必须登录 IBKR Portal 查看申请信息并签署更新后的协议和披露文件。在此步骤完成之前,请求将不会被处理。

## 示例

```
PATCH /gw/api/v1/accounts

{
  "accountManagementRequests": {
   "reopenAccount": {      
   "accountId": "U1233457"
    }
  }
```

### 取消申请

[abandonAccount](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/update-accounts) 可用于根据 `accountId` 删除/取消待处理申请。请求处理后,该账户将不再作为 PENDING 账户出现在 IBKR 的 CRM 中。

* 有资格被废弃的账户当前状态必须为 P 或 N。

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "abandonAccount": {
            "accountId": "U12345"
        }
    }
}
```

### 重置申请

resetAbandonedAccount 可用于根据 `accountId` 重置先前被标记为已废弃的申请。有资格被重置的账户当前状态必须为 A,且创建时间不足 6 个月。账户重置后,用户可以继续注册流程。

## 示例

```
PATCH /gw/api/v1/accounts

{
    "accountManagementRequests": {
        "resetAbandonedAccount": {
            "accountId": "U12345"
        }
    }
}
```

## 按账户查看状态

`/gw/api/v1/accounts/{accountId}/status` 可用于按账户查询状态。除账户状态外,响应还将包含以下信息:

| 属性       | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dateOpened      | 账户在 IBKR 获得批准并开立的日期和时间。如果值为 null,表示账户尚未开立。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| dateStarted     | 账户在 IBKR 创建的日期和时间。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| dateClosed      | 账户在 IBKR 关闭的日期和时间。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| accountId       | IBKR 账户 ID。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| status          | IBKR 账户的状态。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| description     | 状态的描述。A= 已废弃 N= 新账户  O= 开立  C= 已关闭  P= 待处理 R= PreClose(即已拒绝)  E= 请求重新开立  Q= 已迁移                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| masterAccountId | 与 accountId 所关联的顾问/经纪商相对应的 IBKR 账户 ID。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| state           | 申请的状态;仅在 status 为 N(新账户)或 P(待处理)时显示。**Incomplete Application** = 需要客户采取措施,使用 `/gw/api/v1/accounts/{accountId}/tasks?type=pending` 查看待处理的注册任务。**Documents Required** = 需要客户采取措施,使用 `/gw/api/v1/accounts/{accountId}/tasks?type=pending` 查看审批所需的文件。**Under Review with IBKR** = 申请在 IBKR 处于 PENDING 状态,无需任何操作。**Pending Approval** = 账户正在审批队列中,应在下一个工作日开立。**Open =** 账户已开立,且没有分配给该账户的待处理任务。 |

## 查看一组账户的状态

`/gw/api/v1/accounts/status` 可用于根据以下条件筛选与 `masterAccountId` 关联的自定义账户组:

| 名称      | 值           | 描述                                                                               |
| --------- | --------------- | ----------------------------------------------------------------------------------------- |
| startDate | yyyy-mm-dd      | 查询特定时间段内创建的账户列表时必填。                 |
| endDate   | yyyy-mm-dd      | 按账户创建日期筛选。如果提供了开始日期,则结束日期为必填 |
| status    | A N O C P R Q E | 查询特定状态的账户列表时必填。                            |

返回结果超过 10,000 条的查询将触发超时错误。请使用 '`limit`' 和 '`offset`' 参数实现分页,以管理大型结果集。

## 账户状态场景

该端点会同时返回 "status" 和 "state",用于指示账户在开户流程中所处的阶段。下表将帮助您理解这些值的含义以及需要采取的操作。

| **场景**                                                     | **查询账户状态时的结果**                                                                          | **是否需要客户操作?**                                                                                                                                                                                 |
| ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 已开立账户且可进行交易。                                  | `"state": "Open"  "status": "O"`                                                                                 | 否                                                                                                                                                                                                        |
| 已开立账户但有待处理任务                                 | `"state": "Documents Required", "status": "O"`                                                                   | 是,使用 [`/api/v1/accounts/{{accountId}}/tasks?type=registration`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/get-accounts-tasks) 查看需要完成的待处理任务,**并**按 "isComplete": "false" 筛选 |
| 申请正在等待批准。                                  | `"state": "Pending Approval", "status": "P"`  **或**   `"state": "Pending Approval", "status": "N"`              | 否,继续轮询状态以监控账户何时变为 'O(Open)状态。                                                                                                                      |
| 正在由 IBKR 审核的待处理申请。               | `"state": "Under Review with IBKR", "status": "P"`   **或**   `"state": "Under Review with IBKR", "status": "N"` | 否,继续轮询状态以监控账户何时变为 'O(Open)状态。                                                                                                                      |
| 有待完成任务需要处理的待处理申请。 | `"state": "Documents Required", "status": "P"`  **或**   `"state": "Documents Required", "status": "N"`          | 是,使用 [`/api/v1/accounts/{{accountId}}/tasks?type=pending`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/get-accounts-tasks) 查看审批所需的待处理任务。                                                  |
