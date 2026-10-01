# 简介

通过 API 提交资金(funding)请求时,将在请求正文中设置 `clientInstructionId`。`clientInstructionId` 是与该请求关联的唯一标识符,由托管机构设置;此值不可重复使用。IBKR 希望按顺序设置 **clientInstructionId**,即 1, 2, 3, 4 或 100, 101, 102, 103,而不是 777, 589, 123。最大长度为 20 位。

### 请求状态

IBKR 会在资金请求提交后的 30 秒内返回响应。响应将返回以下状态之一:

* `PROCESSED`:请求已处理。
* `PENDING`:等待处理
* `REJECTED`:IBKR 无法处理该请求。

`/gw/api/v1/client-instructions/{clientInstructionId}` 端点可用于根据与请求关联的 `clientInstructionId` 轮询此前上传的资金请求的状态。

### 取消请求

取消当前处于 `PENDING` 状态的交易,包括计划在未来日期执行的有效定期交易。`/gw/api/v1/instructions/cancel` 可用于取消交易;在请求正文中,需包含与待取消请求关联的 `instructionId`。

## 示例

| 名称                | 类型                         | 描述                                                                                                                                                                                                                                                |
| ------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instructionId       | String                     | 待取消请求的 IB instruction ID。                                                                                                                                                                                                                       |
| reason              | String                     | 取消请求的原因。                                                                                                                                                                                                                                   |
| clientInstructionId | Number;最多 20 个字符。 | 与请求关联的唯一标识符。– **clientInstructionId** 不可重复使用。  – IBKR 希望按顺序设置 **clientInstructionId**,即 1, 2, 3, 4 或 100, 101, 102, 103,而不是 777, 589, 123。 |

```
POST /gw/api/v1/instructions/cancel

{
  "instructionType": "CANCEL_INSTRUCTION",
  "instruction": {
    "clientInstructionId": "12001810",
    "instructionId": 43085477,
    "reason": "Testing"
  }
}
```

### 获取交易历史

`/gw/api/v1/instructions/query` 端点可用于按 `accountId` 查看历史交易信息,包括现金存款、现金取款、转入和转出的持仓划转以及内部划转。`daysToGoBack` 属性用于设置回溯期限,最大为 7 天。可选地,包含 `transactionType` 以筛选特定交易。

**频率限制**:每 10 分钟 1 次请求。

## 示例

```
POST /gw/api/v1/instructions/query

{
  "instructionType": "QUERY_RECENT_INSTRUCTIONS",
  "instruction": {
    "clientInstructionId": "7009001",
    "accountId": "U139838",
    "transactionHistory": {
      "daysToGoBack": 3
    }
  }
}
```

### 可提现的可用现金

`/gw/api/v1/external-cash-transfers/query` 端点可用于基于 `accountId` **AND** `currency` 查看在包含与不包含保证金贷款两种情况下的可用提现现金。对于非披露客户,此端点将返回主账户与子账户之间可划转的可用现金。

响应将返回以下值:

* `withdrawableAmount`:可用于提现的现金金额(假定使用保证金贷款)。仅适用于完全披露客户和财务顾问客户。
* `withdrawableAmountNoBorrow`:可用于提现的现金金额(不使用保证金贷款)。仅适用于完全披露客户和财务顾问客户。
* `allowedTransferAmountToMaster`:假定使用保证金贷款时允许划转至主账户的金额。仅适用于非披露客户。
* `allowedTransferAmountToMasterNoBorrow`:允许划转至主账户的金额(no\_borrow)。仅适用于非披露客户。
* `withdrawableBalanceWithoutOriginHold`:在无原始冻结(origin hold)情况下可用于提现的金额。

## 示例

```
POST /gw/api/v1/external-cash-transfers/query

{
  "instructionType": "QUERY_WITHDRAWABLE_FUNDS",
  "instruction": {
    "clientInstructionId": "7009005",
    "accountId": "U87440",
    "currency": "USD"
  }
}
```
