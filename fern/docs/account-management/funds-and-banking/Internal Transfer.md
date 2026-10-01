# 内部划转（Internal Transfer）

根据资格条件在 IBKR 账户之间内部划转资金/持仓。

**处理时间**：我们的系统不允许在周六（全天）、周日美东时间（EST）下午 3 点之前、以及每天晚上美东时间 23:45-00:30 之间进行内部划转。在这些时间之外提交的请求将被实时处理。

### 内部资金划转

可以使用 [/gw/api/v1/internal-cash-transfer](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/create-internal-cash-transfers) 根据资格条件在 IBKR 账户之间内部划转资金。

* **Non-Disclosed（非披露）**：在 Non-Disclosed 主账户与 Non-Disclosed 子账户之间划转资金。
* **Fully-Disclosed（全披露）**：将资金从 Fully-Disclosed 主账户划转至子账户。
* **所有账户**：在现有 IBKR 账户之间支持内部划转，前提是源账户和目标账户的账户抬头、居住国家/地区、税号（tax ID）一致，且关联同一个 IB 实体（IB Entity）。

在停机时间之外提交的请求将被实时处理并立即完成（最长 15 秒）；如果请求无法在 15 秒内处理完毕，请求将转为 `PENDING` 状态。可选地，可以包含 `dateTimeToOccur` 以将交易安排在将来的设定时间执行。

## 请求参数

| 名称                | 类型                                                                                                                                   | 描述                                                                                                                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| sourceAccountId     | String                                                                                                                                 | 资金转出账户。                                                                                                                                                                                                                                    |
| clientInstructionId | Number；最多 20 个字符。                                                                                                          | 与请求关联的唯一标识符。- **clientInstructionId** 不能重复使用。- IBKR 希望按顺序设定 **clientInstructionId**，例如 1、2、3、4 或 100、101、102、103，而不是 777、589、123。 |
| instructionType     | INTERNAL\_CASH\_TRANSFER                                                                                                               | 交易类型。                                                                                                                                                                                                                                       |
| amount              | number > 0                                                                                                                             | 正在划转的资金金额。                                                                                                                                                                                                                                |
| targetAccountId     | String                                                                                                                                 | 资金转入账户。                                                                                                                                                                                                                                    |
| currency            | 货币代码（3 位数字）。可用货币参见[此处](https://www.interactivebrokers.com/en/support/fund-my-account.php)。                                  | 发送给 IBKR 的资金的币种。                                                                                                                                                                                                                        |
| dateTimeToOccur     | 2016-04-13T23:15:00+04:00（UTC 加 4 小时）  2016-04-13T23:15:00-04:00（UTC 减 4 小时）                                          | 划转应发生的日期。\*此项为可选。                                                                                                                                                                                                                      |
| clientNote          | String；最多 64 个字符。                                                                                                              | 与内部资金划转请求关联的备注。备注将显示在客户对账单上。此字段为可选。                                                                                                                                                                          |

```
POST /gw/api/v1/internal-cash-transfers

{
  "intructionType": "INTERNAL_CASH_TRANSFER",
  "instruction": {
    "clientInstructionId": "1012983",
    "sourceAccountId": "U46377",
    "targetAccountId": "U15667",
    "amount": 123.45,
    "currency": "GBP",
    "dateTimeToOccur": "2018-03-20T09:12:13Z"
  }
}
```

### 内部持仓划转

可以使用 [/gw/api/v1/internal-asset-transfers](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/create-internal-asset-transfers) 根据资格条件在 IBKR 账户之间内部划转持仓。

* **所有账户**：在现有 IBKR 子账户之间支持内部划转，前提是源账户和目标账户的账户抬头、居住国家/地区、税号一致，且关联同一个 IB 实体。
* **Non-Disclosed 与 Omnibus**：在关联到同一主账户的子账户之间支持内部划转。

#### 处理

我们的系统每 5 分钟处理 200 个请求，这是一个异步过程。如果批量提交 600 个划转请求，将需要 15 分钟才能处理完毕（共 3 批）。如果每天提交超过 1000 个内部持仓划转请求，用户可能需支付额外费用。

## 请求参数

| 名称                | 类型                                                                                                                                   | 描述                                                                                                                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| clientInstructionId | Number；最多 20 个字符。                                                                                                          | 与请求关联的唯一标识符。- **clientInstructionId** 不能重复使用。- IBKR 希望按顺序设定 **clientInstructionId**，例如 1、2、3、4 或 100、101、102、103，而不是 777、589、123。 |
| instructionType     | INTERNAL\_POSITION\_TRANSFER                                                                                                           | 交易类型                                                                                                                                                                                                                                         |
| securityId          | String                                                                                                                                 | 被划转证券的 CUSIP/ISIN 编号。                                                                                                                                                                                                              |
| transferQuantity    | Number                                                                                                                                 | 转入/转出的股份数量                                                                                                                                                                                                                              |
| assetType           | STK                                                                                                                                    | 产品类型。非 STK 产品（如期权、债券）的内部划转仅支持使用 CONID（而非 ISIN）。使用 CONID 提交内部划转时，我们不要求指定 asset\_type。                                                     |
| securityIdType      | CUSIP ISIN CASH                                                                                                                        | 用于确定所提供的 securityId 类型。为 ISIN 或 CUSIP。                                                                                                                                                                                             |
| conId               | String                                                                                                                                 | Interactive Brokers 分配的唯一合约 ID（Contract ID）。                                                                                                                                                                                           |
| currency            | 货币代码（3 位数字）。可用货币参见[此处](https://www.interactivebrokers.com/en/support/fund-my-account.php)。                                  | 被划转资产的币种。                                                                                                                                                                                                                                |
| country             | Alpha-3 代码（ISO）                                                                                                                    | 对手方经纪商所在的国家。                                                                                                                                                                                                                          |
| sourceAccountId     | String                                                                                                                                 | 资金转出账户。                                                                                                                                                                                                                                    |
| targetAccountId     | String                                                                                                                                 | 资金转入账户。                                                                                                                                                                                                                                    |

提交请求有两种方式（securityId **或** conId）

***方式 1：使用 securityId***

```
POST /gw/api/v1/internal-asset-transfers
{
  "instructionType": "INTERNAL_POSITION_TRANSFER",
  "instruction": {
    "clientInstructionId": 7013044,
    "sourceAccountId": "U399192",
    "targetAccountId": "U87440",
    "position": 106,
    "transferQuantity": 6,
    "tradingInstrument": {
      "tradingInstrumentDescription": {
        "securityIdType": "ISIN",
        "securityId": "459200101",
        "assetType": "STK"
      },
      "currency": "USD"
    }
  }
}
```

***方式 2：使用 conId***

```
POST /gw/api/v1/internal-asset-transfers

{
  "instructionType": "INTERNAL_POSITION_TRANSFER",
  "instruction": {
    "clientInstructionId": 7013043,
    "sourceAccountId": "U399192",
    "targetAccountId": "U87440",
    "position": 106,
    "transferQuantity": 6,
    "tradingInstrument": {
      "conId": 21323,
      "currency": "USD"
    }
  }
}
```
