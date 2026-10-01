# 经常性交易

在发起入金或出金请求时,请在交易详情中包含 `recurDetail`,以配置经常性交易(recurring transaction)。

* `instruction_name`:这是已保存的经常性交易的名称,将显示在 Client Portal 的"经常性交易"(Recurring Transactions)页面中。
* `frequency`:将交易安排为按每月、每季度或每年间隔循环执行。
* `start_date`:以 `YYYY-MM-DD` 格式输入,表示应处理该经常性交易的首个日期。
* `end_date`:`end_date` 为可选字段,表示应处理该经常性交易的最后日期。如果为 null,交易将无限期循环,直至取消。

输入的交易信息将被保存,交易将按输入的 `frequency` 和 `start_date` 循环执行。在正常情况下,如果交易日期恰逢美国非营业日,我们将在经常性交易日期之前的营业日处理该请求。如果这种处理导致同一个月内发生多次出金,账户持有人将被收取出金手续费。

## 示例

```
POST /gw/api/v1/external-cash-transfers

{
  "instructionType": "DEPOSIT",
  "instruction": {
    "clientInstructionId": 7013047,
    "accountId": "U46377",
    "currency": "USD",
    "amount": 100,
    "bankInstructionMethod": "WIRE",
    "sendingInstitution": "Sending Institution name",
    "recurDetail": {
      "instruction_name": "Arkansas-Test-Instr",
      "start_date": "2023-10-16",
      "frequency": "MONTHLY"
    }
  }
}
```

### 取消经常性交易

通过 API 发起的经常性交易,可以调用 `/gw/api/v1/instructions/cancel` 端点予以取消。在请求体中,包含要取消的经常性交易的 `instructionId`。`instructionId` 是 IBKR 在创建经常性交易时分配的唯一值。

或者,也可以在 IBKR Portal 的 **Transfer & Pay > [Saved Information](https://www.ibkrguides.com/clientportal/transferandpay/savedinfo.htm)** 下管理这些指令。

## 示例

```
POST /gw/api/v1/instructions/cancel

{
  "intructionType": "cancel_instruction",
  "instruction": {
    "clientInstructionId": "12001810",
    "instructionId": 43085477,
    "reason": "Testing"
  }
}
```

### 查看经常性指令

`/gw/api/v1/bank-instructions/query` 端点可用于按 `accountId` 查看处于活动状态的经常性指令详情。详情包括类型、方式、金额、货币、频率、开始日期和结束日期。

## 示例

```
POST /gw/api/v1/bank-instructions/query 

{
  "instructionType": "get_bank_instruction_details",
  "instruction": {
    "clientInstructionId": "1012983",
    "accountId": "U399192"
  }
}
```

### 查看经常性交易

查看与某个经常性指令关联的历史交易。回溯期由 `numberOfTransactions` 设定。响应将包含经常性指令详情以及每笔交易的状态 `recurringTransactionStatus`。

## 示例

```
POST /gw/api/v1/bank-instructions/query 

{
  "instructionType": "QUERY_RECURRING_EVENTS",
  "instruction": {
    "clientInstructionId": "1012983",
    "ibReferenceId": 206603050,
    "numberOfTransactions": 100
  }
}
```
